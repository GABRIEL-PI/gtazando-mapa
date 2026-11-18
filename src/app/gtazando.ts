/** Gtazando deployment settings. Override at build time with VITE_* env vars. */
export const GTAZANDO_URL: string = import.meta.env.VITE_GTAZANDO_URL || 'https://gtazando.com/';
/** AGPL-3.0 §13: link to the source of this modified version. Point it to your public fork. */
export const SOURCE_URL: string =
  import.meta.env.VITE_SOURCE_URL || 'https://github.com/navanem/gta6-leonida-atlas';
