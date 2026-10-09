import { useState } from 'react';
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
    <header className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 py-3 sticky top-0 z-40">
      <nav className="zen-surface w-full px-4 sm:px-6 py-3 rounded-2xl shadow-xs flex items-center justify-between border border-base-300/50">
        {/* Logo & Brand Identity */}
        <Link to={ROUTES.HOME} className="flex items-center gap-3 group">
          <BrandLogo size="lg" className="group-hover:scale-105 transition-transform" />
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl lg:text-2xl font-black tracking-tight text-primary leading-tight">
              Living Wealth <span className="text-secondary">365</span>
            </span>
            <span className="text-[10px] sm:text-xs font-semibold tracking-wide zen-muted">
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
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Wishlist Icon */}
          <Link
            to={currentUser ? ROUTES.ACCOUNT_WISHLIST : ROUTES.MUTELU}
            className="btn btn-ghost btn-circle btn-sm sm:btn-md relative"
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

          {/* Bilingual Switcher (TH / EN) */}
          <button
            onClick={toggleLanguage}
            className="btn btn-ghost btn-sm rounded-xl font-bold gap-1 px-2.5 border border-base-300/40"
            title="สลับภาษา / Switch Language"
          >
            <Globe className="w-4 h-4 text-primary" />
            <span className="text-xs uppercase font-black text-secondary">
              {language === 'th' ? '🇹🇭 TH' : '🇬🇧 EN'}
            </span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
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

          {/* User Account / Login State */}
          {currentUser ? (
            currentUser.role === 'ADMIN' ? (
              <Link
                to={ROUTES.ADMIN_DASHBOARD}
                className="btn btn-secondary btn-sm sm:btn-md text-white font-bold gap-1.5 px-3 sm:px-5 rounded-xl shadow-xs"
              >
                <Shield className="w-4 h-4" />
                <span className="hidden sm:inline">{t('adminCrm')}</span>
                <span className="sm:hidden">CRM</span>
              </Link>
            ) : (
              <Link
                to={ROUTES.ACCOUNT}
                className="btn btn-primary btn-outline btn-sm sm:btn-md font-bold gap-1.5 px-3 sm:px-5 rounded-xl"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">{currentUser.name || t('account')}</span>
                <span className="sm:hidden">{t('account')}</span>
              </Link>
            )
          ) : (
            <Link
              to={ROUTES.LOGIN}
              className="btn btn-primary btn-sm sm:btn-md font-bold gap-1.5 px-3 sm:px-5 rounded-xl shadow-xs"
            >
              <LogIn className="w-4 h-4" />
              <span>{t('login')}</span>
            </Link>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn btn-ghost btn-circle btn-sm sm:btn-md xl:hidden"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden mt-2 p-4 rounded-2xl zen-surface border border-base-300 shadow-xl flex flex-col gap-2 animate-fadeIn">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-2.5 rounded-xl text-base font-semibold transition-all ${
                isActive(link.path)
                  ? 'bg-primary text-white font-bold'
                  : 'text-base-content/80 hover:bg-base-200'
              }`}
            >
              {link.label}
            </Link>
          ))}
          {currentUser && (
            <div className="pt-2 mt-2 border-t border-base-300/60 flex flex-col gap-2">
              {currentUser.role === 'CUSTOMER' && (
                <>
                  <Link
                    to={ROUTES.ACCOUNT}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-2 rounded-xl text-sm font-semibold hover:bg-base-200"
                  >
                    👤 {t('profileOverview')}
                  </Link>
                  <Link
                    to={ROUTES.ACCOUNT_HISTORY}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-2 rounded-xl text-sm font-semibold hover:bg-base-200"
                  >
                    📋 {t('consultationHistory')}
                  </Link>
                  <Link
                    to={ROUTES.ACCOUNT_WISHLIST}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-2 rounded-xl text-sm font-semibold hover:bg-base-200"
                  >
                    ❤️ {t('savedWishlist')}
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
