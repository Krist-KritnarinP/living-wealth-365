import { Calendar, Clock, User, Feather, Sparkles } from 'lucide-react';
import { resolveAssetUrl } from '../../../api';
import FramedImage from '../../common/FramedImage';
import { stripImageFrame } from '../../../utils/imageFrame';

/**
 * BlogLivePreview — Renders an article exactly as public viewers see it on BlogDetailPage.
 */
export default function BlogLivePreview({ post = {} }) {
  const title = post.title || 'ชื่อหัวข้อบทความ';
  const excerpt = post.excerpt || 'คำโปรยสั้นๆ ของบทความ...';
  const content = post.content || 'เนื้อหาบทความ...';
  const author = post.authorName || 'Admin A & Admin B';
  const pillar = post.pillar || 'JOURNAL';
  const postType = post.postType || 'ARTICLE';
  const readTime = post.readTime || '5 นาที';
  const imageUrl = post.imageUrl || '';

  return (
    <div className="w-full space-y-8 bg-base-100 p-4 sm:p-8 rounded-3xl border border-base-300">
      {/* Visual Mode Callout */}
      <div className="p-3.5 rounded-2xl bg-primary/10 border border-primary/25 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 font-black text-primary">
          <Sparkles className="w-4 h-4 text-secondary shrink-0" />
          <span>มุมมองเสมือนจริงสำหรับผู้ชม (Public Audience View)</span>
        </div>
        <span className="badge badge-primary badge-outline text-[11px] font-bold">
          {pillar} • {postType}
        </span>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Breadcrumb Mock */}
        <div className="text-xs text-base-content/60 flex items-center gap-2">
          <span>หน้าหลัก</span>
          <span>/</span>
          <span>วารสาร & ความคิด</span>
          <span>/</span>
          <span className="text-primary font-bold truncate max-w-xs">{title}</span>
        </div>

        {/* Header Statement */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-black shadow-xs">
            <Feather className="w-3.5 h-3.5 text-secondary shrink-0" />
            <span>PILLAR: {pillar}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-primary leading-tight break-words [overflow-wrap:anywhere]">
            {title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-base-content/70 border-b border-base-300 pb-4">
            <span className="flex items-center gap-1.5 font-bold text-primary">
              <User className="w-3.5 h-3.5 text-secondary" />
              <span>{author}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>เวลาอ่าน: {readTime}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>เผยแพร่: วันนี้ (Live Preview)</span>
            </span>
          </div>
        </div>

        {/* Featured Image (Honoring Framing) */}
        {imageUrl ? (
          <div className="space-y-2">
            <div className="w-full rounded-3xl overflow-hidden shadow-lg border border-base-300 bg-base-200/40 aspect-video relative">
              <FramedImage
                src={imageUrl}
                alt={title}
                className="w-full h-full"
                fallback="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&auto=format&fit=crop&q=80"
              />
            </div>
            <p className="text-[11px] text-base-content/50 text-center italic">
              ภาพปกบทความแบบ 16:9 ตามจุดโฟกัสที่ปรับแต่ง
            </p>
          </div>
        ) : (
          <div className="w-full aspect-video rounded-3xl border border-dashed border-base-300 bg-base-200/30 flex items-center justify-center text-xs text-base-content/50">
            ยังไม่ได้กำหนดรูปภาพหน้าปก
          </div>
        )}

        {/* Excerpt Box */}
        {excerpt && (
          <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 text-base sm:text-lg font-medium text-base-content/85 leading-relaxed italic">
            "{excerpt}"
          </div>
        )}

        {/* Article Body */}
        <div className="zen-surface rounded-3xl p-6 sm:p-10 border border-base-300/60 shadow-xs space-y-6 text-base text-base-content/85 leading-relaxed">
          <div className="prose max-w-none space-y-4">
            {content.split('\n\n').map((paragraph, idx) => {
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={idx} className="text-xl sm:text-2xl font-black text-primary pt-3">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('#### ')) {
                return (
                  <h4 key={idx} className="text-lg font-bold text-secondary pt-2">
                    {paragraph.replace('#### ', '')}
                  </h4>
                );
              }
              if (paragraph.startsWith('- ')) {
                return (
                  <ul key={idx} className="space-y-1.5 pl-4 list-disc">
                    {paragraph.split('\n').map((item, iIdx) => (
                      <li key={iIdx} className="text-sm sm:text-base">
                        {item.replace('- ', '')}
                      </li>
                    ))}
                  </ul>
                );
              }
              if (paragraph.startsWith('> ')) {
                return (
                  <blockquote
                    key={idx}
                    className="p-4 rounded-xl border-l-4 border-secondary bg-secondary/10 text-sm sm:text-base italic"
                  >
                    {paragraph.replace('> ', '')}
                  </blockquote>
                );
              }
              return (
                <p key={idx} className="leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </div>

        {/* Author Sign-off Box */}
        <div className="zen-surface rounded-2xl p-6 border border-base-300/60 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 text-primary font-black flex items-center justify-center text-lg border border-primary/20">
            LW
          </div>
          <div>
            <div className="font-black text-primary text-base">{author}</div>
            <div className="text-xs text-base-content/70">
              Living Wealth 365 — A Life Well Planned. A Life Well Lived.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
