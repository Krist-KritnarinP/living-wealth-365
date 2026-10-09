import { ShieldCheck, CheckCircle2, Award, PhoneCall } from 'lucide-react';
import LeadCaptureForm from '../../components/forms/LeadCaptureForm';

export default function LifeInsurancePage() {
  const plans = [
    {
      title: 'AIA Health Happy (เหมา เบิ้ล คุ้ม)',
      subtitle: 'ประกันสุขภาพเหมาจ่ายยอดนิยม',
      limit: 'เหมาจ่ายสูงสุด 1 - 25 ล้านบาท/ปี',
      badge: 'ยอดนิยมสูงสุด',
      features: [
        'เหมาจ่ายค่ารักษาพยาบาล ค่าห้อง ค่าผ่าตัด ตามจริง',
        'เบิ้ลวงเงินความคุ้มครองเป็น 2 เท่า ทันทีที่ตรวจพบ 3 โรคร้ายแรง',
        'ไม่มีเคลม รับส่วนลดเบี้ยประกันสุขภาพ',
        'ครอบคลุมทั้งผู้ป่วยใน (IPD) และการผ่าตัดแบบ Day Surgery',
      ],
      recommendedFor: 'คนวัยทำงาน, เจ้าของธุรกิจ และผู้ที่ต้องการความอุ่นใจเรื่องค่ารักษา',
    },
    {
      title: 'AIA Multi-Pay CI (โรคร้าย เจอ จ่าย หลายจบ)',
      subtitle: 'คุ้มครองโรคร้ายแรงทุกระยะ',
      limit: 'คุ้มครองสูงสุดถึง 800% ของทุนประกัน',
      badge: 'คุ้มครองโรคร้าย',
      features: [
        'เคลมได้ซ้ำหลายครั้ง รวมสูงสุดถึง 11 ครั้ง เมื่อเป็นโรคร้ายแรงต่างกลุ่ม',
        'ครอบคลุมทั้งระยะเริ่มต้น ระยะปานกลาง และระยะรุนแรง',
        'หยุดจ่ายเบี้ยทันทีเมื่อเคลมระยะรุนแรงครั้งแรก แต่คุ้มครองต่อจนครบสัญญา',
        'รับเงินก้อนเพื่อใช้ฟื้นฟูร่างกายและชดเชยรายได้',
      ],
      recommendedFor: 'หัวหน้าครอบครัว, ผู้ที่มีประวัติครอบครัวเป็นมะเร็งหรือโรคหัวใจ',
    },
    {
      title: 'AIA Annum Annuity (บำนาญเกษียณสำราญ)',
      subtitle: 'สร้างกระแสเงินสดรายปีตลอดชีพ',
      limit: 'การันตีเงินบำนาญจนถึงอายุ 85 - 90 ปี',
      badge: 'ลดหย่อนภาษี 2 แสน',
      features: [
        'รับเงินบำนาญแน่นอนทุกปี ไม่ผันผวนตามตลาดหุ้น',
        'ใช้สิทธิลดหย่อนภาษีได้สูงสุดถึง 200,000 บาท/ปี',
        'เริ่มต้นรับเงินบำนาญตั้งแต่อายุ 60 ปี จนถึงอายุ 85-90 ปี',
        'ส่งต่อเป็นมรดกให้ทายาทได้หากเสียชีวิตก่อนครบกำหนด',
      ],
      recommendedFor: 'ผู้ที่เตรียมตัวเกษียณอายุ และผู้ต้องการลดหย่อนภาษีฐานสูง',
    },
  ];

  return (
    <div className="w-full space-y-16 lg:space-y-24 py-8">
      {/* Header Banner */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="w-full rounded-3xl zen-surface border border-base-300/60 p-8 sm:p-12 lg:p-16 text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-bold">
            <ShieldCheck className="w-4 h-4 text-secondary" />
            <span>AIA LIFE & HEALTH ADVISORY</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-primary leading-tight">
            ประกันชีวิต สุขภาพเหมาจ่าย & เกษียณสำราญ
          </h1>
          <p className="text-base sm:text-lg text-base-content/80 max-w-2xl mx-auto leading-relaxed">
            เปลี่ยนความไม่แน่นอนให้เป็นความมั่นคง ด้วยแผนประกันมาตรฐานระดับสากลจาก AIA
            ดูแลค่ารักษาพยาบาล เพื่อให้เงินเก็บของคุณยังคงเติบโตอย่างปลอดภัย
          </p>
        </div>
      </section>

      {/* Plans Comparison */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-secondary">
            Recommended Protection Plans
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-primary">
            3 แผนความคุ้มครองยอดนิยม คัดสรรเพื่อคุณ
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className="zen-surface rounded-3xl p-6 sm:p-8 border border-base-300/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="badge badge-secondary text-white text-xs font-bold">
                    {plan.badge}
                  </span>
                  <Award className="w-5 h-5 text-secondary" />
                </div>

                <div>
                  <h3 className="text-xl font-black text-primary leading-snug">
                    {plan.title}
                  </h3>
                  <p className="text-xs text-secondary font-bold mt-1">
                    {plan.subtitle}
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-primary/5 border border-primary/10 text-primary font-bold text-sm">
                  {plan.limit}
                </div>

                <ul className="space-y-2.5 pt-2">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className="text-xs sm:text-sm flex items-start gap-2 text-base-content/80">
                      <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-base-300/50 mt-6 space-y-3">
                <div className="text-[11px] text-base-content/60">
                  <span className="font-bold text-base-content/80">เหมาะสำหรับ:</span> {plan.recommendedFor}
                </div>
                <a
                  href="#consult-form"
                  className="btn btn-primary btn-sm sm:btn-md w-full rounded-xl font-bold gap-2"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>ขอใบเสนอราคาแผนนี้</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lead Form */}
      <section id="consult-form" className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 scroll-mt-24">
        <LeadCaptureForm
          defaultInterest="ประกันสุขภาพเหมาจ่าย AIA"
          title="ปรึกษาแผนประกันชีวิตและสุขภาพ AIA ฟรี"
          subtitle="รับคำนวณเบี้ยประกันและวิเคราะห์ความคุ้มครองที่ตรงกับงบประมาณและเป้าหมายของคุณ"
        />
      </section>
    </div>
  );
}
