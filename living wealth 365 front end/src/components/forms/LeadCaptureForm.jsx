import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, CheckCircle, ShieldCheck, Clock, User, Phone, Sparkles, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { ROUTES } from '../../constants/routes';
import { normalizePhone, validPhone } from '../../utils/validation';

export default function LeadCaptureForm({
  defaultInterest = 'ประกันสุขภาพเหมาจ่าย AIA',
  selection = null,
  title = 'ขอรับคำปรึกษาและวางแผนฟรี',
  subtitle = 'กรอกข้อมูลเพื่อให้ที่ปรึกษาการเงินติดต่อกลับและวิเคราะห์แผนเฉพาะบุคคล',
}) {
  const { currentUser, addLead } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [selectedItem, setSelectedItem] = useState(selection);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    interest: selection?.name || defaultInterest,
    preferredTime: 'ช่วงบ่าย (13:00 - 17:00)',
    notes: '',
  });

  const [phoneError, setPhoneError] = useState('');
  const [loading, setLoading] = useState(false);

  // Sync selection prop if passed
  useEffect(() => {
    if (selection) {
      setSelectedItem(selection);
      setFormData((prev) => ({
        ...prev,
        interest: selection.name || prev.interest,
      }));
    }
  }, [selection]);

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
    if (defaultInterest && !selectedItem) {
      setFormData((prev) => ({ ...prev, interest: defaultInterest }));
    }
  }, [defaultInterest, selectedItem]);

  const handlePhoneChange = (val) => {
    setFormData((prev) => ({ ...prev, phone: val }));
    if (phoneError) setPhoneError('');
  };

  const handleClearSelection = () => {
    setSelectedItem(null);
    setFormData((prev) => ({ ...prev, interest: defaultInterest }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. ตรวจสอบเบอร์โทรศัพท์ (9-10 หลัก)
    if (!validPhone(formData.phone)) {
      setPhoneError('กรุณากรอกเบอร์โทรศัพท์ไทย 9–10 หลัก เช่น 0812345678');
      showToast('กรุณากรอกเบอร์โทรศัพท์ติดต่อให้ถูกต้อง', 'warning');
      return;
    }

    setLoading(true);

    const cleanPhone = normalizePhone(formData.phone);
    const newLead = addLead({
      name: formData.name.trim(),
      phone: cleanPhone,
      interest: formData.interest,
      preferredTime: formData.preferredTime,
      notes: formData.notes.trim(),
      selection: selectedItem,
    });

    setTimeout(() => {
      setLoading(false);
      showToast('ส่งคำขอรับคำปรึกษาสำเร็จ!', 'success');
      navigate(
        `${ROUTES.THANK_YOU}?leadId=${encodeURIComponent(newLead.id)}&interest=${encodeURIComponent(
          formData.interest
        )}&name=${encodeURIComponent(formData.name)}&phone=${encodeURIComponent(cleanPhone)}`
      );
    }, 300);
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

        {/* Selected Product Summary Box (เมื่อเลือกหินมงคลหรือแผนเฉพาะ) */}
        {selectedItem && (
          <div className="p-4 rounded-2xl bg-secondary/15 border border-secondary/30 flex items-center justify-between gap-3 text-sm animate-fadeIn">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-secondary/20 text-secondary flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-xs text-base-content/60 font-medium block">
                  รายการสินค้า/แผนที่ท่านเลือกไว้:
                </span>
                <span className="font-bold text-primary text-base block truncate">
                  {selectedItem.name}
                </span>
                {selectedItem.price && (
                  <span className="text-xs font-bold text-secondary">
                    ราคา {Number(selectedItem.price).toLocaleString()} บาท
                  </span>
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={handleClearSelection}
              className="btn btn-ghost btn-xs text-base-content/60 hover:text-error gap-1 shrink-0"
              title="เปลี่ยนเป็นบริการทั่วไป"
            >
              <X className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">เปลี่ยน</span>
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-sm font-bold flex items-center gap-1.5 text-base-content">
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
                className="input input-bordered w-full rounded-xl bg-base-100 focus:input-primary text-base"
              />
            </div>

            {/* Phone */}
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-sm font-bold flex items-center gap-1.5 text-base-content">
                  <Phone className="w-4 h-4 text-primary" />
                  เบอร์โทรศัพท์ติดต่อ <span className="text-error">*</span>
                </span>
                <span className="label-text-alt text-[11px] text-base-content/60">
                  9-10 หลัก
                </span>
              </label>
              <input
                type="tel"
                required
                placeholder="เช่น 081-234-5678"
                value={formData.phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                className={`input input-bordered w-full rounded-xl bg-base-100 focus:input-primary text-base ${
                  phoneError ? 'input-error' : ''
                }`}
              />
              {phoneError && (
                <span className="text-[11px] text-error font-medium mt-1">
                  {phoneError}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Interest */}
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-sm font-bold text-base-content">
                  บริการที่สนใจปรึกษา
                </span>
              </label>
              <select
                value={formData.interest}
                onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                className="select select-bordered w-full rounded-xl bg-base-100 focus:select-primary text-base font-medium"
              >
                <option value="ประกันสุขภาพเหมาจ่าย AIA">ประกันสุขภาพเหมาจ่าย AIA</option>
                <option value="ประกันชีวิตคุ้มครองโรคร้ายแรง">ประกันชีวิตคุ้มครองโรคร้ายแรง</option>
                <option value="วางแผนเกษียณ & บำนาญตลอดชีพ">วางแผนเกษียณ & บำนาญตลอดชีพ</option>
                <option value="วางแผนภาษีบุคคลธรรมดา">วางแผนภาษีบุคคลธรรมดา</option>
                <option value="ประกันวินาศภัย (รถยนต์/อัคคีภัย)">ประกันวินาศภัย (รถยนต์/อัคคีภัย)</option>
                <option value="หินมงคล & ปรึกษาเสริมดวงชะตา">หินมงคล & ปรึกษาเสริมดวงชะตา</option>
                {selectedItem && (
                  <option value={selectedItem.name}>{selectedItem.name}</option>
                )}
              </select>
            </div>

            {/* Preferred Time */}
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-sm font-bold flex items-center gap-1.5 text-base-content">
                  <Clock className="w-4 h-4 text-primary" />
                  ช่วงเวลาที่สะดวกรับสาย
                </span>
              </label>
              <select
                value={formData.preferredTime}
                onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                className="select select-bordered w-full rounded-xl bg-base-100 focus:select-primary text-base font-medium"
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
              <span className="label-text text-sm font-bold text-base-content">
                รายละเอียดเพิ่มเติมหรือคำถามที่ต้องการสอบถาม (ถ้ามี)
              </span>
            </label>
            <textarea
              rows="2"
              placeholder="เช่น มีงบประมาณเบี้ยประกันปีละประมาณ 30,000 บาท หรือ สนใจข้อมือหินไหมทอง 16 cm"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="textarea textarea-bordered w-full rounded-xl bg-base-100 focus:textarea-primary text-base"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full text-base sm:text-lg font-bold rounded-xl shadow-md py-3 h-auto gap-2 min-h-[48px]"
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
