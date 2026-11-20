# Mohammad Molazem — Portfolio

A React + Vite portfolio with an animated 3D background, light/dark mode (light by default),
full English/Arabic support with automatic RTL layout, and a **Projects** section that pulls
live from GitHub — every public repo you push shows up automatically, with its `README.md`
rendered as the project's details.

## Run it locally

```bash
npm install
npm run dev
```

Open the printed `localhost` URL in your browser.

## How to add a new project

You don't edit any file here. Just push a new **public** repository to
`https://github.com/eng-molazem`, and:

- it appears as a new card in the Projects section automatically (name, language, stars, forks)
- clicking the card fetches that repo's `README.md` and renders it as the project's full details
- if a repo has no README yet, its GitHub "description" is shown instead

So the quality of a project's entry here depends on the quality of its README — a good README
(what it does, the stack, a screenshot/gif, setup steps) becomes a good project page here for free.

## Before you deploy — fill in your real links

Edit `src/data/socials.js`:

```js
export const socials = {
  github: 'https://github.com/eng-molazem',
  linkedin: 'https://www.linkedin.com/in/your-handle', // put your real profile URL
  email: 'm.molazm66@gmail.com',
}
```

## Dark mode & Arabic/English

Two toggles live in the navbar:

- A sun/moon button switches light/dark. The choice is saved per visitor (`localStorage`) and
  **light is the default** for a new visitor.
- A globe button switches English/Arabic. Arabic automatically switches the whole layout to RTL
  (right-to-left) and swaps the font to Cairo. All site text lives in one file:
  `src/i18n/translations.js` (an `en` and an `ar` object) — edit either language there, nothing
  else needs to change.

Colors for both themes are CSS variables in `src/index.css` (`:root` for light, `.dark` for dark),
so every component repaints automatically when the theme changes.

## Deploy for free (recommended: Vercel)

1. Push this `Portfolio` folder to its own GitHub repository.
2. Go to https://vercel.com → **Add New Project** → import that repository.
3. Framework preset: **Vite**. Leave build settings as default (`npm run build`, output `dist`).
4. Deploy — you get a free `your-name.vercel.app` URL, and every future `git push` redeploys
   automatically.

## Tech stack

- **React + Vite** — app shell and fast dev/build
- **Tailwind CSS** — styling and the color theme
- **Framer Motion** — scroll/entrance animations
- **React Three Fiber + drei** — the floating 3D shapes in the hero section
- **react-icons** — skill and social icons
- **react-markdown + remark-gfm** — renders each project's GitHub README
