import { useAuth } from '../../context/AuthContext';

export default function BrandLogo({
  collapsed = false,
  size = 'md',
  className = '',
}) {
  const { theme } = useAuth();
  const isDark = theme === 'zen-dark';

  // Choose appropriate logo asset based on theme and collapsed state
  const logoSrc = collapsed
    ? isDark
      ? '/logo-icon-dark.png'
      : '/logo-icon-light.png'
    : isDark
    ? '/logo-dark.png'
    : '/logo-light.png';

  // Size mappings
  let sizeClasses = 'h-9 w-auto';
  if (size === 'sm') {
    sizeClasses = collapsed ? 'h-8 w-8' : 'h-7 w-auto';
  } else if (size === 'md') {
    sizeClasses = collapsed ? 'h-10 w-10' : 'h-9 sm:h-10 w-auto';
  } else if (size === 'lg') {
    sizeClasses = collapsed ? 'h-12 w-12' : 'h-11 sm:h-12 w-auto';
  }

  return (
    <img
      src={logoSrc}
      alt="Living Wealth 365 Logo"
      className={`${sizeClasses} object-contain transition-all duration-300 ${className}`}
      onError={(e) => {
        // Fallback to light logo if anything fails
        e.target.src = '/logo-light.png';
      }}
    />
  );
}
