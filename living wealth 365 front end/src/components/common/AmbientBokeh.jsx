/**
 * AmbientBokeh — Soft atmospheric light orbs in Serene Prosperity tones.
 * Uses CSS tokens only and GPU-composited transforms (no layout impact).
 */
export default function AmbientBokeh() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
    >
      {/* Top-right warm gold bokeh */}
      <div
        className="bokeh-orb-a absolute -top-24 -right-24 w-[320px] h-[320px] sm:w-[460px] sm:h-[460px] rounded-full blur-[90px] sm:blur-[120px]"
        style={{ background: 'var(--zen-bokeh-gold)' }}
      />
      {/* Mid-left serene deep blue bokeh */}
      <div
        className="bokeh-orb-b absolute top-[22%] -left-28 w-[340px] h-[340px] sm:w-[520px] sm:h-[520px] rounded-full blur-[100px] sm:blur-[130px]"
        style={{ background: 'var(--zen-bokeh-blue)' }}
      />
      {/* Bottom-right subtle emerald-gold harmony */}
      <div
        className="bokeh-orb-a absolute bottom-[8%] right-[12%] w-[260px] h-[260px] sm:w-[400px] sm:h-[400px] rounded-full blur-[100px] sm:blur-[120px]"
        style={{ background: 'var(--zen-bokeh-emerald)' }}
      />
    </div>
  );
}
