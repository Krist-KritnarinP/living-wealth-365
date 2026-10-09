import { useState } from 'react';
import { Plus, Trash2, CheckCircle2, XCircle, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useToast } from '../../context/ToastContext';
import DashboardLayout from '../../components/common/DashboardLayout';
import ConfirmModal from '../../components/common/ConfirmModal';

export default function AdminProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useAuth();
  const { t } = useLanguage();
  const { showToast } = useToast();

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    category: 'ดึงดูดทรัพย์ & โชคลาภ',
    price: '1,990',
    description: '',
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80',
    dayMatch: 'ทุกวันเกิด',
    element: 'ธาตุทอง',
  });

  const handleCreate = (e) => {
    e.preventDefault();
    addProduct(formData);
    showToast('เพิ่มสินค้าหินมงคลใหม่สำเร็จ!', 'success');
    setFormData({
      name: '',
      category: 'ดึงดูดทรัพย์ & โชคลาภ',
      price: '1,990',
      description: '',
      imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80',
      dayMatch: 'ทุกวันเกิด',
      element: 'ธาตุทอง',
    });
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
      <div className="space-y-8 max-w-7xl">
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
            onClick={() => setModalOpen(true)}
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
                <th className="whitespace-nowrap">หมวดหมู่</th>
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
                        src={prod.imageUrl}
                        alt={prod.name}
                        className="w-12 h-12 rounded-xl object-cover"
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
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-secondary/15 text-secondary border border-secondary/30 whitespace-nowrap">
                      {prod.category}
                    </span>
                  </td>
                  <td className="font-extrabold text-secondary whitespace-nowrap">฿{prod.price}</td>
                  <td className="whitespace-nowrap">{prod.dayMatch}</td>
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
                    <button
                      onClick={() => setDeleteTarget(prod)}
                      className="btn btn-xs btn-ghost text-error"
                      title="ลบสินค้า"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
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
              <h3 className="font-bold text-lg text-primary">เพิ่มสินค้าหินมงคลใหม่</h3>
              <form onSubmit={handleCreate} className="space-y-4 mt-4 text-xs sm:text-sm">
                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="flex flex-col gap-1.5 w-full">
                    <label className="text-xs font-bold text-base-content/80">ชื่อหินมงคล</label>
                    <input
                      type="text"
                      required
                      placeholder="เช่น หินไหมทอง (Rutilated Quartz)"
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

                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="flex flex-col gap-1.5 w-full">
                    <label className="text-xs font-bold text-base-content/80">หมวดหมู่เสริมดวง</label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="input input-bordered w-full rounded-xl bg-base-100"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 w-full">
                    <label className="text-xs font-bold text-base-content/80">เหมาะกับวันเกิด</label>
                    <input
                      type="text"
                      value={formData.dayMatch}
                      onChange={(e) => setFormData({ ...formData, dayMatch: e.target.value })}
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
                    {t('save')} สินค้า
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
