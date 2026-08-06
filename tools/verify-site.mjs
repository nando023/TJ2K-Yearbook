import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const siteDir = path.join(root, "site");
const archiveImagesDir = path.join(root, "Archive", "ANUARIO", "imagenes");
const indexHtml = fs.readFileSync(path.join(siteDir, "index.html"), "utf8");
const appJs = fs.readFileSync(path.join(siteDir, "app.js"), "utf8");
const stylesCss = fs.readFileSync(path.join(siteDir, "styles.css"), "utf8");
const studentsModule = fs.readFileSync(path.join(siteDir, "students.js"), "utf8");
const { students } = await import(`data:text/javascript;base64,${Buffer.from(studentsModule).toString("base64")}`);
const requiredMainAssets = [
  "assets/main/fondo-principal.jpg",
  "assets/main/indice-fondo.gif",
  "assets/main/jeferon.jpg",
  "assets/main/logo-viejo.jpg",
];
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
const requiredPersonalAdministrativoAssets = [
  "assets/personal-administrativo/fondo.gif",
  "assets/personal-administrativo/luis-jorge-santos.jpg",
  "assets/personal-administrativo/martha-arenas.jpg",
  "assets/personal-administrativo/claudia-angulo.jpg",
  "assets/personal-administrativo/jairo-moreno-sierra.jpg",
  "assets/personal-administrativo/gloria-archila-soto.jpg",
  "assets/personal-administrativo/alvaro-german-quecano.jpg",
  "assets/personal-administrativo/angela-granados.jpg",
  "assets/personal-administrativo/juliana-vargas.jpg",
  "assets/personal-administrativo/diana-poveda.jpg",
  "assets/personal-administrativo/blanca-miriam-gomez.jpg",
];
const requiredServiciosGeneralesAssets = [
  "assets/servicios-generales/servicios-generales.jpg",
  "assets/servicios-generales/luis-albero-gozales.jpg",
  "assets/servicios-generales/luis-alberto-correa.jpg",
  "assets/servicios-generales/terapia-ocupacional.jpg",
];
const requiredProfesoresAssets = [
  "assets/profesores/fondo.gif",
  "assets/profesores/preescolar.jpg",
  "assets/profesores/sandra-milena-otalora.jpg",
  "assets/profesores/diana-ramirez.jpg",
  "assets/profesores/dolly-romero.jpg",
  "assets/profesores/jaime-gonzales.jpg",
  "assets/profesores/ligia-forero.jpg",
  "assets/profesores/nelson-correa.jpg",
  "assets/profesores/rubi-bastidas.jpg",
  "assets/profesores/carlos-gonzales.jpg",
  "assets/profesores/adolfo-triana.jpg",
  "assets/profesores/ana-liliana-espitia.jpg",
  "assets/profesores/ana-rosa-melo.jpg",
  "assets/profesores/diego-jimenez.jpg",
  "assets/profesores/hector-gonzalo-tuesta.jpg",
  "assets/profesores/jean-fontaine.jpg",
  "assets/profesores/juan-carlos-urrea.jpg",
  "assets/profesores/luis-gonzalo-serna.jpg",
  "assets/profesores/manuel-gonzales.jpg",
  "assets/profesores/nelson-mejia.jpg",
  "assets/profesores/nelson-yara.jpg",
];
const requiredPreescolarAssets = [
  "assets/preescolar/fondo.jpg",
  "assets/preescolar/parvulos.jpg",
  "assets/preescolar/pre-jardin.jpg",
  "assets/preescolar/jardin-a.jpg",
  "assets/preescolar/jardin-b.jpg",
  "assets/preescolar/transicion-a.jpg",
  "assets/preescolar/transicion-b.jpg",
];
const requiredPrimariaAssets = [
  "assets/primaria/fondo.jpg",
  "assets/primaria/primero-a.jpg",
  "assets/primaria/primero-b.jpg",
  "assets/primaria/segundo-a.jpg",
  "assets/primaria/segundo-b.jpg",
  "assets/primaria/tercero-a.jpg",
  "assets/primaria/tercero-b.jpg",
  "assets/primaria/cuarto-a.jpg",
  "assets/primaria/cuarto-b.jpg",
  "assets/primaria/quinto-a.jpg",
  "assets/primaria/quinto-b.jpg",
];
const requiredBachilleratoAssets = [
  "assets/bachillerato/fondo-fiesta.jpg",
  "assets/bachillerato/sexto-a.jpg",
  "assets/bachillerato/sexto-b.jpg",
  "assets/bachillerato/septimo-a.jpg",
  "assets/bachillerato/septimo-b.jpg",
  "assets/bachillerato/octavo-a.jpg",
  "assets/bachillerato/octavo-b.jpg",
  "assets/bachillerato/noveno-a.jpg",
  "assets/bachillerato/noveno-b.jpg",
  "assets/bachillerato/decimo-a.jpg",
  "assets/bachillerato/decimo-b.jpg",
  "assets/bachillerato/undecimo-a.jpg",
  "assets/bachillerato/undecimo-b.jpg",
];
const requiredComitesAssets = [
  "assets/comites/fondo-comites.jpg",
  "assets/comites/gobierno-estudiantil.jpg",
  "assets/comites/comite-anuario.jpg",
];
const requiredEquiposAssets = [
  "assets/equipos/fondo-porristas.jpg",
  "assets/equipos/fondo-fiesta.jpg",
  "assets/equipos/futbol.jpg",
  "assets/equipos/porristas-infantil.jpg",
  "assets/equipos/porristas-bachillerato.jpg",
];
const requiredParejasAssets = [
  "assets/parejas/fondo-parejas.gif",
  "assets/parejas/bernardo-luisa.jpg",
  "assets/parejas/depravado.jpg",
  "assets/parejas/elena.jpg",
  "assets/parejas/maria-paula.jpg",
  "assets/parejas/ska-chulo.jpg",
  "assets/parejas/novios.jpg",
  "assets/parejas/prieto.jpg",
  "assets/parejas/mi-poste-y-yo.jpg",
];
const requiredHermanosAssets = [
  "assets/hermanos/fondo-hermanos.jpg",
  "assets/hermanos/bernardo-mas-uno.jpg",
  "assets/hermanos/ku-klux-klan.jpg",
  "assets/hermanos/familia-bom-bom-bum.jpg",
  "assets/hermanos/familia-chan.jpg",
  "assets/hermanos/familia-gallego.jpg",
  "assets/hermanos/familia-desplazados.jpg",
  "assets/hermanos/familia-picachu.jpg",
  "assets/hermanos/familia-pirata.jpg",
  "assets/hermanos/familia-skallenato.jpg",
  "assets/hermanos/los-super-amigos.jpg",
  "assets/hermanos/cartel-de-bogota.jpg",
  "assets/hermanos/la-brigada-ska.jpg",
];
const requiredCollageAssets = [
  "assets/collage/septimo-grado.jpg",
  "assets/collage/noveno-grado-1.jpg",
  "assets/collage/noveno-grado-2.jpg",
  "assets/collage/momentos-11-1.gif",
  "assets/collage/momentos-11-2.jpg",
  "assets/collage/bebes.jpg",
];
const expectedParejasArchiveCopies = [
  { source: "FONDO_PAREJAS.gif", asset: "assets/parejas/fondo-parejas.gif" },
  { source: "BERNARDO & LUISA2.jpg", asset: "assets/parejas/bernardo-luisa.jpg" },
  { source: "DEPRAVADO.jpg", asset: "assets/parejas/depravado.jpg" },
  { source: "ELENA1.jpg", asset: "assets/parejas/elena.jpg" },
  { source: "MARIA PAULA1.jpg", asset: "assets/parejas/maria-paula.jpg" },
  { source: "SKA & CHULO.jpg", asset: "assets/parejas/ska-chulo.jpg" },
  { source: "NOVIOS1.jpg", asset: "assets/parejas/novios.jpg" },
  { source: "PRIETO2.jpg", asset: "assets/parejas/prieto.jpg" },
  { source: "MI POSTE Y YO.jpg", asset: "assets/parejas/mi-poste-y-yo.jpg" },
];
const expectedHermanosArchiveCopies = [
  { source: "FONDO_HERMANOS.jpg", asset: "assets/hermanos/fondo-hermanos.jpg" },
  { source: "BERNARDO + 1.jpg", asset: "assets/hermanos/bernardo-mas-uno.jpg" },
  { source: "KU KLUX KLAN.jpg", asset: "assets/hermanos/ku-klux-klan.jpg" },
  { source: "FAMILIA BOM BOM BUM.jpg", asset: "assets/hermanos/familia-bom-bom-bum.jpg" },
  { source: "FAMILIA CHAN.jpg", asset: "assets/hermanos/familia-chan.jpg" },
  { source: "FAMILIA GALLEGO.jpg", asset: "assets/hermanos/familia-gallego.jpg" },
  { source: "FAMILIA DESPLAZADOS.jpg", asset: "assets/hermanos/familia-desplazados.jpg" },
  { source: "FAMILIA PICACHU.jpg", asset: "assets/hermanos/familia-picachu.jpg" },
  { source: "FAMILIA PIRATA.jpg", asset: "assets/hermanos/familia-pirata.jpg" },
  { source: "FAMILIA SKALLENATO.jpg", asset: "assets/hermanos/familia-skallenato.jpg" },
  { source: "LOS SUPER AMIGOS.jpg", asset: "assets/hermanos/los-super-amigos.jpg" },
  { source: "CARTEL DE BOGOTA.jpg", asset: "assets/hermanos/cartel-de-bogota.jpg" },
  { source: "LA BRIGADA SKA.jpg", asset: "assets/hermanos/la-brigada-ska.jpg" },
];
const expectedCollageArchiveCopies = [
  { source: "7° Grado collage.jpg", asset: "assets/collage/septimo-grado.jpg" },
  { source: "9° Grado collage.jpg", asset: "assets/collage/noveno-grado-1.jpg" },
  { source: "9° Grado collage2.jpg", asset: "assets/collage/noveno-grado-2.jpg" },
  { source: "collage_momentos_11111.gif", asset: "assets/collage/momentos-11-1.gif" },
  { source: "collage.jpg", asset: "assets/collage/momentos-11-2.jpg" },
  { source: "collag_ebebes.jpg", asset: "assets/collage/bebes.jpg" },
];
const expectedMainArchiveCopies = [
  { source: "FONDO_PRINCIPAL.jpg", asset: "assets/main/fondo-principal.jpg" },
  { source: "image001.gif", asset: "assets/main/indice-fondo.gif" },
  { source: "NUEVAS FOTOS/JEFERSON.jpg", asset: "assets/main/jeferon.jpg" },
  { source: "logo1-viejo.jpg", asset: "assets/main/logo-viejo.jpg" },
];
const expectedBachilleratoCards = [
  {
    title: "Sexto A",
    image: "assets/bachillerato/sexto-a.jpg",
    detail: "Fila 1: Andrés F. Morales",
    teacher: "Miss Ana Rosa Melo",
  },
  {
    title: "Sexto B",
    image: "assets/bachillerato/sexto-b.jpg",
    detail: "Juan Sebastián Martínez e Iver Andrés Puentes M.",
    teacher: "Miss Constanza Umaña",
  },
  {
    title: "Séptimo A",
    image: "assets/bachillerato/septimo-a.jpg",
    detail: "Jaime Ortíz",
    teacher: "Profesor Ricardo Palacios",
  },
  {
    title: "Séptimo B",
    image: "assets/bachillerato/septimo-b.jpg",
    detail: "Oscar Hernández, Oscar Hernández",
    teacher: "Profesor Wilmer Vargas",
  },
  {
    title: "Octavo A",
    image: "assets/bachillerato/octavo-a.jpg",
    detail: "Migule Rivera",
    teacher: "Profesor Hector Gonzalez Tuesta",
  },
  {
    title: "Octavo B",
    image: "assets/bachillerato/octavo-b.jpg",
    detail: "Fila 1, de izquierda a derecha",
    teacher: "Profesor Nelson Mejía Ramírez",
  },
  {
    title: "Noveno A",
    image: "assets/bachillerato/noveno-a.jpg",
    detail: "De arriba hacia abajo y de izquierda a derecha",
    teacher: "Miss Luz Dary Cadena",
  },
  {
    title: "Noveno B",
    image: "assets/bachillerato/noveno-b.jpg",
    detail: "De izquierda a derecha. Fila 1",
    teacher: "Profesor Gonzalo Serna",
  },
  {
    title: "Décimo A",
    image: "assets/bachillerato/decimo-a.jpg",
    detail: "Carlos E. Palacios",
    teacher: "Profesor Fernando Andres Gonzáles",
  },
  {
    title: "Décimo B",
    image: "assets/bachillerato/decimo-b.jpg",
    detail: "Alejandra Álvarez",
    teacher: "Profesor Juan C. Currea",
  },
  {
    title: "Undécimo A",
    image: "assets/bachillerato/undecimo-a.jpg",
    detail: "Felipe Camargo",
    teacher: "Profesor Adolfo Triana",
  },
  {
    title: "Undécimo B",
    image: "assets/bachillerato/undecimo-b.jpg",
    detail: "Ausentes: Oswaldo Fajardo y Norma Forero",
    teacher: "Profesor Manuel Gozalez",
  },
];
const expectedComitesCards = [
  {
    title: "Gobierno estudiantil",
    image: "assets/comites/gobierno-estudiantil.jpg",
    detail: "Camilo Sarmiento - Adriana Calderón.",
  },
  {
    title: "Comité anuario",
    image: "assets/comites/comite-anuario.jpg",
    detail: "Andrea Carolina Cuellar - Santiago Donosso - Nancy Diaz Quijano - Adolfo Ballesteros - David Osorio.",
  },
];
const expectedEquiposCards = [
  {
    title: "Equipo de fútbol",
    image: "assets/equipos/futbol.jpg",
    detail: "Diego Cancino, Luis Baquero, Carlos Guerra",
  },
  {
    title: "Porristas infantil",
    image: "assets/equipos/porristas-infantil.jpg",
    detail: "Alejandra Forero, Maria Santos",
  },
  {
    title: "Porristas bachillerato",
    image: "assets/equipos/porristas-bachillerato.jpg",
    detail: "Tatiana Jimenez, Laura Sanchez",
  },
];
const expectedParejasCards = [
  { title: "Bernardo y Luisa", image: "assets/parejas/bernardo-luisa.jpg" },
  { title: "Depravado", image: "assets/parejas/depravado.jpg" },
  { title: "Elena", image: "assets/parejas/elena.jpg" },
  { title: "Maria Paula", image: "assets/parejas/maria-paula.jpg" },
  { title: "Ska y Chulo", image: "assets/parejas/ska-chulo.jpg" },
  { title: "Novios", image: "assets/parejas/novios.jpg" },
  { title: "Prieto", image: "assets/parejas/prieto.jpg" },
  { title: "Mi poste y yo", image: "assets/parejas/mi-poste-y-yo.jpg" },
];
const expectedHermanosCards = [
  { title: "Bernardo + 1", image: "assets/hermanos/bernardo-mas-uno.jpg" },
  { title: "Ku Klux Klan", image: "assets/hermanos/ku-klux-klan.jpg" },
  { title: "Familia Bom Bom Bum", image: "assets/hermanos/familia-bom-bom-bum.jpg" },
  { title: "Familia Chan", image: "assets/hermanos/familia-chan.jpg" },
  { title: "Familia Gallego", image: "assets/hermanos/familia-gallego.jpg" },
  { title: "Familia Desplazados", image: "assets/hermanos/familia-desplazados.jpg" },
  { title: "Familia Picachu", image: "assets/hermanos/familia-picachu.jpg" },
  { title: "Familia Pirata", image: "assets/hermanos/familia-pirata.jpg" },
  { title: "Familia Skallenato", image: "assets/hermanos/familia-skallenato.jpg" },
  { title: "Los super amigos", image: "assets/hermanos/los-super-amigos.jpg" },
  { title: "Cartel de Bogotá", image: "assets/hermanos/cartel-de-bogota.jpg" },
  { title: "La brigada SKA", image: "assets/hermanos/la-brigada-ska.jpg" },
];
const expectedCollageCards = [
  { title: "Séptimo grado", image: "assets/collage/septimo-grado.jpg" },
  { title: "Noveno grado", image: "assets/collage/noveno-grado-1.jpg" },
  { title: "Noveno grado", image: "assets/collage/noveno-grado-2.jpg" },
  { title: "Momentos 11", image: "assets/collage/momentos-11-1.gif" },
  { title: "Momentos 11", image: "assets/collage/momentos-11-2.jpg" },
  { title: "Bebés", image: "assets/collage/bebes.jpg" },
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

function assertSameFileBytes(sourceFile, siteAsset, label) {
  const sourcePath = path.join(archiveImagesDir, sourceFile);
  const sitePath = path.join(siteDir, siteAsset);
  assert(fs.existsSync(sourcePath), `${label} archive source must exist: ${sourceFile}`);
  assert(fs.existsSync(sitePath), `${label} site asset must exist: ${siteAsset}`);
  if (!fs.existsSync(sourcePath) || !fs.existsSync(sitePath)) return;

  assert(
    Buffer.compare(fs.readFileSync(sourcePath), fs.readFileSync(sitePath)) === 0,
    `${label} site asset must match archive bytes: ${siteAsset}`,
  );
}

assert(indexHtml.includes('lang="es"'), "index.html must declare Spanish language");
assert(indexHtml.includes('id="inicio"'), "Main page entry target must exist");
assert(indexHtml.includes('href="#inicio">Inicio</a>'), "Top navigation must link to Inicio");
assert(indexHtml.includes('href="#secciones">Entrar</a>'), "Main page hero must preserve Entrar as the primary action");
assert(indexHtml.includes('class="hero__screen"'), "Main page must recreate the original index menu as static HTML");
assert(indexHtml.includes('src="./assets/main/jeferon.jpg"'), "Main page must include the original Jeferon image cue");
assert(indexHtml.includes('src="./assets/main/logo-viejo.jpg"'), "Main page must include the old logo asset");
assert(indexHtml.includes('id="prom-2000"'), "Prom 2000 section must exist");
assert(indexHtml.includes('id="palabras"'), "Palabras section must exist");
assert(indexHtml.includes('id="personal-administrativo"'), "Personal administrativo section must exist");
assert(indexHtml.includes('id="servicios-generales"'), "Servicios generales section must exist");
assert(indexHtml.includes('id="profesores"'), "Profesores section must exist");
assert(indexHtml.includes('id="preescolar"'), "Pre-escolar section must exist");
assert(indexHtml.includes('id="primaria"'), "Primaria section must exist");
assert(indexHtml.includes('id="bachillerato"'), "Bachillerato section must exist");
assert(indexHtml.includes('id="comites"'), "Comités section must exist");
assert(indexHtml.includes('id="equipos"'), "Equipos section must exist");
assert(indexHtml.includes('id="parejas"'), "Parejas section must exist");
assert(indexHtml.includes('id="hermanos"'), "Hermanos section must exist");
assert(indexHtml.includes('id="collage"'), "Collage section must exist");
assert(indexHtml.includes("Momentos 11"), "Prom 2000 section must include Momentos 11");
assert(indexHtml.includes("Palabras 11"), "Palabras section must include Palabras 11");
assert(indexHtml.includes("Adolfo Ballesteros F. Prom 2000"), "Palabras 11 text must include its signature");
assert(indexHtml.includes("Luis Jorge Santos Morales"), "Personal administrativo must include the Director General");
assert(indexHtml.includes("Blanca Miriam Gomez"), "Personal administrativo must include Secretaria académica");
assert(indexHtml.includes("Paulina Prieto"), "Servicios generales must include original group names");
assert(indexHtml.includes("Coordinadora Olga Lucía Pinzón Avellaneda"), "Servicios generales must include Terapia ocupacional coordinator");
assert(indexHtml.includes("Esperanza Méndez"), "Profesores must include Pre-escolar group names");
assert(indexHtml.includes("Sandra Milena Otalora"), "Profesores must include the Primaria coordinator");
assert(indexHtml.includes("Carlos Gonzáles"), "Profesores must include the Bachillerato coordinator");
assert(indexHtml.includes("Nelson Yara"), "Profesores must include the final Bachillerato teacher");
assert(indexHtml.includes("Párvulos"), "Pre-escolar must include Párvulos");
assert(indexHtml.includes("Miss Alma Moreno González"), "Pre-escolar must include Párvulos teacher");
assert(indexHtml.includes("Pre-jardín"), "Pre-escolar must include Pre-jardín");
assert(indexHtml.includes("Miss Yeimmy Carranza A."), "Pre-escolar must include Pre-jardín teacher");
assert(indexHtml.includes("Jardín A"), "Pre-escolar must include Jardín A");
assert(indexHtml.includes("Miss Claudia Moreno"), "Pre-escolar must include Jardín A teacher");
assert(indexHtml.includes("Jardín B"), "Pre-escolar must include Jardín B");
assert(indexHtml.includes("Miss Liliana S. Monroy G."), "Pre-escolar must include Jardín B teacher");
assert(indexHtml.includes("Miss Esperanza Méndez López"), "Pre-escolar must include Transición A teacher");
assert(indexHtml.includes("Miss Sandra Echeverry Díaz"), "Pre-escolar must include Transición B teacher");
assert(indexHtml.includes("Primero A"), "Primaria must include Primero A");
assert(indexHtml.includes("Miss Ligia Forero Saenz"), "Primaria must include Primero A teacher");
assert(indexHtml.includes("Primero B"), "Primaria must include Primero B");
assert(indexHtml.includes("Miss Diana Rodriguez"), "Primaria must include Primero B teacher");
assert(
  (indexHtml.match(/Mariana Jiménez/g) || []).length >= 2,
  "Primaria Primero B must preserve both Mariana Jiménez source entries",
);
assert(indexHtml.includes("Segundo A"), "Primaria must include Segundo A");
assert(indexHtml.includes("Miss Martha Helena Rueda Neira"), "Primaria must include Segundo A teacher");
assert(indexHtml.includes("Segundo B"), "Primaria must include Segundo B");
assert(indexHtml.includes("Miss Sonia Pedraza"), "Primaria must include Segundo B teacher");
assert(indexHtml.includes("Tercero A"), "Primaria must include Tercero A");
assert(indexHtml.includes("Miss Gladys Arboleda Carrillo"), "Primaria must include Tercero A teacher");
assert(indexHtml.includes("Tercero B"), "Primaria must include Tercero B");
assert(indexHtml.includes("Profesor Henry Bernal"), "Primaria must include Tercero B teacher");
assert(indexHtml.includes("Cuarto A"), "Primaria must include Cuarto A");
assert(indexHtml.includes("Miss Sandra Borrero"), "Primaria must include Cuarto A teacher");
assert(indexHtml.includes("Cuarto B"), "Primaria must include Cuarto B");
assert(indexHtml.includes("Miss Andrea Serna Arenas"), "Primaria must include Cuarto B teacher");
assert(indexHtml.includes("Quinto A"), "Primaria must include Quinto A");
assert(indexHtml.includes("Profesor Jaime Gonzáles"), "Primaria must include Quinto A teacher");
assert(indexHtml.includes("(atrás) David Acuña Hurtado"), "Primaria Quinto A must preserve the original positional note");
assert(indexHtml.includes("Quinto B"), "Primaria must include Quinto B");
assert(indexHtml.includes("Profesor Julián Peña"), "Primaria must include Quinto B teacher");
assert(indexHtml.includes("Sexto A"), "Bachillerato must include Sexto A");
assert(indexHtml.includes("Miss Ana Rosa Melo"), "Bachillerato must include Sexto A teacher");
assert(indexHtml.includes("Sexto B"), "Bachillerato must include Sexto B");
assert(indexHtml.includes("Miss Constanza Umaña"), "Bachillerato must include Sexto B teacher");
assert(indexHtml.includes("Séptimo A"), "Bachillerato must include Séptimo A");
assert(indexHtml.includes("Profesor Ricardo Palacios"), "Bachillerato must include Séptimo A teacher");
assert(indexHtml.includes("Séptimo B"), "Bachillerato must include Séptimo B");
assert(indexHtml.includes("Oscar Hernández, Oscar Hernández"), "Bachillerato Séptimo B must preserve the duplicate source entry");
assert(indexHtml.includes("Profesor Wilmer Vargas"), "Bachillerato must include Séptimo B teacher");
assert(indexHtml.includes("Octavo A"), "Bachillerato must include Octavo A");
assert(indexHtml.includes("Profesor Hector Gonzalez Tuesta"), "Bachillerato must include Octavo A teacher");
assert(indexHtml.includes("Octavo B"), "Bachillerato must include Octavo B");
assert(indexHtml.includes("Profesor Nelson Mejía Ramírez"), "Bachillerato must include Octavo B teacher");
assert(indexHtml.includes("Noveno A"), "Bachillerato must include Noveno A");
assert(indexHtml.includes("Miss Luz Dary Cadena"), "Bachillerato must include Noveno A teacher");
assert(indexHtml.includes("Noveno B"), "Bachillerato must include Noveno B");
assert(indexHtml.includes("Profesor Gonzalo Serna"), "Bachillerato must include Noveno B teacher");
assert(indexHtml.includes("Décimo A"), "Bachillerato must include Décimo A");
assert(indexHtml.includes("Profesor Fernando Andres Gonzáles"), "Bachillerato must include Décimo A teacher");
assert(indexHtml.includes("Décimo B"), "Bachillerato must include Décimo B");
assert(indexHtml.includes("Profesor Juan C. Currea"), "Bachillerato must include Décimo B teacher");
assert(indexHtml.includes("Undécimo A"), "Bachillerato must include Undécimo A");
assert(indexHtml.includes("Felipe Camargo"), "Bachillerato Undécimo A must include source roster names");
assert(indexHtml.includes("Profesor Adolfo Triana"), "Bachillerato must include Undécimo A teacher");
assert(indexHtml.includes("Undécimo B"), "Bachillerato must include Undécimo B");
assert(indexHtml.includes("Ausentes: Oswaldo Fajardo y Norma Forero"), "Bachillerato Undécimo B must preserve absent students");
assert(indexHtml.includes("Profesor Manuel Gozalez"), "Bachillerato must include Undécimo B teacher");
assert(indexHtml.includes("Gobierno estudiantil"), "Comités must include Gobierno estudiantil");
assert(indexHtml.includes("Camilo Sarmiento - Adriana Calderón."), "Comités must include Gobierno estudiantil members");
assert(indexHtml.includes("Comité anuario"), "Comités must include Comité anuario");
assert(
  indexHtml.includes("Andrea Carolina Cuellar - Santiago Donosso - Nancy Diaz Quijano - Adolfo Ballesteros - David Osorio."),
  "Comités must include Comité anuario members",
);
assert(indexHtml.includes('href="#bachillerato">Anterior: Bachillerato</a>'), "Comités must link back to Bachillerato");
assert(indexHtml.includes('href="#secciones">Inicio</a>'), "Comités must include a home link");
assert(indexHtml.includes('href="#equipos">Siguiente: Equipos</a>'), "Comités must link forward to Equipos");
assert(indexHtml.includes("Equipo de fútbol"), "Equipos must include Equipo de fútbol");
assert(indexHtml.includes("Carlos Lucio y Oscar Hernandez"), "Equipos must include fútbol roster details");
assert(indexHtml.includes("Porristas infantil"), "Equipos must include Porristas infantil");
assert(indexHtml.includes("Katerine Dueñas"), "Equipos must decode Porristas infantil roster entities");
assert(indexHtml.includes("Porristas bachillerato"), "Equipos must include Porristas bachillerato");
assert(indexHtml.includes("Nasbly Neira, Diana Zapata, Carolina Palacios"), "Equipos must include Porristas bachillerato roster details");
assert(indexHtml.includes('href="#comites">Anterior: Comités</a>'), "Equipos must link back to Comités");
assert(indexHtml.includes('href="#parejas">Siguiente: Parejas</a>'), "Equipos must link forward to Parejas");
assert(indexHtml.includes("Bernardo y Luisa"), "Parejas must include Bernardo y Luisa");
assert(indexHtml.includes("Ska y Chulo"), "Parejas must include Ska y Chulo");
assert(indexHtml.includes("Mi poste y yo"), "Parejas must include Mi poste y yo");
assert(indexHtml.includes('href="#equipos">Anterior: Equipos</a>'), "Parejas must link back to Equipos");
assert(indexHtml.includes('href="#hermanos">Siguiente: Hermanos</a>'), "Parejas must link forward to Hermanos");
assert(indexHtml.includes("Bernardo + 1"), "Hermanos must include Bernardo + 1");
assert(indexHtml.includes("Familia Bom Bom Bum"), "Hermanos must include Familia Bom Bom Bum");
assert(indexHtml.includes("Cartel de Bogotá"), "Hermanos must include Cartel de Bogotá");
assert(indexHtml.includes("La brigada SKA"), "Hermanos must include La brigada SKA");
assert(indexHtml.includes('href="#parejas">Anterior: Parejas</a>'), "Hermanos must link back to Parejas");
assert(indexHtml.includes('href="#collage">Siguiente: Collage</a>'), "Hermanos must link forward to Collage");
assert(indexHtml.includes("Séptimo grado"), "Collage must include Séptimo grado");
assert(indexHtml.includes("Noveno grado"), "Collage must include Noveno grado");
assert(indexHtml.includes("Momentos 11"), "Collage must include Momentos 11");
assert(indexHtml.includes("Bebés"), "Collage must include Bebés");
assert(indexHtml.includes('href="#hermanos">Anterior: Hermanos</a>'), "Collage must link back to Hermanos");
assert(indexHtml.includes("<span>Siguiente: Final</span>"), "Collage must preserve Final as the next section");
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

const activeMainSections = appJs.match(/\{\s*name:\s*'Página principal',\s*active:\s*true,\s*href:\s*'#inicio'\s*\}/g) || [];
assert(activeMainSections.length === 1, "app.js must declare exactly one active Página principal section");
const activeProm2000Sections = appJs.match(/\{\s*name:\s*'Prom 2000',\s*active:\s*true,\s*href:\s*'#prom-2000'\s*\}/g) || [];
assert(activeProm2000Sections.length === 1, "app.js must declare exactly one active Prom 2000 section");
const activePalabrasSections = appJs.match(/\{\s*name:\s*'Palabras de despedida',\s*active:\s*true,\s*href:\s*'#palabras'\s*\}/g) || [];
assert(activePalabrasSections.length === 1, "app.js must declare exactly one active Palabras section");
const activePersonalAdministrativoSections = appJs.match(/\{\s*name:\s*'Personal administrativo',\s*active:\s*true,\s*href:\s*'#personal-administrativo'\s*\}/g) || [];
assert(activePersonalAdministrativoSections.length === 1, "app.js must declare exactly one active Personal administrativo section");
const activeServiciosGeneralesSections = appJs.match(/\{\s*name:\s*'Servicios generales',\s*active:\s*true,\s*href:\s*'#servicios-generales'\s*\}/g) || [];
assert(activeServiciosGeneralesSections.length === 1, "app.js must declare exactly one active Servicios generales section");
const activeProfesoresSections = appJs.match(/\{\s*name:\s*'Profesores',\s*active:\s*true,\s*href:\s*'#profesores'\s*\}/g) || [];
assert(activeProfesoresSections.length === 1, "app.js must declare exactly one active Profesores section");
const activePreescolarSections = appJs.match(/\{\s*name:\s*'Pre-escolar',\s*active:\s*true,\s*href:\s*'#preescolar'\s*\}/g) || [];
assert(activePreescolarSections.length === 1, "app.js must declare exactly one active Pre-escolar section");
const activePrimariaSections = appJs.match(/\{\s*name:\s*'Primaria',\s*active:\s*true,\s*href:\s*'#primaria'\s*\}/g) || [];
assert(activePrimariaSections.length === 1, "app.js must declare exactly one active Primaria section");
const activeBachilleratoSections = appJs.match(/\{\s*name:\s*'Bachillerato',\s*active:\s*true,\s*href:\s*'#bachillerato'\s*\}/g) || [];
assert(activeBachilleratoSections.length === 1, "app.js must declare exactly one active Bachillerato section");
const activeComitesSections = appJs.match(/\{\s*name:\s*'Comités',\s*active:\s*true,\s*href:\s*'#comites'\s*\}/g) || [];
assert(activeComitesSections.length === 1, "app.js must declare exactly one active Comités section");
const activeEquiposSections = appJs.match(/\{\s*name:\s*'Equipos',\s*active:\s*true,\s*href:\s*'#equipos'\s*\}/g) || [];
assert(activeEquiposSections.length === 1, "app.js must declare exactly one active Equipos section");
const activeParejasSections = appJs.match(/\{\s*name:\s*'Parejas',\s*active:\s*true,\s*href:\s*'#parejas'\s*\}/g) || [];
assert(activeParejasSections.length === 1, "app.js must declare exactly one active Parejas section");
const activeHermanosSections = appJs.match(/\{\s*name:\s*'Hermanos',\s*active:\s*true,\s*href:\s*'#hermanos'\s*\}/g) || [];
assert(activeHermanosSections.length === 1, "app.js must declare exactly one active Hermanos section");
const activeCollageSections = appJs.match(/\{\s*name:\s*'Collage',\s*active:\s*true,\s*href:\s*'#collage'\s*\}/g) || [];
assert(activeCollageSections.length === 1, "app.js must declare exactly one active Collage section");
assert(
  appJs.indexOf("name: 'Página principal'") < appJs.indexOf("name: 'Palabras de despedida'"),
  "app.js must keep Página principal before Palabras to match the archive section order",
);
assert(
  appJs.indexOf("name: 'Prom 2000'") < appJs.indexOf("name: 'Pre-escolar'"),
  "app.js must keep Prom 2000 before Pre-escolar to match the archive section order",
);
assert(
  appJs.indexOf("name: 'Pre-escolar'") < appJs.indexOf("name: 'Primaria'"),
  "app.js must keep Pre-escolar before Primaria to match the archive section order",
);
assert(
  appJs.indexOf("name: 'Primaria'") < appJs.indexOf("name: 'Bachillerato'"),
  "app.js must keep Primaria before Bachillerato to match the archive section order",
);
assert(
  appJs.indexOf("name: 'Bachillerato'") < appJs.indexOf("name: 'Comités'"),
  "app.js must keep Bachillerato before Comités to match the archive section order",
);
assert(
  appJs.indexOf("name: 'Comités'") < appJs.indexOf("name: 'Equipos'"),
  "app.js must keep Comités before Equipos to match the archive section order",
);
assert(
  appJs.indexOf("name: 'Equipos'") < appJs.indexOf("name: 'Parejas'"),
  "app.js must keep Equipos before Parejas to match the archive section order",
);
assert(
  appJs.indexOf("name: 'Parejas'") < appJs.indexOf("name: 'Hermanos'"),
  "app.js must keep Parejas before Hermanos to match the archive section order",
);
assert(
  appJs.indexOf("name: 'Hermanos'") < appJs.indexOf("name: 'Collage'"),
  "app.js must keep Hermanos before Collage to match the archive section order",
);
assert(
  indexHtml.indexOf('href="#inicio"') < indexHtml.indexOf('href="#secciones"'),
  "top navigation must keep Inicio before Secciones",
);
assert(
  indexHtml.indexOf('href="#prom-2000"') < indexHtml.indexOf('href="#preescolar"'),
  "top navigation must keep Prom 2000 before Pre-escolar",
);
assert(
  indexHtml.indexOf('id="prom-2000"') < indexHtml.indexOf('id="preescolar"'),
  "page sections must keep Prom 2000 before Pre-escolar",
);
assert(
  indexHtml.indexOf('id="preescolar"') < indexHtml.indexOf('id="primaria"'),
  "page sections must keep Pre-escolar before Primaria",
);
assert(
  indexHtml.indexOf('href="#primaria"') < indexHtml.indexOf('href="#bachillerato"'),
  "top navigation must keep Primaria before Bachillerato",
);
assert(
  indexHtml.indexOf('id="primaria"') < indexHtml.indexOf('id="bachillerato"'),
  "page sections must keep Primaria before Bachillerato",
);
assert(
  indexHtml.indexOf('href="#bachillerato"') < indexHtml.indexOf('href="#comites"'),
  "top navigation must keep Bachillerato before Comités",
);
assert(
  indexHtml.indexOf('id="bachillerato"') < indexHtml.indexOf('id="comites"'),
  "page sections must keep Bachillerato before Comités",
);
assert(
  indexHtml.indexOf('href="#comites"') < indexHtml.indexOf('href="#equipos"'),
  "top navigation must keep Comités before Equipos",
);
assert(
  indexHtml.indexOf('id="comites"') < indexHtml.indexOf('id="equipos"'),
  "page sections must keep Comités before Equipos",
);
assert(
  indexHtml.indexOf('href="#equipos"') < indexHtml.indexOf('href="#parejas"'),
  "top navigation must keep Equipos before Parejas",
);
assert(
  indexHtml.indexOf('id="equipos"') < indexHtml.indexOf('id="parejas"'),
  "page sections must keep Equipos before Parejas",
);
assert(
  indexHtml.indexOf('href="#parejas"') < indexHtml.indexOf('href="#hermanos"'),
  "top navigation must keep Parejas before Hermanos",
);
assert(
  indexHtml.indexOf('id="parejas"') < indexHtml.indexOf('id="hermanos"'),
  "page sections must keep Parejas before Hermanos",
);
assert(
  indexHtml.indexOf('href="#hermanos"') < indexHtml.indexOf('href="#collage"'),
  "top navigation must keep Hermanos before Collage",
);
assert(
  indexHtml.indexOf('id="hermanos"') < indexHtml.indexOf('id="collage"'),
  "page sections must keep Hermanos before Collage",
);
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

for (const asset of requiredMainAssets) {
  assert(fs.existsSync(path.join(siteDir, asset)), `Main page asset must exist: ${asset}`);
  assert(
    indexHtml.includes(asset) || stylesCss.includes(asset),
    `Main page asset must be referenced by the static site: ${asset}`,
  );
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

for (const asset of requiredPersonalAdministrativoAssets) {
  assert(fs.existsSync(path.join(siteDir, asset)), `Personal administrativo asset must exist: ${asset}`);
  assert(
    indexHtml.includes(asset) || stylesCss.includes(asset),
    `Personal administrativo asset must be referenced by the static site: ${asset}`,
  );
}

for (const asset of requiredServiciosGeneralesAssets) {
  assert(fs.existsSync(path.join(siteDir, asset)), `Servicios generales asset must exist: ${asset}`);
  assert(indexHtml.includes(asset), `Servicios generales asset must be referenced by index.html: ${asset}`);
}

for (const asset of requiredProfesoresAssets) {
  assert(fs.existsSync(path.join(siteDir, asset)), `Profesores asset must exist: ${asset}`);
  assert(
    indexHtml.includes(asset) || stylesCss.includes(asset),
    `Profesores asset must be referenced by the static site: ${asset}`,
  );
}

for (const asset of requiredPreescolarAssets) {
  assert(fs.existsSync(path.join(siteDir, asset)), `Pre-escolar asset must exist: ${asset}`);
  assert(
    indexHtml.includes(asset) || stylesCss.includes(asset),
    `Pre-escolar asset must be referenced by the static site: ${asset}`,
  );
}

for (const asset of requiredPrimariaAssets) {
  assert(fs.existsSync(path.join(siteDir, asset)), `Primaria asset must exist: ${asset}`);
  assert(
    indexHtml.includes(asset) || stylesCss.includes(asset),
    `Primaria asset must be referenced by the static site: ${asset}`,
  );
}

for (const asset of requiredBachilleratoAssets) {
  assert(fs.existsSync(path.join(siteDir, asset)), `Bachillerato asset must exist: ${asset}`);
  assert(
    indexHtml.includes(asset) || stylesCss.includes(asset),
    `Bachillerato asset must be referenced by the static site: ${asset}`,
  );
}

for (const asset of requiredComitesAssets) {
  assert(fs.existsSync(path.join(siteDir, asset)), `Comités asset must exist: ${asset}`);
  assert(
    indexHtml.includes(asset) || stylesCss.includes(asset),
    `Comités asset must be referenced by the static site: ${asset}`,
  );
}

for (const asset of requiredEquiposAssets) {
  assert(fs.existsSync(path.join(siteDir, asset)), `Equipos asset must exist: ${asset}`);
  assert(
    indexHtml.includes(asset) || stylesCss.includes(asset),
    `Equipos asset must be referenced by the static site: ${asset}`,
  );
}

for (const asset of requiredParejasAssets) {
  assert(fs.existsSync(path.join(siteDir, asset)), `Parejas asset must exist: ${asset}`);
  assert(
    indexHtml.includes(asset) || stylesCss.includes(asset),
    `Parejas asset must be referenced by the static site: ${asset}`,
  );
}

for (const asset of requiredHermanosAssets) {
  assert(fs.existsSync(path.join(siteDir, asset)), `Hermanos asset must exist: ${asset}`);
  assert(
    indexHtml.includes(asset) || stylesCss.includes(asset),
    `Hermanos asset must be referenced by the static site: ${asset}`,
  );
}

for (const asset of requiredCollageAssets) {
  assert(fs.existsSync(path.join(siteDir, asset)), `Collage asset must exist: ${asset}`);
  assert(
    indexHtml.includes(asset) || stylesCss.includes(asset),
    `Collage asset must be referenced by the static site: ${asset}`,
  );
}

for (const copy of expectedParejasArchiveCopies) {
  assertSameFileBytes(copy.source, copy.asset, "Parejas");
}

for (const copy of expectedHermanosArchiveCopies) {
  assertSameFileBytes(copy.source, copy.asset, "Hermanos");
}

for (const copy of expectedCollageArchiveCopies) {
  assertSameFileBytes(copy.source, copy.asset, "Collage");
}

for (const copy of expectedMainArchiveCopies) {
  assertSameFileBytes(copy.source, copy.asset, "Main page");
}

const bachilleratoSection = indexHtml.match(/<section id="bachillerato"[\s\S]*?<\/section>\s*<\/main>/)?.[0] || "";
const bachilleratoCardMatches = [...bachilleratoSection.matchAll(/<article class="bachillerato-card">([\s\S]*?)<\/article>/g)];
assert(bachilleratoCardMatches.length === expectedBachilleratoCards.length, "Bachillerato must render exactly 12 class cards");

expectedBachilleratoCards.forEach((expected, index) => {
  const card = bachilleratoCardMatches[index]?.[1] || "";
  assert(card.includes(`<h3>${expected.title}</h3>`), `Bachillerato card ${index + 1} must be ${expected.title}`);
  assert(card.includes(`src="./${expected.image}"`), `${expected.title} must use ${expected.image}`);
  assert(card.includes(expected.detail), `${expected.title} must preserve source detail: ${expected.detail}`);
  assert(card.includes(`<strong>${expected.teacher}</strong>`), `${expected.title} must include teacher ${expected.teacher}`);
});

const comitesSection = indexHtml.match(/<section id="comites"[\s\S]*?<\/section>\s*<\/main>/)?.[0] || "";
const comitesCardMatches = [...comitesSection.matchAll(/<article class="comite-card">([\s\S]*?)<\/article>/g)];
assert(comitesCardMatches.length === expectedComitesCards.length, "Comités must render exactly two cards");

expectedComitesCards.forEach((expected, index) => {
  const card = comitesCardMatches[index]?.[1] || "";
  assert(card.includes(`<h3>${expected.title}</h3>`), `Comités card ${index + 1} must be ${expected.title}`);
  assert(card.includes(`src="./${expected.image}"`), `${expected.title} must use ${expected.image}`);
  assert(card.includes(expected.detail), `${expected.title} must preserve source detail`);
});

const equiposSection = indexHtml.match(/<section id="equipos"[\s\S]*?<\/section>\s*<\/main>/)?.[0] || "";
const equiposCardMatches = [...equiposSection.matchAll(/<article class="equipo-card[^"]*">([\s\S]*?)<\/article>/g)];
assert(equiposCardMatches.length === expectedEquiposCards.length, "Equipos must render exactly three photo cards");

expectedEquiposCards.forEach((expected, index) => {
  const card = equiposCardMatches[index]?.[1] || "";
  assert(card.includes(`<h3>${expected.title}</h3>`), `Equipos card ${index + 1} must be ${expected.title}`);
  assert(card.includes(`src="./${expected.image}"`), `${expected.title} must use ${expected.image}`);
  assert(card.includes(expected.detail), `${expected.title} must preserve source detail`);
});

const parejasSection = indexHtml.match(/<section id="parejas"[\s\S]*?<\/section>\s*<\/main>/)?.[0] || "";
const parejasCardMatches = [...parejasSection.matchAll(/<figure class="pareja-card">([\s\S]*?)<\/figure>/g)];
assert(parejasCardMatches.length === expectedParejasCards.length, "Parejas must render exactly eight photo cards");

expectedParejasCards.forEach((expected, index) => {
  const card = parejasCardMatches[index]?.[1] || "";
  assert(card.includes(`<figcaption>${expected.title}</figcaption>`), `Parejas card ${index + 1} must be ${expected.title}`);
  assert(card.includes(`src="./${expected.image}"`), `${expected.title} must use ${expected.image}`);
});

const hermanosSection = indexHtml.match(/<section id="hermanos"[\s\S]*?<\/section>\s*<\/main>/)?.[0] || "";
const hermanosCardMatches = [...hermanosSection.matchAll(/<figure class="hermano-card">([\s\S]*?)<\/figure>/g)];
assert(hermanosCardMatches.length === expectedHermanosCards.length, "Hermanos must render exactly twelve photo cards");

expectedHermanosCards.forEach((expected, index) => {
  const card = hermanosCardMatches[index]?.[1] || "";
  assert(card.includes(`<figcaption>${expected.title}</figcaption>`), `Hermanos card ${index + 1} must be ${expected.title}`);
  assert(card.includes(`src="./${expected.image}"`), `${expected.title} must use ${expected.image}`);
});

const collageSection = indexHtml.match(/<section id="collage"[\s\S]*?<\/section>\s*<\/main>/)?.[0] || "";
const collageCardMatches = [...collageSection.matchAll(/<figure class="collage-card[^"]*">([\s\S]*?)<\/figure>/g)];
assert(collageCardMatches.length === expectedCollageCards.length, "Collage must render exactly six photo cards");

expectedCollageCards.forEach((expected, index) => {
  const card = collageCardMatches[index]?.[1] || "";
  assert(card.includes(`<figcaption>${expected.title}</figcaption>`), `Collage card ${index + 1} must be ${expected.title}`);
  assert(card.includes(`src="./${expected.image}"`), `${expected.title} must use ${expected.image}`);
});

assert(appJs.includes("renderLegacyLayout(student)"), "app.js must render composite alumni layouts");
assert(appJs.includes("renderLegacyArticle(student)"), "app.js must render article alumni layouts");
assert(stylesCss.includes("assets/main/fondo-principal.jpg"), "Main page must use the original principal background");
assert(stylesCss.includes("assets/main/indice-fondo.gif"), "Main page must use the original index background");
assert(stylesCss.includes(".hero__screen"), "styles.css must style the main page static index screen");
assert(stylesCss.includes("@keyframes portrait-path"), "styles.css must replace the original moving image timeline with CSS animation");
assert(stylesCss.includes("scroll-margin-top"), "Section anchors must offset the sticky header");
assert(stylesCss.includes("@media (max-width: 900px)"), "Main page must stack the hero at tablet widths");
assert(
  /@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{[\s\S]*?\.hero__portrait,[\s\S]*?animation:\s*none;/i.test(stylesCss),
  "Main page CSS animation must respect reduced-motion preferences",
);
assert(stylesCss.includes(".legacy-layout"), "styles.css must style composite alumni layouts");
assert(stylesCss.includes(".legacy-article"), "styles.css must style article alumni layouts");
assert(stylesCss.includes(".palabras-composite"), "styles.css must style the Gonzalo Serna composite");
assert(!stylesCss.includes(".palabras-composite__overlay {\n  position: absolute;"), "Gonzalo Serna second image must not overlap via absolute positioning");
assert(stylesCss.includes("assets/equipos/fondo-fiesta.jpg"), "Equipos football card must use its original background");
assert(stylesCss.includes("assets/equipos/fondo-porristas.jpg"), "Equipos cheer cards must use their original background");
assert(stylesCss.includes(".equipo-card img {\n  display: block;\n  width: 100%;\n  height: auto;"), "Equipos images must render uncropped with natural aspect ratio");
assert(!stylesCss.includes(".equipo-card:not(.equipo-card--wide) img"), "Equipos images must not use a shared cropping rule");
assert(stylesCss.includes("assets/parejas/fondo-parejas.gif"), "Parejas must use its original background");
assert(stylesCss.includes(".pareja-card img {\n  display: block;\n  width: 100%;\n  height: auto;"), "Parejas images must render uncropped with natural aspect ratio");
assert(stylesCss.includes("assets/hermanos/fondo-hermanos.jpg"), "Hermanos must use its original background");
assert(stylesCss.includes(".hermano-card img {\n  display: block;\n  width: 100%;\n  height: auto;"), "Hermanos images must render uncropped with natural aspect ratio");
assert(stylesCss.includes(".section--collage"), "styles.css must style Collage section");
assert(stylesCss.includes(".collage-card img {\n  display: block;\n  width: 100%;\n  height: auto;"), "Collage images must render uncropped with natural aspect ratio");
assert(stylesCss.includes(".collage-card--landscape {\n    grid-column: auto;"), "Collage landscape cards must reset span on mobile");
assert(stylesCss.includes(".staff-grid"), "styles.css must style Personal administrativo staff grid");
assert(stylesCss.includes(".services-layout"), "styles.css must style Servicios generales layout");
assert(stylesCss.includes(".teacher-grid"), "styles.css must style Profesores teacher grid");
assert(stylesCss.includes(".preescolar-layout"), "styles.css must style Pre-escolar class layout");
assert(stylesCss.includes(".primaria-layout"), "styles.css must style Primaria class layout");
assert(stylesCss.includes(".bachillerato-layout"), "styles.css must style Bachillerato class layout");
assert(stylesCss.includes(".comites-layout"), "styles.css must style Comités layout");
assert(stylesCss.includes(".equipos-layout"), "styles.css must style Equipos layout");
assert(stylesCss.includes(".parejas-layout"), "styles.css must style Parejas layout");
assert(stylesCss.includes(".hermanos-layout"), "styles.css must style Hermanos layout");
assert(stylesCss.includes(".collage-layout"), "styles.css must style Collage layout");
assert(stylesCss.includes(".section-sequence"), "styles.css must style section sequence navigation");

if (!process.exitCode) console.log("Static site verification passed.");
