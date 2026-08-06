import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const siteDir = path.join(root, "site");
const indexHtml = fs.readFileSync(path.join(siteDir, "index.html"), "utf8");
const appJs = fs.readFileSync(path.join(siteDir, "app.js"), "utf8");
const stylesCss = fs.readFileSync(path.join(siteDir, "styles.css"), "utf8");
const studentsModule = fs.readFileSync(path.join(siteDir, "students.js"), "utf8");
const { students } = await import(`data:text/javascript;base64,${Buffer.from(studentsModule).toString("base64")}`);
const requiredPromAssets = [
  "assets/prom-2000/fondo-prom.jpg",
  "assets/prom-2000/once-a.jpg",
  "assets/prom-2000/once-b.jpg",
  "assets/prom-2000/momentos-collage.jpg",
  "assets/prom-2000/momentos-11.gif",
];
const requiredPalabrasAssets = [
  "assets/palabras/rectora.jpg",
  "assets/palabras/gonzalo-serna-01.jpg",
  "assets/palabras/gonzalo-serna-02.jpg",
];

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
assert(indexHtml.includes('id="palabras"'), "Palabras section must exist");
assert(indexHtml.includes("Momentos 11"), "Prom 2000 section must include Momentos 11");
assert(indexHtml.includes("Palabras 11"), "Palabras section must include Palabras 11");
assert(indexHtml.includes("Adolfo Ballesteros F. Prom 2000"), "Palabras 11 text must include its signature");
assert(!indexHtml.toLowerCase().includes(".swf"), "index.html must not embed Flash");
assert(!appJs.toLowerCase().includes(".swf"), "app.js must not embed Flash");
assert(!stylesCss.toLowerCase().includes(".swf"), "styles.css must not reference Flash");
assert(
  /@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{[\s\S]*?scroll-behavior:\s*auto;/i.test(stylesCss),
  "styles.css must restore automatic scrolling for reduced-motion preferences",
);
assert(
  stylesCss.includes("assets/prom-2000/fondo-prom.jpg"),
  "Prom 2000 background must be used by the static site",
);
assert(students.length >= 35, "student data should include the graduating class");
assert(students.some((student) => student.group === "11A"), "student data should include 11A");
assert(students.some((student) => student.group === "11B"), "student data should include 11B");

const legacyLayoutStudents = students.filter((student) => student.legacyLayout);
const compositeStudents = students.filter((student) => student.legacyLayout?.type === "composite");
const articleStudents = students.filter((student) => student.legacyLayout?.type === "article");
assert(legacyLayoutStudents.length === 10, "student data must include ten legacy-aware alumni layouts");
assert(compositeStudents.length === 8, "student data must include eight composite legacy layouts");
assert(articleStudents.length === 2, "student data must include two article legacy layouts");
assert(
  students.some((student) => student.id === "galindo-olarte-andres-david" && student.legacyLayout?.type === "article"),
  "Galindo must render the rest of the original text-heavy page",
);
assert(
  students.some((student) => student.id === "martinez-garzon-ingrid-dahilla" && student.legacyLayout?.type === "article"),
  "Ingrid must render the original text, not only the photo",
);
assert(
  students.some((student) => student.id === "neira-castano-nasbly-hilduara" && student.legacyLayout?.textBlocks?.length === 1),
  "Nasbly must render the positioned legacy text block",
);

const activeProm2000Sections = appJs.match(/\{\s*name:\s*'Prom 2000',\s*active:\s*true,\s*href:\s*'#prom-2000'\s*\}/g) || [];
assert(activeProm2000Sections.length === 1, "app.js must declare exactly one active Prom 2000 section");
const activePalabrasSections = appJs.match(/\{\s*name:\s*'Palabras de despedida',\s*active:\s*true,\s*href:\s*'#palabras'\s*\}/g) || [];
assert(activePalabrasSections.length === 1, "app.js must declare exactly one active Palabras section");
assert(
  appJs.includes("item.textContent = active ? name : `${name} (pendiente)`;"),
  "app.js must mark pending navigation sections in its static source",
);

const expectedSonali = {
  legacyPage: "Archive/ANUARIO/paginas11/sonali.htm",
  image: "Archive/ANUARIO/imagenes/alumnos/sonali.jpg",
};
const sonali = students.find((student) => student.id === "pal-forero-sonali");
assert(Boolean(sonali), "student data must include Pal Forero Sonali");
assert(sonali?.legacyPage === expectedSonali.legacyPage, "Sonali must use her corrected legacy profile page");
assert(sonali?.image === expectedSonali.image, "Sonali must use her corrected archive image");

for (const field of ["legacyPage", "image"]) {
  const owners = new Map();

  for (const student of students) {
    const value = student[field];
    if (!value) continue;
    owners.set(value, [...(owners.get(value) || []), student.name]);
  }

  for (const [value, names] of owners) {
    assert(names.length === 1, `${field} must not be shared by multiple students: ${value}`);
  }
}

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

for (const student of compositeStudents) {
  assert(student.legacyLayout.width > 0, `${student.name} composite layout must have width`);
  assert(student.legacyLayout.height > 0, `${student.name} composite layout must have height`);
  assert(student.legacyLayout.images.length >= 1, `${student.name} composite layout must use at least one image`);

  for (const image of student.legacyLayout.images) {
    assert(fs.existsSync(path.join(siteDir, image.src)), `${student.name} composite asset must exist: ${image.src}`);
  }
}

for (const student of articleStudents) {
  const layout = student.legacyLayout;
  assert(Array.isArray(layout.paragraphs) && layout.paragraphs.length > 0, `${student.name} article layout must include paragraphs`);

  if (layout.image) {
    assert(fs.existsSync(path.join(siteDir, layout.image.src)), `${student.name} article image must exist: ${layout.image.src}`);
  }

  if (layout.backgroundImage) {
    assert(fs.existsSync(path.join(siteDir, layout.backgroundImage)), `${student.name} article background must exist: ${layout.backgroundImage}`);
  }
}

for (const asset of requiredPromAssets) {
  assert(fs.existsSync(path.join(siteDir, asset)), `Prom 2000 asset must exist: ${asset}`);
  assert(
    indexHtml.includes(asset) || stylesCss.includes(asset),
    `Prom 2000 asset must be referenced by the static site: ${asset}`,
  );
}

for (const asset of requiredPalabrasAssets) {
  assert(fs.existsSync(path.join(siteDir, asset)), `Palabras asset must exist: ${asset}`);
  assert(indexHtml.includes(asset), `Palabras asset must be referenced by index.html: ${asset}`);
}

assert(appJs.includes("renderLegacyLayout(student)"), "app.js must render composite alumni layouts");
assert(appJs.includes("renderLegacyArticle(student)"), "app.js must render article alumni layouts");
assert(stylesCss.includes(".legacy-layout"), "styles.css must style composite alumni layouts");
assert(stylesCss.includes(".legacy-article"), "styles.css must style article alumni layouts");
assert(stylesCss.includes(".palabras-composite"), "styles.css must style the Gonzalo Serna composite");

if (!process.exitCode) console.log("Static site verification passed.");
