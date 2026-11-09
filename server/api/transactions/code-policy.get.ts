import { requireAuth } from "../../utils/auth";
import { codeRequirement } from "../../services/codes";
import { getUser } from "../../services/users";

/** Will my next transfer ask for the codes? { required, policy, remembered }. The server still enforces it on the transfer itself. */
export default defineEventHandler(async (event) => {
	const auth = requireAuth(event);
	return codeRequirement(await getUser(auth.userId));
});
