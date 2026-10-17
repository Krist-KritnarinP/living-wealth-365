import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  HeartHandshake,
  Activity,
  Gem,
  Coins,
  Brain,
  Feather,
  CheckCircle2,
  ChevronRight,
  Info,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../constants/routes';
import LifeMapTeaser from '../../components/common/LifeMapTeaser';
import ProductCard from '../../components/mutelu/ProductCard';
import LeadCaptureForm from '../../components/forms/LeadCaptureForm';

export default function HomePage() {
  const { products, posts } = useAuth();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const curatedProducts = products.filter((p) => p.isActive).slice(0, 4);
  const featuredPosts = posts.filter((p) => p.published).slice(0, 3);

  const handleSelectProduct = (prod) => {
    setSelectedProduct(prod);
    const el = document.getElementById('talk-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full space-y-20 lg:space-y-28 py-6">
      {/* 🌟 1. HERO HOOK: "วันนี้...อะไรคือสิ่งที่คุณอยากรักษาไว้?" */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="w-full rounded-3xl zen-surface border border-base-300/60 p-6 sm:p-10 lg:p-16 relative overflow-hidden shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/15 text-secondary text-xs sm:text-sm font-bold tracking-wide">
                <Sparkles className="w-4 h-4" />
                <span>A LIFE WELL PLANNED. A LIFE WELL LIVED.</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-primary leading-[1.15] tracking-tight">
                วันนี้... อะไรคือสิ่งที่คุณ <br />
                <span className="text-secondary">อยากรักษาไว้มากที่สุด?</span>
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-base-content/80 leading-relaxed max-w-2xl">
                ไม่ใช่เพียงตัวเลขผลตอบแทนในบัญชี แต่คือสุขภาพที่แข็งแรง เวลาที่มีคุณภาพกับคนที่เรารัก
                และความสงบสุขในจิตใจ Living Wealth 365 คือสะพานเชื่อมระหว่างการวางแผนการเงินที่มั่นคง
                เข้ากับสุขภาพองค์รวมและพลังงานธรรมชาติ คัดสรรโดย <strong>Admin A & Admin B</strong>
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#lifemap"
                  className="btn btn-primary btn-md sm:btn-lg rounded-2xl font-bold px-6 sm:px-8 shadow-md gap-2"
                >
                  <Compass className="w-5 h-5" />
                  <span>สำรวจ Life Map 6 มิติ</span>
                </a>

                <Link
                  to={ROUTES.ABOUT}
                  className="btn btn-secondary btn-outline btn-md sm:btn-lg rounded-2xl font-bold px-6 sm:px-8 gap-2"
                >
                  <span>รู้จัก Admin A & Admin B</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 flex flex-wrap items-center gap-4 sm:gap-8 text-xs sm:text-sm font-semibold text-base-content/70">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span>สถาปัตยกรรมการเงิน & ประกัน AIA ได้รับอนุญาต</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span>วิทยาศาสตร์แร่ธาตุ SiO₂ & สุขภาพ Longevity</span>
                </div>
              </div>
            </div>

            {/* Right Visual Mood */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-base-100">
                <img
                  src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1000&auto=format&fit=crop&q=80"
                  alt="Living Wealth 365 Harmony & Balance"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-primary/80 via-primary/20 to-transparent flex items-end p-6">
                  <div className="text-white space-y-1">
                    <span className="text-xs uppercase tracking-widest font-bold text-secondary">
                      Fellow Travelers
                    </span>
                    <h3 className="text-xl font-bold">
                      สุขภาพดี • การเงินมั่นคง • จิตใจสงบสุข
                    </h3>
                    <p className="text-xs text-white/80">
                      Admin A & Admin B พร้อมร่วมค้นหาชีวิตที่ใช่ที่สุดสำหรับคุณ
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🧭 2. THREE CORE GATEWAYS: LIVING • LEARNING • CONNECTING */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-secondary">
            Three Core Gateways
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-primary">
            3 ประตูสู่การใช้ชีวิตที่สมบูรณ์แบบ
          </h2>
          <p className="text-sm sm:text-base text-base-content/75">
            เลือกสำรวจตามมิติที่คุณต้องการดูแลในวันนี้
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Gateway 1: Living */}
          <div className="zen-surface rounded-3xl p-6 sm:p-8 border border-base-300/60 shadow-xs hover:border-secondary transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-600 flex items-center justify-center">
                <Activity className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                Gateway 01
              </span>
              <h3 className="text-2xl font-black text-primary group-hover:text-secondary transition-colors">
                Living (วิถีชีวิต)
              </h3>
              <p className="text-sm text-base-content/75 leading-relaxed">
                การสร้างสมดุลชีวิต 6 มิติ (Life Map), วิทยาศาสตร์การชะลอวัยระดับเซลล์ (Longevity),
                และแร่ธาตุธรรมชาติคัดสรรตามหลักธรณีวิทยาและพลังจักระ
              </p>
              <ul className="space-y-2 pt-2 border-t border-base-300/40 text-xs font-semibold text-base-content/80">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>Life: การออกแบบเวลา & เกษียณสำราญ</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>Wellbeing: Home Health Sanctuary</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>Earth & Energy: ผลึกแร่ธาตุ & 3D Visualizer</span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <Link
                to={ROUTES.LIFE}
                className="btn btn-outline btn-primary btn-sm w-full rounded-xl font-bold gap-1.5"
              >
                <span>สำรวจหมวด Living</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Gateway 2: Learning */}
          <div className="zen-surface rounded-3xl p-6 sm:p-8 border border-base-300/60 shadow-xs hover:border-secondary transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/15 text-amber-600 flex items-center justify-center">
                <Coins className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                Gateway 02
              </span>
              <h3 className="text-2xl font-black text-primary group-hover:text-secondary transition-colors">
                Learning (การเรียนรู้)
              </h3>
              <p className="text-sm text-base-content/75 leading-relaxed">
                สถาปัตยกรรมการเงิน 4 เสาหลัก, การคำนวณและวางแผนภาษีเชิงรุก 2568,
                และโลกภายใน (Inner Life) เพื่อคืนความเงียบสงบให้จิตใจ
              </p>
              <ul className="space-y-2 pt-2 border-t border-base-300/40 text-xs font-semibold text-base-content/80">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  <span>Wealth: แผนประกันเหมาจ่าย & ภาษี 2568</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  <span>Inner Life: ศิลปะแห่งความเงียบสงบ (Stillness)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  <span>Journal: บันทึกความคิดของ Admin A & Admin B</span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <Link
                to={ROUTES.WEALTH}
                className="btn btn-outline btn-primary btn-sm w-full rounded-xl font-bold gap-1.5"
              >
                <span>สำรวจหมวด Learning</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Gateway 3: Connecting */}
          <div className="zen-surface rounded-3xl p-6 sm:p-8 border border-base-300/60 shadow-xs hover:border-secondary transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-secondary/15 text-secondary flex items-center justify-center">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                Gateway 03
              </span>
              <h3 className="text-2xl font-black text-primary group-hover:text-secondary transition-colors">
                Connecting (เพื่อนร่วมทาง)
              </h3>
              <p className="text-sm text-base-content/75 leading-relaxed">
                ทำความรู้จักเรื่องราวของ Admin A & Admin B และเปิดพื้นที่พูดคุยอย่างอบอุ่น (Let's Talk)
                ไม่มีการเร่งรัดขายผลิตภัณฑ์ มีเพียงบทสนทนาที่จริงใจเพื่อชีวิตคุณ
              </p>
              <ul className="space-y-2 pt-2 border-t border-base-300/40 text-xs font-semibold text-base-content/80">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  <span>About: จุดเริ่มต้นของ Living Wealth 365</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  <span>Fellow Travelers: ปรัชญาไม่ตัดสิน</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  <span>Let's Talk: นัดหมายพูดคุยฟรี 1-on-1</span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <Link
                to={ROUTES.ABOUT}
                className="btn btn-secondary btn-sm w-full text-white rounded-xl font-bold gap-1.5 shadow-xs"
              >
                <span>รู้จักเรา & นัดหมายพูดคุย</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 📊 3. INTERACTIVE 6-DIMENSION LIFE MAP TEASER */}
      <section id="lifemap" className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 scroll-mt-24">
        <LifeMapTeaser standalone={false} />
      </section>

      {/* 👤 4. ADMIN A & ADMIN B PERSONAL BRAND NARRATIVE */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="p-8 sm:p-12 lg:p-16 rounded-3xl zen-surface border border-secondary/30 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Visuals */}
            <div className="lg:col-span-5 flex justify-center gap-4">
              <div className="relative aspect-4/5 w-44 sm:w-52 rounded-3xl overflow-hidden shadow-lg border-2 border-secondary/40">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80"
                  alt="Admin A - Life & Wealth Planner"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 right-2 p-2 rounded-xl bg-black/60 backdrop-blur-md text-white text-center">
                  <span className="text-xs font-bold block">Admin A</span>
                  <span className="text-[10px] text-secondary">Life & Wealth Planner</span>
                </div>
              </div>

              <div className="relative aspect-4/5 w-44 sm:w-52 rounded-3xl overflow-hidden shadow-lg border-2 border-secondary/40 mt-6">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80"
                  alt="Admin B - Natural Energy & Wellbeing Curator"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 right-2 p-2 rounded-xl bg-black/60 backdrop-blur-md text-white text-center">
                  <span className="text-xs font-bold block">Admin B</span>
                  <span className="text-[10px] text-secondary">Energy & Wellbeing</span>
                </div>
              </div>
            </div>

            {/* Narrative Content */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/15 text-secondary text-xs font-bold tracking-wide">
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>FELLOW TRAVELERS • เพื่อนร่วมทางของคุณ</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-primary leading-tight">
                "เราไม่ได้มาเป็นผู้รู้ที่คอยสั่งสอน <br />
                <span className="text-secondary">แต่พร้อมรับฟังเพื่อค้นหาชีวิตที่ใช่"</span>
              </h2>

              <p className="text-sm sm:text-base text-base-content/80 leading-relaxed">
                การมีเงินเยอะแต่สุขภาพทรุดโทรมไม่ใช่ความสำเร็จ และการแสวงหาความสงบแต่ขาดการวางแผนความเสี่ยงก็ทำให้ชีวิตเปราะบาง
                Admin A และ Admin B เชื่อว่า การวางแผนชีวิตและการเชื่อมโยงกับพลังธรรมชาติสามารถเดินเคียงข้างกันได้อย่างลงตัว
              </p>

              <div className="p-4 rounded-2xl bg-base-200/60 border border-base-300/40 text-xs sm:text-sm italic text-base-content/75">
                "ทุกบทสนทนาเริ่มต้นที่การรับฟัง ไม่มีสคริปต์การขาย ไม่มีแรงกดดัน มีเพียงความตั้งใจที่จะช่วยให้ชีวิตของคุณเบาใจที่สุด"
              </div>

              <div className="pt-2">
                <Link
                  to="/about#talk"
                  className="btn btn-secondary btn-md rounded-2xl text-white font-bold px-6 shadow-xs gap-2"
                >
                  <span>นัดหมายสนทนา (Let's Talk)</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 💎 5. CURATED EARTH & ENERGY HIGHLIGHTS */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/15 text-secondary text-xs font-bold mb-2">
              <Gem className="w-3.5 h-3.5" />
              <span>Earth & Energy Curation</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-primary">
              แร่ธาตุธรรมชาติ คัดสรรตามหลักวิทยาศาสตร์และจักระ
            </h2>
            <p className="text-sm zen-muted">
              ผลึกธรรมชาติแท้ โครงสร้าง SiO₂ และคุณสมบัติเพียโซอิเล็กทริกเพื่อความสงบมั่นคง
            </p>
          </div>

          <Link
            to={ROUTES.EARTH_ENERGY}
            className="btn btn-ghost text-secondary hover:text-primary font-bold gap-1.5 self-start sm:self-auto"
          >
            <span>เปิด 3D Visualizer & คลังแร่ทั้งหมด</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {curatedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectForLead={handleSelectProduct}
            />
          ))}
        </div>
      </section>

      {/* 📰 6. CURATED ARTICLES & ADMIN A'S NOTES */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-2">
              <Feather className="w-3.5 h-3.5" />
              <span>Reflections & Knowledge Hub</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-primary">
              วารสารความคิดและ Admin A's Notes
            </h2>
            <p className="text-sm zen-muted">
              บทความคัดสรรเพื่อช่วยให้คุณวางแผนชีวิต บริหารภาษี และดูแลสุขภาพ
            </p>
          </div>

          <Link
            to={ROUTES.JOURNAL}
            className="btn btn-ghost text-secondary hover:text-primary font-bold gap-1.5 self-start sm:self-auto"
          >
            <span>อ่านวารสารทั้งหมด</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPosts.map((post) => (
            <Link
              key={post.id || post.slug}
              to={`/journal/${post.slug}`}
              className="zen-surface rounded-3xl overflow-hidden border border-base-300/60 shadow-xs hover:border-secondary transition-all group flex flex-col justify-between p-5"
            >
              <div className="space-y-3">
                <div className="aspect-16/9 w-full overflow-hidden bg-base-200 rounded-2xl relative">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="badge badge-primary absolute top-3 left-3 text-xs font-bold shadow-xs">
                    {post.pillar || post.category}
                  </span>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs zen-muted">
                    <span>{post.postType === 'TOPS_NOTES' ? "Admin A's Notes" : 'Article'}</span>
                    <span>• {post.readTime || '5 นาที'}</span>
                  </div>
                  <h3 className="text-lg font-black text-primary group-hover:text-secondary transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-base-content/75 line-clamp-2 leading-relaxed">
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
      </section>

      {/* 🤝 7. LET'S TALK FORM SECTION */}
      <section id="talk-form" className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 scroll-mt-24">
        <LeadCaptureForm
          selection={selectedProduct}
          defaultInterest={selectedProduct ? `แร่ธาตุ: ${selectedProduct.name}` : "Let's Talk กับ Admin A & Admin B (การวางแผนชีวิตและสมดุล 6 มิติ)"}
          title="พร้อมเริ่มต้นสร้างชีวิตที่คุณอยากรักษาไว้แล้วหรือยัง?"
          subtitle="Admin A & Admin B พร้อมรับฟังและร่วมออกแบบแนวทางชีวิตและการเงินที่เหมาะกับคุณโดยเฉพาะ (ไม่มีค่าใช้จ่าย)"
        />
      </section>
    </div>
  );
}
