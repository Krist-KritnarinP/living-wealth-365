import { useEffect, useRef, useState, useCallback } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Printer,
  Presentation,
  FileImage,
  CheckCircle2,
  Layers,
  Clock,
  Users,
  MapPin,
} from 'lucide-react';
import { WORKSHOP_DECK_SLIDES, CUSTOM_DECK_CONFIG } from '../../constants/workshopsData';

/**
 * Native <dialog> Presentation Viewer supporting:
 * 1) Built-in Pitch Deck (or focused single Workshop deck)
 * 2) Custom exported Canva / PowerPoint 16:9 slide deck (lazy-loaded images / PDF)
 * Includes keyboard navigation (ArrowLeft / ArrowRight / F), Fullscreen API, and Print-to-PDF.
 */
export default function WorkshopPresentationModal({
  isOpen,
  onClose,
  focusedWorkshop = null,
  customDeck = CUSTOM_DECK_CONFIG,
  onRequestCallback,
}) {
  const dialogRef = useRef(null);
  const stageRef = useRef(null);

  const [deckMode, setDeckMode] = useState('builtin'); // 'builtin' | 'custom'
  const [slideIndex, setSlideIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Build slides either for a specific workshop or the full overview pitch deck
  const builtinSlides = focusedWorkshop
    ? [
        {
          id: `${focusedWorkshop.id}-cover`,
          kicker: `ภาพรวมหลักสูตร • ${focusedWorkshop.trackLabel}`,
          title: focusedWorkshop.title,
          subtitle: focusedWorkshop.subtitle,
          points: focusedWorkshop.highlights,
          meta: {
            duration: focusedWorkshop.duration,
            groupSize: focusedWorkshop.groupSize,
            format: focusedWorkshop.format,
            facilitator: focusedWorkshop.facilitator,
          },
          highlight: `สิ่งที่ได้รับกลับบ้าน: ${focusedWorkshop.takeaways}`,
        },
        {
          id: `${focusedWorkshop.id}-agenda`,
          kicker: 'กำหนดการกิจกรรม',
          title: `โครงสร้างเวลาและกิจกรรม: ${focusedWorkshop.title}`,
          subtitle: `ระยะเวลา ${focusedWorkshop.duration} • ดูแลโดย ${focusedWorkshop.facilitator}`,
          points: focusedWorkshop.agenda.map((item) => `${item.time} — ${item.topic}`),
          highlight: 'สามารถปรับระยะเวลาและเนื้อหาให้สอดคล้องกับโจทย์ขององค์กรหรือกลุ่มของคุณได้',
        },
        WORKSHOP_DECK_SLIDES[WORKSHOP_DECK_SLIDES.length - 1],
      ]
    : WORKSHOP_DECK_SLIDES;

  const hasCustomSlides = Array.isArray(customDeck?.slides) && customDeck.slides.length > 0;
  const activeSlides = deckMode === 'custom' && hasCustomSlides ? customDeck.slides : builtinSlides;
  const totalSlides = activeSlides.length;

  // Sync native <dialog> showModal() / close()
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      setSlideIndex(0);
      setDeckMode('builtin');
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen, focusedWorkshop]);

  // Listen for fullscreen changes
  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  const handleToggleFullscreen = useCallback(async () => {
    const el = stageRef.current || dialogRef.current;
    if (!el) return;
    try {
      if (!document.fullscreenElement) {
        await el.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      // Browser may block fullscreen in certain embedded contexts; modal mode remains active
    }
  }, []);

  const goPrev = useCallback(() => {
    setSlideIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const goNext = useCallback(() => {
    setSlideIndex((prev) => Math.min(totalSlides - 1, prev + 1));
  }, [totalSlides]);

  // Keyboard shortcuts inside open presentation
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        goNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        goPrev();
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        handleToggleFullscreen();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, goNext, goPrev, handleToggleFullscreen]);

  const handleDialogClose = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    if (onClose) onClose();
  };

  const currentSlide = activeSlides[slideIndex] || activeSlides[0];

  return (
    <dialog
      ref={dialogRef}
      onClose={handleDialogClose}
      aria-labelledby="workshop-deck-title"
      className="workshop-presentation-dialog m-auto p-0 bg-transparent max-w-none w-[calc(100vw-1.5rem)] sm:w-[94vw] max-w-6xl rounded-3xl overflow-visible backdrop:bg-slate-950/75 backdrop:backdrop-blur-sm"
    >
      <div
        ref={stageRef}
        className="w-full min-h-[75vh] sm:min-h-[82vh] max-h-[92vh] bg-base-100 text-base-content rounded-3xl border border-base-300 shadow-2xl flex flex-col justify-between overflow-hidden"
      >
        {/* Top Toolbar */}
        <div className="px-4 sm:px-6 py-3.5 border-b border-base-300/70 bg-base-100/95 flex flex-wrap items-center justify-between gap-2 print:hidden">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-primary text-white flex items-center justify-center shrink-0">
              <Presentation className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h2 id="workshop-deck-title" className="text-sm sm:text-base font-black text-primary truncate">
                {focusedWorkshop ? focusedWorkshop.title : 'Living Wealth 365 — Workshop Deck'}
              </h2>
              <p className="text-[11px] text-base-content/65 hidden sm:block">
                ใช้ปุ่มลูกศร ← → เพื่อเลื่อนสไลด์ • กด F เพื่อเต็มจอ • Esc เพื่อปิด
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {/* Deck Mode Switcher: Built-in vs Canva/PPT Slide Deck */}
            <div className="inline-flex items-center p-0.5 rounded-xl bg-base-200 border border-base-300/70">
              <button
                type="button"
                onClick={() => {
                  setDeckMode('builtin');
                  setSlideIndex(0);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  deckMode === 'builtin'
                    ? 'bg-primary text-white shadow-xs'
                    : 'text-base-content/75 hover:text-primary'
                }`}
              >
                สไลด์หลักสูตร
              </button>
              <button
                type="button"
                onClick={() => {
                  setDeckMode('custom');
                  setSlideIndex(0);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 ${
                  deckMode === 'custom'
                    ? 'bg-primary text-white shadow-xs'
                    : 'text-base-content/75 hover:text-primary'
                }`}
              >
                <FileImage className="w-3.5 h-3.5" />
                <span>สไลด์ Canva / PPT</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => window.print()}
              className="btn btn-ghost btn-xs sm:btn-sm rounded-xl gap-1 font-bold text-primary"
              title="พิมพ์หรือบันทึกเป็น PDF"
            >
              <Printer className="w-4 h-4 shrink-0" />
              <span className="hidden md:inline">บันทึก PDF</span>
            </button>

            <button
              type="button"
              onClick={handleToggleFullscreen}
              className="btn btn-ghost btn-xs sm:btn-sm rounded-xl gap-1 font-bold text-primary"
              title={isFullscreen ? 'ออกจากเต็มจอ' : 'ขยายเต็มจอ'}
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4 shrink-0" />
              ) : (
                <Maximize2 className="w-4 h-4 shrink-0" />
              )}
              <span className="hidden md:inline">{isFullscreen ? 'ย่อจอ' : 'เต็มจอ'}</span>
            </button>

            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="btn btn-ghost btn-circle btn-sm text-base-content/70 hover:text-error"
              aria-label="ปิดโหมดพรีเซ้นต์"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main 16:9 Presentation Stage */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 lg:p-10 flex items-start justify-center bg-linear-to-br from-base-100 via-base-100 to-primary/5">
          {deckMode === 'custom' ? (
            hasCustomSlides ? (
              <div className="w-full max-w-5xl space-y-3">
                <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 border border-base-300 shadow-lg flex items-center justify-center">
                  <img
                    key={currentSlide.imageUrl}
                    src={currentSlide.imageUrl}
                    alt={currentSlide.caption || `สไลด์หน้าที่ ${slideIndex + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain"
                  />
                </div>
                {currentSlide.caption && (
                  <p className="text-xs sm:text-sm text-center text-base-content/75">
                    {currentSlide.caption}
                  </p>
                )}
              </div>
            ) : (
              <div className="w-full max-w-2xl rounded-3xl bg-base-100 border border-dashed border-primary/35 p-6 sm:p-10 text-center space-y-4 shadow-xs">
                <div className="w-14 h-14 rounded-2xl bg-secondary/15 text-secondary mx-auto flex items-center justify-center">
                  <Layers className="w-7 h-7" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-primary">
                  รองรับสไลด์จาก Canva และ PowerPoint โดยตรงบนเว็บ
                </h3>
                <p className="text-sm sm:text-base text-base-content/80 leading-relaxed">
                  เพื่อให้ฟอนต์ภาษาไทยและกราฟิกไม่เพี้ยน 100% และโหลดลื่นไม่หน่วงเว็บ
                  ระบบออกแบบให้แสดงชุดภาพสไลด์ 16:9 (JPG/WebP) หรือไฟล์ PDF ที่ Export จาก Canva / PowerPoint ขึ้น Cloudflare R2
                  โดยโหลดทีละหน้าแบบ Lazy Load
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-left text-xs pt-2">
                  <div className="p-3 rounded-2xl bg-base-200/70 border border-base-300/60">
                    <div className="font-black text-primary">1. Export 16:9</div>
                    <p className="text-base-content/70 mt-0.5">บันทึกจาก Canva / PPT เป็นชุดรูป JPG/WebP หรือ PDF</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-base-200/70 border border-base-300/60">
                    <div className="font-black text-primary">2. อัปขึ้น R2</div>
                    <p className="text-base-content/70 mt-0.5">เก็บไฟล์บน CDN ของเว็บเอง ไม่ต้องลิงก์ออกไป Canva</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-base-200/70 border border-base-300/60">
                    <div className="font-black text-primary">3. พรีเซ้นต์เต็มจอ</div>
                    <p className="text-base-content/70 mt-0.5">เลื่อนสไลด์ด้วยคีย์บอร์ด ← → ลื่นทุกอุปกรณ์</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setDeckMode('builtin')}
                  className="btn btn-primary btn-sm rounded-xl font-bold mt-2"
                >
                  กลับไปดูสไลด์หลักสูตรบนเว็บ
                </button>
              </div>
            )
          ) : (
            <div className="w-full max-w-4xl my-auto space-y-5 sm:space-y-6 animate-pop-in" key={currentSlide.id}>
              <div className="space-y-2.5">
                <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-secondary/18 border border-secondary/40 text-primary text-xs sm:text-sm font-black tracking-wide">
                  {currentSlide.kicker}
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-primary leading-[1.2] tracking-tight">
                  {currentSlide.title}
                </h3>
                <p className="text-sm sm:text-lg text-base-content/75 leading-relaxed">
                  {currentSlide.subtitle}
                </p>
              </div>

              {currentSlide.meta && (
                <div className="flex flex-wrap gap-2 text-xs sm:text-sm font-bold">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-base-200 text-primary">
                    <Clock className="w-4 h-4 text-secondary shrink-0" />
                    {currentSlide.meta.duration}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-base-200 text-primary">
                    <Users className="w-4 h-4 text-secondary shrink-0" />
                    {currentSlide.meta.groupSize}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-base-200 text-primary">
                    <MapPin className="w-4 h-4 text-secondary shrink-0" />
                    {currentSlide.meta.format}
                  </span>
                </div>
              )}

              <ul className="space-y-3 sm:space-y-4">
                {currentSlide.points?.map((point, idx) => (
                  <li
                    key={idx}
                    className="p-4 sm:p-5 rounded-2xl bg-base-100/95 border border-base-300/70 shadow-xs flex items-start gap-3 text-sm sm:text-lg text-base-content/90 leading-relaxed"
                  >
                    <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-secondary shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              {currentSlide.highlight && (
                <div className="p-4 sm:p-5 rounded-2xl bg-primary text-primary-content font-bold text-sm sm:text-base flex flex-wrap items-center justify-between gap-3 shadow-sm">
                  <span>{currentSlide.highlight}</span>
                  {slideIndex === totalSlides - 1 && onRequestCallback && (
                    <button
                      type="button"
                      onClick={() => {
                        dialogRef.current?.close();
                        onRequestCallback(focusedWorkshop);
                      }}
                      className="btn btn-secondary text-secondary-content btn-sm rounded-xl font-black"
                    >
                      นัดคุยออกแบบหลักสูตร
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom Navigation Bar */}
        {!(deckMode === 'custom' && !hasCustomSlides) && (
          <div className="px-4 sm:px-6 py-3.5 border-t border-base-300/70 bg-base-100/95 flex items-center justify-between gap-3 print:hidden">
            <button
              type="button"
              onClick={goPrev}
              disabled={slideIndex === 0}
              className="btn btn-outline btn-sm rounded-xl font-bold gap-1 border-base-300"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>ก่อนหน้า</span>
            </button>

            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-1.5">
                {activeSlides.map((s, idx) => (
                  <button
                    key={s.id || idx}
                    type="button"
                    onClick={() => setSlideIndex(idx)}
                    aria-label={`ไปที่สไลด์ ${idx + 1}`}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      idx === slideIndex ? 'w-7 bg-primary' : 'w-2 bg-base-300 hover:bg-primary/40'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-black text-primary px-2">
                {slideIndex + 1} / {totalSlides}
              </span>
            </div>

            <button
              type="button"
              onClick={goNext}
              disabled={slideIndex === totalSlides - 1}
              className="btn btn-primary btn-sm rounded-xl font-bold gap-1"
            >
              <span>ถัดไป</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </dialog>
  );
}
