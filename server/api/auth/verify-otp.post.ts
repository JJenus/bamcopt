import { parseBody } from "../../utils/validate";
import * as S from "../../utils/schemas";
import { verifyOtp } from "../../services/auth";

export default defineEventHandler(async (event) => {
	const { challenge, code } = await parseBody(event, S.OtpBody);
	return verifyOtp(challenge, code);
});
