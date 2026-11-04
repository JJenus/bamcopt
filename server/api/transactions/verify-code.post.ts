import { parseBody } from "../../utils/validate";
import { requireAuth } from "../../utils/auth";
import * as S from "../../utils/schemas";
import { checkCode } from "../../services/codes";
import { getUser } from "../../services/users";

/** Step-by-step feedback for the transfer screen. Moves no money; the transfer re-checks all codes. */
export default defineEventHandler(async (event) => {
	const auth = requireAuth(event);
	const { step, code } = await parseBody(event, S.CodeBody);
	checkCode(await getUser(auth.userId), step, code);
	return { ok: true };
});
