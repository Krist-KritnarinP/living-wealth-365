/**
 * 📜 Activity Logger & Audit Trail Utility
 * Tracks and logs all critical admin actions across Living Wealth 365.
 */

const STORAGE_KEY = 'lw365_activity_logs_v1';

// Initial sample logs for realistic audit trail preview
const INITIAL_LOGS = [
  {
    id: 'log-1',
    timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    adminName: 'Admin A (Top)',
    adminEmail: 'admin-a@livingwealth365.com',
    actionType: 'UPDATE',
    entityType: 'INSURANCE_PLAN',
    targetTitle: 'AIA Health Happy เหมาเบิ้ลคุ้ม',
    details: 'ปรับปรุงเงื่อนไขความคุ้มครองสูงสุดเป็น 25 ล้านบาท',
    securityPin: '7392',
  },
  {
    id: 'log-2',
    timestamp: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    adminName: 'Admin B (Joy)',
    adminEmail: 'admin-b@livingwealth365.com',
    actionType: 'STATUS_CHANGE',
    entityType: 'INSURANCE_PLAN',
    targetTitle: 'ประกันอัคคีภัยและภัยพิบัติบ้านอุ่นใจ 365',
    details: 'สลับสถานะแผนประกันเป็น: เปิดใช้งาน (Active)',
    securityPin: 'AUTO',
  },
  {
    id: 'log-3',
    timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    adminName: 'Admin A (Top)',
    adminEmail: 'admin-a@livingwealth365.com',
    actionType: 'CREATE',
    entityType: 'POST',
    targetTitle: 'Digital Detox Weekend: คืนความเงียบสงบให้สมอง',
    details: 'เผยแพร่บทความใหม่ในเสาหลัก INNER_LIFE',
    securityPin: '5814',
  },
  {
    id: 'log-4',
    timestamp: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
    adminName: 'Super Admin',
    adminEmail: 'admin@livingwealth365.com',
    actionType: 'DELETE',
    entityType: 'INSURANCE_PLAN',
    targetTitle: 'ประกันอุบัติเหตุชั่วคราว PA Sample (เก่า)',
    details: 'ลบแผนประกันที่ยกเลิกออกจากระบบถาวร',
    securityPin: '9420',
  },
];

/**
 * Get all activity logs from storage
 */
export function getActivityLogs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Failed to parse activity logs', e);
  }
  return INITIAL_LOGS;
}

/**
 * Log a new admin activity
 */
export function logActivity({
  actionType = 'UPDATE', // 'CREATE' | 'UPDATE' | 'DELETE' | 'STATUS_CHANGE'
  entityType = 'SYSTEM', // 'INSURANCE_PLAN' | 'POST' | 'PRODUCT' | 'SITE_CUSTOMIZER' | 'LEAD'
  targetTitle = '',
  details = '',
  adminName = 'Admin',
  adminEmail = 'admin@livingwealth365.com',
  securityPin = '',
}) {
  try {
    const currentLogs = getActivityLogs();
    const newLog = {
      id: `log-${Date.now()}-${Math.round(Math.random() * 1e4)}`,
      timestamp: new Date().toISOString(),
      adminName: adminName || 'Admin',
      adminEmail: adminEmail || 'admin@livingwealth365.com',
      actionType,
      entityType,
      targetTitle: targetTitle || 'รายการในระบบ',
      details: details || '',
      securityPin: securityPin || 'N/A',
    };

    const updated = [newLog, ...currentLogs].slice(0, 500); // keep max 500 recent logs
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // Dispatch window custom event for reactive dashboard updates
    window.dispatchEvent(new CustomEvent('lw365_activity_logged', { detail: newLog }));

    return newLog;
  } catch (e) {
    console.error('Failed to log activity', e);
    return null;
  }
}

/**
 * Clear all activity logs
 */
export function clearActivityLogs() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('lw365_activity_logged'));
  } catch (e) {
    console.error('Failed to clear logs', e);
  }
}
