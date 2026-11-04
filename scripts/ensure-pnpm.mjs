/**
 * Fail fast when someone installs this project with npm or yarn.
 * pnpm sets npm_config_user_agent; direct `node scripts/ensure-pnpm.mjs` runs are allowed.
 */
const agent = process.env.npm_config_user_agent ?? "";

if (agent && !agent.startsWith("pnpm/")) {
	console.error("This project is managed with pnpm. Run `pnpm install` instead.");
	process.exit(1);
}
