import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  BookOpen,
  Search,
  ChevronRight,
  Clock,
  User,
  Calculator,
  Sparkles,
  ArrowRight,
  FileText,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../constants/routes';
import { resolveAssetUrl } from '../../api';
import TaxCalculator from '../../components/tax/TaxCalculator';

export default function BlogPage() {
  const { posts } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  // Active feature tab: 'articles' or 'calculator'
  const tabParam = searchParams.get('tab');
  const activeTab = tabParam === 'calculator' ? 'calculator' : 'articles';

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

  const handleTabSwitch = (newTab) => {
    if (newTab === 'calculator') {
      setSearchParams({ tab: 'calculator' });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="w-full space-y-8 lg:space-y-12 py-8">
      {/* 🌟 1. Header Banner & Feature Switcher */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="w-full rounded-3xl zen-surface border border-base-300/60 p-6 sm:p-10 lg:p-12 text-center max-w-4xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-bold">
            <BookOpen className="w-4 h-4 text-secondary" />
            <span>KNOWLEDGE HUB & TAX STRATEGY</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-primary leading-tight">
            คลังความรู้การเงิน สุขภาพ และภาษี
          </h1>

          <p className="text-sm sm:text-base text-base-content/80 max-w-2xl mx-auto leading-relaxed">
            ศูนย์รวมบทความวางแผนการเงินส่วนบุคคล และโปรแกรมคำนวณภาษีเงินได้บุคคลธรรมดา 2568
            เพื่อการบริหารทรัพย์สินและความมั่นคงของครอบครัว
          </p>

          {/* 🔀 Feature Switcher Tabs */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => handleTabSwitch('articles')}
              className={`btn btn-md rounded-2xl font-black text-xs sm:text-sm transition-all duration-200 gap-2 ${
                activeTab === 'articles'
                  ? 'btn-primary text-white shadow-md scale-105'
                  : 'btn-ghost border border-base-300 text-base-content/70 hover:bg-base-200'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>คลังบทความความรู้</span>
              <span className="badge badge-sm badge-secondary text-primary font-bold">
                {posts.filter((p) => p.published).length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleTabSwitch('calculator')}
              className={`btn btn-md rounded-2xl font-black text-xs sm:text-sm transition-all duration-200 gap-2 ${
                activeTab === 'calculator'
                  ? 'btn-primary text-white shadow-md scale-105'
                  : 'btn-ghost border border-base-300 text-base-content/70 hover:bg-base-200'
              }`}
            >
              <Calculator className="w-4 h-4 text-secondary" />
              <span>โปรแกรมคำนวณภาษี 2568 (ภ.ง.ด. 90/91)</span>
              <span className="badge badge-sm badge-success text-white font-bold">ใหม่</span>
            </button>
          </div>
        </div>
      </section>

      {/* 🧮 2. TAB: TAX CALCULATOR FEATURE */}
      {activeTab === 'calculator' && (
        <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 animate-fadeIn">
          <TaxCalculator hideHeader={false} />
        </section>
      )}

      {/* 📰 3. TAB: KNOWLEDGE ARTICLES */}
      {activeTab === 'articles' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Search & Categories Section */}
          <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 space-y-6">
            {/* Search Bar */}
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="ค้นหาบทความ เช่น ภาษี, ประกันสุขภาพ, เกษียณ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input input-bordered w-full rounded-2xl pl-12 pr-4 bg-base-100 shadow-xs text-sm sm:text-base"
                />
                <Search className="w-5 h-5 text-base-content/50 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Category Pills */}
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

            {/* 💡 Cross-Feature Tax Banner */}
            <div className="zen-surface rounded-2xl p-4 sm:p-6 border border-primary/20 bg-gradient-to-r from-primary/5 via-secondary/10 to-primary/5 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-5xl mx-auto shadow-xs">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0 shadow-md">
                  <Calculator className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-black text-primary">
                    ต้องการคำนวณภาษีเงินได้บุคคลธรรมดา 2568 ทันที?
                  </h4>
                  <p className="text-xs text-base-content/75">
                    ประเมินสิทธิลดหย่อน ภ.ง.ด. 90/91 พร้อมวิเคราะห์โอกาสประหยัดภาษีคืนสูงสุดหลักหมื่น
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleTabSwitch('calculator')}
                className="btn btn-primary btn-sm rounded-xl font-bold shrink-0 gap-1.5 shadow-sm"
              >
                <span>เปิดโปรแกรมคำนวณภาษี</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </section>

          {/* Posts Grid */}
          <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
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
                          src={resolveAssetUrl(
                            post.imageUrl,
                            'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80'
                          )}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => {
                            e.currentTarget.src =
                              'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80';
                          }}
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
      )}
    </div>
  );
}
