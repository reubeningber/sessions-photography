<p align="center">
  <img src=".github/logo.svg" alt="Photo Sessions with Reuben Ingber" width="380" />
</p>

Marketing site for a family photography side business, serving Queens,
Brooklyn, and Manhattan, NYC. Built with [Astro](https://astro.build), styled
with plain CSS, images delivered through Cloudinary, deployed on Netlify.

Live at [sessions.reubeningber.com](https://sessions.reubeningber.com).

This is a personal project for my own business — it's public for
portfolio/reference purposes, not as a template intended for reuse or
redeployment.

## Coming-soon mode (temporary)

The site is currently in "coming soon" mode ahead of the real launch:

- `/` is a minimal email-capture page (`src/pages/index.astro`).
- The full, finished site lives at `/preview` (`src/pages/preview/`) and is
  gated behind Cloudflare Access — see **Reversing coming-soon mode** below
  for how that's configured.
- Coming-soon signups land under **Forms → coming-soon-signup** in the
  Netlify dashboard (separate from the **booking-inquiry** form used by the
  full site's contact form at `/preview/#contact`).

### Reversing coming-soon mode (full launch)

When ready to go live for real:

1. Move `/preview` back to `/`:
   - `git mv src/pages/preview/index.astro src/pages/index.astro` (overwriting
     the coming-soon page — delete `src/pages/thank-you.astro` and
     `src/layouts/MinimalLayout.astro` too if nothing else uses them)
   - `git mv src/pages/preview/thank-you.astro src/pages/thank-you.astro`
   - Fix the relative imports in both files (drop one `../`)
   - Revert `Contact.astro`'s form `action` back to `/thank-you/`
   - Revert `Logo.astro`/`Nav.astro`'s `href="/preview/"` back to `/`
   - Remove the `/preview` sitemap filter in `astro.config.mjs` and the
     `Disallow: /preview` line in `public/robots.txt`
2. Remove the Cloudflare Access policy/path scoping added for `/preview`
   (see the PR description or commit history for how it was set up) so the
   whole domain is public again.
3. Export the captured email list from **Netlify → Forms →
   coming-soon-signup** before removing the coming-soon page — once the page
   and its form are gone, new submissions can no longer arrive there, and
   it's easiest to grab the CSV while the form still exists in the dashboard.

## Local development

Requires Node 22.12+.

```sh
npm install
cp .env.example .env   # then fill in real values, see below
npm run dev
```

The dev server runs at `http://localhost:4321`.

## Environment variables

Copy `.env.example` to `.env` and fill in:

| Variable                      | Purpose                                                       |
| ------------------------------ | -------------------------------------------------------------- |
| `PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name used to build image delivery URLs       |
| `PUBLIC_GA_MEASUREMENT_ID`     | GA4 Measurement ID; analytics only load in production builds  |

`.env` is gitignored. The same values are set in Netlify's site environment
variables for the deployed build.

## Adding gallery photos

Images are never committed to this repo — they're hosted on Cloudinary and
referenced by public ID. There are two ways to get a photo onto Cloudinary:

**Automated (recommended):**

```sh
npm run upload -- path/to/photo.jpg
```

This uploads the file into the `sessions` Cloudinary folder (using the
`CLOUDINARY_API_KEY`/`CLOUDINARY_API_SECRET` in `.env` — see
`.env.example`) and prints a ready-to-paste `src/data/gallery.js` entry,
including the detected orientation and aspect ratio. Upload several at once
by passing multiple paths, and override the public ID with
`path/to/photo.jpg::custom-id` if you don't want the filename slug. See
`scripts/upload-to-cloudinary.mjs` for details.

**Manual:** upload the photo through the Cloudinary media library instead,
into the `sessions` folder, if you'd rather not use the script.

Either way, open `src/data/gallery.js` and add (or edit) an entry:

```js
{
  publicId: 'astoria-park-sunset', // the Cloudinary public ID, no folder prefix
  placeholder: null,               // no longer needed once publicId is set
  alt: 'Family photographed at sunset in Astoria Park',
  caption: 'Astoria Park',
  orientation: 'landscape',        // 'portrait' or 'landscape' — controls grid layout
  aspectRatio: 3 / 2,              // crop ratio; 4/5 portrait and 3/2 landscape are the defaults
  number: '10',
}
```

A `landscape` item automatically spans two grid columns at tablet width and
up instead of being force-cropped into a portrait-shaped slot, so both
orientations look intentional in the grid.

Commit and push — Netlify rebuilds and redeploys automatically.

The same pattern applies to the hero image (`src/components/Hero.astro`) and
the about photo (`src/components/About.astro`) — pass a real `publicId`
instead of `null` once those photos are ready. A `publicId` isn't limited to
the `sessions` folder either: pass a full path (e.g.
`web_assets/some-shared-asset`) to reference an asset stored elsewhere in
the same Cloudinary account, such as one shared with reubeningber.com.

Until a section's `publicId` is `null`, it falls back to a warm-toned local
placeholder SVG in `public/images/placeholders/`.

## Watermarking delivered photos (optional)

`src/components/Watermark.astro` wraps any image with the standalone
`LogoIcon` overlaid subtly in a corner:

```astro
<Watermark position="bottom-right">
  <img src="..." alt="..." />
</Watermark>
```

`position` accepts `bottom-right` (default), `bottom-left`, `top-right`, or
`top-left`. Not applied anywhere automatically — add it per session when a
delivered gallery should carry the mark.

## Updating pricing and copy

- **Pricing** — `src/data/sessionTypes.js`
- **Testimonials** — `src/data/testimonials.js`
- **About bio, hero headline/subhead, contact info** — edit directly in
  `src/components/About.astro`, `src/components/Hero.astro`, and
  `src/components/Contact.astro`

## Design system

Colors, fonts, spacing scale, and border radii are defined as CSS custom
properties in `src/styles/global.css`.

## Deployment

Connected to Netlify for continuous deployment — every push to `main`
triggers a production build (`npm run build`, publishing `dist`, per
`netlify.toml`) and goes live at `sessions.reubeningber.com`.

- **Netlify Forms**: submissions land under the site's **Forms →
  booking-inquiry** tab in the Netlify dashboard.
- **GA4**: `PUBLIC_GA_MEASUREMENT_ID` only loads `gtag.js` in production
  builds, so local dev never pollutes real analytics. Check **GA4 → Reports →
  Realtime** to confirm tracking on the live site.
