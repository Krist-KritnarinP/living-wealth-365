import { useState, useEffect } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Move,
  Presentation,
  MessageSquareQuote,
  Star,
  ExternalLink,
  X,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { workshopsApi } from '../../api';
import { ROUTES } from '../../constants/routes';
import { useToast } from '../../context/ToastContext';
import DashboardLayout from '../../components/common/DashboardLayout';
import FileUploadZone from '../../components/common/FileUploadZone';
import CoverFramePicker from '../../components/common/CoverFramePicker';
import FramedImage from '../../components/common/FramedImage';
import QuickFrameModal from '../../components/admin/QuickFrameModal';
import WorkshopLivePreview from '../../components/admin/preview/WorkshopLivePreview';
import { logActivity } from '../../utils/activityLogger';

const TRACK_OPTIONS = [
  { id: 'CRYSTAL', label: 'ทำหินมงคล & แร่ธาตุ' },
  { id: 'LIFE_WEALTH', label: 'ศาสตร์ชีวิต & การเงิน' },
  { id: 'WELLBEING_THERAPY', label: 'บำบัด สมาธิ & คำปรึกษา' },
];

// Helpers to convert structured arrays <-> clean multi-line text for quick admin editing
const linesToArray = (text) =>
  String(text || '')
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);

const arrayToLines = (arr) => (Array.isArray(arr) ? arr.join('\n') : '');

const whatAndHowToText = (arr) =>
  Array.isArray(arr)
    ? arr.map((item) => `${item.title || ''} | ${item.detail || ''}`).join('\n')
    : '';

const textToWhatAndHow = (text) =>
  linesToArray(text).map((line, idx) => {
    const [title, ...rest] = line.split('|');
    return {
      step: String(idx + 1).padStart(2, '0'),
      title: (title || '').trim(),
      detail: rest.join('|').trim(),
    };
  });

const agendaToText = (arr) =>
  Array.isArray(arr)
    ? arr.map((item) => `${item.time || ''} | ${item.topic || ''}`).join('\n')
    : '';

const textToAgenda = (text) =>
  linesToArray(text).map((line) => {
    const [time, ...rest] = line.split('|');
    return {
      time: (time || '').trim(),
      topic: rest.join('|').trim() || (time || '').trim(),
    };
  });

const creditsToText = (arr) =>
  Array.isArray(arr)
    ? arr
        .map((c) => [c.name || '', c.orgType || '', c.participants || '', c.note || ''].join(' | '))
        .join('\n')
    : '';

const textToCredits = (text) =>
  linesToArray(text).map((line) => {
    const [name = '', orgType = '', participants = '', note = ''] = line
      .split('|')
      .map((s) => s.trim());
    return { name, orgType, participants, note };
  });

const EMPTY_FORM = {
  title: '',
  slug: '',
  track: 'CRYSTAL',
  audiences: ['CORPORATE', 'SMALL_GROUP'],
  subtitle: '',
  duration: '2.5 – 3 ชั่วโมง',
  groupSize: '6–12 คน (กลุ่มเล็ก) / 20–60 คน (องค์กร)',
  format: 'On-site / Studio / ออฟฟิศองค์กร',
  facilitator: 'Admin A & Admin B',
  imageUrl: '',
  painPointsText: '',
  whatAndHowText: '',
  outcomesText: '',
  highlightsText: '',
  agendaText: '',
  takeaways: '',
  creditsText: '',
  slidesText: '',
  isActive: true,
  sortOrder: 0,
};

export default function AdminWorkshopsPage() {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState('workshops'); // 'workshops' | 'feedbacks'
  const [workshops, setWorkshops] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Editor Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState('form'); // 'form' | 'preview'
  const [editingWorkshop, setEditingWorkshop] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);

  // Quick Frame Modal state
  const [quickFrameTarget, setQuickFrameTarget] = useState(null);
  const [quickFrameOpen, setQuickFrameOpen] = useState(false);

  const loadAll = async () => {
    setLoading(true);
    try {
      const [wsList, fbList] = await Promise.all([
        workshopsApi.getAll(),
        workshopsApi.getFeedbacks(),
      ]);
      setWorkshops(Array.isArray(wsList) ? wsList : []);
      setFeedbacks(Array.isArray(fbList) ? fbList : []);
    } catch (err) {
      showToast('ไม่สามารถโหลดข้อมูลเวิร์กชอปได้ กรุณาลองใหม่', 'error');
      console.error('[AdminWorkshopsPage] load error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const handleOpenAdd = () => {
    setEditingWorkshop(null);
    setFormData(EMPTY_FORM);
    setModalTab('form');
    setModalOpen(true);
  };

  const handleOpenEdit = (ws) => {
    setEditingWorkshop(ws);
    setFormData({
      title: ws.title || '',
      slug: ws.slug || '',
      track: ws.track || 'CRYSTAL',
      audiences: Array.isArray(ws.audiences) ? ws.audiences : ['CORPORATE', 'SMALL_GROUP'],
      subtitle: ws.subtitle || '',
      duration: ws.duration || '',
      groupSize: ws.groupSize || '',
      format: ws.format || '',
      facilitator: ws.facilitator || 'Admin A & Admin B',
      imageUrl: ws.imageUrl || '',
      painPointsText: arrayToLines(ws.painPoints),
      whatAndHowText: whatAndHowToText(ws.whatAndHow),
      outcomesText: arrayToLines(ws.outcomes),
      highlightsText: arrayToLines(ws.highlights),
      agendaText: agendaToText(ws.agenda),
      takeaways: ws.takeaways || '',
      creditsText: creditsToText(ws.credits),
      slidesText: arrayToLines(ws.slides),
      isActive: ws.isActive ?? true,
      sortOrder: ws.sortOrder ?? 0,
    });
    setModalTab('form');
    setModalOpen(true);
  };

  const buildPayloadFromForm = () => {
    const trackObj = TRACK_OPTIONS.find((t) => t.id === formData.track);
    return {
      title: formData.title.trim(),
      slug: formData.slug.trim() || undefined,
      track: formData.track,
      trackLabel: trackObj?.label || 'เวิร์กชอปพิเศษ',
      audiences: formData.audiences,
      subtitle: formData.subtitle.trim(),
      duration: formData.duration.trim(),
      groupSize: formData.groupSize.trim(),
      format: formData.format.trim(),
      facilitator: formData.facilitator.trim(),
      imageUrl: formData.imageUrl.trim() || null,
      painPoints: linesToArray(formData.painPointsText),
      whatAndHow: textToWhatAndHow(formData.whatAndHowText),
      outcomes: linesToArray(formData.outcomesText),
      highlights: linesToArray(formData.highlightsText),
      agenda: textToAgenda(formData.agendaText),
      takeaways: formData.takeaways.trim(),
      credits: textToCredits(formData.creditsText),
      slides: linesToArray(formData.slidesText),
      isActive: formData.isActive,
      sortOrder: Number(formData.sortOrder) || 0,
    };
  };

  const handleSaveWorkshop = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      showToast('กรุณาระบุชื่อหลักสูตรเวิร์กชอป', 'error');
      return;
    }

    setSaving(true);
    try {
      const payload = buildPayloadFromForm();
      if (editingWorkshop) {
        const updated = await workshopsApi.update(editingWorkshop.id, payload);
        setWorkshops((prev) => prev.map((w) => (w.id === updated.id ? updated : w)));
        logActivity('UPDATE_WORKSHOP', `แก้ไขหลักสูตรเวิร์กชอป: ${updated.title}`);
        showToast('บันทึกการแก้ไขเวิร์กชอปเรียบร้อยแล้ว', 'success');
      } else {
        const created = await workshopsApi.create(payload);
        setWorkshops((prev) => [created, ...prev]);
        logActivity('CREATE_WORKSHOP', `สร้างหลักสูตรเวิร์กชอปใหม่: ${created.title}`);
        showToast('สร้างหลักสูตรเวิร์กชอปใหม่เรียบร้อยแล้ว', 'success');
      }
      setModalOpen(false);
    } catch (err) {
      const msg = err.response?.data?.error || 'ไม่สามารถบันทึกเวิร์กชอปได้';
      showToast(msg, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleActive = async (ws) => {
    try {
      const updated = await workshopsApi.update(ws.id, { isActive: !ws.isActive });
      setWorkshops((prev) => prev.map((w) => (w.id === updated.id ? updated : w)));
      showToast(
        updated.isActive ? 'เปิดเผยแพร่เวิร์กชอปแล้ว' : 'ซ่อนเวิร์กชอปจากหน้าเว็บแล้ว',
        'info'
      );
    } catch {
      showToast('ไม่สามารถเปลี่ยนสถานะได้', 'error');
    }
  };

  const handleDeleteWorkshop = async (ws) => {
    if (!window.confirm(`ยืนยันการลบหลักสูตร "${ws.title}" และรีวิวที่ผูกอยู่ทั้งหมด?`)) {
      return;
    }
    try {
      await workshopsApi.delete(ws.id);
      setWorkshops((prev) => prev.filter((w) => w.id !== ws.id));
      setFeedbacks((prev) => prev.filter((f) => f.workshopId !== ws.id));
      logActivity('DELETE_WORKSHOP', `ลบหลักสูตรเวิร์กชอป: ${ws.title}`);
      showToast('ลบหลักสูตรเวิร์กชอปเรียบร้อยแล้ว', 'info');
    } catch {
      showToast('ไม่สามารถลบหลักสูตรได้', 'error');
    }
  };

  const handleSaveQuickFrame = async (newFramedUrl) => {
    if (!quickFrameTarget) return;
    try {
      const updated = await workshopsApi.update(quickFrameTarget.id, { imageUrl: newFramedUrl });
      setWorkshops((prev) => prev.map((w) => (w.id === updated.id ? updated : w)));
      showToast('อัปเดตเฟรมภาพปกเรียบร้อยแล้ว', 'success');
    } catch {
      showToast('ไม่สามารถบันทึกเฟรมภาพปกได้', 'error');
    }
  };

  const handleToggleFeedbackApproval = async (fb) => {
    try {
      const updated = await workshopsApi.updateFeedback(fb.id, { isApproved: !fb.isApproved });
      setFeedbacks((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
      showToast(
        updated.isApproved ? 'แสดงความคิดเห็นบนหน้าเว็บแล้ว' : 'ซ่อนความคิดเห็นจากหน้าเว็บแล้ว',
        'info'
      );
    } catch {
      showToast('ไม่สามารถอัปเดตสถานะรีวิวได้', 'error');
    }
  };

  const handleDeleteFeedback = async (fb) => {
    if (!window.confirm(`ยืนยันการลบความคิดเห็นจาก "${fb.authorName}"?`)) {
      return;
    }
    try {
      await workshopsApi.deleteFeedback(fb.id);
      setFeedbacks((prev) => prev.filter((item) => item.id !== fb.id));
      showToast('ลบความคิดเห็นเรียบร้อยแล้ว', 'info');
    } catch {
      showToast('ไม่สามารถลบความคิดเห็นได้', 'error');
    }
  };

  const toggleAudience = (audId) => {
    setFormData((prev) => {
      const has = prev.audiences.includes(audId);
      const next = has
        ? prev.audiences.filter((a) => a !== audId)
        : [...prev.audiences, audId];
      return { ...prev, audiences: next.length > 0 ? next : [audId] };
    });
  };

  return (
    <DashboardLayout type="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-primary flex items-center gap-2.5">
              <Presentation className="w-7 h-7 text-secondary" />
              <span>จัดการ Workshops &amp; Feedback (CMS)</span>
            </h1>
            <p className="text-sm text-base-content/70 mt-1">
              แก้ไขรายละเอียด Pain Point, กระบวนการ, เครดิตองค์กร, สไลด์พรีเซ้นต์ และดูแลรีวิวผู้เข้าร่วม
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              to={ROUTES.WORKSHOPS}
              target="_blank"
              className="btn btn-outline btn-sm rounded-xl gap-1.5"
            >
              <ExternalLink className="w-4 h-4" />
              <span>ดูหน้า Workshops</span>
            </Link>
            <button
              type="button"
              onClick={handleOpenAdd}
              className="btn btn-primary btn-sm rounded-xl gap-1.5 font-bold"
            >
              <Plus className="w-4 h-4" />
              <span>เพิ่มเวิร์กชอปใหม่</span>
            </button>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-base-300/60 pb-3">
          <button
            type="button"
            onClick={() => setActiveTab('workshops')}
            className={`btn btn-sm rounded-xl gap-2 ${
              activeTab === 'workshops' ? 'btn-primary' : 'btn-ghost'
            }`}
          >
            <Presentation className="w-4 h-4" />
            <span>หลักสูตร Workshops ({workshops.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('feedbacks')}
            className={`btn btn-sm rounded-xl gap-2 ${
              activeTab === 'feedbacks' ? 'btn-primary' : 'btn-ghost'
            }`}
          >
            <MessageSquareQuote className="w-4 h-4" />
            <span>รีวิว &amp; ความคิดเห็น ({feedbacks.length})</span>
          </button>
        </div>

        {loading ? (
          <div className="py-16 text-center">
            <span className="loading loading-spinner loading-lg text-primary" />
          </div>
        ) : activeTab === 'workshops' ? (
          /* TAB 1: WORKSHOPS LIST */
          <div className="grid grid-cols-1 gap-4">
            {workshops.map((ws) => (
              <div
                key={ws.id}
                className="rounded-2xl zen-surface border border-base-300/60 p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center gap-4 justify-between"
              >
                <div className="flex items-start sm:items-center gap-4 min-w-0">
                  <div className="w-24 h-16 rounded-xl overflow-hidden shrink-0 border border-base-300/60 bg-base-200">
                    <FramedImage
                      src={ws.imageUrl}
                      alt={ws.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="badge badge-primary badge-xs font-bold">
                        {ws.trackLabel}
                      </span>
                      <span
                        className={`badge badge-xs font-bold ${
                          ws.isActive ? 'badge-success text-white' : 'badge-ghost'
                        }`}
                      >
                        {ws.isActive ? 'เผยแพร่อยู่' : 'ซ่อนอยู่'}
                      </span>
                      <span className="text-xs text-base-content/60">
                        นำโดย {ws.facilitator}
                      </span>
                    </div>
                    <h3 className="font-black text-base sm:text-lg text-primary truncate">
                      {ws.title}
                    </h3>
                    <p className="text-xs text-base-content/70 line-clamp-1">
                      /workshops/{ws.slug} • {(ws.credits || []).length} เครดิต •{' '}
                      {(ws.feedbacks || []).length} รีวิว
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setQuickFrameTarget(ws);
                      setQuickFrameOpen(true);
                    }}
                    className="btn btn-ghost btn-xs sm:btn-sm rounded-xl gap-1"
                    title="ปรับเฟรมภาพปก"
                  >
                    <Move className="w-4 h-4 text-secondary" />
                    <span className="hidden sm:inline">ปรับเฟรม</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleToggleActive(ws)}
                    className="btn btn-ghost btn-xs sm:btn-sm rounded-xl gap-1"
                    title={ws.isActive ? 'ซ่อน' : 'เผยแพร่'}
                  >
                    {ws.isActive ? (
                      <EyeOff className="w-4 h-4 text-warning" />
                    ) : (
                      <Eye className="w-4 h-4 text-success" />
                    )}
                    <span className="hidden sm:inline">
                      {ws.isActive ? 'ซ่อน' : 'เผยแพร่'}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(ws)}
                    className="btn btn-outline btn-xs sm:btn-sm rounded-xl gap-1"
                  >
                    <Edit2 className="w-4 h-4" />
                    <span>แก้ไข</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteWorkshop(ws)}
                    className="btn btn-ghost btn-xs sm:btn-sm rounded-xl text-error"
                    title="ลบ"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* TAB 2: FEEDBACK MODERATION */
          <div className="space-y-3">
            {feedbacks.length === 0 ? (
              <div className="rounded-2xl zen-surface border border-base-300/60 p-8 text-center text-base-content/70">
                ยังไม่มีความคิดเห็นจากผู้เข้าร่วมในระบบ
              </div>
            ) : (
              feedbacks.map((fb) => (
                <div
                  key={fb.id}
                  className={`rounded-2xl zen-surface border p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                    fb.isApproved ? 'border-base-300/60' : 'border-warning/40 opacity-75'
                  }`}
                >
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-black text-primary text-sm sm:text-base">
                        {fb.authorName}
                      </span>
                      {fb.authorRole && (
                        <span className="text-xs text-base-content/65">
                          ({fb.authorRole})
                        </span>
                      )}
                      <span className="inline-flex items-center gap-0.5 text-warning text-xs font-bold">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        {fb.rating}
                      </span>
                      <span
                        className={`badge badge-xs font-bold ${
                          fb.isApproved ? 'badge-success text-white' : 'badge-warning'
                        }`}
                      >
                        {fb.isApproved ? 'แสดงบนหน้าเว็บ' : 'ถูกซ่อน'}
                      </span>
                    </div>
                    {fb.workshop?.title && (
                      <p className="text-xs font-semibold text-secondary">
                        หลักสูตร: {fb.workshop.title}
                      </p>
                    )}
                    <p className="text-sm text-base-content/85 whitespace-pre-line">
                      “{fb.comment}”
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleToggleFeedbackApproval(fb)}
                      className="btn btn-outline btn-xs sm:btn-sm rounded-xl gap-1"
                    >
                      {fb.isApproved ? (
                        <>
                          <EyeOff className="w-4 h-4 text-warning" />
                          <span>ซ่อนรีวิว</span>
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4 text-success" />
                          <span>แสดงรีวิว</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteFeedback(fb)}
                      className="btn btn-ghost btn-xs sm:btn-sm rounded-xl text-error"
                      title="ลบรีวิว"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* WORKSHOP EDITOR MODAL */}
      {modalOpen && (
        <div className="modal modal-open z-[60]" role="dialog" aria-modal="true">
          <div className="modal-box max-w-4xl w-full rounded-3xl liquid-glass-solid p-6 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-base-300/60 pb-3">
              <h2 className="text-xl font-black text-primary">
                {editingWorkshop ? 'แก้ไขหลักสูตรเวิร์กชอป' : 'เพิ่มหลักสูตรเวิร์กชอปใหม่'}
              </h2>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="btn btn-ghost btn-sm btn-circle"
                aria-label="ปิดหน้าต่าง"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Tabs: Form | Live Preview */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setModalTab('form')}
                className={`btn btn-sm rounded-xl ${
                  modalTab === 'form' ? 'btn-primary' : 'btn-ghost'
                }`}
              >
                ฟอร์มข้อมูล
              </button>
              <button
                type="button"
                onClick={() => setModalTab('preview')}
                className={`btn btn-sm rounded-xl ${
                  modalTab === 'preview' ? 'btn-primary' : 'btn-ghost'
                }`}
              >
                ดูตัวอย่างจริง (Live Preview)
              </button>
            </div>

            {modalTab === 'preview' ? (
              <WorkshopLivePreview data={buildPayloadFromForm()} />
            ) : (
              <form onSubmit={handleSaveWorkshop} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-primary">ชื่อหลักสูตร *</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="input input-bordered w-full rounded-xl text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-primary">URL Slug (เว้นว่างเพื่อสร้างอัตโนมัติ)</label>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="เช่น crystal-mineral-crafting"
                      className="input input-bordered w-full rounded-xl text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-primary">คำอธิบายสั้น (Subtitle)</label>
                  <textarea
                    rows={2}
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    className="textarea textarea-bordered w-full rounded-xl text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-primary">หมวดหลักสูตร</label>
                    <select
                      value={formData.track}
                      onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                      className="select select-bordered w-full rounded-xl text-sm"
                    >
                      {TRACK_OPTIONS.map((opt) => (
                        <option key={opt.id} value={opt.id}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-primary">ผู้สอน / ผู้จัดกระบวนการ</label>
                    <select
                      value={formData.facilitator}
                      onChange={(e) => setFormData({ ...formData, facilitator: e.target.value })}
                      className="select select-bordered w-full rounded-xl text-sm"
                    >
                      <option value="Admin A">Admin A</option>
                      <option value="Admin B">Admin B</option>
                      <option value="Admin A & Admin B">Admin A &amp; Admin B</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-primary">กลุ่มเป้าหมาย</label>
                    <div className="flex gap-2 pt-1.5">
                      <label className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-xs checkbox-primary"
                          checked={formData.audiences.includes('CORPORATE')}
                          onChange={() => toggleAudience('CORPORATE')}
                        />
                        องค์กร
                      </label>
                      <label className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-xs checkbox-primary"
                          checked={formData.audiences.includes('SMALL_GROUP')}
                          onChange={() => toggleAudience('SMALL_GROUP')}
                        />
                        กลุ่มเล็ก
                      </label>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-primary">ระยะเวลา</label>
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      className="input input-bordered w-full rounded-xl text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-primary">จำนวนผู้เข้าร่วม</label>
                    <input
                      type="text"
                      value={formData.groupSize}
                      onChange={(e) => setFormData({ ...formData, groupSize: e.target.value })}
                      className="input input-bordered w-full rounded-xl text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-primary">รูปแบบสถานที่</label>
                    <input
                      type="text"
                      value={formData.format}
                      onChange={(e) => setFormData({ ...formData, format: e.target.value })}
                      className="input input-bordered w-full rounded-xl text-sm"
                    />
                  </div>
                </div>

                {/* Cover Image Upload & Framing */}
                <div className="space-y-2 p-4 rounded-2xl bg-base-200/40 border border-base-300/60">
                  <label className="text-xs font-bold text-primary block">ภาพปกหลักสูตร &amp; ปรับเฟรมภาพ</label>
                  <FileUploadZone
                    label="อัปโหลดภาพปก (JPG / PNG / WebP)"
                    currentUrl={formData.imageUrl}
                    onUploadSuccess={(url) => setFormData({ ...formData, imageUrl: url })}
                  />
                  {formData.imageUrl && (
                    <CoverFramePicker
                      imageUrl={formData.imageUrl}
                      onChange={(framedUrl) => setFormData({ ...formData, imageUrl: framedUrl })}
                    />
                  )}
                </div>

                {/* Pain Points, What & How, Outcomes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-error">
                      Pain Point (บรรทัดละ 1 ข้อ)
                    </label>
                    <textarea
                      rows={4}
                      value={formData.painPointsText}
                      onChange={(e) => setFormData({ ...formData, painPointsText: e.target.value })}
                      placeholder="เช่น พนักงานล้าสะสมจากหน้าจอ..."
                      className="textarea textarea-bordered w-full rounded-xl text-xs sm:text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-success">
                      ผลลัพธ์ที่ได้ / Outcomes (บรรทัดละ 1 ข้อ)
                    </label>
                    <textarea
                      rows={4}
                      value={formData.outcomesText}
                      onChange={(e) => setFormData({ ...formData, outcomesText: e.target.value })}
                      placeholder="เช่น ได้ชิ้นงานหินแท้ที่ออกแบบเองกลับบ้าน..."
                      className="textarea textarea-bordered w-full rounded-xl text-xs sm:text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-primary">
                    ทำอะไร &amp; ทำยังไง (รูปแบบ: หัวข้อ | รายละเอียด — บรรทัดละ 1 ขั้นตอน)
                  </label>
                  <textarea
                    rows={4}
                    value={formData.whatAndHowText}
                    onChange={(e) => setFormData({ ...formData, whatAndHowText: e.target.value })}
                    placeholder="ปูพื้นวิทยาศาสตร์แร่ธาตุ | ทำความรู้จักโครงสร้างผลึกควอตซ์และวิธีแยกหินแท้"
                    className="textarea textarea-bordered w-full rounded-xl text-xs sm:text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-primary">
                      กำหนดการ Agenda (รูปแบบ: เวลา | หัวข้อ)
                    </label>
                    <textarea
                      rows={4}
                      value={formData.agendaText}
                      onChange={(e) => setFormData({ ...formData, agendaText: e.target.value })}
                      placeholder="00:00 – 00:30 | เปิดมุมมองวิทยาศาสตร์แร่ธาตุ"
                      className="textarea textarea-bordered w-full rounded-xl text-xs sm:text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-primary">
                      ไฮไลต์สำคัญ (บรรทัดละ 1 ข้อ)
                    </label>
                    <textarea
                      rows={4}
                      value={formData.highlightsText}
                      onChange={(e) => setFormData({ ...formData, highlightsText: e.target.value })}
                      className="textarea textarea-bordered w-full rounded-xl text-xs sm:text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-primary">สิ่งที่ได้รับกลับบ้าน (Takeaways)</label>
                  <input
                    type="text"
                    value={formData.takeaways}
                    onChange={(e) => setFormData({ ...formData, takeaways: e.target.value })}
                    className="input input-bordered w-full rounded-xl text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-primary">
                    เครดิตองค์กร/ผู้เคยเข้าร่วม (รูปแบบ: ชื่อองค์กร | ประเภท | จำนวนคน | โน้ต)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.creditsText}
                    onChange={(e) => setFormData({ ...formData, creditsText: e.target.value })}
                    placeholder="ทีม People & Culture บจก. สยามเฮลท์เทค | ธุรกิจเทคโนโลยีสุขภาพ | 38 ท่าน | Wellness Day สาทร"
                    className="textarea textarea-bordered w-full rounded-xl text-xs sm:text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-primary">
                    URLs รูปสไลด์ Canva / PowerPoint (บรรทัดละ 1 ลิงก์ สำหรับโหมดพรีเซ้นต์)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.slidesText}
                    onChange={(e) => setFormData({ ...formData, slidesText: e.target.value })}
                    placeholder="https://...r2.dev/slide-1.webp"
                    className="textarea textarea-bordered w-full rounded-xl text-xs sm:text-sm"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-base-300/60">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="btn btn-ghost rounded-xl"
                  >
                    ยกเลิก
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="btn btn-primary rounded-xl font-bold px-6"
                  >
                    {saving ? 'กำลังบันทึก...' : 'บันทึกเวิร์กชอป'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 1-CLICK QUICK FRAME MODAL */}
      <QuickFrameModal
        isOpen={quickFrameOpen}
        onClose={() => setQuickFrameOpen(false)}
        itemTitle={quickFrameTarget?.title}
        imageUrl={quickFrameTarget?.imageUrl}
        onSave={handleSaveQuickFrame}
      />
    </DashboardLayout>
  );
}
