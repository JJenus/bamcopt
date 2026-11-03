import { parseBody, uuidParam } from "../../utils/validate";
import { requireAdmin, requireAuth, requireSelfOrAdmin, isAdmin } from "../../utils/auth";
import * as S from "../../utils/schemas";
import { getUserByEmail, lookupProfile } from "../../services/users";

export default defineEventHandler(async (event) => {
	requireAuth(event);
	return lookupProfile(await getUserByEmail((await parseBody(event, S.EmailBody)).email));
});
