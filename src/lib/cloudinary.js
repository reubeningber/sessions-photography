const CLOUD_NAME = import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME;
const FOLDER = 'sessions';

/**
 * Resolves a public ID to its full path in the Cloudinary account. Gallery
 * photos are bare slugs relative to the `sessions` folder (e.g.
 * `astoria-park-sunset`); an ID that already contains a `/` is assumed to be
 * a full path elsewhere in the account — such as `web_assets/...`, shared
 * with reubeningber.com — and is used as-is. Assets from that shared account
 * (uploaded outside this repo, under Cloudinary's dynamic-folder asset
 * management) may 404 on a transformation that's never been requested
 * before unless the delivery URL includes the asset's version — prefix the
 * ID with `v<version>/` (e.g. `v1761245976/web_assets/...`), copied from the
 * asset's own delivery URL in the Cloudinary media library, if that happens.
 *
 * @param {string} publicId
 */
function resolvePublicId(publicId) {
  return publicId.includes('/') ? publicId : `${FOLDER}/${publicId}`;
}

// Cloudinary rejects g_auto (content-aware gravity) on any crop mode that
// doesn't actually crop — e.g. c_limit, used for the lightbox's full-size,
// non-cropped image — with a 400 error, which shows up as a broken <img>.
const GRAVITY_COMPATIBLE_CROPS = new Set(['fill', 'crop', 'thumb', 'lfill', 'fill_pad', 'auto', 'auto_pad']);

/**
 * Builds a Cloudinary delivery URL with sensible defaults: automatic format
 * and quality negotiation, and a requested display width for responsive
 * sizing.
 *
 * @param {string} publicId - Asset public ID. A bare slug is resolved
 *   relative to the `sessions` folder; an ID containing `/` is used as-is.
 * @param {object} [options]
 * @param {number} [options.width] - Target display width in pixels.
 * @param {number} [options.aspectRatio] - Aspect ratio as width/height (e.g. 4/5).
 * @param {string} [options.crop] - Cloudinary crop mode.
 * @param {string} [options.gravity] - Cloudinary gravity (crop focal point),
 *   e.g. 'auto' (content-aware saliency, the default) or 'faces' (centers
 *   on detected faces — better than 'auto' for close portraits where
 *   saliency tends to favor background detail over the people).
 * @param {string} [options.format] - Delivery format — defaults to 'auto'
 *   (negotiates WebP/AVIF per browser). Pass a concrete format like 'jpg'
 *   for contexts that fetch the URL without an Accept header (social-share
 *   crawlers reading og:image, for instance), where format negotiation
 *   can't happen and a modern format may not render.
 */
export function cloudinaryUrl(publicId, { width = 1200, aspectRatio, crop = 'fill', gravity = 'auto', format = 'auto' } = {}) {
  const transformations = [`f_${format}`, `q_auto`, `w_${width}`, `c_${crop}`];

  if (GRAVITY_COMPATIBLE_CROPS.has(crop)) {
    transformations.push(`g_${gravity}`);
  }

  if (aspectRatio) {
    transformations.push(`ar_${aspectRatio}`);
  }

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformations.join(',')}/${resolvePublicId(publicId)}`;
}

/**
 * Builds a `srcset`-ready list of Cloudinary URLs at several widths so the
 * browser can pick the best fit for the viewport and pixel density.
 *
 * @param {string} publicId
 * @param {object} [options]
 * @param {number[]} [options.widths]
 * @param {number} [options.aspectRatio]
 * @param {string} [options.crop]
 * @param {string} [options.gravity]
 */
export function cloudinarySrcSet(publicId, { widths = [480, 768, 1024, 1600], aspectRatio, crop, gravity } = {}) {
  return widths
    .map((width) => `${cloudinaryUrl(publicId, { width, aspectRatio, crop, gravity })} ${width}w`)
    .join(', ');
}
