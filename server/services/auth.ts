import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import { User, NotificationType, SecurityLog, SecurityLogAction } from "../models";
import { sequelize } from "../utils/db";
import { signOtpChallenge, signPurposeToken, signSession, verifyOtpChallenge, verifyPurposeToken } from "../utils/auth";
import { env } from "../utils/env";
import { lookupLocation } from "../utils/geo";
import { badRequest, forbidden, unauthorized } from "../utils/errors";
import { AppName, mailEnabled, sendNewDeviceEmail, sendOtpEmail, sendPasswordEmail, sendWelcomeEmail } from "../utils/mail";
import { parseDevice } from "../utils/device";
import { createAccount } from "./accounts";
import { getAppSettings } from "./catalog";
import { notifySafe } from "./notifications";
import { createSession, revokeSessions } from "./user-sessions";
import { isSuspended, SUSPENDED_MESSAGE } from "../utils/access";
import { attachReferral } from './referrals';
import { createUser, getUser, normalizeEmail, withAccount } from "./users";

export type RequestInfo = { ip: string; device: string };

/** Everyone follows OTP_ON; the super admin can be held to the code regardless (see env.superOtpMode). */
const otpRequiredFor = (user: { userType: string }) => {
	if (env.otpOn) return true;
	if (user.userType !== "superadmin") return false;
	const mode = env.superOtpMode;
	return mode === "off" ? false : mailEnabled() || (mode === "on" && !env.isProd);
};

/** Best effort: a failing audit row must never block a login. */
const logAccess = async (userId: string, action: SecurityLogAction, info?: RequestInfo, reason = "") => {
	try {
		const row = await SecurityLog.create({ userId, action, ip: info?.ip || "unknown", deviceInfo: (info?.device || "unknown").slice(0, 250), reason });
		// never delays or fails the sign-in: the location is filled in when the lookup returns
		void lookupLocation(info?.ip).then((location) => location && row.update({ location })).catch(() => {});
	} catch {}
};

/**
 * Tells the account owner when a browser/device they have never used before signs in (not on the very first sign-in,
 * when there is nothing to compare with). A notification always; an e-mail too when mail is configured. Never blocks a sign-in.
 */
const announceNewDevice = async (user: User, info?: RequestInfo) => {
	try {
		const device = parseDevice(info?.device);
		const prior = await SecurityLog.findAll({ where: { userId: user.id, action: SecurityLogAction.LOGIN }, attributes: ["deviceInfo"], order: [["createdAt", "DESC"]], limit: 500, raw: true });
		if (!prior.length || prior.some((row: any) => parseDevice(row.deviceInfo).key === device.key)) return;
		const ip = info?.ip || "unknown";
		await notifySafe({
			userId: user.id, title: "New sign-in from a new device", type: NotificationType.INFO,
			message: `${device.label} (IP ${ip}) just signed in. If this was not you, open Settings > Security, sign that device out and reset your password.`,
		});
		sendNewDeviceEmail(user, { device: device.label, ip });
	} catch (error) {
		console.error("[security] new-device check failed:", (error as Error).message);
	}
};

const session = async (user: User, info?: RequestInfo) => ({
	userId: user.id,
	user: await withAccount(user),
	token: signSession(user, await createSession(user.id, info)),
});

export const register = async (input: Parameters<typeof createUser>[0] & { referralCode?: string }, info?: RequestInfo) => {
	const settings = await getAppSettings();
	// user + account are created together or not at all
	const user = await sequelize.transaction(async (t) => {
		const created = await createUser(input, t);
		await createAccount(created.id, settings.defaultBaseCurrency, t);
		await attachReferral(created, input.referralCode, t);
		return created;
	});

	sendWelcomeEmail(user, signPurposeToken(user.id, "verify-email", "7d"));
	await notifySafe({
		userId: user.id,
		title: "Account creation successful",
		message: `Welcome to ${AppName}. Open the email sent to your mail box and verify your email address.`,
		type: NotificationType.INFO,
	});
	// otpRequired tells the client whether it should go on to the OTP step (it never does after registering)
	return { ...(await session(user, info)), otpRequired: env.otpOn };
};

// compared against when the e-mail is unknown, so both failures cost the same
const DUMMY_HASH = bcrypt.hashSync("not-a-real-password", 10);

/** Step 1: password. Returns an OTP challenge, NOT a session. With OTP_ON=false it returns the session directly. */
export const login = async (email: string, password: string, info?: RequestInfo) => {
	const user = await User.findOne({ where: { email: normalizeEmail(email) } });
	const valid = await bcrypt.compare(password, user?.password ?? DUMMY_HASH);
	if (!user || !valid) {
		if (user) await logAccess(user.id, SecurityLogAction.ATTEMPT_FAILED, info, "Wrong password");
		throw unauthorized("Invalid credentials");
	}
	if (isSuspended(user)) {
		await logAccess(user.id, SecurityLogAction.ATTEMPT_FAILED, info, "Account suspended");
		throw forbidden(SUSPENDED_MESSAGE);
	}

	if (!otpRequiredFor(user)) {
		await announceNewDevice(user, info);
		await logAccess(user.id, SecurityLogAction.LOGIN, info);
		return session(user, info);
	}

	const code = String(crypto.randomInt(100000, 1000000));
	if (!env.isProd) console.log("OTP: ", code); // never print login codes in production logs
	sendOtpEmail(user, code);
	return {
		challenge: signOtpChallenge(user.id, code),
		allowedTime: 15,
		// only when no mail server is configured outside production (local dev / tests)
		...(!env.isProd && !mailEnabled() && { devOtp: code }),
	};
};

/** Step 2: the code from the e-mail. Returns the session. */
export const verifyOtp = async (challenge: string, code: string, info?: RequestInfo) => {
	const user = await getUser(verifyOtpChallenge(challenge, code));
	if (isSuspended(user)) {
		await logAccess(user.id, SecurityLogAction.ATTEMPT_FAILED, info, "Account suspended");
		throw forbidden(SUSPENDED_MESSAGE);
	}
	if (!otpRequiredFor(user)) throw badRequest("OTP sign-in is disabled. Sign in with your password.");
	await announceNewDevice(user, info);
	await logAccess(user.id, SecurityLogAction.LOGIN, info);
	return session(user, info);
};

export const verifyEmail = async (token: string) => {
	const user = await getUser(verifyPurposeToken(token, "verify-email"));
	await user.update({ emailVerified: true });
	await notifySafe({ userId: user.id, title: "Email verified", message: "Email verification successful", type: NotificationType.INFO });
	return user.toJSON();
};

/** Always succeeds, so the endpoint cannot be used to find out who has an account. */
export const requestPasswordReset = async (email: string) => {
	const user = await User.findOne({ where: { email: normalizeEmail(email) } });
	if (user) sendPasswordEmail(user, signPurposeToken(user.id, "reset-password", "30m"));
};

export const resetPassword = async (token: string, password: string) => {
	const user = await getUser(verifyPurposeToken(token, "reset-password"));
	await user.update({ password: await bcrypt.hash(password, 10) });
	// whoever held a session (possibly the reason for the reset) is signed out
	await revokeSessions(user.id, { by: user.id, reason: "Password was reset" }).catch(() => {});
	await notifySafe({ userId: user.id, title: "Password update", message: "Your password has been changed.", type: NotificationType.INFO });
};
