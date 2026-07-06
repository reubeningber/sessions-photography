# Photo Sessions with Reuben Ingber

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

| Command           | Action                                       |
| ------------------ | --------------------------------------------- |
| `npm run dev`       | Start the local dev server                    |
| `npm run build`     | Build the production site to `./dist/`        |
| `npm run preview`   | Preview the production build locally          |

## Environment variables

Copy `.env.example` to `.env` and fill in:

| Variable                        | Purpose                                                             |
| -------------------------------- | -------------------------------------------------------------------- |
| `PUBLIC_CLOUDINARY_CLOUD_NAME`   | Cloudinary cloud name used to build image delivery URLs             |
| `PUBLIC_GA_MEASUREMENT_ID`       | GA4 Measurement ID; analytics only load in production builds        |

Both are prefixed `PUBLIC_` so Astro exposes them to client-side code —
neither is a secret, but keeping them in `.env` means they're easy to swap
per-environment without touching source. `.env` is gitignored; set the same
values in Netlify's site environment variables for the deployed build.

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

No HTML editing required. The same pattern applies to the hero image
(`src/components/Hero.astro`) and the about photo
(`src/components/About.astro`) — pass a real `publicId` instead of `null`
once those photos are ready.

Until a section's `publicId` is `null`, it falls back to a warm-toned local
placeholder SVG in `public/images/placeholders/` so the site never ships a
broken image.

## Watermarking delivered photos (optional)

`src/components/Watermark.astro` wraps any image with the standalone
`LogoIcon` overlaid subtly in a corner:

```astro
<Watermark position="bottom-right">
  <img src="..." alt="..." />
</Watermark>
```

`position` accepts `bottom-right` (default), `bottom-left`, `top-right`, or
`top-left`. This isn't applied anywhere automatically — it's here for
whenever you decide, per session, that a delivered gallery should carry the
mark.

## Updating pricing and copy

- **Pricing** — `src/data/sessionTypes.js`
- **Testimonials** — `src/data/testimonials.js`
- **About bio, hero headline/subhead, contact info** — edit directly in
  `src/components/About.astro`, `src/components/Hero.astro`, and
  `src/components/Contact.astro`

## Design system

Colors, fonts, spacing scale, and border radii are defined as CSS custom
properties in `src/styles/global.css`. Change a value there and it propagates
everywhere.

## Deployment

### Connect Netlify to GitHub

1. Push this repo to `git@github.com:reubeningber/sessions-photography.git`
   (already done if you're reading this after the initial setup).
2. In [Netlify](https://app.netlify.com), click **Add new site → Import an
   existing project → Deploy with GitHub**, and select this repo.
3. Build settings are read from `netlify.toml` automatically:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Under **Site configuration → Environment variables**, add
   `PUBLIC_CLOUDINARY_CLOUD_NAME` and `PUBLIC_GA_MEASUREMENT_ID` with the same
   values as your local `.env`.
5. Deploy. Every push to `main` triggers a new production deploy.

### Custom subdomain

1. In Netlify, go to **Site configuration → Domain management → Add a
   domain**, and enter `sessions.reubeningber.com`.
2. At your domain registrar (wherever `reubeningber.com` is managed), add a
   CNAME record:

   | Type  | Name       | Value                          |
   | ----- | ---------- | ------------------------------- |
   | CNAME | `sessions` | `<your-site-name>.netlify.app`  |

   (Use the exact `.netlify.app` subdomain Netlify assigns your site — shown
   on the same Domain management page.)
3. Netlify auto-provisions a Let's Encrypt SSL certificate for the domain
   once DNS propagates (usually a few minutes to a few hours). You'll see a
   "Netlify certificate" badge with an expiration date once it's issued —
   that confirms it's live.

### Verifying Netlify Forms

Netlify scans the built HTML for `<form data-netlify="true">` at deploy time,
so no extra configuration is needed beyond what's already in
`src/components/Contact.astro`. After your first deploy:

1. Go to your site's dashboard → **Forms**. You should see a
   `booking-inquiry` form listed once the first deploy completes.
2. Submit a test inquiry through the live site.
3. The submission appears under **Forms → booking-inquiry → Submissions**,
   and (if configured) triggers an email notification — set that up under
   **Forms → Form notifications**.

### Verifying GA4

`PUBLIC_GA_MEASUREMENT_ID` only loads the `gtag.js` snippet in production
builds (`import.meta.env.PROD`), so local dev and `netlify build` deploy
previews from branches other than `main` won't send events unless you
explicitly set that env var for those contexts too. This keeps local testing
out of your real analytics.

To confirm tracking is live: open the deployed site, go to GA4 → **Reports →
Realtime**, and confirm your own visit shows up within a minute or two.
