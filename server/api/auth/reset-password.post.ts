import { parseBody, uuidParam } from "../../utils/validate";
import * as S from "../../utils/schemas";
import { resetPassword } from "../../services/auth";

export default defineEventHandler(async (event) => {
	const { token, password } = await parseBody(event, S.ResetBody);
	await resetPassword(token, password);
	return {};
});
