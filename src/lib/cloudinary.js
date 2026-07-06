const CLOUD_NAME = import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME;
const FOLDER = 'sessions';

/**
 * Builds a Cloudinary delivery URL with sensible defaults: automatic format
 * and quality negotiation, and a requested display width for responsive
 * sizing. Public IDs are relative to the `sessions` folder.
 *
 * @param {string} publicId - Asset public ID, relative to the sessions folder.
 * @param {object} [options]
 * @param {number} [options.width] - Target display width in pixels.
 * @param {number} [options.aspectRatio] - Aspect ratio as width/height (e.g. 4/5).
 * @param {string} [options.crop] - Cloudinary crop mode.
 */
export function cloudinaryUrl(publicId, { width = 1200, aspectRatio, crop = 'fill' } = {}) {
  const transformations = [`f_auto`, `q_auto`, `w_${width}`, `c_${crop}`, `g_auto`];

  if (aspectRatio) {
    transformations.push(`ar_${aspectRatio}`);
  }

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformations.join(',')}/${FOLDER}/${publicId}`;
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
 */
export function cloudinarySrcSet(publicId, { widths = [480, 768, 1024, 1600], aspectRatio, crop } = {}) {
  return widths
    .map((width) => `${cloudinaryUrl(publicId, { width, aspectRatio, crop })} ${width}w`)
    .join(', ');
}
