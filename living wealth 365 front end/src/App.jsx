import { useState, useEffect } from 'react';
import { Sun, Moon, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState('zen-light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'zen-light' ? 'zen-dark' : 'zen-light'));
  };

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-200">
      {/* Zen Glass Navbar */}
      <header className="sticky top-0 z-50 px-4 sm:px-6 py-4">
        <div className="navbar zen-surface max-w-6xl mx-auto px-6 rounded-box">
          <div className="navbar-start flex items-center gap-3">
            <span className="text-lg font-bold tracking-tight text-primary">
              Living Wealth <span className="text-secondary">365</span>
            </span>
          </div>
          <div className="navbar-end flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="btn btn-ghost btn-circle btn-sm"
              title="Toggle theme"
              aria-label="Toggle theme"
            >
              {theme === 'zen-light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-secondary" />}
            </button>
            <span className="badge badge-secondary font-semibold">Ready</span>
          </div>
        </div>
      </header>

      {/* Main Starter Container */}
      <main className="flex-1 flex items-center justify-center py-16 md:py-24">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="card zen-surface max-w-xl mx-auto p-8 text-center space-y-4">
            <div className="flex justify-center">
              <CheckCircle2 className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-primary">
              Living Wealth 365 — Project Ready
            </h1>
            <p className="zen-muted text-sm leading-relaxed">
              ติดตั้งโครงสร้างโปรเจกต์ React.js (JavaScript), Tailwind CSS 4, และ daisyUI 5 (Zen Glass Theme) เรียบร้อยแล้ว พร้อมสำหรับการพัฒนาต่อไปตามที่คุณกำหนด
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button className="btn btn-primary btn-sm">Primary Action</button>
              <button className="btn btn-outline border-base-300 btn-sm">Outline Action</button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-base-200 text-center zen-muted text-xs">
        © {new Date().getFullYear()} Living Wealth 365
      </footer>
    </div>
  );
}
