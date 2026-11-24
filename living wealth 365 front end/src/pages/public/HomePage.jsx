import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  Sparkles,
  Presentation,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSiteCustomizer } from '../../context/SiteCustomizerContext';
import { ROUTES } from '../../constants/routes';
import EditableText from '../../components/common/EditableText';
import HandDrawnUnderline from '../../components/common/HandDrawnUnderline';
import RevealOnScroll from '../../components/common/RevealOnScroll';
import HomePathwaysBento from '../../components/home/HomePathwaysBento';
import HomeToolsHub from '../../components/home/HomeToolsHub';
import HomeCuratedShowcase from '../../components/home/HomeCuratedShowcase';
import HomeContactHub from '../../components/home/HomeContactHub';

export default function HomePage() {
  const { products, posts, insurancePlans = [] } = useAuth();
  const { content } = useSiteCustomizer();
  const [selectedItem, setSelectedItem] = useState(null);
  const [leadNotes, setLeadNotes] = useState('');

  const activePlans = useMemo(
    () => insurancePlans.filter((p) => p.isActive !== false),
    [insurancePlans]
  );

  const scrollToContact = () => {
    const el = document.getElementById('talk-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectProduct = (prod) => {
    setSelectedItem(prod);
    setLeadNotes(`สนใจสอบถามข้อมูลแร่ธาตุ: ${prod.name}`);
    scrollToContact();
  };

  const handleRequestQuote = (plan, profileNotes = '') => {
    setSelectedItem({
      name: `แผนประกัน AIA: ${plan.name}`,
    });
    setLeadNotes(profileNotes || `สนใจสอบถามเบี้ยและรายละเอียดแผน ${plan.name}`);
    scrollToContact();
  };

  const handleGlassMove = (e) => {
    const target = e.currentTarget;
    if (target.dataset.rafPending === '1') return;
    target.dataset.rafPending = '1';
    const clientX = e.clientX;
    const clientY = e.clientY;
    requestAnimationFrame(() => {
      const rect = target.getBoundingClientRect();
      target.style.setProperty('--mouse-x', `${clientX - rect.left}px`);
      target.style.setProperty('--mouse-y', `${clientY - rect.top}px`);
      target.dataset.rafPending = '0';
    });
  };

  return (
    <div className="w-full space-y-14 sm:space-y-18 lg:space-y-20 py-4 sm:py-8">
      {/* 1. CLEAN CINEMATIC HERO */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 pt-4 sm:pt-8">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-sm sm:text-base font-black shadow-xs">
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
              fallback="ดูแลสุขภาพที่แข็งแรง เวลาอยู่กับคนที่รัก และความสบายใจไปพร้อมกับการวางแผนการเงิน Living Wealth 365 รวมเวิร์กชอป แผนประกัน AIA ภาษี สุขภาพ และแร่ธาตุธรรมชาติไว้ในที่เดียว โดย Admin A & Admin B"
            />
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <Link
              to={ROUTES.WORKSHOPS}
              className="btn btn-primary btn-lg rounded-full font-bold px-8 shadow-lg hover:shadow-xl hover:scale-[1.03] transition-[transform,box-shadow] duration-200 gap-2 text-base sm:text-lg"
            >
              <Presentation className="w-5 h-5 shrink-0" />
              <span>สำรวจเวิร์กชอป &amp; หลักสูตร</span>
            </Link>

            <a
              href={content?.hero?.primaryBtnLink || '#lifemap'}
              onMouseMove={handleGlassMove}
              className="btn zen-surface liquid-glass-interactive text-primary hover:text-secondary btn-lg rounded-full font-bold px-8 hover:scale-[1.03] transition-[transform,color] duration-200 gap-2 text-base sm:text-lg"
            >
              <Compass className="w-5 h-5 shrink-0" />
              <EditableText
                fieldKey="hero.primaryBtnText"
                label="ข้อความปุ่มรอง Hero"
                fallback="ลองเครื่องมือวางแผนฟรี"
              />
            </a>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-sm sm:text-base font-medium text-base-content/80">
            <div className="flex items-center gap-2 min-w-0">
              <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
              <EditableText
                fieldKey="hero.trust1"
                label="ข้อความความน่าเชื่อถือ 1"
                fallback="วางแผนการเงิน & ประกัน AIA โดยที่ปรึกษาที่ได้รับอนุญาต"
              />
            </div>
            <div className="flex items-center gap-2 min-w-0">
              <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
              <EditableText
                fieldKey="hero.trust2"
                label="ข้อความความน่าเชื่อถือ 2"
                fallback="เวิร์กชอปองค์กร & กลุ่มเล็ก • วิทยาศาสตร์แร่ธาตุ SiO₂"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. FOUR CORE PATHWAYS BENTO */}
      <RevealOnScroll>
        <HomePathwaysBento onGlassMove={handleGlassMove} />
      </RevealOnScroll>

      {/* 3. UNIFIED TABBED INTERACTIVE TOOLS HUB (Life Map | Tax | AIA Plan Finder) */}
      <HomeToolsHub plans={activePlans} onRequestQuote={handleRequestQuote} />

      {/* 4. CURATED SHOWCASE (Articles | Minerals Tabs) + COMPACT ADMIN TRUST STRIP */}
      <HomeCuratedShowcase
        posts={posts}
        products={products}
        content={content}
        onSelectProduct={handleSelectProduct}
      />

      {/* 5. UNIFIED CONTACT HUB (LINE 1-Click + Callback Lead Form) */}
      <HomeContactHub
        selection={selectedItem}
        defaultInterest={
          selectedItem
            ? selectedItem.name
            : `Let's Talk กับ ${content?.brand?.adminAName || 'Admin A'} & ${content?.brand?.adminBName || 'Admin B'}`
        }
        defaultNotes={leadNotes}
        title={
          content?.leadForm?.title ||
          'พร้อมเริ่มวางแผนชีวิต การเงิน หรือจัดเวิร์กชอปแล้วหรือยัง?'
        }
        subtitle={
          content?.leadForm?.subtitle ||
          'Admin A & Admin B พร้อมรับฟังและร่วมออกแบบแนวทางที่เหมาะกับคุณโดยเฉพาะ (ไม่มีค่าใช้จ่าย)'
        }
      />
    </div>
  );
}
