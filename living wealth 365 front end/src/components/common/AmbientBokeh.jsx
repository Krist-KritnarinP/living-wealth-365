/**
 * AmbientBokeh — Luminous soft-focus Apple Liquid Glass light orbs
 * in Serene Prosperity tones (#023E8D Deep Blue, #FFB53B Warm Gold).
 */
export default function AmbientBokeh() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
    >
      {/* Top-right luminous warm gold bokeh */}
      <div
        className="bokeh-orb-a absolute -top-28 -right-24 w-[380px] h-[380px] sm:w-[560px] sm:h-[560px] rounded-full blur-[95px] sm:blur-[125px]"
        style={{ background: 'var(--zen-bokeh-gold)' }}
      />
      {/* Mid-left serene deep blue bokeh */}
      <div
        className="bokeh-orb-b absolute top-[18%] -left-32 w-[380px] h-[380px] sm:w-[580px] sm:h-[580px] rounded-full blur-[100px] sm:blur-[135px]"
        style={{ background: 'var(--zen-bokeh-blue)' }}
      />
      {/* Center-right subtle focal glow behind Hero interactive widget */}
      <div
        className="bokeh-orb-a absolute top-[35%] right-[10%] w-[260px] h-[260px] sm:w-[380px] sm:h-[380px] rounded-full blur-[90px] sm:blur-[115px]"
        style={{ background: 'var(--zen-bokeh-gold)' }}
      />
      {/* Bottom-left calm emerald-teal depth */}
      <div
        className="bokeh-orb-b absolute bottom-[5%] left-[15%] w-[280px] h-[280px] sm:w-[440px] sm:h-[440px] rounded-full blur-[100px] sm:blur-[120px]"
        style={{ background: 'var(--zen-bokeh-emerald)' }}
      />
    </div>
  );
}
