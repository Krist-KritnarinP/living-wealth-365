import { Edit3 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSiteCustomizer, getByPath } from '../../context/SiteCustomizerContext';

export default function EditableText({
  fieldKey,
  fallback = '',
  label = 'ข้อความ',
  as: Component = 'span',
  className = '',
  multiline = false,
  type = 'text', // 'text' | 'textarea' | 'image' | 'link'
  children,
  onClick,
  ...props
}) {
  const { currentUser } = useAuth();
  const { content, isVisualEditMode, openEditModal } = useSiteCustomizer();

  const isAdmin = currentUser?.role === 'ADMIN';
  const isEditable = isAdmin && isVisualEditMode;

  // Retrieve current value from context using dot-path
  const value = getByPath(content, fieldKey, children !== undefined ? children : fallback);

  const handleClick = (e) => {
    if (isEditable) {
      e.preventDefault();
      e.stopPropagation();
      openEditModal({
        key: fieldKey,
        label,
        value: typeof value === 'string' ? value : String(value || ''),
        multiline: multiline || type === 'textarea',
        type,
        fallback,
      });
      return;
    }
    if (onClick) {
      onClick(e);
    }
  };

  if (!isEditable) {
    return (
      <Component className={className} {...props}>
        {value}
      </Component>
    );
  }

  return (
    <Component
      onClick={handleClick}
      title={`คลิกเพื่อแก้ไข: ${label}`}
      className={`relative inline-block border-b-2 border-dashed border-amber-500/80 hover:bg-amber-500/15 hover:border-amber-400 rounded px-1 -mx-1 cursor-pointer transition-all duration-200 group/editable ${className}`}
      {...props}
    >
      {value}
      <span className="opacity-0 group-hover/editable:opacity-100 transition-opacity absolute -top-7 left-1/2 -translate-x-1/2 z-50 pointer-events-none whitespace-nowrap bg-amber-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-md shadow-lg flex items-center gap-1">
        <Edit3 className="w-3 h-3" />
        <span>แก้ไข: {label}</span>
      </span>
    </Component>
  );
}
