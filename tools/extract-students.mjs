import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const promPath = path.join(root, "Archive/ANUARIO/paginas_totales/prom2000.htm");
const pagesDir = path.join(root, "Archive/ANUARIO/paginas11");
const outputPath = path.join(root, "site/students.js");

const imageByLegacyPage = new Map();
const legacyLayoutsByPage = new Map([
  ["../paginas11/adolfo_b.htm", {
    type: "composite",
    width: 755,
    height: 1190,
    background: "#000000",
    images: [
      { src: "assets/students/ballesteros-fernandez-adolfo.JPG", alt: "Página original de Ballesteros Fernandez Adolfo", left: 0, top: 0, width: 755, height: 1190 },
      { src: "assets/students/legacy/1.jpg", alt: "Fotografía superpuesta de Ballesteros Fernandez Adolfo", left: 20, top: 29, width: 215, height: 299 },
    ],
  }],
  ["../paginas11/bernardo.htm", {
    type: "composite",
    width: 622,
    height: 802,
    background: "#ffffff",
    images: [
      { src: "assets/students/legacy/bernardo.jpg", alt: "Página original de Álvarez Castrillon Bernardo", left: 0, top: 0, width: 622, height: 802 },
      { src: "assets/students/alvarez-castrillon-bernardo.jpg", alt: "Fotografía superpuesta de Álvarez Castrillon Bernardo", left: 105, top: 37, width: 192, height: 261 },
    ],
  }],
  ["../paginas11/carolina_delaosa.htm", {
    type: "composite",
    width: 622,
    height: 785,
    background: "#ffffff",
    images: [
      { src: "assets/students/legacy/mesa-de-la-osita.jpg", alt: "Página original de Mesa De La Ossa Carolina", left: 0, top: 0, width: 622, height: 785 },
      { src: "assets/students/mesa-de-la-ossa-carolina.jpg", alt: "Fotografía superpuesta de Mesa De La Ossa Carolina", left: 127, top: 59, width: 163, height: 262 },
    ],
  }],
  ["../paginas11/david_osorio.htm", {
    type: "composite",
    width: 755,
    height: 1190,
    background: "#ffffff",
    images: [
      { src: "assets/students/osorio-vargas-david-alexander.jpg", alt: "Página original de Osorio Vargas David Alexander", left: 0, top: 0, width: 755, height: 1190 },
      { src: "assets/students/legacy/11.jpg", alt: "Fotografía superpuesta de Osorio Vargas David Alexander", left: 57, top: 199, width: 145, height: 212 },
    ],
  }],
  ["../paginas11/diego.htm", {
    type: "composite",
    width: 755,
    height: 1089,
    background: "#ffffff",
    images: [
      { src: "assets/students/legacy/diego.JPG", alt: "Página original de Berdugo Rodriguez Diego Fernando", left: 0, top: 0, width: 755, height: 1089 },
      { src: "assets/students/berdugo-rodriguez-diego-fernando.jpg", alt: "Fotografía superpuesta de Berdugo Rodriguez Diego Fernando", left: 613, top: 304, width: 111, height: 115 },
    ],
  }],
  ["../paginas11/luisa_fernanda.htm", {
    type: "composite",
    width: 668,
    height: 872,
    background: "#ffffff",
    images: [
      { src: "assets/students/jimenez-giraldo-luisa-fernanda.jpg", alt: "Página original de Jiménez Giraldo Luisa Fernanda", left: 0, top: 0, width: 668, height: 872 },
      { src: "assets/students/legacy/luisa-fernanda-jimenez.jpg", alt: "Fotografía superpuesta de Jiménez Giraldo Luisa Fernanda", left: 36, top: 52, width: 253, height: 312 },
    ],
  }],
  ["../paginas11/rafael_villamizar.htm", {
    type: "composite",
    width: 651,
    height: 860,
    background: "#ffffff",
    images: [
      { src: "assets/students/legacy/rafael-villamizar.JPG", alt: "Página original de Villamizar Angulo Rafael Antonio", left: 0, top: 0, width: 651, height: 860 },
      { src: "assets/students/villamizar-angulo-rafael-antonio.jpg", alt: "Fotografía superpuesta de Villamizar Angulo Rafael Antonio", left: 52, top: 19, width: 242, height: 343 },
    ],
  }],
]);
const sourceCorrections = new Map([
  ["Pal Forero Sonali", {
    legacyPage: "../paginas11/sonali.htm",
    image: "Archive/ANUARIO/imagenes/alumnos/sonali.jpg",
  }],
]);

function normalizeLegacyPage(value) {
  return value.replace(/%([0-9a-f]{2})/gi, (_, hex) =>
    String.fromCharCode(Number.parseInt(hex, 16)),
  );
}

for (const file of fs.readdirSync(pagesDir)) {
  if (!file.toLowerCase().endsWith(".htm")) continue;
  const html = fs.readFileSync(path.join(pagesDir, file), "latin1");
  const imgMatch = html.match(/<img\s+[^>]*src=["']([^"']+)["'][^>]*>/i);
  if (!imgMatch) continue;
  const image = imgMatch[1].replace("../", "Archive/ANUARIO/");
  imageByLegacyPage.set(normalizeLegacyPage(`../paginas11/${file}`), image);
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
const studentTable = [...html.matchAll(/<table\b[^>]*>[\s\S]*?<\/table>/gi)].find(
  ([table]) => /<a\s+href=["']\.\.\/paginas11\//i.test(table),
)?.[0] || "";
const rows = [...studentTable.matchAll(/<tr[\s\S]*?<\/tr>/gi)];
const students = [];

for (const row of rows) {
  const cells = [...row[0].matchAll(/<td[\s\S]*?<\/td>/gi)];
  cells.forEach((cell, index) => {
    const linkMatch = cell[0].match(/<a\s+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/i);
    const text = cleanText((linkMatch ? linkMatch[2] : cell[0]).replace(/<[^>]*>/g, " "));
    if (!text || ["11A", "11 B"].includes(text) || text.length < 5) return;
    let legacyPage = linkMatch ? linkMatch[1] : "";
    let image = legacyPage
      ? imageByLegacyPage.get(normalizeLegacyPage(legacyPage)) || ""
      : "";
    const correction = sourceCorrections.get(text);

    if (correction) {
      legacyPage = correction.legacyPage;
      image = correction.image;
    }

    const legacyLayout = legacyLayoutsByPage.get(normalizeLegacyPage(legacyPage));
    const student = {
      id: slugify(text),
      name: text,
      group: index === 0 ? "11A" : "11B",
      legacyPage: legacyPage.replace("../", "Archive/ANUARIO/"),
      image,
      hasProfileImage: Boolean(image),
    };

    if (legacyLayout) student.legacyLayout = legacyLayout;

    students.push(student);
  });
}

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(
  outputPath,
  `export const students = ${JSON.stringify(students, null, 2)};\n`,
  "utf8",
);

console.log(`Wrote ${students.length} students to ${path.relative(root, outputPath)}`);
