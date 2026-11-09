/**
 * COT ("exchange") / IMF / TAX codes: set by an admin per user and required for every outgoing transfer.
 * They are verified here, never in the browser, and are only ever returned to admins.
 */
import crypto from "node:crypto";
import { createError } from "h3";
import { User } from "../models";
import { unprocessable } from "../utils/errors";
import { CODE_POLICIES, USER_CODE_POLICIES, type CodePolicy } from "../../utils/app-defaults";
import { AppSetting } from "../models";

export type Codes = { cot: string; imf: string; tax: string };
export type CodeStep = keyof Codes;
export const CODE_STEPS: CodeStep[] = ["cot", "imf", "tax"];

const LABEL: Record<CodeStep, string> = { cot: "exchange", imf: "IMF", tax: "tax" };
const MAX_WRONG = 5;
const WINDOW_MS = 15 * 60 * 1000;
// in memory, single instance (use a shared store if you scale out)
const wrong = new Map<string, { count: number; since: number }>();

const same = (a: string, b: string) => {
	const x = Buffer.from(a), y = Buffer.from(b);
	return x.length === y.length && crypto.timingSafeEqual(x, y);
};

export const checkCode = (user: User, step: CodeStep, code: unknown) => {
	const now = Date.now();
	for (const [k, v] of wrong) if (now - v.since > WINDOW_MS) wrong.delete(k); // prune
	const state = wrong.get(user.id);
	if (state && state.count >= MAX_WRONG) {
		throw createError({ statusCode: 429, message: "Too many wrong codes. Try again in 15 minutes." });
	}

	const real = String(user[step] ?? "").trim();
	if (!real) throw unprocessable("Transfer codes are not set. Contact support.");
	if (!same(real, String(code ?? "").trim())) {
		wrong.set(user.id, { count: (state?.count ?? 0) + 1, since: state?.since ?? now });
		throw unprocessable(`Invalid ${LABEL[step]} code`);
	}
};

/** All three must match (authoritative check done with the transfer itself). */
export const checkAllCodes = (user: User, codes: Codes) => {
	for (const step of CODE_STEPS) checkCode(user, step, codes[step]);
	wrong.delete(user.id);
};

const asPolicy = (value: unknown, fallback: CodePolicy): CodePolicy => (CODE_POLICIES as readonly string[]).includes(String(value)) ? (value as CodePolicy) : fallback;

/**
 * Do this user's transfers need the codes right now?
 *  policy = their own setting, or the system's when they follow it ("default").
 *  off: never · always: every transfer · remember: until they have passed once (codesVerifiedAt).
 */
export const codeRequirement = async (user: User) => {
	// read-only on purpose: this runs on every transfer, so it must never create the settings row (concurrent transfers would race to insert it)
	const system = asPolicy((await AppSetting.findOne({ attributes: ["transferCodesPolicy"], raw: true }))?.transferCodesPolicy, "always");
	const own = String(user.transferCodesPolicy || "default");
	const policy = (USER_CODE_POLICIES as readonly string[]).includes(own) && own !== "default" ? (own as CodePolicy) : system;
	const remembered = !!user.codesVerifiedAt;
	return { policy, remembered, required: policy === "off" ? false : policy === "always" ? true : !remembered };
};
