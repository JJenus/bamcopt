import { uuidParam } from "../../../utils/validate";
import { requireAdmin } from "../../../utils/auth";
import { getUserFor } from "../../../services/users";
import { recordAdminAction } from "../../../services/audit";

/** Forget that this user passed the transfer codes: with the "remember" policy they are asked again on the next transfer. */
export default defineEventHandler(async (event) => {
	const auth = requireAdmin(event);
	const id = await uuidParam(event);
	const user = await getUserFor(id, auth.userId);
	const wasRemembered = !!user.codesVerifiedAt;
	await user.update({ codesVerifiedAt: null });
	await recordAdminAction(event, auth, { action: "user.codes.reset", targetType: "user", targetId: id, summary: `Reset remembered transfer codes for ${user.email}${wasRemembered ? "" : " (they had not been remembered)"}`, meta: { wasRemembered } });
	return { reset: wasRemembered };
});
