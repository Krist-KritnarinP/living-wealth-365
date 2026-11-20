// ==========================================
// 🌿 Living Wealth 365 - Lean Initial Fallback Store
// Production data is fetched live from Supabase via Render API.
// Minimal 1-item skeletons below only prevent blank layout before first API sync.
// ==========================================

export const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'หินไหมทองจักรพรรดิ (Golden Rutilated Quartz)',
    category: 'อำนาจ & ความมั่งคั่ง',
    price: '3,590',
    stoneType: 'ควอตซ์ใส เส้นไหมทอง 12mm',
    dayOfWeek: 'วันพฤหัสบดี, วันจันทร์',
    aspect: 'SCIENCE',
    chakra: 'จักระที่ 3 มณีปุระ (Solar Plexus Chakra)',
    mineralFormula: 'SiO₂ with TiO₂ Rutile Needles',
    isCurated: true,
    description: 'ผลึกควอตซ์ธรรมชาติที่มีแร่รูไทล์สีทองสว่างภายใน ตัวแทนของความมั่นคงและความมั่งคั่ง',
    imageUrl: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=800&auto=format&fit=crop&q=80',
    isActive: true,
  },
];

export const INITIAL_POSTS = [];

export const INITIAL_LEADS = [];

export const MOCK_USERS = {
  customer: {
    id: 'cust-1',
    name: 'คุณสมชาย ใจดี',
    email: 'somchai@livingwealth365.com',
    phone: '081-234-5678',
    birthDate: '1990-08-15',
    role: 'CUSTOMER',
  },
  admin: {
    id: 'admin-1',
    name: 'กฤษณรินทร์ (System Administrator)',
    email: 'admin@livingwealth365.com',
    phone: '081-999-8888',
    birthDate: '1985-04-12',
    role: 'ADMIN',
  },
  top: {
    id: 'admin-2',
    name: 'Admin A (นักวางแผนชีวิตและการเงิน)',
    email: 'admin-a@livingwealth365.com',
    phone: '082-111-2222',
    role: 'ADMIN',
  },
  joy: {
    id: 'admin-3',
    name: 'Admin B (ผู้คัดสรรพลังงานธรรมชาติและวิถีชีวิต)',
    email: 'admin-b@livingwealth365.com',
    phone: '083-333-4444',
    role: 'ADMIN',
  },
};

export const INITIAL_INSURANCE_PLANS = [
  {
    id: 'plan-1',
    slug: 'aia-health-happy',
    type: 'LIFE',
    category: 'HEALTH',
    categoryName: 'ประกันสุขภาพเหมาจ่าย',
    name: 'AIA Health Happy เหมาเบิ้ลคุ้ม',
    tagline: 'เหมาจ่ายค่ารักษาพยาบาล 1–25 ล้านบาท/ปี เบิ้ลวงเงิน 2x นาน 4 ปี เมื่อพบ 6 โรคร้ายแรง',
    coverageAmount: 'สูงสุด 25,000,000 บาท/ปี',
    startingPrice: 'เริ่มต้น 1,850 บ./เดือน',
    features: JSON.stringify([
      'เหมาจ่ายค่ารักษาพยาบาลผู้ป่วยใน (IPD) ตามจริง 1M / 5M / 15M / 25M',
      'เบิ้ลความคุ้มครองเป็น 2 เท่า นานต่อเนื่อง 4 ปีกรมธรรม์เมื่อพบ 6 โรคร้ายแรง',
      'คุ้มครองค่าห้อง ค่าอาหาร และค่าบริการพยาบาลสูงสุด 365 วัน',
      'ลดหย่อนภาษีเงินได้บุคคลธรรมดาหมวดสุขภาพสูงสุด 25,000 บาท/ปี',
    ]),
    recommendedFor: 'คนวัยทำงานและเสาหลักครอบครัวที่ต้องการความคุ้มครอง รพ. เอกชน',
    description: 'สัญญาเพิ่มเติมประกันสุขภาพแบบเหมาจ่ายจากเอไอเอ คุ้มครองครบทั้งค่าผ่าตัด ค่ายา และโรคร้ายแรง',
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1000&auto=format&fit=crop&q=80',
    brochureUrl: 'https://www.aia.co.th/content/dam/th-wise/images/th/our-products/si_156_aia-healthy-happy/Brochure%20AIA%20Health%20Happy_Final_27Dec2022_website.pdf.coredownload.inline.pdf',
    isActive: true,
  },
];
