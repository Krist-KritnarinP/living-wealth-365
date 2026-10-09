import { useState } from 'react';
import { Plus, Trash2, Eye, EyeOff, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useToast } from '../../context/ToastContext';
import DashboardLayout from '../../components/common/DashboardLayout';
import ConfirmModal from '../../components/common/ConfirmModal';
import FileUploadZone from '../../components/common/FileUploadZone';
import { resolveAssetUrl } from '../../api';

export default function AdminBlogPage() {
  const { posts, addPost, updatePost, deletePost } = useAuth();
  const { t } = useLanguage();
  const { showToast } = useToast();

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'วางแผนภาษี',
    excerpt: '',
    content: '',
    imageUrl: '',
    readTime: '5 นาที',
  });

  const handleCreate = (e) => {
    e.preventDefault();
    addPost(formData);
    showToast('สร้างบทความใหม่เรียบร้อยแล้ว!', 'success');
    setFormData({
      title: '',
      category: 'วางแผนภาษี',
      excerpt: '',
      content: '',
      imageUrl: '',
      readTime: '5 นาที',
    });
    setModalOpen(false);
  };

  const handleTogglePublish = (post) => {
    updatePost(post.id, { published: !post.published });
    showToast(
      post.published ? 'เปลี่ยนสถานะเป็นฉบับร่างแล้ว' : 'เผยแพร่บทความเรียบร้อยแล้ว!',
      'info'
    );
  };

  const handleConfirmDelete = () => {
    if (deleteTarget) {
      deletePost(deleteTarget.id);
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
              {t('cmsBlog')}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-primary">
              {t('cmsBlog')} ({posts.length})
            </h1>
            <p className="text-sm text-base-content/70">
              สร้าง แก้ไข และควบคุมการเผยแพร่บทความความรู้การเงิน
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="btn btn-primary btn-sm rounded-xl font-bold gap-2 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>เขียนบทความใหม่</span>
          </button>
        </div>

        {/* Posts Table */}
        <div className="zen-surface rounded-3xl p-6 border border-base-300/60 shadow-xs overflow-x-auto">
          <table className="table table-zebra w-full text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-base-300 text-base-content/70">
                <th className="min-w-[200px]">รูปภาพ & หัวข้อบทความ</th>
                <th className="whitespace-nowrap">หมวดหมู่</th>
                <th className="whitespace-nowrap">ผู้เขียน</th>
                <th className="whitespace-nowrap">วันที่เผยแพร่</th>
                <th className="whitespace-nowrap text-center min-w-[130px]">{t('status')}</th>
                <th className="text-right whitespace-nowrap">การจัดการ</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-base-200/50">
                  <td>
                    <div className="flex items-center gap-3">
                      <img
                        src={resolveAssetUrl(
                          post.imageUrl,
                          'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&auto=format&fit=crop&q=80'
                        )}
                        alt={post.title}
                        className="w-12 h-12 rounded-xl object-cover shrink-0 bg-base-200 border border-base-300"
                        onError={(e) => {
                          e.currentTarget.src =
                            'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&auto=format&fit=crop&q=80';
                        }}
                      />
                      <div>
                        <div className="font-bold text-primary max-w-sm truncate">
                          {post.title}
                        </div>
                        <div className="text-xs text-base-content/50 font-mono">
                          /blog/{post.slug}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 whitespace-nowrap">
                      {post.category}
                    </span>
                  </td>
                  <td className="whitespace-nowrap">
                    {typeof post.author === 'object'
                      ? post.author?.name || post.author?.username || 'ที่ปรึกษา'
                      : post.author || 'ที่ปรึกษา'}
                  </td>
                  <td className="whitespace-nowrap">
                    {post.publishedAt ||
                      (post.createdAt
                        ? new Date(post.createdAt).toLocaleDateString('th-TH', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })
                        : '-')}
                  </td>
                  <td className="whitespace-nowrap text-center">
                    <button
                      type="button"
                      onClick={() => handleTogglePublish(post)}
                      className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all shadow-xs hover:shadow-sm cursor-pointer select-none ${
                        post.published
                          ? 'bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/25 border border-emerald-500/30 dark:bg-emerald-500/20 dark:text-emerald-300'
                          : 'bg-slate-500/15 text-slate-600 hover:bg-slate-500/25 border border-slate-500/30 dark:bg-slate-500/20 dark:text-slate-300'
                      }`}
                      title="คลิกเพื่อสลับสถานะ"
                    >
                      {post.published ? (
                        <>
                          <Eye className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span>เผยแพร่แล้ว</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 shrink-0" />
                          <span>ฉบับร่าง</span>
                        </>
                      )}
                    </button>
                  </td>
                  <td className="text-right whitespace-nowrap">
                    <button
                      onClick={() => setDeleteTarget(post)}
                      className="btn btn-xs btn-ghost text-error"
                      title="ลบบทความ"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* New Post Modal */}
        {modalOpen && (
          <div className="modal modal-open z-50">
            <div className="modal-box max-w-2xl rounded-3xl zen-surface border border-base-300">
              <h3 className="font-bold text-lg text-primary">เขียนบทความความรู้ใหม่</h3>
              <form onSubmit={handleCreate} className="space-y-4 mt-4 text-xs sm:text-sm">
                <div className="flex flex-col gap-1.5 w-full">
                  <label className="text-xs font-bold text-base-content/80">ชื่อหัวข้อบทความ</label>
                  <input
                    type="text"
                    required
                    placeholder="เช่น เทคนิคลดหย่อนภาษี 2568..."
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="input input-bordered w-full rounded-xl bg-base-100"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="flex flex-col gap-1.5 w-full">
                    <label className="text-xs font-bold text-base-content/80">หมวดหมู่</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="select select-bordered w-full rounded-xl bg-base-100"
                    >
                      <option value="วางแผนภาษี">วางแผนภาษี</option>
                      <option value="ประกันชีวิต & สุขภาพ">ประกันชีวิต & สุขภาพ</option>
                      <option value="วางแผนเกษียณ">วางแผนเกษียณ</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5 w-full">
                    <label className="text-xs font-bold text-base-content/80">เวลาที่ใช้อ่าน</label>
                    <input
                      type="text"
                      value={formData.readTime}
                      onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                      className="input input-bordered w-full rounded-xl bg-base-100"
                    />
                  </div>
                </div>

                {/* Cover Image Upload Zone */}
                <FileUploadZone
                  label="รูปภาพหน้าปกบทความ (Cover Image)"
                  accept="image"
                  value={formData.imageUrl}
                  onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                  helpText="คลิกปุ่ม + เพื่ออัปโหลดรูปภาพปกจากคอมพิวเตอร์ หรือใส่ URL รูปภาพ"
                />

                <div className="flex flex-col gap-1.5 w-full">
                  <label className="text-xs font-bold text-base-content/80">คำโปรยสั้นๆ (Excerpt)</label>
                  <textarea
                    rows={2}
                    required
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    className="textarea textarea-bordered w-full rounded-xl bg-base-100 leading-relaxed"
                  ></textarea>
                </div>

                <div className="flex flex-col gap-1.5 w-full">
                  <label className="text-xs font-bold text-base-content/80">เนื้อหาบทความ</label>
                  <textarea
                    rows={6}
                    required
                    placeholder="พิมพ์เนื้อหาบทความ..."
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
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
                    className="btn btn-sm btn-primary rounded-xl font-bold"
                  >
                    {t('save')} & เผยแพร่
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
          title="ยืนยันการลบบทความ"
          message={`คุณต้องการลบบทความ "${deleteTarget?.title}" ออกจากระบบใช่หรือไม่?`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      </div>
    </DashboardLayout>
  );
}
