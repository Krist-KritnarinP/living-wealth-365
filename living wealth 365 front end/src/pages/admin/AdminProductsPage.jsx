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
                <th>รูปภาพ & ชื่อสินค้า</th>
                <th>หมวดหมู่</th>
                <th>ราคาบูชา</th>
                <th>เหมาะกับวันเกิด</th>
                <th>สถานะแสดงผล</th>
                <th className="text-right">การจัดการ</th>
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
                  <td>
                    <span className="badge badge-secondary text-white text-xs">
                      {prod.category}
                    </span>
                  </td>
                  <td className="font-extrabold text-secondary">฿{prod.price}</td>
                  <td>{prod.dayMatch}</td>
                  <td>
                    <button
                      onClick={() => handleToggleActive(prod)}
                      className={`badge text-xs font-bold gap-1 cursor-pointer transition-all ${
                        prod.isActive ? 'badge-success text-white' : 'badge-ghost'
                      }`}
                      title="คลิกเพื่อสลับสถานะ"
                    >
                      {prod.isActive ? (
                        <>
                          <CheckCircle2 className="w-3 h-3" /> เปิดแสดงผล
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3 h-3" /> ปิดซ่อน
                        </>
                      )}
                    </button>
                  </td>
                  <td className="text-right">
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
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label py-1">
                      <span className="label-text font-bold">ชื่อหินมงคล</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="เช่น หินไหมทอง (Rutilated Quartz)"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="input input-bordered w-full rounded-xl bg-base-100"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label py-1">
                      <span className="label-text font-bold">ราคาบูชา (บาท)</span>
                    </label>
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

                <div className="grid grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label py-1">
                      <span className="label-text font-bold">หมวดหมู่เสริมดวง</span>
                    </label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="input input-bordered w-full rounded-xl bg-base-100"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label py-1">
                      <span className="label-text font-bold">เหมาะกับวันเกิด</span>
                    </label>
                    <input
                      type="text"
                      value={formData.dayMatch}
                      onChange={(e) => setFormData({ ...formData, dayMatch: e.target.value })}
                      className="input input-bordered w-full rounded-xl bg-base-100"
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label py-1">
                    <span className="label-text font-bold">คำอธิบายพลังและคุณสมบัติ</span>
                  </label>
                  <textarea
                    rows="3"
                    required
                    placeholder="เช่น หินแห่งการดึงดูดทรัพย์ เสริมโชคลาภ..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="textarea textarea-bordered w-full rounded-xl bg-base-100"
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
