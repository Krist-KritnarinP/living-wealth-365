import { useLanguage } from '../../context/LanguageContext';

export default function StatusBadge({ status, className = '' }) {
  const { t } = useLanguage();

  switch (status) {
    case 'NEW':
      return (
        <span
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-500 border border-amber-500/30 shadow-xs backdrop-blur-xs ${className}`}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          <span>{t('statusNew')}</span>
        </span>
      );
    case 'CONTACTED':
      return (
        <span
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-sky-500/15 text-sky-500 border border-sky-500/30 shadow-xs backdrop-blur-xs ${className}`}
        >
          <span className="h-2 w-2 rounded-full bg-sky-500"></span>
          <span>{t('statusContacted')}</span>
        </span>
      );
    case 'CLOSED':
      return (
        <span
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 shadow-xs backdrop-blur-xs ${className}`}
        >
          <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
          <span>{t('statusClosed')}</span>
        </span>
      );
    case 'CANCELLED':
      return (
        <span
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-slate-500/15 text-slate-400 border border-slate-500/30 backdrop-blur-xs ${className}`}
        >
          <span className="h-2 w-2 rounded-full bg-slate-400"></span>
          <span>{t('statusCancelled')}</span>
        </span>
      );
    default:
      return (
        <span className="badge badge-ghost text-xs font-semibold px-2.5 py-1">
          {status}
        </span>
      );
  }
}
