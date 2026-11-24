import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Feather,
  Gem,
  ArrowRight,
  ChevronRight,
  HeartHandshake,
} from 'lucide-react';
import { ROUTES } from '../../constants/routes';
import FramedImage from '../common/FramedImage';
import ProductCard from '../mutelu/ProductCard';
import EditableText from '../common/EditableText';

export default function HomeCuratedShowcase({
  posts = [],
  products = [],
  content,
  onSelectProduct,
}) {
  const [activeTab, setActiveTab] = useState('articles'); // 'articles' | 'minerals'

  const featuredPosts = posts.filter((p) => p.published).slice(0, 3);
  const curatedProducts = products.filter((p) => p.isActive).slice(0, 3);

  return (
    <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 space-y-10">
      {/* 1. TABBED CURATED SHOWCASE (Articles | Minerals) */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div
              role="tablist"
              aria-label="เลือกดูบทความหรือแร่ธาตุคัดสรร"
              className="inline-flex flex-wrap gap-1.5 p-1 rounded-2xl bg-base-200/75 border border-base-300/60"
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'articles'}
                onClick={() => setActiveTab('articles')}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === 'articles'
                    ? 'bg-primary text-primary-content shadow-xs'
                    : 'text-base-content/80 hover:text-primary'
                }`}
              >
                <Feather className="w-4 h-4 shrink-0" />
                <span>บทความ &amp; Admin A&apos;s Notes</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'minerals'}
                onClick={() => setActiveTab('minerals')}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === 'minerals'
                    ? 'bg-primary text-primary-content shadow-xs'
                    : 'text-base-content/80 hover:text-primary'
                }`}
              >
                <Gem className="w-4 h-4 shrink-0" />
                <span>แร่ธาตุธรรมชาติคัดสรร</span>
              </button>
            </div>

            <h2 className="editorial-display text-2xl sm:text-3xl font-bold text-primary">
              {activeTab === 'articles' ? (
                <EditableText
                  fieldKey="journal.title"
                  label="หมวดวารสาร หัวข้อ"
                  fallback="บทความคัดสรรเพื่อวางแผนชีวิตและเกษียณ"
                />
              ) : (
                <EditableText
                  fieldKey="minerals.title"
                  label="หมวดแร่ธาตุ หัวข้อ"
                  fallback="แร่ธาตุธรรมชาติ คัดสรรตามหลักวิทยาศาสตร์และจักระ"
                />
              )}
            </h2>
          </div>

          <Link
            to={
              activeTab === 'articles'
                ? content?.journal?.btnLink || ROUTES.JOURNAL
                : content?.minerals?.btnLink || ROUTES.EARTH_ENERGY
            }
            className="btn btn-ghost text-secondary hover:text-primary font-bold gap-1.5 self-start md:self-auto"
          >
            <span>
              {activeTab === 'articles' ? 'อ่านวารสารทั้งหมด' : 'ชมคลังแร่ทั้งหมด'}
            </span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </Link>
        </div>

        {activeTab === 'articles' ? (
          featuredPosts.length === 0 ? (
            <div className="zen-surface rounded-3xl p-8 text-center text-sm text-base-content/70 border border-base-300/60">
              กำลังเตรียมบทความชุดใหม่จาก Admin A &amp; Admin B เร็วๆ นี้ครับ
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredPosts.map((post) => (
                <Link
                  key={post.id || post.slug}
                  to={`/journal/${post.slug}`}
                  className="zen-surface rounded-3xl overflow-hidden border border-base-300/60 shadow-xs hover:border-secondary transition-all group flex flex-col justify-between p-5"
                >
                  <div className="space-y-3">
                    <div className="aspect-16/9 w-full overflow-hidden bg-base-200 rounded-2xl relative">
                      <FramedImage
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="badge badge-primary absolute top-3 left-3 text-xs font-bold shadow-xs">
                        {post.pillar || post.category}
                      </span>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-xs zen-muted">
                        <span>
                          {post.postType === 'TOPS_NOTES' ? "Admin A's Notes" : 'Article'}
                        </span>
                        <span>• {post.readTime || '5 นาที'}</span>
                      </div>
                      <h3 className="text-lg font-black text-primary group-hover:text-secondary transition-colors line-clamp-2 leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-base-content/75 line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-3 flex items-center justify-between text-xs text-base-content/60 border-t border-base-300/40">
                    <span>โดย {post.authorName || post.author}</span>
                    <span className="text-secondary font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      อ่านต่อ <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {curatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectForLead={onSelectProduct}
              />
            ))}
          </div>
        )}
      </div>

      {/* 2. COMPACT ADMIN A & ADMIN B TRUST STRIP */}
      <div className="rounded-3xl zen-surface border border-secondary/30 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Compact Dual Avatars */}
            <div className="flex -space-x-3 shrink-0">
              <img
                src={
                  content?.narrative?.adminAImage ||
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80'
                }
                alt="Admin A - Life & Wealth Planner"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-secondary/50 shadow-sm"
              />
              <img
                src={
                  content?.narrative?.adminBImage ||
                  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80'
                }
                alt="Admin B - Natural Energy & Wellbeing Curator"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-secondary/50 shadow-sm"
              />
            </div>

            <div className="space-y-1.5 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 text-xs font-black text-secondary uppercase tracking-wider">
                <HeartHandshake className="w-4 h-4 shrink-0" />
                <EditableText
                  fieldKey="narrative.badge"
                  label="Narrative Badge"
                  fallback="ADMIN A & ADMIN B • เพื่อนร่วมทางของคุณ"
                />
              </div>
              <h3 className="text-lg sm:text-xl font-black text-primary leading-snug">
                <EditableText
                  fieldKey="narrative.titleLine1"
                  label="Narrative คำคมบรรทัด 1"
                  fallback="เริ่มจากการรับฟังชีวิตที่คุณต้องการ"
                />{' '}
                <EditableText
                  fieldKey="narrative.titleLine2"
                  label="Narrative คำคมบรรทัด 2"
                  fallback="แล้วค่อยวางแผนการเงินไปพร้อมกัน"
                  className="text-secondary"
                />
              </h3>
              <p className="text-sm text-base-content/75 leading-relaxed">
                <EditableText
                  fieldKey="narrative.body"
                  label="Narrative เนื้อหาความเชื่อ"
                  multiline
                  fallback="Admin A และ Admin B เชื่อว่าความมั่นคงทางการเงินกับสุขภาพกายใจต้องเดินไปด้วยกัน เพื่อให้คุณมีเวลาดูแลตัวเองและคนที่รักได้อย่างสบายใจ"
                />
              </p>
            </div>
          </div>

          <Link
            to={ROUTES.ABOUT}
            className="btn btn-outline border-primary/30 text-primary hover:btn-primary rounded-2xl font-bold px-6 gap-2 shrink-0 self-start lg:self-center"
          >
            <span>รู้จัก Admin A &amp; Admin B</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </Link>
        </div>
      </div>
    </section>
  );
}
