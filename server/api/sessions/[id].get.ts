import { uuidParam } from "../../utils/validate";
import { requireAuth, requestInfo } from "../../utils/auth";
import { parseDevice } from "../../utils/device";
import { assertCanViewSessions, deviceSessions } from "../../services/sessions";
import { getUser } from "../../services/users";

/** Devices a person has signed in from (grouped), plus recent failed attempts. */
export default defineEventHandler(async (event) => {
	const auth = requireAuth(event);
	const target = await getUser(await uuidParam(event));
	await assertCanViewSessions(auth, target);
	const current = auth.userId === target.id ? parseDevice(requestInfo(event).device).key : undefined;
	return deviceSessions(target.id, current);
});
