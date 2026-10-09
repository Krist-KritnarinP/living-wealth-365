export default function StatusBadge({ status }) {
  switch (status) {
    case 'NEW':
      return (
        <span className="badge badge-warning text-xs font-semibold px-2.5 py-1 gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-warning-content animate-pulse"></span>
          รอดำเนินการ
        </span>
      );
    case 'CONTACTED':
      return (
        <span className="badge badge-info text-xs font-semibold px-2.5 py-1 gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-info-content"></span>
          ที่ปรึกษารับเรื่องแล้ว
        </span>
      );
    case 'CLOSED':
      return (
        <span className="badge badge-success text-xs font-semibold px-2.5 py-1 gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-success-content"></span>
          เสร็จสมบูรณ์
        </span>
      );
    case 'CANCELLED':
      return (
        <span className="badge badge-ghost text-xs font-semibold px-2.5 py-1 gap-1 text-base-content/60">
          ยกเลิก
        </span>
      );
    default:
      return <span className="badge badge-neutral text-xs">{status}</span>;
  }
}
