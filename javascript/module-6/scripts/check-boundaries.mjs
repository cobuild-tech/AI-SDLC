import { execFileSync } from "node:child_process";

const base = process.env.BASE_REF ?? "demo-exercise";

function gitFiles(args) {
  try {
    return execFileSync("git", args, { encoding: "utf8" }).trim().split("\n").filter(Boolean);
  } catch {
    return [];
  }
}

// Committed changes since the base branch, plus uncommitted and untracked files.
const changed = [
  ...gitFiles(["diff", "--name-only", "--relative", `${base}...HEAD`, "--", "."]),
  ...gitFiles(["diff", "--name-only", "--relative", "HEAD", "--", "."]),
  ...gitFiles(["ls-files", "--others", "--exclude-standard", "--", "."])
];

const protectedPrefixes = [".github/workflows/", ".github/CODEOWNERS", "data/seed-tickets.json", "docs/architecture.md"];
const violations = changed.filter((file) => protectedPrefixes.some((prefix) => file.startsWith(prefix)));
if (violations.length) {
  console.error(`Protected paths changed: ${violations.join(", ")}`);
  process.exit(1);
}
console.log("Protected-path check passed.");

