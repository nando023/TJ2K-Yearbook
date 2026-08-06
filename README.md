# TJ2K Yearbook

Migration workspace for the TJ2K virtual yearbook.

## Objective

Migrate the original Flash-era virtual yearbook to modern, browser-compatible static web technologies. The migrated site should be responsive enough to use comfortably on mobile phones and suitable for hosting as an Azure Static Website.

## Source Archive

The legacy yearbook content is preserved under:

```text
Archive/ANUARIO/
```

Observed archive contents include legacy `.htm` pages, images, audio files, Flash `.swf` files, and Flash source `.fla` files.

The old entry page appears to be:

```text
Archive/ANUARIO/index.htm
```

## Migration Notes

- Keep the archive intact as source material.
- Prefer static output unless a specific interaction requires JavaScript.
- Replace Flash-dependent navigation, animation, and media with standards-based HTML, CSS, and JavaScript.
- Preserve original content and media where possible.
- Make layouts responsive for mobile and desktop.

## Open Questions

1. Should the migrated site preserve the original visual style closely, or modernize the presentation while keeping the original content?
2. Should all archive sections be migrated in the first pass, or should the first milestone focus on the main navigation and graduating class pages?
3. Should Flash-only animations be recreated, replaced with static images, or omitted when no direct HTML equivalent exists?
4. Is Spanish the only required site language?
