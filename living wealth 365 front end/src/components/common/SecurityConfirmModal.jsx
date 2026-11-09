import { useState, useEffect } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  X,
  Lock,
  FileCheck2,
} from 'lucide-react';

/**
 * 🔐 SecurityConfirmModal
 * Enterprise 2-Step Verification Modal requiring a randomly generated 4-digit code.
 * Used for Final Checks on Edit and Delete confirmations.
 */
export default function SecurityConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  action = 'edit', // 'edit' | 'delete'
  title,
  itemName,
  summaryList = [],
  warningText,
  confirmButtonText,
}) {
  const [generatedPin, setGeneratedPin] = useState('');
  const [inputPin, setInputPin] = useState('');
  const [hasError, setHasError] = useState(false);

  // Generate random 4-digit number (1000 - 9999)
  const generateNewPin = () => {
    const pin = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedPin(pin);
    setInputPin('');
    setHasError(false);
  };

  useEffect(() => {
    if (isOpen) {
      generateNewPin();
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isDelete = action === 'delete';
  const isMatch = inputPin.trim() === generatedPin;

  const handleConfirmClick = () => {
    if (!isMatch) {
      setHasError(true);
      return;
    }
    onConfirm(generatedPin);
  };

  const defaultTitle = isDelete
    ? 'ยืนยันการลบข้อมูล (Security PIN Required)'
    : 'ตรวจสอบรอบสุดท้าย & ยืนยันรหัสความปลอดภัย (Final Check)';

  const defaultConfirmText = isDelete
    ? 'ยืนยันการลบข้อมูลถาวร'
    : 'ยืนยันการบันทึกข้อมูล';

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="modal modal-open z-50 animate-fadeIn backdrop-blur-sm"
    >
      <div className="modal-box rounded-3xl zen-surface border border-base-300 shadow-2xl max-w-lg p-6 sm:p-8 space-y-5">
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-3 border-b border-base-300/60 pb-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-inner ${
                isDelete
                  ? 'bg-error/15 text-error border border-error/20'
                  : 'bg-primary/10 text-primary border border-primary/20'
              }`}
            >
              {isDelete ? (
                <ShieldAlert className="w-6 h-6 animate-pulse" />
              ) : (
                <FileCheck2 className="w-6 h-6" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span
                  className={`badge badge-xs font-black uppercase text-[9px] px-2 py-0.5 ${
                    isDelete ? 'badge-error text-white' : 'badge-primary text-white'
                  }`}
                >
                  {isDelete ? 'HIGH-RISK DELETE' : 'FINAL CHECK'}
                </span>
                <span className="text-[11px] text-base-content/60 font-semibold">
                  2-Step Verification
                </span>
              </div>
              <h3 className="text-lg font-black text-primary mt-0.5">
                {title || defaultTitle}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="btn btn-sm btn-ghost btn-circle text-base-content/60 hover:text-primary"
            aria-label="ปิดหน้าต่าง"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Target Item Name Banner */}
        {itemName && (
          <div className="p-3.5 rounded-2xl bg-base-200/60 border border-base-300/60 flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-secondary shrink-0" />
            <div className="min-w-0 flex-1">
              <span className="text-[11px] text-base-content/60 block">
                รายการที่กำลังดำเนินการ:
              </span>
              <span className="text-sm font-bold text-primary truncate block">
                {itemName}
              </span>
            </div>
          </div>
        )}

        {/* Summary Details Grid (For Edit Final Check) */}
        {!isDelete && summaryList.length > 0 && (
          <div className="space-y-2">
            <span className="text-xs font-bold text-base-content/70 block">
              สรุปข้อมูลที่กำลังจะบันทึก:
            </span>
            <div className="p-3.5 rounded-2xl bg-base-100 border border-base-300/80 space-y-2 text-xs">
              {summaryList.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between pb-1.5 border-b border-base-300/40 last:border-0 last:pb-0"
                >
                  <span className="text-base-content/65 font-medium">{item.label}:</span>
                  <span className="font-bold text-primary truncate max-w-[200px]">
                    {item.value || '-'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Warning Alert for Delete */}
        {isDelete && (
          <div className="alert alert-error/10 border border-error/30 rounded-2xl text-xs py-3 px-3.5 flex items-start gap-2.5 text-error">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <strong className="font-bold block">คำเตือนความปลอดภัย:</strong>
              <p className="text-error/90 leading-relaxed">
                {warningText ||
                  'การลบข้อมูลนี้จะส่งผลต่อการแสดงผลบนหน้าเว็บไซต์และไม่สามารถกู้คืนได้ กรุณาตรวจสอบให้แน่ใจก่อนยืนยัน'}
              </p>
            </div>
          </div>
        )}

        {/* 🔢 Random 4-Digit Security Code Generator Section */}
        <div className="p-4 rounded-2xl bg-secondary/10 border border-secondary/20 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-secondary">
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" />
              <span>รหัสสุ่มความปลอดภัย 4 หลัก:</span>
            </span>
            <button
              type="button"
              onClick={generateNewPin}
              className="text-[11px] text-secondary hover:underline flex items-center gap-1 font-semibold cursor-pointer"
              title="สุ่มรหัสใหม่"
            >
              <RotateCcw className="w-3 h-3" />
              <span>สุ่มรหัสใหม่</span>
            </button>
          </div>

          {/* Big Code Display */}
          <div className="flex items-center justify-center gap-3 py-2 bg-base-100 rounded-xl border border-secondary/30 shadow-inner">
            {generatedPin.split('').map((digit, idx) => (
              <span
                key={idx}
                className="w-10 h-11 rounded-lg bg-secondary/15 text-secondary text-2xl font-black flex items-center justify-center tracking-widest shadow-xs select-all"
              >
                {digit}
              </span>
            ))}
          </div>

          <p className="text-[11px] text-center text-base-content/70">
            กรุณาพิมพ์ตัวเลข <strong className="text-secondary font-black">{generatedPin}</strong> ด้านบนลงในช่องด้านล่างเพื่อยืนยัน
          </p>

          {/* Input Box for 4-digit code */}
          <div className="space-y-1">
            <input
              type="text"
              maxLength={4}
              value={inputPin}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '').slice(0, 4);
                setInputPin(val);
                if (hasError) setHasError(false);
              }}
              placeholder="กรอกตัวเลข 4 หลัก..."
              className={`input input-bordered w-full text-center text-xl font-black tracking-[0.5em] rounded-xl bg-base-100 transition-all ${
                isMatch
                  ? 'input-success border-success text-success bg-success/5'
                  : hasError
                  ? 'input-error border-error'
                  : 'focus:input-primary'
              }`}
              autoFocus
            />

            {isMatch && (
              <div className="text-center text-xs font-bold text-success flex items-center justify-center gap-1 pt-1 animate-fadeIn">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>รหัสความปลอดภัยถูกต้องเรียบร้อย</span>
              </div>
            )}
            {hasError && !isMatch && (
              <div className="text-center text-xs font-bold text-error pt-1 animate-fadeIn">
                รหัสไม่ถูกต้อง กรุณากรอก {generatedPin} ให้ตรงกัน
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-base-300/60">
          <button
            type="button"
            onClick={onClose}
            className="btn btn-ghost btn-md rounded-2xl font-bold"
          >
            ยกเลิก
          </button>

          <button
            type="button"
            disabled={!isMatch}
            onClick={handleConfirmClick}
            className={`btn btn-md rounded-2xl font-bold shadow-md transition-all gap-1.5 ${
              isDelete ? 'btn-error text-white' : 'btn-primary'
            } ${!isMatch ? 'opacity-40 cursor-not-allowed' : 'hover:scale-[1.02]'}`}
          >
            {isDelete ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
            <span>{confirmButtonText || defaultConfirmText}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
