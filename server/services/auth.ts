import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import { User, NotificationType } from "../models";
import { sequelize } from "../utils/db";
import { signOtpChallenge, signPurposeToken, signSession, verifyOtpChallenge, verifyPurposeToken } from "../utils/auth";
import { env } from "../utils/env";
import { unauthorized } from "../utils/errors";
import { AppName, mailEnabled, sendOtpEmail, sendPasswordEmail, sendWelcomeEmail } from "../utils/mail";
import { createAccount } from "./accounts";
import { getAppSettings } from "./catalog";
import { notifySafe } from "./notifications";
import { createUser, getUser, normalizeEmail, withAccount } from "./users";

const session = async (user: User) => ({
	userId: user.id,
	user: await withAccount(user),
	token: signSession(user),
});

export const register = async (input: Parameters<typeof createUser>[0]) => {
	const settings = await getAppSettings();
	// user + account are created together or not at all
	const user = await sequelize.transaction(async (t) => {
		const created = await createUser(input, t);
		await createAccount(created.id, settings.defaultBaseCurrency, t);
		return created;
	});

	sendWelcomeEmail(user, signPurposeToken(user.id, "verify-email", "7d"));
	await notifySafe({
		userId: user.id,
		title: "Account creation successful",
		message: `Welcome to ${AppName}. Open the email sent to your mail box and verify your email address.`,
		type: NotificationType.INFO,
	});
	return session(user);
};

// compared against when the e-mail is unknown, so both failures cost the same
const DUMMY_HASH = bcrypt.hashSync("not-a-real-password", 10);

/** Step 1: password. Returns an OTP challenge, NOT a session. */
export const login = async (email: string, password: string) => {
	const user = await User.findOne({ where: { email: normalizeEmail(email) } });
	const valid = await bcrypt.compare(password, user?.password ?? DUMMY_HASH);
	if (!user || !valid) throw unauthorized("Invalid credentials");

	const code = String(crypto.randomInt(100000, 1000000));
	sendOtpEmail(user, code);
	return {
		challenge: signOtpChallenge(user.id, code),
		allowedTime: 15,
		// only when no mail server is configured outside production (local dev / tests)
		...(!env.isProd && !mailEnabled() && { devOtp: code }),
	};
};

/** Step 2: the code from the e-mail. Returns the session. */
export const verifyOtp = async (challenge: string, code: string) =>
	session(await getUser(verifyOtpChallenge(challenge, code)));

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
	await notifySafe({ userId: user.id, title: "Password update", message: "Your password has been changed.", type: NotificationType.INFO });
};
