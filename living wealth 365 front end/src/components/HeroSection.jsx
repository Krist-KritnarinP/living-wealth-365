import { Sparkles, ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="w-full card zen-surface p-6 sm:p-10 lg:p-14 rounded-3xl shadow-xs border border-base-300/50 relative overflow-hidden">
      <div className="w-full space-y-4 sm:space-y-6">
        {/* Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-base-200 border border-base-300 font-bold text-xs sm:text-sm text-primary">
          <Sparkles className="w-4 h-4 text-secondary shrink-0" />
          <span>มากกว่าการเงิน คือการวางแผนชีวิตที่ดีขึ้นในทุกวัน</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-primary leading-tight tracking-tight">
          ชีวิตที่มั่นคง เริ่มได้... <br />
          <span className="text-secondary underline decoration-secondary/30 decoration-wavy underline-offset-8">
            จากแผนที่ใช่ วันนี้
          </span>
        </h1>

        {/* Subtitle / Value Proposition */}
        <p className="zen-muted text-base sm:text-lg lg:text-xl leading-relaxed font-normal max-w-4xl">
          บริการที่ปรึกษาการเงินและประกันชีวิตครบวงจร ออกแบบเฉพาะบุคคลให้เข้าใจง่าย
          โปร่งใส เหมาะสำหรับผู้รับบริการทุกเพศ ทุกวัย เพื่อความอุ่นใจของคุณและครอบครัวตลอด 365 วัน
        </p>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
          <a
            href="#services"
            className="btn btn-primary btn-md sm:btn-lg px-6 sm:px-8 text-sm sm:text-base font-bold shadow-sm flex items-center gap-2"
          >
            <span>สำรวจแผนการเงิน</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="#contact"
            className="btn btn-outline border-base-300 btn-md sm:btn-lg px-5 sm:px-7 text-sm sm:text-base font-bold"
          >
            นัดหมายปรึกษาฟรี
          </a>

          <span className="badge badge-secondary text-xs sm:text-sm font-bold px-3.5 py-2">
            มั่นคง • มั่งคั่ง • ยั่งยืน
          </span>
        </div>
      </div>
    </section>
  );
}
