import { useState } from 'react';
import { Sparkles, X, ArrowRight } from 'lucide-react';
import { useSiteCustomizer } from '../../context/SiteCustomizerContext';
import EditableText from './EditableText';

export default function AnnouncementBar() {
  const { content } = useSiteCustomizer();
  const [dismissed, setDismissed] = useState(false);

  const announcement = content?.announcement;

  if (!announcement?.enabled || dismissed) {
    return null;
  }

  return (
    <div className="w-full bg-linear-to-r from-amber-600 via-secondary to-amber-700 text-white text-xs sm:text-sm font-medium py-2 px-4 shadow-xs relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Empty left spacer for perfect centering on desktop */}
        <div className="hidden sm:block w-6 shrink-0" />

        {/* Center Content */}
        <div className="flex-1 flex flex-wrap items-center justify-center gap-2 text-center">
          {announcement.badge && (
            <EditableText
              fieldKey="announcement.badge"
              label="ป้ายกำกับแถบประกาศ"
              as="span"
              className="px-2 py-0.5 rounded-full bg-white/20 text-white text-[11px] font-black tracking-wide shrink-0 shadow-xs"
            >
              {announcement.badge}
            </EditableText>
          )}

          <EditableText
            fieldKey="announcement.text"
            label="ข้อความแถบประกาศ"
            as="span"
            className="font-medium"
          >
            {announcement.text}
          </EditableText>

          {announcement.link && (
            <a
              href={announcement.link}
              className="inline-flex items-center gap-1 font-bold underline hover:text-amber-100 transition-colors shrink-0 ml-1"
            >
              <EditableText
                fieldKey="announcement.linkText"
                label="ข้อความปุ่มแถบประกาศ"
                as="span"
              >
                {announcement.linkText || 'ดูเพิ่มเติม →'}
              </EditableText>
            </a>
          )}
        </div>

        {/* Close button */}
        <button
          onClick={() => setDismissed(true)}
          className="btn btn-ghost btn-circle btn-xs text-white/80 hover:text-white hover:bg-white/10 shrink-0"
          aria-label="ปิดแถบประกาศ"
          title="ปิดแถบประกาศสำหรับเซสชันนี้"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
