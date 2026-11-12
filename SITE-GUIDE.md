# Eliza's academic website

This is a static site for GitHub Pages. There is no build step and no need to install the old Bootstrap/Gulp dependencies.

## Preview

From this folder, run `python3 -m http.server 8080`, then visit <http://localhost:8080>. Opening `index.html` directly also works, although clipboard support depends on the browser.

## Updating content

- Edit the introduction, news, research, and publication cards in `index.html`.
- The headshot is the supplied `eli.png`. Replace that file to change the photo.
- Replace `files/eliza.pdf` to update the CV. Both CV buttons point there.
- Publication PDFs live under `files/papers/`. Use URL-encoded spaces in links, and preserve exact filename capitalization for GitHub Pages.
- The first three publication cards are featured. `js/site.js` places the remaining cards in an expandable archive. Add research area keywords to `data-area` to enable filtering (`ai`, `accessibility`, `hci`). Update the archive count in that script when adding papers.
- Citation text is maintained in the `citations` object in `js/site.js`.
- Education, experience, and service expand on demand. All content remains available when JavaScript is disabled.
- `css/site.css` controls the visual design and responsive layout. The old theme files remain for repository history but are no longer loaded.

## Publish through GitHub Pages

The repository is `elizaan/elizaan.github.io`, and its default branch is `main`. Its public site is <https://elizaan.github.io/>.

Commit the updated site files, CV, photo, and papers, then push to `main`. Existing GitHub Pages publishing should run automatically. Check the repository's Actions tab for the Pages deployment. If Pages needs configuring, open Settings → Pages, select “Deploy from a branch,” and use `main` / `(root)`.

For later routine updates after the checkout is synchronized:

```sh
git add index.html css/site.css js/site.js assets .nojekyll files/eliza.pdf eli.png files/papers SITE-GUIDE.md README.md
git commit -m "Update academic profile"
git push origin main
```

Avoid `git add .` if unrelated files have changed. If Git reports remote changes, fetch and review them before integrating; do not force-push.

## Visual assets and provenance

- `eli.png`: user-supplied headshot, used without AI modification.
- `assets/research/chart-evidence.png`: teaser from the author's [chart evidence paper](https://arxiv.org/html/2607.25021v2).
- `assets/research/climate-teaser.jpg`: optimized teaser from the author's [petascale animation paper](https://arxiv.org/html/2603.07053v4).
- `assets/research/upset-teaser.png`: first-page figure extracted from the supplied UpSet paper PDF.
- `assets/research/pathology.svg`: original conceptual illustration, not a screenshot or clinical data.
- `assets/research/data-exploration.jpg`: generated with the built-in image-generation tool, then optimized for the website. This is supporting editorial artwork, not an image of the research system.
- The outdoor photograph is from the user's existing travel collection, optimized as `assets/outdoors.jpg`.
- Icons use the repository's bundled Font Awesome font. The serif and sans-serif fonts are Lora and DM Sans from Google Fonts, with system fallbacks.

Final image-generation prompt:

> Use case: illustration-story. Asset type: small editorial illustration for an academic research website project about AI agents for scientific data exploration. Scene/backdrop: warm ivory paper, subtly textured. Subject: a thoughtful composition of scientific data and connected analysis steps: a delicate teal gridded ocean wave at the bottom, small coral and blue chart panels floating above, and fine ink paths linking three small data blocks to a simple plotted curve. A tiny human silhouette is studying the data at a desk, to convey human-centered research. Style/medium: understated hand-crafted editorial screen print, crisp fine ink lines with imperfect risograph texture, restrained forest teal, terracotta, muted blue and cream. Flat illustration with generous breathing room, suitable for a serious academic portfolio. Composition/framing: landscape 3:2, centered balanced composition, readable at 400px width. Constraints: no text, no lettering, no logos, no watermark, no robots, no glowing effects.
