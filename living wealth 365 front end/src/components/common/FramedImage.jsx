import { resolveAssetUrl } from '../../api';
import { getImageFrameStyle, stripImageFrame } from '../../utils/imageFrame';

const DEFAULT_FALLBACK =
  'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80';

/**
 * FramedImage — Renders a cover image honoring admin-saved focal point, fit mode, and zoom.
 */
export default function FramedImage({
  src,
  alt = '',
  className = 'w-full h-full',
  fallback = DEFAULT_FALLBACK,
  style = {},
}) {
  const cleanSrc = stripImageFrame(src);
  const frameStyle = getImageFrameStyle(src);

  return (
    <img
      src={resolveAssetUrl(cleanSrc, fallback)}
      alt={alt}
      className={className}
      style={{ ...frameStyle, ...style }}
      onError={(e) => {
        if (e.currentTarget.src !== fallback) {
          e.currentTarget.src = fallback;
        }
      }}
    />
  );
}
