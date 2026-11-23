import { useState } from 'react';
import { Star, MessageSquareQuote, Send, CheckCircle2 } from 'lucide-react';
import { workshopsApi } from '../../api';
import { useToast } from '../../context/ToastContext';

/**
 * Reusable Workshop Feedback & Review Section:
 * - Shows average rating & participant feedback cards
 * - Includes an inline feedback submission form (publishes immediately)
 */
export default function WorkshopFeedbackSection({
  eyebrow = 'เสียงสะท้อนจากผู้เข้าร่วมจริง',
  heading = 'รีวิวและความคิดเห็น (Feedback)',
  feedbacks = [],
  workshopId = null,
  workshopSlug = null,
  workshopsList = [],
  onFeedbackCreated,
}) {
  const { showToast } = useToast();
  const [authorName, setAuthorName] = useState('');
  const [authorRole, setAuthorRole] = useState('');
  const [rating, setRating] = useState(5);
  const [selectedWorkshopId, setSelectedWorkshopId] = useState(workshopId || '');
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [justSubmitted, setJustSubmitted] = useState(false);

  const safeFeedbacks = Array.isArray(feedbacks) ? feedbacks : [];
  const avgRating =
    safeFeedbacks.length > 0
      ? (
          safeFeedbacks.reduce((sum, fb) => sum + (Number(fb.rating) || 5), 0) /
          safeFeedbacks.length
        ).toFixed(1)
      : '5.0';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (authorName.trim().length < 2) {
      setErrorMsg('กรุณากรอกชื่อผู้แสดงความคิดเห็นอย่างน้อย 2 ตัวอักษร');
      return;
    }
    if (comment.trim().length < 5) {
      setErrorMsg('กรุณาเขียนความคิดเห็นอย่างน้อย 5 ตัวอักษร');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        workshopId: workshopId || selectedWorkshopId || null,
        workshopSlug: workshopSlug || undefined,
        authorName: authorName.trim(),
        authorRole: authorRole.trim() || 'ผู้เข้าร่วมเวิร์กชอป',
        rating,
        comment: comment.trim(),
      };

      const res = await workshopsApi.submitFeedback(payload);
      const created = res.feedback;
      if (onFeedbackCreated && created) {
        onFeedbackCreated(created);
      }

      setAuthorName('');
      setAuthorRole('');
      setRating(5);
      setComment('');
      setJustSubmitted(true);
      showToast('ส่งความคิดเห็นเรียบร้อยแล้ว รีวิวของคุณแสดงบนหน้าเว็บทันที', 'success');
    } catch (err) {
      const apiMsg =
        err.response?.data?.error ||
        'ยังไม่สามารถส่งความคิดเห็นได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง';
      setErrorMsg(apiMsg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16" id="workshop-feedback">
      <div className="space-y-8">
        {/* Header & Average Rating Summary */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black uppercase tracking-widest text-secondary">
              <MessageSquareQuote className="w-4 h-4 shrink-0" />
              <span>{eyebrow}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-primary leading-tight">
              {heading}
            </h2>
          </div>

          <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl zen-surface border border-base-300/60 self-start md:self-auto">
            <div className="flex items-center gap-0.5 text-warning">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="font-black text-lg text-primary">{avgRating}</span>
            <span className="text-xs sm:text-sm text-base-content/70">
              ({safeFeedbacks.length} รีวิว)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left: Reviews List */}
          <div className="lg:col-span-7 space-y-4">
            {safeFeedbacks.length === 0 ? (
              <div className="rounded-3xl zen-surface border border-base-300/60 p-8 text-center space-y-2">
                <p className="font-bold text-primary">
                  ยังไม่มีความคิดเห็นในส่วนนี้
                </p>
                <p className="text-sm text-base-content/70">
                  หากคุณเคยเข้าร่วมเวิร์กชอป สามารถแบ่งปันประสบการณ์ในช่องด้านข้างได้เลยครับ
                </p>
              </div>
            ) : (
              safeFeedbacks.map((fb, idx) => (
                <article
                  key={fb.id || idx}
                  className="rounded-3xl zen-surface border border-base-300/60 p-6 space-y-3 shadow-xs"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-1 text-warning">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-4 h-4 ${
                            s <= (fb.rating || 5)
                              ? 'fill-current'
                              : 'text-base-content/25'
                          }`}
                        />
                      ))}
                    </div>
                    {fb.workshop?.title && !workshopId && (
                      <span className="badge badge-outline border-primary/25 text-primary text-xs font-semibold px-2.5 py-1">
                        {fb.workshop.title}
                      </span>
                    )}
                  </div>

                  <p className="text-sm sm:text-base text-base-content/90 leading-relaxed whitespace-pre-line">
                    “{fb.comment}”
                  </p>

                  <div className="pt-2 border-t border-base-300/50 flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="font-bold text-sm sm:text-base text-primary">
                        {fb.authorName}
                      </p>
                      {fb.authorRole && (
                        <p className="text-xs sm:text-sm text-base-content/65">
                          {fb.authorRole}
                        </p>
                      )}
                    </div>
                    {fb.createdAt && (
                      <span className="text-xs text-base-content/50">
                        {new Date(fb.createdAt).toLocaleDateString('th-TH', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    )}
                  </div>
                </article>
              ))
            )}
          </div>

          {/* Right: Inline Feedback Submission Form */}
          <div className="lg:col-span-5 rounded-3xl zen-surface border border-primary/20 p-6 sm:p-7 space-y-5 shadow-xs print:hidden">
            <div className="space-y-1">
              <h3 className="text-lg sm:text-xl font-black text-primary">
                แบ่งปันความคิดเห็นจากผู้เข้าร่วม
              </h3>
              <p className="text-sm text-base-content/75">
                เคยเข้าร่วมเวิร์กชอปกับ Admin A &amp; Admin B แล้วเป็นอย่างไรบ้าง?
                ส่งรีวิวเพื่อให้ทีมงานพัฒนาหลักสูตรต่อได้เลยครับ
              </p>
            </div>

            {justSubmitted && (
              <div className="p-3.5 rounded-2xl bg-success/10 border border-success/30 text-success text-sm font-medium flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>ส่งความคิดเห็นเรียบร้อยแล้ว รีวิวของคุณแสดงด้านซ้ายทันที</span>
              </div>
            )}

            {errorMsg && (
              <div className="p-3.5 rounded-2xl bg-error/10 border border-error/30 text-error text-sm font-medium">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Star Rating Picker */}
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-primary block">
                  ความพึงพอใจโดยรวม
                </label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1.5 rounded-xl hover:bg-base-200 transition-colors"
                      aria-label={`ให้คะแนน ${star} ดาว`}
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= rating
                            ? 'text-warning fill-current'
                            : 'text-base-content/25'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-sm font-bold text-primary ml-1">
                    {rating} / 5
                  </span>
                </div>
              </div>

              {/* Optional workshop selector on Overview */}
              {!workshopId && workshopsList.length > 0 && (
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-primary block">
                    หลักสูตรที่เข้าร่วม (เลือกหรือไม่เลือกก็ได้)
                  </label>
                  <select
                    value={selectedWorkshopId}
                    onChange={(e) => setSelectedWorkshopId(e.target.value)}
                    className="select select-bordered w-full rounded-2xl text-sm"
                  >
                    <option value="">ภาพรวมเวิร์กชอป Living Wealth 365</option>
                    {workshopsList.map((ws) => (
                      <option key={ws.id} value={ws.id}>
                        {ws.title}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-sm font-bold text-primary block">
                  ชื่อของคุณ *
                </label>
                <input
                  type="text"
                  required
                  maxLength={80}
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="เช่น คุณสมชาย ก."
                  className="input input-bordered w-full rounded-2xl text-sm sm:text-base"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-bold text-primary block">
                  ตำแหน่ง / องค์กร หรือกลุ่มที่เข้าร่วม
                </label>
                <input
                  type="text"
                  maxLength={100}
                  value={authorRole}
                  onChange={(e) => setAuthorRole(e.target.value)}
                  placeholder="เช่น HR Manager • บจก. ตัวอย่าง หรือ กลุ่มเล็กวันเสาร์"
                  className="input input-bordered w-full rounded-2xl text-sm sm:text-base"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-bold text-primary block">
                  ความคิดเห็น / สิ่งที่ประทับใจ *
                </label>
                <textarea
                  required
                  rows={4}
                  maxLength={1000}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="เล่าบรรยากาศ สิ่งที่ได้เรียนรู้ หรือผลลัพธ์หลังจบเวิร์กชอป..."
                  className="textarea textarea-bordered w-full rounded-2xl text-sm sm:text-base leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary w-full rounded-2xl font-bold gap-2"
              >
                <Send className="w-4 h-4 shrink-0" />
                <span>{submitting ? 'กำลังส่งความคิดเห็น...' : 'ส่งความคิดเห็น'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
