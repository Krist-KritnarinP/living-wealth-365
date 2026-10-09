export const ROUTES = {
  // Public
  HOME: '/',
  INSURANCE_LIFE: '/insurance/life',
  INSURANCE_NON_LIFE: '/insurance/non-life',
  MUTELU: '/mutelu',
  BLOG: '/blog',
  BLOG_DETAIL: (slug = ':slug') => `/blog/${slug}`,
  LOGIN: '/login',
  REGISTER: '/register',
  THANK_YOU: '/thank-you',

  // Customer Account
  ACCOUNT: '/account',
  ACCOUNT_HISTORY: '/account/history',
  ACCOUNT_WISHLIST: '/account/wishlist',

  // Admin
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_BLOG: '/admin/cms/blog',
  ADMIN_PRODUCTS: '/admin/cms/products',
};
