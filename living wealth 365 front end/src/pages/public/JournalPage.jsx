import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Feather,
  Search,
  Clock,
  User,
  Sparkles,
  ArrowRight,
  Filter,
  BookOpen,
  Compass,
  Tag,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { resolveAssetUrl } from '../../api';

export default function JournalPage() {
  const { posts } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPillar, setSelectedPillar] = useState(searchParams.get('pillar') || 'ALL');
  const [selectedType, setSelectedType] = useState('ALL');

  const pillars = [
    { id: 'ALL', label: 'ทั้งหมด' },
    { id: 'LIFE', label: '1. Life (สมดุลชีวิต)' },
    { id: 'WEALTH', label: '2. Wealth (การเงิน)' },
    { id: 'WELLBEING', label: '3. Wellbeing (สุขภาพ)' },
    { id: 'INNER_LIFE', label: '4. Inner Life (โลกภายใน)' },
    { id: 'EARTH_ENERGY', label: '5. Earth & Energy (แร่ธาตุ)' },
    { id: 'JOURNAL', label: "6. Journal & Top's Notes" },
    { id: 'ABOUT', label: '7. Philosophy' },
  ];

  const types = [
    { id: 'ALL', label: 'ทุกรูปแบบ' },
    { id: 'TOPS_NOTES', label: "⭐ Top's Notes" },
    { id: 'JOURNEY', label: "🧭 Joy's Journey" },
    { id: 'ARTICLE', label: '📖 บทความวิชาการ' },
    { id: 'EXPLORING', label: '🔍 การสำรวจร่วมกัน' },
  ];

  const filteredPosts = posts.filter((post) => {
    if (!post.published) return false;
    const matchesPillar = selectedPillar === 'ALL' || post.pillar === selectedPillar;
    const matchesType = selectedType === 'ALL' || post.postType === selectedType;
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      post.title.toLowerCase().includes(searchLower) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(searchLower)) ||
      (post.tags && post.tags.toLowerCase().includes(searchLower));
    return matchesPillar && matchesType && matchesSearch;
  });

  return (
    <div className="w-full space-y-12 py-8">
      {/* 1. HERO BANNER */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="w-full rounded-3xl zen-surface border border-base-300/60 p-6 sm:p-10 lg:p-14 text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/15 text-secondary text-xs sm:text-sm font-bold">
            <Feather className="w-4 h-4" />
            <span>PILLAR 6: JOURNAL & REFLECTIONS • วารสารความคิด</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-primary leading-tight">
            วารสาร คลังความคิด และ Top's Notes
          </h1>

          <p className="text-sm sm:text-base text-base-content/80 max-w-2xl mx-auto leading-relaxed">
            พื้นที่บันทึกการเรียนรู้ เรื่องราวการเดินทางสู่แหล่งกำเนิดหินธรรมชาติ
            บทสนทนาเรื่องชีวิตและการเงิน และการสำรวจความหมายของการใช้ชีวิตที่ดี
          </p>

          {/* Quick Search */}
          <div className="pt-2 max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-base-content/50 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="ค้นหาบทความ, หัวข้อ, หรือ #แท็ก..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input input-md w-full rounded-2xl pl-11 pr-4 bg-base-100 border-base-300 shadow-xs text-sm"
            />
          </div>
        </div>
      </section>

      {/* 2. DUAL FILTER BARS (PILLARS & TYPES) */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 space-y-4">
        {/* Pillar Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-bold zen-muted uppercase tracking-wider shrink-0 mr-1">
            เสาหลัก:
          </span>
          {pillars.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPillar(p.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
                selectedPillar === p.id
                  ? 'bg-primary text-white shadow-xs'
                  : 'bg-base-200/60 text-base-content/75 hover:bg-base-200 hover:text-primary'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Type Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-bold zen-muted uppercase tracking-wider shrink-0 mr-1">
            รูปแบบ:
          </span>
          {types.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedType(t.id)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                selectedType === t.id
                  ? 'bg-secondary text-white font-bold shadow-xs'
                  : 'bg-base-100 border border-base-300 text-base-content/70 hover:border-secondary'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </section>

      {/* 3. POSTS GRID */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        {filteredPosts.length === 0 ? (
          <div className="p-12 text-center rounded-3xl zen-surface border border-base-300/60 space-y-3">
            <BookOpen className="w-12 h-12 text-base-content/30 mx-auto" />
            <h3 className="text-lg font-bold text-base-content/70">ไม่พบบทความที่ค้นหา</h3>
            <p className="text-sm zen-muted">ลองปรับเปลี่ยนคำค้นหา หรือเลือกดูทุกหมวดหมู่</p>
            <button
              onClick={() => {
                setSelectedPillar('ALL');
                setSelectedType('ALL');
                setSearchTerm('');
              }}
              className="btn btn-secondary btn-sm rounded-xl font-bold"
            >
              รีเซ็ตตัวกรอง
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredPosts.map((post) => (
              <Link
                key={post.id || post.slug}
                to={`/journal/${post.slug}`}
                className="p-5 rounded-3xl zen-surface border border-base-300/60 shadow-xs flex flex-col justify-between group hover:border-secondary transition-all"
              >
                <div className="space-y-3">
                  <div className="aspect-video w-full rounded-2xl overflow-hidden bg-base-200">
                    <img
                      src={resolveAssetUrl(post.imageUrl)}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 text-xs">
                    <span className="badge badge-sm badge-primary font-bold">
                      {post.pillar || post.category}
                    </span>
                    {post.postType && post.postType !== 'ARTICLE' && (
                      <span className="badge badge-sm badge-secondary font-bold">
                        {post.postType === 'TOPS_NOTES' ? "Top's Notes" : post.postType === 'JOURNEY' ? 'Journey' : 'Exploring'}
                      </span>
                    )}
                    <span className="zen-muted ml-auto">• {post.readTime || '5 นาที'}</span>
                  </div>

                  <h3 className="text-lg font-bold text-primary group-hover:text-secondary transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-base-content/75 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>

                  {post.tags && (
                    <div className="text-[11px] font-medium text-secondary/80 line-clamp-1">
                      {post.tags}
                    </div>
                  )}
                </div>

                <div className="pt-4 mt-4 border-t border-base-300/40 flex items-center justify-between text-xs font-semibold text-secondary">
                  <span>โดย {post.authorName || post.author}</span>
                  <span className="group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    อ่านต่อ <ArrowRight className="w-3.5 h-3.5" />
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
