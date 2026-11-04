import { isAdmin, requireAuth } from "../../utils/auth";
import { listAdminContacts, listWithAccounts } from "../../services/users";

export default defineEventHandler(async (event) => {
	const auth = requireAuth(event);
	return isAdmin(auth) ? listWithAccounts() : listAdminContacts();
});
