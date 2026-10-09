import { Sun, Moon } from 'lucide-react';

export default function Navbar({ theme, onToggleTheme }) {
  return (
    <header className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 py-3 sticky top-0 z-50">
      <nav className="navbar zen-surface w-full px-4 sm:px-8 py-3 rounded-2xl shadow-xs flex items-center justify-between border border-base-300/50">
        {/* Logo & Brand Identity */}
        <div className="flex items-center gap-3">
          <img
            src="/logo.jpg"
            alt="Living Wealth 365 Logo"
            className="h-10 sm:h-12 w-auto object-contain rounded-lg"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-primary leading-tight">
              Living Wealth <span className="text-secondary">365</span>
            </span>
            <span className="text-xs sm:text-sm font-semibold tracking-wide zen-muted">
              FINANCIAL & INSURANCE ADVISOR • มั่นคง มั่งคั่ง ยั่งยืน
            </span>
          </div>
        </div>

        {/* Action Items & Theme Toggle */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={onToggleTheme}
            className="btn btn-ghost btn-circle btn-sm sm:btn-md"
            title="สลับโหมดสว่าง / มืด"
            aria-label="Toggle Theme"
          >
            {theme === 'zen-light' ? (
              <Moon className="w-5 h-5 text-neutral" />
            ) : (
              <Sun className="w-5 h-5 text-secondary" />
            )}
          </button>

          <a
            href="#contact"
            className="btn btn-primary btn-sm sm:btn-md px-4 sm:px-6 text-sm sm:text-base font-bold shadow-xs"
          >
            ติดต่อที่ปรึกษา
          </a>
        </div>
      </nav>
    </header>
  );
}
