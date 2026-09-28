import { readdir } from "node:fs/promises";
import { extname, join } from "node:path";
import { spawnSync } from "node:child_process";

async function collectJavaScript(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await collectJavaScript(path)));
    if (entry.isFile() && [".js", ".mjs"].includes(extname(entry.name))) {
      files.push(path);
    }
  }
  return files;
}

const files = [
  ...(await collectJavaScript("src")),
  ...(await collectJavaScript("test")),
  ...(await collectJavaScript("scripts")),
];

for (const file of files) {
  const result = spawnSync(process.execPath, ["--check", file], {
    encoding: "utf8",
  });
  if (result.status !== 0) {
    process.stderr.write(result.stderr);
    process.exit(result.status ?? 1);
  }
}

process.stdout.write(`Checked ${files.length} JavaScript files\n`);
