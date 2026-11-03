import { parseBody, uuidParam } from "../../utils/validate";
import * as S from "../../utils/schemas";
import { login } from "../../services/auth";

export default defineEventHandler(async (event) => {
	const { email, password } = await parseBody(event, S.LoginBody);
	return login(email, password);
});
