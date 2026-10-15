import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  Sparkles,
  ArrowRight,
  Clock,
  Heart,
  Coins,
  Brain,
  Users,
  CheckCircle2,
  BookOpen,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../constants/routes';
import LifeMapTeaser from '../../components/common/LifeMapTeaser';

export default function LifePage() {
  const { posts } = useAuth();
  const lifePosts = posts.filter((p) => p.pillar === 'LIFE' || p.category?.includes('ชีวิต'));

  return (
    <div className="w-full space-y-16 lg:space-y-24 py-8">
      {/* 1. HERO SECTION */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="w-full rounded-3xl zen-surface border border-base-300/60 p-6 sm:p-10 lg:p-16 relative overflow-hidden shadow-xs">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/15 text-secondary text-xs sm:text-sm font-bold tracking-wide">
              <Compass className="w-4 h-4" />
              <span>PILLAR 1: LIFE & LIVING • การออกแบบชีวิต</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-primary leading-[1.15] tracking-tight">
              A Life Well Planned. <br />
              <span className="text-secondary">A Life Well Lived.</span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-base-content/80 leading-relaxed">
              การวางแผนชีวิตไม่ได้เริ่มต้นที่ตัวเลขหรือผลตอบแทน แต่เริ่มต้นจากการตั้งคำถามว่า
              <em> "อะไรคือสิ่งที่คุณอยากรักษาไว้มากที่สุด?" </em>
              เราช่วยคุณจัดระเบียบ 6 มิติของชีวิต เพื่อให้คุณมีเวลา มีความสุข และมีพลังในการใช้ชีวิตทุกๆ 365 วัน
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#lifemap"
                className="btn btn-primary btn-md rounded-2xl font-bold px-6 shadow-xs gap-2"
              >
                <span>ประเมิน Life Map 6 มิติ</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                to="/about#talk"
                className="btn btn-secondary btn-outline btn-md rounded-2xl font-bold px-6 gap-2"
              >
                <span>ปรึกษาการออกแบบชีวิตกับ Top & Joy</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE 6 DIMENSIONS OF LIFE MAP */}
      <section id="lifemap" className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 scroll-mt-24">
        <LifeMapTeaser standalone={true} />
      </section>

      {/* 3. PHILOSOPHY & FRAMEWORK */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-primary">
            3 ขั้นตอนการออกแบบชีวิตก่อนที่ชีวิตจะถูกคนอื่นออกแบบ
          </h2>
          <p className="text-sm sm:text-base zen-muted">
            กรอบความคิดที่เราใช้ในการสนทนาและร่วมเดินทางไปกับผู้คนกว่า 100 ครอบครัว
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <div className="p-6 rounded-3xl zen-surface border border-base-300/60 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-secondary/15 text-secondary flex items-center justify-center font-black text-xl">
              01
            </div>
            <h3 className="text-xl font-bold text-primary">Clarify Your Non-Negotiables</h3>
            <p className="text-sm text-base-content/75 leading-relaxed">
              กำหนดให้ชัดเจนว่าอะไรคือสิ่งที่คุณ "ไม่ยอมแลก" ไม่ว่าจะเป็นสุขภาพของตนเอง เวลาอาหารค่ำกับครอบครัว หรือความสงบสุขในจิตใจ
            </p>
          </div>

          <div className="p-6 rounded-3xl zen-surface border border-base-300/60 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/15 text-primary flex items-center justify-center font-black text-xl">
              02
            </div>
            <h3 className="text-xl font-bold text-primary">Build Protective Foundations</h3>
            <p className="text-sm text-base-content/75 leading-relaxed">
              ถ่ายโอนความเสี่ยงทางสุขภาพและอุบัติเหตุ เพื่อให้คุณไม่ต้องกังวลว่าวิกฤตเพียงครั้งเดียวจะมาทำลายเป้าหมายชีวิตที่คุณสร้างมา
            </p>
          </div>

          <div className="p-6 rounded-3xl zen-surface border border-base-300/60 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-secondary/15 text-secondary flex items-center justify-center font-black text-xl">
              03
            </div>
            <h3 className="text-xl font-bold text-primary">Live Fully in Each Season</h3>
            <p className="text-sm text-base-content/75 leading-relaxed">
              เรียนรู้ที่จะมีความสุขในแต่ละฤดูกาลของชีวิต ทั้งช่วงสร้างเนื้อสร้างตัว ช่วงเติบโต และช่วงเกษียณสำราญอย่างมีศักดิ์ศรี
            </p>
          </div>
        </div>
      </section>

      {/* 4. CURATED LIFE ARTICLES & NOTES */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-primary">
              บทความและบันทึกในหมวด Life
            </h2>
            <p className="text-sm zen-muted mt-1">
              ตกผลึกทางความคิดจาก Top & Joy เพื่อชีวิตที่เบาใจและมีความหมาย
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
          {lifePosts.slice(0, 3).map((post) => (
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
                    {post.postType === 'TOPS_NOTES' ? "Top's Notes" : 'Article'}
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

      {/* 5. LET'S TALK INVITATION CTA */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="p-8 sm:p-12 rounded-3xl bg-linear-to-r from-primary/10 via-secondary/10 to-primary/10 border border-secondary/30 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-primary">
            พร้อมออกแบบชีวิตที่คุณอยากรักษาไว้แล้วหรือยัง?
          </h2>
          <p className="text-sm sm:text-base text-base-content/80 max-w-xl mx-auto leading-relaxed">
            ไม่มีข้อผูกมัด ไม่มีการเร่งรัดขายผลิตภัณฑ์ มีเพียงบทสนทนาที่จริงใจเพื่อช่วยให้คุณเห็นภาพชีวิตตนเองชัดเจนที่สุด
          </p>
          <div className="flex justify-center">
            <Link
              to="/about#talk"
              className="btn btn-secondary btn-md sm:btn-lg text-white rounded-2xl font-bold px-8 shadow-md gap-2"
            >
              <span>นัดหมาย Let's Talk กับ Top & Joy</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
