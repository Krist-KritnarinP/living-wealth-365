import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Plus, Trash2, Eye, EyeOff, Shield, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../constants/routes';

export default function AdminBlogPage() {
  const { posts, addPost, updatePost, deletePost } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: 'วางแผนภาษี',
    excerpt: '',
    content: '',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1000&auto=format&fit=crop&q=80',
    readTime: '5 นาที',
  });

  const handleCreate = (e) => {
    e.preventDefault();
    addPost(formData);
    setFormData({
      title: '',
      category: 'วางแผนภาษี',
      excerpt: '',
      content: '',
      imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1000&auto=format&fit=crop&q=80',
      readTime: '5 นาที',
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
            ระบบจัดการบทความ (CMS Blog)
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
              <th>รูปภาพ & หัวข้อบทความ</th>
              <th>หมวดหมู่</th>
              <th>ผู้เขียน</th>
              <th>วันที่เผยแพร่</th>
              <th>สถานะ</th>
              <th className="text-right">การจัดการ</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-base-200/50">
                <td>
                  <div className="flex items-center gap-3">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-12 h-12 rounded-xl object-cover"
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
                <td>
                  <span className="badge badge-primary badge-outline text-xs">
                    {post.category}
                  </span>
                </td>
                <td>{post.author}</td>
                <td>{post.publishedAt}</td>
                <td>
                  <button
                    onClick={() => updatePost(post.id, { published: !post.published })}
                    className={`badge text-xs font-bold gap-1 cursor-pointer ${
                      post.published ? 'badge-success text-white' : 'badge-ghost'
                    }`}
                  >
                    {post.published ? (
                      <>
                        <Eye className="w-3 h-3" /> เผยแพร่แล้ว
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-3 h-3" /> ฉบับร่าง
                      </>
                    )}
                  </button>
                </td>
                <td className="text-right">
                  <button
                    onClick={() => {
                      if (confirm(`คุณต้องการลบบทความ "${post.title}" ใช่หรือไม่?`)) {
                        deletePost(post.id);
                      }
                    }}
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
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl rounded-3xl zen-surface border border-base-300">
            <h3 className="font-bold text-lg text-primary">เขียนบทความความรู้ใหม่</h3>
            <form onSubmit={handleCreate} className="space-y-4 mt-4 text-xs sm:text-sm">
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-bold">ชื่อหัวข้อบทความ</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="เช่น เทคนิคลดหย่อนภาษี 2568..."
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="input input-bordered w-full rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label py-1">
                    <span className="label-text font-bold">หมวดหมู่</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="select select-bordered w-full rounded-xl"
                  >
                    <option value="วางแผนภาษี">วางแผนภาษี</option>
                    <option value="ประกันชีวิต & สุขภาพ">ประกันชีวิต & สุขภาพ</option>
                    <option value="วางแผนเกษียณ">วางแผนเกษียณ</option>
                  </select>
                </div>

                <div className="form-control">
                  <label className="label py-1">
                    <span className="label-text font-bold">เวลาที่ใช้อ่าน</span>
                  </label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    className="input input-bordered w-full rounded-xl"
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-bold">คำโปรยสั้นๆ (Excerpt)</span>
                </label>
                <textarea
                  rows="2"
                  required
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="textarea textarea-bordered w-full rounded-xl"
                ></textarea>
              </div>

              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-bold">เนื้อหาบทความ</span>
                </label>
                <textarea
                  rows="6"
                  required
                  placeholder="พิมพ์เนื้อหาบทความ..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
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
                  className="btn btn-sm btn-primary rounded-xl font-bold"
                >
                  บันทึกและเผยแพร่
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
