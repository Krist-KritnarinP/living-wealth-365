import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Users,
  FileText,
  Package,
  Heart,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Globe,
  Sun,
  Moon,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useToast } from '../../context/ToastContext';
import { ROUTES } from '../../constants/routes';
import BrandLogo from './BrandLogo';

export default function DashboardLayout({ children, type = 'customer' }) {
  const { currentUser, logout, theme, toggleTheme, wishlist, leads, posts, products, insurancePlans = [] } = useAuth();
  const { language, toggleLanguage, t } = useLanguage();
  const { showToast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  // Sidebar collapse state
  const [collapsed, setCollapsed] = useState(() => {
    return localStorage.getItem('lw365_sidebar_collapsed') === 'true';
  });

  // Mobile drawer open state
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('lw365_sidebar_collapsed', collapsed ? 'true' : 'false');
  }, [collapsed]);

  const handleLogout = () => {
    logout();
    showToast(t('logoutSuccess'), 'info');
    navigate(ROUTES.HOME);
  };

  const myLeadsCount = leads.filter(
    (l) => l.userId === currentUser?.id || l.phone === currentUser?.phone
  ).length;

  const newLeadsCount = leads.filter((l) => l.status === 'NEW').length;

  // Nav menus depending on role
  const customerNav = [
    {
      title: t('profileOverview'),
      path: ROUTES.ACCOUNT,
      icon: User,
      badge: null,
    },
    {
      title: t('consultationHistory'),
      path: ROUTES.ACCOUNT_HISTORY,
      icon: FileText,
      badge: myLeadsCount > 0 ? myLeadsCount : null,
      badgeColor: 'badge-primary',
    },
    {
      title: t('savedWishlist'),
      path: ROUTES.ACCOUNT_WISHLIST,
      icon: Heart,
      badge: wishlist.length > 0 ? wishlist.length : null,
      badgeColor: 'badge-error text-white',
    },
  ];

  const adminNav = [
    {
      title: t('crmPipeline'),
      path: ROUTES.ADMIN_DASHBOARD,
      icon: Users,
      badge: newLeadsCount > 0 ? `${newLeadsCount} New` : null,
      badgeColor: 'badge-warning text-warning-content font-bold',
    },
    {
      title: 'จัดการแผนประกัน',
      path: ROUTES.ADMIN_INSURANCE,
      icon: ShieldCheck,
      badge: insurancePlans.length > 0 ? insurancePlans.length : null,
      badgeColor: 'badge-primary text-white',
    },
    {
      title: "วารสาร & Admin A's Notes (CMS)",
      path: ROUTES.ADMIN_BLOG,
      icon: FileText,
      badge: posts.length,
      badgeColor: 'badge-ghost',
    },
    {
      title: 'แร่ธาตุ & คริสตัล (CMS)',
      path: ROUTES.ADMIN_PRODUCTS,
      icon: Package,
      badge: products.length,
      badgeColor: 'badge-secondary text-white',
    },
  ];

  const currentNav = type === 'admin' ? adminNav : customerNav;

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen w-full flex bg-base-100 text-base-content antialiased">
      {/* 1. DESKTOP COLLAPSIBLE SIDEBAR */}
      <aside
        className={`hidden lg:flex flex-col border-r border-base-300/60 zen-surface sticky top-0 h-screen transition-all duration-300 z-30 shrink-0 ${
          collapsed ? 'w-20' : 'w-72'
        }`}
      >
        {/* Sidebar Header with Brand Logo */}
        {collapsed ? (
          /* COLLAPSED HEADER: Perfect Center Alignment */
          <div className="py-4 px-2 flex flex-col items-center justify-center border-b border-base-300/60 min-h-[76px] gap-2">
            <Link
              to={ROUTES.HOME}
              className="flex items-center justify-center p-1 hover:scale-105 transition-transform"
              title="Living Wealth 365"
            >
              <BrandLogo collapsed={true} size="sm" />
            </Link>
            <button
              onClick={() => setCollapsed(false)}
              className="btn btn-ghost btn-circle btn-xs hover:bg-base-200 text-base-content/70"
              title={t('expandSidebar')}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          /* EXPANDED HEADER: Spacious, no clipping, graceful breathing room */
          <div className="px-4 py-3.5 flex items-center justify-between border-b border-base-300/60 min-h-[76px]">
            <Link to={ROUTES.HOME} className="flex items-center gap-3 min-w-0 flex-1 group">
              <BrandLogo collapsed={false} size="md" className="shrink-0 group-hover:scale-105 transition-transform" />
              <div className="flex flex-col leading-tight min-w-0">
                <span className="font-black text-primary text-base whitespace-nowrap tracking-tight">
                  Living Wealth <span className="text-secondary">365</span>
                </span>
                <span className="text-[10px] font-bold text-secondary uppercase tracking-wider">
                  {type === 'admin' ? 'Advisor CRM' : 'VIP Member'}
                </span>
              </div>
            </Link>

            <button
              onClick={() => setCollapsed(true)}
              className="btn btn-ghost btn-circle btn-xs hover:bg-base-200 shrink-0 text-base-content/70"
              title={t('collapseSidebar')}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Sidebar Navigation Menu */}
        <div className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto">
          {currentNav.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-2xl font-bold text-sm transition-all duration-200 group relative ${
                  active
                    ? 'bg-primary text-white shadow-md'
                    : 'text-base-content/75 hover:bg-base-200/70 hover:text-primary'
                } ${collapsed ? 'justify-center px-0' : ''}`}
                title={collapsed ? item.title : undefined}
              >
                <Icon className={`w-5 h-5 shrink-0 ${active ? 'text-white' : 'text-primary'}`} />
                {!collapsed && (
                  <span className="flex-1 truncate">{item.title}</span>
                )}
                {!collapsed && item.badge && (
                  <span className={`badge badge-sm font-bold shadow-xs ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}

          <div className="pt-4 mt-4 border-t border-base-300/50">
            <Link
              to={ROUTES.HOME}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-base-content/60 hover:text-primary hover:bg-base-200/50 transition-colors ${
                collapsed ? 'justify-center px-0' : ''
              }`}
              title={collapsed ? t('backToWebsite') : undefined}
            >
              <ExternalLink className="w-4 h-4 shrink-0 text-secondary" />
              {!collapsed && <span>{t('backToWebsite')}</span>}
            </Link>
          </div>
        </div>

        {/* Sidebar User Footer */}
        <div className="p-3 border-t border-base-300/60 bg-base-200/30">
          <div className={`flex items-center gap-2.5 ${collapsed ? 'justify-center' : ''}`}>
            <div className="avatar placeholder shrink-0">
              <div className="bg-primary/10 text-primary rounded-xl w-9 h-9 font-bold flex items-center justify-center text-sm border border-primary/20">
                {currentUser?.name ? currentUser.name.charAt(0) : 'U'}
              </div>
            </div>

            {!collapsed && (
              <div className="flex-1 min-w-0">
                <div className="text-xs font-black text-primary truncate leading-tight">
                  {currentUser?.name || (type === 'admin' ? 'Advisor' : 'Customer')}
                </div>
                <div className="text-[10px] text-base-content/60 truncate">
                  {currentUser?.email || (type === 'admin' ? t('adminRole') : t('customerRole'))}
                </div>
              </div>
            )}

            <button
              onClick={handleLogout}
              className="btn btn-ghost btn-circle btn-xs text-error hover:bg-error/10"
              title={t('logout')}
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* 2. MOBILE DRAWER (Off-canvas) */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setMobileDrawerOpen(false)}
          ></div>

          <aside className="relative w-72 max-w-[80vw] h-full zen-surface border-r border-base-300 p-4 flex flex-col justify-between shadow-2xl z-10 animate-fadeIn">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-base-300">
                <div className="flex items-center gap-2.5">
                  <BrandLogo size="sm" />
                  <span className="font-black text-primary text-sm">
                    Living Wealth <span className="text-secondary">365</span>
                  </span>
                </div>
                <button
                  onClick={() => setMobileDrawerOpen(false)}
                  className="btn btn-ghost btn-circle btn-sm"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-4 space-y-1.5">
                {currentNav.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);

                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileDrawerOpen(false)}
                      className={`flex items-center justify-between px-3.5 py-3 rounded-2xl font-bold text-sm ${
                        active
                          ? 'bg-primary text-white shadow-md'
                          : 'text-base-content/80 hover:bg-base-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5" />
                        <span>{item.title}</span>
                      </div>
                      {item.badge && (
                        <span className={`badge badge-sm font-bold ${item.badgeColor}`}>
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}

                <div className="pt-3 border-t border-base-300">
                  <Link
                    to={ROUTES.HOME}
                    onClick={() => setMobileDrawerOpen(false)}
                    className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-secondary hover:underline"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>{t('backToWebsite')}</span>
                  </Link>
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="btn btn-outline btn-error btn-sm w-full rounded-xl font-bold gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>{t('logout')}</span>
            </button>
          </aside>
        </div>
      )}

      {/* 3. MAIN DASHBOARD CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="sticky top-0 z-20 zen-surface border-b border-base-300/60 px-4 sm:px-8 py-3 flex items-center justify-between min-h-[64px]">
          <div className="flex items-center gap-3">
            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileDrawerOpen(true)}
              className="btn btn-ghost btn-circle btn-sm lg:hidden"
              aria-label="Toggle Mobile Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumb / Title tag */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-primary">
              <span className="badge badge-secondary text-white text-[10px] font-black uppercase tracking-wider">
                {type === 'admin' ? 'CRM ADVISOR' : 'MEMBER PORTAL'}
              </span>
              <span className="hidden sm:inline text-base-content/40">•</span>
              <span className="hidden sm:inline text-base-content/80 font-semibold">
                {type === 'admin' ? 'Living Wealth 365 Management' : 'Personal Wealth & Wisdom Flow'}
              </span>
            </div>
          </div>

          {/* Topbar Action Controls */}
          <div className="flex items-center gap-2">
            {/* Bilingual Switcher (TH / EN) */}
            <button
              onClick={toggleLanguage}
              className="btn btn-ghost btn-sm rounded-xl font-bold gap-1 px-2.5 border border-base-300/50"
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
              className="btn btn-ghost btn-circle btn-sm"
              title="สลับโหมดสว่าง / มืด"
            >
              {theme === 'zen-light' ? (
                <Moon className="w-4 h-4 text-neutral" />
              ) : (
                <Sun className="w-4 h-4 text-secondary" />
              )}
            </button>
          </div>
        </header>

        {/* Inner Page Viewport */}
        <main className="flex-1 w-full p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
