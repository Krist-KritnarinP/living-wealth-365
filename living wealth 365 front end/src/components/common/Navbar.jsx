import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sun,
  Moon,
  Heart,
  Menu,
  X,
  User,
  Shield,
  LogIn,
  Globe,
  ChevronDown,
  Compass,
  Sparkles,
  BookOpen,
  MessageCircle,
  Activity,
  Gem,
  Coins,
  Brain,
  Feather,
  Info
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { ROUTES } from '../../constants/routes';
import BrandLogo from './BrandLogo';

export default function Navbar() {
  const { theme, toggleTheme, currentUser, wishlist } = useAuth();
  const { language, toggleLanguage, t } = useLanguage();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setOpenDropdown(null);
      }
    };
    if (mobileMenuOpen || openDropdown) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen, openDropdown]);

  // Close on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  // 3 Core Gateways with 7 Content Pillars
  const gateways = [
    {
      id: 'living',
      title: language === 'th' ? 'Living (วิถีชีวิต)' : 'Living',
      icon: Sparkles,
      items: [
        {
          label: language === 'th' ? 'Life (สมดุลชีวิต 6 มิติ)' : 'Life (6 Dimensions)',
          desc: language === 'th' ? 'เป้าหมายชีวิต การออกแบบเวลา และความสุข' : 'Purpose, Time Design & Life Map',
          path: ROUTES.LIFE,
          icon: Compass,
          badge: 'Life Map',
        },
        {
          label: language === 'th' ? 'Wellbeing (อายุวัฒนะ & สุขภาพ)' : 'Wellbeing (Longevity)',
          desc: language === 'th' ? 'ศาสตร์ชะลอวัย สุขภาพระดับเซลล์ และ Health Sanctuary' : 'Cellular health, sleep & holistic recovery',
          path: ROUTES.WELLBEING,
          icon: Activity,
        },
        {
          label: language === 'th' ? 'Earth & Energy (แร่ธาตุธรรมชาติ)' : 'Earth & Energy (Minerals)',
          desc: language === 'th' ? 'วิทยาศาสตร์ผลึก หินคัดสรร และพลังงานจักระ' : 'Mineralogy, curated crystals & 3D visualizer',
          path: ROUTES.EARTH_ENERGY,
          icon: Gem,
          badge: '3D Orb',
        },
      ],
    },
    {
      id: 'learning',
      title: language === 'th' ? 'Learning (การเรียนรู้)' : 'Learning',
      icon: BookOpen,
      items: [
        {
          label: language === 'th' ? 'Wealth (สถาปัตยกรรมการเงิน)' : 'Wealth Architecture',
          desc: language === 'th' ? 'การปกป้อง พอร์ตเกษียณ และโปรแกรมคำนวณภาษี' : 'Protection, annuity & tax calculator',
          path: ROUTES.WEALTH,
          icon: Coins,
          badge: 'Tax Calc',
        },
        {
          label: language === 'th' ? 'Inner Life (โลกภายใน & สมาธิ)' : 'Inner Life & Stillness',
          desc: language === 'th' ? 'ความเงียบสงบ การสังเกตใจ และจิตตื่นรู้' : 'The art of stillness & emotional clarity',
          path: ROUTES.INNER_LIFE,
          icon: Brain,
        },
        {
          label: language === 'th' ? "Journal & Admin A's Notes" : "Journal & Admin A's Notes",
          desc: language === 'th' ? 'บันทึกความคิด การค้นพบ และเรื่องราวการเดินทาง' : 'Thoughts, book explorations & travel notes',
          path: ROUTES.JOURNAL,
          icon: Feather,
        },
      ],
    },
    {
      id: 'connecting',
      title: language === 'th' ? 'Connecting (เพื่อนร่วมทาง)' : 'Connecting',
      icon: MessageCircle,
      items: [
        {
          label: language === 'th' ? 'About Admin A & B' : 'About Admin A & B',
          desc: language === 'th' ? 'ปรัชญา A Life Well Planned. A Life Well Lived.' : 'Our philosophy & curated journey',
          path: ROUTES.ABOUT,
          icon: Info,
        },
        {
          label: language === 'th' ? 'สนทนากับเรา (Let\'s Talk)' : "Let's Talk Session",
          desc: language === 'th' ? 'นัดหมายพูดคุยเรื่องชีวิตและการเงินอย่างเป็นกันเอง' : 'Warm, pressure-free life & wealth consultation',
          path: '/about#talk',
          icon: MessageCircle,
          badge: 'Free',
        },
      ],
    },
  ];

  return (
    <header className="w-full px-3 sm:px-6 lg:px-12 xl:px-16 py-2.5 sm:py-3 sticky top-0 z-40" ref={navRef}>
      <nav
        aria-label="เมนูหลัก"
        className="zen-surface w-full px-3 sm:px-6 py-2.5 sm:py-3 rounded-2xl shadow-xs flex items-center justify-between border border-base-300/60 transition-all duration-300"
      >
        {/* Brand Logo & Identity */}
        <Link
          to={ROUTES.HOME}
          className="flex items-center gap-2.5 sm:gap-3 group min-w-0 shrink"
          aria-label="Living Wealth 365 หน้าแรก"
        >
          <BrandLogo size="md" className="group-hover:scale-105 transition-transform shrink-0" />
          <div className="flex flex-col min-w-0 notranslate" translate="no">
            <span className="text-base sm:text-xl lg:text-2xl font-black tracking-tight text-primary leading-tight truncate notranslate" translate="no">
              Living Wealth <span className="text-secondary notranslate" translate="no">365</span>
            </span>
            <span className="hidden sm:block text-[10px] sm:text-xs font-semibold tracking-wide zen-muted truncate notranslate" translate="no">
              A LIFE WELL PLANNED. A LIFE WELL LIVED.
            </span>
          </div>
        </Link>

        {/* Desktop Gateway Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
          <Link
            to={ROUTES.HOME}
            className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
              isActive(ROUTES.HOME) && location.pathname === '/'
                ? 'bg-primary/10 text-primary font-bold shadow-xs'
                : 'text-base-content/80 hover:bg-base-200/60 hover:text-primary'
            }`}
          >
            {t('home')}
          </Link>

          {gateways.map((gw) => {
            const hasActiveChild = gw.items.some((item) => isActive(item.path));
            const isOpen = openDropdown === gw.id;

            return (
              <div key={gw.id} className="relative">
                <button
                  type="button"
                  onClick={() => setOpenDropdown(isOpen ? null : gw.id)}
                  className={`px-3 py-2 rounded-xl text-sm font-semibold flex items-center gap-1.5 transition-all ${
                    hasActiveChild || isOpen
                      ? 'bg-primary/10 text-primary font-bold shadow-xs'
                      : 'text-base-content/80 hover:bg-base-200/60 hover:text-primary'
                  }`}
                  aria-expanded={isOpen}
                >
                  <gw.icon className="w-4 h-4 opacity-75" />
                  <span>{gw.title}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                  <div className="absolute top-full left-0 mt-2 w-80 p-2 rounded-2xl zen-surface border border-base-300 shadow-xl flex flex-col gap-1 z-50 animate-fadeIn">
                    {gw.items.map((item) => {
                      const ItemIcon = item.icon;
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setOpenDropdown(null)}
                          className={`p-2.5 rounded-xl transition-all flex items-start gap-3 group ${
                            isActive(item.path)
                              ? 'bg-primary/10 text-primary font-medium'
                              : 'hover:bg-base-200/60 text-base-content'
                          }`}
                        >
                          <div className="p-2 rounded-lg bg-base-200/80 group-hover:bg-primary group-hover:text-white transition-colors shrink-0 mt-0.5">
                            <ItemIcon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-sm font-bold truncate group-hover:text-primary transition-colors">
                                {item.label}
                              </span>
                              {item.badge && (
                                <span className="badge badge-xs badge-secondary text-[9px] font-bold px-1.5 py-0.5">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-xs zen-muted line-clamp-1 mt-0.5 font-normal">
                              {item.desc}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Action Items */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Wishlist Icon */}
          <Link
            to={currentUser ? ROUTES.ACCOUNT_WISHLIST : ROUTES.EARTH_ENERGY}
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

          {/* Bilingual Switcher (TH / EN) */}
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

          {/* Theme Toggle */}
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
            className="btn btn-ghost btn-circle btn-sm lg:hidden"
            aria-label="เปิดเมนูการนำทาง"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="เมนูบนมือถือ"
          className="lg:hidden mt-2 p-4 sm:p-5 rounded-2xl zen-surface border border-base-300 shadow-2xl flex flex-col gap-4 animate-fadeIn max-h-[85vh] overflow-y-auto"
        >
          {/* Quick Toolbar on Mobile */}
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
                to={currentUser ? ROUTES.ACCOUNT_WISHLIST : ROUTES.EARTH_ENERGY}
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

          {/* Home Link */}
          <Link
            to={ROUTES.HOME}
            onClick={() => setMobileMenuOpen(false)}
            className={`px-4 py-2.5 rounded-xl text-base font-semibold transition-all ${
              location.pathname === '/' ? 'bg-primary text-white font-bold' : 'text-base-content/80 hover:bg-base-200'
            }`}
          >
            {t('home')}
          </Link>

          {/* Gateways Breakdown */}
          {gateways.map((gw) => (
            <div key={gw.id} className="flex flex-col gap-1.5">
              <div className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-secondary flex items-center gap-1.5">
                <gw.icon className="w-3.5 h-3.5" />
                <span>{gw.title}</span>
              </div>
              <div className="grid grid-cols-1 gap-1 pl-2">
                {gw.items.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all flex items-center justify-between ${
                      isActive(item.path)
                        ? 'bg-primary/10 text-primary font-bold'
                        : 'text-base-content/80 hover:bg-base-200'
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="badge badge-xs badge-secondary text-[9px] font-bold">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          ))}

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
