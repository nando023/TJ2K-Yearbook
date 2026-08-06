# Alumni Page Fidelity Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Preserve original Prom 2000 alumni pages that used layered HTML and multiple images instead of reducing them to one portrait image.

**Architecture:** Keep `site/students.js` as the data source for the static site, and add optional per-student `legacyLayout` metadata only when the original page needs it. Render those layouts inside the existing modal with responsive CSS, while simple one-image pages continue using the current image path.

**Tech Stack:** Static HTML, CSS, browser JavaScript modules, Node.js audit/verification scripts.

## Global Constraints

- Do not modify files under `Archive/ANUARIO`.
- Keep all public UI copy in Spanish.
- Do not embed or reference Flash.
- Preserve the existing `image` and `hasProfileImage` fields for simple student rendering compatibility.
- Keep the site static and deployable to Azure Storage static website hosting.
- Ask the user before recreating complex text-heavy HTML pages as fully custom modern layouts.

---

### Task 1: Alumni Legacy Audit

**Files:**
- Create: `docs/audits/prom-2000-alumni-pages.md`

**Interfaces:**
- Consumes: `Archive/ANUARIO/paginas11/*.htm`, `site/students.js`
- Produces: a human-readable audit table listing each discrepancy and the recommended migration treatment.

- [ ] **Step 1: Generate discrepancy facts**

Run:

```bash
node --input-type=module <<'NODE'
import fs from 'node:fs';
import path from 'node:path';
const root = process.cwd();
const studentsModule = fs.readFileSync(path.join(root, 'site/students.js'), 'utf8');
const { students } = await import(`data:text/javascript;base64,${Buffer.from(studentsModule).toString('base64')}`);
function decode(s){return s.replace(/%([0-9a-f]{2})/gi,(_,h)=>String.fromCharCode(parseInt(h,16)));}
function normPage(p){return decode(p.replace(/^Archive\/ANUARIO\//,'../'));}
const byLegacy = new Map(students.filter(s=>s.legacyPage).map(s=>[normPage(s.legacyPage), s]));
const pagesDir = path.join(root, 'Archive/ANUARIO/paginas11');
for (const file of fs.readdirSync(pagesDir).filter(f=>f.endsWith('.htm')).sort()) {
  const html = fs.readFileSync(path.join(pagesDir, file), 'latin1');
  const imgs = [...html.matchAll(/<img\b[^>]*src=["']([^"']+)["'][^>]*>/gi)].map(m=>decode(m[1]));
  const positioned = [...html.matchAll(/position\s*:\s*absolute/gi)].length;
  const student = byLegacy.get(`../paginas11/${file}`);
  if (imgs.length > 1 || positioned > 0) {
    console.log(`${file}|${student?.name || '(unmapped)'}|${imgs.length}|${positioned}|${imgs.join(', ')}`);
  }
}
NODE
```

Expected multi-image legacy pages:

```text
adolfo_b.htm|Ballesteros Fernandez Adolfo|2|1|../imagenes/alumnos/adolfo_b.JPG, ../imagenes/1.jpg
bernardo.htm|Álvarez Castrillon Bernardo|2|1|../imagenes/NUEVAS%20FOTOS/BERNARDO%20ALVAREZ.jpg, ../imagenes/alumnos/bernardo.jpg
carolina_delaosa.htm|Mesa De La Ossa Carolina|2|1|../imagenes/alumnos/caro.jpg, ../imagenes/alumnos/mesa_de_la_osita.jpg
david_osorio.htm|Osorio Vargas David Alexander|2|1|../imagenes/alumnos/david%20osorio.jpg, ../imagenes/11.jpg
diego.htm|Berdugo Rodriguez Diego Fernando|2|1|../imagenes/0000000.jpg, ../imagenes/alumnos/Diego.JPG
galindo.htm|Galindo Olarte Andres David|2|1|../imagenes/alumnos/david.jpg, .././Pagina%20del%20anuario_archivos/image003.gif
luisa_fernanda.htm|Jiménez Giraldo Luisa Fernanda|2|1|../imagenes/alumnos/luisa_fernanda.jpg, ../imagenes/NUEVAS%20FOTOS/LUISA%20FERNANDA%20JIMENEZ.jpg
rafael_villamizar.htm|Villamizar Angulo Rafael Antonio|2|1|../imagenes/alumnos/Rafael%20V.jpg, ../imagenes/alumnos/rafael_villamizar.JPG
```

- [ ] **Step 2: Write audit report**

Create `docs/audits/prom-2000-alumni-pages.md` with:

```markdown
# Prom 2000 Alumni Page Audit

## Summary

- Legacy alumni pages inspected: 40
- Current modern students: 42
- Current students without legacy page: Cárdenas Uribe Cristian Fernando, Urrea Hernandez Carlos Daniel
- Multi-image legacy pages found: 8
- Text-layer legacy pages needing review: 2

## Recommended Treatment

Seven pages can be migrated as responsive layered image composites because the legacy page is a designed background image plus one positioned overlay image.

Galindo Olarte Andres David is different: the page is a Microsoft Word HTML export with typed text over `FONDO_PLANETA.jpg`, plus a student photo and a divider GIF. Neira Castaño Nasbly Hilduara also has a large positioned text layer over the profile image. These should be reviewed with the user before recreating the text-heavy layouts.

## Discrepancies

| Student | Legacy page | Current result | Missing original asset/layout | Recommendation |
| --- | --- | --- | --- | --- |
| Ballesteros Fernandez Adolfo | `Archive/ANUARIO/paginas11/adolfo_b.htm` | Shows only `adolfo_b.JPG` | Overlay `Archive/ANUARIO/imagenes/1.jpg` at left 20 top 29 | Migrate as composite |
| Álvarez Castrillon Bernardo | `Archive/ANUARIO/paginas11/bernardo.htm` | Shows only `BERNARDO ALVAREZ.jpg` | Base page `Archive/ANUARIO/imagenes/alumnos/bernardo.jpg` behind overlay | Migrate as composite |
| Mesa De La Ossa Carolina | `Archive/ANUARIO/paginas11/carolina_delaosa.htm` | Shows only `caro.jpg` | Base page `Archive/ANUARIO/imagenes/alumnos/mesa_de_la_osita.jpg` behind overlay | Migrate as composite |
| Osorio Vargas David Alexander | `Archive/ANUARIO/paginas11/david_osorio.htm` | Shows only `david osorio.jpg` | Overlay `Archive/ANUARIO/imagenes/11.jpg` at left 57 top 199 | Migrate as composite |
| Berdugo Rodriguez Diego Fernando | `Archive/ANUARIO/paginas11/diego.htm` | Shows only `0000000.jpg` | Base page `Archive/ANUARIO/imagenes/alumnos/Diego.JPG` behind overlay | Migrate as composite |
| Galindo Olarte Andres David | `Archive/ANUARIO/paginas11/galindo.htm` | Shows only `david.jpg` | Text-heavy Word-exported HTML over `FONDO_PLANETA.jpg` plus divider GIF | Ask before custom rebuild |
| Jiménez Giraldo Luisa Fernanda | `Archive/ANUARIO/paginas11/luisa_fernanda.htm` | Shows only `luisa_fernanda.jpg` | Overlay `Archive/ANUARIO/imagenes/NUEVAS FOTOS/LUISA FERNANDA JIMENEZ.jpg` | Migrate as composite |
| Neira Castaño Nasbly Hilduara | `Archive/ANUARIO/paginas11/nasbly.htm` | Shows only `nasbly.jpg` | Large positioned thank-you text layer over the original image | Ask before custom rebuild |
| Villamizar Angulo Rafael Antonio | `Archive/ANUARIO/paginas11/rafael_villamizar.htm` | Shows only `Rafael V.jpg` | Base page `Archive/ANUARIO/imagenes/alumnos/rafael_villamizar.JPG` behind overlay | Migrate as composite |
```

- [ ] **Step 3: Verify audit file**

Run:

```bash
rg -n "Multi-image legacy pages found: 8|Ask before custom rebuild|Migrate as composite" docs/audits/prom-2000-alumni-pages.md
```

Expected: matching lines are printed.

- [ ] **Step 4: Commit**

Run:

```bash
git add docs/audits/prom-2000-alumni-pages.md
git commit -m "Audit Prom 2000 alumni page layouts"
```

### Task 2: Data And Asset Packaging

**Files:**
- Modify: `tools/extract-students.mjs`
- Modify: `site/students.js`
- Create: `site/assets/students/legacy/1.jpg`
- Create: `site/assets/students/legacy/11.jpg`
- Create: `site/assets/students/legacy/bernardo.jpg`
- Create: `site/assets/students/legacy/diego.JPG`
- Create: `site/assets/students/legacy/luisa-fernanda-jimenez.jpg`
- Create: `site/assets/students/legacy/mesa-de-la-osita.jpg`
- Create: `site/assets/students/legacy/rafael-villamizar.JPG`

**Interfaces:**
- Consumes: legacy page discrepancy list from Task 1.
- Produces: `legacyLayout` objects in `site/students.js` for seven composite pages.
- Produces: packaged legacy assets under `site/assets/students/legacy/`.

- [ ] **Step 1: Add manual layout metadata**

In `tools/extract-students.mjs`, add a `legacyLayoutsByPage` map keyed by normalized `../paginas11/*.htm`. Each value must use this shape:

```js
{
  type: "composite",
  width: 755,
  height: 1190,
  background: "#000000",
  images: [
    { src: "site-relative/path.jpg", alt: "Página original de Ballesteros Fernandez Adolfo", left: 0, top: 0, width: 755, height: 1190 },
    { src: "site-relative/overlay.jpg", alt: "Fotografía superpuesta de Ballesteros Fernandez Adolfo", left: 20, top: 29, width: 215, height: 299 },
  ],
}
```

Use these seven layouts:

```js
[
  ["../paginas11/adolfo_b.htm", { type: "composite", width: 755, height: 1190, background: "#000000", images: [
    { src: "assets/students/ballesteros-fernandez-adolfo.JPG", alt: "Página original de Ballesteros Fernandez Adolfo", left: 0, top: 0, width: 755, height: 1190 },
    { src: "assets/students/legacy/1.jpg", alt: "Fotografía superpuesta de Ballesteros Fernandez Adolfo", left: 20, top: 29, width: 215, height: 299 },
  ]}],
  ["../paginas11/bernardo.htm", { type: "composite", width: 622, height: 802, background: "#ffffff", images: [
    { src: "assets/students/legacy/bernardo.jpg", alt: "Página original de Álvarez Castrillon Bernardo", left: 0, top: 0, width: 622, height: 802 },
    { src: "assets/students/alvarez-castrillon-bernardo.jpg", alt: "Fotografía superpuesta de Álvarez Castrillon Bernardo", left: 105, top: 37, width: 192, height: 261 },
  ]}],
  ["../paginas11/carolina_delaosa.htm", { type: "composite", width: 622, height: 785, background: "#ffffff", images: [
    { src: "assets/students/legacy/mesa-de-la-osita.jpg", alt: "Página original de Mesa De La Ossa Carolina", left: 0, top: 0, width: 622, height: 785 },
    { src: "assets/students/mesa-de-la-ossa-carolina.jpg", alt: "Fotografía superpuesta de Mesa De La Ossa Carolina", left: 127, top: 59, width: 163, height: 262 },
  ]}],
  ["../paginas11/david_osorio.htm", { type: "composite", width: 755, height: 1190, background: "#ffffff", images: [
    { src: "assets/students/osorio-vargas-david-alexander.jpg", alt: "Página original de Osorio Vargas David Alexander", left: 0, top: 0, width: 755, height: 1190 },
    { src: "assets/students/legacy/11.jpg", alt: "Fotografía superpuesta de Osorio Vargas David Alexander", left: 57, top: 199, width: 145, height: 212 },
  ]}],
  ["../paginas11/diego.htm", { type: "composite", width: 755, height: 1089, background: "#ffffff", images: [
    { src: "assets/students/legacy/diego.JPG", alt: "Página original de Berdugo Rodriguez Diego Fernando", left: 0, top: 0, width: 755, height: 1089 },
    { src: "assets/students/berdugo-rodriguez-diego-fernando.jpg", alt: "Fotografía superpuesta de Berdugo Rodriguez Diego Fernando", left: 613, top: 304, width: 111, height: 115 },
  ]}],
  ["../paginas11/luisa_fernanda.htm", { type: "composite", width: 668, height: 872, background: "#ffffff", images: [
    { src: "assets/students/jimenez-giraldo-luisa-fernanda.jpg", alt: "Página original de Jiménez Giraldo Luisa Fernanda", left: 0, top: 0, width: 668, height: 872 },
    { src: "assets/students/legacy/luisa-fernanda-jimenez.jpg", alt: "Fotografía superpuesta de Jiménez Giraldo Luisa Fernanda", left: 36, top: 52, width: 253, height: 312 },
  ]}],
  ["../paginas11/rafael_villamizar.htm", { type: "composite", width: 651, height: 860, background: "#ffffff", images: [
    { src: "assets/students/legacy/rafael-villamizar.JPG", alt: "Página original de Villamizar Angulo Rafael Antonio", left: 0, top: 0, width: 651, height: 860 },
    { src: "assets/students/villamizar-angulo-rafael-antonio.jpg", alt: "Fotografía superpuesta de Villamizar Angulo Rafael Antonio", left: 52, top: 19, width: 242, height: 343 },
  ]}],
]
```

- [ ] **Step 2: Attach layouts to generated records**

When creating each student object in `tools/extract-students.mjs`, compute:

```js
const legacyLayout = legacyLayoutsByPage.get(normalizeLegacyPage(legacyPage));
```

Include the property only when it exists:

```js
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
```

- [ ] **Step 3: Package secondary assets**

Run:

```bash
mkdir -p site/assets/students/legacy
cp "Archive/ANUARIO/imagenes/1.jpg" "site/assets/students/legacy/1.jpg"
cp "Archive/ANUARIO/imagenes/11.jpg" "site/assets/students/legacy/11.jpg"
cp "Archive/ANUARIO/imagenes/alumnos/bernardo.jpg" "site/assets/students/legacy/bernardo.jpg"
cp "Archive/ANUARIO/imagenes/alumnos/Diego.JPG" "site/assets/students/legacy/diego.JPG"
cp "Archive/ANUARIO/imagenes/NUEVAS FOTOS/LUISA FERNANDA JIMENEZ.jpg" "site/assets/students/legacy/luisa-fernanda-jimenez.jpg"
cp "Archive/ANUARIO/imagenes/alumnos/mesa_de_la_osita.jpg" "site/assets/students/legacy/mesa-de-la-osita.jpg"
cp "Archive/ANUARIO/imagenes/alumnos/rafael_villamizar.JPG" "site/assets/students/legacy/rafael-villamizar.JPG"
```

- [ ] **Step 4: Regenerate student data**

Run:

```bash
node tools/extract-students.mjs
```

Expected: `Wrote 42 students to site/students.js`.

- [ ] **Step 5: Verify generated metadata**

Run:

```bash
rg -n "legacyLayout|assets/students/legacy/1.jpg|assets/students/legacy/rafael-villamizar.JPG" site/students.js
```

Expected: `legacyLayout` appears seven times and both listed assets appear.

- [ ] **Step 6: Commit**

Run:

```bash
git add tools/extract-students.mjs site/students.js site/assets/students/legacy
git commit -m "Add legacy alumni layout metadata"
```

### Task 3: Responsive Alumni Layout Rendering

**Files:**
- Modify: `site/app.js`
- Modify: `site/styles.css`
- Modify: `tools/verify-site.mjs`

**Interfaces:**
- Consumes: optional `student.legacyLayout` object from Task 2.
- Produces: responsive modal rendering for composite alumni pages.

- [ ] **Step 1: Render legacy layouts before simple images**

In `site/app.js`, update `renderStudentModal(student)` so after the heading and group handling it returns a composite layout when `student.legacyLayout?.type === "composite"`.

Add this helper:

```js
function renderLegacyLayout(student) {
  const layout = student.legacyLayout;
  const name = escapeHtml(student.name);
  const images = layout.images.map((image) => `
    <img
      class="legacy-layout__image"
      src="./${escapeHtml(image.src)}"
      alt="${escapeHtml(image.alt)}"
      style="left: ${(image.left / layout.width) * 100}%; top: ${(image.top / layout.height) * 100}%; width: ${(image.width / layout.width) * 100}%; height: ${(image.height / layout.height) * 100}%;">
  `).join("");

  return `
    <figure class="legacy-layout" style="aspect-ratio: ${layout.width} / ${layout.height}; background: ${escapeHtml(layout.background)};">
      ${images}
      <figcaption>Composición original de ${name}</figcaption>
    </figure>
  `;
}
```

Use it from `renderStudentModal(student)`:

```js
if (student.legacyLayout?.type === "composite") {
  return `
    <h2 id="modal-title">${name}</h2>
    <p class="modal__group">Curso ${group}</p>
    ${renderLegacyLayout(student)}
  `;
}
```

- [ ] **Step 2: Style legacy layouts**

Add to `site/styles.css`:

```css
.legacy-layout {
  position: relative;
  width: min(100%, 760px);
  margin: 1.5rem auto 0;
  overflow: hidden;
  border: 1px solid #303a49;
  border-radius: 8px;
  box-shadow: 0 1rem 2.5rem rgb(0 0 0 / 28%);
}

.legacy-layout__image {
  position: absolute;
  display: block;
  object-fit: fill;
}

.legacy-layout figcaption {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
```

- [ ] **Step 3: Extend verifier**

In `tools/verify-site.mjs`, assert:

```js
const compositeStudents = students.filter((student) => student.legacyLayout?.type === "composite");
assert(compositeStudents.length === 7, "student data must include seven composite legacy layouts");

for (const student of compositeStudents) {
  assert(student.legacyLayout.width > 0, `${student.name} composite layout must have width`);
  assert(student.legacyLayout.height > 0, `${student.name} composite layout must have height`);
  assert(student.legacyLayout.images.length === 2, `${student.name} composite layout must use two images`);

  for (const image of student.legacyLayout.images) {
    assert(fs.existsSync(path.join(siteDir, image.src)), `${student.name} composite asset must exist: ${image.src}`);
  }
}

assert(appJs.includes("renderLegacyLayout(student)"), "app.js must render composite alumni layouts");
assert(stylesCss.includes(".legacy-layout"), "styles.css must style composite alumni layouts");
```

- [ ] **Step 4: Verify**

Run:

```bash
node tools/verify-site.mjs
git diff --check
```

Expected: verifier prints `Static site verification passed.` and `git diff --check` prints nothing.

- [ ] **Step 5: Commit**

Run:

```bash
git add site/app.js site/styles.css tools/verify-site.mjs
git commit -m "Render composite alumni pages"
```

### Task 4: Browser Verification And Deployment

**Files:**
- No required source edits unless verification exposes a defect.

**Interfaces:**
- Consumes: completed Tasks 1-3.
- Produces: verified and deployed Azure static site.

- [ ] **Step 1: Start local static server**

Run:

```bash
python3 -m http.server 4174 --directory site
```

- [ ] **Step 2: Browser-check a simple profile and a composite profile**

Use a browser at desktop and 390px mobile widths. Open `http://localhost:4174/`, click `Ver galería`, then open:

```text
Álvarez Castrillon Bernardo
Pal Forero Sonali
```

Expected:

```text
Bernardo shows the layered original page composition.
Sonali still shows the simple single-image profile.
No horizontal overflow at 390px.
No browser console errors.
```

- [ ] **Step 3: Stop local static server**

Stop the server with Ctrl-C.

- [ ] **Step 4: Merge and push**

Run from the main checkout:

```bash
git merge --ff-only alumni-page-fidelity
git push origin main
```

- [ ] **Step 5: Deploy to Azure Static Website**

Run:

```bash
az storage blob upload-batch --account-name tj2kyearbook2000 --destination '$web' --source site --overwrite true --auth-mode key --output json
curl -I --fail https://tj2kyearbook2000.z20.web.core.windows.net/
curl -I --fail https://tj2kyearbook2000.z20.web.core.windows.net/assets/students/legacy/bernardo.jpg
curl --fail --silent https://tj2kyearbook2000.z20.web.core.windows.net/students.js | rg -n "legacyLayout|assets/students/legacy/bernardo.jpg"
```

Expected: homepage and legacy asset return `200 OK`, and deployed `students.js` contains `legacyLayout`.

## Self-Review

- Spec coverage: The plan inventories legacy alumni pages, captures multi-image discrepancies, packages missing assets, renders responsive composites, and deploys to Azure.
- Placeholder scan: No TBD/TODO/fill-in placeholders remain.
- Type consistency: `legacyLayout.type`, `legacyLayout.width`, `legacyLayout.height`, `legacyLayout.background`, and `legacyLayout.images[]` are consistently used by extraction, rendering, and verification.
