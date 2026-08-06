import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const promPath = path.join(root, "Archive/ANUARIO/paginas_totales/prom2000.htm");
const pagesDir = path.join(root, "Archive/ANUARIO/paginas11");
const outputPath = path.join(root, "site/students.js");

const imageByLegacyPage = new Map();

for (const file of fs.readdirSync(pagesDir)) {
  if (!file.toLowerCase().endsWith(".htm")) continue;
  const html = fs.readFileSync(path.join(pagesDir, file), "latin1");
  const imgMatch = html.match(/<img\s+[^>]*src=["']([^"']+)["'][^>]*>/i);
  if (!imgMatch) continue;
  const image = imgMatch[1].replace("../", "Archive/ANUARIO/");
  imageByLegacyPage.set(`../paginas11/${file}`, image);
}

function cleanText(value) {
  return value
    .replace(/&ntilde;/gi, "ñ")
    .replace(/&Ntilde;/gi, "Ñ")
    .replace(/&oacute;/gi, "ó")
    .replace(/&Oacute;/gi, "Ó")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function slugify(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const html = fs.readFileSync(promPath, "latin1");
const rows = [...html.matchAll(/<tr[\s\S]*?<\/tr>/gi)];
const students = [];

for (const row of rows) {
  const cells = [...row[0].matchAll(/<td[\s\S]*?<\/td>/gi)];
  cells.forEach((cell, index) => {
    const linkMatch = cell[0].match(/<a\s+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/i);
    const text = cleanText((linkMatch ? linkMatch[2] : cell[0]).replace(/<[^>]*>/g, " "));
    if (!text || ["11A", "11 B"].includes(text) || text.length < 5) return;
    const legacyPage = linkMatch ? linkMatch[1] : "";
    const image = legacyPage ? imageByLegacyPage.get(legacyPage) || "" : "";
    students.push({
      id: slugify(text),
      name: text,
      group: index === 0 ? "11A" : "11B",
      legacyPage: legacyPage.replace("../", "Archive/ANUARIO/"),
      image,
      hasProfileImage: Boolean(image),
    });
  });
}

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(
  outputPath,
  `export const students = ${JSON.stringify(students, null, 2)};\n`,
  "utf8",
);

console.log(`Wrote ${students.length} students to ${path.relative(root, outputPath)}`);
