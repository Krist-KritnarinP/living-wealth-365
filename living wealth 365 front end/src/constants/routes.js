// ==========================================
// 🧭 Application Route Mapping
// Structured around the 7 Content Pillars & 3 Gateways
// ==========================================

export const ROUTES = {
  // 🏛️ The 7 Content Pillars
  HOME: '/',
  LIFE: '/life',
  WEALTH: '/wealth',
  WELLBEING: '/wellbeing',
  INNER_LIFE: '/inner-life',
  EARTH_ENERGY: '/earth-energy',
  JOURNAL: '/journal',
  JOURNAL_DETAIL: (slug = ':slug') => `/journal/${slug}`,
  ABOUT: '/about',

  // 🔄 Backwards Compatibility & Direct Gateways
  BLOG: '/journal',
  BLOG_DETAIL: (slug = ':slug') => `/journal/${slug}`,
  MUTELU: '/earth-energy',
  TAX: '/tax',
  TAX_CALCULATOR: '/tax',
  INSURANCE_LIFE: '/wealth?tab=protection',
  INSURANCE_NON_LIFE: '/wealth?tab=protection',

  // 👤 Auth & Onboarding
  LOGIN: '/login',
  REGISTER: '/register',
  THANK_YOU: '/thank-you',

  // 💼 Customer Account
  ACCOUNT: '/account',
  ACCOUNT_HISTORY: '/account/history',
  ACCOUNT_WISHLIST: '/account/wishlist',

  // ⚙️ Admin CMS & Operations
  ADMIN: '/admin',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_CUSTOMIZER: '/admin/customizer',
  ADMIN_INSURANCE: '/admin/cms/insurance',
  ADMIN_BLOG: '/admin/cms/blog',
  ADMIN_PRODUCTS: '/admin/cms/products',
  ADMIN_ACTIVITY_LOG: '/admin/activity-log',
};
