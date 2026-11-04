import { requireAuth } from "../../utils/auth";
import { markAllRead } from "../../services/notifications";

export default defineEventHandler((event) => markAllRead(requireAuth(event).userId));
