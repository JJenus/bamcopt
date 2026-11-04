import { findReceipt } from "../../../services/ledger";

export default defineEventHandler(async (event) => {
	return findReceipt(getRouterParam(event, "id") || "");
});
