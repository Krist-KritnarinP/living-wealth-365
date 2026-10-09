import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { ToastProvider } from './context/ToastContext';
import { ROUTES } from './constants/routes';

// Common Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import RoleSwitcher from './components/common/RoleSwitcher';
import ProtectedRoute from './components/common/ProtectedRoute';

// Public Pages
import HomePage from './pages/public/HomePage';
import LifeInsurancePage from './pages/public/LifeInsurancePage';
import NonLifeInsurancePage from './pages/public/NonLifeInsurancePage';
import MuteluPage from './pages/public/MuteluPage';
import BlogPage from './pages/public/BlogPage';
import BlogDetailPage from './pages/public/BlogDetailPage';
import LoginPage from './pages/public/LoginPage';
import RegisterPage from './pages/public/RegisterPage';
import ThankYouPage from './pages/public/ThankYouPage';

// Customer Pages
import AccountDashboardPage from './pages/account/AccountDashboardPage';
import AccountHistoryPage from './pages/account/AccountHistoryPage';
import AccountWishlistPage from './pages/account/AccountWishlistPage';

// Admin Pages
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminInsurancePage from './pages/admin/AdminInsurancePage';
import AdminBlogPage from './pages/admin/AdminBlogPage';
import AdminProductsPage from './pages/admin/AdminProductsPage';

// Helper to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Shell coordinator: Conditionally hides marketing Navbar & Footer inside CRM Dashboard
function AppShell() {
  const location = useLocation();
  const isDashboard =
    location.pathname.startsWith('/account') ||
    location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen w-full flex flex-col bg-base-100 text-base-content antialiased selection:bg-secondary/30 selection:text-secondary">
      {/* Show marketing navbar only on public pages */}
      {!isDashboard && <Navbar />}

      {/* Main Viewport Content */}
      <main className="flex-1 w-full">
        <Routes>
          {/* 🌐 1. Public Routes */}
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.INSURANCE_LIFE} element={<LifeInsurancePage />} />
          <Route path={ROUTES.INSURANCE_NON_LIFE} element={<NonLifeInsurancePage />} />
          <Route path={ROUTES.MUTELU} element={<MuteluPage />} />
          <Route path={ROUTES.BLOG} element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
          <Route path={ROUTES.THANK_YOU} element={<ThankYouPage />} />

          {/* 👤 2. Customer Routes (Role: CUSTOMER) */}
          <Route
            path={ROUTES.ACCOUNT}
            element={
              <ProtectedRoute requiredRole="CUSTOMER">
                <AccountDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.ACCOUNT_HISTORY}
            element={
              <ProtectedRoute requiredRole="CUSTOMER">
                <AccountHistoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.ACCOUNT_WISHLIST}
            element={
              <ProtectedRoute requiredRole="CUSTOMER">
                <AccountWishlistPage />
              </ProtectedRoute>
            }
          />

          {/* 🔒 3. Admin Routes (Role: ADMIN) */}
          <Route
            path={ROUTES.ADMIN_DASHBOARD}
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <AdminDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.ADMIN_BLOG}
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <AdminBlogPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.ADMIN_PRODUCTS}
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <AdminProductsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.ADMIN_INSURANCE}
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <AdminInsurancePage />
              </ProtectedRoute>
            }
          />

          {/* Fallback to Home */}
          <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
        </Routes>
      </main>

      {/* Show marketing footer only on public pages */}
      {!isDashboard && <Footer />}

      {/* Floating Demo Role Switcher Toolbar */}
      <RoleSwitcher />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <ToastProvider>
          <BrowserRouter>
            <ScrollToTop />
            <AppShell />
          </BrowserRouter>
        </ToastProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}
