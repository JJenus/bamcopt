import crypto from "node:crypto";
import jwt from "jsonwebtoken";
import { getHeader, H3Event } from "h3";
import { env } from "./env";
import { forbidden, unauthorized } from "./errors";

export type AuthContext = { userId: string; userType: string };
type Purpose = "verify-email" | "reset-password";

export const signSession = (user: { id: string; name: string; userType?: string }) =>
	jwt.sign({ userId: user.id, name: user.name, userType: user.userType || "user" }, env.jwtSecret, {
		expiresIn: "5d",
	});

export const verifySession = (token: string): AuthContext => {
	try {
		const p = jwt.verify(token, env.jwtSecret) as any;
		if (!p.userId || p.purpose) throw new Error("not a session token");
		// tokens issued before roles were added carry no userType: least privilege
		return { userId: p.userId, userType: p.userType || "user" };
	} catch {
		throw unauthorized("Invalid token");
	}
};

/** Short-lived, purpose-bound token for e-mail links (verify e-mail, reset password). */
export const signPurposeToken = (userId: string, purpose: Purpose, expiresIn: string) =>
	jwt.sign({ sub: userId, purpose }, env.jwtSecret, { expiresIn } as jwt.SignOptions);

export const verifyPurposeToken = (token: string, purpose: Purpose): string => {
	try {
		const p = jwt.verify(token, env.jwtSecret) as any;
		if (p.purpose !== purpose || !p.sub) throw new Error("wrong purpose");
		return p.sub as string;
	} catch {
		throw unauthorized("This link is invalid or has expired");
	}
};

export const requireAuth = (event: H3Event): AuthContext => {
	const auth = event.context.auth as AuthContext | undefined;
	if (!auth) throw unauthorized();
	return auth;
};

export const isAdmin = (auth: AuthContext) => auth.userType === "admin";

export const requireAdmin = (event: H3Event): AuthContext => {
	const auth = requireAuth(event);
	if (!isAdmin(auth)) throw forbidden();
	return auth;
};

/** The caller must be `userId` or an admin. */
export const requireSelfOrAdmin = (event: H3Event, userId: string): AuthContext => {
	const auth = requireAuth(event);
	if (auth.userId !== userId && !isAdmin(auth)) throw forbidden();
	return auth;
};

/**
 * Login OTP. The code is never sent back to the client: the challenge token only holds an HMAC of it.
 * Attempts are counted per challenge (in memory, single instance) and a challenge is single-use.
 */
const otpState = new Map<string, { tries: number; exp: number; used: boolean }>();
const MAX_OTP_TRIES = 5;
const otpHash = (jti: string, code: string) =>
	crypto.createHmac("sha256", env.jwtSecret).update(`${jti}:${code}`).digest("hex");

export const signOtpChallenge = (userId: string, code: string) => {
	const jti = crypto.randomUUID();
	return jwt.sign({ sub: userId, purpose: "login-otp", jti, h: otpHash(jti, code) }, env.jwtSecret, { expiresIn: "15m" });
};

export const verifyOtpChallenge = (challenge: string, code: string): string => {
	let p: any;
	try {
		p = jwt.verify(challenge, env.jwtSecret);
		if (p.purpose !== "login-otp" || !p.sub || !p.jti) throw new Error("wrong purpose");
	} catch {
		throw unauthorized("This code has expired. Sign in again.");
	}
	const now = Date.now();
	for (const [k, v] of otpState) if (v.exp < now) otpState.delete(k); // prune
	const state = otpState.get(p.jti) ?? { tries: 0, exp: p.exp * 1000, used: false };
	otpState.set(p.jti, state);
	if (state.used) throw unauthorized("This code was already used. Sign in again.");
	if (++state.tries > MAX_OTP_TRIES) throw unauthorized("Too many attempts. Sign in again.");

	const given = Buffer.from(otpHash(p.jti, code));
	const real = Buffer.from(p.h);
	if (given.length !== real.length || !crypto.timingSafeEqual(given, real)) throw unauthorized("Invalid code");
	state.used = true;
	return p.sub as string;
};

/** Where a request came from (for the login history). */
export const requestInfo = (event: H3Event) => ({
	ip: (getHeader(event, "x-forwarded-for")?.split(",")[0] || event.node.req.socket?.remoteAddress || "unknown").trim(),
	device: getHeader(event, "user-agent") || "unknown",
});
