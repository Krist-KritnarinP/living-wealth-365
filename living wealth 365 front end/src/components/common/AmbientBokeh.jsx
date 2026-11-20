/**
 * AmbientBokeh — Layered optical bokeh discs (sharp + soft blur tiers)
 * so Apple Liquid Glass panels visibly refract luminous color shifts underneath.
 */
export default function AmbientBokeh() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
    >
      {/* Top-right luminous warm gold bokeh orb (tracks near header & hero right) */}
      <div
        className="bokeh-orb-a absolute -top-16 right-[6%] w-[260px] h-[260px] sm:w-[400px] sm:h-[400px] rounded-full blur-[34px] sm:blur-[52px]"
        style={{ background: 'var(--zen-bokeh-gold)' }}
      />
      {/* Crisp inner bokeh ring for glass refraction texture */}
      <div
        className="bokeh-orb-b absolute top-10 right-[18%] w-[140px] h-[140px] sm:w-[220px] sm:h-[220px] rounded-full blur-[22px] sm:blur-[32px]"
        style={{ background: 'var(--zen-bokeh-sky)' }}
      />
      {/* Top-left royal blue bokeh orb */}
      <div
        className="bokeh-orb-b absolute top-[4%] -left-16 w-[280px] h-[280px] sm:w-[440px] sm:h-[440px] rounded-full blur-[38px] sm:blur-[58px]"
        style={{ background: 'var(--zen-bokeh-blue)' }}
      />
      {/* Center luminous sky-cyan orb behind Hero Interactive Console */}
      <div
        className="bokeh-orb-a absolute top-[34%] left-[32%] w-[240px] h-[240px] sm:w-[380px] sm:h-[380px] rounded-full blur-[40px] sm:blur-[56px]"
        style={{ background: 'var(--zen-bokeh-sky)' }}
      />
      {/* Mid-right warm gold accent behind Gateway Bento cards */}
      <div
        className="bokeh-orb-b absolute top-[54%] right-[8%] w-[240px] h-[240px] sm:w-[360px] sm:h-[360px] rounded-full blur-[36px] sm:blur-[54px]"
        style={{ background: 'var(--zen-bokeh-gold)' }}
      />
      {/* Bottom-left calm emerald-teal bokeh */}
      <div
        className="bokeh-orb-a absolute bottom-[8%] left-[12%] w-[250px] h-[250px] sm:w-[380px] sm:h-[380px] rounded-full blur-[40px] sm:blur-[58px]"
        style={{ background: 'var(--zen-bokeh-emerald)' }}
      />
    </div>
  );
}
