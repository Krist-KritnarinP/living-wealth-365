import { useState, useEffect, useMemo } from 'react';
import {
  History,
  ShieldCheck,
  Search,
  Filter,
  Trash2,
  Lock,
  Calendar,
  User,
  ArrowUpDown,
  FileText,
  ShieldAlert,
  AlertTriangle,
  Sparkles,
  Download,
} from 'lucide-react';
import DashboardLayout from '../../components/common/DashboardLayout';
import { getActivityLogs, clearActivityLogs } from '../../utils/activityLogger';
import { useToast } from '../../context/ToastContext';

export default function AdminActivityLogPage() {
  const { showToast } = useToast();
  const [logs, setLogs] = useState(() => getActivityLogs());
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('ALL');
  const [confirmClearOpen, setConfirmClearOpen] = useState(false);

  // Sync when custom event fires
  useEffect(() => {
    const handleLogUpdate = () => {
      setLogs(getActivityLogs());
    };
    window.addEventListener('lw365_activity_logged', handleLogUpdate);
    return () => window.removeEventListener('lw365_activity_logged', handleLogUpdate);
  }, []);

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const matchSearch =
        log.targetTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.adminName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.adminEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (log.securityPin && log.securityPin.includes(searchTerm));

      const matchAction = actionFilter === 'ALL' || log.actionType === actionFilter;
      return matchSearch && matchAction;
    });
  }, [logs, searchTerm, actionFilter]);

  const handleClear = () => {
    clearActivityLogs();
    setLogs([]);
    setConfirmClearOpen(false);
    showToast('ล้างประวัติการทำงานทั้งหมดเรียบร้อยแล้ว', 'info');
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(logs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `lw365-activity-logs-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('ส่งออกไฟล์ประวัติการทำงาน (JSON) สำเร็จ', 'success');
  };

  const formatDate = (isoString) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleString('th-TH', {
        dateStyle: 'medium',
        timeStyle: 'short',
      });
    } catch {
      return isoString;
    }
  };

  const getActionBadge = (actionType) => {
    switch (actionType) {
      case 'CREATE':
        return <span className="badge badge-success text-white font-bold text-[10px]">สร้างใหม่ (CREATE)</span>;
      case 'UPDATE':
        return <span className="badge badge-primary text-white font-bold text-[10px]">แก้ไข (UPDATE)</span>;
      case 'DELETE':
        return <span className="badge badge-error text-white font-bold text-[10px]">ลบข้อมูล (DELETE)</span>;
      case 'STATUS_CHANGE':
        return <span className="badge badge-warning text-warning-content font-bold text-[10px]">สลับสถานะ (STATUS)</span>;
      default:
        return <span className="badge badge-ghost font-bold text-[10px]">{actionType}</span>;
    }
  };

  const totalUpdates = logs.filter((l) => l.actionType === 'UPDATE').length;
  const totalDeletes = logs.filter((l) => l.actionType === 'DELETE').length;
  const totalCreates = logs.filter((l) => l.actionType === 'CREATE').length;

  return (
    <DashboardLayout type="admin">
      <div className="space-y-6 w-full">
        {/* Header Title & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-base-300/60 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="badge badge-secondary text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1">
                AUDIT TRAIL
              </span>
              <span className="text-xs font-bold text-base-content/60">
                Living Wealth 365 Security Logs
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-primary">
              ประวัติการทำงานในระบบ (Activity Log)
            </h1>
            <p className="text-sm text-base-content/70 mt-1">
              บันทึกและตรวจสอบทุกการกระทำสำคัญของแอดมิน พร้อมรหัสความปลอดภัย 4 หลัก (2-Step Verification)
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={handleExportJSON}
              className="btn btn-outline btn-sm rounded-xl font-bold gap-1.5"
              title="ส่งออกประวัติเป็นไฟล์ JSON"
            >
              <Download className="w-4 h-4" />
              <span>ส่งออก JSON</span>
            </button>
            <button
              type="button"
              onClick={() => setConfirmClearOpen(true)}
              className="btn btn-ghost btn-sm text-error hover:bg-error/10 rounded-xl font-bold gap-1.5"
              title="ล้างประวัติทั้งหมด"
            >
              <Trash2 className="w-4 h-4" />
              <span>ล้างประวัติ</span>
            </button>
          </div>
        </div>

        {/* Quick KPI Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-4 rounded-2xl zen-surface border border-base-300/60 shadow-2xs space-y-1">
            <span className="text-[11px] font-bold text-base-content/60 uppercase block">การกระทำทั้งหมด</span>
            <span className="text-2xl font-black text-primary">{logs.length}</span>
            <span className="text-[10px] text-base-content/50 block">บันทึกใน Audit Trail</span>
          </div>
          <div className="p-4 rounded-2xl zen-surface border border-primary/20 shadow-2xs space-y-1">
            <span className="text-[11px] font-bold text-primary uppercase block">การแก้ไข (Edits)</span>
            <span className="text-2xl font-black text-primary">{totalUpdates}</span>
            <span className="text-[10px] text-primary/70 block">ผ่านการยืนยันรหัส 4 หลัก</span>
          </div>
          <div className="p-4 rounded-2xl zen-surface border border-error/20 shadow-2xs space-y-1">
            <span className="text-[11px] font-bold text-error uppercase block">การลบ (Deletes)</span>
            <span className="text-2xl font-black text-error">{totalDeletes}</span>
            <span className="text-[10px] text-error/70 block">ป้องกันด้วยรหัสสุ่ม 4 หลัก</span>
          </div>
          <div className="p-4 rounded-2xl zen-surface border border-success/20 shadow-2xs space-y-1">
            <span className="text-[11px] font-bold text-success uppercase block">สร้างใหม่ (Creates)</span>
            <span className="text-2xl font-black text-success">{totalCreates}</span>
            <span className="text-[10px] text-success/70 block">บันทึกสำเร็จสมบูรณ์</span>
          </div>
        </div>

        {/* Toolbar: Search & Action Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-base-content/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="ค้นหาชื่อแอดมิน, รายการ, หรือรหัส PIN..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input input-sm input-bordered w-full rounded-xl pl-9 text-xs bg-base-100"
            />
          </div>

          <div className="flex items-center gap-1.5 flex-wrap w-full sm:w-auto">
            {['ALL', 'UPDATE', 'DELETE', 'CREATE', 'STATUS_CHANGE'].map((act) => (
              <button
                key={act}
                type="button"
                onClick={() => setActionFilter(act)}
                className={`btn btn-xs rounded-xl font-bold transition-all ${
                  actionFilter === act
                    ? 'btn-primary shadow-xs'
                    : 'btn-ghost text-base-content/70'
                }`}
              >
                {act === 'ALL' && 'ทั้งหมด'}
                {act === 'UPDATE' && 'แก้ไข'}
                {act === 'DELETE' && 'ลบข้อมูล'}
                {act === 'CREATE' && 'สร้างใหม่'}
                {act === 'STATUS_CHANGE' && 'สลับสถานะ'}
              </button>
            ))}
          </div>
        </div>

        {/* Activity Log Table */}
        <div className="zen-surface rounded-3xl border border-base-300 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full text-xs">
              <thead>
                <tr className="bg-base-200/50 text-base-content/80 text-[11px] uppercase font-black">
                  <th className="py-3.5 pl-6 min-w-[150px]">วัน-เวลา</th>
                  <th className="min-w-[160px]">ผู้ดำเนินการ (Admin)</th>
                  <th className="min-w-[130px]">ประเภท Action</th>
                  <th className="min-w-[220px]">เป้าหมาย / รายการ</th>
                  <th className="min-w-[240px]">รายละเอียด</th>
                  <th className="text-right pr-6 min-w-[100px]">รหัส PIN</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-base-300/40">
                {filteredLogs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-base-content/60 text-xs">
                      ไม่พบประวัติการทำงานที่ตรงกับเงื่อนไขการค้นหา
                    </td>
                  </tr>
                ) : (
                  filteredLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-base-200/30 transition-colors">
                      <td className="py-3.5 pl-6 whitespace-nowrap font-medium text-base-content/75">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-base-content/40 shrink-0" />
                          <span>{formatDate(log.timestamp)}</span>
                        </div>
                      </td>

                      <td className="whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-[10px] shrink-0">
                            {log.adminName.charAt(0)}
                          </div>
                          <div>
                            <span className="font-bold text-primary block leading-tight">
                              {log.adminName}
                            </span>
                            <span className="text-[10px] text-base-content/50 block">
                              {log.adminEmail}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="whitespace-nowrap">
                        {getActionBadge(log.actionType)}
                      </td>

                      <td>
                        <span className="font-bold text-base-content block line-clamp-1">
                          {log.targetTitle}
                        </span>
                        <span className="text-[10px] text-base-content/50 block">
                          หมวด: {log.entityType}
                        </span>
                      </td>

                      <td>
                        <p className="text-base-content/80 leading-relaxed line-clamp-2">
                          {log.details}
                        </p>
                      </td>

                      <td className="text-right pr-6 whitespace-nowrap">
                        <span className="badge badge-sm font-black tracking-wider bg-base-200/80 border border-base-300 text-primary">
                          <Lock className="w-2.5 h-2.5 mr-1 text-secondary" />
                          {log.securityPin}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Clear Confirm Modal */}
        {confirmClearOpen && (
          <div className="modal modal-open z-50">
            <div className="modal-box rounded-3xl zen-surface border border-base-300 p-6 space-y-4 max-w-sm">
              <div className="w-12 h-12 rounded-2xl bg-error/15 text-error flex items-center justify-center mx-auto">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="text-center space-y-1">
                <h3 className="font-black text-lg text-primary">ล้างประวัติการทำงาน?</h3>
                <p className="text-xs text-base-content/70">
                  คุณต้องการล้างประวัติ Audit Trail ทั้งหมดใช่หรือไม่ ข้อมูลจะถูกล้างออกจากระบบทันที
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setConfirmClearOpen(false)}
                  className="btn btn-sm btn-ghost rounded-xl font-bold"
                >
                  ยกเลิก
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  className="btn btn-sm btn-error text-white rounded-xl font-bold"
                >
                  ยืนยันล้างข้อมูล
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
