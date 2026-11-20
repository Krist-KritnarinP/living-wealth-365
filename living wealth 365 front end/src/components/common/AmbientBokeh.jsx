/**
 * AmbientBokeh — Visible, luminous soft-focus bokeh circles
 * creating real refraction depth behind Apple Liquid Glass surfaces.
 */
export default function AmbientBokeh() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
    >
      {/* Top-right luminous warm gold bokeh orb */}
      <div
        className="bokeh-orb-a absolute -top-20 right-[4%] w-[300px] h-[300px] sm:w-[460px] sm:h-[460px] rounded-full blur-[60px] sm:blur-[80px]"
        style={{ background: 'var(--zen-bokeh-gold)' }}
      />
      {/* Top-left royal blue bokeh orb */}
      <div
        className="bokeh-orb-b absolute top-[6%] -left-24 w-[320px] h-[320px] sm:w-[480px] sm:h-[480px] rounded-full blur-[65px] sm:blur-[90px]"
        style={{ background: 'var(--zen-bokeh-blue)' }}
      />
      {/* Center sky-cyan bokeh accent */}
      <div
        className="bokeh-orb-a absolute top-[28%] left-[38%] w-[220px] h-[220px] sm:w-[360px] sm:h-[360px] rounded-full blur-[55px] sm:blur-[75px]"
        style={{ background: 'var(--zen-bokeh-sky)' }}
      />
      {/* Mid-right warm gold highlight */}
      <div
        className="bokeh-orb-b absolute top-[52%] right-[8%] w-[240px] h-[240px] sm:w-[340px] sm:h-[340px] rounded-full blur-[55px] sm:blur-[80px]"
        style={{ background: 'var(--zen-bokeh-gold)' }}
      />
      {/* Bottom-left calm emerald-teal bokeh */}
      <div
        className="bokeh-orb-a absolute bottom-[6%] left-[12%] w-[260px] h-[260px] sm:w-[400px] sm:h-[400px] rounded-full blur-[60px] sm:blur-[85px]"
        style={{ background: 'var(--zen-bokeh-emerald)' }}
      />
    </div>
  );
}
