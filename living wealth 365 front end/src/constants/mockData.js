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
    imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop&q=80',
    isActive: true,
  },
];

export const INITIAL_POSTS = [
  {
    id: 'post-life-1',
    slug: 'balance-6-dimensions-of-life',
    title: 'สมดุล 6 มิติของชีวิต: เมื่อความสำเร็จไม่ได้วัดแค่ตัวเลขในบัญชีธนาคาร',
    category: 'วิถีชีวิต & สมดุล',
    pillar: 'LIFE',
    postType: 'ARTICLE',
    author: 'คุณท็อป & คุณจอย',
    authorName: 'คุณท็อป & คุณจอย',
    publishedAt: '2025-02-15',
    readTime: '6 นาที',
    published: true,
    tags: '#LifeDesign #Balance #Longevity',
    excerpt: 'สำรวจกรอบความคิด 6 มิติหลัก เพื่อสร้างชีวิตที่มั่นคง มั่งคั่ง และสงบสุขอย่างยั่งยืน',
    content: 'ชีวิตที่ได้รับการวางแผนมาอย่างดี คือชีวิตที่มีความสมดุลทั้ง 6 มิติ: สุขภาพ การเงิน เวลา ความสัมพันธ์ โลกภายใน และเป้าหมายชีวิต',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80',
  },
];

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
    name: 'คุณท็อป (นักวางแผนชีวิตและการเงิน)',
    email: 'admin-a@livingwealth365.com',
    phone: '082-111-2222',
    role: 'ADMIN',
  },
  joy: {
    id: 'admin-3',
    name: 'คุณจอย (ผู้คัดสรรพลังงานธรรมชาติและวิถีชีวิต)',
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
    tagline: 'เหมาจ่ายค่ารักษาพยาบาลสูงสุด 25 ล้านบาท/รอบปีกรมธรรม์',
    coverageAmount: 'สูงสุด 25,000,000 บาท/ปี',
    startingPrice: 'เริ่มต้น 1,850 บ./เดือน',
    features: JSON.stringify([
      'เหมาจ่ายค่ารักษาพยาบาลผู้ป่วยใน (IPD) ตามจริง',
      'เบิ้ลความคุ้มครองเป็น 2 เท่าเมื่อตรวจพบโรคร้ายแรงครั้งแรก',
      'ลดหย่อนภาษีเงินได้บุคคลธรรมดาสูงสุด 25,000 บาท',
    ]),
    recommendedFor: 'คนวัยทำงานและผู้ที่ต้องการความคุ้มครองสุขภาพระดับพรีเมียม',
    description: 'แผนประกันสุขภาพเหมาจ่ายยอดนิยม คุ้มครองครบทั้งการผ่าตัด อุบัติเหตุ และค่ารักษาพยาบาล',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
    isActive: true,
  },
];
