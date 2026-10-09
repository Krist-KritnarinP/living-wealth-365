import { useState } from 'react';
import {
  PhoneCall,
  Shield,
  MessageSquare,
  Search,
  Clock,
  ChevronDown,
  Edit3,
  TrendingUp,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  FileText,
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
        {/* Header Title & Overview */}
        <div className="border-b border-base-300/60 pb-5">
          <div className="flex items-center gap-2 mb-1">
            <span className="badge badge-secondary text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1">
              ADVISOR CRM
            </span>
            <span className="text-xs font-bold text-base-content/60">
              Living Wealth 365 Executive Suite
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-primary">
            {t('crmPipeline')}
          </h1>
          <p className="text-sm text-base-content/70 mt-1">
            ศูนย์จัดการติดตามลูกค้าเป้าหมาย นัดหมายส่งมอบแผนประกัน และบันทึกผลการปรึกษา
          </p>
        </div>

        {/* Modern KPI Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Card 1: Total Leads */}
          <div className="zen-surface rounded-3xl p-6 border border-base-300/60 shadow-xs flex items-center justify-between hover:border-primary/40 transition-all group">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-base-content/60">
                {t('total')} Leads
              </span>
              <div className="text-3xl font-black text-primary tracking-tight">
                {totalLeads}
              </div>
              <span className="text-xs font-semibold text-base-content/60 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-secondary" />
                <span>สะสมในระบบ</span>
              </span>
            </div>
            <div className="w-13 h-13 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
              <FileText className="w-6 h-6" />
            </div>
          </div>

          {/* Card 2: New Leads */}
          <div className="zen-surface rounded-3xl p-6 border border-amber-500/30 shadow-xs flex items-center justify-between hover:border-amber-500/60 transition-all group">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
                {t('statusNew')} (NEW)
              </span>
              <div className="text-3xl font-black text-amber-500 tracking-tight">
                {newLeads}
              </div>
              <span className="text-xs font-semibold text-amber-500/80 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>รอติดต่อกลับ</span>
              </span>
            </div>
            <div className="w-13 h-13 rounded-2xl bg-amber-500/15 text-amber-500 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          {/* Card 3: Contacted */}
          <div className="zen-surface rounded-3xl p-6 border border-sky-500/30 shadow-xs flex items-center justify-between hover:border-sky-500/60 transition-all group">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-500">
                {t('statusContacted')}
              </span>
              <div className="text-3xl font-black text-sky-500 tracking-tight">
                {contactedLeads}
              </div>
              <span className="text-xs font-semibold text-sky-500/80 flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5" />
                <span>กำลังคุยแผน</span>
              </span>
            </div>
            <div className="w-13 h-13 rounded-2xl bg-sky-500/15 text-sky-500 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
              <PhoneCall className="w-6 h-6" />
            </div>
          </div>

          {/* Card 4: Closed */}
          <div className="zen-surface rounded-3xl p-6 border border-emerald-500/30 shadow-xs flex items-center justify-between hover:border-emerald-500/60 transition-all group">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-500">
                {t('statusClosed')}
              </span>
              <div className="text-3xl font-black text-emerald-500 tracking-tight">
                {closedLeads}
              </div>
              <span className="text-xs font-semibold text-emerald-500/80 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>สำเร็จเรียบร้อย</span>
              </span>
            </div>
            <div className="w-13 h-13 rounded-2xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
              <Shield className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* CRM Pipeline Table Card */}
        <div className="zen-surface rounded-3xl p-6 sm:p-8 border border-base-300/60 shadow-xs space-y-6">
          {/* Controls: Search & Segmented Filter Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-base-300/50 pb-5">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="ค้นหาชื่อลูกค้า, เบอร์โทร, แผนที่สนใจ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input input-bordered w-full rounded-2xl pl-11 bg-base-100 text-sm shadow-xs focus:input-primary"
              />
              <Search className="w-4 h-4 text-base-content/50 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>

            {/* Status Filter Glass Pills */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-base-200/50 border border-base-300/60">
              {[
                { id: 'ALL', label: t('total'), count: totalLeads },
                { id: 'NEW', label: t('statusNew'), count: newLeads },
                { id: 'CONTACTED', label: t('statusContacted'), count: contactedLeads },
                { id: 'CLOSED', label: t('statusClosed'), count: closedLeads },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilterStatus(tab.id)}
                  className={`btn btn-xs sm:btn-sm rounded-xl font-bold transition-all gap-1.5 ${
                    filterStatus === tab.id
                      ? 'bg-primary text-white shadow-xs'
                      : 'btn-ghost text-base-content/70 hover:bg-base-200'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`badge badge-xs text-[10px] font-bold ${
                      filterStatus === tab.id
                        ? 'bg-white/20 text-white'
                        : 'bg-base-300 text-base-content/70'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Spacious Modern Table */}
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr className="border-b border-base-300 text-base-content/70 text-xs uppercase tracking-wider font-bold">
                  <th className="py-4 pl-4">ข้อมูลลูกค้า</th>
                  <th className="py-4">บริการที่สนใจ & เวลาสะดวก</th>
                  <th className="py-4">สถานะการดูแล (คลิกเพื่อเปลี่ยน)</th>
                  <th className="py-4">บันทึกของที่ปรึกษา</th>
                  <th className="py-4 pr-4 text-right">ดำเนินการด่วน</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-base-300/40">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-12 text-base-content/60">
                      ไม่พบรายการ Lead ตามเงื่อนไขการค้นหา
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="hover:bg-base-200/40 transition-colors group"
                    >
                      {/* Customer Info (Avatar + Name + Phone) */}
                      <td className="py-4 pl-4">
                        <div className="flex items-center gap-3">
                          <div className="avatar placeholder shrink-0">
                            <div className="bg-primary/10 text-primary font-black rounded-2xl w-11 h-11 flex items-center justify-center text-sm border border-primary/20 shadow-xs">
                              {lead.name.charAt(0)}
                            </div>
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-extrabold text-primary text-sm truncate">
                              {lead.name}
                            </span>
                            <span className="text-[11px] font-mono text-base-content/50">
                              #{lead.id}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Interest & Preferred Time */}
                      <td className="py-4">
                        <div className="space-y-1 max-w-xs">
                          <span className="font-bold text-base-content text-sm block leading-snug">
                            {lead.interest}
                          </span>
                          <span className="text-xs text-base-content/65 flex items-center gap-1 font-medium">
                            <Clock className="w-3.5 h-3.5 text-secondary shrink-0" />
                            <span>{lead.preferredTime}</span>
                          </span>
                        </div>
                      </td>

                      {/* Interactive Status Changer (Glass Pill Dropdown) */}
                      <td className="py-4">
                        <div className="dropdown dropdown-bottom dropdown-end">
                          <label
                            tabIndex={0}
                            className="cursor-pointer group/pill inline-flex items-center gap-1 hover:scale-105 transition-transform"
                            title="คลิกเพื่อเปลี่ยนสถานะ"
                          >
                            <StatusBadge status={lead.status} />
                            <ChevronDown className="w-3.5 h-3.5 text-base-content/50 group-hover/pill:text-primary transition-colors ml-0.5" />
                          </label>

                          <ul
                            tabIndex={0}
                            className="dropdown-content z-50 menu p-2 shadow-2xl bg-base-100 rounded-2xl border border-base-300 w-52 space-y-1 text-xs"
                          >
                            <li className="menu-title text-[10px] font-black uppercase text-base-content/50 px-2 py-1">
                              เปลี่ยนสถานะ Lead
                            </li>
                            <li>
                              <button
                                onClick={() => handleStatusChange(lead.id, 'NEW')}
                                className="flex items-center gap-2 font-bold py-2 hover:bg-amber-500/10 hover:text-amber-500 rounded-xl"
                              >
                                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                                <span>🟡 {t('statusNew')}</span>
                              </button>
                            </li>
                            <li>
                              <button
                                onClick={() => handleStatusChange(lead.id, 'CONTACTED')}
                                className="flex items-center gap-2 font-bold py-2 hover:bg-sky-500/10 hover:text-sky-500 rounded-xl"
                              >
                                <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                                <span>🟢 {t('statusContacted')}</span>
                              </button>
                            </li>
                            <li>
                              <button
                                onClick={() => handleStatusChange(lead.id, 'CLOSED')}
                                className="flex items-center gap-2 font-bold py-2 hover:bg-emerald-500/10 hover:text-emerald-500 rounded-xl"
                              >
                                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                <span>🔵 {t('statusClosed')}</span>
                              </button>
                            </li>
                            <li>
                              <button
                                onClick={() => handleStatusChange(lead.id, 'CANCELLED')}
                                className="flex items-center gap-2 font-bold py-2 hover:bg-slate-500/10 hover:text-slate-500 rounded-xl"
                              >
                                <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                                <span>⚪ {t('statusCancelled')}</span>
                              </button>
                            </li>
                          </ul>
                        </div>
                      </td>

                      {/* Advisor Note Box */}
                      <td className="py-4 max-w-xs">
                        <button
                          onClick={() => handleOpenNoteModal(lead)}
                          className="w-full text-left p-2.5 rounded-2xl bg-base-200/50 hover:bg-base-200/80 border border-base-300/60 transition-all flex items-center justify-between gap-2 group/btn shadow-xs"
                          title="คลิกเพื่อเขียนโน้ต"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <MessageSquare className="w-3.5 h-3.5 text-secondary shrink-0" />
                            <span className="text-xs text-base-content/80 group-hover/btn:text-primary truncate font-medium">
                              {lead.notes || '(คลิกเพื่อจดบันทึก)'}
                            </span>
                          </div>
                          <Edit3 className="w-3 h-3 text-base-content/40 group-hover/btn:text-primary shrink-0 transition-colors" />
                        </button>
                      </td>

                      {/* Quick Call Action Button */}
                      <td className="py-4 pr-4 text-right">
                        <a
                          href={`tel:${lead.phone}`}
                          className="btn btn-sm btn-outline btn-primary rounded-xl font-bold gap-1.5 shadow-xs"
                          title="กดเพื่อโทรออกหาลูกค้าทันที"
                        >
                          <PhoneCall className="w-3.5 h-3.5" />
                          <span>{lead.phone}</span>
                        </a>
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
            <div className="modal-box rounded-3xl zen-surface border border-base-300 shadow-2xl max-w-lg p-6 space-y-4">
              <div className="flex items-start justify-between border-b border-base-300/50 pb-3">
                <div>
                  <h3 className="font-black text-lg text-primary">
                    บันทึกการติดต่อ: {selectedLeadForNote.name}
                  </h3>
                  <p className="text-xs text-base-content/60 mt-0.5">
                    {selectedLeadForNote.interest} • เบอร์โทร: {selectedLeadForNote.phone}
                  </p>
                </div>
              </div>

              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text text-xs font-bold text-base-content/70">
                    ข้อความบันทึกของที่ปรึกษา:
                  </span>
                </label>
                <textarea
                  rows="4"
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="เช่น โทรนัดหมายแล้ว ลูกค้าสะดวกคุยรายละเอียดประกันสุขภาพเสาร์นี้ 10:00 น. หรือ สนใจปรับวงเงินเป็น 5 ล้าน..."
                  className="textarea textarea-bordered w-full rounded-2xl text-sm bg-base-100 shadow-xs focus:textarea-primary"
                ></textarea>
              </div>

              <div className="modal-action pt-2">
                <button
                  onClick={() => setSelectedLeadForNote(null)}
                  className="btn btn-sm btn-ghost rounded-xl font-semibold"
                >
                  {t('cancel')}
                </button>
                <button
                  onClick={handleSaveNote}
                  className="btn btn-sm btn-primary rounded-xl font-bold px-5 shadow-xs"
                >
                  {t('save')}
                </button>
              </div>
            </div>
            <div
              className="modal-backdrop bg-black/40 backdrop-blur-xs"
              onClick={() => setSelectedLeadForNote(null)}
            ></div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
