import { Op } from "sequelize";
import { requireAdmin } from "../../utils/auth";
import { User } from "../../models";
import { recordAdminAction } from "../../services/audit";

/** System-wide: forget that anyone passed the transfer codes. Returns how many users had it remembered. */
export default defineEventHandler(async (event) => {
	const auth = requireAdmin(event);
	const [reset] = await User.update({ codesVerifiedAt: null }, { where: { codesVerifiedAt: { [Op.ne]: null } } });
	await recordAdminAction(event, auth, { action: "settings.codes.reset-all", targetType: "app-settings", summary: `Reset remembered transfer codes for everyone (${reset} user${reset === 1 ? "" : "s"})`, meta: { reset } });
	return { reset };
});
