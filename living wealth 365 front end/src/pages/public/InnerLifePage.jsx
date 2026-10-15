import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Brain,
  Sparkles,
  ArrowRight,
  Play,
  Pause,
  RotateCcw,
  Feather,
  Heart,
  Compass,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../constants/routes';

export default function InnerLifePage() {
  const { posts } = useAuth();
  const innerPosts = posts.filter(
    (p) => p.pillar === 'INNER_LIFE' || p.category?.includes('โลกภายใน') || p.category?.includes('สมาธิ')
  );

  // Mindfulness Timer State (Seconds)
  const [targetSeconds, setTargetSeconds] = useState(120); // Default 2 minutes
  const [secondsRemaining, setSecondsRemaining] = useState(120);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isTimerRunning && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000);
    } else if (secondsRemaining === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, secondsRemaining]);

  const selectDuration = (sec) => {
    setIsTimerRunning(false);
    setTargetSeconds(sec);
    setSecondsRemaining(sec);
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setSecondsRemaining(targetSeconds);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progress = ((targetSeconds - secondsRemaining) / targetSeconds) * 100;

  return (
    <div className="w-full space-y-16 lg:space-y-24 py-8">
      {/* 1. HERO SECTION */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="w-full rounded-3xl zen-surface border border-base-300/60 p-6 sm:p-10 lg:p-16 relative overflow-hidden shadow-xs">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/15 text-secondary text-xs sm:text-sm font-bold tracking-wide">
              <Brain className="w-4 h-4" />
              <span>PILLAR 4: INNER LIFE • ศิลปะแห่งความเงียบสงบ</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-primary leading-[1.15] tracking-tight">
              The Art of Stillness <br />
              <span className="text-secondary">คืนความสงบให้จิตใจ</span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-base-content/80 leading-relaxed">
              ในโลกยุคใหม่ที่เต็มไปด้วยเสียงรบกวนและการแย่งชิงความสนใจ
              ความเงียบสงบกลายเป็นความหรูหราที่ประเมินค่าไม่ได้ การสังเกตใจตนเอง (Self-Inquiry)
              และการหยุดพักอย่างมีสติ คือจุดเริ่มต้นของปัญญาญาณและการตัดสินใจที่ถูกต้อง
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#mindfulness"
                className="btn btn-primary btn-md rounded-2xl font-bold px-6 shadow-xs gap-2"
              >
                <span>เริ่มช่วงเวลาพักสติ (Mindfulness Pause)</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                to="/journal?filter=inner"
                className="btn btn-secondary btn-outline btn-md rounded-2xl font-bold px-6 gap-2"
              >
                <span>อ่านบันทึกโลกภายใน</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MINDFULNESS PAUSE & BREATHING TIMER */}
      <section id="mindfulness" className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 scroll-mt-24">
        <div className="p-6 sm:p-10 lg:p-12 rounded-3xl zen-surface border border-base-300 shadow-sm max-w-4xl mx-auto text-center space-y-8 relative overflow-hidden">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/15 text-secondary text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>DAILY PRACTICE • ฝึกสติวันละนิด</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-primary">
              Mindfulness Pause: วางทุกอย่างลงสักครู่
            </h2>
            <p className="text-sm zen-muted max-w-md mx-auto">
              หลับตาลง ผ่อนคลายกล้ามเนื้อไหล่ และโฟกัสกับลมหายใจเข้า-ออกอย่างอ่อนโยน
            </p>
          </div>

          {/* Duration Selector */}
          <div className="flex justify-center gap-2">
            {[
              { sec: 60, label: '1 นาที' },
              { sec: 120, label: '2 นาที' },
              { sec: 300, label: '5 นาที' },
            ].map((item) => (
              <button
                key={item.sec}
                onClick={() => selectDuration(item.sec)}
                className={`btn btn-sm rounded-xl font-bold px-4 transition-all ${
                  targetSeconds === item.sec
                    ? 'btn-primary shadow-xs'
                    : 'btn-ghost border border-base-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Visual Breathing Ring */}
          <div className="relative w-56 h-56 sm:w-64 sm:h-64 mx-auto flex items-center justify-center">
            {/* Animated Glow when Running */}
            <div
              className={`absolute inset-0 rounded-full bg-secondary/10 transition-all duration-1000 ${
                isTimerRunning ? 'scale-110 animate-pulse' : 'scale-100'
              }`}
            ></div>

            {/* SVG Ring Progress */}
            <svg className="w-full h-full -rotate-90">
              <circle
                cx="50%"
                cy="50%"
                r="44%"
                stroke="currentColor"
                strokeWidth="6"
                fill="none"
                className="text-base-300/60"
              />
              <circle
                cx="50%"
                cy="50%"
                r="44%"
                stroke="#C5A059"
                strokeWidth="6"
                strokeDasharray="276"
                strokeDashoffset={276 - (276 * progress) / 100}
                strokeLinecap="round"
                fill="none"
                className="transition-all duration-500"
              />
            </svg>

            {/* Inner Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-1">
              <span className="text-3xl sm:text-4xl font-black text-primary tracking-tight">
                {formatTime(secondsRemaining)}
              </span>
              <span className="text-xs font-semibold text-secondary">
                {secondsRemaining === 0 ? '✨ สดชื่นและสงบ' : isTimerRunning ? 'กำลังหายใจเข้า-ออก' : 'กดเริ่มเมื่อพร้อม'}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center items-center gap-3">
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="btn btn-secondary btn-md rounded-2xl text-white font-bold px-8 shadow-md gap-2"
            >
              {isTimerRunning ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>พักชั่วคราว</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>{secondsRemaining === targetSeconds ? 'เริ่มต้นฝึก' : 'ทำต่อ'}</span>
                </>
              )}
            </button>

            <button
              onClick={resetTimer}
              className="btn btn-ghost btn-circle btn-md border border-base-300"
              title="เริ่มนับเวลาใหม่"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. PHILOSOPHY OF SELF-INQUIRY */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-primary">
            4 หลักการสำรวจโลกภายใน (Inner Framework)
          </h2>
          <p className="text-sm sm:text-base zen-muted">
            การเปลี่ยนผ่านจากความกังวลสู่ความมั่นคงทางจิตวิญญาณ
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl zen-surface border border-base-300/60 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-600 flex items-center justify-center font-bold">
              01
            </div>
            <h3 className="text-base font-bold text-primary">Observer Mind</h3>
            <p className="text-xs text-base-content/75 leading-relaxed">
              เราไม่ใช่ความคิดหรืออารมณ์ แต่เราคือ "ผู้รู้" ที่เฝ้าดูความคิดเหล่านั้นเกิดขึ้นและดับไป
            </p>
          </div>

          <div className="p-6 rounded-3xl zen-surface border border-base-300/60 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-600 flex items-center justify-center font-bold">
              02
            </div>
            <h3 className="text-base font-bold text-primary">Radical Acceptance</h3>
            <p className="text-xs text-base-content/75 leading-relaxed">
              ยอมรับความจริงตรงหน้าตามความเป็นจริง โดยไม่เอาความอยากหรือความกลัวเข้าไปปรุงแต่ง
            </p>
          </div>

          <div className="p-6 rounded-3xl zen-surface border border-base-300/60 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-600 flex items-center justify-center font-bold">
              03
            </div>
            <h3 className="text-base font-bold text-primary">Sacred Solitude</h3>
            <p className="text-xs text-base-content/75 leading-relaxed">
              การอยู่คนเดียวอย่างมีคุณภาพ ไม่ใช่ความเหงา แต่คือช่วงเวลาที่จิตใจได้ตกผลึกและสร้างสรรค์
            </p>
          </div>

          <div className="p-6 rounded-3xl zen-surface border border-base-300/60 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-600 flex items-center justify-center font-bold">
              04
            </div>
            <h3 className="text-base font-bold text-primary">Daily Gratitude</h3>
            <p className="text-xs text-base-content/75 leading-relaxed">
              สังเกตสิ่งดีๆ เล็กๆ รอบตัวในแต่ละวัน เพื่อปรับคลื่นความถี่ของหัวใจให้อยู่ในโหมดความอุดมสมบูรณ์
            </p>
          </div>
        </div>
      </section>

      {/* 4. CURATED INNER LIFE ARTICLES */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-primary">
              บทความในหมวด Inner Life
            </h2>
            <p className="text-sm zen-muted mt-1">
              บทบันทึกว่าด้วยปรัชญา ความเงียบสงบ และการเข้าใจจิตใจตนเอง
            </p>
          </div>
          <Link
            to={ROUTES.JOURNAL}
            className="btn btn-ghost btn-sm rounded-xl font-bold gap-1 self-start sm:self-auto text-secondary hover:text-primary"
          >
            <span>ดูวารสารทั้งหมด</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {innerPosts.slice(0, 3).map((post) => (
            <Link
              key={post.id || post.slug}
              to={`/journal/${post.slug}`}
              className="p-5 rounded-3xl zen-surface border border-base-300/60 shadow-xs flex flex-col justify-between group hover:border-secondary transition-all"
            >
              <div className="space-y-3">
                <div className="aspect-video w-full rounded-2xl overflow-hidden bg-base-200">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="badge badge-sm badge-secondary font-bold">
                    {post.category || 'โลกภายใน & สมาธิ'}
                  </span>
                  <span className="zen-muted">• {post.readTime || '5 นาที'}</span>
                </div>
                <h3 className="text-lg font-bold text-primary group-hover:text-secondary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-xs sm:text-sm text-base-content/75 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
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
      </section>
    </div>
  );
}
