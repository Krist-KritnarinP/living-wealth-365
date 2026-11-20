import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  Sparkles,
  ArrowRight,
  HeartHandshake,
  Activity,
  Gem,
  Coins,
  Feather,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSiteCustomizer } from '../../context/SiteCustomizerContext';
import { ROUTES } from '../../constants/routes';
import LifeMapTeaser from '../../components/common/LifeMapTeaser';
import TaxTeaser from '../../components/tax/TaxTeaser';
import ProductCard from '../../components/mutelu/ProductCard';
import LeadCaptureForm from '../../components/forms/LeadCaptureForm';
import EditableText from '../../components/common/EditableText';
import HandDrawnUnderline from '../../components/common/HandDrawnUnderline';
import HeroStatTiles from '../../components/common/HeroStatTiles';
import HeroInteractiveFocus from '../../components/common/HeroInteractiveFocus';
import CopyToLineSection from '../../components/common/CopyToLineSection';
import RevealOnScroll from '../../components/common/RevealOnScroll';

export default function HomePage() {
  const { products, posts } = useAuth();
  const { content } = useSiteCustomizer();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const curatedProducts = products.filter((p) => p.isActive).slice(0, 4);
  const featuredPosts = posts.filter((p) => p.published).slice(0, 3);

  const handleSelectProduct = (prod) => {
    setSelectedProduct(prod);
    const el = document.getElementById('talk-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectFocus = (focusItem) => {
    setSelectedProduct({
      name: `${focusItem.category}: ${focusItem.topic} (ที่ปรึกษา: ${focusItem.advisor})`,
    });
  };

  const handleGlassMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto space-y-16 sm:space-y-20 lg:space-y-24 py-4 sm:py-8">
      {/* 🌟 1. CINEMATIC HERO STAGE: DJI Showcase × Apple Liquid Glass */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 pt-4 sm:pt-8 space-y-10 sm:space-y-12">
        {/* Centered Hero Statement */}
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full zen-surface text-primary text-sm sm:text-base font-semibold">
            <Sparkles className="w-4 h-4 text-secondary shrink-0" />
            <EditableText
              fieldKey="hero.badge"
              label="Hero ป้ายหัวข้อ"
              fallback="A life well planned, a life well lived"
            />
          </div>

          <h1 className="editorial-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-primary leading-[1.15] min-w-0">
            <EditableText
              fieldKey="hero.titleLine1"
              label="Hero หัวข้อ บรรทัด 1"
              fallback="วันนี้... อะไรคือสิ่งที่คุณ"
            />{' '}
            <br />
            <HandDrawnUnderline color="var(--color-secondary)">
              <EditableText
                fieldKey="hero.titleLine2"
                label="Hero หัวข้อ บรรทัด 2 (เน้นสีทอง)"
                fallback="อยากรักษาไว้มากที่สุด?"
                className="text-secondary"
              />
            </HandDrawnUnderline>
          </h1>

          <p className="text-base sm:text-xl lg:text-2xl text-base-content/85 leading-relaxed max-w-3xl mx-auto font-normal">
            <EditableText
              fieldKey="hero.description"
              label="Hero คำบรรยายหลัก"
              multiline
              fallback="ไม่ใช่เพียงตัวเลขผลตอบแทนในบัญชี แต่คือสุขภาพที่แข็งแรง เวลาที่มีคุณภาพกับคนที่เรารัก และความสงบสุขในจิตใจ Living Wealth 365 คือสะพานเชื่อมระหว่างการวางแผนการเงินที่มั่นคง เข้ากับสุขภาพองค์รวมและพลังงานธรรมชาติ คัดสรรโดย คุณท็อป & คุณจอย"
            />
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <a
              href={content?.hero?.primaryBtnLink || '#lifemap'}
              className="btn btn-primary btn-lg rounded-full font-bold px-8 shadow-lg hover:shadow-xl hover:scale-[1.03] transition-[transform,box-shadow] duration-200 gap-2 text-base sm:text-lg"
            >
              <Compass className="w-5 h-5 shrink-0" />
              <EditableText
                fieldKey="hero.primaryBtnText"
                label="ข้อความปุ่มหลัก Hero"
                fallback="สำรวจ Life Map 6 มิติ"
              />
            </a>

            <Link
              to={content?.hero?.secondaryBtnLink || ROUTES.ABOUT}
              className="btn zen-surface text-primary hover:text-secondary btn-lg rounded-full font-bold px-8 hover:scale-[1.03] transition-[transform,color] duration-200 gap-2 text-base sm:text-lg"
            >
              <EditableText
                fieldKey="hero.secondaryBtnText"
                label="ข้อความปุ่มรอง Hero"
                fallback="รู้จักคุณท็อป & คุณจอย"
              />
              <ArrowRight className="w-5 h-5 shrink-0" />
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-sm sm:text-base font-medium text-base-content/80">
            <div className="flex items-center gap-2 min-w-0">
              <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
              <EditableText
                fieldKey="hero.trust1"
                label="ข้อความความน่าเชื่อถือ 1"
                fallback="สถาปัตยกรรมการเงิน & ประกัน AIA ได้รับอนุญาต"
              />
            </div>
            <div className="flex items-center gap-2 min-w-0">
              <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
              <EditableText
                fieldKey="hero.trust2"
                label="ข้อความความน่าเชื่อถือ 2"
                fallback="วิทยาศาสตร์แร่ธาตุ SiO₂ & สุขภาพ Longevity"
              />
            </div>
          </div>
        </div>

        {/* 📊 Full-Width Liquid Glass Spec Strip (DJI Style) */}
        <div className="max-w-5xl mx-auto">
          <HeroStatTiles />
        </div>

        {/* 🎛️ Panoramic Liquid Glass Interactive Focus Console */}
        <div className="max-w-6xl mx-auto">
          <HeroInteractiveFocus onSelectFocus={handleSelectFocus} />
        </div>
      </section>

      {/* 🧭 2. THREE CORE GATEWAYS: ASYMMETRICAL EDITORIAL BENTO LAYOUT */}
      <RevealOnScroll>
        <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-base-300/60 pb-6 mb-8">
            <div className="space-y-1.5 max-w-2xl">
              <span className="text-sm font-semibold text-secondary block">
                <EditableText
                  fieldKey="gateways.sectionBadge"
                  label="หัวข้อหมวด Gateways (Badge)"
                  fallback="3 เสาหลักการใช้ชีวิต"
                />
              </span>
              <h2 className="editorial-display text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">
                <EditableText
                  fieldKey="gateways.sectionTitle"
                  label="หัวข้อหลัก 3 ประตูใหญ่"
                  fallback="3 ประตูสู่การใช้ชีวิตที่สมบูรณ์แบบ"
                />
              </h2>
            </div>
            <p className="text-sm sm:text-base text-base-content/75 max-w-md">
              <EditableText
                fieldKey="gateways.sectionSubtitle"
                label="คำบรรยายย่อย 3 ประตูใหญ่"
                fallback="เลือกสำรวจตามมิติที่คุณต้องการดูแลในวันนี้"
              />
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Gateway 01: Featured Anchor Column (Left 5 cols) */}
            <div
              onMouseMove={handleGlassMove}
              className="lg:col-span-5 zen-surface liquid-glass-interactive hover-card-elevate rounded-3xl p-6 sm:p-8 flex flex-col justify-between group min-w-0"
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-500/12 text-emerald-600 flex items-center justify-center hover-icon-spin shrink-0">
                    <Activity className="w-5 h-5" />
                  </div>
                  <span className="editorial-display text-3xl font-bold text-base-content/15 select-none">
                    01
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-semibold text-secondary block">
                    <EditableText
                      fieldKey="gateways.living.badge"
                      label="Gateway 1 Badge"
                      fallback="มิติที่ 01"
                    />
                  </span>
                  <h3 className="editorial-display text-2xl sm:text-3xl font-bold text-primary group-hover:text-secondary transition-colors">
                    <EditableText
                      fieldKey="gateways.living.title"
                      label="Gateway 1 ชื่อหมวด"
                      fallback="Living (วิถีชีวิต)"
                    />
                  </h3>
                  <p className="text-sm sm:text-base text-base-content/75 leading-relaxed">
                    <EditableText
                      fieldKey="gateways.living.desc"
                      label="Gateway 1 คำอธิบาย"
                      multiline
                      fallback="การสร้างสมดุลชีวิต 6 มิติ (Life Map), วิทยาศาสตร์การชะลอวัยระดับเซลล์ (Longevity), และแร่ธาตุธรรมชาติคัดสรรตามหลักธรณีวิทยาและพลังจักระ"
                    />
                  </p>
                </div>

                <ul className="space-y-2.5 pt-4 border-t border-base-300/40 text-xs sm:text-sm font-medium text-base-content/80">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5"></span>
                    <EditableText
                      fieldKey="gateways.living.point1"
                      label="Gateway 1 หัวข้อย่อย 1"
                      fallback="Life: การออกแบบเวลา & เกษียณสำราญ"
                    />
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5"></span>
                    <EditableText
                      fieldKey="gateways.living.point2"
                      label="Gateway 1 หัวข้อย่อย 2"
                      fallback="Wellbeing: Home Health Sanctuary"
                    />
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5"></span>
                    <EditableText
                      fieldKey="gateways.living.point3"
                      label="Gateway 1 หัวข้อย่อย 3"
                      fallback="Earth & Energy: ผลึกแร่ธาตุ & พลังงานธรรมชาติ"
                    />
                  </li>
                </ul>
              </div>

              <div className="pt-6">
                <Link
                  to={content?.gateways?.living?.link || ROUTES.LIFE}
                  className="btn btn-outline btn-primary btn-sm sm:btn-md w-full rounded-xl font-bold gap-1.5"
                >
                  <EditableText
                    fieldKey="gateways.living.btnText"
                    label="Gateway 1 ข้อความปุ่ม"
                    fallback="สำรวจหมวด Living"
                  />
                  <ChevronRight className="w-4 h-4 shrink-0" />
                </Link>
              </div>
            </div>

            {/* Right Column: Stacked Editorial Cards 02 & 03 (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-6 min-w-0">
              {/* Gateway 02: Learning */}
              <div
                onMouseMove={handleGlassMove}
                className="zen-surface liquid-glass-interactive hover-card-elevate rounded-3xl p-6 sm:p-7 flex-1 flex flex-col justify-between group min-w-0"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/12 text-amber-600 flex items-center justify-center hover-icon-spin shrink-0">
                        <Coins className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs font-semibold text-secondary block">
                          <EditableText
                            fieldKey="gateways.learning.badge"
                            label="Gateway 2 Badge"
                            fallback="มิติที่ 02"
                          />
                        </span>
                        <h3 className="editorial-display text-xl sm:text-2xl font-bold text-primary group-hover:text-secondary transition-colors">
                          <EditableText
                            fieldKey="gateways.learning.title"
                            label="Gateway 2 ชื่อหมวด"
                            fallback="Learning (การเรียนรู้)"
                          />
                        </h3>
                      </div>
                    </div>
                    <span className="editorial-display text-2xl font-bold text-base-content/15 select-none shrink-0">
                      02
                    </span>
                  </div>

                  <p className="text-sm text-base-content/75 leading-relaxed">
                    <EditableText
                      fieldKey="gateways.learning.desc"
                      label="Gateway 2 คำอธิบาย"
                      multiline
                      fallback="สถาปัตยกรรมการเงิน 4 เสาหลัก, การคำนวณและวางแผนภาษีเชิงรุก 2568, และโลกภายใน (Inner Life) เพื่อคืนความเงียบสงบให้จิตใจ"
                    />
                  </p>

                  <div className="flex flex-wrap gap-x-5 gap-y-1.5 pt-2 text-xs font-medium text-base-content/80">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></span>
                      <EditableText
                        fieldKey="gateways.learning.point1"
                        label="Gateway 2 หัวข้อย่อย 1"
                        fallback="Wealth: แผนประกันเหมาจ่าย & ภาษี 2568"
                      />
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></span>
                      <EditableText
                        fieldKey="gateways.learning.point2"
                        label="Gateway 2 หัวข้อย่อย 2"
                        fallback="Inner Life: ศิลปะแห่งความเงียบสงบ"
                      />
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></span>
                      <EditableText
                        fieldKey="gateways.learning.point3"
                        label="Gateway 2 หัวข้อย่อย 3"
                        fallback="Journal: บันทึกความคิดคุณท็อป & คุณจอย"
                      />
                    </span>
                  </div>
                </div>

                <div className="pt-4">
                  <Link
                    to={content?.gateways?.learning?.link || ROUTES.WEALTH}
                    className="btn btn-outline btn-primary btn-sm rounded-xl font-bold gap-1.5"
                  >
                    <EditableText
                      fieldKey="gateways.learning.btnText"
                      label="Gateway 2 ข้อความปุ่ม"
                      fallback="สำรวจหมวด Learning"
                    />
                    <ChevronRight className="w-4 h-4 shrink-0" />
                  </Link>
                </div>
              </div>

              {/* Gateway 03: Connecting */}
              <div
                onMouseMove={handleGlassMove}
                className="zen-surface liquid-glass-interactive hover-card-elevate rounded-3xl p-6 sm:p-7 flex-1 flex flex-col justify-between group min-w-0"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center hover-icon-spin shrink-0">
                        <HeartHandshake className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs font-semibold text-secondary block">
                          <EditableText
                            fieldKey="gateways.connecting.badge"
                            label="Gateway 3 Badge"
                            fallback="มิติที่ 03"
                          />
                        </span>
                        <h3 className="editorial-display text-xl sm:text-2xl font-bold text-primary group-hover:text-secondary transition-colors">
                          <EditableText
                            fieldKey="gateways.connecting.title"
                            label="Gateway 3 ชื่อหมวด"
                            fallback="Connecting (เพื่อนร่วมทาง)"
                          />
                        </h3>
                      </div>
                    </div>
                    <span className="editorial-display text-2xl font-bold text-base-content/15 select-none shrink-0">
                      03
                    </span>
                  </div>

                  <p className="text-sm text-base-content/75 leading-relaxed">
                    <EditableText
                      fieldKey="gateways.connecting.desc"
                      label="Gateway 3 คำอธิบาย"
                      multiline
                      fallback="ทำความรู้จักเรื่องราวของคุณท็อป & คุณจอย และเปิดพื้นที่พูดคุยอย่างอบอุ่น (Let's Talk) ไม่มีการเร่งรัดขายผลิตภัณฑ์ มีเพียงบทสนทนาที่จริงใจเพื่อชีวิตคุณ"
                    />
                  </p>

                  <div className="flex flex-wrap gap-x-5 gap-y-1.5 pt-2 text-xs font-medium text-base-content/80">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0"></span>
                      <EditableText
                        fieldKey="gateways.connecting.point1"
                        label="Gateway 3 หัวข้อย่อย 1"
                        fallback="About: จุดเริ่มต้น Living Wealth 365"
                      />
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0"></span>
                      <EditableText
                        fieldKey="gateways.connecting.point2"
                        label="Gateway 3 หัวข้อย่อย 2"
                        fallback="Fellow Travelers: ปรัชญาไม่ตัดสิน"
                      />
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0"></span>
                      <EditableText
                        fieldKey="gateways.connecting.point3"
                        label="Gateway 3 หัวข้อย่อย 3"
                        fallback="Let's Talk: นัดหมายพูดคุยฟรี 1-on-1"
                      />
                    </span>
                  </div>
                </div>

                <div className="pt-4">
                  <Link
                    to={content?.gateways?.connecting?.link || ROUTES.ABOUT}
                    className="btn btn-secondary btn-sm text-white rounded-xl font-bold gap-1.5 shadow-xs"
                  >
                    <EditableText
                      fieldKey="gateways.connecting.btnText"
                      label="Gateway 3 ข้อความปุ่ม"
                      fallback="รู้จักเรา & นัดหมายพูดคุย"
                    />
                    <ChevronRight className="w-4 h-4 shrink-0" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* 📊 3. INTERACTIVE 6-DIMENSION LIFE MAP TEASER */}
      <section id="lifemap" className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 scroll-mt-24">
        <LifeMapTeaser standalone={false} />
      </section>

      {/* 🧮 4. INTERACTIVE PERSONAL TAX PLANNING TEASER */}
      <section id="tax-teaser" className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 scroll-mt-24">
        <TaxTeaser />
      </section>

      {/* 👤 4. ADMIN A & ADMIN B PERSONAL BRAND NARRATIVE */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="p-8 sm:p-12 lg:p-16 rounded-3xl zen-surface border border-secondary/30 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Visuals */}
            <div className="lg:col-span-5 flex justify-center gap-4">
              <div className="relative aspect-4/5 w-44 sm:w-52 rounded-3xl overflow-hidden shadow-lg border-2 border-secondary/40">
                <img
                  src={
                    content?.narrative?.adminAImage ||
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80'
                  }
                  alt="คุณท็อป - Life & Wealth Planner"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 right-2 p-2 rounded-xl bg-black/60 backdrop-blur-md text-white text-center">
                  <span className="text-xs font-bold block">{content?.brand?.adminAName || 'คุณท็อป'}</span>
                  <span className="text-[10px] text-secondary">
                    {content?.brand?.adminARole || 'Life & Wealth Planner'}
                  </span>
                </div>
              </div>

              <div className="relative aspect-4/5 w-44 sm:w-52 rounded-3xl overflow-hidden shadow-lg border-2 border-secondary/40 mt-6">
                <img
                  src={
                    content?.narrative?.adminBImage ||
                    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80'
                  }
                  alt="คุณจอย - Natural Energy & Wellbeing Curator"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 right-2 p-2 rounded-xl bg-black/60 backdrop-blur-md text-white text-center">
                  <span className="text-xs font-bold block">{content?.brand?.adminBName || 'คุณจอย'}</span>
                  <span className="text-[10px] text-secondary">
                    {content?.brand?.adminBRole || 'Energy & Wellbeing'}
                  </span>
                </div>
              </div>
            </div>

            {/* Narrative Content */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/15 text-secondary text-xs font-bold tracking-wide">
                <HeartHandshake className="w-3.5 h-3.5" />
                <EditableText
                  fieldKey="narrative.badge"
                  label="Narrative Badge"
                  fallback="FELLOW TRAVELERS • เพื่อนร่วมทางของคุณ"
                />
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-primary leading-tight">
                <EditableText
                  fieldKey="narrative.titleLine1"
                  label="Narrative คำคมบรรทัด 1"
                  fallback='"เราไม่ได้มาเป็นผู้รู้ที่คอยสั่งสอน'
                />{' '}
                <br />
                <EditableText
                  fieldKey="narrative.titleLine2"
                  label="Narrative คำคมบรรทัด 2 (เน้นสีทอง)"
                  fallback='แต่พร้อมรับฟังเพื่อค้นหาชีวิตที่ใช่"'
                  className="text-secondary"
                />
              </h2>

              <p className="text-sm sm:text-base text-base-content/80 leading-relaxed">
                <EditableText
                  fieldKey="narrative.body"
                  label="Narrative เนื้อหาความเชื่อ"
                  multiline
                  fallback="การมีเงินเยอะแต่สุขภาพทรุดโทรมไม่ใช่ความสำเร็จ และการแสวงหาความสงบแต่ขาดการวางแผนความเสี่ยงก็ทำให้ชีวิตเปราะบาง คุณท็อป และ คุณจอย เชื่อว่า การวางแผนชีวิตและการเชื่อมโยงกับพลังธรรมชาติสามารถเดินเคียงข้างกันได้อย่างลงตัว"
                />
              </p>

              <div className="p-4 rounded-2xl bg-base-200/60 border border-base-300/40 text-xs sm:text-sm italic text-base-content/75">
                <EditableText
                  fieldKey="narrative.boxQuote"
                  label="Narrative กล่องคำคมไฮไลต์"
                  multiline
                  fallback='"ทุกบทสนทนาเริ่มต้นที่การรับฟัง ไม่มีสคริปต์การขาย ไม่มีแรงกดดัน มีเพียงความตั้งใจที่จะช่วยให้ชีวิตของคุณเบาใจที่สุด"'
                />
              </div>

              <div className="pt-2">
                <Link
                  to={content?.narrative?.btnLink || '/about#talk'}
                  className="btn btn-secondary btn-md rounded-2xl text-white font-bold px-6 shadow-xs gap-2"
                >
                  <EditableText
                    fieldKey="narrative.btnText"
                    label="Narrative ข้อความปุ่ม"
                    fallback="นัดหมายสนทนา (Let's Talk)"
                  />
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
              <EditableText
                fieldKey="minerals.badge"
                label="หมวดแร่ธาตุ Badge"
                fallback="Earth & Energy Curation"
              />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-primary">
              <EditableText
                fieldKey="minerals.title"
                label="หมวดแร่ธาตุ หัวข้อ"
                fallback="แร่ธาตุธรรมชาติ คัดสรรตามหลักวิทยาศาสตร์และจักระ"
              />
            </h2>
            <p className="text-sm zen-muted">
              <EditableText
                fieldKey="minerals.subtitle"
                label="หมวดแร่ธาตุ คำบรรยายย่อย"
                fallback="ผลึกธรรมชาติแท้ โครงสร้าง SiO₂ และคุณสมบัติเพียโซอิเล็กทริกเพื่อความสงบมั่นคง"
              />
            </p>
          </div>

          <Link
            to={content?.minerals?.btnLink || ROUTES.EARTH_ENERGY}
            className="btn btn-ghost text-secondary hover:text-primary font-bold gap-1.5 self-start sm:self-auto"
          >
            <EditableText
              fieldKey="minerals.btnText"
              label="หมวดแร่ธาตุ ข้อความปุ่ม"
              fallback="เปิด 3D Visualizer & คลังแร่ทั้งหมด"
            />
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
              <EditableText
                fieldKey="journal.badge"
                label="หมวดวารสาร Badge"
                fallback="Reflections & Knowledge Hub"
              />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-primary">
              <EditableText
                fieldKey="journal.title"
                label="หมวดวารสาร หัวข้อ"
                fallback="วารสารความคิดและ Top's Notes"
              />
            </h2>
            <p className="text-sm zen-muted">
              <EditableText
                fieldKey="journal.subtitle"
                label="หมวดวารสาร คำบรรยายย่อย"
                fallback="บทความคัดสรรเพื่อช่วยให้คุณวางแผนชีวิต บริหารภาษี และดูแลสุขภาพ"
              />
            </p>
          </div>

          <Link
            to={content?.journal?.btnLink || ROUTES.JOURNAL}
            className="btn btn-ghost text-secondary hover:text-primary font-bold gap-1.5 self-start sm:self-auto"
          >
            <EditableText
              fieldKey="journal.btnText"
              label="หมวดวารสาร ข้อความปุ่ม"
              fallback="อ่านวารสารทั้งหมด"
            />
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
                    <span>{post.postType === 'TOPS_NOTES' ? "Top's Notes" : 'Article'}</span>
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

      {/* 💬 7. COPY-TO-LINE CONSULTATION HELPER SECTION (เหมือน deTeam) */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <CopyToLineSection />
      </section>

      {/* 🤝 8. LET'S TALK FORM SECTION */}
      <section id="talk-form" className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 scroll-mt-24">
        <LeadCaptureForm
          selection={selectedProduct}
          defaultInterest={
            selectedProduct
              ? `แร่ธาตุ: ${selectedProduct.name}`
              : `Let's Talk กับ ${content?.brand?.adminAName || 'คุณท็อป'} & ${content?.brand?.adminBName || 'คุณจอย'} (การวางแผนชีวิตและสมดุล 6 มิติ)`
          }
          title={content?.leadForm?.title || 'พร้อมเริ่มต้นสร้างชีวิตที่คุณอยากรักษาไว้แล้วหรือยัง?'}
          subtitle={
            content?.leadForm?.subtitle ||
            'คุณท็อป & คุณจอย พร้อมรับฟังและร่วมออกแบบแนวทางชีวิตและการเงินที่เหมาะกับคุณโดยเฉพาะ (ไม่มีค่าใช้จ่าย)'
          }
        />
      </section>
    </div>
  );
}
