import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Coins,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../constants/routes';
import { PILLARS, CORE_VALUES } from '../../constants/content';
import ProductCard from '../../components/mutelu/ProductCard';
import LeadCaptureForm from '../../components/forms/LeadCaptureForm';

export default function HomePage() {
  const { products, posts } = useAuth();
  const [selectedInterest, setSelectedInterest] = useState('ประกันสุขภาพเหมาจ่าย AIA');

  const featuredProducts = products.filter((p) => p.isActive).slice(0, 3);
  const featuredPosts = posts.filter((p) => p.published).slice(0, 3);

  const handleSelectProduct = (prod) => {
    setSelectedInterest(`หินมงคล: ${prod.name}`);
    const el = document.getElementById('consult-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full space-y-20 lg:space-y-28 py-6">
      {/* 1. HERO SECTION */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="w-full rounded-3xl zen-surface border border-base-300/60 p-6 sm:p-10 lg:p-16 relative overflow-hidden shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/15 text-secondary text-xs sm:text-sm font-bold tracking-wide">
                <Sparkles className="w-4 h-4" />
                <span>LIVING WEALTH 365 • พลังชีวิต & ความมั่งคั่งยั่งยืน</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-primary leading-[1.15] tracking-tight">
                ออกแบบชีวิตที่ <span className="text-secondary">มั่นคง มั่งคั่ง</span>{' '}
                และสบายใจตลอด 365 วัน
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-base-content/80 leading-relaxed max-w-2xl">
                ผสานการวางแผนประกันชีวิต สุขภาพเหมาจ่าย และการบริหารภาษีแบบมืออาชีพ
                ควบคู่กับศาสตร์พลังใจและวัตถุมงคลเสริมดวงชะตา เพื่อความสุขที่สมบูรณ์แบบ
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#consult-form"
                  className="btn btn-primary btn-md sm:btn-lg rounded-2xl font-bold px-6 sm:px-8 shadow-md gap-2"
                >
                  <span>นัดหมายปรึกษาฟรี</span>
                  <ArrowRight className="w-5 h-5" />
                </a>

                <Link
                  to={ROUTES.MUTELU}
                  className="btn btn-outline btn-md sm:btn-lg rounded-2xl font-bold px-6 sm:px-8 gap-2"
                >
                  <Sparkles className="w-5 h-5 text-secondary" />
                  <span>แคตตาล็อกสายมู</span>
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="pt-4 flex flex-wrap items-center gap-4 sm:gap-8 text-xs sm:text-sm font-semibold text-base-content/70">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span>ตัวแทนประกันชีวิต AIA ได้รับอนุญาต</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span>วางแผนภาษีถูกต้องตามกฎหมาย</span>
                </div>
              </div>
            </div>

            {/* Right Visual Image */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-base-100">
                <img
                  src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1000&auto=format&fit=crop&q=80"
                  alt="Living Wealth 365 Financial & Wealth Flow"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-primary/80 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white">
                    <span className="text-xs uppercase tracking-widest font-bold text-secondary">
                      Serene Prosperity
                    </span>
                    <h3 className="text-xl font-bold">
                      สุขภาพดี • การเงินมั่นคง • จิตใจสงบสุข
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 6 CORE VALUES RIBBON */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-secondary">
            Core Philosophy
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-primary">
            6 คุณค่าหลัก สู่ชีวิตที่สมบูรณ์แบบ
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {CORE_VALUES.map((val) => {
            const Icon = val.icon;
            return (
              <div
                key={val.label}
                className="zen-surface rounded-2xl p-4 sm:p-5 text-center border border-base-300/50 hover:border-secondary/50 transition-all duration-300 hover:-translate-y-1 shadow-xs"
              >
                <div className="w-10 h-10 rounded-xl bg-secondary/15 text-secondary mx-auto flex items-center justify-center mb-2">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-xs font-black tracking-widest text-primary">
                  {val.label}
                </div>
                <div className="text-xs font-medium text-base-content/70 mt-1">
                  {val.text}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. THREE PILLARS OF WEALTH */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-secondary">
            3 Pillars of Living Wealth
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-primary">
            เสาหลักแห่งความมั่นคงทางการเงิน
          </h2>
          <p className="text-sm sm:text-base text-base-content/70">
            การวางแผนที่ออกแบบเฉพาะคุณ ครอบคลุมตั้งแต่การปกป้องความเสี่ยงจนถึงการเติบโตของสินทรัพย์
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                className="zen-surface rounded-3xl p-6 sm:p-8 border border-base-300/60 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="badge badge-outline text-xs font-bold">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-primary">
                    {pillar.title}
                  </h3>
                  <p className="text-xs font-semibold text-secondary uppercase tracking-wider">
                    {pillar.english}
                  </p>
                  <p className="text-sm text-base-content/70 leading-relaxed">
                    {pillar.desc}
                  </p>

                  <ul className="space-y-2 pt-2 border-t border-base-300/40">
                    {pillar.points.map((pt, idx) => (
                      <li key={idx} className="text-xs font-semibold flex items-center gap-2 text-base-content/80">
                        <CheckCircle2 className="w-3.5 h-3.5 text-success shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6">
                  <Link
                    to={ROUTES.INSURANCE_LIFE}
                    className="btn btn-outline btn-primary btn-sm w-full rounded-xl font-bold gap-1.5"
                  >
                    <span>ดูรายละเอียด</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. FEATURED MUTELU PRODUCTS */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/15 text-secondary text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Auspicious Prosperity</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-primary">
              วัตถุมงคล & หินนำโชค เสริมพลังใจ
            </h2>
            <p className="text-sm text-base-content/70">
              หินธรรมชาติแท้ คัดสรรตามหลักศาสตร์โบราณเพื่อส่งเสริมการงาน การเงิน และสุขภาพ
            </p>
          </div>

          <Link
            to={ROUTES.MUTELU}
            className="btn btn-ghost text-primary font-bold gap-1.5 self-start sm:self-auto"
          >
            <span>ดูทั้งหมดในแคตตาล็อก</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectForLead={handleSelectProduct}
            />
          ))}
        </div>
      </section>

      {/* 5. FEATURED ARTICLES */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-2">
              <Coins className="w-3.5 h-3.5" />
              <span>Knowledge Hub</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-primary">
              คลังความรู้การเงินและการวางแผนภาษี
            </h2>
            <p className="text-sm text-base-content/70">
              บทความคัดสรรเพื่อช่วยให้คุณบริหารจัดการเงินอย่างชาญฉลาดและคุ้มค่าที่สุด
            </p>
          </div>

          <Link
            to={ROUTES.BLOG}
            className="btn btn-ghost text-primary font-bold gap-1.5 self-start sm:self-auto"
          >
            <span>อ่านบทความทั้งหมด</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPosts.map((post) => (
            <Link
              key={post.id}
              to={ROUTES.BLOG_DETAIL(post.slug)}
              className="zen-surface rounded-3xl overflow-hidden border border-base-300/60 shadow-xs hover:shadow-lg transition-all duration-300 group flex flex-col justify-between"
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
                <div className="p-5 space-y-2">
                  <h3 className="text-lg font-black text-primary group-hover:text-secondary transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-base-content/70 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between text-xs text-base-content/60 border-t border-base-300/40">
                <span>{post.readTime}</span>
                <span className="text-primary font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  อ่านต่อ <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. LEAD CAPTURE FORM SECTION */}
      <section id="consult-form" className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 scroll-mt-24">
        <LeadCaptureForm
          defaultInterest={selectedInterest}
          title="พร้อมเริ่มต้นสร้างชีวิตที่มั่นคงแล้วหรือยัง?"
          subtitle="ให้ที่ปรึกษาจาก Living Wealth 365 ช่วยคำนวณและออกแบบแผนการเงินที่คุ้มค่าที่สุดสำหรับคุณ"
        />
      </section>
    </div>
  );
}
