/**
 * AmbientBokeh — GPU-friendly layered radial-gradient optical bokeh canvas
 * with zero heavy Gaussian blur filters or continuous frame-invalidating animations
 * so Apple Liquid Glass panels stay crisp at 60fps.
 */
export default function AmbientBokeh() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      style={{
        backgroundImage: [
          'radial-gradient(460px 460px at 88% 8%, var(--zen-bokeh-gold) 0%, transparent 72%)',
          'radial-gradient(280px 280px at 78% 14%, var(--zen-bokeh-sky) 0%, transparent 72%)',
          'radial-gradient(500px 500px at 8% 12%, var(--zen-bokeh-blue) 0%, transparent 72%)',
          'radial-gradient(420px 420px at 42% 44%, var(--zen-bokeh-sky) 0%, transparent 72%)',
          'radial-gradient(420px 420px at 86% 62%, var(--zen-bokeh-gold) 0%, transparent 72%)',
          'radial-gradient(440px 440px at 18% 86%, var(--zen-bokeh-emerald) 0%, transparent 72%)',
        ].join(', '),
      }}
    />
  );
}
