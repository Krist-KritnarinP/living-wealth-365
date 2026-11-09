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
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useToast } from '../../context/ToastContext';
import DashboardLayout from '../../components/common/DashboardLayout';
import FileUploadZone from '../../components/common/FileUploadZone';
import SecurityConfirmModal from '../../components/common/SecurityConfirmModal';
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
  const [editingPlan, setEditingPlan] = useState(null);
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
    setModalOpen(true);
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

        {/* Mobile & Tablet Card View (Visible below lg) */}
        <div className="block lg:hidden space-y-4">
          {filteredPlans.length === 0 ? (
            <div className="text-center py-12 text-base-content/60 zen-surface rounded-3xl border border-base-300">
              ไม่พบแผนประกันที่ตรงกับเงื่อนไขการค้นหา
            </div>
          ) : (
            filteredPlans.map((plan) => (
              <div
                key={plan.id}
                className="zen-surface rounded-2xl border border-base-300 p-4 space-y-3.5 shadow-xs"
              >
                <div className="flex items-start gap-3">
                  {plan.imageUrl ? (
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-base-200 border border-base-300 shrink-0">
                      <img
                        src={resolveAssetUrl(plan.imageUrl)}
                        alt={plan.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-8 h-8" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-base-200 border border-base-300 text-base-content/80">
                        {plan.categoryName}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRequestToggleActive(plan)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          plan.isActive
                            ? 'bg-emerald-500/15 text-emerald-700 border border-emerald-500/30'
                            : 'bg-rose-500/15 text-rose-700 border border-rose-500/30'
                        }`}
                      >
                        {plan.isActive ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}
                      </button>
                    </div>
                    <h4 className="font-bold text-primary text-base mt-1 line-clamp-1">
                      {plan.name}
                    </h4>
                    {plan.tagline && (
                      <p className="text-xs text-base-content/60 line-clamp-1 mt-0.5">
                        {plan.tagline}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-base-200/50 text-xs">
                  <div>
                    <span className="text-base-content/60 block text-[10px]">วงเงินคุ้มครอง</span>
                    <span className="font-bold text-primary truncate block">{plan.coverageAmount || '-'}</span>
                  </div>
                  <div>
                    <span className="text-base-content/60 block text-[10px]">ราคาเริ่มต้น</span>
                    <span className="font-black text-secondary truncate block">{plan.startingPrice || '-'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1 border-t border-base-300/60">
                  <button
                    type="button"
                    onClick={() => handleRequestEdit(plan)}
                    className="btn btn-sm btn-primary flex-1 rounded-xl font-bold gap-1.5 text-white"
                  >
                    <Edit2 className="w-4 h-4" />
                    <span>แก้ไขแผน</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRequestDelete(plan)}
                    className="btn btn-sm btn-outline btn-error rounded-xl font-bold gap-1.5 px-4"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>ลบ</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop Plans Table */}
        <div className="hidden lg:block zen-surface rounded-3xl border border-base-300 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr className="bg-base-200/50 text-base-content/80 text-xs uppercase font-black">
                  <th className="py-4 pl-6 min-w-[240px]">แผนประกันภัย</th>
                  <th className="whitespace-nowrap">หมวดหมู่</th>
                  <th className="whitespace-nowrap">วงเงินคุ้มครอง</th>
                  <th className="whitespace-nowrap">ราคาเริ่มต้น</th>
                  <th className="whitespace-nowrap text-center min-w-[130px]">สถานะ</th>
                  <th className="text-right pr-6 whitespace-nowrap min-w-[170px] sticky right-0 bg-base-200 z-10 shadow-[-6px_0_10px_-2px_rgba(0,0,0,0.06)]">
                    การจัดการ
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-base-300/40 text-sm">
                {filteredPlans.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-base-content/60">
                      ไม่พบแผนประกันที่ตรงกับเงื่อนไขการค้นหา
                    </td>
                  </tr>
                ) : (
                  filteredPlans.map((plan) => (
                    <tr key={plan.id} className="hover:bg-base-200/30 transition-colors">
                      <td className="py-4 pl-6">
                        <div className="flex items-center gap-3">
                          {plan.imageUrl ? (
                            <div className="w-12 h-12 rounded-xl overflow-hidden bg-base-200 border border-base-300 shrink-0">
                              <img
                                src={resolveAssetUrl(plan.imageUrl)}
                                alt={plan.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0">
                              <ShieldCheck className="w-6 h-6" />
                            </div>
                          )}
                          <div className="min-w-0">
                            <div className="font-bold text-primary text-base flex items-center gap-2">
                              <span className="truncate">{plan.name}</span>
                              {plan.brochureUrl && (
                                <a
                                  href={resolveAssetUrl(plan.brochureUrl)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="badge badge-secondary badge-outline text-[10px] font-bold py-1 px-2 gap-1 shrink-0 hover:bg-secondary hover:text-white transition-colors"
                                  title="คลิกเพื่อเปิดดูไฟล์โบรชัวร์ PDF"
                                >
                                  <FileText className="w-3 h-3" />
                                  PDF
                                </a>
                              )}
                            </div>
                            {plan.tagline && (
                              <div className="text-xs text-base-content/60 line-clamp-1 max-w-sm mt-0.5">
                                {plan.tagline}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-base-200/80 border border-base-300 text-base-content/80 whitespace-nowrap">
                          {plan.categoryName}
                        </span>
                      </td>
                      <td className="whitespace-nowrap font-bold text-primary">
                        {plan.coverageAmount || '-'}
                      </td>
                      <td className="whitespace-nowrap font-black text-secondary">
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
                      <td className="text-right pr-6 whitespace-nowrap sticky right-0 bg-base-100 z-10 shadow-[-6px_0_10px_-2px_rgba(0,0,0,0.06)]">
                        <div className="inline-flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => handleRequestEdit(plan)}
                            className="btn btn-xs sm:btn-sm btn-primary rounded-xl font-bold gap-1 text-white shadow-xs"
                            title="ยืนยันรหัสเพื่อแก้ไขแผน"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                            <span>แก้ไข</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRequestDelete(plan)}
                            className="btn btn-xs sm:btn-sm btn-outline btn-error rounded-xl font-bold gap-1"
                            title="ยืนยันรหัสเพื่อลบแผน"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>ลบ</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add / Edit Plan Modal */}
        {modalOpen && (
          <div role="dialog" aria-modal="true" className="modal modal-open z-50 animate-fadeIn">
            <div className="modal-box rounded-3xl zen-surface border border-base-300 shadow-2xl max-w-2xl p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto">
              <h3 className="text-xl font-black text-primary border-b border-base-300 pb-3">
                {editingPlan ? 'แก้ไขแผนประกันภัย' : 'เพิ่มแผนประกันภัยใหม่'}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                  {/* Type */}
                  <div className="flex flex-col gap-1.5 w-full">
                    <label className="text-xs font-bold text-base-content/80">ประเภทประกัน</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="select select-bordered w-full rounded-xl text-sm bg-base-100"
                    >
                      <option value="LIFE">ชีวิต, สุขภาพ, โรคร้าย & เกษียณ (Life)</option>
                      <option value="NON_LIFE">วินาศภัย รถยนต์ & ทรัพย์สิน (Non-Life)</option>
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

                <div className="modal-action pt-4 border-t border-base-300 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="btn btn-ghost rounded-xl font-bold"
                  >
                    ยกเลิก
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary rounded-xl font-bold text-white shadow-md"
                  >
                    บันทึกข้อมูล
                  </button>
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
      </div>
    </DashboardLayout>
  );
}
