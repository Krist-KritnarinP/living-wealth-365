import { useState } from 'react';
import {
  PhoneCall,
  Shield,
  MessageSquare,
  Search,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useToast } from '../../context/ToastContext';
import StatusBadge from '../../components/common/StatusBadge';
import DashboardLayout from '../../components/common/DashboardLayout';

export default function AdminDashboardPage() {
  const { leads, updateLeadStatus } = useAuth();
  const { t } = useLanguage();
  const { showToast } = useToast();

  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLeadForNote, setSelectedLeadForNote] = useState(null);
  const [noteText, setNoteText] = useState('');

  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === 'NEW').length;
  const contactedLeads = leads.filter((l) => l.status === 'CONTACTED').length;
  const closedLeads = leads.filter((l) => l.status === 'CLOSED').length;

  const filteredLeads = leads.filter((l) => {
    const matchesStatus = filterStatus === 'ALL' || l.status === filterStatus;
    const matchesSearch =
      l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.phone.includes(searchTerm) ||
      l.interest.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleOpenNoteModal = (lead) => {
    setSelectedLeadForNote(lead);
    setNoteText(lead.notes || '');
  };

  const handleSaveNote = () => {
    if (selectedLeadForNote) {
      updateLeadStatus(selectedLeadForNote.id, undefined, noteText);
      showToast(t('saveSuccess'), 'success');
      setSelectedLeadForNote(null);
    }
  };

  const handleStatusChange = (leadId, newStatus) => {
    updateLeadStatus(leadId, newStatus);
    showToast(t('statusUpdated'), 'info');
  };

  return (
    <DashboardLayout type="admin">
      <div className="space-y-8 max-w-7xl">
        {/* Header */}
        <div className="border-b border-base-300/60 pb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-secondary flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5" />
            {t('adminRole')} • CRM Pipeline
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-primary">
            {t('crmPipeline')}
          </h1>
          <p className="text-sm text-base-content/70">
            ระบบติดตามลูกค้าเป้าหมาย นัดหมาย และบริหารจัดการข้อเสนอ Living Wealth 365
          </p>
        </div>

        {/* Stats Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="zen-surface rounded-3xl p-5 border border-base-300/60 shadow-xs space-y-2">
            <span className="text-xs font-semibold text-base-content/60">Leads ทั้งหมด</span>
            <div className="text-2xl sm:text-3xl font-black text-primary">{totalLeads}</div>
            <span className="text-xs text-base-content/50">สะสมในระบบ</span>
          </div>

          <div className="zen-surface rounded-3xl p-5 border border-warning/30 shadow-xs space-y-2">
            <span className="text-xs font-semibold text-warning">รอดำเนินการ (NEW)</span>
            <div className="text-2xl sm:text-3xl font-black text-warning">{newLeads}</div>
            <span className="text-xs text-warning/80 font-medium">รอที่ปรึกษาติดต่อกลับ</span>
          </div>

          <div className="zen-surface rounded-3xl p-5 border border-info/30 shadow-xs space-y-2">
            <span className="text-xs font-semibold text-info">รับเรื่องแล้ว (CONTACTED)</span>
            <div className="text-2xl sm:text-3xl font-black text-info">{contactedLeads}</div>
            <span className="text-xs text-info/80 font-medium">อยู่ระหว่างพูดคุยเสนอแผน</span>
          </div>

          <div className="zen-surface rounded-3xl p-5 border border-success/30 shadow-xs space-y-2">
            <span className="text-xs font-semibold text-success">ปิดการขายสำเร็จ (CLOSED)</span>
            <div className="text-2xl sm:text-3xl font-black text-success">{closedLeads}</div>
            <span className="text-xs text-success/80 font-medium">ส่งมอบกรมธรรม์เรียบร้อย</span>
          </div>
        </div>

        {/* Leads Pipeline Table Card */}
        <div className="zen-surface rounded-3xl p-6 border border-base-300/60 shadow-xs space-y-6">
          {/* Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input input-bordered input-sm w-full rounded-xl pl-9 bg-base-100 text-xs"
              />
              <Search className="w-4 h-4 text-base-content/50 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-bold text-base-content/60 mr-1">{t('status')}:</span>
              {['ALL', 'NEW', 'CONTACTED', 'CLOSED', 'CANCELLED'].map((st) => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={`btn btn-xs rounded-xl font-bold ${
                    filterStatus === st ? 'btn-primary text-white shadow-xs' : 'btn-ghost'
                  }`}
                >
                  {st === 'ALL' ? t('total') : st}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-base-300 text-base-content/70">
                  <th>ลูกค้า</th>
                  <th>เบอร์โทร</th>
                  <th>บริการที่สนใจ</th>
                  <th>เวลาที่สะดวก</th>
                  <th>{t('status')}</th>
                  <th>บันทึกที่ปรึกษา</th>
                  <th className="text-right">จัดการสถานะ</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-8 text-base-content/60">
                      ไม่พบรายการ Lead ตามเงื่อนไข
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-base-200/50">
                      <td className="font-bold text-primary">
                        {lead.name}
                        <span className="block text-[11px] font-mono text-base-content/50">
                          {lead.id}
                        </span>
                      </td>
                      <td>
                        <a
                          href={`tel:${lead.phone}`}
                          className="btn btn-xs btn-outline btn-primary rounded-xl gap-1"
                          title="กดเพื่อโทรออก"
                        >
                          <PhoneCall className="w-3 h-3" />
                          <span>{lead.phone}</span>
                        </a>
                      </td>
                      <td className="font-semibold text-base-content/80 max-w-xs truncate">
                        {lead.interest}
                      </td>
                      <td className="text-base-content/70">{lead.preferredTime}</td>
                      <td>
                        <StatusBadge status={lead.status} />
                      </td>
                      <td className="max-w-xs">
                        <button
                          onClick={() => handleOpenNoteModal(lead)}
                          className="text-left hover:text-primary transition-colors flex items-center gap-1 group"
                          title="คลิกเพื่อแก้ไขบันทึก"
                        >
                          <MessageSquare className="w-3.5 h-3.5 text-secondary shrink-0" />
                          <span className="truncate">
                            {lead.notes || '(คลิกเพื่อจดบันทึก)'}
                          </span>
                        </button>
                      </td>
                      <td className="text-right">
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                          className="select select-bordered select-xs rounded-xl font-bold bg-base-100"
                        >
                          <option value="NEW">🟡 NEW (รอดำเนินการ)</option>
                          <option value="CONTACTED">🟢 CONTACTED (รับเรื่องแล้ว)</option>
                          <option value="CLOSED">🔵 CLOSED (เสร็จสิ้น)</option>
                          <option value="CANCELLED">⚪ CANCELLED (ยกเลิก)</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Note Edit Modal using daisyUI Modal */}
        {selectedLeadForNote && (
          <div className="modal modal-open z-50">
            <div className="modal-box rounded-3xl zen-surface border border-base-300">
              <h3 className="font-bold text-lg text-primary">
                บันทึกการติดต่อ: {selectedLeadForNote.name}
              </h3>
              <p className="text-xs text-base-content/60 mt-1">
                {selectedLeadForNote.interest} • {selectedLeadForNote.phone}
              </p>

              <textarea
                rows="4"
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="จดบันทึกผลการโทร เช่น นัดหมายปรึกษา, แผนประกันที่เลือก..."
                className="textarea textarea-bordered w-full rounded-2xl mt-4 text-sm bg-base-100"
              ></textarea>

              <div className="modal-action">
                <button
                  onClick={() => setSelectedLeadForNote(null)}
                  className="btn btn-sm btn-ghost rounded-xl"
                >
                  {t('cancel')}
                </button>
                <button
                  onClick={handleSaveNote}
                  className="btn btn-sm btn-primary rounded-xl font-bold"
                >
                  {t('save')}
                </button>
              </div>
            </div>
            <div className="modal-backdrop bg-black/40 backdrop-blur-xs" onClick={() => setSelectedLeadForNote(null)}></div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
