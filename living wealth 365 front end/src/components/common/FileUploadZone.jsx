import { useState, useRef } from 'react';
import {
  Plus,
  FileText,
  Image as ImageIcon,
  Trash2,
  ExternalLink,
  AlertCircle,
  Link as LinkIcon,
} from 'lucide-react';
import { uploadApi, resolveAssetUrl } from '../../api';

/**
 * 📦 FileUploadZone
 * Reusable Upload Dropzone with DaisyUI radial-progress loading indicator,
 * Image preview, PDF badge, and URL manual entry option.
 */
export default function FileUploadZone({
  label = 'อัปโหลดไฟล์',
  value = '',
  onChange,
  accept = 'image', // 'image' | 'pdf'
  required = false,
  helpText = '',
}) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [showManualUrl, setShowManualUrl] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const fileInputRef = useRef(null);

  const isPdf = accept === 'pdf';
  const acceptedTypes = isPdf
    ? '.pdf,application/pdf'
    : 'image/png,image/jpeg,image/jpg,image/webp,image/gif,image/svg+xml';

  const handleFile = async (file) => {
    if (!file) return;

    setErrorMessage('');

    // Client-side quick check
    if (isPdf && file.type !== 'application/pdf') {
      setErrorMessage('กรุณาเลือกไฟล์เอกสารนามสกุล .pdf เท่านั้น');
      return;
    }

    if (!isPdf && !file.type.startsWith('image/')) {
      setErrorMessage('กรุณาเลือกไฟล์รูปภาพ (JPG, PNG, WebP, GIF) เท่านั้น');
      return;
    }

    if (file.size > 25 * 1024 * 1024) {
      setErrorMessage('ไฟล์มีขนาดเกินกำหนด (สูงสุดไม่เกิน 25MB)');
      return;
    }

    try {
      setUploading(true);
      setProgress(5);

      const res = await uploadApi.uploadFile(file, (percent) => {
        setProgress(percent);
      });

      // Update parent with the uploaded file URL
      if (res && res.url) {
        onChange(res.url);
      }
      setProgress(100);
    } catch (err) {
      console.error('File upload error:', err);
      const msg =
        err.response?.data?.error ||
        err.message ||
        'เกิดข้อผิดพลาดในการอัปโหลดไฟล์ กรุณาลองใหม่อีกครั้ง';
      setErrorMessage(msg);
    } finally {
      setTimeout(() => {
        setUploading(false);
        setProgress(0);
      }, 400);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleClear = () => {
    onChange('');
    setErrorMessage('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const resolvedUrl = resolveAssetUrl(value);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {/* Label & Manual Toggle */}
      <div className="flex items-center justify-between gap-2">
        <label className="text-xs font-bold text-base-content/85 flex items-center gap-1.5">
          {isPdf ? (
            <FileText className="w-3.5 h-3.5 text-secondary" />
          ) : (
            <ImageIcon className="w-3.5 h-3.5 text-primary" />
          )}
          <span>{label}</span>
          {required && <span className="text-error">*</span>}
        </label>

        <button
          type="button"
          onClick={() => setShowManualUrl(!showManualUrl)}
          className="text-[11px] text-base-content/60 hover:text-primary transition-colors flex items-center gap-1 cursor-pointer"
        >
          <LinkIcon className="w-3 h-3" />
          <span>{showManualUrl ? 'ซ่อนใส่ URL' : 'หรือใส่ลิงก์ URL'}</span>
        </button>
      </div>

      {/* Manual URL Input (Optional fallback) */}
      {showManualUrl && (
        <div className="flex items-center gap-2 mb-1 animate-fadeIn">
          <input
            type="url"
            placeholder={
              isPdf
                ? 'https://example.com/brochure.pdf'
                : 'https://images.unsplash.com/... หรือ URL รูปภาพ'
            }
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className="input input-bordered input-sm w-full rounded-xl text-xs bg-base-100"
          />
          {value && (
            <button
              type="button"
              onClick={handleClear}
              className="btn btn-ghost btn-xs text-error"
              title="ล้างค่า"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes}
        onChange={handleInputChange}
        className="hidden"
      />

      {/* Error Message */}
      {errorMessage && (
        <div className="alert alert-error text-xs py-2 px-3 rounded-xl flex items-center gap-2 mb-1">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span className="flex-1">{errorMessage}</span>
          <button
            type="button"
            onClick={() => setErrorMessage('')}
            className="btn btn-ghost btn-xs btn-circle"
          >
            ×
          </button>
        </div>
      )}

      {/* Uploading State: DaisyUI radial-progress */}
      {uploading ? (
        <div className="p-6 rounded-2xl border-2 border-dashed border-primary/50 bg-primary/5 flex flex-col items-center justify-center gap-3 animate-pulse">
          <div
            className="radial-progress text-primary font-black text-xs transition-all duration-200"
            style={{ '--value': progress }}
            aria-valuenow={progress}
            role="progressbar"
          >
            {progress}%
          </div>
          <div className="text-center">
            <p className="text-xs font-bold text-primary">กำลังอัปโหลดไฟล์...</p>
            <p className="text-[11px] text-base-content/60">กรุณารอสักครู่ ระบบกำลังบันทึกข้อมูล</p>
          </div>
        </div>
      ) : value ? (
        /* Preview State when file/image exists */
        <div className="p-3 rounded-2xl border border-base-300 bg-base-100/70 backdrop-blur-xs flex items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3 overflow-hidden">
            {isPdf ? (
              <div className="w-12 h-12 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center shrink-0 border border-secondary/20 font-black text-xs">
                PDF
              </div>
            ) : (
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-base-200 border border-base-300 shrink-0 relative group">
                <img
                  src={resolvedUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            )}

            <div className="overflow-hidden min-w-0">
              <p className="text-xs font-bold text-base-content truncate">
                {value.split('/').pop() || (isPdf ? 'ไฟล์เอกสาร PDF' : 'รูปภาพที่เลือก')}
              </p>
              <a
                href={resolvedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-primary hover:underline flex items-center gap-1 font-medium truncate mt-0.5"
              >
                <span>เปิดดูไฟล์ตัวอย่าง</span>
                <ExternalLink className="w-2.5 h-2.5 shrink-0" />
              </a>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="btn btn-outline btn-primary btn-xs rounded-xl font-bold gap-1"
              title="เปลี่ยนไฟล์ใหม่"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>เปลี่ยน</span>
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="btn btn-ghost btn-xs text-error rounded-xl hover:bg-error/10"
              title="ลบไฟล์นี้"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        /* Empty / Dropzone State */
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`group cursor-pointer p-5 rounded-2xl border-2 border-dashed transition-all duration-200 flex flex-col items-center justify-center gap-2 text-center select-none ${
            dragActive
              ? 'border-primary bg-primary/10 scale-[1.01]'
              : 'border-base-300 hover:border-primary/60 bg-base-100/50 hover:bg-base-200/50'
          }`}
        >
          <div className="w-10 h-10 rounded-full bg-primary/10 group-hover:bg-primary group-hover:text-white text-primary transition-all duration-300 flex items-center justify-center shadow-xs">
            <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </div>

          <div>
            <p className="text-xs font-black text-primary">
              คลิกปุ่ม + หรือลากไฟล์มาวางที่นี่
            </p>
            <p className="text-[11px] text-base-content/60 mt-0.5">
              {isPdf
                ? 'รองรับไฟล์เอกสาร PDF (ขนาดไม่เกิน 25MB)'
                : 'รองรับไฟล์ JPG, PNG, WebP (ขนาดไม่เกิน 25MB)'}
            </p>
          </div>
        </div>
      )}

      {/* Help text */}
      {helpText && <span className="text-[11px] text-base-content/60">{helpText}</span>}
    </div>
  );
}
