import { useState, useRef } from 'react';
import { Move, Maximize2, Minimize2, RotateCcw, Crosshair } from 'lucide-react';
import { resolveAssetUrl } from '../../api';
import {
  DEFAULT_IMAGE_FRAME,
  encodeImageFrame,
  getImageFrameStyle,
  parseImageFrame,
} from '../../utils/imageFrame';

/**
 * CoverFramePicker — Live interactive 16:9 cover framing preview for Admin CMS.
 * Lets admin drag/click focal point, switch cover vs. contain, and tune zoom.
 */
export default function CoverFramePicker({ value = '', onChange }) {
  const previewRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  if (!value || !value.trim()) return null;

  const parsed = parseImageFrame(value);
  const previewSrc = resolveAssetUrl(parsed.cleanUrl);
  const previewStyle = getImageFrameStyle(value);

  const updateFrame = (patch) => {
    const nextUrl = encodeImageFrame(value, patch);
    if (onChange) onChange(nextUrl);
  };

  const applyPointerPosition = (clientX, clientY) => {
    const box = previewRef.current;
    if (!box) return;
    const rect = box.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const x = Math.round(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
    const y = Math.round(Math.min(100, Math.max(0, ((clientY - rect.top) / rect.height) * 100)));
    updateFrame({ x, y });
  };

  return (
    <div className="rounded-2xl border border-base-300/70 bg-base-200/45 p-4 space-y-3.5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs font-bold text-primary">
          <Move className="w-4 h-4 text-secondary shrink-0" />
          <span>ปรับเฟรมรูปปกหน้าการ์ด (Cover Framing Preview 16:9)</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => updateFrame({ fit: 'cover' })}
            className={`btn btn-xs rounded-lg font-bold gap-1 ${
              parsed.fit === 'cover' ? 'btn-primary text-white' : 'btn-ghost border border-base-300'
            }`}
          >
            <Maximize2 className="w-3 h-3" />
            <span>เต็มกรอบ (Cover)</span>
          </button>
          <button
            type="button"
            onClick={() => updateFrame({ fit: 'contain', zoom: 1 })}
            className={`btn btn-xs rounded-lg font-bold gap-1 ${
              parsed.fit === 'contain' ? 'btn-primary text-white' : 'btn-ghost border border-base-300'
            }`}
          >
            <Minimize2 className="w-3 h-3" />
            <span>เห็นทั้งภาพ (Contain)</span>
          </button>
        </div>
      </div>

      {/* Live 16:9 Card Thumbnail Preview (click or drag to set focal point) */}
      <div
        ref={previewRef}
        onPointerDown={(e) => {
          if (parsed.fit !== 'cover') return;
          setDragging(true);
          e.currentTarget.setPointerCapture?.(e.pointerId);
          applyPointerPosition(e.clientX, e.clientY);
        }}
        onPointerMove={(e) => {
          if (!dragging || parsed.fit !== 'cover') return;
          applyPointerPosition(e.clientX, e.clientY);
        }}
        onPointerUp={() => setDragging(false)}
        onPointerCancel={() => setDragging(false)}
        className={`relative aspect-video w-full rounded-xl overflow-hidden border-2 border-primary/25 bg-base-100 select-none ${
          parsed.fit === 'cover' ? 'cursor-crosshair' : 'cursor-default'
        }`}
        title={parsed.fit === 'cover' ? 'คลิกหรือลากบนภาพเพื่อเลื่อนจุดโฟกัส' : 'โหมดเห็นทั้งภาพไม่ตัดขอบ'}
      >
        <img
          src={previewSrc}
          alt="ตัวอย่างเฟรมหน้าปก"
          draggable={false}
          className="w-full h-full pointer-events-none"
          style={previewStyle}
        />

        {parsed.fit === 'cover' && (
          <div
            className="absolute w-7 h-7 -ml-3.5 -mt-3.5 rounded-full border-2 border-white bg-primary/80 text-white shadow-md flex items-center justify-center pointer-events-none"
            style={{ left: `${parsed.x}%`, top: `${parsed.y}%` }}
          >
            <Crosshair className="w-4 h-4" />
          </div>
        )}

        <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-full bg-black/65 text-white text-[11px] font-semibold pointer-events-none">
          {parsed.fit === 'cover'
            ? `คลิก/ลากเพื่อเลื่อนจุดโฟกัส • X:${parsed.x}% Y:${parsed.y}% • ซูม ${parsed.zoom}x`
            : 'แสดงเต็มภาพไม่ตัดขอบ (เหมาะสำหรับโปสเตอร์/อินโฟกราฟิก)'}
        </div>
      </div>

      {/* Quick Presets & Fine Sliders */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { label: 'โฟกัสด้านบน', patch: { fit: 'cover', x: 50, y: 12 } },
            { label: 'โฟกัสตรงกลาง', patch: { fit: 'cover', x: 50, y: 50 } },
            { label: 'โฟกัสด้านล่าง', patch: { fit: 'cover', x: 50, y: 88 } },
          ].map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => updateFrame(preset.patch)}
              className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-base-100 hover:bg-primary/10 text-primary border border-base-300/70 transition-colors cursor-pointer"
            >
              {preset.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => updateFrame(DEFAULT_IMAGE_FRAME)}
          className="btn btn-ghost btn-xs gap-1 text-base-content/70 hover:text-primary"
        >
          <RotateCcw className="w-3 h-3" />
          <span>รีเซ็ตเฟรม</span>
        </button>
      </div>

      {parsed.fit === 'cover' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <label className="flex flex-col gap-1 text-[11px] font-bold text-base-content/80">
            <span>ซ้าย ↔ ขวา ({parsed.x}%)</span>
            <input
              type="range"
              min="0"
              max="100"
              value={parsed.x}
              onChange={(e) => updateFrame({ x: Number(e.target.value) })}
              className="range range-xs range-primary"
            />
          </label>
          <label className="flex flex-col gap-1 text-[11px] font-bold text-base-content/80">
            <span>บน ↕ ล่าง ({parsed.y}%)</span>
            <input
              type="range"
              min="0"
              max="100"
              value={parsed.y}
              onChange={(e) => updateFrame({ y: Number(e.target.value) })}
              className="range range-xs range-primary"
            />
          </label>
          <label className="flex flex-col gap-1 text-[11px] font-bold text-base-content/80">
            <span>ซูม ({parsed.zoom}x)</span>
            <input
              type="range"
              min="1"
              max="1.8"
              step="0.05"
              value={parsed.zoom}
              onChange={(e) => updateFrame({ zoom: Number(e.target.value) })}
              className="range range-xs range-secondary"
            />
          </label>
        </div>
      )}
    </div>
  );
}
