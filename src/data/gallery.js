/**
 * Gallery items for the Work section.
 *
 * Supports both portrait and landscape photos. `orientation` drives layout —
 * a `landscape` item spans two grid columns at tablet width and up so it
 * doesn't get force-cropped into a portrait-shaped slot. `aspectRatio` is
 * the crop/display ratio (width / height); 4/5 for portrait and 3/2 for
 * landscape are this grid's defaults, but any ratio works.
 *
 * To add a new photo once it's uploaded to Cloudinary (folder: `sessions`):
 *   1. Upload it — either run `npm run upload -- path/to/photo.jpg` (see
 *      scripts/upload-to-cloudinary.mjs, which prints a ready entry to
 *      paste below) or add it by hand in the Cloudinary media library.
 *   2. Set `publicId` to the asset's public ID (without the `sessions/`
 *      prefix — that's added automatically).
 *   3. Write a descriptive `alt` (what's happening, where) and a short
 *      `caption` for the grid label, and set `orientation`/`aspectRatio`.
 *   4. Leave `publicId: null` and pick a `placeholder` path to show a
 *      placeholder tile until the real photo is ready.
 */
export const galleryImages = [
  {
    publicId: 'lakeside-portrait',
    placeholder: '/images/placeholders/portrait-1.svg',
    alt: 'Young girl striking a playful pose, hands on hips, beside a park pond',
    caption: 'Lakeside portrait',
    orientation: 'portrait',
    aspectRatio: 4 / 5,
    number: '01',
  },
  {
    publicId: 'autumn-couple-portrait',
    placeholder: '/images/placeholders/portrait-2.svg',
    alt: 'Couple smiling together under a canopy of deep autumn leaves',
    caption: 'Autumn portrait',
    orientation: 'landscape',
    aspectRatio: 3 / 2,
    number: '02',
  },
  {
    publicId: 'mother-daughter-bench',
    placeholder: '/images/placeholders/portrait-1.svg',
    alt: 'Mother and toddler daughter smiling close together on a bench',
    caption: 'Mother & daughter',
    orientation: 'portrait',
    aspectRatio: 4 / 5,
    number: '03',
  },
  {
    publicId: 'mother-son-bench',
    placeholder: '/images/placeholders/portrait-2.svg',
    alt: 'Mother and son sharing a close, warm moment on a bench',
    caption: 'Mother & son',
    orientation: 'portrait',
    aspectRatio: 4 / 5,
    // Cloudinary's default content-aware gravity favored the empty tree
    // canopy over the two of them, cramming their faces into the bottom of
    // the frame — 'faces' centers the crop on the detected faces instead.
    gravity: 'faces',
    number: '04',
  },
  {
    publicId: 'bench-sunglasses',
    placeholder: '/images/placeholders/portrait-3.svg',
    alt: 'Girl in oversized sunglasses laughing on a park bench',
    caption: 'Bench giggles',
    orientation: 'portrait',
    aspectRatio: 4 / 5,
    number: '05',
  },
  {
    publicId: 'underpass-portrait',
    placeholder: '/images/placeholders/portrait-3.svg',
    alt: 'Boy in a puffer jacket posing against a graffiti-covered underpass wall',
    caption: 'Underpass portrait',
    orientation: 'landscape',
    // The grid's equal-height rule pins a landscape tile's rendered box to
    // roughly 5/3, not the usual 3/2 — a mismatch most landscape photos
    // have enough headroom to absorb via the default CSS center-crop, but
    // this one's tight, headshot-style framing (barely any margin above his
    // head or below his hands) made that crop cut straight into him. Asking
    // Cloudinary for 5/3 directly — matching the actual rendered box, with
    // 'faces' gravity — moves the crop from a blind CSS center-crop to a
    // face-aware one, so headroom is preserved and the CSS layer has
    // nothing left to crop.
    aspectRatio: 5 / 3,
    gravity: 'faces',
    number: '06',
  },
  {
    publicId: null,
    placeholder: '/images/placeholders/portrait-4.svg',
    alt: 'Kids drawing with sidewalk chalk in Jackson Heights',
    caption: 'Sidewalk chalk',
    orientation: 'portrait',
    aspectRatio: 4 / 5,
    number: '07',
  },
  {
    publicId: null,
    placeholder: '/images/placeholders/portrait-1.svg',
    alt: 'Grandmother and grandchild on a porch swing in Woodside',
    caption: 'Porch swing',
    orientation: 'portrait',
    aspectRatio: 4 / 5,
    number: '08',
  },
];
