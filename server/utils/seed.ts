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

/**
 * The owner account that oversees the administrators. Created ONLY when SUPERADMIN_EMAIL and SUPERADMIN_PASSWORD
 * are both set (there is no default login), and it must not share the admin account's e-mail.
 */
export const seedSuperAdmin = async () => {
	const rawEmail = (process.env.SUPERADMIN_EMAIL || "").trim();
	const password = process.env.SUPERADMIN_PASSWORD || "";
	if (!rawEmail || !password) return null;
	const email = normalizeEmail(rawEmail);
	if (email === normalizeEmail(process.env.ADMIN_EMAIL || "admin@bancopt.com")) {
		console.error("[seed] SUPERADMIN_EMAIL must differ from ADMIN_EMAIL; super admin not created");
		return null;
	}

	const existing = await User.findOne({ where: { email } });
	if (existing) {
		if (existing.userType !== "superadmin" || !(await bcrypt.compare(password, existing.password))) {
			await existing.update({ userType: "superadmin", password: await bcrypt.hash(password, 10), verified: true, emailVerified: true, status: "ACTIVE" });
		}
		return existing;
	}
	return User.create({
		name: (process.env.SUPERADMIN_NAME || "Super Admin").trim(),
		email, password: await bcrypt.hash(password, 10),
		phone: "", address: "", city: "", country: "",
		userType: "superadmin", verified: true, emailVerified: true, status: "ACTIVE", cot: "", imf: "", tax: "",
	});
};
