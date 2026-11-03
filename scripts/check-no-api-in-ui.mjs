// Fails when UI code talks to the API directly. UI -> services -> /api
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const UI_DIRS = ["components", "pages", "layouts", "app.vue", "error.vue"];
const FORBIDDEN = [/from\s+["']axios["']/, /\$fetch\s*\(/, /\buseFetch\s*\(/, /\buseAsyncData\s*\(/, /\bfetch\s*\(/, /API_BASE|BE_API/, /\baxios\b/, /useRuntimeConfig\(\)\.public\.(API|BE)/, /new\s+EventSource/];

const files = (p) => (statSync(p).isDirectory() ? readdirSync(p).flatMap((f) => files(join(p, f))) : /\.(vue|ts|js)$/.test(p) ? [p] : []);
let bad = 0;
for (const dir of UI_DIRS) {
	let all = [];
	try { all = files(dir); } catch { continue; }
	for (const f of all) {
		readFileSync(f, "utf8").split("\n").forEach((line, i) => {
			if (/^\s*\/\//.test(line)) return;
			for (const re of FORBIDDEN) if (re.test(line)) { console.log(`${f}:${i + 1}  ${line.trim()}`); bad++; }
		});
	}
}
console.log(bad ? `\n${bad} direct API call(s) in UI code. Use a service from /services.` : "ok: no direct API calls in components/pages/layouts");
process.exit(bad ? 1 : 0);
