import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sliders,
  Sparkles,
  Megaphone,
  Compass,
  HeartHandshake,
  MessageSquare,
  FileText,
  RotateCcw,
  Download,
  Upload,
  Check,
  ExternalLink,
  Eye,
  Shield,
  Layers,
} from 'lucide-react';
import DashboardLayout from '../../components/common/DashboardLayout';
import { useSiteCustomizer } from '../../context/SiteCustomizerContext';
import { useToast } from '../../context/ToastContext';
import { ROUTES } from '../../constants/routes';

export default function AdminSiteCustomizerPage() {
  const {
    content,
    updateField,
    resetDefaults,
    setIsVisualEditMode,
    exportConfig,
    importConfig,
  } = useSiteCustomizer();

  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState('announcement');
  const [importJsonText, setImportJsonText] = useState('');
  const [importError, setImportError] = useState('');
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const tabs = [
    { id: 'announcement', label: 'แถบประกาศ & แบรนด์', icon: Megaphone },
    { id: 'hero', label: 'ส่วนหัวเว็บไซต์ (Hero)', icon: Sparkles },
    { id: 'gateways', label: '3 ประตูใหญ่ & หมวดหมู่', icon: Compass },
    { id: 'narrative', label: 'เรื่องราว Admin A & B', icon: HeartHandshake },
    { id: 'leadForm', label: 'แบบฟอร์ม Let\'s Talk', icon: MessageSquare },
    { id: 'footer', label: 'ท้ายเว็บ & ข้อมูลติดต่อ', icon: FileText },
    { id: 'backup', label: 'สำรอง & คืนค่า (JSON)', icon: Layers },
  ];

  const handleFieldChange = (path, value) => {
    updateField(path, value);
  };

  const handleSaveNotification = () => {
    showToast('บันทึกการตั้งค่าลงเครื่องเรียบร้อยแล้ว (Auto-saved)', 'success');
  };

  const handleResetAll = () => {
    resetDefaults();
    setShowResetConfirm(false);
    showToast('คืนค่าเริ่มต้นหน้าเว็บทั้งหมดสำเร็จแล้ว', 'info');
  };

  const handleExport = () => {
    const json = exportConfig();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `living-wealth-365-config-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('ส่งออกไฟล์การตั้งค่า JSON สำเร็จ', 'success');
  };

  const handleImportSubmit = (e) => {
    e.preventDefault();
    setImportError('');
    if (!importJsonText.trim()) {
      setImportError('กรุณาวางเนื้อหา JSON ที่ต้องการนำเข้า');
      return;
    }
    const result = importConfig(importJsonText);
    if (result.success) {
      setImportJsonText('');
      showToast('นำเข้าข้อมูลการตั้งค่าเว็บไซต์สำเร็จแล้ว', 'success');
    } else {
      setImportError(`เกิดข้อผิดพลาด: ${result.error}`);
    }
  };

  return (
    <DashboardLayout type="admin">
      <div className="w-full space-y-8 pb-16">
        {/* Page Top Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-base-300/60 pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/15 text-secondary text-xs font-bold">
              <Sliders className="w-3.5 h-3.5" />
              <span>LIVE CMS & SITE CUSTOMIZER</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-primary">
              ปรับแต่งเนื้อหาหน้าเว็บไซต์ (Site Customizer)
            </h1>
            <p className="text-xs sm:text-sm text-base-content/75">
              แก้ไขข้อความ หัวข้อ หมวดหมู่ 3 ประตูใหญ่ ข้อมูลผู้ก่อตั้ง และแบบฟอร์มติดต่อได้ครบทุกจุดแบบยืดหยุ่น
            </p>
          </div>

          {/* Quick Header Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              to={ROUTES.HOME}
              onClick={() => setIsVisualEditMode(true)}
              className="btn btn-secondary btn-sm rounded-xl font-bold text-white shadow-xs gap-1.5"
            >
              <Eye className="w-4 h-4" />
              <span>เปิดดูหน้าเว็บจริง (Visual Edit)</span>
              <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
            </Link>

            <button
              onClick={handleExport}
              className="btn btn-outline btn-sm rounded-xl gap-1.5"
              title="ดาวน์โหลดไฟล์ JSON สำรองการตั้งค่า"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">สำรอง JSON</span>
            </button>

            <button
              onClick={() => setShowResetConfirm(true)}
              className="btn btn-ghost btn-sm rounded-xl text-error hover:bg-error/10 gap-1.5"
              title="คืนค่าเนื้อหาทั้งหมดเป็นค่าเริ่มต้น"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">คืนค่าเริ่มต้น</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Pill Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isCurrent = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`btn btn-sm rounded-2xl whitespace-nowrap transition-all gap-2 ${
                  isCurrent
                    ? 'btn-primary shadow-xs font-bold'
                    : 'btn-ghost text-base-content/70 hover:text-primary hover:bg-base-200/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ======================================================== */}
        {/* TAB 1: ANNOUNCEMENT & BRAND */}
        {/* ======================================================== */}
        {activeTab === 'announcement' && (
          <div className="space-y-6">
            <div className="zen-surface rounded-3xl p-6 sm:p-8 border border-base-300/60 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-base-300/60 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                    <Megaphone className="w-5 h-5 text-secondary" />
                    <span>แถบประกาศด้านบนสุด (Top Announcement Bar)</span>
                  </h3>
                  <p className="text-xs zen-muted mt-0.5">
                    แถบสีทองด้านบนสุดของหน้าเว็บ สำหรับแจ้งข่าวสาร โปรโมชั่น หรือแคมเปญสำคัญ
                  </p>
                </div>
                <label className="cursor-pointer inline-flex items-center gap-2.5">
                  <span className="text-xs font-bold">เปิดแสดงผล:</span>
                  <input
                    type="checkbox"
                    checked={content?.announcement?.enabled ?? true}
                    onChange={(e) => {
                      handleFieldChange('announcement.enabled', e.target.checked);
                      handleSaveNotification();
                    }}
                    className="toggle toggle-secondary"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-3 space-y-1.5">
                  <label className="text-xs font-bold text-base-content/80">
                    ป้ายกำกับ (Badge):
                  </label>
                  <input
                    type="text"
                    value={content?.announcement?.badge || ''}
                    onChange={(e) => handleFieldChange('announcement.badge', e.target.value)}
                    className="input input-bordered w-full rounded-xl text-sm"
                    placeholder="เช่น NEW 2026, พิเศษ"
                  />
                </div>

                <div className="md:col-span-9 space-y-1.5">
                  <label className="text-xs font-bold text-base-content/80">
                    ข้อความประกาศหลัก:
                  </label>
                  <input
                    type="text"
                    value={content?.announcement?.text || ''}
                    onChange={(e) => handleFieldChange('announcement.text', e.target.value)}
                    className="input input-bordered w-full rounded-xl text-sm"
                    placeholder="ระบุข้อความประกาศที่นี่..."
                  />
                </div>

                <div className="md:col-span-6 space-y-1.5">
                  <label className="text-xs font-bold text-base-content/80">
                    ข้อความปุ่ม/ลิงก์:
                  </label>
                  <input
                    type="text"
                    value={content?.announcement?.linkText || ''}
                    onChange={(e) => handleFieldChange('announcement.linkText', e.target.value)}
                    className="input input-bordered w-full rounded-xl text-sm"
                    placeholder="เช่น สำรวจเลย →"
                  />
                </div>

                <div className="md:col-span-6 space-y-1.5">
                  <label className="text-xs font-bold text-base-content/80">
                    ปลายทางลิงก์ (URL หรือ Anchor):
                  </label>
                  <input
                    type="text"
                    value={content?.announcement?.link || ''}
                    onChange={(e) => handleFieldChange('announcement.link', e.target.value)}
                    className="input input-bordered w-full rounded-xl text-sm"
                    placeholder="เช่น #lifemap หรือ /about#talk"
                  />
                </div>
              </div>
            </div>

            {/* Brand & Founders Section */}
            <div className="zen-surface rounded-3xl p-6 sm:p-8 border border-base-300/60 shadow-xs space-y-6">
              <div className="border-b border-base-300/60 pb-4">
                <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                  <Shield className="w-5 h-5 text-secondary" />
                  <span>ข้อมูลแบรนด์และผู้ก่อตั้ง (Brand & Founders Identity)</span>
                </h3>
                <p className="text-xs zen-muted mt-0.5">
                  ชื่อแบรนด์ สโลแกน และการแสดงชื่อ Admin A & Admin B ทั่วทั้งระบบ
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-base-content/80">ชื่อแบรนด์:</label>
                  <input
                    type="text"
                    value={content?.brand?.name || ''}
                    onChange={(e) => handleFieldChange('brand.name', e.target.value)}
                    className="input input-bordered w-full rounded-xl text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-base-content/80">สโลแกนหลัก:</label>
                  <input
                    type="text"
                    value={content?.brand?.slogan || ''}
                    onChange={(e) => handleFieldChange('brand.slogan', e.target.value)}
                    className="input input-bordered w-full rounded-xl text-sm"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-base-200/50 space-y-3">
                  <span className="text-xs font-bold text-secondary uppercase">
                    Admin A Identity
                  </span>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold">ชื่อที่แสดง:</label>
                    <input
                      type="text"
                      value={content?.brand?.adminAName || ''}
                      onChange={(e) => handleFieldChange('brand.adminAName', e.target.value)}
                      className="input input-bordered input-sm w-full rounded-xl"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold">ตำแหน่ง/ความเชี่ยวชาญ:</label>
                    <input
                      type="text"
                      value={content?.brand?.adminARole || ''}
                      onChange={(e) => handleFieldChange('brand.adminARole', e.target.value)}
                      className="input input-bordered input-sm w-full rounded-xl"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-base-200/50 space-y-3">
                  <span className="text-xs font-bold text-secondary uppercase">
                    Admin B Identity
                  </span>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold">ชื่อที่แสดง:</label>
                    <input
                      type="text"
                      value={content?.brand?.adminBName || ''}
                      onChange={(e) => handleFieldChange('brand.adminBName', e.target.value)}
                      className="input input-bordered input-sm w-full rounded-xl"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold">ตำแหน่ง/ความเชี่ยวชาญ:</label>
                    <input
                      type="text"
                      value={content?.brand?.adminBRole || ''}
                      onChange={(e) => handleFieldChange('brand.adminBRole', e.target.value)}
                      className="input input-bordered input-sm w-full rounded-xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: HERO SECTION */}
        {/* ======================================================== */}
        {activeTab === 'hero' && (
          <div className="zen-surface rounded-3xl p-6 sm:p-8 border border-base-300/60 shadow-xs space-y-6">
            <div className="border-b border-base-300/60 pb-4">
              <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-secondary" />
                <span>ส่วนหัวเว็บไซต์หน้าแรก (Hero Section)</span>
              </h3>
              <p className="text-xs zen-muted mt-0.5">
                ความประทับใจแรกของหน้าแรก (Headline, Hook, คำบรรยาย และปุ่ม Call-to-Action)
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-base-content/80">
                  ป้ายหัวข้อเล็ก (Hero Badge):
                </label>
                <input
                  type="text"
                  value={content?.hero?.badge || ''}
                  onChange={(e) => handleFieldChange('hero.badge', e.target.value)}
                  className="input input-bordered w-full rounded-xl text-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-base-content/80">
                    หัวข้อหลักบรรทัดที่ 1 (Title Line 1):
                  </label>
                  <input
                    type="text"
                    value={content?.hero?.titleLine1 || ''}
                    onChange={(e) => handleFieldChange('hero.titleLine1', e.target.value)}
                    className="input input-bordered w-full rounded-xl text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-base-content/80">
                    หัวข้อหลักบรรทัดที่ 2 (Title Line 2 - สีทองเน้น):
                  </label>
                  <input
                    type="text"
                    value={content?.hero?.titleLine2 || ''}
                    onChange={(e) => handleFieldChange('hero.titleLine2', e.target.value)}
                    className="input input-bordered w-full rounded-xl text-sm text-secondary font-bold"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-base-content/80">
                  คำบรรยายหลัก (Lead Description):
                </label>
                <textarea
                  rows={4}
                  value={content?.hero?.description || ''}
                  onChange={(e) => handleFieldChange('hero.description', e.target.value)}
                  className="textarea textarea-bordered w-full rounded-2xl text-sm leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-base-200/50 space-y-3">
                  <span className="text-xs font-bold text-primary">ปุ่มหลัก (Primary CTA)</span>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold">ข้อความปุ่ม:</label>
                    <input
                      type="text"
                      value={content?.hero?.primaryBtnText || ''}
                      onChange={(e) => handleFieldChange('hero.primaryBtnText', e.target.value)}
                      className="input input-bordered input-sm w-full rounded-xl"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold">ลิงก์ปลายทาง:</label>
                    <input
                      type="text"
                      value={content?.hero?.primaryBtnLink || ''}
                      onChange={(e) => handleFieldChange('hero.primaryBtnLink', e.target.value)}
                      className="input input-bordered input-sm w-full rounded-xl"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-base-200/50 space-y-3">
                  <span className="text-xs font-bold text-primary">ปุ่มรอง (Secondary CTA)</span>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold">ข้อความปุ่ม:</label>
                    <input
                      type="text"
                      value={content?.hero?.secondaryBtnText || ''}
                      onChange={(e) => handleFieldChange('hero.secondaryBtnText', e.target.value)}
                      className="input input-bordered input-sm w-full rounded-xl"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold">ลิงก์ปลายทาง:</label>
                    <input
                      type="text"
                      value={content?.hero?.secondaryBtnLink || ''}
                      onChange={(e) => handleFieldChange('hero.secondaryBtnLink', e.target.value)}
                      className="input input-bordered input-sm w-full rounded-xl"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-base-content/80">
                    ข้อความยืนยันความเชื่อมั่น 1 (Trust Badge 1):
                  </label>
                  <input
                    type="text"
                    value={content?.hero?.trust1 || ''}
                    onChange={(e) => handleFieldChange('hero.trust1', e.target.value)}
                    className="input input-bordered w-full rounded-xl text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-base-content/80">
                    ข้อความยืนยันความเชื่อมั่น 2 (Trust Badge 2):
                  </label>
                  <input
                    type="text"
                    value={content?.hero?.trust2 || ''}
                    onChange={(e) => handleFieldChange('hero.trust2', e.target.value)}
                    className="input input-bordered w-full rounded-xl text-sm"
                  />
                </div>
              </div>

              {/* Hero Image & Card Overlay */}
              <div className="border-t border-base-300/60 pt-4 space-y-3">
                <span className="text-xs font-bold text-primary">
                  รูปภาพและข้อความการ์ด Hero ฝั่งขวา
                </span>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-base-content/80">
                    ลิงก์รูปภาพ Hero (Image URL):
                  </label>
                  <input
                    type="text"
                    value={content?.hero?.imageUrl || ''}
                    onChange={(e) => handleFieldChange('hero.imageUrl', e.target.value)}
                    className="input input-bordered w-full rounded-xl text-sm font-mono text-xs"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold">การ์ด Badge:</label>
                    <input
                      type="text"
                      value={content?.hero?.imageBadge || ''}
                      onChange={(e) => handleFieldChange('hero.imageBadge', e.target.value)}
                      className="input input-bordered input-sm w-full rounded-xl"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold">การ์ด หัวข้อ:</label>
                    <input
                      type="text"
                      value={content?.hero?.imageTitle || ''}
                      onChange={(e) => handleFieldChange('hero.imageTitle', e.target.value)}
                      className="input input-bordered input-sm w-full rounded-xl"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold">การ์ด ข้อความย่อย:</label>
                    <input
                      type="text"
                      value={content?.hero?.imageSubtitle || ''}
                      onChange={(e) => handleFieldChange('hero.imageSubtitle', e.target.value)}
                      className="input input-bordered input-sm w-full rounded-xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: THREE CORE GATEWAYS */}
        {/* ======================================================== */}
        {activeTab === 'gateways' && (
          <div className="space-y-6">
            <div className="zen-surface rounded-3xl p-6 sm:p-8 border border-base-300/60 shadow-xs space-y-4">
              <div className="border-b border-base-300/60 pb-4">
                <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                  <Compass className="w-5 h-5 text-secondary" />
                  <span>หัวข้อหมวด 3 ประตูใหญ่ (Gateways Header)</span>
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-base-content/80">Badge:</label>
                  <input
                    type="text"
                    value={content?.gateways?.sectionBadge || ''}
                    onChange={(e) => handleFieldChange('gateways.sectionBadge', e.target.value)}
                    className="input input-bordered w-full rounded-xl text-sm"
                  />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-base-content/80">หัวข้อหลัก:</label>
                  <input
                    type="text"
                    value={content?.gateways?.sectionTitle || ''}
                    onChange={(e) => handleFieldChange('gateways.sectionTitle', e.target.value)}
                    className="input input-bordered w-full rounded-xl text-sm"
                  />
                </div>
                <div className="space-y-1.5 sm:col-span-3">
                  <label className="text-xs font-bold text-base-content/80">คำบรรยายย่อย:</label>
                  <input
                    type="text"
                    value={content?.gateways?.sectionSubtitle || ''}
                    onChange={(e) => handleFieldChange('gateways.sectionSubtitle', e.target.value)}
                    className="input input-bordered w-full rounded-xl text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Gateway 1: Living */}
            <div className="zen-surface rounded-3xl p-6 sm:p-8 border border-base-300/60 shadow-xs space-y-4">
              <span className="badge badge-success text-white font-bold">Gateway 01: Living</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold">ชื่อหมวด:</label>
                  <input
                    type="text"
                    value={content?.gateways?.living?.title || ''}
                    onChange={(e) => handleFieldChange('gateways.living.title', e.target.value)}
                    className="input input-bordered input-sm w-full rounded-xl"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold">ข้อความปุ่ม:</label>
                  <input
                    type="text"
                    value={content?.gateways?.living?.btnText || ''}
                    onChange={(e) => handleFieldChange('gateways.living.btnText', e.target.value)}
                    className="input input-bordered input-sm w-full rounded-xl"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold">คำอธิบายหมวด:</label>
                <textarea
                  rows={2}
                  value={content?.gateways?.living?.desc || ''}
                  onChange={(e) => handleFieldChange('gateways.living.desc', e.target.value)}
                  className="textarea textarea-bordered w-full rounded-xl text-xs"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  value={content?.gateways?.living?.point1 || ''}
                  onChange={(e) => handleFieldChange('gateways.living.point1', e.target.value)}
                  className="input input-bordered input-xs rounded-lg"
                  placeholder="หัวข้อย่อย 1"
                />
                <input
                  type="text"
                  value={content?.gateways?.living?.point2 || ''}
                  onChange={(e) => handleFieldChange('gateways.living.point2', e.target.value)}
                  className="input input-bordered input-xs rounded-lg"
                  placeholder="หัวข้อย่อย 2"
                />
                <input
                  type="text"
                  value={content?.gateways?.living?.point3 || ''}
                  onChange={(e) => handleFieldChange('gateways.living.point3', e.target.value)}
                  className="input input-bordered input-xs rounded-lg"
                  placeholder="หัวข้อย่อย 3"
                />
              </div>
            </div>

            {/* Gateway 2: Learning */}
            <div className="zen-surface rounded-3xl p-6 sm:p-8 border border-base-300/60 shadow-xs space-y-4">
              <span className="badge badge-warning text-white font-bold">Gateway 02: Learning</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold">ชื่อหมวด:</label>
                  <input
                    type="text"
                    value={content?.gateways?.learning?.title || ''}
                    onChange={(e) => handleFieldChange('gateways.learning.title', e.target.value)}
                    className="input input-bordered input-sm w-full rounded-xl"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold">ข้อความปุ่ม:</label>
                  <input
                    type="text"
                    value={content?.gateways?.learning?.btnText || ''}
                    onChange={(e) => handleFieldChange('gateways.learning.btnText', e.target.value)}
                    className="input input-bordered input-sm w-full rounded-xl"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold">คำอธิบายหมวด:</label>
                <textarea
                  rows={2}
                  value={content?.gateways?.learning?.desc || ''}
                  onChange={(e) => handleFieldChange('gateways.learning.desc', e.target.value)}
                  className="textarea textarea-bordered w-full rounded-xl text-xs"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  value={content?.gateways?.learning?.point1 || ''}
                  onChange={(e) => handleFieldChange('gateways.learning.point1', e.target.value)}
                  className="input input-bordered input-xs rounded-lg"
                  placeholder="หัวข้อย่อย 1"
                />
                <input
                  type="text"
                  value={content?.gateways?.learning?.point2 || ''}
                  onChange={(e) => handleFieldChange('gateways.learning.point2', e.target.value)}
                  className="input input-bordered input-xs rounded-lg"
                  placeholder="หัวข้อย่อย 2"
                />
                <input
                  type="text"
                  value={content?.gateways?.learning?.point3 || ''}
                  onChange={(e) => handleFieldChange('gateways.learning.point3', e.target.value)}
                  className="input input-bordered input-xs rounded-lg"
                  placeholder="หัวข้อย่อย 3"
                />
              </div>
            </div>

            {/* Gateway 3: Connecting */}
            <div className="zen-surface rounded-3xl p-6 sm:p-8 border border-base-300/60 shadow-xs space-y-4">
              <span className="badge badge-secondary text-white font-bold">Gateway 03: Connecting</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold">ชื่อหมวด:</label>
                  <input
                    type="text"
                    value={content?.gateways?.connecting?.title || ''}
                    onChange={(e) => handleFieldChange('gateways.connecting.title', e.target.value)}
                    className="input input-bordered input-sm w-full rounded-xl"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold">ข้อความปุ่ม:</label>
                  <input
                    type="text"
                    value={content?.gateways?.connecting?.btnText || ''}
                    onChange={(e) => handleFieldChange('gateways.connecting.btnText', e.target.value)}
                    className="input input-bordered input-sm w-full rounded-xl"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold">คำอธิบายหมวด:</label>
                <textarea
                  rows={2}
                  value={content?.gateways?.connecting?.desc || ''}
                  onChange={(e) => handleFieldChange('gateways.connecting.desc', e.target.value)}
                  className="textarea textarea-bordered w-full rounded-xl text-xs"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  value={content?.gateways?.connecting?.point1 || ''}
                  onChange={(e) => handleFieldChange('gateways.connecting.point1', e.target.value)}
                  className="input input-bordered input-xs rounded-lg"
                  placeholder="หัวข้อย่อย 1"
                />
                <input
                  type="text"
                  value={content?.gateways?.connecting?.point2 || ''}
                  onChange={(e) => handleFieldChange('gateways.connecting.point2', e.target.value)}
                  className="input input-bordered input-xs rounded-lg"
                  placeholder="หัวข้อย่อย 2"
                />
                <input
                  type="text"
                  value={content?.gateways?.connecting?.point3 || ''}
                  onChange={(e) => handleFieldChange('gateways.connecting.point3', e.target.value)}
                  className="input input-bordered input-xs rounded-lg"
                  placeholder="หัวข้อย่อย 3"
                />
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: PERSONAL BRAND NARRATIVE */}
        {/* ======================================================== */}
        {activeTab === 'narrative' && (
          <div className="zen-surface rounded-3xl p-6 sm:p-8 border border-base-300/60 shadow-xs space-y-6">
            <div className="border-b border-base-300/60 pb-4">
              <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                <HeartHandshake className="w-5 h-5 text-secondary" />
                <span>เรื่องราวและปรัชญา Admin A & Admin B (Personal Narrative)</span>
              </h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-base-content/80">Badge:</label>
                <input
                  type="text"
                  value={content?.narrative?.badge || ''}
                  onChange={(e) => handleFieldChange('narrative.badge', e.target.value)}
                  className="input input-bordered w-full rounded-xl text-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-base-content/80">
                    หัวข้อคำคม บรรทัดที่ 1:
                  </label>
                  <input
                    type="text"
                    value={content?.narrative?.titleLine1 || ''}
                    onChange={(e) => handleFieldChange('narrative.titleLine1', e.target.value)}
                    className="input input-bordered w-full rounded-xl text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-base-content/80">
                    หัวข้อคำคม บรรทัดที่ 2:
                  </label>
                  <input
                    type="text"
                    value={content?.narrative?.titleLine2 || ''}
                    onChange={(e) => handleFieldChange('narrative.titleLine2', e.target.value)}
                    className="input input-bordered w-full rounded-xl text-sm text-secondary font-bold"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-base-content/80">
                  เนื้อหาความเชื่อและปรัชญาหลัก:
                </label>
                <textarea
                  rows={4}
                  value={content?.narrative?.body || ''}
                  onChange={(e) => handleFieldChange('narrative.body', e.target.value)}
                  className="textarea textarea-bordered w-full rounded-2xl text-sm leading-relaxed"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-base-content/80">
                  คำคมในกล่องไฮไลต์ (Quote Box):
                </label>
                <textarea
                  rows={2}
                  value={content?.narrative?.boxQuote || ''}
                  onChange={(e) => handleFieldChange('narrative.boxQuote', e.target.value)}
                  className="textarea textarea-bordered w-full rounded-2xl text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-base-content/80">
                    รูปภาพ Admin A (URL):
                  </label>
                  <input
                    type="text"
                    value={content?.narrative?.adminAImage || ''}
                    onChange={(e) => handleFieldChange('narrative.adminAImage', e.target.value)}
                    className="input input-bordered w-full rounded-xl text-xs font-mono"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-base-content/80">
                    รูปภาพ Admin B (URL):
                  </label>
                  <input
                    type="text"
                    value={content?.narrative?.adminBImage || ''}
                    onChange={(e) => handleFieldChange('narrative.adminBImage', e.target.value)}
                    className="input input-bordered w-full rounded-xl text-xs font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 5: LET'S TALK FORM */}
        {/* ======================================================== */}
        {activeTab === 'leadForm' && (
          <div className="zen-surface rounded-3xl p-6 sm:p-8 border border-base-300/60 shadow-xs space-y-6">
            <div className="border-b border-base-300/60 pb-4">
              <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-secondary" />
                <span>ข้อความแบบฟอร์มนัดหมายพูดคุย (Let's Talk Form)</span>
              </h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-base-content/80">Badge:</label>
                <input
                  type="text"
                  value={content?.leadForm?.badge || ''}
                  onChange={(e) => handleFieldChange('leadForm.badge', e.target.value)}
                  className="input input-bordered w-full rounded-xl text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-base-content/80">หัวข้อแบบฟอร์ม:</label>
                <input
                  type="text"
                  value={content?.leadForm?.title || ''}
                  onChange={(e) => handleFieldChange('leadForm.title', e.target.value)}
                  className="input input-bordered w-full rounded-xl text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-base-content/80">คำบรรยายแบบฟอร์ม:</label>
                <textarea
                  rows={2}
                  value={content?.leadForm?.subtitle || ''}
                  onChange={(e) => handleFieldChange('leadForm.subtitle', e.target.value)}
                  className="textarea textarea-bordered w-full rounded-2xl text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-base-content/80">
                  ข้อความบนปุ่มกดส่ง (Submit CTA):
                </label>
                <input
                  type="text"
                  value={content?.leadForm?.ctaButtonText || ''}
                  onChange={(e) => handleFieldChange('leadForm.ctaButtonText', e.target.value)}
                  className="input input-bordered w-full rounded-xl text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-base-content/80">
                    หัวข้อตอบกลับสำเร็จ (Success Title):
                  </label>
                  <input
                    type="text"
                    value={content?.leadForm?.successTitle || ''}
                    onChange={(e) => handleFieldChange('leadForm.successTitle', e.target.value)}
                    className="input input-bordered w-full rounded-xl text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-base-content/80">
                    ข้อความตอบกลับสำเร็จ (Success Message):
                  </label>
                  <input
                    type="text"
                    value={content?.leadForm?.successMessage || ''}
                    onChange={(e) => handleFieldChange('leadForm.successMessage', e.target.value)}
                    className="input input-bordered w-full rounded-xl text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 6: FOOTER & CONTACTS */}
        {/* ======================================================== */}
        {activeTab === 'footer' && (
          <div className="zen-surface rounded-3xl p-6 sm:p-8 border border-base-300/60 shadow-xs space-y-6">
            <div className="border-b border-base-300/60 pb-4">
              <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                <FileText className="w-5 h-5 text-secondary" />
                <span>ส่วนท้ายเว็บไซต์และข้อมูลติดต่อ (Footer & Contacts)</span>
              </h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-base-content/80">
                  ข้อความแนะนำแบรนด์ท้ายเว็บ:
                </label>
                <textarea
                  rows={2}
                  value={content?.footer?.aboutText || ''}
                  onChange={(e) => handleFieldChange('footer.aboutText', e.target.value)}
                  className="textarea textarea-bordered w-full rounded-2xl text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-base-content/80">คำคมท้ายเว็บ:</label>
                <input
                  type="text"
                  value={content?.footer?.quote || ''}
                  onChange={(e) => handleFieldChange('footer.quote', e.target.value)}
                  className="input input-bordered w-full rounded-xl text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-base-content/80">เบอร์โทรศัพท์:</label>
                  <input
                    type="text"
                    value={content?.footer?.phone || ''}
                    onChange={(e) => handleFieldChange('footer.phone', e.target.value)}
                    className="input input-bordered w-full rounded-xl text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-base-content/80">อีเมล:</label>
                  <input
                    type="text"
                    value={content?.footer?.email || ''}
                    onChange={(e) => handleFieldChange('footer.email', e.target.value)}
                    className="input input-bordered w-full rounded-xl text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-base-content/80">ที่อยู่/สถานที่:</label>
                  <input
                    type="text"
                    value={content?.footer?.location || ''}
                    onChange={(e) => handleFieldChange('footer.location', e.target.value)}
                    className="input input-bordered w-full rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-base-content/80">
                  ข้อความลิขสิทธิ์ (Copyright):
                </label>
                <input
                  type="text"
                  value={content?.footer?.copyright || ''}
                  onChange={(e) => handleFieldChange('footer.copyright', e.target.value)}
                  className="input input-bordered w-full rounded-xl text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-base-content/80">
                  ข้อสงวนสิทธิ์ทางกฎหมาย (Legal Disclaimer):
                </label>
                <textarea
                  rows={2}
                  value={content?.footer?.disclaimer || ''}
                  onChange={(e) => handleFieldChange('footer.disclaimer', e.target.value)}
                  className="textarea textarea-bordered w-full rounded-2xl text-xs"
                />
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 7: BACKUP & RESTORE */}
        {/* ======================================================== */}
        {activeTab === 'backup' && (
          <div className="space-y-6">
            <div className="zen-surface rounded-3xl p-6 sm:p-8 border border-base-300/60 shadow-xs space-y-6">
              <div className="border-b border-base-300/60 pb-4">
                <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                  <Download className="w-5 h-5 text-secondary" />
                  <span>ส่งออกข้อมูลการตั้งค่า (Export JSON)</span>
                </h3>
                <p className="text-xs zen-muted mt-0.5">
                  บันทึกข้อมูลและข้อความที่ปรับแต่งทั้งหมดเป็นไฟล์ JSON เพื่อสำรองหรือย้ายไปเครื่องอื่น
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleExport}
                  className="btn btn-primary btn-sm rounded-xl font-bold gap-2 shadow-xs"
                >
                  <Download className="w-4 h-4" />
                  <span>ดาวน์โหลดไฟล์ JSON ตอนนี้</span>
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(exportConfig());
                    showToast('คัดลอกข้อความ JSON ลงคลิปบอร์ดแล้ว', 'info');
                  }}
                  className="btn btn-outline btn-sm rounded-xl gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>คัดลอก JSON ลงคลิปบอร์ด</span>
                </button>
              </div>
            </div>

            <div className="zen-surface rounded-3xl p-6 sm:p-8 border border-base-300/60 shadow-xs space-y-4">
              <div className="border-b border-base-300/60 pb-4">
                <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                  <Upload className="w-5 h-5 text-secondary" />
                  <span>นำเข้าข้อมูลการตั้งค่า (Import JSON)</span>
                </h3>
                <p className="text-xs zen-muted mt-0.5">
                  วางเนื้อหา JSON ที่เคยสำรองไว้เพื่อเรียกคืนการตั้งค่าทั้งหมด
                </p>
              </div>

              <form onSubmit={handleImportSubmit} className="space-y-4">
                <textarea
                  rows={6}
                  value={importJsonText}
                  onChange={(e) => setImportJsonText(e.target.value)}
                  placeholder="วางโค้ด JSON การตั้งค่าที่นี่..."
                  className="textarea textarea-bordered w-full rounded-2xl font-mono text-xs"
                />

                {importError && (
                  <div className="p-3 rounded-xl bg-error/15 border border-error/30 text-error text-xs">
                    {importError}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-secondary btn-sm rounded-xl font-bold text-white gap-2 shadow-xs"
                >
                  <Upload className="w-4 h-4" />
                  <span>นำเข้าและปรับใช้ทันที</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Reset Confirmation Modal */}
        {showResetConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="zen-surface rounded-3xl border border-error/40 shadow-2xl p-6 sm:p-8 max-w-md w-full space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-error/15 text-error flex items-center justify-center">
                <RotateCcw className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-primary">ยืนยันการคืนค่าเริ่มต้นทั้งหมด?</h3>
              <p className="text-xs sm:text-sm text-base-content/80 leading-relaxed">
                ข้อความและข้อมูลปรับแต่งทั้งหมดจะถูกรีเซ็ตกลับเป็นค่าเริ่มต้นจากโรงงาน คุณต้องการดำเนินการต่อหรือไม่?
              </p>
              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-base-300/60">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="btn btn-ghost btn-sm rounded-xl text-xs"
                >
                  ยกเลิก
                </button>
                <button
                  onClick={handleResetAll}
                  className="btn btn-error btn-sm rounded-xl text-xs font-bold text-white shadow-xs"
                >
                  ใช่, คืนค่าเริ่มต้นทั้งหมด
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
