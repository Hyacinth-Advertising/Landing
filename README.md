# Hyacinth Advertising Landing Page

A responsive marketing website for Hyacinth Advertising, based on the approved PDF design.

## Technology

- Vue 3 for the page structure and interactions
- Vite 6 for local development and production builds
- Plain CSS for styling and responsive layouts
- Self-hosted fonts and images from `public/`

The site is fully static. It has no backend and does not collect contact information directly.

## Run the site locally

Install [Node.js 22](https://nodejs.org/), then run:

```bash
npm ci
npm run dev
```

Open the local URL printed in the terminal, usually `http://localhost:5173`. Changes appear automatically while the development server is running.

## Where to make changes

| File | Purpose |
| --- | --- |
| `src/App.vue` | Page copy, sections, navigation, routes, and interactions |
| `src/style.css` | Colors, typography, layout, responsive styles, and animation |
| `src/components/SiteIcon.vue` | Local SVG icons |
| `src/siteConfig.js` | Shared Google Forms contact URL |
| `public/` | Fonts and image assets |

To activate the contact buttons, paste a valid Google Forms URL into `googleFormUrl` in `src/siteConfig.js`. Until then, the buttons remain disabled and show a “Contact form coming soon” message.

## Test a production build

```bash
npm run build
npm run preview
```

`npm run build` generates `dist/`. Do not edit that folder manually; this repository tracks it, so regenerate it before committing site changes.

## Routes and deployment

The homepage uses section anchors such as `#home` and `#about`. Privacy and Terms use `#/privacy` and `#/terms`.

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes `dist/` to GitHub Pages. Keep this as the only Pages deployment workflow—publishing the repository root will deploy unbuilt Vue source and result in a blank page.
