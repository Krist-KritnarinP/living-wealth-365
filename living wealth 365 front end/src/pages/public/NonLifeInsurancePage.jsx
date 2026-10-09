import { Car, Home, Shield, CheckCircle2, PhoneCall, Building2 } from 'lucide-react';
import LeadCaptureForm from '../../components/forms/LeadCaptureForm';

export default function NonLifeInsurancePage() {
  const categories = [
    {
      icon: Car,
      title: 'ประกันภัยรถยนต์ (Car Insurance)',
      subtitle: 'คุ้มครองทุกการขับขี่ อุ่นใจทุกเส้นทาง 24 ชั่วโมง',
      badge: 'ชั้น 1 / 2+ / 3+',
      points: [
        'ประกันชั้น 1 ซ่อมห้าง / ซ่อมอู่ เคลมเร็ว บริการช่วยเหลือฉุกเฉิน 24 ชม.',
        'ประกันชั้น 2+ คุ้มครองรถชนรถ ไฟไหม้ และรถยนต์สูญหาย ราคาประหยัด',
        'บริการเคลมผ่านแอปพลิเคชัน ไม่ต้องรอพนักงานสำรวจภัยนาน',
        'ผ่อนชำระ 0% นานสูงสุด 10 เดือน ผ่านบัตรเครดิตชั้นนำ',
      ],
    },
    {
      icon: Home,
      title: 'ประกันอัคคีภัยบ้าน & คอนโด',
      subtitle: 'ปกป้องทรัพย์สินที่สร้างมาทั้งชีวิตจากภัยพิบัติ',
      badge: 'คุ้มครองสิ่งปลูกสร้าง & เฟอร์นิเจอร์',
      points: [
        'คุ้มครองไฟไหม้ ฟ้าผ่า ระเบิด และภัยจากยวดยานพาหนะ',
        'ขยายความคุ้มครองภัยธรรมชาติ (น้ำท่วม, ลมพายุ, แผ่นดินไหว)',
        'คุ้มครองทรัพย์สินภายในบ้าน เฟอร์นิเจอร์ และเครื่องใช้ไฟฟ้า',
        'เบี้ยประกันเริ่มต้นเพียงหลักร้อยต่อปี แต่คุ้มครองหลักล้าน',
      ],
    },
    {
      icon: Building2,
      title: 'ประกันภัยธุรกิจ & องค์กร',
      subtitle: 'บริหารความเสี่ยงสำหรับผู้ประกอบการและ SME',
      badge: 'ความรับผิด & ทรัพย์สินธุรกิจ',
      points: [
        'ประกันความรับผิดต่อบุคคลภายนอก (Public Liability)',
        'ประกันอุบัติเหตุกลุ่มสำหรับพนักงาน (Group PA)',
        'ประกันการขนส่งสินค้าทางบกและทางน้ำ',
        'ออกแบบแพ็กเกจเฉพาะธุรกิจโดยผู้เชี่ยวชาญด้านสินไหมทดแทน',
      ],
    },
  ];

  return (
    <div className="w-full space-y-16 lg:space-y-24 py-8">
      {/* Header Banner */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="w-full rounded-3xl zen-surface border border-base-300/60 p-8 sm:p-12 lg:p-16 text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/15 text-secondary text-xs sm:text-sm font-bold">
            <Shield className="w-4 h-4" />
            <span>NON-LIFE INSURANCE SERVICES</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-primary leading-tight">
            ประกันวินาศภัย รถยนต์ & ทรัพย์สิน
          </h1>
          <p className="text-base sm:text-lg text-base-content/80 max-w-2xl mx-auto leading-relaxed">
            ปกป้องทรัพย์สินและยานพาหนะอันมีค่าของคุณ ด้วยข้อเสนอจากบริษัทประกันวินาศภัยชั้นนำของประเทศ
            พร้อมการดูแลประสานงานเคลมอย่างมืออาชีพ
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                className="zen-surface rounded-3xl p-6 sm:p-8 border border-base-300/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-secondary/15 text-secondary flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="badge badge-outline text-xs font-bold">
                      {cat.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-primary">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-base-content/70 mt-1">
                      {cat.subtitle}
                    </p>
                  </div>

                  <ul className="space-y-2.5 pt-2 border-t border-base-300/40">
                    {cat.points.map((pt, pIdx) => (
                      <li key={pIdx} className="text-xs sm:text-sm flex items-start gap-2 text-base-content/80">
                        <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t border-base-300/40">
                  <a
                    href="#consult-form"
                    className="btn btn-outline btn-secondary btn-sm sm:btn-md w-full rounded-xl font-bold gap-2"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>เช็กเบี้ยประกันภัย</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Lead Capture */}
      <section id="consult-form" className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 scroll-mt-24">
        <LeadCaptureForm
          defaultInterest="ประกันวินาศภัย (รถยนต์/อัคคีภัย)"
          title="เปรียบเทียบเบี้ยประกันวินาศภัยฟรี"
          subtitle="ส่งข้อมูลยี่ห้อรถ หรือขนาดที่พักอาศัย เพื่อรับข้อเสนอและส่วนลดพิเศษที่ดีที่สุด"
        />
      </section>
    </div>
  );
}
