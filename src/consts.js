// The site currently lives under /preview/ while the "Coming Soon" page
// occupies the real root. At launch, /preview/* is promoted to `/` and
// this becomes '/' — every cross-page link built from it updates at once.
export const BASE_PATH = '/preview/';
