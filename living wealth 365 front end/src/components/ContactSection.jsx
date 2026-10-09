import { Phone, Mail, Users, CheckCircle2 } from 'lucide-react';

export default function ContactSection() {
  return (
    <section id="contact" className="w-full">
      <div className="w-full card zen-surface p-6 sm:p-10 lg:p-14 rounded-3xl border border-base-300/60 shadow-sm">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 items-center">
          {/* Contact Details */}
          <div className="space-y-4">
            <span className="badge badge-secondary font-bold text-xs sm:text-sm px-3 py-1">
              READY TO ASSIST YOU
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary leading-tight">
              พร้อมเริ่มต้นวางแผนการเงินกับเราแล้วหรือยัง?
            </h2>
            <p className="zen-muted leading-relaxed text-sm sm:text-base">
              เรายินดีให้คำปรึกษาเบื้องต้นโดยไม่มีข้อผูกมัด เพื่อให้คุณและครอบครัวมั่นใจในทุกก้าวสำคัญของชีวิต
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-base-200/80 flex-1">
                <Phone className="w-6 h-6 text-primary shrink-0" />
                <div>
                  <div className="text-xs zen-muted font-bold">ติดต่อด่วนทางโทรศัพท์</div>
                  <div className="text-base sm:text-lg font-bold text-primary">02-xxx-xxxx</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-base-200/80 flex-1">
                <Mail className="w-6 h-6 text-primary shrink-0" />
                <div>
                  <div className="text-xs zen-muted font-bold">อีเมลติดต่อ</div>
                  <div className="text-sm sm:text-base font-bold text-primary break-all">
                    contact@livingwealth365.com
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Consultation Promise Checklist */}
          <div className="card bg-base-200 p-6 sm:p-8 rounded-2xl space-y-4 border border-base-300/50">
            <h3 className="font-bold text-base sm:text-lg text-primary flex items-center gap-2">
              <Users className="w-5 h-5 text-secondary" />
              <span>คำมั่นสัญญาจากทีมงาน</span>
            </h3>
            <div className="space-y-2.5 text-xs sm:text-sm zen-muted font-medium">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                <span>ข้อมูลทุกอย่างของท่านจะถูกเก็บรักษาเป็นความลับสูงสุด</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                <span>แนะนำเฉพาะแผนที่เหมาะสมกับงบประมาณและเป้าหมายจริงเท่านั้น</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                <span>อธิบายเงื่อนไขความคุ้มครองอย่างชัดเจน ตรงไปตรงมา ภาษาเข้าใจง่าย</span>
              </div>
            </div>
            <div className="pt-2">
              <button className="btn btn-primary w-full btn-md sm:btn-lg text-sm sm:text-base font-bold shadow-xs">
                นัดหมายพูดคุยกับที่ปรึกษา
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
