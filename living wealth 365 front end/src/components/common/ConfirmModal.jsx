import { useEffect, useRef } from 'react';
import { AlertTriangle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function ConfirmModal({
  isOpen,
  title,
  message,
  confirmLabel,
  cancelLabel,
  isDanger = true,
  onConfirm,
  onCancel,
}) {
  const { t } = useLanguage();
  const cancelBtnRef = useRef(null);

  // W3C ARIA: ปิดด้วยปุ่ม Escape และจัดการ Focus
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Auto-focus cancel button for safe keyboard experience
    cancelBtnRef.current?.focus();

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
      className="modal modal-open z-50"
    >
      <div className="modal-box rounded-3xl zen-surface border border-base-300 shadow-2xl max-w-md p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
              isDanger ? 'bg-error/15 text-error' : 'bg-primary/15 text-primary'
            }`}
          >
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 id="confirm-modal-title" className="text-lg font-black text-primary leading-tight">
              {title || t('confirmDeleteTitle')}
            </h3>
            <p className="text-xs text-base-content/60 mt-0.5">Living Wealth 365 Security Gate</p>
          </div>
        </div>

        <p className="text-sm text-base-content/80 leading-relaxed">
          {message || t('confirmDeleteMsg')}
        </p>

        <div className="modal-action pt-2 flex items-center justify-end gap-2">
          <button
            ref={cancelBtnRef}
            onClick={onCancel}
            type="button"
            className="btn btn-sm btn-ghost rounded-xl font-semibold"
          >
            {cancelLabel || t('cancel')}
          </button>
          <button
            onClick={onConfirm}
            type="button"
            className={`btn btn-sm rounded-xl font-bold shadow-xs ${
              isDanger ? 'btn-error text-white' : 'btn-primary text-white'
            }`}
          >
            {confirmLabel || (isDanger ? t('delete') : t('save'))}
          </button>
        </div>
      </div>
      <div
        className="modal-backdrop bg-black/40 backdrop-blur-xs"
        onClick={onCancel}
        aria-hidden="true"
      />
    </div>
  );
}
