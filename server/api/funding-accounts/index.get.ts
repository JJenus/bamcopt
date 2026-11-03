import { isAdmin, requireAuth } from "../../utils/auth";
import { listFundingAccounts } from "../../services/funding";

export default defineEventHandler(async (event) => listFundingAccounts(isAdmin(requireAuth(event))));
