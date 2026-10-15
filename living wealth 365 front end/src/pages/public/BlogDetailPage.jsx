import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, User, Share2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { ROUTES } from '../../constants/routes';
import { resolveAssetUrl } from '../../api';
import LeadCaptureForm from '../../components/forms/LeadCaptureForm';

export default function BlogDetailPage() {
  const { slug } = useParams();
  const { posts } = useAuth();
  const { showToast } = useToast();

  const post = posts.find((p) => p.slug === slug) || posts[0];

  if (!post) {
    return (
      <div className="w-full text-center py-20">
        <p className="text-lg">ไม่พบบทความที่คุณค้นหา</p>
        <Link to={ROUTES.BLOG} className="btn btn-primary mt-4">
          กลับสู่หน้ารวมบทความ
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full space-y-12 lg:space-y-16 py-8">
      <article className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 max-w-4xl mx-auto space-y-8">
        {/* Back Link */}
        <Link
          to={ROUTES.JOURNAL}
          className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-secondary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>กลับไปหน้าวารสาร & Top's Notes</span>
        </Link>

        {/* Title & Metadata */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="badge badge-primary text-xs font-bold px-3 py-1">
              {post.pillar || post.category}
            </span>
            {post.postType && post.postType !== 'ARTICLE' && (
              <span className="badge badge-secondary text-xs font-bold px-3 py-1">
                {post.postType === 'TOPS_NOTES' ? "Top's Notes" : post.postType === 'JOURNEY' ? "Joy's Journey" : 'Exploring'}
              </span>
            )}
            {post.category && post.category !== post.pillar && (
              <span className="badge badge-outline text-xs font-semibold px-2.5 py-1">
                {post.category}
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-primary leading-tight">
            {post.title}
          </h1>

          {post.tags && (
            <div className="text-xs font-semibold text-secondary">
              {post.tags}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-base-content/70 border-y border-base-300 py-3">
            <span className="flex items-center gap-1.5 font-semibold text-primary">
              <User className="w-4 h-4 text-secondary" />
              {post.authorName ||
                (typeof post.author === 'object'
                  ? post.author?.name || post.author?.username || 'Top & Joy'
                  : post.author || 'Top & Joy')}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              เวลาอ่าน {post.readTime || '3 นาที'}
            </span>
            <span>•</span>
            <span>
              เผยแพร่เมื่อ:{' '}
              {post.publishedAt ||
                (post.createdAt
                  ? new Date(post.createdAt).toLocaleDateString('th-TH', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })
                  : 'ล่าสุด')}
            </span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="aspect-16/9 w-full rounded-3xl overflow-hidden shadow-lg border border-base-300">
          <img
            src={resolveAssetUrl(
              post.imageUrl,
              'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&auto=format&fit=crop&q=80'
            )}
            alt={post.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src =
                'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&auto=format&fit=crop&q=80';
            }}
          />
        </div>

        {/* Excerpt Box */}
        <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 text-base sm:text-lg font-medium text-base-content/85 leading-relaxed italic">
          "{post.excerpt}"
        </div>

        {/* Article Body */}
        <div className="zen-surface rounded-3xl p-6 sm:p-10 border border-base-300/60 shadow-xs space-y-6 text-base sm:text-lg text-base-content/85 leading-relaxed">
          <div className="prose max-w-none space-y-6">
            {post.content.split('\n\n').map((paragraph, idx) => {
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={idx} className="text-xl sm:text-2xl font-black text-primary pt-4">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('#### ')) {
                return (
                  <h4 key={idx} className="text-lg sm:text-xl font-bold text-secondary pt-2">
                    {paragraph.replace('#### ', '')}
                  </h4>
                );
              }
              if (paragraph.startsWith('- ')) {
                return (
                  <ul key={idx} className="space-y-2 pl-4 list-disc">
                    {paragraph.split('\n').map((item, iIdx) => (
                      <li key={iIdx} className="text-base">
                        {item.replace('- ', '')}
                      </li>
                    ))}
                  </ul>
                );
              }
              if (paragraph.startsWith('> ')) {
                return (
                  <blockquote key={idx} className="p-4 rounded-xl border-l-4 border-secondary bg-secondary/10 text-base italic">
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

        {/* Action Share & CTA */}
        <div className="p-6 rounded-2xl zen-surface border border-base-300 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm font-bold text-primary">
            <Share2 className="w-4 h-4 text-secondary" />
            <span>แบ่งปันความรู้นี้ให้เพื่อนและคนที่คุณรัก</span>
          </div>
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: post.title, url: window.location.href });
              } else {
                navigator.clipboard.writeText(window.location.href);
                showToast('คัดลอกลิงก์บทความเรียบร้อยแล้ว!', 'success');
              }
            }}
            className="btn btn-outline btn-sm rounded-xl font-bold"
          >
            แชร์บทความ
          </button>
        </div>
      </article>

      {/* Consult on this topic */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 max-w-4xl mx-auto">
        <LeadCaptureForm
          defaultInterest={`ปรึกษาเรื่อง: ${post.title}`}
          title="ต้องการคำปรึกษาเจาะลึกเกี่ยวกับเรื่องนี้?"
          subtitle="ให้ผู้เชี่ยวชาญจาก Living Wealth 365 ช่วยคำนวณและวางแผนให้คุณแบบเฉพาะบุคคล"
        />
      </section>
    </div>
  );
}
