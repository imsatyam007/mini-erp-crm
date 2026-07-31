import fs from "node:fs";
import path from "node:path";

const SRC_DIR = path.resolve("src");

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, files);
    } else if (entry.isFile() && entry.name.endsWith(".ts") && !entry.name.endsWith(".d.ts")) {
      files.push(fullPath);
    }
  }
  return files;
}

function hasExtension(p) {
  const base = path.basename(p);
  return /\.[a-zA-Z0-9]+$/.test(base) && (base.endsWith(".js") || base.endsWith(".json") || base.endsWith(".mjs") || base.endsWith(".cjs"));
}

// Matches: from "./something" or from '../something'
// Also matches dynamic import("./something")
const importRegex = /(\bfrom\s+|\bimport\(\s*)(["'])(\.\.?\/[^"']+)\2/g;

let changedFiles = 0;
let changedImports = 0;

for (const file of walk(SRC_DIR)) {
  const original = fs.readFileSync(file, "utf8");
  let fileChanged = false;

  const updated = original.replace(importRegex, (match, prefix, quote, importPath) => {
    if (hasExtension(importPath)) {
      return match; // already has a valid extension, leave it
    }
    fileChanged = true;
    changedImports++;
    return `${prefix}${quote}${importPath}.js${quote}`;
  });

  if (fileChanged) {
    fs.writeFileSync(file, updated, "utf8");
    changedFiles++;
    console.log(`Updated: ${path.relative(process.cwd(), file)}`);
  }
}

console.log(`\nDone. ${changedImports} import(s) updated across ${changedFiles} file(s).`);