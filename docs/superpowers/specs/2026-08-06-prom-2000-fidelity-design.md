# Prom 2000 Fidelity Design

Date: 2026-08-06

## Goal

Improve the migrated Prom 2000 experience so it better captures the feeling of the original yearbook while staying modern, responsive, Spanish-only, and Flash-free.

The main site/home navigation redesign remains out of scope for this pass.

## Approved Direction

Replace the legacy `PROM2000.swf` intro with a modern static Prom 2000 hero using archived imagery instead of Flash.

Include both the student gallery and the archived Prom 2000 visual material:

- `Archive/ANUARIO/imagenes/FONDO_PROM.jpg`
- `Archive/ANUARIO/imagenes/ONCE_A.jpg`
- `Archive/ANUARIO/imagenes/once_b.jpg`
- `Archive/ANUARIO/imagenes/collage.jpg`
- `Archive/ANUARIO/imagenes/collage_momentos_11111.gif`

## Scope

Included:

- Add a Prom 2000 visual hero inside the Prom 2000 section.
- Package the relevant archive images under `site/assets/prom-2000/`.
- Show 11A and 11B group photos.
- Add a `Momentos 11` visual section using archived collage imagery.
- Keep the existing responsive student gallery/list and in-page modal detail.
- Update static verification so required Prom 2000 visual assets are checked.

Excluded:

- Main page redesign.
- Any Flash embedding.
- Recreating Flash animation.
- Migrating unrelated yearbook sections.
- Editing or deleting files under `Archive/ANUARIO/`.

## UX Notes

The page should feel more like a digital yearbook spread:

- Use the original Prom 2000 background as atmosphere, not as unreadable wallpaper.
- Let class photos and collages be prominent visual anchors.
- Preserve readable modern typography and touch-friendly controls.
- Keep the student list easy to scan on mobile.
- Avoid adding fake content not present in the archive.

## Verification

- `node tools/verify-site.mjs` must pass.
- Local static server must serve the new Prom 2000 assets from `site/`.
- The Prom 2000 section must show the class photos and Momentos 11 imagery.
- The student modal flow must still work.
- No `.swf` references may be introduced.
