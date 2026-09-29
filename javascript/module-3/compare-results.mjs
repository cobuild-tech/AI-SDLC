// Scores baseline-repo (no context, weak prompt) and context-ready-repo (full
// context, strong prompt) against the same acceptance criteria, so you can see
// the difference context makes.
//
// Run from the module-3 folder, after npm install in both folders:
//   node compare-results.mjs
//
// It starts each folder's API on its own port, calls it over HTTP and reads a
// few files. It changes nothing in either folder.

import { spawn, spawnSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repos = [
  { name: "Baseline", dir: join(here, "baseline-repo"), port: 3101 },
  { name: "Context-ready", dir: join(here, "context-ready-repo"), port: 3102 }
];

function show(response) {
  if (!response) return "no response";
  return `got ${response.status} ${JSON.stringify(response.body)}`;
}

function expectError(status, error) {
  return (response) =>
    response?.status === status && response.body?.error === error && Object.keys(response.body).length === 1
      ? null
      : `expected ${status} {"error":"${error}"}, ${show(response)}`;
}

function expectMovedTo(status) {
  return (response) =>
    response?.status === 200 && JSON.stringify(response.body).includes(`"status":"${status}"`)
      ? null
      : `expected 200 with status "${status}", ${show(response)}`;
}

// Checks run in order against one server, so later checks see earlier changes.
// Starting data: 1 open, 2 in_progress, 3 closed, 4 open.
const checks = [
  { label: "open → in_progress works", patch: [1, { status: "in_progress" }], verify: expectMovedTo("in_progress") },
  { label: "in_progress → closed works", patch: [2, { status: "closed" }], verify: expectMovedTo("closed") },
  { label: "Reopening a closed ticket is refused (400)", patch: [3, { status: "open" }], verify: expectError(400, "Invalid status transition") },
  { label: "Skipping a step is refused (400)", patch: [4, { status: "closed" }], verify: expectError(400, "Invalid status transition") },
  { label: "Unknown status is rejected (400)", patch: [4, { status: "blocked" }], verify: expectError(400, "Invalid status") },
  { label: "Missing ticket returns 404", patch: [999, { status: "in_progress" }], verify: expectError(404, "Ticket not found") },
  {
    label: "Bad ticket ids are rejected (400)",
    run: async (base) => {
      for (const id of ["0", "-1", "1.5", "abc"]) {
        const failure = expectError(400, "Invalid ticket id")(await patch(base, id, { status: "in_progress" }));
        if (failure) return `id ${id}: ${failure}`;
      }
      return null;
    }
  },
  {
    label: "List endpoint still returns 4 tickets",
    run: async (base) => {
      const response = await call(`${base}/api/tickets`);
      return response?.status === 200 && response.body?.tickets?.length === 4 ? null : `expected 200 with 4 tickets, ${show(response)}`;
    }
  },
  {
    label: "Tests cover the new endpoint",
    run: async (_base, dir) => {
      const testDir = join(dir, "tests");
      const source = existsSync(testDir)
        ? readdirSync(testDir).map((file) => readFileSync(join(testDir, file), "utf8")).join("\n")
        : "";
      return /\.patch\(\s*[`"']\/api\/tickets\/[^`"']*\/status/.test(source) ? null : "no test calls PATCH /api/tickets/:id/status";
    }
  },
  {
    label: "Workflow rules live in the service layer",
    run: async (_base, dir) => {
      const servicesDir = join(dir, "src", "services");
      const source = readdirSync(servicesDir).map((file) => readFileSync(join(servicesDir, file), "utf8")).join("\n");
      return source.includes("in_progress") && source.includes("closed")
        ? null
        : "src/services has no status workflow; the transition rules are somewhere else";
    }
  },
  {
    label: "Type check passes (npm run lint)",
    run: async (_base, dir) => {
      const result = spawnSync(process.execPath, [join("node_modules", "typescript", "bin", "tsc"), "--noEmit"], {
        cwd: dir,
        encoding: "utf8"
      });
      return result.status === 0 ? null : `tsc reported errors:\n    ${result.stdout.trim().split("\n").slice(0, 3).join("\n    ")}`;
    }
  },
  {
    label: "README documents the endpoint",
    run: async (_base, dir) =>
      readFileSync(join(dir, "README.md"), "utf8").includes("PATCH /api/tickets/:id/status")
        ? null
        : "README does not mention PATCH /api/tickets/:id/status"
  }
];

async function call(url, init) {
  try {
    const response = await fetch(url, init);
    const text = await response.text();
    let body = text;
    try {
      body = JSON.parse(text);
    } catch {}
    return { status: response.status, body };
  } catch {
    return null;
  }
}

function patch(base, id, body) {
  return call(`${base}/api/tickets/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
}

async function startServer({ dir, port }) {
  if (!existsSync(join(dir, "node_modules"))) {
    throw new Error(`run npm install in ${dir} first`);
  }
  const child = spawn(process.execPath, ["--import", "tsx", "src/server.ts"], {
    cwd: dir,
    env: { ...process.env, PORT: String(port) },
    stdio: ["ignore", "ignore", "pipe"]
  });
  let stderr = "";
  child.stderr.on("data", (chunk) => (stderr += chunk));

  for (let attempt = 0; attempt < 50; attempt++) {
    if (child.exitCode !== null) break;
    if ((await call(`http://localhost:${port}/health`))?.status === 200) return child;
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  child.kill();
  throw new Error(`the server did not start\n${stderr.trim().split("\n").slice(-5).join("\n")}`);
}

async function score(repo) {
  let server;
  try {
    server = await startServer(repo);
  } catch (error) {
    return { error: error.message, results: checks.map(() => "not run") };
  }
  const base = `http://localhost:${repo.port}`;
  const results = [];
  try {
    for (const check of checks) {
      results.push(check.run ? await check.run(base, repo.dir) : check.verify(await patch(base, ...check.patch)));
    }
  } finally {
    server.kill();
  }
  return { results };
}

const scores = [];
for (const repo of repos) scores.push(await score(repo));

const width = Math.max(...checks.map((check) => check.label.length)) + 2;
console.log(`\n${"Acceptance check".padEnd(width)}Baseline  Context-ready`);
console.log("-".repeat(width + 23));
checks.forEach((check, index) => {
  const marks = scores.map((s) => (s.results[index] === null ? "PASS" : "FAIL").padEnd(10));
  console.log(`${check.label.padEnd(width)}${marks.join("")}`);
});
console.log("-".repeat(width + 23));
console.log(
  `${"Score".padEnd(width)}${scores
    .map((s) => `${s.results.filter((r) => r === null).length}/${checks.length}`.padEnd(10))
    .join("")}`
);

repos.forEach((repo, index) => {
  const { error, results } = scores[index];
  console.log(`\n${repo.name} (${repo.dir.split(/[\\/]/).pop()})`);
  if (error) {
    console.log(`  Could not score: ${error}`);
    return;
  }
  const failures = results.map((result, i) => [checks[i].label, result]).filter(([, result]) => result !== null);
  if (failures.length === 0) console.log("  Every check passed.");
  failures.forEach(([label, result]) => console.log(`  FAIL ${label}: ${result}`));
});
console.log();
