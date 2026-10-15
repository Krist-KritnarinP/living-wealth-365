import { useState } from 'react';
import { Plus, Trash2, Eye, EyeOff, Shield, Edit2 } from 'lucide-react';
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
  const [editingPost, setEditingPost] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'การวางแผนภาษี',
    pillar: 'JOURNAL',
    postType: 'ARTICLE',
    authorName: 'Top & Joy',
    tags: '',
    excerpt: '',
    content: '',
    imageUrl: '',
    readTime: '5 นาที',
  });

  const handleOpenAdd = () => {
    setEditingPost(null);
    setFormData({
      title: '',
      category: 'การวางแผนภาษี',
      pillar: 'JOURNAL',
      postType: 'ARTICLE',
      authorName: 'Top & Joy',
      tags: '',
      excerpt: '',
      content: '',
      imageUrl: '',
      readTime: '5 นาที',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (post) => {
    setEditingPost(post);
    setFormData({
      title: post.title || '',
      category: post.category || 'การวางแผนภาษี',
      pillar: post.pillar || 'JOURNAL',
      postType: post.postType || 'ARTICLE',
      authorName: post.authorName || (typeof post.author === 'string' ? post.author : 'Top & Joy'),
      tags: post.tags || '',
      excerpt: post.excerpt || '',
      content: post.content || '',
      imageUrl: post.imageUrl || '',
      readTime: post.readTime || '5 นาที',
    });
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingPost) {
      updatePost(editingPost.id, formData);
      showToast(`อัปเดตบทความ "${formData.title}" เรียบร้อยแล้ว!`, 'success');
    } else {
      addPost(formData);
      showToast('สร้างบทความใหม่เรียบร้อยแล้ว!', 'success');
    }
    setFormData({
      title: '',
      category: 'วางแผนภาษี',
      excerpt: '',
      content: '',
      imageUrl: '',
      readTime: '5 นาที',
    });
    setEditingPost(null);
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
            onClick={handleOpenAdd}
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
                <th className="whitespace-nowrap">เสาหลัก & รูปแบบ</th>
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
                          /journal/{post.slug}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap">
                    <div className="flex flex-col gap-1 items-start">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-primary/10 text-primary border border-primary/20">
                        {post.pillar || 'JOURNAL'}
                      </span>
                      {post.postType && post.postType !== 'ARTICLE' && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-secondary/15 text-secondary">
                          {post.postType}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="whitespace-nowrap">
                    {post.authorName ||
                      (typeof post.author === 'object'
                        ? post.author?.name || post.author?.username
                        : post.author || 'Top & Joy')}
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
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(post)}
                        className="btn btn-ghost btn-circle btn-sm text-primary hover:bg-primary/10"
                        title="แก้ไขบทความ"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(post)}
                        className="btn btn-ghost btn-circle btn-sm text-error hover:bg-error/10"
                        title="ลบบทความ"
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

        {/* New Post Modal */}
        {modalOpen && (
          <div className="modal modal-open z-50">
            <div className="modal-box max-w-2xl rounded-3xl zen-surface border border-base-300">
              <h3 className="font-bold text-lg text-primary">
                {editingPost ? 'แก้ไขบทความ / วารสาร' : 'เขียนบทความ / วารสารใหม่'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4 text-xs sm:text-sm">
                <div className="flex flex-col gap-1.5 w-full">
                  <label className="text-xs font-bold text-base-content/80">ชื่อหัวข้อบทความ</label>
                  <input
                    type="text"
                    required
                    placeholder="เช่น สมดุล 6 มิติของชีวิต..."
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="input input-bordered w-full rounded-xl bg-base-100"
                  />
                </div>

                {/* Pillar & Post Type */}
                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="flex flex-col gap-1.5 w-full">
                    <label className="text-xs font-bold text-base-content/80">เสาหลัก (Pillar)</label>
                    <select
                      value={formData.pillar}
                      onChange={(e) => setFormData({ ...formData, pillar: e.target.value })}
                      className="select select-bordered w-full rounded-xl bg-base-100"
                    >
                      <option value="LIFE">1. LIFE (สมดุลชีวิต 6 มิติ)</option>
                      <option value="WEALTH">2. WEALTH (สถาปัตยกรรมการเงิน)</option>
                      <option value="WELLBEING">3. WELLBEING (อายุวัฒนะ & สุขภาพ)</option>
                      <option value="INNER_LIFE">4. INNER_LIFE (โลกภายใน & สมาธิ)</option>
                      <option value="EARTH_ENERGY">5. EARTH_ENERGY (แร่ธาตุธรรมชาติ)</option>
                      <option value="JOURNAL">6. JOURNAL (วารสาร & ความคิด)</option>
                      <option value="ABOUT">7. ABOUT (ปรัชญา & เรื่องราว)</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5 w-full">
                    <label className="text-xs font-bold text-base-content/80">รูปแบบเนื้อหา (Type)</label>
                    <select
                      value={formData.postType}
                      onChange={(e) => setFormData({ ...formData, postType: e.target.value })}
                      className="select select-bordered w-full rounded-xl bg-base-100"
                    >
                      <option value="ARTICLE">บทความทั่วไป (Article)</option>
                      <option value="TOPS_NOTES">Top's Notes (บันทึกของท็อป)</option>
                      <option value="JOURNEY">Joy's Journey (บันทึกการเดินทาง)</option>
                      <option value="EXPLORING">Exploring (การสำรวจร่วมกัน)</option>
                    </select>
                  </div>
                </div>

                {/* Author & Read Time */}
                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="flex flex-col gap-1.5 w-full">
                    <label className="text-xs font-bold text-base-content/80">ผู้เขียน (Author)</label>
                    <input
                      type="text"
                      value={formData.authorName}
                      onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                      placeholder="เช่น Top & Joy, Top, หรือ Joy"
                      className="input input-bordered w-full rounded-xl bg-base-100"
                    />
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

                {/* Category & Tags */}
                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="flex flex-col gap-1.5 w-full">
                    <label className="text-xs font-bold text-base-content/80">หมวดหมู่ย่อย</label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="เช่น การวางแผนภาษี, สุขภาพระดับเซลล์"
                      className="input input-bordered w-full rounded-xl bg-base-100"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 w-full">
                    <label className="text-xs font-bold text-base-content/80">แท็ก (Tags)</label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      placeholder="เช่น #Tax #Longevity #Balance"
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
                    {editingPost ? 'บันทึกการแก้ไข' : `${t('save')} & เผยแพร่`}
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
