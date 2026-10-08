import { useState, useEffect } from 'react';
import {
  ShieldCheck,
  HeartPulse,
  Sun,
  Moon,
  Receipt,
  TrendingUp,
  Coins,
  CheckCircle2,
  AlertCircle,
  Phone,
  Mail,
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
  const [theme, setTheme] = useState('zen-light');
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
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

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
        // Fallback default services
        setServices([
          {
            id: 'srv-life',
            category: 'LIFE_INSURANCE',
            title: 'ประกันชีวิตและการคุ้มครองครอบครัว (Life Protection)',
            description: 'สร้างหลักประกันที่มั่นคง ส่งต่อความรักและความอุ่นใจให้ครอบครัวที่คุณรัก',
          },
          {
            id: 'srv-health',
            category: 'HEALTH_INSURANCE',
            title: 'ประกันสุขภาพและโรคร้ายแรง (Health & Critical Illness)',
            description: 'ครอบคลุมค่ารักษาพยาบาลระดับพรีเมียม จัดการค่าใช้จ่ายไม่ให้กระทบเงินเก็บสะสม',
          },
          {
            id: 'srv-retirement',
            category: 'RETIREMENT_PLANNING',
            title: 'วางแผนเกษียณสุขใจ (Retirement Planning)',
            description: 'สร้างกระแสเงินสดต่อเนื่องหลังเกษียณ มีชีวิตอิสระ มั่นคงในทุกวันของชีวิต 365 วัน',
          },
          {
            id: 'srv-tax',
            category: 'TAX_PLANNING',
            title: 'วางแผนภาษีบุคคลธรรมดา (Tax Optimization)',
            description: 'บริหารสิทธิประโยชน์ทางภาษีอย่างถูกต้องตามกฎหมาย เพื่อเพิ่มพูนเงินออมสุทธิ',
          },
          {
            id: 'srv-investment',
            category: 'INVESTMENT_ADVISORY',
            title: 'วางแผนการเงินและการลงทุน (Wealth Accumulation)',
            description: 'จัดพอร์ตการลงทุนตามเป้าหมายชีวิตและระดับความเสี่ยงที่เหมาะสม',
          },
          {
            id: 'srv-transfer',
            category: 'WEALTH_TRANSFER',
            title: 'การส่งต่อมรดกและความมั่งคั่ง (Wealth Transfer & Legacy)',
            description: 'วางแผนถ่ายทอดทรัพย์สินอย่างราบรื่น ปลอดภัย และไร้ข้อพิพาทในครอบครัว',
          },
        ]);
      });
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'zen-light' ? 'zen-dark' : 'zen-light'));
  };

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
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-200">
      {/* Zen Glass Navbar */}
      <header className="sticky top-0 z-50 px-4 sm:px-6 py-2">
        <div className="navbar zen-surface max-w-6xl mx-auto px-6 rounded-box">
          <div className="navbar-start flex items-center gap-3">
            <img
              src="/logo.jpg"
              alt="Living Wealth 365"
              className="h-10 w-auto rounded object-contain shadow-xs"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <div>
              <span className="text-lg font-bold tracking-tight text-primary">
                Living Wealth <span className="text-secondary">365</span>
              </span>
              <p className="text-[11px] zen-muted font-medium hidden sm:block">
                FINANCIAL & INSURANCE ADVISOR • มั่นคง มั่งคั่ง ยั่งยืน
              </p>
            </div>
          </div>

          <div className="navbar-end flex items-center gap-3">
            {/* Backend connection pill */}
            <div className="hidden md:flex items-center gap-2 text-xs px-3 py-1.5 rounded-full border border-base-300">
              <span
                className={`w-2 h-2 rounded-full ${
                  backendStatus === 'connected'
                    ? 'bg-success animate-pulse'
                    : backendStatus === 'checking'
                    ? 'bg-warning'
                    : 'bg-error'
                }`}
              />
              <span className="zen-muted text-xs">API: {backendStatus}</span>
            </div>

            {/* Dark / Light Toggle */}
            <button
              onClick={toggleTheme}
              className="btn btn-ghost btn-circle btn-sm"
              title="Toggle theme"
              aria-label="Toggle theme"
            >
              {theme === 'zen-light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-secondary" />}
            </button>

            <a href="#consult-form" className="btn btn-primary btn-sm">
              นัดหมายปรึกษาฟรี
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-base-200 text-primary mb-6">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span>มากกว่าการเงิน คือการวางแผนชีวิตที่ดีขึ้นในทุกวัน</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight text-primary mb-6">
              ชีวิตที่มั่นคง เริ่มได้... <br />
              <span className="text-secondary">
                จากแผนที่ใช่ วันนี้
              </span>
            </h1>

            <p className="text-base sm:text-lg zen-muted leading-relaxed mb-8">
              ที่ปรึกษาทางการเงินและประกันชีวิตมืออาชีพ พร้อมดูแลคุณครบทุกมิติ
              ทั้งความคุ้มครองชีวิต สุขภาพ เกษียณอายุ ภาษี และการส่งต่อมรดกอย่างยั่งยืน 365 วัน
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <a href="#consult-form" className="btn btn-primary">
                <span>จองคิวรับคำปรึกษา</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#services" className="btn btn-outline border-base-300">
                ดูบริการทั้งหมด
              </a>
              <span className="badge badge-secondary badge-lg font-semibold">มั่นคง • มั่งคั่ง • ยั่งยืน</span>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Values Ribbon */}
      <section className="py-4 bg-neutral text-neutral-content">
        <div className="container max-w-6xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-center">
          {['LIFE', 'WEALTH', 'HEALTH', 'FREEDOM', 'HAPPINESS', 'FOREVER'].map((val) => (
            <div key={val} className="py-1">
              <span className="text-xs sm:text-sm font-bold tracking-widest text-secondary">
                • {val} •
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 md:py-24">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary">
              บริการวางแผนการเงินและประกันภัย
            </h2>
            <p className="mt-2 zen-muted text-sm sm:text-base">
              ออกแบบเฉพาะบุคคลเพื่อความมั่นคงและอิสรภาพสูงสุดในทุกช่วงวัย
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((srv) => {
              const IconComponent = SERVICE_ICONS[srv.category] || ShieldCheck;
              return (
                <div
                  key={srv.id}
                  className="card zen-surface p-6 flex flex-col justify-between hover:shadow-md transition duration-200"
                >
                  <div>
                    <div className="w-12 h-12 rounded-box bg-base-200 text-primary flex items-center justify-center mb-4">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{srv.title}</h3>
                    <p className="text-sm zen-muted leading-relaxed mb-4">{srv.description}</p>
                  </div>
                  <div className="pt-4 border-t border-base-200 flex items-center justify-between">
                    <span className="badge badge-sm badge-outline text-primary">
                      LIVING WEALTH 365
                    </span>
                    <a
                      href="#consult-form"
                      onClick={() => setFormData((prev) => ({ ...prev, serviceCategory: srv.category }))}
                      className="text-xs font-semibold text-secondary hover:underline inline-flex items-center gap-1"
                    >
                      <span>เลือกแผนนี้</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Consultation Booking Form Section */}
      <section id="consult-form" className="py-16 md:py-24 bg-base-200">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <span className="badge badge-secondary uppercase tracking-wider text-xs font-bold mb-2">
                CONFIDENTIAL & TAILORED ADVICE
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-primary">
                นัดหมายรับคำปรึกษาแผนการเงิน
              </h2>
              <p className="text-sm zen-muted mt-2">
                ให้ข้อมูลเบื้องต้นเพื่อให้ทีมที่ปรึกษาเตรียมแผนและติดต่อกลับภายใน 24 ชม.
              </p>
            </div>

            {formSuccess && (
              <div className="alert alert-success mb-6 shadow-sm">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <div>
                  <h4 className="font-semibold text-sm">บันทึกข้อมูลเรียบร้อยแล้ว!</h4>
                  <p className="text-xs mt-0.5">
                    ทีมงาน Living Wealth 365 ได้รับคำขอแล้ว และจะติดต่อกลับตามข้อมูลที่ท่านระบุไว้ครับ
                  </p>
                </div>
              </div>
            )}

            {formError && (
              <div className="alert alert-error mb-6 shadow-sm">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <div>
                  <h4 className="font-semibold text-sm">เกิดข้อผิดพลาด</h4>
                  <p className="text-xs mt-0.5">{formError}</p>
                </div>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="card zen-surface p-6 sm:p-8 space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">
                    ชื่อ - นามสกุล *
                  </label>
                  <input
                    type="text"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleChange}
                    required
                    placeholder="เช่น สมชาย มั่นคง"
                    className="input w-full px-3.5 py-2.5 rounded-field text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">
                    เบอร์โทรศัพท์ *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 zen-muted absolute left-3 top-3" />
                    <input
                      type="tel"
                      name="clientPhone"
                      value={formData.clientPhone}
                      onChange={handleChange}
                      required
                      placeholder="0812345678"
                      className="input w-full pl-9 pr-3.5 py-2.5 rounded-field text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">
                    อีเมล *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 zen-muted absolute left-3 top-3" />
                    <input
                      type="email"
                      name="clientEmail"
                      value={formData.clientEmail}
                      onChange={handleChange}
                      required
                      placeholder="example@email.com"
                      className="input w-full pl-9 pr-3.5 py-2.5 rounded-field text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">
                    บริการที่สนใจ
                  </label>
                  <select
                    name="serviceCategory"
                    value={formData.serviceCategory}
                    onChange={handleChange}
                    className="select w-full px-3.5 py-2.5 rounded-field text-sm"
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
                <label className="block text-xs font-semibold mb-1">
                  งบประมาณเงินออม / เบี้ยประกันที่ต้องการต่อเดือน (บาท) [ถ้ามี]
                </label>
                <input
                  type="number"
                  name="monthlyBudget"
                  value={formData.monthlyBudget}
                  onChange={handleChange}
                  placeholder="เช่น 5000"
                  className="input w-full px-3.5 py-2.5 rounded-field text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">
                  รายละเอียดเพิ่มเติมหรือเป้าหมายที่ต้องการ
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  placeholder="ระบุเป้าหมาย เช่น ต้องการวางแผนเกษียณในอีก 15 ปี หรือต้องการประกันสุขภาพเหมาจ่าย..."
                  className="textarea w-full px-3.5 py-2.5 rounded-field text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full flex items-center justify-center gap-2"
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
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-neutral text-neutral-content py-10 border-t border-neutral">
        <div className="container max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-primary-content tracking-wide">
              LIVING WEALTH <span className="text-secondary">365</span>
            </h3>
            <p className="text-xs zen-muted mt-1">
              ที่ปรึกษาทางการเงินและประกันชีวิต • มั่นคง มั่งคั่ง ยั่งยืน
            </p>
          </div>
          <div className="text-xs zen-muted">
            © {new Date().getFullYear()} Living Wealth 365. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
