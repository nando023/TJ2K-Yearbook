import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const promPath = path.join(root, "Archive/ANUARIO/paginas_totales/prom2000.htm");
const pagesDir = path.join(root, "Archive/ANUARIO/paginas11");
const outputPath = path.join(root, "site/students.js");

const imageByLegacyPage = new Map();
const ingridText = [
  "Cuando llega el momento de decir adiós es difícil hacerlo, después de haber encontrado tanta gente en mi camino con la que he compartido tan buenos momentos.",
  "Me gustaría expresar lo que siento al despedirme de este colegio, de mis amigos y profesores, que me tuvieron que aguantar, y yo a ellos sobre todo; pobre gente (no mentiras). Le doy gracias a Dios sobre todo por permitir que mis padres pudieran ayudarme como lo han hecho hasta ahora. Mis padres lo son todo para mí, y sin ellos yo no sería nada; todo aquel triunfo que tenga será dedicado a ustedes mis papitos.",
  "A mis hermanos gracias por su apoyo, por ser como son; recuerden que cada uno de ustedes ocupa un lugar en mi corazón. A mis grandes amigos: Gustavo sabes que eres mi mejor amigo y que te adoro, Rafa por estar conmigo en todos los momentos, y por llevarme la cuerda en todo. A Motas recuerda que te he aprendido a querer mucho, te deseo que seas muy famoso \"Juan Pablo Montoya II\".",
  "A Dianis por ser tan tierna, a Diana S., nunca voy a olvidar todo lo que hicimos, lo cual siempre me va a hacer reír, a Mónica mi hormiguita culpan, a Luisa, Bernis, Maikel, al gordo y Santiago por hacerme reír tanto. Y a pesar de todo a Ana Barón que sea como sea en algún momento de mi vida fue mi mejor amiga, y pasamos los mejores momentos juntas.",
  "A amigos re-especiales que desafortunadamente no se pudieron graduar conmigo: Nubia, Caro, Jose, Juan Pablo. Siempre, siempre los voy a llevar en mi corazón, y nunca voy a olvidar lo especiales que fueron conmigo. En fin gracias a todo once y profesores como Coni y Miss Debi. Y como olvidar al patrocinador de mis informes, suspendidas, regaños, castigos, Carlos González; de todos modos te perdono, y a Manuel González gracias por tratar de disciplinarme. Ah, y perdón a todos los de once que fueron afectados por aquellos libros, cuadernos, esferos, cartucheras, maletas, sacos, etc. que boté.",
];
const galindoText = [
  "Cada vez que alcanzamos una meta nos sentimos bien y nos animamos a llegar más alto. En este caso el colegio nos deja una satisfacción de haber aprendido muchas cosas, y lo más importante, haber compartido y habernos formado junto a personas tan valiosas como son los amigos (mis más allegados: Cesar, David, Adolfo y Diego).",
  "Así entonces estamos preparados para subir una escala más en el camino de la vida sin temer a caer y no volvernos a levantar porque en el colegio hemos entendido que haciendo un esfuerzo cumpliremos nuestro propósito.",
  "Agradezco a todos los profesores que me brindaron su sabiduría y me inculcaron las ganas de aprender cada día más, a Carlos Gonzáles, a las personas con quienes de alguna u otra forma he convivido en este segundo hogar, a mis amigos, a mi familia que siempre ha creído en mí (mis abuelitos, mis tíos y primos) y a mis padres quienes son las personas más importantes que me han dado todo para que yo logre mis sueños.",
];
const nasblyText = "HOY CUANDO ME DOY CUENTA DE QUE YA NO SOMOS AQUELLOS PEQUEÑOS NIÑOS ME PREGUNTO, ¿EN QUÉ MOMENTO CRECIMOS?, Y VEO QUE DE TODO LO VIVIDO TAN SOLO QUEDAN LOS MEJORES RECUERDOS. ESTOY FELIZ DE QUE ESTE DIA HAYA LLEGADO, YA QUE ALCANCÉ UNA DE MIS MÁS GRANDES METAS, PERO TRISTE DE DEJAR A TODAS AQUELLAS PERSONAS TAN MARAVILLOSAS QUE SIEMPRE ESTUVIERON AHÍ PARA MÍ Y QUE DE UNA U OTRA FORMA ME APOYARON. QUIERO AGRADECER ESPECIALMENTE A MIS PAPÁS PORQUE SIEMPRE ESTUVIERON AHÍ APOYÁNDOME, ACONSEJÁNDOME, CUIDÁNDOME, FORMÁNDOME Y EDUCÁNDOME PARA ASI LLEGAR A SER LA PERSONA QUE HOY SOY, GRACIAS, SÉ QUE SIN USTEDES NO LO HUBIERA LOGRADO, LOS AMO. A MI ABUELITA POR SIEMPRE ESTAR AHÍ CONSINTIÉNDOME Y QUERIÉNDOME DESDE QUE NACÍ HASTA HOY, TE QUIERO MUCHO. A MIS HERMANOS, QUE A PESAR DE TODAS NUESTRAS PELEAS LOS QUIERO MUCHO PORQUE SIEMPRE ME HAN TRATADO DE MOSTRAR SUS ERRORES PARA QUE YO NO VAYA A COMETER LOS MISMOS EN MI FUTURO, GRACIAS.";
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
    width: 755,
    height: 802,
    background: "#ffffff",
    images: [
      { src: "assets/students/legacy/bernardo.jpg", alt: "Página original de Álvarez Castrillon Bernardo", left: 66.5, top: 0, width: 622, height: 802 },
      { src: "assets/students/alvarez-castrillon-bernardo.jpg", alt: "Fotografía superpuesta de Álvarez Castrillon Bernardo", left: 105, top: 37, width: 192, height: 261 },
    ],
  }],
  ["../paginas11/carolina_delaosa.htm", {
    type: "composite",
    width: 755,
    height: 785,
    background: "#ffffff",
    images: [
      { src: "assets/students/legacy/mesa-de-la-osita.jpg", alt: "Página original de Mesa De La Ossa Carolina", left: 66.5, top: 0, width: 622, height: 785 },
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
    width: 755,
    height: 872,
    background: "#ffffff",
    images: [
      { src: "assets/students/jimenez-giraldo-luisa-fernanda.jpg", alt: "Página original de Jiménez Giraldo Luisa Fernanda", left: 43.5, top: 0, width: 668, height: 872 },
      { src: "assets/students/legacy/luisa-fernanda-jimenez.jpg", alt: "Fotografía superpuesta de Jiménez Giraldo Luisa Fernanda", left: 36, top: 52, width: 253, height: 312 },
    ],
  }],
  ["../paginas11/ingrid_martinez.htm", {
    type: "article",
    theme: "plain",
    image: { src: "assets/students/martinez-garzon-ingrid-dahilla.jpg", alt: "Retrato de Martínez Garzón Ingrid Dahilla", width: 235, height: 341 },
    paragraphs: ingridText,
  }],
  ["../paginas11/nasbly.htm", {
    type: "composite",
    width: 755,
    height: 1074,
    background: "#ffffff",
    images: [
      { src: "assets/students/neira-castano-nasbly-hilduara.jpg", alt: "Página original de Neira Castaño Nasbly Hilduara", left: 0, top: 0, width: 755, height: 1074 },
    ],
    textBlocks: [
      { text: nasblyText, left: 62, top: 398, width: 641, height: 354, color: "#314afb", fontSize: 17, lineHeight: 1.22, fontWeight: 700, textAlign: "center", fontFamily: "Arial, Helvetica, sans-serif" },
    ],
  }],
  ["../paginas11/rafael_villamizar.htm", {
    type: "composite",
    width: 755,
    height: 860,
    background: "#ffffff",
    images: [
      { src: "assets/students/legacy/rafael-villamizar.JPG", alt: "Página original de Villamizar Angulo Rafael Antonio", left: 52, top: 0, width: 651, height: 860 },
      { src: "assets/students/villamizar-angulo-rafael-antonio.jpg", alt: "Fotografía superpuesta de Villamizar Angulo Rafael Antonio", left: 52, top: 19, width: 242, height: 343 },
    ],
  }],
  ["../paginas11/galindo.htm", {
    type: "article",
    theme: "space",
    backgroundImage: "assets/students/legacy/fondo-planeta.jpg",
    image: { src: "assets/students/galindo-olarte-andres-david.jpg", alt: "Retrato de Galindo Olarte Andres David", width: 190, height: 276 },
    title: "Andres David Galindo",
    subtitle: "11 AÑOS EN EL COLEGIO",
    details: [
      { label: "PROFESIÓN", value: "INGENIERÍA electrónica" },
    ],
    paragraphs: galindoText,
    closing: [
      "SIN USTEDES NO HUBIERA LLEGADO AL LUGAR DONDE ESTOY.",
      "MUCHAS GRACIAS",
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
