import { useState, useEffect, useRef } from 'react';
import { X, Check, RotateCcw, Edit3, HelpCircle } from 'lucide-react';
import { useSiteCustomizer, DEFAULT_SITE_CONTENT, getByPath } from '../../context/SiteCustomizerContext';
import { useToast } from '../../context/ToastContext';

export default function VisualEditModal() {
  const { activeEditField, closeEditModal, saveActiveField } = useSiteCustomizer();
  const { showToast } = useToast();
  const [draftValue, setDraftValue] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (activeEditField) {
      setDraftValue(activeEditField.value || '');
      // Auto-focus after dialog opens
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          if (typeof inputRef.current.select === 'function') {
            inputRef.current.select();
          }
        }
      }, 50);
    }
  }, [activeEditField]);

  if (!activeEditField) return null;

  const { key, label, multiline, type, fallback } = activeEditField;

  const handleSave = () => {
    saveActiveField(key, draftValue);
    showToast(`บันทึก "${label}" สำเร็จแล้ว`, 'success');
  };

  const handleResetToDefault = () => {
    const defaultValue = getByPath(DEFAULT_SITE_CONTENT, key, fallback || '');
    setDraftValue(defaultValue);
    showToast(`คืนค่าเริ่มต้นสำหรับ "${label}" แล้ว`, 'info');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      closeEditModal();
    } else if (e.key === 'Enter' && (!multiline || e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSave();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={closeEditModal} />

      <div
        className="relative w-full max-w-xl zen-surface rounded-3xl border border-secondary/40 shadow-2xl p-6 sm:p-8 space-y-5 z-10 animate-scaleUp"
        role="dialog"
        aria-modal="true"
        onKeyDown={handleKeyDown}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-base-300/60 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-secondary/15 text-secondary flex items-center justify-center shrink-0">
              <Edit3 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                คลิกแก้ไขด่วน (Visual Edit)
              </span>
              <h3 className="text-xl font-black text-primary leading-tight">{label}</h3>
              <p className="text-[11px] zen-muted font-mono mt-0.5">ตัวแปร: {key}</p>
            </div>
          </div>
          <button
            onClick={closeEditModal}
            className="btn btn-ghost btn-circle btn-sm text-base-content/60 hover:text-base-content"
            aria-label="ปิดหน้าต่าง"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Edit Field Body */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-base-content/80">
            เนื้อหาข้อความ:
          </label>

          {multiline ? (
            <textarea
              ref={inputRef}
              rows={5}
              value={draftValue}
              onChange={(e) => setDraftValue(e.target.value)}
              className="textarea textarea-bordered w-full rounded-2xl focus:border-secondary focus:ring-2 focus:ring-secondary/20 text-sm leading-relaxed"
              placeholder={`ระบุ ${label}...`}
            />
          ) : (
            <input
              ref={inputRef}
              type={type === 'link' ? 'text' : 'text'}
              value={draftValue}
              onChange={(e) => setDraftValue(e.target.value)}
              className="input input-bordered w-full rounded-2xl focus:border-secondary focus:ring-2 focus:ring-secondary/20 text-sm font-medium"
              placeholder={`ระบุ ${label}...`}
            />
          )}

          <div className="flex items-center justify-between text-xs zen-muted pt-1">
            <span className="flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{multiline ? 'กด ⌘ + Enter เพื่อบันทึก' : 'กด Enter เพื่อบันทึกทันที'}</span>
            </span>
            <span>{draftValue.length} ตัวอักษร</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-base-300/60">
          <button
            type="button"
            onClick={handleResetToDefault}
            className="btn btn-ghost btn-sm rounded-xl text-xs gap-1.5 text-base-content/70 hover:text-warning"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>คืนค่าเริ่มต้นสำหรับจุดนี้</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={closeEditModal}
              className="btn btn-outline btn-sm rounded-xl text-xs"
            >
              ยกเลิก
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="btn btn-secondary btn-sm rounded-xl text-xs font-bold text-white shadow-xs gap-1.5 px-4"
            >
              <Check className="w-4 h-4" />
              <span>บันทึกการเปลี่ยนแปลง</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
