import { useState } from 'react';
import {
  ShieldCheck,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  XCircle,
  Eye,
  Search,
  Filter,
  Check,
  FileText,
  Image as ImageIcon,
  Move,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useToast } from '../../context/ToastContext';
import DashboardLayout from '../../components/common/DashboardLayout';
import FileUploadZone from '../../components/common/FileUploadZone';
import CoverFramePicker from '../../components/common/CoverFramePicker';
import FramedImage from '../../components/common/FramedImage';
import SecurityConfirmModal from '../../components/common/SecurityConfirmModal';
import QuickFrameModal from '../../components/admin/QuickFrameModal';
import InsuranceLivePreview from '../../components/admin/preview/InsuranceLivePreview';
import { logActivity } from '../../utils/activityLogger';
import { resolveAssetUrl } from '../../api';

export default function AdminInsurancePage() {
  const { insurancePlans, addInsurancePlan, updateInsurancePlan, deleteInsurancePlan } = useAuth();
  const { t } = useLanguage();
  const { showToast } = useToast();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('ALL');

  // Modal State for Add / Edit
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState('form'); // 'form' | 'preview'
  const [editingPlan, setEditingPlan] = useState(null);

  // 🖼️ Quick Frame Modal State
  const [quickFrameTarget, setQuickFrameTarget] = useState(null);
  const [quickFrameOpen, setQuickFrameOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: 'LIFE',
    category: 'HEALTH',
    categoryName: 'ประกันสุขภาพเหมาจ่าย',
    name: '',
    slug: '',
    tagline: '',
    coverageAmount: '',
    startingPrice: '',
    features: '',
    recommendedFor: '',
    description: '',
    imageUrl: '',
    brochureUrl: '',
    isActive: true,
  });

  // 🔐 Security 2-Step Verification Modal State (Before Active, Edit, Delete)
  const [securityModalOpen, setSecurityModalOpen] = useState(false);
  const [securityAction, setSecurityAction] = useState('delete'); // 'active' | 'edit_auth' | 'delete'
  const [pendingTarget, setPendingTarget] = useState(null);

  // Filter plans
  const filteredPlans = insurancePlans.filter((plan) => {
    const matchesSearch =
      plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (plan.tagline && plan.tagline.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (plan.categoryName && plan.categoryName.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === 'ALL' || plan.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleOpenAdd = () => {
    setEditingPlan(null);
    setFormData({
      type: 'LIFE',
      category: 'HEALTH',
      categoryName: 'ประกันสุขภาพเหมาจ่าย',
      name: '',
      slug: '',
      tagline: '',
      coverageAmount: '',
      startingPrice: '',
      features: '',
      recommendedFor: '',
      description: '',
      imageUrl: '',
      brochureUrl: '',
      isActive: true,
    });
    setModalTab('form');
    setModalOpen(true);
  };

  // 🖼️ Quick Cover Frame Handlers
  const handleOpenQuickFrame = (plan) => {
    setQuickFrameTarget(plan);
    setQuickFrameOpen(true);
  };

  const handleSaveQuickFrame = (framedUrl) => {
    if (!quickFrameTarget) return;
    updateInsurancePlan(quickFrameTarget.id, { imageUrl: framedUrl });
    logActivity({
      actionType: 'UPDATE',
      entityType: 'INSURANCE',
      targetTitle: quickFrameTarget.name,
      details: 'ปรับแต่งเฟรมและจุดโฟกัสภาพปกแผนประกันแบบด่วน',
    });
    showToast(`อัปเดตเฟรมภาพปกแผนประกัน "${quickFrameTarget.name}" สำเร็จ`, 'success');
  };

  // 🔐 Step 1: Trigger Security PIN BEFORE Toggling Active
  const handleRequestToggleActive = (plan) => {
    setPendingTarget(plan);
    setSecurityAction('active');
    setSecurityModalOpen(true);
  };

  // 🔐 Step 1: Trigger Security PIN BEFORE Opening Edit Screen
  const handleRequestEdit = (plan) => {
    setPendingTarget(plan);
    setSecurityAction('edit_auth');
    setSecurityModalOpen(true);
  };

  // 🔐 Step 1: Trigger Security PIN BEFORE Deleting Plan
  const handleRequestDelete = (plan) => {
    setPendingTarget(plan);
    setSecurityAction('delete');
    setSecurityModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showToast('กรุณาระบุชื่อแผนประกัน', 'warning');
      return;
    }

    const payload = {
      ...formData,
      features: formData.features
        ? JSON.stringify(formData.features.split('\n').map((s) => s.trim()).filter(Boolean))
        : JSON.stringify([]),
    };

    try {
      if (editingPlan) {
        await updateInsurancePlan(editingPlan.id, payload);
        logActivity({
          actionType: 'UPDATE',
          entityType: 'INSURANCE_PLAN',
          targetTitle: formData.name,
          details: `บันทึกการแก้ไขข้อมูลแผนประกัน: วงเงิน ${formData.coverageAmount || '-'} • ราคา ${formData.startingPrice || '-'}`,
          securityPin: 'VERIFIED',
        });
        showToast(`อัปเดตแผน "${formData.name}" เรียบร้อยแล้ว`, 'success');
      } else {
        await addInsurancePlan(payload);
        logActivity({
          actionType: 'CREATE',
          entityType: 'INSURANCE_PLAN',
          targetTitle: formData.name,
          details: `สร้างแผนประกันภัยใหม่: ${formData.categoryName || formData.category}`,
          securityPin: 'AUTO',
        });
        showToast(`เพิ่มแผนใหม่ "${formData.name}" เรียบร้อยแล้ว`, 'success');
      }
      setModalOpen(false);
      setEditingPlan(null);
      setPendingTarget(null);
    } catch {
      showToast('เกิดข้อผิดพลาดในการบันทึกข้อมูล', 'error');
    }
  };

  // 🔐 Execute verified action upon matching 4-digit security code
  const handleConfirmSecurityAction = async (pin) => {
    if (!pendingTarget) return;

    if (securityAction === 'active') {
      const newStatus = !pendingTarget.isActive;
      try {
        await updateInsurancePlan(pendingTarget.id, { isActive: newStatus });
        logActivity({
          actionType: 'STATUS_CHANGE',
          entityType: 'INSURANCE_PLAN',
          targetTitle: pendingTarget.name,
          details: `ยืนยัน PIN (${pin}) สลับสถานะแผนประกันเป็น: ${newStatus ? 'เปิดใช้งาน (Active)' : 'ปิดใช้งาน (Inactive)'}`,
          securityPin: pin,
        });
        showToast(
          newStatus ? `ยืนยัน PIN สำเร็จ: เปิดใช้งานแผน "${pendingTarget.name}" แล้ว` : `ยืนยัน PIN สำเร็จ: ปิดใช้งานแผน "${pendingTarget.name}" แล้ว`,
          'success'
        );
        setSecurityModalOpen(false);
        setPendingTarget(null);
      } catch {
        showToast('ไม่สามารถอัปเดตสถานะได้', 'error');
      }
    } else if (securityAction === 'edit_auth') {
      // 🔐 PIN Verified -> Open Edit Modal
      setEditingPlan(pendingTarget);
      let parsedFeatures = pendingTarget.features || '';
      try {
        const arr = JSON.parse(pendingTarget.features);
        if (Array.isArray(arr)) parsedFeatures = arr.join('\n');
      } catch {
        // Keep as string
      }

      setFormData({
        type: pendingTarget.type,
        category: pendingTarget.category,
        categoryName: pendingTarget.categoryName,
        name: pendingTarget.name,
        slug: pendingTarget.slug,
        tagline: pendingTarget.tagline || '',
        coverageAmount: pendingTarget.coverageAmount || '',
        startingPrice: pendingTarget.startingPrice || '',
        features: parsedFeatures,
        recommendedFor: pendingTarget.recommendedFor || '',
        description: pendingTarget.description || '',
        imageUrl: pendingTarget.imageUrl || '',
        brochureUrl: pendingTarget.brochureUrl || '',
        isActive: pendingTarget.isActive ?? true,
      });

      logActivity({
        actionType: 'UPDATE_AUTH',
        entityType: 'INSURANCE_PLAN',
        targetTitle: pendingTarget.name,
        details: `ยืนยันรหัส PIN (${pin}) สำเร็จ เข้าสู่หน้าจอแก้ไขแผนประกัน`,
        securityPin: pin,
      });
      setSecurityModalOpen(false);
      setModalTab('form');
      setModalOpen(true);
      showToast(`รหัสถูกต้อง! เปิดสิทธิ์แก้ไข "${pendingTarget.name}"`, 'success');
    } else if (securityAction === 'delete') {
      try {
        await deleteInsurancePlan(pendingTarget.id);
        logActivity({
          actionType: 'DELETE',
          entityType: 'INSURANCE_PLAN',
          targetTitle: pendingTarget.name,
          details: `ยืนยัน PIN (${pin}) ลบแผนประกันภัย "${pendingTarget.name}" ออกจากระบบถาวร`,
          securityPin: pin,
        });
        showToast(`ลบแผน "${pendingTarget.name}" สำเร็จ`, 'success');
        setSecurityModalOpen(false);
        setPendingTarget(null);
      } catch {
        showToast('ไม่สามารถลบแผนประกันได้', 'error');
      }
    }
  };

  return (
    <DashboardLayout type="admin">
      <div className="space-y-6 w-full">
        {/* Header Title & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-base-300 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-secondary">
              Insurance Plans CMS
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-primary">
              จัดการแผนประกันภัย & หมวดหมู่
            </h1>
            <p className="text-sm text-base-content/70">
              ควบคุม เพิ่ม ลบ และปรับปรุงเงื่อนไขความคุ้มครองแผนประกันในฐานข้อมูล MySQL
            </p>
          </div>

          <button
            onClick={handleOpenAdd}
            className="btn btn-primary rounded-xl font-bold gap-2 text-white shadow-md self-start sm:self-auto"
          >
            <Plus className="w-5 h-5" />
            <span>เพิ่มแผนประกันใหม่</span>
          </button>
        </div>

        {/* Toolbar: Search & Filter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-base-content/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="ค้นหาชื่อแผน หรือหมวดหมู่..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input input-bordered w-full pl-10 rounded-xl bg-base-100 text-sm focus:input-primary"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-base-content/60" />
            <div className="join">
              <button
                onClick={() => setFilterType('ALL')}
                className={`btn btn-sm join-item font-bold ${
                  filterType === 'ALL' ? 'btn-primary text-white' : 'btn-ghost'
                }`}
              >
                ทั้งหมด ({insurancePlans.length})
              </button>
              <button
                onClick={() => setFilterType('LIFE')}
                className={`btn btn-sm join-item font-bold ${
                  filterType === 'LIFE' ? 'btn-primary text-white' : 'btn-ghost'
                }`}
              >
                ชีวิต & สุขภาพ ({insurancePlans.filter((p) => p.type === 'LIFE').length})
              </button>
              <button
                onClick={() => setFilterType('NON_LIFE')}
                className={`btn btn-sm join-item font-bold ${
                  filterType === 'NON_LIFE' ? 'btn-primary text-white' : 'btn-ghost'
                }`}
              >
                วินาศภัย & รถ ({insurancePlans.filter((p) => p.type === 'NON_LIFE').length})
              </button>
            </div>
          </div>
        </div>

        {/* Plans Table */}
        <div
          tabIndex={0}
          role="region"
          aria-label="ตารางรายการแผนประกัน AIA"
          className="zen-surface rounded-3xl p-4 sm:p-5 border border-base-300/60 shadow-xs overflow-x-auto"
        >
          <table className="table table-zebra table-sm w-full text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-base-300 text-base-content/70">
                <th className="min-w-[200px]">แผนประกันภัย</th>
                <th>หมวดหมู่</th>
                <th>วงเงินคุ้มครอง</th>
                <th>ราคาเริ่มต้น</th>
                <th className="text-center whitespace-nowrap">สถานะ</th>
                <th className="text-right whitespace-nowrap">การจัดการ</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlans.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-base-content/60">
                    ไม่พบแผนประกันที่ตรงกับเงื่อนไขการค้นหา
                  </td>
                </tr>
              ) : (
                filteredPlans.map((plan) => (
                  <tr key={plan.id} className="hover:bg-base-200/50">
                    <td className="max-w-[260px]">
                      <div className="flex items-center gap-2.5 min-w-0">
                        {plan.imageUrl ? (
                          <div className="w-11 h-11 rounded-xl overflow-hidden bg-base-200 border border-base-300 shrink-0">
                            <FramedImage
                              src={plan.imageUrl}
                              alt={plan.name}
                              className="w-full h-full object-cover"
                              fallback="https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400&auto=format&fit=crop&q=80"
                            />
                          </div>
                        ) : (
                          <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0">
                            <ShieldCheck className="w-5 h-5" />
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="font-bold text-primary flex flex-wrap items-center gap-1.5">
                            <span className="leading-snug">{plan.name}</span>
                            {plan.brochureUrl && (
                              <a
                                href={resolveAssetUrl(plan.brochureUrl)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="badge badge-secondary badge-outline text-[10px] font-bold py-0.5 px-1.5 gap-1 shrink-0 hover:bg-secondary hover:text-white transition-colors"
                                title="คลิกเพื่อเปิดดูไฟล์โบรชัวร์ PDF"
                              >
                                <FileText className="w-3 h-3" />
                                PDF
                              </a>
                            )}
                          </div>
                          {plan.tagline && (
                            <div className="text-xs text-base-content/60 line-clamp-1 mt-0.5">
                              {plan.tagline}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-base-200/80 border border-base-300 text-base-content/80">
                        {plan.categoryName}
                      </span>
                    </td>
                    <td className="font-bold text-primary max-w-[160px] leading-snug">
                      {plan.coverageAmount || '-'}
                    </td>
                    <td className="font-black text-secondary max-w-[130px] leading-snug">
                      {plan.startingPrice || '-'}
                    </td>
                    <td className="whitespace-nowrap text-center">
                      <button
                        type="button"
                        onClick={() => handleRequestToggleActive(plan)}
                        className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all shadow-xs hover:shadow-sm cursor-pointer select-none ${
                          plan.isActive
                            ? 'bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/25 border border-emerald-500/30 dark:bg-emerald-500/20 dark:text-emerald-300'
                            : 'bg-rose-500/15 text-rose-700 hover:bg-rose-500/25 border border-rose-500/30 dark:bg-rose-500/20 dark:text-rose-300'
                        }`}
                        title="คลิกเพื่อสลับสถานะเปิด/ปิด (ต้องยืนยันรหัสความปลอดภัย)"
                      >
                        {plan.isActive ? (
                          <>
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                            <span>เปิดใช้งาน</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400 shrink-0" />
                            <span>ปิดใช้งาน</span>
                          </>
                        )}
                      </button>
                    </td>
                    <td className="text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleOpenQuickFrame(plan)}
                          className="btn btn-ghost btn-xs text-secondary hover:bg-secondary/15 gap-1 rounded-lg border border-secondary/30"
                          title="ปรับแต่งเฟรมและจุดโฟกัสภาพปกแผนประกัน"
                        >
                          <Move className="w-3.5 h-3.5" />
                          <span className="font-bold text-[11px]">ปรับเฟรมปก</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRequestEdit(plan)}
                          className="btn btn-ghost btn-circle btn-sm text-primary hover:bg-primary/10"
                          title="ยืนยันรหัสเพื่อแก้ไขแผน"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRequestDelete(plan)}
                          className="btn btn-ghost btn-circle btn-sm text-error hover:bg-error/10"
                          title="ยืนยันรหัสเพื่อลบแผน"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Add / Edit Plan Modal */}
        {modalOpen && (
          <div role="dialog" aria-modal="true" className="modal modal-open z-[60] animate-fadeIn">
            <div className={`modal-box rounded-3xl liquid-glass-solid shadow-2xl p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto transition-all duration-300 ${
              modalTab === 'preview' ? 'max-w-4xl' : 'max-w-2xl'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-base-300 pb-3">
                <div>
                  <h3 className="text-xl font-black text-primary">
                    {editingPlan ? 'แก้ไขแผนประกันภัย' : 'เพิ่มแผนประกันภัยใหม่'}
                  </h3>
                  <p className="text-xs text-base-content/65">
                    {modalTab === 'preview'
                      ? 'ตรวจสอบหน้าตาแผนประกันจริงแบบเดียวกับที่ผู้ชมเว็บไซต์เห็น ก่อนกดบันทึก'
                      : 'กรอกรายละเอียดและปรับแต่งเฟรมรูปภาพหน้าปก'}
                  </p>
                </div>

                {/* View Mode Switcher Tabs */}
                <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-base-200/80 border border-base-300/40">
                  <button
                    type="button"
                    onClick={() => setModalTab('form')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      modalTab === 'form'
                        ? 'bg-primary text-white shadow-xs'
                        : 'text-base-content/70 hover:text-primary'
                    }`}
                  >
                    📝 ฟอร์มข้อมูล
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalTab('preview')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      modalTab === 'preview'
                        ? 'bg-secondary text-secondary-content shadow-xs font-black'
                        : 'text-base-content/70 hover:text-secondary'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>👁️ ตัวอย่างแบบผู้ชม</span>
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {modalTab === 'form' ? (
                  <>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                  {/* Type */}
                  <div className="flex flex-col gap-1.5 w-full">
                    <label className="text-xs font-bold text-base-content/80">ประเภทประกัน</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="select select-bordered w-full rounded-xl text-sm bg-base-100"
                    >
                      <option value="LIFE">ชีวิต, สุขภาพ, อุบัติเหตุ, โรคร้าย & เกษียณ (AIA)</option>
                      <option value="NON_LIFE">วินาศภัย รถยนต์ & ทรัพย์สิน (Non-Life)</option>
                    </select>
                  </div>

                  {/* Category Key */}
                  <div className="flex flex-col gap-1.5 w-full">
                    <label className="text-xs font-bold text-base-content/80">รหัสหมวดหมู่ (Filter Key)</label>
                    <select
                      value={formData.category}
                      onChange={(e) => {
                        const nextCat = e.target.value;
                        const defaultLabels = {
                          HEALTH: 'ประกันสุขภาพเหมาจ่าย',
                          CRITICAL_ILLNESS: 'ประกันโรคร้ายแรง',
                          ACCIDENT: 'ประกันอุบัติเหตุส่วนบุคคล (AIA PA)',
                          WHOLE_LIFE: 'ประกันชีวิตตลอดชีพ & ส่งต่อมรดก',
                          RETIREMENT: 'วางแผนเกษียณ & บำนาญ',
                          INVESTMENT_LINKED: 'ประกันชีวิตควบการลงทุน (Unit Linked)',
                        };
                        setFormData({
                          ...formData,
                          category: nextCat,
                          categoryName: defaultLabels[nextCat] || formData.categoryName,
                        });
                      }}
                      className="select select-bordered w-full rounded-xl text-sm bg-base-100"
                    >
                      <option value="HEALTH">HEALTH — สุขภาพเหมาจ่าย</option>
                      <option value="CRITICAL_ILLNESS">CRITICAL_ILLNESS — โรคร้ายแรง</option>
                      <option value="ACCIDENT">ACCIDENT — อุบัติเหตุส่วนบุคคล (AIA PA)</option>
                      <option value="WHOLE_LIFE">WHOLE_LIFE — ตลอดชีพ & มรดก</option>
                      <option value="RETIREMENT">RETIREMENT — เกษียณ & บำนาญ</option>
                      <option value="INVESTMENT_LINKED">INVESTMENT_LINKED — Unit Linked</option>
                    </select>
                  </div>

                  {/* Category Name */}
                  <div className="flex flex-col gap-1.5 w-full">
                    <label className="text-xs font-bold text-base-content/80">ชื่อหมวดหมู่ที่แสดง</label>
                    <input
                      type="text"
                      required
                      placeholder="เช่น ประกันสุขภาพเหมาจ่าย"
                      value={formData.categoryName}
                      onChange={(e) => setFormData({ ...formData, categoryName: e.target.value })}
                      className="input input-bordered w-full rounded-xl text-sm bg-base-100"
                    />
                  </div>
                </div>

                {/* Plan Name */}
                <div className="flex flex-col gap-1.5 w-full">
                  <label className="text-xs font-bold text-base-content/80">
                    ชื่อแผนประกัน <span className="text-error">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="เช่น AIA Health Happy เหมาเบิ้ลคุ้ม"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input input-bordered w-full rounded-xl text-sm bg-base-100"
                  />
                </div>

                {/* Tagline */}
                <div className="flex flex-col gap-1.5 w-full">
                  <label className="text-xs font-bold text-base-content/80">คำโปรย / จุดขายสั้นๆ</label>
                  <input
                    type="text"
                    placeholder="เช่น เหมาจ่ายค่ารักษาพยาบาลสูงสุด 25 ล้านบาท/ปี"
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    className="input input-bordered w-full rounded-xl text-sm bg-base-100"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                  {/* Coverage */}
                  <div className="flex flex-col gap-1.5 w-full">
                    <label className="text-xs font-bold text-base-content/80">วงเงินความคุ้มครอง</label>
                    <input
                      type="text"
                      placeholder="เช่น สูงสุด 25,000,000 บาท/ปี"
                      value={formData.coverageAmount}
                      onChange={(e) => setFormData({ ...formData, coverageAmount: e.target.value })}
                      className="input input-bordered w-full rounded-xl text-sm bg-base-100"
                    />
                  </div>

                  {/* Price */}
                  <div className="flex flex-col gap-1.5 w-full">
                    <label className="text-xs font-bold text-base-content/80">ราคาเริ่มต้น</label>
                    <input
                      type="text"
                      placeholder="เช่น เริ่มต้น 1,850 บ./เดือน"
                      value={formData.startingPrice}
                      onChange={(e) => setFormData({ ...formData, startingPrice: e.target.value })}
                      className="input input-bordered w-full rounded-xl text-sm bg-base-100"
                    />
                  </div>
                </div>

                {/* Features (Multi-line) */}
                <div className="flex flex-col gap-1.5 w-full">
                  <label className="text-xs font-bold text-base-content/80">
                    จุดเด่นความคุ้มครอง (พิมพ์ 1 ข้อต่อ 1 บรรทัด)
                  </label>
                  <textarea
                    rows={4}
                    placeholder="เหมาจ่ายค่ารักษาพยาบาล IPD ตามจริง&#10;เบิ้ลวงเงินเป็น 2 เท่าเมื่อพบโรคร้ายแรง&#10;ลดหย่อนภาษีได้สูงสุด 25,000 บาท"
                    value={formData.features}
                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                    className="textarea textarea-bordered w-full rounded-xl text-sm bg-base-100 leading-relaxed"
                  ></textarea>
                </div>

                {/* Recommended For */}
                <div className="flex flex-col gap-1.5 w-full">
                  <label className="text-xs font-bold text-base-content/80">เหมาะสำหรับใคร</label>
                  <input
                    type="text"
                    placeholder="เช่น คนวัยทำงาน, เจ้าของธุรกิจ, หัวหน้าครอบครัว"
                    value={formData.recommendedFor}
                    onChange={(e) => setFormData({ ...formData, recommendedFor: e.target.value })}
                    className="input input-bordered w-full rounded-xl text-sm bg-base-100"
                  />
                </div>

                {/* Description */}
                <div className="flex flex-col gap-1.5 w-full">
                  <label className="text-xs font-bold text-base-content/80">รายละเอียดเชิงลึก</label>
                  <textarea
                    rows={3}
                    placeholder="รายละเอียดเงื่อนไข สิทธิประโยชน์ หรือข้อยกเว้นทั่วไป"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="textarea textarea-bordered w-full rounded-xl text-sm bg-base-100 leading-relaxed"
                  ></textarea>
                </div>

                {/* Media & Documents Upload: Cover Image & PDF Brochure */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full p-4 rounded-2xl bg-base-200/40 border border-base-300/60">
                  <FileUploadZone
                    label="รูปภาพหน้าปกแผนประกัน"
                    accept="image"
                    value={formData.imageUrl}
                    onChange={(url) => setFormData((prev) => ({ ...prev, imageUrl: url }))}
                    helpText="ภาพตัวอย่างแผนประกันภัย (JPG, PNG, WebP)"
                  />
                  <FileUploadZone
                    label="เอกสารโบรชัวร์ความคุ้มครอง (PDF)"
                    accept="pdf"
                    value={formData.brochureUrl}
                    onChange={(url) => setFormData((prev) => ({ ...prev, brochureUrl: url }))}
                    helpText="ไฟล์ PDF สรุปเงื่อนไขและผลประโยชน์"
                  />
                </div>

                {/* Interactive Cover Framing Picker */}
                <CoverFramePicker
                  value={formData.imageUrl}
                  onChange={(framedUrl) => setFormData((prev) => ({ ...prev, imageUrl: framedUrl }))}
                  label="🖼️ ปรับแต่งเฟรมหน้าปกแผนประกัน (จุดโฟกัส / ระยะซูม 16:9)"
                />

                {/* Status Toggle */}
                <div className="pt-2">
                  <label className="inline-flex items-center gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="checkbox checkbox-primary rounded-lg"
                    />
                    <span className="text-sm font-bold text-base-content">
                      เปิดใช้งานแผนนี้บนหน้าเว็บไซต์
                    </span>
                  </label>
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <InsuranceLivePreview plan={formData} />
              </div>
            )}

            <div className="modal-action pt-4 border-t border-base-300 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="btn btn-ghost rounded-xl font-bold"
              >
                ยกเลิก
              </button>

              <div className="flex items-center gap-2">
                {modalTab === 'form' ? (
                  <button
                    type="button"
                    onClick={() => setModalTab('preview')}
                    className="btn btn-outline btn-secondary rounded-xl font-bold gap-1.5"
                  >
                    <Eye className="w-4 h-4" />
                    <span>ดูตัวอย่างแบบผู้ชม (Preview)</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setModalTab('form')}
                    className="btn btn-outline rounded-xl font-bold gap-1.5"
                  >
                    <span>← กลับไปฟอร์มแก้ไข</span>
                  </button>
                )}

                <button
                  type="submit"
                  className="btn btn-primary rounded-xl font-bold text-white shadow-md"
                >
                  {editingPlan ? 'ยืนยัน & บันทึกการแก้ไข' : 'บันทึก & เผยแพร่แผนประกัน'}
                </button>
              </div>
            </div>
              </form>
            </div>
            <div
              className="modal-backdrop bg-black/50 backdrop-blur-xs"
              onClick={() => setModalOpen(false)}
            />
          </div>
        )}

        {/* 🔐 Security 2-Step Verification Modal for Edit (Final Check) and Delete */}
        <SecurityConfirmModal
          isOpen={securityModalOpen}
          action={securityAction}
          itemName={pendingTarget?.name}
          title={
            securityAction === 'delete'
              ? `ยืนยันการลบแผนประกัน "${pendingTarget?.name}"`
              : securityAction === 'active'
              ? `ยืนยันเปลี่ยนสถานะแผน "${pendingTarget?.name}"`
              : `ยืนยันรหัสความปลอดภัยเพื่อแก้ไขแผน "${pendingTarget?.name}"`
          }
          warningText={
            securityAction === 'delete'
              ? 'การลบแผนประกันนี้จะส่งผลให้ไม่ปรากฏบนหน้าเว็บอีกต่อไป กรุณากรอกรหัส 4 หลักเพื่อยืนยันความปลอดภัย'
              : undefined
          }
          summaryList={
            securityAction === 'active'
              ? [
                  { label: 'แผนประกัน', value: pendingTarget?.name },
                  {
                    label: 'สถานะปัจจุบัน',
                    value: pendingTarget?.isActive ? 'เปิดใช้งาน (Active)' : 'ปิดใช้งาน (Inactive)',
                  },
                  {
                    label: 'สถานะใหม่ที่จะเปลี่ยน',
                    value: pendingTarget?.isActive ? 'ปิดใช้งาน (Inactive)' : 'เปิดใช้งาน (Active)',
                  },
                ]
              : securityAction === 'edit_auth'
              ? [
                  { label: 'แผนประกัน', value: pendingTarget?.name },
                  { label: 'หมวดหมู่', value: pendingTarget?.categoryName || pendingTarget?.type },
                  { label: 'วงเงินความคุ้มครอง', value: pendingTarget?.coverageAmount || '-' },
                  { label: 'ราคาเริ่มต้น', value: pendingTarget?.startingPrice || '-' },
                ]
              : []
          }
          confirmButtonText={
            securityAction === 'delete'
              ? 'ยืนยันการลบข้อมูลถาวร'
              : securityAction === 'active'
              ? 'ยืนยันเปลี่ยนสถานะ'
              : 'ยืนยันรหัสเพื่อเข้าแก้ไข'
          }
          onConfirm={handleConfirmSecurityAction}
          onClose={() => {
            setSecurityModalOpen(false);
            setPendingTarget(null);
          }}
        />

        {/* 🖼️ Quick Cover Frame Modal */}
        <QuickFrameModal
          isOpen={quickFrameOpen}
          onClose={() => {
            setQuickFrameOpen(false);
            setQuickFrameTarget(null);
          }}
          itemTitle={quickFrameTarget?.name}
          imageUrl={quickFrameTarget?.imageUrl}
          onSave={handleSaveQuickFrame}
        />
      </div>
    </DashboardLayout>
  );
}
