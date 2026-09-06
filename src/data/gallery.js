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
    placeholder: null,
    alt: 'Young girl striking a playful pose, hands on hips, beside a park pond',
    caption: 'Lakeside portrait',
    orientation: 'portrait',
    aspectRatio: 4 / 5,
    number: '01',
  },
  {
    publicId: 'autumn-couple-portrait',
    placeholder: null,
    alt: 'Couple smiling together under a canopy of deep autumn leaves',
    caption: 'Autumn portrait',
    orientation: 'landscape',
    aspectRatio: 3 / 2,
    number: '02',
  },
  {
    publicId: 'toddler-stoop-portrait',
    placeholder: null,
    alt: "Toddler boy with curly hair smiling on a brownstone stoop",
    caption: 'Stoop portrait',
    orientation: 'portrait',
    aspectRatio: 4 / 5,
    number: '03',
  },
  {
    publicId: 'mother-son-bench',
    placeholder: null,
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
    placeholder: null,
    alt: 'Girl in oversized sunglasses laughing on a park bench',
    caption: 'Bench giggles',
    orientation: 'portrait',
    aspectRatio: 4 / 5,
    number: '05',
  },
  {
    publicId: 'mother-daughter-bench',
    placeholder: null,
    alt: 'Mother and toddler daughter smiling close together on a bench',
    caption: 'Mother & daughter',
    orientation: 'portrait',
    aspectRatio: 4 / 5,
    number: '06',
  },
  {
    publicId: 'mom-and-kids-courtyard',
    placeholder: null,
    alt: "Mother laughing with her two children in a leafy courtyard",
    caption: 'Mom & the kids',
    orientation: 'portrait',
    aspectRatio: 4 / 5,
    number: '07',
  },
  {
    publicId: 'dad-kids-cheek-kisses',
    placeholder: null,
    alt: "Father getting cheek kisses from his two kids under the trees",
    caption: 'Daddy kisses',
    orientation: 'landscape',
    aspectRatio: 3 / 2,
    number: '08',
  },
  {
    publicId: 'girl-stoop-twirl',
    placeholder: null,
    alt: "Girl in a floral dress twirling on brownstone steps",
    caption: 'Stoop twirl',
    orientation: 'portrait',
    aspectRatio: 4 / 5,
    number: '09',
  },
  {
    publicId: 'parents-stoop-portrait',
    placeholder: null,
    alt: "Couple smiling together on their brownstone stoop",
    caption: 'Front stoop portrait',
    orientation: 'portrait',
    aspectRatio: 4 / 5,
    number: '10',
  },
  {
    publicId: 'family-of-four-stoop',
    placeholder: null,
    alt: "Family of four smiling together on a brownstone stoop railing",
    caption: 'Family on the stoop',
    orientation: 'portrait',
    aspectRatio: 4 / 5,
    number: '11',
  },
  {
    publicId: 'girl-rug-smile',
    placeholder: null,
    alt: 'Toddler girl laughing with arms outstretched, lying on a patterned rug',
    caption: 'Rug giggles',
    orientation: 'landscape',
    aspectRatio: 3 / 2,
    number: '12',
  },
];
