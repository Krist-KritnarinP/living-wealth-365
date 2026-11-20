// ==========================================
// 🖼️ Living Wealth 365 - Cover Image Framing Utility
// Encodes/parses non-destructive cover framing metadata in URL hash (#lwframe=...)
// so DB storage & CDN fetches work with zero schema changes.
// ==========================================

export const DEFAULT_IMAGE_FRAME = {
  fit: 'cover',
  x: 50,
  y: 50,
  zoom: 1,
};

const FRAME_PREFIX = '#lwframe=';

function clamp(num, min, max, fallback) {
  const parsed = Number(num);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(max, Math.max(min, Math.round(parsed * 100) / 100));
}

export function stripImageFrame(url) {
  if (!url || typeof url !== 'string') return '';
  const idx = url.indexOf(FRAME_PREFIX);
  return idx === -1 ? url : url.slice(0, idx);
}

export function parseImageFrame(url) {
  const cleanUrl = stripImageFrame(url);
  if (!url || typeof url !== 'string') {
    return { cleanUrl, ...DEFAULT_IMAGE_FRAME };
  }

  const idx = url.indexOf(FRAME_PREFIX);
  if (idx === -1) {
    return { cleanUrl, ...DEFAULT_IMAGE_FRAME };
  }

  const raw = url.slice(idx + FRAME_PREFIX.length);
  const frame = { ...DEFAULT_IMAGE_FRAME };

  raw.split(';').forEach((pair) => {
    const [k, v] = pair.split(':');
    if (!k || v === undefined) return;
    if (k === 'fit' && (v === 'cover' || v === 'contain')) {
      frame.fit = v;
    } else if (k === 'x') {
      frame.x = clamp(v, 0, 100, DEFAULT_IMAGE_FRAME.x);
    } else if (k === 'y') {
      frame.y = clamp(v, 0, 100, DEFAULT_IMAGE_FRAME.y);
    } else if (k === 'zoom') {
      frame.zoom = clamp(v, 1, 2, DEFAULT_IMAGE_FRAME.zoom);
    }
  });

  return { cleanUrl, ...frame };
}

export function encodeImageFrame(url, partialFrame = {}) {
  const cleanUrl = stripImageFrame(url).trim();
  if (!cleanUrl) return '';

  const prev = parseImageFrame(url);
  const fit = partialFrame.fit === 'contain' ? 'contain' : partialFrame.fit === 'cover' ? 'cover' : prev.fit;
  const x = clamp(partialFrame.x ?? prev.x, 0, 100, DEFAULT_IMAGE_FRAME.x);
  const y = clamp(partialFrame.y ?? prev.y, 0, 100, DEFAULT_IMAGE_FRAME.y);
  const zoom = clamp(partialFrame.zoom ?? prev.zoom, 1, 2, DEFAULT_IMAGE_FRAME.zoom);

  if (
    fit === DEFAULT_IMAGE_FRAME.fit &&
    x === DEFAULT_IMAGE_FRAME.x &&
    y === DEFAULT_IMAGE_FRAME.y &&
    zoom === DEFAULT_IMAGE_FRAME.zoom
  ) {
    return cleanUrl;
  }

  return `${cleanUrl}${FRAME_PREFIX}fit:${fit};x:${x};y:${y};zoom:${zoom}`;
}

export function getImageFrameStyle(url) {
  const { fit, x, y, zoom } = parseImageFrame(url);
  const style = {
    objectFit: fit,
    objectPosition: `${x}% ${y}%`,
  };
  if (zoom > 1 && fit === 'cover') {
    style.transform = `scale(${zoom})`;
    style.transformOrigin = `${x}% ${y}%`;
  }
  return style;
}
