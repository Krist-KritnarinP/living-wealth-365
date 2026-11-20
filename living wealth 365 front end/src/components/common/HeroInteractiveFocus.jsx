import { useState } from 'react';
import { Shield, TrendingUp, Compass, Gem, ArrowRight, UserCheck, Sparkles, Check } from 'lucide-react';

export default function HeroInteractiveFocus({ onSelectFocus }) {
  const [activeCategory, setActiveCategory] = useState('INSURANCE');
  const [activeAge, setActiveAge] = useState('31_45');

  const categories = [
    { id: 'INSURANCE', label: 'ประกันสุขภาพ & ชีวิต', icon: Shield, advisor: 'คุณท็อป' },
    { id: 'WEALTH', label: 'ลดหย่อนภาษี & เกษียณ', icon: TrendingUp, advisor: 'คุณท็อป' },
    { id: 'LIFEMAP', label: 'สมดุลชีวิต 6 มิติ', icon: Compass, advisor: 'คุณท็อป & คุณจอย' },
    { id: 'ENERGY', label: 'คริสตัล & พลังธรรมชาติ', icon: Gem, advisor: 'คุณจอย' },
  ];

  const ageStages = [
    { id: '20_30', label: '20–30 ปี', sub: 'วัยเริ่มต้นสร้างตัว' },
    { id: '31_45', label: '31–45 ปี', sub: 'ความมั่นคงครอบครัว' },
    { id: '46_PLUS', label: '46+ ปี', sub: 'เกษียณ & ส่งต่อมรดก' },
  ];

  const recommendations = {
    'INSURANCE_20_30': {
      title: 'ประกันสุขภาพเหมาจ่ายเบี้ยเริ่มต้น + อุบัติเหตุ',
      strategy: 'ปกป้องเงินเก็บก้อนแรกไม่ให้รั่วไหลจากค่ารักษาพยาบาล รพ.เอกชน ด้วยเบี้ยเริ่มต้นที่เข้าถึงง่าย',
      advisor: 'คุณท็อป',
      role: 'Life & Wealth Planner',
      quote: '“เริ่มทำประกันสุขภาพตั้งแต่วันที่สุขภาพแข็งแรง จะได้เบี้ยที่คุ้มค่าที่สุดและไม่มีข้อยกเว้นโรค”',
      tag: 'แผนแนะนำ: AIA Health Happy เหมาจ่าย 1–5 ล้าน',
    },
    'INSURANCE_31_45': {
      title: 'ประกันเหมาจ่ายวงเงินสูง 15–25 ล้าน + โรคร้ายแรง Multi-Pay',
      strategy: 'สร้างเกราะป้องกันค่ารักษาพยาบาลขั้นสูงและโรคร้ายแรง ครอบคลุมภาระเสาหลักของครอบครัว',
      advisor: 'คุณท็อป',
      role: 'Life & Wealth Planner',
      quote: '“การมีวงเงินเหมาจ่ายหลักสิบล้าน ช่วยให้เราเลือกการรักษาและแพทย์ที่ดีที่สุดได้โดยไม่กระทบสินทรัพย์ครอบครัว”',
      tag: 'แผนแนะนำ: AIA Health Happy / Infinite Care 25 ล้าน',
    },
    'INSURANCE_46_PLUS': {
      title: 'ความคุ้มครองสุขภาพระยะยาว + ส่งต่อมรดกเงินสดปลอดภาษี',
      strategy: 'เน้นคุ้มครองสุขภาพยาวนานถึงวัยเกษียณ พร้อมทุนชีวิตเพื่อส่งต่อมรดกให้ทายาทโดยตรงแบบไร้ข้อพิพาท',
      advisor: 'คุณท็อป',
      role: 'Life & Wealth Planner',
      quote: '“วางแผนสุขภาพล่วงหน้าในวัยนี้ คือของขวัญที่ประเสริฐที่สุดที่ไม่ทิ้งภาระให้ลูกหลาน”',
      tag: 'แผนแนะนำ: ประกันตลอดชีพ + สัญญาคุ้มครองสุขภาพต่อเนื่อง',
    },

    'WEALTH_20_30': {
      title: 'บริหารภาษีเริ่มต้น + ลงทุนอัตโนมัติ DCA',
      strategy: 'ใช้สิทธิลดหย่อนประกันชีวิต 100,000 แรก ควบคู่กองทุนประหยัดภาษีสร้างวินัยการเงิน',
      advisor: 'คุณท็อป',
      role: 'Life & Wealth Planner',
      quote: '“ทุกบาทที่ประหยัดภาษีได้ คือผลตอบแทนที่การันตี 100% ตั้งแต่วันแรกที่วางแผน”',
      tag: 'เครื่องมือ: Tax Planner & DCA Roadmap',
    },
    'WEALTH_31_45': {
      title: 'กลยุทธ์ลดหย่อนภาษีขั้นสูง + พอร์ตเกษียณบำนาญ',
      strategy: 'ใช้สิทธิลดหย่อนเต็มเพดาน (ประกันบำนาญ + กองทุนรวม) เตรียมกระแสเงินสดหลังอายุ 60',
      advisor: 'คุณท็อป',
      role: 'Life & Wealth Planner',
      quote: '“เงินบำนาญการันตี คือฐานรากที่ทำให้เรากล้าใช้ชีวิตในวัยเกษียณได้อย่างมีศักดิ์ศรี”',
      tag: 'แผนแนะนำ: ประกันบำนาญลดหย่อนภาษี 200,000 บ.',
    },
    'WEALTH_46_PLUS': {
      title: 'การจัดสรรพอร์ตลดความเสี่ยง & วางแผนส่งมอบมรดก',
      strategy: 'เปลี่ยนสินทรัพย์เสี่ยงสู่สินทรัพย์การันตีเงินต้น และออกแบบการส่งต่อเงินสดตามเจตนารมณ์',
      advisor: 'คุณท็อป',
      role: 'Life & Wealth Planner',
      quote: '“ส่งมอบมรดกอย่างฉลาด คือส่งมอบทั้งความมั่งคั่งและความสงบสุขในครอบครัว”',
      tag: 'เครื่องมือ: Legacy & Wealth Transfer Architecture',
    },

    'LIFEMAP_20_30': {
      title: 'Life Map: ค้นหาคุณค่าและทิศทางชีวิตที่แท้จริง',
      strategy: 'ประเมินสมดุล 6 มิติ (งาน, เงิน, สุขภาพ, ความสัมพันธ์, จิตใจ, จิตวิญญาณ) ป้องกันภาวะ Burnout',
      advisor: 'คุณท็อป & คุณจอย',
      role: 'Life Architecture Curators',
      quote: '“เป้าหมายที่ชัดเจนตั้งแต่วัยสร้างตัว จะช่วยให้เราไม่หลงทางตามกระแสสังคม”',
      tag: 'เครื่องมือ: Life Map 6 Dimensions Self-Check',
    },
    'LIFEMAP_31_45': {
      title: 'Life Map: สร้างสมดุลครอบครัว งาน และการดูแลสุขภาพ',
      strategy: 'จัดสรรเวลาและพลังงาน (Energy Management) ให้สามารถเติบโตในหน้าที่การงานควบคู่กับสุขภาพที่ยืนยาว',
      advisor: 'คุณท็อป & คุณจอย',
      role: 'Life Architecture Curators',
      quote: '“ความสำเร็จที่แท้จริง คือการกลับบ้านมาแล้วยังมีพลังและรอยยิ้มให้กับคนที่เรารัก”',
      tag: 'เครื่องมือ: Holistic Wellbeing Sanctuary Blueprint',
    },
    'LIFEMAP_46_PLUS': {
      title: 'Life Map: การออกแบบชีวิตบทที่สอง (Life After 60)',
      strategy: 'เตรียมความพร้อมทั้งกาย ใจ และสังคม สู่การใช้ชีวิตหลังเกษียณอย่างมีความหมาย มีคุณค่า และสงบสุข',
      advisor: 'คุณท็อป & คุณจอย',
      role: 'Life Architecture Curators',
      quote: '“วัยเกษียณไม่ใช่จุดสิ้นสุดการทำงาน แต่คือจุดเริ่มต้นของการใช้ชีวิตตามใจปรารถนา”',
      tag: 'เครื่องมือ: Second Half of Life Roadmap',
    },

    'ENERGY_20_30': {
      title: 'คริสตัลเสริมโฟกัส สมาธิ และความมั่นคงทางอารมณ์',
      strategy: 'คัดสรรหินควอตซ์ธรรมชาติและลาพิส ลาซูลี เสริมจักระที่ 3 และ 6 ช่วยในการตัดสินใจและสร้างสรรค์งาน',
      advisor: 'คุณจอย',
      role: 'Natural Energy & Wellbeing Curator',
      quote: '“หินธรรมชาติคือคลื่นความถี่ที่บริสุทธิ์ ช่วยคืนความสงบนิ่งให้จิตใจในวันที่วุ่นวาย”',
      tag: 'ผลึกแนะนำ: ไหมดำ / ลาพิส ลาซูลี / ควอตซ์ใสธรรมชาติ',
    },
    'ENERGY_31_45': {
      title: 'หินไหมทองจักรพรรดิ เสริมภาวะผู้นำ & ปกป้องพลังงานลบ',
      strategy: 'ผลึกรูไทล์ธรรมชาติที่มีคุณสมบัติเพียโซอิเล็กทริก เสริมจักระมณีปุระ เพื่อความมั่นคงทางจิตใจและอำนาจการเจรจา',
      advisor: 'คุณจอย',
      role: 'Natural Energy & Wellbeing Curator',
      quote: '“พลังของหินไม่ใช่เรื่องไสยศาสตร์ แต่คือความสอดคล้องระหว่างแร่ธาตุธรรมชาติกับคลื่นความคิดในตัวเรา”',
      tag: 'ผลึกแนะนำ: หินไหมทองคัดเกรดธรรมชาติ / มาลาไคต์',
    },
    'ENERGY_46_PLUS': {
      title: 'ผลึกเพื่อการเจริญสติ การผ่อนคลาย และการนอนหลับลึก',
      strategy: 'หินอเมทิสต์แท้และหินโรสควอตซ์มาดากัสการ์ เชื่อมโยงจักระหัวใจและจักระตาที่สาม เสริมสมาธิภาวนา',
      advisor: 'คุณจอย',
      role: 'Natural Energy & Wellbeing Curator',
      quote: '“การจัดวางผลึกหินในห้องนอนช่วยปรับพลังงานรอบตัวให้สงบ หลับสบาย และตื่นมารับวันใหม่อย่างสดชื่น”',
      tag: 'ผลึกแนะนำ: อเมทิสต์เกรดพรีเมียม / หินแท้ประจำวันเกิด',
    },
  };

  const key = `${activeCategory}_${activeAge}`;
  const currentRec = recommendations[key] || recommendations['INSURANCE_31_45'];

  const handleConsult = () => {
    if (onSelectFocus) {
      onSelectFocus({
        category: categories.find((c) => c.id === activeCategory)?.label,
        stage: ageStages.find((a) => a.id === activeAge)?.label,
        topic: currentRec.title,
        advisor: currentRec.advisor,
      });
    }
    const el = document.getElementById('talk-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleGlassMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div
      onMouseMove={handleGlassMove}
      className="w-full zen-surface liquid-glass-interactive rounded-3xl p-5 sm:p-8 lg:p-10 space-y-6 min-w-0"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-base-300/50 pb-4">
        <div className="flex items-center gap-2.5 min-w-0">
          <Sparkles className="w-5 h-5 text-secondary shrink-0" />
          <span className="text-base sm:text-lg font-extrabold text-primary">
            สำรวจแนวทางที่เหมาะกับคุณทันที
          </span>
        </div>
        <span className="text-sm text-base-content/70 font-medium">
          ปรับเปลี่ยนได้อิสระตามเป้าหมายชีวิต
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        {/* Left: Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-5 min-w-0">
          {/* Step 1: Select Focus */}
          <div className="space-y-2.5">
            <label className="text-sm sm:text-base font-bold text-base-content/85 block">
              1. เลือกมิติที่คุณอยากดูแลเป็นอันดับแรก
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isSelected = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`p-3.5 rounded-2xl border text-left flex items-center gap-3 transition-[transform,background-color,border-color,box-shadow] duration-200 cursor-pointer group min-w-0 ${
                      isSelected
                        ? 'bg-primary text-white border-primary shadow-md scale-[1.01]'
                        : 'bg-base-100/60 text-base-content border-base-300/70 hover:bg-base-100 hover:border-secondary/60'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isSelected
                          ? 'bg-white/20 text-white scale-105'
                          : 'bg-primary/10 text-primary group-hover:scale-105'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm sm:text-base font-bold leading-snug break-words">
                        {cat.label}
                      </p>
                      <span
                        className={`text-xs sm:text-sm block leading-tight mt-0.5 ${
                          isSelected ? 'text-white/85' : 'text-base-content/65'
                        }`}
                      >
                        ดูแลโดย {cat.advisor}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Select Age Range */}
          <div className="space-y-2.5">
            <label className="text-sm sm:text-base font-bold text-base-content/85 block">
              2. ช่วงวัยในปัจจุบันของคุณ
            </label>
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
              {ageStages.map((age) => {
                const isSelected = activeAge === age.id;
                return (
                  <button
                    key={age.id}
                    type="button"
                    onClick={() => setActiveAge(age.id)}
                    className={`py-3 px-3 rounded-2xl border text-center transition-[transform,background-color,border-color,box-shadow] duration-200 cursor-pointer min-w-0 ${
                      isSelected
                        ? 'bg-secondary text-secondary-content border-secondary font-bold shadow-sm scale-[1.02]'
                        : 'bg-base-100/60 text-base-content/80 border-base-300/70 hover:bg-base-100'
                    }`}
                  >
                    <p className="text-sm sm:text-base font-bold leading-tight">{age.label}</p>
                    <p className="text-xs text-base-content/70 leading-tight mt-1 break-words">{age.sub}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Dynamic Live Recommendation Panel (Matte-solid inset per Apple HIG 0-nesting rule) */}
        <div
          key={key}
          className="lg:col-span-5 bg-base-100/92 rounded-2xl p-5 sm:p-6 border border-secondary/40 shadow-sm flex flex-col justify-between space-y-4 relative animate-pop-in min-w-0"
        >
          <div className="space-y-3.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="badge badge-secondary font-bold text-xs sm:text-sm px-3 py-1">
                {currentRec.tag}
              </span>
              <div className="flex items-center gap-1.5 text-sm text-base-content/80">
                <UserCheck className="w-4 h-4 text-primary shrink-0" />
                <span>ที่ปรึกษา: <strong className="text-primary">{currentRec.advisor}</strong></span>
              </div>
            </div>

            <div>
              <h4 className="text-lg sm:text-xl font-extrabold text-primary leading-snug">
                {currentRec.title}
              </h4>
              <p className="text-sm sm:text-base text-base-content/85 mt-2 leading-relaxed">
                {currentRec.strategy}
              </p>
            </div>

            <blockquote className="bg-base-200/70 rounded-xl p-3.5 text-sm italic text-base-content/80 border-l-3 border-secondary">
              {currentRec.quote}
            </blockquote>
          </div>

          <button
            type="button"
            onClick={handleConsult}
            className="btn btn-primary btn-md w-full rounded-full font-bold gap-2 shadow-sm hover:scale-[1.01] active:scale-[0.99] transition-transform group text-sm sm:text-base"
          >
            <span>ปรึกษาแนวทางนี้กับ {currentRec.advisor} ฟรี</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform shrink-0" />
          </button>
        </div>
      </div>
    </div>
  );
}
