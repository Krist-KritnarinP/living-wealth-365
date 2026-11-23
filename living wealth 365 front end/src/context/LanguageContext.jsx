import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext(null);

export const TRANSLATIONS = {
  th: {
    // Navigation & 7 Pillars
    home: 'หน้าหลัก',
    life: 'สมดุลชีวิต 6 มิติ',
    wealth: 'สถาปัตยกรรมการเงิน',
    wellbeing: 'อายุวัฒนะ & สุขภาพ',
    innerLife: 'โลกภายใน & สมาธิ',
    earthEnergy: 'พลังงานธรรมชาติ & แร่ธาตุ',
    journal: "วารสาร & Admin A's Notes",
    about: 'เกี่ยวกับเรา & Admin A & Admin B',
    letsTalk: "สนทนากับเรา (Let's Talk)",
    gatewayLiving: 'Living (วิถีชีวิต)',
    gatewayLearning: 'Learning (ความรู้)',
    gatewayConnecting: 'Connecting (เพื่อนร่วมทาง)',

    // Backwards Compatibility Links
    insuranceLife: 'ประกันชีวิต & สุขภาพ',
    insuranceNonLife: 'ประกันวินาศภัย',
    taxCalculator: 'คำนวณภาษี',
    mutelu: 'วัตถุมงคลสายมู',
    blog: 'คลังความรู้ & ภาษี',
    login: 'เข้าสู่ระบบ',
    register: 'สมัครสมาชิก',
    account: 'บัญชีของฉัน',
    adminCrm: 'ระบบจัดการแอดมิน',
    contactAdvisor: 'ติดต่อที่ปรึกษา',
    logout: 'ออกจากระบบ',

    // Dashboard & Sidebar
    dashboard: 'แดชบอร์ด',
    crmPipeline: 'จัดการ Leads (CRM)',
    cmsBlog: 'จัดการบทความ (CMS)',
    cmsProducts: 'จัดการสินค้าแร่ธาตุ (CMS)',
    profileOverview: 'ข้อมูลส่วนตัว',
    consultationHistory: 'ประวัติการปรึกษา',
    savedWishlist: 'รายการที่บันทึกไว้',
    backToWebsite: 'กลับสู่หน้าเว็บไซต์',
    adminRole: 'ที่ปรึกษาแอดมิน',
    customerRole: 'ลูกค้าสมาชิก',
    collapseSidebar: 'ย่อแถบเมนู',
    expandSidebar: 'ขยายแถบเมนู',

    // Common Actions & Badges
    save: 'บันทึก',
    cancel: 'ยกเลิก',
    delete: 'ลบ',
    edit: 'แก้ไข',
    status: 'สถานะ',
    notes: 'บันทึกเพิ่มเติม',
    total: 'ทั้งหมด',
    searchPlaceholder: 'ค้นหา...',
    confirmDeleteTitle: 'ลบรายการนี้?',
    confirmDeleteMsg: 'รายการนี้จะถูกลบถาวรและกู้คืนไม่ได้',

    // Status Badges
    statusNew: 'รอดำเนินการ',
    statusContacted: 'ที่ปรึกษารับเรื่องแล้ว',
    statusClosed: 'เสร็จสมบูรณ์',
    statusCancelled: 'ยกเลิก',

    // Toasts
    leadSuccess: 'ส่งคำขอรับคำปรึกษาแล้ว ที่ปรึกษาจะติดต่อกลับตามเวลาที่เลือก',
    saveSuccess: 'บันทึกการเปลี่ยนแปลงแล้ว',
    deleteSuccess: 'ลบรายการแล้ว',
    statusUpdated: 'อัปเดตสถานะแล้ว',
    wishlistAdded: 'บันทึกเข้า Wishlist แล้ว',
    wishlistRemoved: 'นำออกจาก Wishlist แล้ว',
    linkCopied: 'คัดลอกลิงก์บทความแล้ว',
    loginSuccess: 'เข้าสู่ระบบแล้ว',
    logoutSuccess: 'ออกจากระบบแล้ว',
  },
  en: {
    // Navigation & 7 Pillars
    home: 'Home',
    life: 'Life Balance (6D)',
    wealth: 'Wealth Architecture',
    wellbeing: 'Longevity & Health',
    innerLife: 'Inner Life & Stillness',
    earthEnergy: 'Earth & Energy',
    journal: "Journal & Admin A's Notes",
    about: 'About Us & Admin A & Admin B',
    letsTalk: "Let's Talk",
    gatewayLiving: 'Living',
    gatewayLearning: 'Learning',
    gatewayConnecting: 'Connecting',

    // Backwards Compatibility Links
    insuranceLife: 'Life & Health',
    insuranceNonLife: 'General Insurance',
    taxCalculator: 'Tax Calculator',
    mutelu: 'Auspicious Items',
    blog: 'Knowledge Hub',
    login: 'Sign In',
    register: 'Sign Up',
    account: 'My Account',
    adminCrm: 'Admin Portal',
    contactAdvisor: 'Contact Advisor',
    logout: 'Sign Out',

    // Dashboard & Sidebar
    dashboard: 'Dashboard',
    crmPipeline: 'Leads CRM Pipeline',
    cmsBlog: 'Blog Management',
    cmsProducts: 'Products Management',
    profileOverview: 'Profile Overview',
    consultationHistory: 'Consultation History',
    savedWishlist: 'Saved Wishlist',
    backToWebsite: 'Back to Website',
    adminRole: 'Senior Advisor',
    customerRole: 'VIP Member',
    collapseSidebar: 'Collapse Sidebar',
    expandSidebar: 'Expand Sidebar',

    // Common Actions & Badges
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    status: 'Status',
    notes: 'Notes',
    total: 'Total',
    searchPlaceholder: 'Search...',
    confirmDeleteTitle: 'Delete this item?',
    confirmDeleteMsg: 'This item will be permanently deleted and cannot be recovered.',

    // Status Badges
    statusNew: 'Pending',
    statusContacted: 'In Progress',
    statusClosed: 'Completed',
    statusCancelled: 'Cancelled',

    // Toasts
    leadSuccess: 'Consultation request sent. An advisor will contact you soon.',
    saveSuccess: 'Changes saved',
    deleteSuccess: 'Item deleted',
    statusUpdated: 'Lead status updated',
    wishlistAdded: 'Saved to Wishlist',
    wishlistRemoved: 'Removed from Wishlist',
    linkCopied: 'Article link copied',
    loginSuccess: 'Signed in',
    logoutSuccess: 'Signed out',
  },
};

// Helper to apply Google Translate programmatically
function triggerGoogleTranslate(targetLang) {
  if (typeof window === 'undefined') return;

  const hostname = window.location.hostname;
  if (targetLang === 'en') {
    document.cookie = 'googtrans=/th/en; path=/;';
    if (hostname && hostname !== 'localhost') {
      document.cookie = `googtrans=/th/en; path=/; domain=.${hostname};`;
    }
  } else {
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'googtrans=/th/th; path=/;';
    if (hostname && hostname !== 'localhost') {
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${hostname};`;
      document.cookie = `googtrans=/th/th; path=/; domain=.${hostname};`;
    }
  }

  const fireChange = () => {
    const combo = document.querySelector('.goog-te-combo');
    if (combo) {
      combo.value = targetLang;
      combo.dispatchEvent(new Event('change'));
      return true;
    }
    return false;
  };

  if (!fireChange()) {
    let retries = 0;
    const interval = setInterval(() => {
      retries++;
      if (fireChange() || retries >= 15) {
        clearInterval(interval);
      }
    }, 200);
  }
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('lw365_lang') || 'th';
  });

  // Apply on mount if user had previously chosen 'en'
  useEffect(() => {
    if (language === 'en') {
      triggerGoogleTranslate('en');
    }
  }, []);

  const setLanguage = (newLang) => {
    setLanguageState(newLang);
    localStorage.setItem('lw365_lang', newLang);
    triggerGoogleTranslate(newLang);
  };

  const toggleLanguage = () => {
    const nextLang = language === 'th' ? 'en' : 'th';
    setLanguage(nextLang);
  };

  const t = (key) => {
    return TRANSLATIONS[language]?.[key] || TRANSLATIONS['th']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
