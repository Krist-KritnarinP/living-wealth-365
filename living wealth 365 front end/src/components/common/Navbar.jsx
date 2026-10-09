import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Heart, Menu, X, User, Shield, LogIn, Globe } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { ROUTES } from '../../constants/routes';
import BrandLogo from './BrandLogo';

export default function Navbar() {
  const { theme, toggleTheme, currentUser, wishlist } = useAuth();
  const { language, toggleLanguage, t } = useLanguage();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ปิด mobile menu เมื่อกดปุ่ม Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    if (mobileMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // ปิด mobile menu เมื่อเปลี่ยนหน้า
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: t('home'), path: ROUTES.HOME },
    { label: t('insuranceLife'), path: ROUTES.INSURANCE_LIFE },
    { label: t('insuranceNonLife'), path: ROUTES.INSURANCE_NON_LIFE },
    { label: t('mutelu'), path: ROUTES.MUTELU },
    { label: t('blog'), path: ROUTES.BLOG },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="w-full px-3 sm:px-6 lg:px-12 xl:px-16 py-2.5 sm:py-3 sticky top-0 z-40">
      <nav
        aria-label="เมนูหลัก"
        className="zen-surface w-full px-3 sm:px-6 py-2.5 sm:py-3 rounded-2xl shadow-xs flex items-center justify-between border border-base-300/60"
      >
        {/* Logo & Brand Identity */}
        <Link
          to={ROUTES.HOME}
          className="flex items-center gap-2 sm:gap-3 group min-w-0 shrink"
          aria-label="Living Wealth 365 หน้าแรก"
        >
          <BrandLogo size="md" className="group-hover:scale-105 transition-transform shrink-0" />
          <div className="flex flex-col min-w-0 notranslate" translate="no">
            <span className="text-base sm:text-xl lg:text-2xl font-black tracking-tight text-primary leading-tight truncate notranslate" translate="no">
              Living Wealth <span className="text-secondary notranslate" translate="no">365</span>
            </span>
            <span className="hidden sm:block text-[10px] sm:text-xs font-semibold tracking-wide zen-muted truncate notranslate" translate="no">
              FINANCIAL & WEALTH ADVISORY
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden xl:flex items-center gap-1 2xl:gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                isActive(link.path)
                  ? 'bg-primary/10 text-primary font-bold shadow-xs'
                  : 'text-base-content/80 hover:bg-base-200/60 hover:text-primary'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Action Items */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Wishlist Icon (แสดงบน sm ขึ้นไป หรือในเมนูมือถือ) */}
          <Link
            to={currentUser ? ROUTES.ACCOUNT_WISHLIST : ROUTES.MUTELU}
            className="btn btn-ghost btn-circle btn-sm sm:btn-md relative hidden sm:inline-flex"
            title={t('savedWishlist')}
          >
            <Heart
              className={`w-5 h-5 ${
                wishlist.length > 0 ? 'text-error fill-error' : 'text-neutral'
              }`}
            />
            {wishlist.length > 0 && (
              <span className="badge badge-xs badge-error absolute -top-1 -right-1 font-bold text-[10px] w-5 h-5 flex items-center justify-center p-0 text-white">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Bilingual Switcher (TH / EN) (แสดงบน sm ขึ้นไป หรือในเมนูมือถือ) */}
          <button
            onClick={toggleLanguage}
            className="btn btn-ghost btn-sm rounded-xl font-bold gap-1 px-2.5 border border-base-300/40 hidden sm:inline-flex"
            title="สลับภาษา / Switch Language"
          >
            <Globe className="w-4 h-4 text-primary" />
            <span className="text-xs uppercase font-black text-secondary">
              {language === 'th' ? '🇹🇭 TH' : '🇬🇧 EN'}
            </span>
          </button>

          {/* Theme Toggle (แสดงบน sm ขึ้นไป หรือในเมนูมือถือ) */}
          <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle btn-sm sm:btn-md hidden sm:inline-flex"
            title="สลับโหมดสว่าง / มืด"
            aria-label="Toggle Theme"
          >
            {theme === 'zen-light' ? (
              <Moon className="w-5 h-5 text-neutral" />
            ) : (
              <Sun className="w-5 h-5 text-secondary" />
            )}
          </button>

          {/* User Account / Login Button */}
          {currentUser ? (
            currentUser.role === 'ADMIN' ? (
              <Link
                to={ROUTES.ADMIN_DASHBOARD}
                className="btn btn-secondary btn-sm text-white font-bold gap-1 px-3 sm:px-4 rounded-xl shadow-xs"
              >
                <Shield className="w-4 h-4" />
                <span className="hidden md:inline">{t('adminCrm')}</span>
                <span className="md:hidden">CRM</span>
              </Link>
            ) : (
              <Link
                to={ROUTES.ACCOUNT}
                className="btn btn-primary btn-outline btn-sm font-bold gap-1 px-3 sm:px-4 rounded-xl"
              >
                <User className="w-4 h-4" />
                <span className="hidden md:inline">{currentUser.name || t('account')}</span>
                <span className="md:hidden">{t('account')}</span>
              </Link>
            )
          ) : (
            <Link
              to={ROUTES.LOGIN}
              className="btn btn-primary btn-sm font-bold gap-1 px-3 sm:px-4 rounded-xl shadow-xs"
            >
              <LogIn className="w-4 h-4" />
              <span>{t('login')}</span>
            </Link>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn btn-ghost btn-circle btn-sm xl:hidden"
            aria-label="เปิดเมนูการนำทาง"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Dropdown (ปราศจากอาการล้นขอบจอ < 390px) */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="เมนูบนมือถือ"
          className="xl:hidden mt-2 p-4 sm:p-5 rounded-2xl zen-surface border border-base-300 shadow-2xl flex flex-col gap-3 animate-fadeIn"
        >
          {/* Quick Toolbar on Mobile (Language, Theme, Wishlist) */}
          <div className="flex sm:hidden items-center justify-between pb-3 border-b border-base-300/60">
            <button
              onClick={toggleLanguage}
              className="btn btn-ghost btn-sm rounded-xl font-bold gap-1 px-3 border border-base-300/40"
            >
              <Globe className="w-4 h-4 text-primary" />
              <span className="text-xs uppercase font-black text-secondary">
                {language === 'th' ? '🇹🇭 ภาษาไทย' : '🇬🇧 English'}
              </span>
            </button>

            <div className="flex items-center gap-2">
              <Link
                to={currentUser ? ROUTES.ACCOUNT_WISHLIST : ROUTES.MUTELU}
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-ghost btn-circle btn-sm relative"
                title={t('savedWishlist')}
              >
                <Heart
                  className={`w-5 h-5 ${
                    wishlist.length > 0 ? 'text-error fill-error' : 'text-neutral'
                  }`}
                />
                {wishlist.length > 0 && (
                  <span className="badge badge-xs badge-error absolute -top-1 -right-1 font-bold text-[10px] w-4 h-4 flex items-center justify-center p-0 text-white">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              <button
                onClick={toggleTheme}
                className="btn btn-ghost btn-circle btn-sm"
                aria-label="Toggle Theme"
              >
                {theme === 'zen-light' ? (
                  <Moon className="w-5 h-5 text-neutral" />
                ) : (
                  <Sun className="w-5 h-5 text-secondary" />
                )}
              </button>
            </div>
          </div>

          {/* Nav Links */}
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2.5 rounded-xl text-base font-semibold transition-all ${
                  isActive(link.path)
                    ? 'bg-primary text-white font-bold shadow-xs'
                    : 'text-base-content/80 hover:bg-base-200'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Customer / Account Quick Links */}
          {currentUser && (
            <div className="pt-2 mt-1 border-t border-base-300/60 flex flex-col gap-1">
              {currentUser.role === 'CUSTOMER' && (
                <>
                  <Link
                    to={ROUTES.ACCOUNT}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-2 rounded-xl text-sm font-semibold hover:bg-base-200 flex items-center gap-2"
                  >
                    <User className="w-4 h-4 text-primary" />
                    <span>{t('profileOverview')}</span>
                  </Link>
                  <Link
                    to={ROUTES.ACCOUNT_HISTORY}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-2 rounded-xl text-sm font-semibold hover:bg-base-200 flex items-center gap-2"
                  >
                    <span>📋</span>
                    <span>{t('consultationHistory')}</span>
                  </Link>
                  <Link
                    to={ROUTES.ACCOUNT_WISHLIST}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-2 rounded-xl text-sm font-semibold hover:bg-base-200 flex items-center gap-2"
                  >
                    <Heart className="w-4 h-4 text-error" />
                    <span>{t('savedWishlist')} ({wishlist.length})</span>
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </header>
  );
}
