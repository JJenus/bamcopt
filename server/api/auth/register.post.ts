import { parseBody, uuidParam } from "../../utils/validate";
import * as S from "../../utils/schemas";
import { register } from "../../services/auth";

export default defineEventHandler(async (event) => {
	return register(await parseBody(event, S.RegisterBody));
});
