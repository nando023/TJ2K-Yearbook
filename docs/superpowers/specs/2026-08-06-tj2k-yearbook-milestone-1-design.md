# TJ2K Yearbook Milestone 1 Design

Date: 2026-08-06

## Goal

Build the first modern static version of the TJ2K virtual yearbook by replacing the Flash-era main navigation and graduating class pages with responsive, Spanish-only HTML, CSS, and JavaScript.

The original archive remains preserved under `Archive/ANUARIO/` and is treated as source material, not as the deployable site.

## Approved Direction

Use a single static app with no frontend framework:

- `index.html` for the modern experience.
- `styles.css` for responsive presentation.
- `app.js` for navigation, gallery interactions, and modal/detail behavior.
- A small student data module or JSON file generated from the archive.

This is the best fit for Azure Static Website hosting because it produces plain static assets with no runtime server requirement and no build requirement unless later tooling is added.

## Scope For Milestone 1

Included:

- A modern Spanish home/navigation page.
- A navigation surface that exposes the original yearbook sections.
- `Prom 2000` as the active migrated section.
- A responsive graduating class gallery/list grouped by `11A` and `11B`.
- In-page student detail using a modal or detail panel.
- Student profile images sourced from `Archive/ANUARIO/imagenes/alumnos/` where available.
- Links or labels that clearly indicate unmigrated sections without pretending they are complete.

Excluded:

- Migration of pre-school, primaria, bachillerato, profesores, equipos, parejas, hermanos, comites, servicios, palabras, and collage sections beyond navigation placeholders.
- Recreating Flash-only animations without a separate decision.
- Editing or deleting source archive files.
- Adding a backend, CMS, database, or authentication.

## Content Source

Primary source files:

- `Archive/ANUARIO/paginas_totales/indice.htm`
- `Archive/ANUARIO/paginas_totales/prom2000.htm`
- `Archive/ANUARIO/paginas11/*.htm`
- `Archive/ANUARIO/imagenes/alumnos/*`

The old archive uses ISO-8859-1 HTML, table layouts, absolute positioning, and Flash embeds. The migration should preserve the names and student content as faithfully as practical while correcting character encoding for Spanish accents in the new UTF-8 site.

## User Experience

The first screen should present the yearbook identity and a clear path into `Prom 2000`.

The main navigation should include these sections from the archive:

- Pagina principal
- Palabras de despedida
- Personal administrativo
- Servicios generales
- Profesores
- Prom 2000
- Pre-escolar
- Primaria
- Bachillerato
- Comites
- Equipos
- Parejas
- Hermanos
- Collage

Only `Prom 2000` is interactive for migrated content in this milestone. Other sections should be visually available but marked as pending migration.

The `Prom 2000` gallery/list should:

- Work well on mobile and desktop.
- Group students by `11A` and `11B`.
- Support scanning by name.
- Open the selected student's archived profile image in the same page.
- Provide clear close/back behavior.
- Avoid separate modern student pages for this milestone.

## Flash Handling

No Flash files are embedded in milestone 1.

If implementation uncovers a Flash-only element that affects the active milestone experience, pause and ask the user whether to recreate, replace with static content, or omit that element.

Known Flash-dependent legacy entry/navigation elements may be skipped for this milestone unless they block the Prom 2000 flow.

## Visual Direction

Modernize the presentation rather than preserving the exact Flash-era look.

The style should feel like a respectful digital archive:

- Clean, readable typography.
- Strong use of the archived yearbook imagery.
- Dark or high-contrast presentation is acceptable if readability remains strong.
- Layouts should be image-forward without relying on decorative Flash-era effects.
- Controls should be touch-friendly on mobile.
- Cards and panels should be restrained, with no nested-card visual clutter.

## Accessibility And Responsiveness

The site should:

- Use semantic HTML.
- Include meaningful alt text for student images where possible.
- Keep text legible on mobile screens.
- Avoid horizontal overflow.
- Support keyboard focus for buttons, navigation, and modal controls.
- Respect reduced-motion preferences if animation is added.

## Data Shape

Student data should be represented as structured static data, with fields such as:

- `id`
- `name`
- `group`
- `legacyPage`
- `image`
- `hasProfileImage`

The implementation should derive this from the archive rather than manually inventing student records.

## Verification

Before the milestone is considered complete:

- Run a local static server.
- Verify the home/navigation view on desktop and mobile widths.
- Verify the Prom 2000 gallery/list grouping.
- Open multiple student details, including at least one from `11A` and one from `11B`.
- Confirm archived images load from the deployed static path.
- Confirm unmigrated sections are visibly marked as pending.
- Check that no Flash embed is required for the active flow.

## Deployment Fit

The deployable output should be plain static files suitable for Azure Static Website hosting. If files live under a `site/` folder, that folder should be the upload/deployment root.
