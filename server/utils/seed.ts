import bcrypt from "bcryptjs";
import { User } from "../models";
import { normalizeEmail } from "../services/users";

/** Seed a default admin account so an admin can log in on a fresh database.
 * Not environment-limited: runs regardless of NODE_ENV.
 * Idempotent: never creates a duplicate admin. */
export const seedAdmin = async () => {
	const email = normalizeEmail(process.env.ADMIN_EMAIL || "admin@bancopt.com");
	const password = process.env.ADMIN_PASSWORD || "AdminPass123!";

	const existing = await User.findOne({ where: { email } });
	if (existing) {
		// keep credentials in sync with env (e.g. after a password change)
		if (existing.userType !== "admin" || !(await bcrypt.compare(password, existing.password))) {
			await existing.update({
				userType: "admin",
				password: await bcrypt.hash(password, 10),
				verified: true,
				emailVerified: true,
				status: "ACTIVE",
			});
		}
		return existing;
	}

	return User.create({
		name: "Admin",
		email,
		password: await bcrypt.hash(password, 10),
		phone: "",
		address: "",
		city: "",
		country: "",
		userType: "admin",
		verified: true,
		emailVerified: true,
		status: "ACTIVE",
		cot: "",
		imf: "",
		tax: "",
	});
};
