import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const siteDir = path.join(root, "site");
const indexHtml = fs.readFileSync(path.join(siteDir, "index.html"), "utf8");
const appJs = fs.readFileSync(path.join(siteDir, "app.js"), "utf8");
const studentsModule = fs.readFileSync(path.join(siteDir, "students.js"), "utf8");
const { students } = await import(`data:text/javascript;base64,${Buffer.from(studentsModule).toString("base64")}`);

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exitCode = 1;
  }
}

function decodeArchivePath(archivePath) {
  return archivePath.replace(/%([\dA-Fa-f]{2})/g, (_, hex) => String.fromCharCode(Number.parseInt(hex, 16)));
}

assert(indexHtml.includes('lang="es"'), "index.html must declare Spanish language");
assert(indexHtml.includes('id="prom-2000"'), "Prom 2000 section must exist");
assert(!indexHtml.toLowerCase().includes(".swf"), "index.html must not embed Flash");
assert(!appJs.toLowerCase().includes(".swf"), "app.js must not embed Flash");
assert(students.length >= 35, "student data should include the graduating class");
assert(students.some((student) => student.group === "11A"), "student data should include 11A");
assert(students.some((student) => student.group === "11B"), "student data should include 11B");

for (const student of students.filter((entry) => entry.hasProfileImage)) {
  const archiveImage = path.join(root, decodeArchivePath(student.image));
  const packagedImage = path.join(
    siteDir,
    "assets",
    "students",
    `${student.id}${path.extname(student.image)}`,
  );

  assert(fs.existsSync(archiveImage), `${student.name} archive image must exist: ${student.image}`);
  assert(fs.existsSync(packagedImage), `${student.name} packaged image must exist: ${path.relative(root, packagedImage)}`);
}

if (!process.exitCode) console.log("Static site verification passed.");
