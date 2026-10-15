import { useState } from 'react';
import { Plus, Trash2, CheckCircle2, XCircle, Shield, Edit2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useToast } from '../../context/ToastContext';
import DashboardLayout from '../../components/common/DashboardLayout';
import ConfirmModal from '../../components/common/ConfirmModal';
import FileUploadZone from '../../components/common/FileUploadZone';
import { resolveAssetUrl } from '../../api';

export default function AdminProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useAuth();
  const { t } = useLanguage();
  const { showToast } = useToast();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    category: 'อำนาจ & ความมั่งคั่ง',
    price: '1,990',
    stoneType: '',
    aspect: 'SCIENCE',
    chakra: '',
    mineralFormula: '',
    description: '',
    imageUrl: '',
    dayOfWeek: 'วันพฤหัสบดี, วันจันทร์',
  });

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category: 'อำนาจ & ความมั่งคั่ง',
      price: '1,990',
      stoneType: '',
      aspect: 'SCIENCE',
      chakra: '',
      mineralFormula: '',
      description: '',
      imageUrl: '',
      dayOfWeek: 'วันพฤหัสบดี, วันจันทร์',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (prod) => {
    setEditingProduct(prod);
    setFormData({
      name: prod.name || '',
      category: prod.category || 'อำนาจ & ความมั่งคั่ง',
      price: prod.price || '',
      stoneType: prod.stoneType || '',
      aspect: prod.aspect || 'SCIENCE',
      chakra: prod.chakra || '',
      mineralFormula: prod.mineralFormula || '',
      description: prod.description || '',
      imageUrl: prod.imageUrl || '',
      dayOfWeek: prod.dayOfWeek || prod.dayMatch || 'วันพฤหัสบดี, วันจันทร์',
    });
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct(editingProduct.id, formData);
      showToast(`อัปเดตสินค้า "${formData.name}" เรียบร้อยแล้ว!`, 'success');
    } else {
      addProduct(formData);
      showToast('เพิ่มสินค้าหินมงคลใหม่สำเร็จ!', 'success');
    }
    setFormData({
      name: '',
      category: 'ดึงดูดทรัพย์ & โชคลาภ',
      price: '1,990',
      description: '',
      imageUrl: '',
      dayMatch: 'ทุกวันเกิด',
      element: 'ธาตุทอง',
    });
    setEditingProduct(null);
    setModalOpen(false);
  };

  const handleToggleActive = (prod) => {
    updateProduct(prod.id, { isActive: !prod.isActive });
    showToast(
      prod.isActive ? 'ซ่อนสินค้าจากหน้าเว็บแล้ว' : 'เปิดแสดงสินค้าบนหน้าเว็บแล้ว!',
      'info'
    );
  };

  const handleConfirmDelete = () => {
    if (deleteTarget) {
      deleteProduct(deleteTarget.id);
      showToast(t('deleteSuccess'), 'info');
      setDeleteTarget(null);
    }
  };

  return (
    <DashboardLayout type="admin">
      <div className="space-y-8 w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-base-300/60 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-secondary flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" />
              {t('cmsProducts')}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-primary">
              {t('cmsProducts')} ({products.length})
            </h1>
            <p className="text-sm text-base-content/70">
              เพิ่ม แก้ไข และเปิด/ปิดการแสดงผลหินมงคลในแคตตาล็อกหน้าเว็บ
            </p>
          </div>

          <button
            onClick={handleOpenAdd}
            className="btn btn-secondary btn-sm text-white rounded-xl font-bold gap-2 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>เพิ่มสินค้ามงคลใหม่</span>
          </button>
        </div>

        {/* Products Table */}
        <div className="zen-surface rounded-3xl p-6 border border-base-300/60 shadow-xs overflow-x-auto">
          <table className="table table-zebra w-full text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-base-300 text-base-content/70">
                <th className="min-w-[200px]">รูปภาพ & ชื่อสินค้า</th>
                <th className="whitespace-nowrap">มิติ & สูตรแร่</th>
                <th className="whitespace-nowrap">ราคาบูชา</th>
                <th className="whitespace-nowrap">เหมาะกับวันเกิด</th>
                <th className="whitespace-nowrap text-center min-w-[130px]">สถานะแสดงผล</th>
                <th className="text-right whitespace-nowrap">การจัดการ</th>
              </tr>
            </thead>
            <tbody>
              {products.map((prod) => (
                <tr key={prod.id} className="hover:bg-base-200/50">
                  <td>
                    <div className="flex items-center gap-3">
                      <img
                        src={resolveAssetUrl(
                          prod.imageUrl,
                          'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=400&auto=format&fit=crop&q=80'
                        )}
                        alt={prod.name}
                        className="w-12 h-12 rounded-xl object-cover shrink-0 bg-base-200 border border-base-300"
                        onError={(e) => {
                          e.currentTarget.src =
                            'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=400&auto=format&fit=crop&q=80';
                        }}
                      />
                      <div>
                        <div className="font-bold text-primary">{prod.name}</div>
                        <div className="text-xs text-base-content/60 max-w-xs truncate">
                          {prod.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap">
                    <div className="flex flex-col gap-1 items-start">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-secondary/15 text-secondary border border-secondary/30">
                        {prod.aspect === 'SCIENCE'
                          ? '🔬 วิทยาศาสตร์'
                          : prod.aspect === 'CHAKRA_ENERGY'
                          ? '✨ จักระ'
                          : prod.aspect === 'HISTORY'
                          ? '🏛️ ประวัติศาสตร์'
                          : prod.aspect || '💎 แร่ธรรมชาติ'}
                      </span>
                      {prod.mineralFormula && (
                        <span className="text-[10px] font-mono text-base-content/60">
                          {prod.mineralFormula}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="font-extrabold text-secondary whitespace-nowrap">
                    ฿{typeof prod.price === 'number' ? prod.price.toLocaleString() : prod.price}
                  </td>
                  <td className="whitespace-nowrap">{prod.dayOfWeek || prod.dayMatch || 'ทุกวันเกิด'}</td>
                  <td className="whitespace-nowrap text-center">
                    <button
                      type="button"
                      onClick={() => handleToggleActive(prod)}
                      className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all shadow-xs hover:shadow-sm cursor-pointer select-none ${
                        prod.isActive
                          ? 'bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/25 border border-emerald-500/30 dark:bg-emerald-500/20 dark:text-emerald-300'
                          : 'bg-rose-500/15 text-rose-700 hover:bg-rose-500/25 border border-rose-500/30 dark:bg-rose-500/20 dark:text-rose-300'
                      }`}
                      title="คลิกเพื่อสลับสถานะ"
                    >
                      {prod.isActive ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span>เปิดแสดงผล</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400 shrink-0" />
                          <span>ปิดซ่อน</span>
                        </>
                      )}
                    </button>
                  </td>
                  <td className="text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(prod)}
                        className="btn btn-ghost btn-circle btn-sm text-primary hover:bg-primary/10"
                        title="แก้ไขสินค้า"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(prod)}
                        className="btn btn-ghost btn-circle btn-sm text-error hover:bg-error/10"
                        title="ลบสินค้า"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* New Product Modal */}
        {modalOpen && (
          <div className="modal modal-open z-50">
            <div className="modal-box max-w-2xl rounded-3xl zen-surface border border-base-300">
              <h3 className="font-bold text-lg text-primary">
                {editingProduct ? 'แก้ไขข้อมูลแร่ธาตุ / สินค้า' : 'เพิ่มแร่ธาตุ / สินค้าคัดสรรใหม่'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4 text-xs sm:text-sm">
                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="flex flex-col gap-1.5 w-full">
                    <label className="text-xs font-bold text-base-content/80">ชื่อแร่ธาตุ / ชิ้นงาน</label>
                    <input
                      type="text"
                      required
                      placeholder="เช่น หินไหมทองจักรพรรดิ"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="input input-bordered w-full rounded-xl bg-base-100"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 w-full">
                    <label className="text-xs font-bold text-base-content/80">ราคาบูชา (บาท)</label>
                    <input
                      type="text"
                      required
                      placeholder="เช่น 2,590"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="input input-bordered w-full rounded-xl bg-base-100"
                    />
                  </div>
                </div>

                {/* Aspect & Chakra */}
                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="flex flex-col gap-1.5 w-full">
                    <label className="text-xs font-bold text-base-content/80">มิติชิ้นงาน (Aspect)</label>
                    <select
                      value={formData.aspect}
                      onChange={(e) => setFormData({ ...formData, aspect: e.target.value })}
                      className="select select-bordered w-full rounded-xl bg-base-100"
                    >
                      <option value="SCIENCE">🔬 SCIENCE (วิทยาศาสตร์ & แร่ธาตุ)</option>
                      <option value="CHAKRA_ENERGY">✨ CHAKRA_ENERGY (จักระ & สมาธิ)</option>
                      <option value="HISTORY">🏛️ HISTORY (ประวัติศาสตร์โบราณ)</option>
                      <option value="CULTURE">📜 CULTURE (วัฒนธรรมและความเชื่อ)</option>
                      <option value="PERSONAL_EXP">🌿 PERSONAL_EXP (บันทึกประสบการณ์)</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5 w-full">
                    <label className="text-xs font-bold text-base-content/80">จักระที่สอดคล้อง</label>
                    <input
                      type="text"
                      placeholder="เช่น จักระที่ 3 มณีปุระ (Solar Plexus)"
                      value={formData.chakra}
                      onChange={(e) => setFormData({ ...formData, chakra: e.target.value })}
                      className="input input-bordered w-full rounded-xl bg-base-100"
                    />
                  </div>
                </div>

                {/* Mineral Formula & Stone Type */}
                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="flex flex-col gap-1.5 w-full">
                    <label className="text-xs font-bold text-base-content/80">สูตรเคมีแร่ธาตุ (Formula)</label>
                    <input
                      type="text"
                      placeholder="เช่น SiO₂ with TiO₂ Rutile Needles"
                      value={formData.mineralFormula}
                      onChange={(e) => setFormData({ ...formData, mineralFormula: e.target.value })}
                      className="input input-bordered w-full rounded-xl bg-base-100 font-mono text-xs"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 w-full">
                    <label className="text-xs font-bold text-base-content/80">ชนิดแร่ / ขนาดหิน</label>
                    <input
                      type="text"
                      placeholder="เช่น ควอตซ์ใส เส้นไหมทอง 12mm"
                      value={formData.stoneType}
                      onChange={(e) => setFormData({ ...formData, stoneType: e.target.value })}
                      className="input input-bordered w-full rounded-xl bg-base-100"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="flex flex-col gap-1.5 w-full">
                    <label className="text-xs font-bold text-base-content/80">หมวดหมู่</label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="input input-bordered w-full rounded-xl bg-base-100"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 w-full">
                    <label className="text-xs font-bold text-base-content/80">สัมพันธ์กับวัน</label>
                    <input
                      type="text"
                      value={formData.dayOfWeek}
                      onChange={(e) => setFormData({ ...formData, dayOfWeek: e.target.value })}
                      className="input input-bordered w-full rounded-xl bg-base-100"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 w-full">
                  <label className="text-xs font-bold text-base-content/80">คำอธิบายพลังและคุณสมบัติ</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="เช่น หินแห่งการดึงดูดทรัพย์ เสริมโชคลาภ..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="textarea textarea-bordered w-full rounded-xl bg-base-100 leading-relaxed"
                  ></textarea>
                </div>

                {/* Product Image Upload Zone */}
                <FileUploadZone
                  label="รูปภาพหินมงคล / สินค้า (Product Image)"
                  accept="image"
                  value={formData.imageUrl}
                  onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                  helpText="คลิกปุ่ม + เพื่ออัปโหลดรูปภาพสินค้า หรือใส่ URL รูปภาพ"
                />

                <div className="modal-action">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="btn btn-sm btn-ghost rounded-xl"
                  >
                    {t('cancel')}
                  </button>
                  <button
                    type="submit"
                    className="btn btn-sm btn-secondary text-white rounded-xl font-bold"
                  >
                    {editingProduct ? 'บันทึกการแก้ไข' : `${t('save')} สินค้า`}
                  </button>
                </div>
              </form>
            </div>
            <div className="modal-backdrop bg-black/40 backdrop-blur-xs" onClick={() => setModalOpen(false)}></div>
          </div>
        )}

        {/* Delete Confirmation Modal (Replaces window.confirm) */}
        <ConfirmModal
          isOpen={!!deleteTarget}
          title="ยืนยันการลบสินค้า"
          message={`คุณต้องการลบสินค้า "${deleteTarget?.name}" ออกจากระบบใช่หรือไม่?`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      </div>
    </DashboardLayout>
  );
}
