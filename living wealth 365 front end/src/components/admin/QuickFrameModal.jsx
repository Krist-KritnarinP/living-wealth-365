import { useState, useEffect } from 'react';
import { Move, Check, X } from 'lucide-react';
import CoverFramePicker from '../common/CoverFramePicker';

/**
 * QuickFrameModal — Standalone 1-click Cover Framing Modal
 * Allows admins to adjust focal point, fit, and zoom directly from the table list.
 */
export default function QuickFrameModal({
  isOpen,
  onClose,
  itemTitle = '',
  imageUrl = '',
  onSave,
}) {
  const [currentUrl, setCurrentUrl] = useState(imageUrl || '');

  useEffect(() => {
    setCurrentUrl(imageUrl || '');
  }, [imageUrl, isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (onSave) onSave(currentUrl);
    if (onClose) onClose();
  };

  return (
    <div className="modal modal-open z-[70]" role="dialog" aria-modal="true">
      <div className="modal-box max-w-xl rounded-3xl liquid-glass-solid p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-base-300/60 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center">
              <Move className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-black text-base text-primary">
                ปรับแต่งเฟรมและจุดโฟกัสภาพปก
              </h3>
              <p className="text-xs text-base-content/70 max-w-sm truncate">
                {itemTitle || 'ภาพหน้าปก'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost"
            aria-label="ปิด"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <CoverFramePicker
          value={currentUrl}
          onChange={setCurrentUrl}
          label="คลิกหรือลากจุดตัดบนภาพเพื่อตั้งจุดโฟกัส 16:9"
        />

        <div className="modal-action pt-2 border-t border-base-300/60 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="btn btn-sm btn-ghost rounded-xl"
          >
            ยกเลิก
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="btn btn-sm btn-primary rounded-xl font-bold gap-1.5 shadow-sm"
          >
            <Check className="w-4 h-4" />
            <span>บันทึกเฟรมภาพปก</span>
          </button>
        </div>
      </div>
      <div className="modal-backdrop bg-black/45 backdrop-blur-xs" onClick={onClose} />
    </div>
  );
}
