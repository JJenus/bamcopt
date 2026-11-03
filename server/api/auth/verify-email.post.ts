import { parseBody, uuidParam } from "../../utils/validate";
import * as S from "../../utils/schemas";
import { verifyEmail } from "../../services/auth";

export default defineEventHandler(async (event) => {
	return verifyEmail((await parseBody(event, S.TokenBody)).token);
});
