/**
 * 📊 Storage & Media Asset Tracker for Living Wealth 365
 * Enforces and monitors 5 GB Hard Cap on Cloudflare R2 storage.
 */

export const MAX_STORAGE_BYTES = 5 * 1024 * 1024 * 1024; // 5 GB
export const MAX_STORAGE_MB = 5000;

// Local storage key for keeping track of uploaded file sizes
const STORAGE_SIZES_KEY = 'lw365_media_file_sizes_v1';

/**
 * Get the stored file sizes map: { [url]: { size: number, originalSize: number, date: string } }
 */
export function getStoredMediaSizes() {
  try {
    const raw = localStorage.getItem(STORAGE_SIZES_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.warn('Failed to parse media file sizes', e);
    return {};
  }
}

/**
 * Record a newly uploaded file with its compressed size and original size
 */
export function recordUploadedMedia(url, sizeInBytes, originalSizeInBytes = null) {
  if (!url) return;
  try {
    const current = getStoredMediaSizes();
    current[url] = {
      size: sizeInBytes,
      originalSize: originalSizeInBytes || sizeInBytes,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_SIZES_KEY, JSON.stringify(current));

    // ⚡ Reactive event to notify StorageUsageCard and Admin Dashboard
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('lw365:storage_updated', {
          detail: { url, sizeInBytes },
        })
      );
    }
  } catch (e) {
    console.error('Failed to record media size', e);
  }
}

/**
 * Estimate or retrieve the size of an image URL (fallback to realistic ~220 KB for WebP)
 */
export function getAssetSize(url, storedSizes = null) {
  if (!url) return 0;
  const sizes = storedSizes || getStoredMediaSizes();
  if (sizes[url] && sizes[url].size) {
    return sizes[url].size;
  }
  // If it's an Unsplash or external high-res image: estimate ~350 KB
  if (url.includes('unsplash.com')) return 350 * 1024;
  // If it's local uploaded webp: estimate ~180 KB
  if (url.endsWith('.webp')) return 180 * 1024;
  // Default estimate ~240 KB
  return 240 * 1024;
}

/**
 * Aggregate all images used across the application and compute total storage statistics
 */
export function computeStorageStats({ posts = [], products = [], insurancePlans = [], siteContent = {} }) {
  const storedSizes = getStoredMediaSizes();
  const assets = [];
  const seenUrls = new Set();

  const addAsset = (url, title, category, type = 'image') => {
    if (!url || seenUrls.has(url)) return;
    seenUrls.add(url);
    const sizeBytes = getAssetSize(url, storedSizes);
    const meta = storedSizes[url];
    assets.push({
      id: url,
      url,
      title: title || url.split('/').pop() || 'Untitled Asset',
      category,
      type,
      sizeBytes,
      originalSizeBytes: meta?.originalSize || sizeBytes,
      isR2: url.includes('r2.dev') || url.includes('pub-10dc92b49894448a9fe11f81ccc1e577'),
      updatedAt: meta?.updatedAt || null,
    });
  };

  // 1. Posts & Articles
  posts.forEach((p) => {
    if (p.imageUrl) addAsset(p.imageUrl, p.title, 'บทความ & วารสาร (Posts)');
  });

  // 2. Products (MuTeLu & Minerals)
  products.forEach((p) => {
    if (p.imageUrl) addAsset(p.imageUrl, p.name, 'แร่ธาตุ & คริสตัล (Products)');
  });

  // 3. Insurance Plans
  insurancePlans.forEach((plan) => {
    if (plan.imageUrl) addAsset(plan.imageUrl, plan.name, 'แผนประกัน (Insurance)');
    if (plan.brochureUrl) addAsset(plan.brochureUrl, `${plan.name} (Brochure)`, 'เอกสารโบร์ชัวร์ (PDF)', 'pdf');
  });

  // 4. Site Customizer images
  if (siteContent?.narrative?.adminAImage) {
    addAsset(siteContent.narrative.adminAImage, 'รูป Admin A', 'หน้าแรก / เรื่องราว');
  }
  if (siteContent?.narrative?.adminBImage) {
    addAsset(siteContent.narrative.adminBImage, 'รูป Admin B', 'หน้าแรก / เรื่องราว');
  }

  // Calculate totals
  const totalSizeBytes = assets.reduce((sum, a) => sum + a.sizeBytes, 0);
  const totalSizeMB = totalSizeBytes / (1024 * 1024);
  const totalSizeGB = totalSizeBytes / (1024 * 1024 * 1024);
  const usagePercent = Math.min(100, (totalSizeBytes / MAX_STORAGE_BYTES) * 100);
  const remainingBytes = Math.max(0, MAX_STORAGE_BYTES - totalSizeBytes);
  const remainingMB = remainingBytes / (1024 * 1024);

  // Status badge based on threshold
  let status = 'HEALTHY'; // < 70%
  let statusText = 'อยู่ในเกณฑ์ปลอดภัย (ฟรี 100%)';
  let statusColor = 'badge-success text-white';
  let progressColor = 'progress-success';

  if (usagePercent >= 85) {
    status = 'CRITICAL';
    statusText = 'ใกล้เต็มโควตา 5 GB';
    statusColor = 'badge-error text-white';
    progressColor = 'progress-error';
  } else if (usagePercent >= 70) {
    status = 'WARNING';
    statusText = 'ใช้งานเกิน 70%';
    statusColor = 'badge-warning text-warning-content';
    progressColor = 'progress-warning';
  }

  return {
    assets,
    totalCount: assets.length,
    totalSizeBytes,
    totalSizeMB: parseFloat(totalSizeMB.toFixed(2)),
    totalSizeGB: parseFloat(totalSizeGB.toFixed(3)),
    maxStorageMB: MAX_STORAGE_MB,
    maxStorageGB: 5.0,
    remainingMB: parseFloat(remainingMB.toFixed(2)),
    usagePercent: parseFloat(usagePercent.toFixed(2)),
    status,
    statusText,
    statusColor,
    progressColor,
  };
}

/**
 * Format bytes into human-readable string (KB, MB, GB)
 */
export function formatBytes(bytes) {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}
