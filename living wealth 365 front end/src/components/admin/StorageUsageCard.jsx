import { useState, useEffect, useMemo } from 'react';
import {
  HardDrive,
  Sparkles,
  ExternalLink,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  X,
  FileText,
  Image as ImageIcon,
  ArrowUpDown,
  Maximize2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSiteCustomizer } from '../../context/SiteCustomizerContext';
import { computeStorageStats, formatBytes } from '../../utils/storageTracker';
import { resolveAssetUrl } from '../../api';

export default function StorageUsageCard({ compact = false }) {
  const { posts, products, insurancePlans = [] } = useAuth();
  const { content } = useSiteCustomizer();

  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('size-desc'); // 'size-desc' | 'size-asc' | 'name'
  const [updateTick, setUpdateTick] = useState(0);

  // ⚡ Listen for real-time storage changes across the app
  useEffect(() => {
    const handleStorageUpdate = () => {
      setUpdateTick((prev) => prev + 1);
    };
    window.addEventListener('lw365:storage_updated', handleStorageUpdate);
    return () => window.removeEventListener('lw365:storage_updated', handleStorageUpdate);
  }, []);

  // Compute stats reactively
  const stats = useMemo(() => {
    return computeStorageStats({
      posts,
      products,
      insurancePlans,
      siteContent: content,
    });
  }, [posts, products, insurancePlans, content, updateTick]);

  // Filter and sort modal assets
  const filteredAssets = useMemo(() => {
    let list = stats.assets.filter((a) => {
      const matchSearch =
        a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.url.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCat = categoryFilter === 'ALL' || a.category.includes(categoryFilter);
      return matchSearch && matchCat;
    });

    if (sortBy === 'size-desc') {
      list.sort((a, b) => b.sizeBytes - a.sizeBytes);
    } else if (sortBy === 'size-asc') {
      list.sort((a, b) => a.sizeBytes - b.sizeBytes);
    } else if (sortBy === 'name') {
      list.sort((a, b) => a.title.localeCompare(b.title));
    }

    return list;
  }, [stats.assets, searchTerm, categoryFilter, sortBy]);

  // Compact Mini Bar (for sidebar or top bar)
  if (compact) {
    return (
      <div className="p-3 rounded-2xl bg-base-200/60 border border-base-300/50 space-y-2 text-xs">
        <div className="flex items-center justify-between">
          <span className="font-bold text-base-content/80 flex items-center gap-1.5">
            <HardDrive className="w-3.5 h-3.5 text-secondary" />
            <span>Storage (R2 5GB)</span>
          </span>
          <span className="font-black text-primary">
            {stats.usagePercent}%
          </span>
        </div>
        <progress
          className={`progress ${stats.progressColor} w-full h-1.5`}
          value={stats.usagePercent}
          max="100"
        />
        <div className="flex justify-between text-[10px] text-base-content/60">
          <span>{stats.totalSizeMB} MB</span>
          <span>5,000 MB</span>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* 📊 Main Storage Card */}
      <div className="w-full zen-surface rounded-3xl p-6 sm:p-7 border border-base-300/70 shadow-xs space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-base-300/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-secondary/15 text-secondary flex items-center justify-center shrink-0">
              <HardDrive className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-primary flex items-center gap-2">
                <span>พื้นที่จัดเก็บ Cloudflare R2</span>
                <span className="text-xs font-semibold text-secondary">
                  (เพดานความปลอดภัย 5.00 GB)
                </span>
              </h2>
              <p className="text-xs text-base-content/65">
                ติดตามการใช้พื้นที่และขนาดไฟล์รูปภาพทั้งหมดบนเว็บไซต์แบบ Real-time
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className={`badge badge-sm font-bold ${stats.statusColor}`}>
              {stats.statusText}
            </span>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="btn btn-outline btn-secondary btn-xs rounded-xl font-bold gap-1.5"
            >
              <span>ตรวจสอบขนาดรูปรายชิ้น</span>
              <span className="badge badge-xs badge-secondary text-white font-bold">
                {stats.totalCount}
              </span>
            </button>
          </div>
        </div>

        {/* Progress Bar & High-level Percent */}
        <div className="space-y-2">
          <div className="flex items-baseline justify-between text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <span className="font-bold text-primary">ใช้ไปแล้ว:</span>
              <span className="font-black text-secondary text-base sm:text-lg">
                {stats.totalSizeMB} MB
              </span>
              <span className="text-xs text-base-content/60">
                / {stats.maxStorageMB.toLocaleString()} MB (5 GB)
              </span>
            </div>
            <div className="text-right">
              <span className="font-bold text-base-content/75">
                คงเหลือ: <span className="text-primary font-black">{stats.remainingMB > 1000 ? `${(stats.remainingMB / 1024).toFixed(2)} GB` : `${stats.remainingMB} MB`}</span>
              </span>
              <span className="text-xs text-base-content/50 ml-1.5">
                ({(100 - stats.usagePercent).toFixed(1)}% ว่าง)
              </span>
            </div>
          </div>

          {/* DaisyUI Progress Bar */}
          <progress
            className={`progress ${stats.progressColor} w-full h-3 rounded-full transition-all duration-300`}
            value={stats.usagePercent}
            max="100"
            aria-label="Storage Usage Progress"
          />
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
          <div className="p-3 rounded-2xl bg-base-200/50 border border-base-300/40 space-y-0.5">
            <span className="text-[11px] font-semibold text-base-content/65 uppercase block">
              จำนวนไฟล์ทั้งหมด
            </span>
            <span className="text-base sm:text-lg font-black text-primary">
              {stats.totalCount} ชิ้น
            </span>
            <span className="text-[10px] text-base-content/60 block">
              รูปภาพ & เอกสาร PDF
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-base-200/50 border border-base-300/40 space-y-0.5">
            <span className="text-[11px] font-semibold text-base-content/65 uppercase block">
              ขนาดเฉลี่ยต่อรูป
            </span>
            <span className="text-base sm:text-lg font-black text-primary">
              {stats.totalCount > 0 ? formatBytes(stats.totalSizeBytes / stats.totalCount) : '0 KB'}
            </span>
            <span className="text-[10px] text-success font-medium block">
              ✨ บีบอัด WebP คมชัดสูง
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-base-200/50 border border-base-300/40 space-y-0.5">
            <span className="text-[11px] font-semibold text-base-content/65 uppercase block">
              รองรับรูปเพิ่มได้อีก
            </span>
            <span className="text-base sm:text-lg font-black text-secondary">
              ~{Math.round(stats.remainingMB / 0.25).toLocaleString()} รูป
            </span>
            <span className="text-[10px] text-base-content/60 block">
              (เฉลี่ย ~250 KB/รูป)
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-base-200/50 border border-base-300/40 space-y-0.5">
            <span className="text-[11px] font-semibold text-base-content/65 uppercase block">
              ประมาณการค่าใช้จ่าย
            </span>
            <span className="text-base sm:text-lg font-black text-success">
              $0.00 / ฟรี
            </span>
            <span className="text-[10px] text-base-content/60 block">
              🔒 โควตาปลอดภัย ไม่เกิน 5GB
            </span>
          </div>
        </div>
      </div>

      {/* 🔍 Media Asset Inspector Modal */}
      {modalOpen && (
        <div className="modal modal-open z-50">
          <div className="modal-box max-w-4xl p-6 sm:p-8 zen-surface border border-base-300 rounded-3xl space-y-5 max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-base-300/60">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-primary">
                    ตรวจสอบขนาดรูปภาพทั้งหมดในระบบ
                  </h3>
                  <p className="text-xs text-base-content/65">
                    ตรวจสอบขนาดไฟล์ของรูปภาพทุกจุดเพื่อป้องกันไม่ให้กินพื้นที่จัดเก็บ
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="btn btn-sm btn-ghost btn-circle"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Controls: Search, Filter, Sort */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 shrink-0">
              <div className="sm:col-span-6 relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" />
                <input
                  type="text"
                  placeholder="ค้นหาตามชื่อรูป หรือ URL..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input input-sm input-bordered w-full pl-9 rounded-xl text-xs bg-base-100"
                />
              </div>

              <div className="sm:col-span-3">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="select select-sm select-bordered w-full rounded-xl text-xs bg-base-100"
                >
                  <option value="ALL">ทุกหมวดหมู่</option>
                  <option value="บทความ">บทความ (Posts)</option>
                  <option value="แร่ธาตุ">สินค้าแร่ธาตุ (Products)</option>
                  <option value="ประกัน">แผนประกัน (Insurance)</option>
                  <option value="หน้าแรก">หน้าแรก (Home Narrative)</option>
                </select>
              </div>

              <div className="sm:col-span-3">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="select select-sm select-bordered w-full rounded-xl text-xs bg-base-100"
                >
                  <option value="size-desc">เรียง: ขนาดใหญ่สุดก่อน ⬇️</option>
                  <option value="size-asc">เรียง: ขนาดเล็กสุดก่อน ⬆️</option>
                  <option value="name">เรียง: ตามชื่อ ก-ฮ</option>
                </select>
              </div>
            </div>

            {/* Asset Table / List (Scrollable) */}
            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
              {filteredAssets.length === 0 ? (
                <div className="text-center py-12 text-base-content/60 text-xs">
                  ไม่พบรูปภาพที่ตรงกับเงื่อนไขการค้นหา
                </div>
              ) : (
                filteredAssets.map((asset, idx) => {
                  const resolved = resolveAssetUrl(asset.url);
                  const isLarge = asset.sizeBytes > 1024 * 1024; // > 1 MB
                  return (
                    <div
                      key={asset.url + idx}
                      className="p-3 rounded-2xl bg-base-100 border border-base-300/60 hover:border-secondary/40 transition-all flex items-center justify-between gap-3 shadow-2xs"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Thumbnail */}
                        <div className="w-14 h-14 rounded-xl overflow-hidden bg-base-200 border border-base-300 shrink-0 relative group">
                          {asset.type === 'pdf' ? (
                            <div className="w-full h-full flex items-center justify-center bg-secondary/15 text-secondary font-black text-xs">
                              PDF
                            </div>
                          ) : (
                            <img
                              src={resolved}
                              alt={asset.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                          )}
                        </div>

                        {/* Title & Category */}
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-primary truncate">
                            {asset.title}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                            <span className="badge badge-xs badge-ghost text-[10px] text-base-content/70">
                              {asset.category}
                            </span>
                            {asset.isR2 && (
                              <span className="badge badge-xs badge-secondary text-white text-[9px] font-bold">
                                Cloudflare R2
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-base-content/50 truncate block mt-0.5">
                            {asset.url}
                          </span>
                        </div>
                      </div>

                      {/* File Size Badge & Actions */}
                      <div className="flex items-center gap-3 shrink-0">
                        <div className="text-right">
                          <span
                            className={`badge badge-sm font-black text-xs ${
                              isLarge
                                ? 'badge-warning text-warning-content'
                                : 'badge-neutral text-base-100 font-bold'
                            }`}
                          >
                            {formatBytes(asset.sizeBytes)}
                          </span>
                          <span className="text-[10px] text-base-content/50 block mt-0.5">
                            {isLarge ? '⚠️ ควรบีบอัด' : '✓ ขนาดพอดี'}
                          </span>
                        </div>

                        <a
                          href={resolved}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-ghost btn-xs btn-circle text-primary"
                          title="เปิดดูภาพเต็ม"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-base-300/60 text-xs shrink-0">
              <span className="text-base-content/65">
                แสดงผล <strong>{filteredAssets.length}</strong> จากทั้งหมด <strong>{stats.totalCount}</strong> ชิ้น
              </span>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="btn btn-sm btn-primary rounded-xl font-bold px-5"
              >
                ปิดหน้าต่าง
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
