import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Trash2, CheckCircle2, XCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../constants/routes';

export default function AdminProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);

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

  return (
    <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-base-300 pb-4">
        <div>
          <Link
            to={ROUTES.ADMIN_DASHBOARD}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-secondary mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>กลับสู่แดชบอร์ด</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-primary">
            ระบบจัดการวัตถุมงคล (CMS Products)
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
                    onClick={() => updateProduct(prod.id, { isActive: !prod.isActive })}
                    className={`badge text-xs font-bold gap-1 cursor-pointer ${
                      prod.isActive ? 'badge-success text-white' : 'badge-ghost'
                    }`}
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
                    onClick={() => {
                      if (confirm(`คุณต้องการลบสินค้า "${prod.name}" ใช่หรือไม่?`)) {
                        deleteProduct(prod.id);
                      }
                    }}
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
        <div className="modal modal-open">
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
                    className="input input-bordered w-full rounded-xl"
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
                    className="input input-bordered w-full rounded-xl"
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
                    className="input input-bordered w-full rounded-xl"
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
                    className="input input-bordered w-full rounded-xl"
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
                  className="textarea textarea-bordered w-full rounded-xl"
                ></textarea>
              </div>

              <div className="modal-action">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="btn btn-sm btn-ghost rounded-xl"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="btn btn-sm btn-secondary text-white rounded-xl font-bold"
                >
                  บันทึกสินค้า
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
