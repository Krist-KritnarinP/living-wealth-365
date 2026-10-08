import { useState, useEffect } from 'react';
import {
  ShieldCheck,
  HeartPulse,
  Sun,
  Receipt,
  TrendingUp,
  Coins,
  CheckCircle2,
  AlertCircle,
  Phone,
  Mail,
  Calendar,
  Send,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { fetchHealth, fetchServices, submitConsultation } from './api';

const SERVICE_ICONS = {
  LIFE_INSURANCE: ShieldCheck,
  HEALTH_INSURANCE: HeartPulse,
  RETIREMENT_PLANNING: Sun,
  TAX_PLANNING: Receipt,
  INVESTMENT_ADVISORY: TrendingUp,
  WEALTH_TRANSFER: Coins,
};

export default function App() {
  const [backendStatus, setBackendStatus] = useState('checking');
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState('');

  const [formData, setFormData] = useState({
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    serviceCategory: 'LIFE_INSURANCE',
    monthlyBudget: '',
    notes: '',
  });

  useEffect(() => {
    // Check backend health
    fetchHealth()
      .then(() => setBackendStatus('connected'))
      .catch(() => setBackendStatus('disconnected'));

    // Fetch services list
    fetchServices()
      .then((res) => {
        if (res?.data) setServices(res.data);
      })
      .catch(() => {
        // Fallback default services if backend is not started yet
        setServices([
          {
            id: 'srv-life',
            category: 'LIFE_INSURANCE',
            title: 'ประกันชีวิตและการคุ้มครองครอบครัว',
            description: 'สร้างหลักประกันที่มั่นคง ส่งต่อความรักและความอุ่นใจให้คนที่คุณห่วงใย',
          },
          {
            id: 'srv-health',
            category: 'HEALTH_INSURANCE',
            title: 'ประกันสุขภาพและโรคร้ายแรง',
            description: 'ครอบคลุมค่ารักษาพยาบาลระดับพรีเมียม ไม่กระทบแผนการเงินระยะยาว',
          },
          {
            id: 'srv-retirement',
            category: 'RETIREMENT_PLANNING',
            title: 'วางแผนเกษียณสุขใจ (Retirement)',
            description: 'สร้างกระแสเงินสดบำนาญต่อเนื่อง มีอิสรภาพทางการเงินในทุกวันของชีวิต',
          },
          {
            id: 'srv-tax',
            category: 'TAX_PLANNING',
            title: 'วางแผนภาษีบุคคลธรรมดา',
            description: 'ใช้สิทธิประโยชน์ทางภาษีอย่างเต็มที่และถูกต้องตามกฎหมาย เพื่อเพิ่มเงินออมสุทธิ',
          },
          {
            id: 'srv-investment',
            category: 'INVESTMENT_ADVISORY',
            title: 'วางแผนการลงทุนและการเงิน',
            description: 'จัดพอร์ตการลงทุนตามเป้าหมายชีวิตและระดับความเสี่ยงที่ยอมรับได้',
          },
          {
            id: 'srv-transfer',
            category: 'WEALTH_TRANSFER',
            title: 'การส่งต่อมรดกและความมั่งคั่ง',
            description: 'วางแผนถ่ายทอดทรัพย์สินอย่างราบรื่น ปลอดภัย และไร้ข้อพิพาทในครอบครัว',
          },
        ]);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formError) setFormError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess(false);

    if (!formData.clientName || !formData.clientPhone || !formData.clientEmail) {
      setFormError('กรุณากรอกข้อมูลชื่อ, เบอร์โทรศัพท์ และอีเมลให้ครบถ้วน');
      return;
    }

    setLoading(true);
    try {
      await submitConsultation({
        ...formData,
        monthlyBudget: formData.monthlyBudget ? Number(formData.monthlyBudget) : undefined,
      });
      setFormSuccess(true);
      setFormData({
        clientName: '',
        clientPhone: '',
        clientEmail: '',
        serviceCategory: 'LIFE_INSURANCE',
        monthlyBudget: '',
        notes: '',
      });
    } catch (err) {
      setFormError(
        err?.response?.data?.message || 'ส่งข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง หรือตรวจสอบสถานะ Backend'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] text-gray-800 flex flex-col font-sans">
      {/* Top Banner / Backend Status indicator */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src="/logo.jpg"
              alt="Living Wealth 365 Logo"
              className="h-12 w-auto object-contain rounded"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <div>
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#023E8D]">
                Living Wealth <span className="text-[#FFB53B]">365</span>
              </span>
              <p className="text-xs text-gray-500 font-medium tracking-wide">
                FINANCIAL & INSURANCE ADVISOR • มั่นคง มั่งคั่ง ยั่งยืน
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 text-xs px-3 py-1.5 rounded-full border border-gray-200 bg-gray-50">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  backendStatus === 'connected'
                    ? 'bg-emerald-500 animate-pulse'
                    : backendStatus === 'checking'
                    ? 'bg-amber-400'
                    : 'bg-red-400'
                }`}
              />
              <span className="text-gray-600">
                API Backend:{' '}
                <strong className="font-semibold capitalize">{backendStatus}</strong>
              </span>
            </div>

            <a
              href="#consult-form"
              className="inline-flex items-center px-4 py-2 text-sm font-semibold rounded-lg text-white bg-[#023E8D] hover:bg-[#01285C] transition shadow-xs"
            >
              นัดหมายปรึกษาฟรี
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#F5F7FA] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#EBF3FC] text-[#023E8D] mb-4">
              <Sparkles className="w-4 h-4 text-[#FFB53B]" />
              <span>มากกว่าการเงิน คือการวางแผนชีวิตที่ดีขึ้นในทุกวัน</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#023E8D] leading-tight mb-6">
              ชีวิตที่มั่นคง เริ่มได้... <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#023E8D] via-[#023E8D] to-[#FFB53B]">
                จากแผนที่ใช่ วันนี้
              </span>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-8">
              ที่ปรึกษาทางการเงินและประกันชีวิตมืออาชีพ พร้อมดูแลคุณครบทุกมิติ
              ทั้งความคุ้มครองชีวิต สุขภาพ เกษียณอายุ ภาษี และการส่งต่อมรดกอย่างยั่งยืน 365 วัน
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <a
                href="#consult-form"
                className="px-6 py-3 rounded-lg text-white font-semibold bg-[#023E8D] hover:bg-[#01285C] transition shadow-md inline-flex items-center space-x-2"
              >
                <span>จองคิวรับคำปรึกษา</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#services"
                className="px-6 py-3 rounded-lg border border-gray-300 font-semibold text-gray-700 bg-white hover:bg-gray-50 transition"
              >
                ดูบริการทั้งหมด
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Values Ribbon */}
      <section className="bg-[#023E8D] text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 text-center">
          {['LIFE', 'WEALTH', 'HEALTH', 'FREEDOM', 'HAPPINESS', 'FOREVER'].map((val) => (
            <div key={val} className="py-1">
              <span className="text-xs sm:text-sm font-bold tracking-widest text-[#FFB53B]">
                • {val} •
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#023E8D]">
            บริการวางแผนการเงินและประกันภัย
          </h2>
          <p className="mt-2 text-gray-600 text-sm sm:text-base">
            ออกแบบเฉพาะบุคคลเพื่อความมั่นคงและอิสรภาพสูงสุดในทุกช่วงวัย
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((srv) => {
            const IconComponent = SERVICE_ICONS[srv.category] || ShieldCheck;
            return (
              <div
                key={srv.id}
                className="bg-white rounded-xl p-6 border border-gray-200 shadow-xs hover:shadow-md transition duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-[#EBF3FC] text-[#023E8D] flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{srv.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">{srv.description}</p>
                </div>
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#023E8D] tracking-wide">
                    LIVING WEALTH 365
                  </span>
                  <a
                    href="#consult-form"
                    onClick={() => setFormData((prev) => ({ ...prev, serviceCategory: srv.category }))}
                    className="text-xs font-semibold text-[#FFB53B] hover:text-[#EAA025] inline-flex items-center space-x-1"
                  >
                    <span>เลือกแผนนี้</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Consultation Booking Form */}
      <section id="consult-form" className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-xs font-bold text-[#FFB53B] tracking-wider uppercase">
              CONFIDENTIAL & TAILORED ADVICE
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#023E8D] mt-1">
              นัดหมายรับคำปรึกษาแผนการเงิน
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              ให้ข้อมูลเบื้องต้นเพื่อให้ทีมที่ปรึกษาเตรียมแผนและติดต่อกลับภายใน 24 ชม.
            </p>
          </div>

          {formSuccess && (
            <div className="mb-6 p-4 rounded-lg bg-emerald-50 border border-emerald-200 flex items-start space-x-3 text-emerald-800">
              <CheckCircle2 className="w-5 h-5 mt-0.5 text-emerald-600 shrink-0" />
              <div>
                <h4 className="font-semibold text-sm">บันทึกข้อมูลเรียบร้อยแล้ว!</h4>
                <p className="text-xs mt-1 text-emerald-700">
                  ทีมงาน Living Wealth 365 ได้รับคำขอแล้ว และจะติดต่อกลับตามข้อมูลที่ท่านระบุไว้ครับ
                </p>
              </div>
            </div>
          )}

          {formError && (
            <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 flex items-start space-x-3 text-red-800">
              <AlertCircle className="w-5 h-5 mt-0.5 text-red-600 shrink-0" />
              <div>
                <h4 className="font-semibold text-sm">เกิดข้อผิดพลาด</h4>
                <p className="text-xs mt-1 text-red-700">{formError}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 bg-[#F5F7FA] p-6 sm:p-8 rounded-2xl border border-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  ชื่อ - นามสกุล *
                </label>
                <input
                  type="text"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleChange}
                  required
                  placeholder="เช่น สมชาย มั่นคง"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#023E8D]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  เบอร์โทรศัพท์ *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    name="clientPhone"
                    value={formData.clientPhone}
                    onChange={handleChange}
                    required
                    placeholder="0812345678"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#023E8D]"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  อีเมล *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    name="clientEmail"
                    value={formData.clientEmail}
                    onChange={handleChange}
                    required
                    placeholder="example@email.com"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#023E8D]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  บริการที่สนใจ
                </label>
                <select
                  name="serviceCategory"
                  value={formData.serviceCategory}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#023E8D]"
                >
                  <option value="LIFE_INSURANCE">ประกันชีวิตและการคุ้มครองครอบครัว</option>
                  <option value="HEALTH_INSURANCE">ประกันสุขภาพและโรคร้ายแรง</option>
                  <option value="RETIREMENT_PLANNING">วางแผนเกษียณอายุ</option>
                  <option value="TAX_PLANNING">วางแผนภาษีบุคคลธรรมดา</option>
                  <option value="INVESTMENT_ADVISORY">วางแผนการลงทุนและการเงิน</option>
                  <option value="WEALTH_TRANSFER">การส่งต่อมรดกและความมั่งคั่ง</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                งบประมาณเงินออม / เบี้ยประกันที่ต้องการต่อเดือน (บาท) [ถ้ามี]
              </label>
              <input
                type="number"
                name="monthlyBudget"
                value={formData.monthlyBudget}
                onChange={handleChange}
                placeholder="เช่น 5000"
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#023E8D]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                รายละเอียดเพิ่มเติมหรือเป้าหมายที่ต้องการ
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                placeholder="ระบุเป้าหมาย เช่น ต้องการวางแผนเกษียณในอีก 15 ปี หรือต้องการประกันสุขภาพเหมาจ่าย..."
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#023E8D]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-lg text-white font-semibold bg-[#023E8D] hover:bg-[#01285C] disabled:opacity-60 transition shadow-md flex items-center justify-center space-x-2"
            >
              {loading ? (
                <span>กำลังส่งข้อมูล...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>ส่งคำขอนัดหมายที่ปรึกษา</span>
                </>
              )}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-gray-900 text-gray-300 py-10 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-bold text-white tracking-wide">
                LIVING WEALTH <span className="text-[#FFB53B]">365</span>
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                ที่ปรึกษาทางการเงินและประกันชีวิต • มั่นคง มั่งคั่ง ยั่งยืน
              </p>
            </div>
            <div className="text-xs text-gray-500">
              © {new Date().getFullYear()} Living Wealth 365. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
