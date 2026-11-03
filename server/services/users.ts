import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import { Transaction as DbTx } from "sequelize";
import { Account, User } from "../models";
import { conflict, notFound } from "../utils/errors";

export const normalizeEmail = (email: string) => email.trim().toLowerCase();
const code = () => crypto.randomInt(1000, 10000);

/** Fields a user may change on their own profile. */
const SELF_FIELDS = ["name", "phone", "imgUrl", "idUrl", "address", "city", "country", "dob"];
/** Admins may additionally change these. */
const ADMIN_FIELDS = [...SELF_FIELDS, "verified", "emailVerified", "status", "cot", "imf", "tax"];

export const getUser = async (id: string) => {
	const user = await User.findByPk(id);
	if (!user) throw notFound("User not found");
	return user;
};

export const getUserByEmail = async (email: string) => {
	const user = await User.findOne({ where: { email: normalizeEmail(email) } });
	if (!user) throw notFound("User not found");
	return user;
};

export const createUser = async (
	input: { name: string; email: string; password: string; phone: string; address: string; city: string; country: string; dob?: unknown; imgUrl?: string; idUrl?: string },
	t?: DbTx
) => {
	const email = normalizeEmail(input.email);
	if (await User.findOne({ where: { email }, transaction: t })) throw conflict("Email already exists");

	return User.create(
		{
			name: input.name, email, phone: input.phone, address: input.address, city: input.city,
			country: input.country, dob: input.dob, imgUrl: input.imgUrl, idUrl: input.idUrl,
			password: await bcrypt.hash(input.password, 10),
			// role / verification / status are NEVER taken from the client
			userType: "user", verified: false, emailVerified: false, status: "ACTIVE",
			cot: String(code()), imf: String(code()), tax: String(code()),
		},
		{ transaction: t }
	);
};

export const withAccount = async (user: User) => ({
	...user.toJSON(),
	account: (await Account.findOne({ where: { userId: user.id } }))?.toJSON() ?? null,
});

export const listWithAccounts = async () => {
	const users = await User.findAll();
	const accounts = await Account.findAll({ where: { userId: users.map((u) => u.id) } });
	const byUser = new Map(accounts.map((a) => [a.userId, a.toJSON()]));
	return users.map((u) => ({ ...u.toJSON(), account: byUser.get(u.id) ?? null }));
};

/** What other (non-admin) users may see about someone. */
export const publicProfile = (u: User) => ({ id: u.id, name: u.name, imgUrl: u.imgUrl });
/** Recipient lookup for transfers. */
export const lookupProfile = (u: User) => ({ ...publicProfile(u), email: u.email });

export const updateUser = async (id: string, data: Record<string, unknown>, admin: boolean) => {
	const user = await getUser(id);
	const allowed = admin ? ADMIN_FIELDS : SELF_FIELDS;
	await user.update(Object.fromEntries(Object.entries(data).filter(([k, v]) => allowed.includes(k) && v !== undefined)));
	return user;
};

/** For non-admins: just enough to address a request (e.g. upgrade) to the admins. */
export const listAdminContacts = async () =>
	(await User.findAll({ where: { userType: "admin" } })).map((u) => ({ ...publicProfile(u), userType: "admin", createdAt: u.createdAt }));
