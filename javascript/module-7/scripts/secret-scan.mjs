import fs from "node:fs";
import path from "node:path";

const roots = ["src", "test"];
const patterns = [/DEMO_ONLY_FAKE_TOKEN_[A-Z0-9]+/, /(?:api|access|secret)[_-]?token\s*=\s*["'][^"']+/i];
const findings = [];

function walk(directory) {
  if (!fs.existsSync(directory)) return;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(target);
    else if (entry.isFile()) {
      const content = fs.readFileSync(target, "utf8");
      if (patterns.some((pattern) => pattern.test(content))) findings.push(target);
    }
  }
}

roots.forEach(walk);
if (findings.length) {
  console.error(`Potential secrets found in: ${findings.join(", ")}`);
  process.exit(1);
}
console.log("Secret scan passed.");

