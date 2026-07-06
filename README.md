<p align="center">
  <img src=".github/logo.svg" alt="Photo Sessions with Reuben Ingber" width="380" />
</p>

Marketing site for a family photography side business, serving Queens,
Brooklyn, and Manhattan, NYC. Built with [Astro](https://astro.build), styled
with plain CSS, images delivered through Cloudinary, deployed on Netlify.

Live at [sessions.reubeningber.com](https://sessions.reubeningber.com).

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

1. Upload the photo to Cloudinary, into the `sessions` folder.
2. Open `src/data/gallery.js` and either edit an existing entry or add a new
   one:

   ```js
   {
     publicId: 'astoria-park-sunset', // the Cloudinary public ID, no folder prefix
     placeholder: null,               // no longer needed once publicId is set
     alt: 'Family photographed at sunset in Astoria Park',
     caption: 'Astoria Park',
     number: '10',
   }
   ```
3. Commit and push — Netlify rebuilds and redeploys automatically.

The same pattern applies to the hero image (`src/components/Hero.astro`) and
the about photo (`src/components/About.astro`) — pass a real `publicId`
instead of `null` once those photos are ready.

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
