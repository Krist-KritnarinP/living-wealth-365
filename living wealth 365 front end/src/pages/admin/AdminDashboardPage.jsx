import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  PhoneCall,
  FileText,
  Package,
  Shield,
  MessageSquare,
  Search,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../constants/routes';
import StatusBadge from '../../components/common/StatusBadge';

export default function AdminDashboardPage() {
  const { leads, updateLeadStatus, posts, products } = useAuth();
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
      setSelectedLeadForNote(null);
    }
  };

  return (
    <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-base-300 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-secondary flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5" />
            ADMIN ADVISOR CRM
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-primary">
            แดชบอร์ดจัดการ Leads & ลูกค้า
          </h1>
          <p className="text-sm text-base-content/70">
            ระบบติดตามลูกค้าเป้าหมาย นัดหมาย และบริหารจัดการเนื้อหา Living Wealth 365
          </p>
        </div>

        {/* Admin Navigation Links */}
        <div className="flex items-center gap-2">
          <Link
            to={ROUTES.ADMIN_DASHBOARD}
            className="btn btn-sm btn-secondary text-white rounded-xl font-bold"
          >
            Leads CRM
          </Link>
          <Link
            to={ROUTES.ADMIN_BLOG}
            className="btn btn-sm btn-ghost rounded-xl font-bold gap-1.5"
          >
            <FileText className="w-4 h-4" />
            <span>จัดการบล็อก ({posts.length})</span>
          </Link>
          <Link
            to={ROUTES.ADMIN_PRODUCTS}
            className="btn btn-sm btn-ghost rounded-xl font-bold gap-1.5"
          >
            <Package className="w-4 h-4" />
            <span>จัดการสินค้าสายมู ({products.length})</span>
          </Link>
        </div>
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
              placeholder="ค้นหาชื่อ, เบอร์โทร, ความสนใจ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input input-bordered input-sm w-full rounded-xl pl-9 bg-base-100 text-xs"
            />
            <Search className="w-4 h-4 text-base-content/50 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-bold text-base-content/60 mr-1">สถานะ:</span>
            {['ALL', 'NEW', 'CONTACTED', 'CLOSED', 'CANCELLED'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`btn btn-xs rounded-xl font-bold ${
                  filterStatus === st ? 'btn-primary' : 'btn-ghost'
                }`}
              >
                {st === 'ALL' ? 'ทั้งหมด' : st}
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
                <th>สถานะ</th>
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
                        onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
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

      {/* Note Edit Modal */}
      {selectedLeadForNote && (
        <div className="modal modal-open">
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
              placeholder="จดบันทึกผลการโทร เช่น นัดหมายปรึกษา, แผนประกันที่เลือก, รายละเอียดเพิ่มเติม..."
              className="textarea textarea-bordered w-full rounded-2xl mt-4 text-sm"
            ></textarea>

            <div className="modal-action">
              <button
                onClick={() => setSelectedLeadForNote(null)}
                className="btn btn-sm btn-ghost rounded-xl"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleSaveNote}
                className="btn btn-sm btn-primary rounded-xl font-bold"
              >
                บันทึกโน้ต
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
