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
  Info,
  Calculator,
  ShoppingBag
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import { useSiteCustomizer } from '../../context/SiteCustomizerContext';
import { ROUTES } from '../../constants/routes';
import BrandLogo from './BrandLogo';

export default function Navbar() {
  const { theme, toggleTheme, currentUser, wishlist } = useAuth();
  const { cartCount, openCart } = useCart();
  const { language, toggleLanguage, t } = useLanguage();
  const { content } = useSiteCustomizer();
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
      title: 'Living',
      thaiSub: '(วิถีชีวิต)',
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
      title: 'Learning',
      thaiSub: '(การเรียนรู้)',
      icon: BookOpen,
      items: [
        {
          label: language === 'th' ? 'Wealth (สถาปัตยกรรมการเงิน)' : 'Wealth Architecture',
          desc: language === 'th' ? 'การปกป้อง พอร์ตเกษียณ และแผนความคุ้มครองชีวิต' : 'Protection, annuity & life coverage plans',
          path: ROUTES.WEALTH,
          icon: Coins,
        },
        {
          label: language === 'th' ? 'คัดกรอง & ประมาณการเบี้ย AIA' : 'AIA Plan Finder & Estimator',
          desc: language === 'th' ? 'เลือกช่วงอายุ รายได้ และเป้าหมาย เพื่อประเมินเบี้ยและค้นหาแผนที่เหมาะกับคุณ' : 'Match AIA plans and estimate premiums by age, income & goals',
          path: `${ROUTES.WEALTH}?tab=finder`,
          icon: Sparkles,
          badge: 'Finder',
        },
        {
          label: language === 'th' ? 'วางแผนและคำนวณภาษี 2568' : 'Tax Planning & Calculator',
          desc: language === 'th' ? 'คำนวณภาษีเงินได้บุคคลธรรมดาและสิทธิลดหย่อน AIA' : 'Personal income tax engine & tax-saving strategies',
          path: ROUTES.TAX,
          icon: Calculator,
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
      title: 'Connecting',
      thaiSub: '(เพื่อนร่วมทาง)',
      icon: MessageCircle,
      items: [
        {
          label: language === 'th' ? 'About Admin A & Admin B' : 'About Admin A & Admin B',
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
    <header className="w-full px-3 sm:px-6 lg:px-8 xl:px-12 py-2.5 sm:py-3 sticky top-0 z-40" ref={navRef}>
      <nav
        aria-label="เมนูหลัก"
        className="zen-surface w-full px-3 sm:px-4 lg:px-5 2xl:px-6 py-2 rounded-full flex items-center justify-between gap-2 sm:gap-3 transition-[box-shadow,background-color] duration-300"
      >
        {/* Brand Logo & Identity */}
        <Link
          to={ROUTES.HOME}
          className="flex items-center gap-1.5 sm:gap-2 group shrink-0"
          aria-label="Living Wealth 365 หน้าแรก"
        >
          <BrandLogo collapsed={true} size="sm" className="sm:hidden shrink-0" />
          <BrandLogo size="sm" className="hidden sm:block sm:h-8 2xl:h-9 w-auto group-hover:scale-105 transition-transform duration-300 shrink-0" />
          <span className="hidden min-[360px]:inline text-sm sm:text-base 2xl:text-xl font-black tracking-tight text-primary leading-tight whitespace-nowrap notranslate" translate="no">
            Living Wealth <span className="text-secondary notranslate" translate="no">365</span>
          </span>
        </Link>

        {/* Desktop Gateway Navigation Links (xl: 1280px+) — shrink-0 prevents center links from colliding into Logo */}
        <div className="hidden xl:flex items-center justify-center gap-0.5 2xl:gap-2 shrink-0">
          <Link
            to={ROUTES.HOME}
            className={`px-2.5 2xl:px-3.5 py-2 rounded-full text-sm font-semibold whitespace-nowrap shrink-0 transition-[background-color,color,transform] duration-200 ${
              isActive(ROUTES.HOME) && location.pathname === '/'
                ? 'bg-primary/14 text-primary font-bold shadow-xs'
                : 'text-base-content/85 hover:bg-white/40 hover:text-primary'
            }`}
          >
            {t('home')}
          </Link>

          {gateways.map((gw) => {
            const hasActiveChild = gw.items.some((item) => isActive(item.path));
            const isOpen = openDropdown === gw.id;

            return (
              <div key={gw.id} className="relative shrink-0">
                <button
                  type="button"
                  onClick={() => setOpenDropdown(isOpen ? null : gw.id)}
                  className={`px-2.5 2xl:px-3.5 py-2 rounded-full text-sm font-semibold flex items-center gap-1 2xl:gap-1.5 whitespace-nowrap shrink-0 transition-[background-color,color,transform] duration-200 cursor-pointer ${
                    hasActiveChild || isOpen
                      ? 'bg-primary/14 text-primary font-bold shadow-xs'
                      : 'text-base-content/85 hover:bg-white/40 hover:text-primary'
                  }`}
                  aria-expanded={isOpen}
                >
                  <gw.icon className="w-4 h-4 opacity-75 shrink-0" />
                  <span>
                    {gw.title}
                    {language === 'th' && (
                      <span className="hidden 2xl:inline font-medium opacity-80 ml-1">
                        {gw.thaiSub}
                      </span>
                    )}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu — High-contrast solid liquid glass */}
                {isOpen && (
                  <div className="absolute top-full left-0 mt-2 w-80 p-2 rounded-2xl liquid-glass-solid flex flex-col gap-1 z-50 animate-pop-in">
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
        <div className="flex items-center gap-1 2xl:gap-2 shrink-0">
          {/* Shopping Cart Button */}
          <button
            type="button"
            id="nav-cart-btn"
            onClick={openCart}
            className="btn btn-ghost btn-circle btn-sm sm:btn-md relative"
            title="ตะกร้าสินค้า"
            aria-label="เปิดตะกร้าสินค้า"
          >
            <ShoppingBag className="w-5 h-5 text-primary" />
            {cartCount > 0 && (
              <span className="badge badge-xs badge-secondary text-secondary-content absolute -top-1 -right-1 font-bold text-[10px] min-w-5 h-5 flex items-center justify-center p-0 shadow-xs">
                {cartCount}
              </span>
            )}
          </button>

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
            className="btn btn-ghost btn-sm rounded-full font-bold gap-1 px-2.5 border border-base-300/40 hidden sm:inline-flex whitespace-nowrap shrink-0"
            title="สลับภาษา / Switch Language"
          >
            <Globe className="w-4 h-4 text-primary shrink-0" />
            <span className="text-xs uppercase font-black text-secondary">
              {language === 'th' ? '🇹🇭 TH' : '🇬🇧 EN'}
            </span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle btn-sm sm:btn-md hidden sm:inline-flex shrink-0"
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
                className="btn btn-secondary btn-sm text-white font-bold gap-1.5 px-3 sm:px-4 rounded-full shadow-xs whitespace-nowrap shrink-0"
              >
                <Shield className="w-4 h-4 shrink-0" />
                <span className="hidden md:inline">{t('adminCrm')}</span>
                <span className="md:hidden">CRM</span>
              </Link>
            ) : (
              <Link
                to={ROUTES.ACCOUNT}
                className="btn btn-primary btn-outline btn-sm font-bold gap-1.5 px-3 sm:px-4 rounded-full whitespace-nowrap shrink-0 max-w-[165px]"
                title={currentUser.name || t('account')}
              >
                <User className="w-4 h-4 shrink-0" />
                <span className="hidden md:inline truncate">
                  {currentUser.name || t('account')}
                </span>
                <span className="md:hidden">{t('account')}</span>
              </Link>
            )
          ) : (
            <Link
              to={ROUTES.LOGIN}
              className="btn btn-primary btn-sm text-xs sm:text-sm font-bold gap-1 sm:gap-1.5 px-2.5 sm:px-4 rounded-full shadow-xs whitespace-nowrap shrink-0"
            >
              <LogIn className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>{t('login')}</span>
            </Link>
          )}

          {/* Mobile / Tablet Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn btn-ghost btn-circle btn-sm xl:hidden shrink-0"
            aria-label="เปิดเมนูการนำทาง"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile / Tablet Drawer Dropdown */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="เมนูบนมือถือ"
          className="xl:hidden mt-2 p-4 sm:p-5 rounded-3xl liquid-glass-solid flex flex-col gap-4 animate-pop-in max-h-[85vh] overflow-y-auto"
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
              <div className="px-3 py-1 text-xs font-bold text-secondary flex items-center gap-1.5">
                <gw.icon className="w-3.5 h-3.5" />
                <span>{gw.title} {language === 'th' ? gw.thaiSub : ''}</span>
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
