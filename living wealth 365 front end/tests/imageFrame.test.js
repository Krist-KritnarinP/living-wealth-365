import assert from 'node:assert/strict';
import test from 'node:test';
import {
  DEFAULT_IMAGE_FRAME,
  encodeImageFrame,
  getImageFrameStyle,
  parseImageFrame,
  stripImageFrame,
} from '../src/utils/imageFrame.js';

test('parseImageFrame returns defaults for plain URLs', () => {
  const url = 'https://pub-123.r2.dev/cover.jpg';
  const parsed = parseImageFrame(url);
  assert.deepEqual(parsed, { cleanUrl: url, ...DEFAULT_IMAGE_FRAME });
});

test('encodeImageFrame appends non-default framing hash cleanly and omits default framing', () => {
  const base = 'https://pub-123.r2.dev/poster.jpg';
  const encoded = encodeImageFrame(base, { fit: 'cover', x: 50, y: 15, zoom: 1.25 });
  assert.equal(encoded, `${base}#lwframe=fit:cover;x:50;y:15;zoom:1.25`);

  const parsed = parseImageFrame(encoded);
  assert.equal(parsed.cleanUrl, base);
  assert.equal(parsed.y, 15);
  assert.equal(parsed.zoom, 1.25);

  const reset = encodeImageFrame(encoded, DEFAULT_IMAGE_FRAME);
  assert.equal(reset, base);
  assert.equal(stripImageFrame(encoded), base);
});

test('getImageFrameStyle applies objectFit, objectPosition, and transformOrigin for zoom', () => {
  const url = 'https://example.com/a.jpg#lwframe=fit:cover;x:30;y:20;zoom:1.4';
  assert.deepEqual(getImageFrameStyle(url), {
    objectFit: 'cover',
    objectPosition: '30% 20%',
    transform: 'scale(1.4)',
    transformOrigin: '30% 20%',
  });

  const containUrl = 'https://example.com/a.jpg#lwframe=fit:contain;x:50;y:50;zoom:1';
  assert.deepEqual(getImageFrameStyle(containUrl), {
    objectFit: 'contain',
    objectPosition: '50% 50%',
  });
});
