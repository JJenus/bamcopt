import { parseBody, uuidParam } from "../../utils/validate";
import * as S from "../../utils/schemas";
import { requestPasswordReset } from "../../services/auth";

export default defineEventHandler(async (event) => {
	await requestPasswordReset((await parseBody(event, S.EmailBody)).email);
	return {};
});
