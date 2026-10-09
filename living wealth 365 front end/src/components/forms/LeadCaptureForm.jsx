import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, CheckCircle, ShieldCheck, Clock, User, Phone } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../constants/routes';

export default function LeadCaptureForm({
  defaultInterest = 'ประกันสุขภาพเหมาจ่าย AIA',
  title = 'ขอรับคำปรึกษาและวางแผนฟรี',
  subtitle = 'กรอกข้อมูลเพื่อให้ที่ปรึกษาการเงินติดต่อกลับและวิเคราะห์แผนเฉพาะบุคคล',
}) {
  const { currentUser, addLead } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    interest: defaultInterest,
    preferredTime: 'ช่วงบ่าย (13:00 - 17:00)',
    notes: '',
  });

  const [loading, setLoading] = useState(false);

  // Auto-fill if user is logged in
  useEffect(() => {
    if (currentUser) {
      setFormData((prev) => ({
        ...prev,
        name: currentUser.name || prev.name,
        phone: currentUser.phone || prev.phone,
      }));
    }
  }, [currentUser]);

  useEffect(() => {
    if (defaultInterest) {
      setFormData((prev) => ({ ...prev, interest: defaultInterest }));
    }
  }, [defaultInterest]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const newLead = addLead({
      name: formData.name,
      phone: formData.phone,
      interest: formData.interest,
      preferredTime: formData.preferredTime,
      notes: formData.notes,
    });

    setTimeout(() => {
      setLoading(false);
      navigate(`${ROUTES.THANK_YOU}?leadId=${newLead.id}&interest=${encodeURIComponent(formData.interest)}`);
    }, 400);
  };

  return (
    <div className="w-full zen-surface rounded-3xl p-6 sm:p-8 lg:p-10 border border-primary/20 shadow-xl relative overflow-hidden">
      {/* Decorative gradient corner */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-2xl pointer-events-none"></div>

      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          {currentUser && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-1">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>ล็อกอินในชื่อ: {currentUser.name} (ระบบกรอกข้อมูลให้อัตโนมัติ)</span>
            </div>
          )}
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-primary">
            {title}
          </h3>
          <p className="text-sm sm:text-base text-base-content/70">
            {subtitle}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-sm font-bold flex items-center gap-1.5">
                  <User className="w-4 h-4 text-primary" />
                  ชื่อ-นามสกุล <span className="text-error">*</span>
                </span>
              </label>
              <input
                type="text"
                required
                placeholder="เช่น สมชาย ใจดี"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input input-bordered w-full rounded-xl bg-base-100/70 focus:input-primary text-base"
              />
            </div>

            {/* Phone */}
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-sm font-bold flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-primary" />
                  เบอร์โทรศัพท์ติดต่อ <span className="text-error">*</span>
                </span>
              </label>
              <input
                type="tel"
                required
                placeholder="เช่น 081-234-5678"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="input input-bordered w-full rounded-xl bg-base-100/70 focus:input-primary text-base"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Interest */}
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-sm font-bold">
                  บริการที่สนใจปรึกษา
                </span>
              </label>
              <select
                value={formData.interest}
                onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                className="select select-bordered w-full rounded-xl bg-base-100/70 focus:select-primary text-base font-medium"
              >
                <option value="ประกันสุขภาพเหมาจ่าย AIA">ประกันสุขภาพเหมาจ่าย AIA</option>
                <option value="ประกันชีวิตคุ้มครองโรคร้ายแรง">ประกันชีวิตคุ้มครองโรคร้ายแรง</option>
                <option value="วางแผนเกษียณ & บำนาญตลอดชีพ">วางแผนเกษียณ & บำนาญตลอดชีพ</option>
                <option value="วางแผนภาษีบุคคลธรรมดา">วางแผนภาษีบุคคลธรรมดา</option>
                <option value="ประกันวินาศภัย (รถยนต์/อัคคีภัย)">ประกันวินาศภัย (รถยนต์/อัคคีภัย)</option>
                <option value="หินมงคล & ปรึกษาเสริมดวงชะตา">หินมงคล & ปรึกษาเสริมดวงชะตา</option>
              </select>
            </div>

            {/* Preferred Time */}
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-sm font-bold flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-primary" />
                  ช่วงเวลาที่สะดวกรับสาย
                </span>
              </label>
              <select
                value={formData.preferredTime}
                onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                className="select select-bordered w-full rounded-xl bg-base-100/70 focus:select-primary text-base font-medium"
              >
                <option value="ช่วงเช้า (09:00 - 12:00)">ช่วงเช้า (09:00 - 12:00)</option>
                <option value="ช่วงบ่าย (13:00 - 17:00)">ช่วงบ่าย (13:00 - 17:00)</option>
                <option value="ช่วงเย็น (17:00 - 20:00)">ช่วงเย็น (17:00 - 20:00)</option>
                <option value="สะดวกทุกเวลา">สะดวกทุกเวลา</option>
              </select>
            </div>
          </div>

          {/* Notes */}
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text text-sm font-bold">
                รายละเอียดเพิ่มเติมหรือคำถามที่ต้องการสอบถาม (ถ้ามี)
              </span>
            </label>
            <textarea
              rows="2"
              placeholder="เช่น มีงบประมาณเบี้ยประกันปีละประมาณ 30,000 บาท หรือ สนใจข้อมือหินไหมทอง 16 cm"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="textarea textarea-bordered w-full rounded-xl bg-base-100/70 focus:textarea-primary text-base"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full text-base sm:text-lg font-bold rounded-xl shadow-md py-3 h-auto gap-2"
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>ส่งข้อมูลเพื่อรับคำปรึกษาฟรี</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-base-content/60 pt-1">
            <ShieldCheck className="w-4 h-4 text-secondary" />
            <span>ข้อมูลของท่านถูกเก็บรักษาเป็นความลับอย่างเคร่งครัดตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล (PDPA)</span>
          </div>
        </form>
      </div>
    </div>
  );
}
