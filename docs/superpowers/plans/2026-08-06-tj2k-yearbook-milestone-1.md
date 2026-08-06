# TJ2K Yearbook Milestone 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a responsive, Spanish-only, no-framework static site for the main navigation and Prom 2000 graduating class gallery.

**Architecture:** Keep the legacy archive untouched under `Archive/ANUARIO/`. Create a deployable `site/` root containing plain HTML, CSS, JavaScript, and copied/derived static data. Use one page with client-side rendering for the student gallery and modal detail.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript modules, Node.js scripts for archive extraction, Python static server for local verification.

## Global Constraints

- Preserve `Archive/ANUARIO/` as source material; do not edit or delete archive files.
- Use Spanish-only UI copy.
- Use `Prom 2000` as the only active migrated content section for milestone 1.
- Show other legacy navigation sections as pending migration.
- Do not embed Flash files.
- Ask the user before recreating, replacing, or omitting any Flash-only element that affects the active milestone experience.
- Deployable output must be plain static files suitable for Azure Static Website hosting.
- Prefer no build step for the hosted site.

---

## File Structure

- Create `site/index.html`: semantic single-page shell and static metadata.
- Create `site/styles.css`: responsive visual system, layout, gallery, modal, and accessibility states.
- Create `site/app.js`: imports student data, renders navigation and grouped students, handles modal open/close and keyboard behavior.
- Create `site/students.js`: generated static student records consumed by `app.js`.
- Create `tools/extract-students.mjs`: parses `Archive/ANUARIO/paginas_totales/prom2000.htm` and `Archive/ANUARIO/paginas11/*.htm` into `site/students.js`.
- Create `tools/verify-site.mjs`: lightweight static checks for data count, active/pending nav, Flash exclusion, and referenced asset existence.
- Modify `README.md`: add local preview and Azure static website deployment root notes.

---

### Task 1: Extract Student Data From The Archive

**Files:**
- Create: `tools/extract-students.mjs`
- Create: `site/students.js`

**Interfaces:**
- Produces: `site/students.js` exporting `students`, an array of records with `{ id, name, group, legacyPage, image, hasProfileImage }`.
- Produces: `node tools/extract-students.mjs`, which regenerates `site/students.js`.

- [ ] **Step 1: Write the extraction script**

Create `tools/extract-students.mjs` with these responsibilities:

```js
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
```

- [ ] **Step 2: Run the extraction**

Run: `node tools/extract-students.mjs`

Expected: `site/students.js` is created and prints a student count near the 40 legacy profile pages.

- [ ] **Step 3: Inspect the generated data**

Run: `sed -n '1,220p' site/students.js`

Expected: records include `11A`, `11B`, readable Spanish names, legacy page paths, and image paths for students whose profile pages contain images.

- [ ] **Step 4: Commit**

```bash
git add tools/extract-students.mjs site/students.js
git commit -m "Generate Prom 2000 student data"
```

---

### Task 2: Build The Static Page Shell

**Files:**
- Create: `site/index.html`
- Create: `site/app.js`
- Create: `site/styles.css`

**Interfaces:**
- Consumes: `students` from `./students.js`.
- Produces: DOM anchors with ids `inicio`, `secciones`, and `prom-2000`.

- [ ] **Step 1: Create `site/index.html`**

Use this shell:

```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Anuario TJ2K - Prom 2000</title>
    <meta name="description" content="Migracion moderna del anuario virtual TJ2K Prom 2000.">
    <link rel="stylesheet" href="./styles.css">
    <script type="module" src="./app.js"></script>
  </head>
  <body>
    <header class="site-header">
      <a class="brand" href="#inicio" aria-label="Ir al inicio">TJ2K</a>
      <nav class="top-nav" aria-label="Navegacion principal">
        <a href="#secciones">Secciones</a>
        <a href="#prom-2000">Prom 2000</a>
      </nav>
    </header>

    <main id="inicio">
      <section class="hero" aria-labelledby="hero-title">
        <div class="hero__content">
          <p class="hero__year">Anuario virtual</p>
          <h1 id="hero-title">Prom 2000</h1>
          <p class="hero__copy">Una version moderna y responsive del recuerdo digital de TJ2K.</p>
          <a class="button button--primary" href="#prom-2000">Ver galeria</a>
        </div>
      </section>

      <section id="secciones" class="section section--nav" aria-labelledby="sections-title">
        <div class="section__heading">
          <h2 id="sections-title">Secciones del anuario</h2>
          <p>La primera etapa activa la galeria de Prom 2000. Las demas secciones quedan preparadas para futuras migraciones.</p>
        </div>
        <div id="yearbook-sections" class="section-grid"></div>
      </section>

      <section id="prom-2000" class="section section--students" aria-labelledby="prom-title">
        <div class="section__heading">
          <h2 id="prom-title">Alumnos Prom 2000</h2>
          <p>Selecciona un nombre para ver su imagen del archivo original.</p>
        </div>
        <div id="student-groups" class="student-groups"></div>
      </section>
    </main>

    <div id="student-modal" class="modal" hidden>
      <div class="modal__backdrop" data-close-modal></div>
      <section class="modal__panel" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <button class="modal__close" type="button" data-close-modal aria-label="Cerrar detalle">Cerrar</button>
        <div id="modal-content"></div>
      </section>
    </div>
  </body>
</html>
```

- [ ] **Step 2: Create minimal `site/app.js` rendering**

Render the original section names and student groups from static arrays. Use disabled buttons for pending sections and active anchors for Prom 2000.

- [ ] **Step 3: Create minimal `site/styles.css`**

Add base typography, dark background, responsive content widths, button styles, section grid, student grid, and modal layout.

- [ ] **Step 4: Serve locally**

Run: `python3 -m http.server 4173 --directory site`

Expected: `http://localhost:4173` loads without a build step.

- [ ] **Step 5: Commit**

```bash
git add site/index.html site/app.js site/styles.css
git commit -m "Build static Prom 2000 page shell"
```

---

### Task 3: Implement Gallery Detail Behavior

**Files:**
- Modify: `site/app.js`
- Modify: `site/styles.css`

**Interfaces:**
- Consumes: `students` records with `id`, `name`, `group`, `legacyPage`, `image`, and `hasProfileImage`.
- Produces: click and keyboard-accessible modal detail view.

- [ ] **Step 1: Add modal state functions in `site/app.js`**

Define these functions:

```js
function openStudent(student) {}
function closeStudent() {}
function renderStudentModal(student) {}
```

`openStudent(student)` sets modal content, removes `hidden`, stores the previously focused element, and focuses the close button.

`closeStudent()` hides the modal, clears content, and restores focus when possible.

`renderStudentModal(student)` returns profile markup with the student name, group, image when `hasProfileImage` is true, and an unavailable-image message when false.

- [ ] **Step 2: Wire interactions**

Add click listeners to student buttons, close buttons, backdrop, and `Escape`.

- [ ] **Step 3: Style modal for mobile and desktop**

Use a fixed viewport overlay, centered panel on desktop, full-height sheet behavior on small screens, and `max-width: 100%` image scaling.

- [ ] **Step 4: Manual interaction check**

Run: `python3 -m http.server 4173 --directory site`

Open:

- `http://localhost:4173/#prom-2000`
- Select one `11A` student with an image.
- Close the modal.
- Select one `11B` student with an image.
- Press `Escape`.

Expected: details open in-page, images fit the viewport, and focus returns to the clicked student.

- [ ] **Step 5: Commit**

```bash
git add site/app.js site/styles.css
git commit -m "Add Prom 2000 student detail modal"
```

---

### Task 4: Add Static Verification

**Files:**
- Create: `tools/verify-site.mjs`
- Modify: `README.md`

**Interfaces:**
- Consumes: `site/index.html`, `site/app.js`, `site/students.js`, and referenced archive images.
- Produces: `node tools/verify-site.mjs` command that exits non-zero on broken static requirements.

- [ ] **Step 1: Create `tools/verify-site.mjs`**

Checks:

```js
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const siteDir = path.join(root, "site");
const indexHtml = fs.readFileSync(path.join(siteDir, "index.html"), "utf8");
const appJs = fs.readFileSync(path.join(siteDir, "app.js"), "utf8");
const { students } = await import(pathToFileURL(path.join(siteDir, "students.js")));

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exitCode = 1;
  }
}

assert(indexHtml.includes('lang="es"'), "index.html must declare Spanish language");
assert(indexHtml.includes('id="prom-2000"'), "Prom 2000 section must exist");
assert(!indexHtml.toLowerCase().includes(".swf"), "index.html must not embed Flash");
assert(!appJs.toLowerCase().includes(".swf"), "app.js must not embed Flash");
assert(students.length >= 35, "student data should include the graduating class");
assert(students.some((student) => student.group === "11A"), "student data should include 11A");
assert(students.some((student) => student.group === "11B"), "student data should include 11B");

for (const student of students.filter((entry) => entry.hasProfileImage)) {
  assert(fs.existsSync(path.join(root, student.image)), `${student.name} image must exist: ${student.image}`);
}

if (!process.exitCode) console.log("Static site verification passed.");
```

- [ ] **Step 2: Run verification**

Run: `node tools/verify-site.mjs`

Expected: `Static site verification passed.`

- [ ] **Step 3: Update `README.md`**

Add:

````markdown
## Local Preview

```bash
python3 -m http.server 4173 --directory site
```

Open `http://localhost:4173`.

## Azure Static Website

Use `site/` as the static website deployment root.
````

- [ ] **Step 4: Commit**

```bash
git add tools/verify-site.mjs README.md
git commit -m "Add static site verification"
```

---

### Task 5: Browser And Responsive Verification

**Files:**
- Modify only if verification finds issues: `site/index.html`, `site/app.js`, `site/styles.css`.

**Interfaces:**
- Consumes: completed static site and local server.
- Produces: final verified milestone.

- [ ] **Step 1: Run local server**

Run: `python3 -m http.server 4173 --directory site`

- [ ] **Step 2: Verify desktop**

Open `http://localhost:4173` at a desktop viewport.

Expected:

- Header and hero are visible.
- `Prom 2000` call to action scrolls to the gallery.
- Navigation shows all legacy sections.
- Pending sections are clearly marked as pending migration.
- Student groups `11A` and `11B` are visible.

- [ ] **Step 3: Verify mobile**

Open `http://localhost:4173` at a mobile-width viewport.

Expected:

- No horizontal overflow.
- Header, navigation, student list, and modal controls remain touch-friendly.
- Student image scales inside the viewport.

- [ ] **Step 4: Verify active flow**

Select one student from `11A` and one from `11B`.

Expected:

- Each selected student opens in the same page.
- Detail can be closed with the visible close button.
- Detail can be closed with `Escape`.
- The active flow does not require Flash.

- [ ] **Step 5: Run static verification**

Run: `node tools/verify-site.mjs`

Expected: `Static site verification passed.`

- [ ] **Step 6: Commit verification fixes if needed**

```bash
git add site/index.html site/app.js site/styles.css
git commit -m "Polish responsive Prom 2000 experience"
```

---

## Self-Review Notes

- Spec coverage: Tasks cover archive-derived data, static no-framework app, Spanish navigation, Prom 2000 grouped gallery, in-page detail, Flash exclusion, README deployment notes, and desktop/mobile verification.
- Placeholder scan: No TBD or TODO requirements remain.
- Type consistency: `students` records consistently use `id`, `name`, `group`, `legacyPage`, `image`, and `hasProfileImage`.
