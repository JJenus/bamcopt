import { requireAuth } from "../../utils/auth";
import { countUnread } from "../../services/notifications";

/** Cheap endpoint the bell polls. */
export default defineEventHandler(async (event) => ({ unread: await countUnread(requireAuth(event).userId) }));
