import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Search, ChevronRight, Clock, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../constants/routes';

export default function BlogPage() {
  const { posts } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด');

  const categories = ['ทั้งหมด', 'วางแผนภาษี', 'ประกันชีวิต & สุขภาพ', 'วางแผนเกษียณ'];

  const filteredPosts = posts.filter((post) => {
    if (!post.published) return false;
    const matchesCat =
      selectedCategory === 'ทั้งหมด' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="w-full space-y-12 lg:space-y-16 py-8">
      {/* Header Banner */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="w-full rounded-3xl zen-surface border border-base-300/60 p-8 sm:p-12 lg:p-16 text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-bold">
            <BookOpen className="w-4 h-4 text-secondary" />
            <span>KNOWLEDGE HUB & TAX STRATEGY</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-primary leading-tight">
            คลังความรู้การเงิน สุขภาพ และภาษี
          </h1>
          <p className="text-base sm:text-lg text-base-content/80 max-w-2xl mx-auto leading-relaxed">
            อัปเดตบทความและเทคนิคการบริหารการเงินส่วนบุคคล วางแผนสิทธิลดหย่อนภาษี
            และสร้างความคุ้มครองที่คุ้มค่า เพื่อความมั่นคงของคุณและครอบครัว
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto pt-4">
            <div className="relative">
              <input
                type="text"
                placeholder="ค้นหาบทความ เช่น ภาษี, ประกันสุขภาพ, เกษียณ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input input-bordered w-full rounded-2xl pl-12 pr-4 bg-base-100 shadow-sm text-base"
              />
              <Search className="w-5 h-5 text-base-content/50 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs & Posts Grid */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 space-y-8">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`btn btn-sm rounded-xl font-bold transition-all ${
                selectedCategory === cat
                  ? 'btn-primary text-white shadow-xs'
                  : 'btn-ghost text-base-content/70'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Posts List */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 text-base-content/60">
            ไม่พบบทความที่ตรงกับเงื่อนไขการค้นหา
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredPosts.map((post) => (
              <Link
                key={post.id}
                to={ROUTES.BLOG_DETAIL(post.slug)}
                className="zen-surface rounded-3xl overflow-hidden border border-base-300/60 shadow-xs hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-16/9 w-full overflow-hidden bg-base-200 relative">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="badge badge-primary absolute top-3 left-3 text-xs font-bold shadow-xs">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3 text-xs text-base-content/60">
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-secondary" />
                        {typeof post.author === 'object'
                          ? post.author?.name || post.author?.username || 'ทีมที่ปรึกษา'
                          : post.author || 'ทีมที่ปรึกษา'}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-black text-primary group-hover:text-secondary transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-sm text-base-content/70 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center justify-between text-xs font-bold text-primary border-t border-base-300/40">
                  <span>อ่านเนื้อหาฉบับเต็ม</span>
                  <span className="group-hover:translate-x-1 transition-transform flex items-center">
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
