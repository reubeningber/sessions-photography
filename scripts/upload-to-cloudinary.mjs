#!/usr/bin/env node
/**
 * Uploads local image files to this site's Cloudinary account, into the
 * `sessions` folder (or whatever --folder=... you pass), and prints back
 * everything needed to add a src/data/gallery.js entry: the public ID, the
 * detected orientation/aspect ratio, and a ready-to-paste object literal.
 *
 * Usage:
 *   npm run upload -- path/to/photo.jpg [more/photos.jpg ...]
 *   npm run upload -- path/to/photo.jpg::custom-public-id
 *   npm run upload -- path/to/photo.jpg --folder=sessions
 *
 * Requires CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET in .env — these are
 * server-only credentials, never prefixed with PUBLIC_ and never committed.
 * PUBLIC_CLOUDINARY_CLOUD_NAME (already used to build delivery URLs) is
 * reused here too, so this always targets the same Cloudinary account the
 * site reads images from.
 */
import { v2 as cloudinary } from 'cloudinary';
import path from 'node:path';

try {
  process.loadEnvFile('.env');
} catch {
  // .env is optional here — a real shell env (CI, etc.) can supply these instead.
}

const cloudName = process.env.PUBLIC_CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
  console.error(
    'Missing Cloudinary credentials. Set PUBLIC_CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, ' +
      'and CLOUDINARY_API_SECRET in .env (see .env.example).',
  );
  process.exit(1);
}

cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret });

const rawArgs = process.argv.slice(2);
const folderArg = rawArgs.find((arg) => arg.startsWith('--folder='));
const folder = folderArg ? folderArg.split('=')[1] : 'sessions';
const files = rawArgs.filter((arg) => !arg.startsWith('--'));

if (files.length === 0) {
  console.error('Usage: npm run upload -- path/to/photo.jpg [path/to/other.jpg::custom-id]');
  process.exit(1);
}

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function toEntry({ publicId, width, height, secureUrl }) {
  const orientation = height > width ? 'portrait' : 'landscape';
  const aspectRatio = orientation === 'portrait' ? '4 / 5' : '3 / 2';

  return { publicId, width, height, orientation, aspectRatio, secureUrl };
}

const results = [];

for (const rawFile of files) {
  const [filePath, customId] = rawFile.split('::');
  const stem = customId ?? slugify(path.basename(filePath, path.extname(filePath)));
  const publicId = `${folder}/${stem}`;

  process.stdout.write(`Uploading ${filePath} -> ${publicId} ... `);

  try {
    const result = await cloudinary.uploader.upload(filePath, {
      public_id: publicId,
      overwrite: true,
      resource_type: 'image',
    });

    console.log('done');

    results.push(
      toEntry({
        publicId: stem,
        width: result.width,
        height: result.height,
        secureUrl: result.secure_url,
      }),
    );
  } catch (error) {
    console.log('FAILED');
    console.error(`  ${error.message ?? error}`);
  }
}

if (results.length > 0) {
  console.log('\nUploaded. Paste into src/data/gallery.js:\n');

  for (const entry of results) {
    console.log(
      `{
  publicId: '${entry.publicId}',
  placeholder: null,
  alt: '', // describe what's happening
  caption: '', // short grid label
  orientation: '${entry.orientation}',
  aspectRatio: ${entry.aspectRatio},
  number: '',
},`,
    );
    console.log(`  (${entry.width}x${entry.height}) ${entry.secureUrl}\n`);
  }
}
