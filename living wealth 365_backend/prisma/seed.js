import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting Living Wealth 365 Comprehensive Database Seeding...');

  // 1. Seed Users (Admin, Curators Admin A & Admin B, Customer)
  const hashedAdminPassword = await bcrypt.hash('Admin1234!', 10);
  const hashedCustomerPassword = await bcrypt.hash('Customer1234!', 10);

  const admin = await prisma.user.upsert({
    where: { username: 'admin_lw' },
    update: {
      password: hashedAdminPassword,
      role: 'ADMIN',
    },
    create: {
      username: 'admin_lw',
      email: 'admin@livingwealth365.com',
      password: hashedAdminPassword,
      name: 'กฤษณรินทร์ (System Administrator)',
      phone: '081-999-8888',
      role: 'ADMIN',
    },
  });

  const topUser = await prisma.user.upsert({
    where: { username: 'top_curator' },
    update: {
      name: 'Admin A (นักวางแผนชีวิตและการเงิน)',
      email: 'admin-a@livingwealth365.com',
      password: hashedAdminPassword,
      role: 'ADMIN',
    },
    create: {
      username: 'top_curator',
      email: 'admin-a@livingwealth365.com',
      password: hashedAdminPassword,
      name: 'Admin A (นักวางแผนชีวิตและการเงิน)',
      phone: '082-111-2222',
      role: 'ADMIN',
    },
  });

  const joyUser = await prisma.user.upsert({
    where: { username: 'joy_curator' },
    update: {
      name: 'Admin B (ผู้คัดสรรพลังงานธรรมชาติและวิถีชีวิต)',
      email: 'admin-b@livingwealth365.com',
      password: hashedAdminPassword,
      role: 'ADMIN',
    },
    create: {
      username: 'joy_curator',
      email: 'admin-b@livingwealth365.com',
      password: hashedAdminPassword,
      name: 'Admin B (ผู้คัดสรรพลังงานธรรมชาติและวิถีชีวิต)',
      phone: '083-333-4444',
      role: 'ADMIN',
    },
  });

  const customer = await prisma.user.upsert({
    where: { username: 'somchai_lw' },
    update: {
      password: hashedCustomerPassword,
      role: 'CUSTOMER',
    },
    create: {
      username: 'somchai_lw',
      email: 'somchai@example.com',
      password: hashedCustomerPassword,
      name: 'คุณสมชาย ใจดี',
      phone: '081-234-5678',
      birthDate: new Date('1990-08-15'),
      role: 'CUSTOMER',
    },
  });

  const vipUser = await prisma.user.upsert({
    where: { username: 'worraphon_vip' },
    update: {
      password: hashedCustomerPassword,
      role: 'CUSTOMER',
    },
    create: {
      username: 'worraphon_vip',
      email: 'worraphon@example.com',
      password: hashedCustomerPassword,
      name: 'คุณวรพล รัตนเวชกุล (ผู้บริหารระดับสูง วางแผนมรดก)',
      phone: '081-888-7766',
      birthDate: new Date('1975-04-12'),
      role: 'CUSTOMER',
    },
  });

  const drKanokwan = await prisma.user.upsert({
    where: { username: 'dr_kanokwan' },
    update: {
      password: hashedAdminPassword,
      role: 'ADMIN',
    },
    create: {
      username: 'dr_kanokwan',
      email: 'dr.kanokwan@livingwealth365.com',
      password: hashedAdminPassword,
      name: 'พญ. กนกวรรณ จันทร์วิวัฒน์ (Longevity & Wellness Advisor)',
      phone: '089-444-5555',
      birthDate: new Date('1982-11-20'),
      role: 'ADMIN',
    },
  });

  const thanaratBiz = await prisma.user.upsert({
    where: { username: 'thanarat_biz' },
    update: {
      password: hashedCustomerPassword,
      role: 'CUSTOMER',
    },
    create: {
      username: 'thanarat_biz',
      email: 'thanarat.biz@example.com',
      password: hashedCustomerPassword,
      name: 'คุณธนรัตน์ ประเสริฐกิจ (เจ้าของกิจการ SME)',
      phone: '086-333-2211',
      birthDate: new Date('1985-09-08'),
      role: 'CUSTOMER',
    },
  });

  const mayMindful = await prisma.user.upsert({
    where: { username: 'may_mindful' },
    update: {
      password: hashedCustomerPassword,
      role: 'CUSTOMER',
    },
    create: {
      username: 'may_mindful',
      email: 'may.designer@example.com',
      password: hashedCustomerPassword,
      name: 'คุณเมย์ ธนพร (Interior Designer & Meditator)',
      phone: '085-999-1122',
      birthDate: new Date('1994-02-14'),
      role: 'CUSTOMER',
    },
  });

  const ananyaRetire = await prisma.user.upsert({
    where: { username: 'ananya_retire' },
    update: {
      password: hashedCustomerPassword,
      role: 'CUSTOMER',
    },
    create: {
      username: 'ananya_retire',
      email: 'ananya.w@example.com',
      password: hashedCustomerPassword,
      name: 'คุณอนัญญา วงศ์สุวรรณ (Active Retirement Lifestyle)',
      phone: '081-666-3344',
      birthDate: new Date('1964-07-25'),
      role: 'CUSTOMER',
    },
  });

  console.log(`👤 Users seeded: 9 users ready (Admins: admin_lw, top_curator, joy_curator, dr_kanokwan | Customers: somchai_lw, worraphon_vip, thanarat_biz, may_mindful, ananya_retire)`);

  // 2. Seed Insurance Plans (หมวด WEALTH & Protection Solutions)
  const insurancePlans = [
    {
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
        'ค่าห้อง ค่าอาหาร สูงสุด 5,000 บ./วัน',
        'ลดหย่อนภาษีเงินได้บุคคลธรรมดาสูงสุด 25,000 บาท',
      ]),
      recommendedFor: 'คนวัยทำงาน, เจ้าของธุรกิจ, ผู้ที่ต้องการเข้ารับการรักษาใน รพ.เอกชนชั้นนำ',
      description: 'แผนประกันสุขภาพเหมาจ่ายที่ได้รับความนิยมสูงสุด คุ้มครองครบทั้งการผ่าตัด อุบัติเหตุฉุกเฉิน และค่ารักษาพยาบาลทั่วไป หมดกังวลเรื่องค่ารักษาพยาบาลส่วนเกิน',
      imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
      isActive: true,
      sortOrder: 1,
    },
    {
      slug: 'aia-multi-pay-ci',
      type: 'LIFE',
      category: 'CRITICAL_ILLNESS',
      categoryName: 'ประกันโรคร้ายแรง',
      name: 'AIA Multi-Pay CI โรคร้ายเจอจ่ายหลายรอบ',
      tagline: 'คุ้มครองโรคร้ายแรงตั้งแต่ระดับต้น เคลมซ้ำได้สูงสุดถึง 11 ครั้ง',
      coverageAmount: 'สูงสุด 800% ของทุนประกัน (สูงสุด 5,000,000 บ.)',
      startingPrice: 'เริ่มต้น 1,200 บ./เดือน',
      features: JSON.stringify([
        'ครอบคลุม 6 กลุ่มโรคร้ายแรง รวม 62 โรค ทั้งมะเร็ง หัวใจ สมอง',
        'เคลมซ้ำได้ทั้งโรคเดิมกลับมาเป็นซ้ำ หรือตรวจพบโรคใหม่',
        'หยุดชำระเบี้ยทันทีเมื่อตรวจพบโรคร้ายแรงระดับรุนแรงครั้งแรก',
        'ลดหย่อนภาษีสุขภาพได้ตามเกณฑ์กรมสรรพากร',
      ]),
      recommendedFor: 'ผู้มีความเสี่ยงหรือมีประวัติคนในครอบครัวเป็นโรคร้ายแรง, หัวหน้าครอบครัว',
      description: 'นวัตกรรมความคุ้มครองโรคร้ายแรงที่ไม่จำกัดการเคลมแค่ครั้งเดียว จ่ายเงินก้อนทันทีที่ตรวจพบเพื่อเป็นค่ารักษาและเงินชดเชยรายได้ครอบครัว',
      imageUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&auto=format&fit=crop&q=80',
      isActive: true,
      sortOrder: 2,
    },
    {
      slug: 'aia-annuity-fix',
      type: 'LIFE',
      category: 'RETIREMENT',
      categoryName: 'วางแผนเกษียณ & บำนาญ',
      name: 'AIA Annuity Fix วางแผนเกษียณ & บำนาญสุขใจ',
      tagline: 'การันตีรับเงินบำนาญ 24% ต่อปี ตั้งแต่อายุ 60 จนถึงอายุ 85 ปี',
      coverageAmount: 'เงินบำนาญสะสมรวมสูงสุด 600% ของทุนประกัน',
      startingPrice: 'เริ่มต้น 3,000 บ./เดือน',
      features: JSON.stringify([
        'การันตีเงินบำนาญจ่ายตรงเวลาทุกปี ไม่ผันผวนตามตลาดหุ้นหรือเศรษฐกิจ',
        'ลดหย่อนภาษีประกันบำนาญได้สูงสุด 200,000 บาท/ปี',
        'คุ้มครองชีวิตก่อนและหลังเกษียณ วางแผนส่งต่อเงินก้อนให้ลูกหลานได้',
        'มีช่วงอายุรับเงินบำนาญยาวนานถึงอายุ 85 ปี',
      ]),
      recommendedFor: 'ผู้ที่เตรียมพร้อมสู่วัยเกษียณ, ผู้ที่ต้องการกระแสเงินสดประจำหลังหยุดทำงาน',
      description: 'สร้างหลักประกันทางการเงินในวัยเกษียณอย่างมั่นคง มีเงินใช้จ่ายทุกปีอย่างสม่ำเสมอ พร้อมรับสิทธิประโยชน์ลดหย่อนภาษีเต็มสิทธิ',
      imageUrl: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&auto=format&fit=crop&q=80',
      isActive: true,
      sortOrder: 3,
    },
    {
      slug: 'aia-super-care',
      type: 'LIFE',
      category: 'TAX',
      categoryName: 'วางแผนมรดก & ภาษี',
      name: 'AIA Super Care วางแผนมรดก & ภาษีความมั่งคั่ง',
      tagline: 'ส่งต่อความมั่งคั่งปลอดภาษีมรดก ชำระเบี้ยคงที่ คุ้มครองตลอดชีพ',
      coverageAmount: 'ทุนมรดก 5,000,000 - 50,000,000 บาท',
      startingPrice: 'เริ่มต้น 5,000 บ./เดือน',
      features: JSON.stringify([
        'เงินผลประโยชน์จากประกันชีวิตได้รับการยกเว้นภาษีมรดก 100%',
        'ส่งต่อสินทรัพย์ถึงทายาทโดยตรงไม่ต้องผ่านกระบวนการจัดการมรดกในศาล',
        'ลดหย่อนภาษีเงินได้บุคคลธรรมดาได้สูงสุด 100,000 บาท',
        'เลือกระยะเวลาชำระเบี้ยได้ 10 ปี หรือ 20 ปี คุ้มครองตลอดชีพถึงอายุ 99 ปี',
      ]),
      recommendedFor: 'เจ้าของกิจการ, ผู้มีทรัพย์สินมรดก, ผู้บริหารระดับสูง',
      description: 'วางแผนส่งต่อสินทรัพย์อย่างมืออาชีพ ป้องกันความเสี่ยงจากการถูกเก็บภาษีมรดก และช่วยให้ธุรกิจและครอบครัวเดินหน้าต่อได้อย่างราบรื่น',
      imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=800&auto=format&fit=crop&q=80',
      isActive: true,
      sortOrder: 4,
    },
    {
      slug: 'motor-class-1-premium',
      type: 'NON_LIFE',
      category: 'MOTOR',
      categoryName: 'ประกันภัยรถยนต์',
      name: 'ประกันภัยรถยนต์ชั้น 1 ซ่อมห้าง Premium Care',
      tagline: 'คุ้มครองชน สูญหาย ไฟไหม้ น้ำท่วม ซ่อมห้างมาตรฐาน พร้อมรถใช้ระหว่างซ่อม',
      coverageAmount: 'ทุนประกันตามมูลค่ารถยนต์ คุ้มครองบุคคลภายนอก 10 ล้านบาท',
      startingPrice: 'เริ่มต้น 15,900 บ./ปี',
      features: JSON.stringify([
        'ซ่อมห้างศูนย์บริการมาตรฐาน อะไหล่แท้ 100%',
        'บริการช่วยเหลือฉุกเฉินบนท้องถนน 24 ชั่วโมง (Roadside Assistance)',
        'คุ้มครองภัยธรรมชาติ น้ำท่วม ลมพายุ ดินถล่ม',
        'มีรถใช้ระหว่างซ่อมฟรีสูงสุด 3 วันในกรณีเกิดอุบัติเหตุ',
      ]),
      recommendedFor: 'รถยนต์ป้ายแดง หรือรถยนต์อายุ 1-7 ปี, ผู้ใช้รถยนต์เป็นประจำทุกวัน',
      description: 'ให้คุณอุ่นใจทุกเส้นทางการขับขี่ คุ้มครองครอบคลุมทุกอุบัติเหตุทั้งมีคู่กรณีและไม่มีคู่กรณี พร้อมทีมประสานงานเคลมรวดเร็วตลอด 24 ชม.',
      imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80',
      isActive: true,
      sortOrder: 5,
    },
    {
      slug: 'home-safety-365',
      type: 'NON_LIFE',
      category: 'PROPERTY',
      categoryName: 'ประกันอัคคีภัย & ทรัพย์สิน',
      name: 'ประกันอัคคีภัยและภัยพิบัติบ้านอุ่นใจ 365',
      tagline: 'คุ้มครองโครงสร้างบ้านและทรัพย์สินภายใน ไฟไหม้ ฟ้าผ่า น้ำท่วม โจรกรรม',
      coverageAmount: 'วงเงินคุ้มครองสูงสุด 10,000,000 บาท',
      startingPrice: 'เริ่มต้น 2,500 บ./ปี',
      features: JSON.stringify([
        'คุ้มครองสิ่งปลูกสร้าง เฟอร์นิเจอร์ และเครื่องใช้ไฟฟ้าภายในบ้าน',
        'คุ้มครองภัยธรรมชาติ น้ำท่วม ลมพายุ แผ่นดินไหว',
        'ชดเชยค่าเช่าที่พักอาศัยชั่วคราวระหว่างซ่อมแซมบ้าน',
        'คุ้มครองการโจรกรรมและทรัพย์สินสูญหายจากการงัดแงะ',
      ]),
      recommendedFor: 'เจ้าของบ้านเดี่ยว, ทาวน์โฮม, คอนโดมิเนียม, อาคารพาณิชย์',
      description: 'ปกป้องบ้านอันเป็นที่รักและสินทรัพย์ที่มีค่าที่สุดของคุณจากเหตุการณ์ไม่คาดฝัน ด้วยเบี้ยประกันที่คุ้มค่าเพียงวันละไม่กี่บาท',
      imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop&q=80',
      isActive: true,
      sortOrder: 6,
    },
    {
      slug: 'personal-accident-plus',
      type: 'NON_LIFE',
      category: 'PA',
      categoryName: 'ประกันอุบัติเหตุส่วนบุคคล (PA)',
      name: 'ประกันอุบัติเหตุส่วนบุคคล PA อุ่นใจรอบทิศ',
      tagline: 'คุ้มครองอุบัติเหตุ 24 ชั่วโมงทั่วโลก ค่ารักษาไม่ต้องสำรองจ่ายผ่านบัตรแคร์การ์ด',
      coverageAmount: 'ค่ารักษาพยาบาล 100,000 บ./ครั้ง, ทุนชีวิต 1,000,000 บ.',
      startingPrice: 'เริ่มต้น 2,400 บ./ปี (เพียงวันละ 6.5 บาท)',
      features: JSON.stringify([
        'ไม่ต้องตรวจสุขภาพ สมัครง่ายคุ้มครองทันที',
        'ไม่ต้องสำรองจ่ายที่โรงพยาบาลคู่สัญญาชั้นนำกว่า 400 แห่งทั่วประเทศ',
        'เงินชดเชยรายได้ระหว่างนอนโรงพยาบาลจากอุบัติเหตุ',
        'คุ้มครองครอบคลุมถึงอุบัติเหตุจากการขับขี่หรือโดยสารรถจักรยานยนต์',
      ]),
      recommendedFor: 'ผู้ที่เดินทางบ่อย, ผู้ขับขี่หรือซ้อนท้ายรถจักรยานยนต์, นักกีฬา, คนทำงานทั่วไป',
      description: 'ประกันอุบัติเหตุที่ตอบโจทย์ไลฟ์สไตล์การใช้ชีวิต หมดกังวลเรื่องค่ารักษาจากอุบัติเหตุเล็กใหญ่ เข้ารับการรักษาได้ทันทีโดยไม่ต้องควักเงินเก็บ',
      imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80',
      isActive: true,
      sortOrder: 7,
    },
    {
      slug: 'aia-infinite-wealth-prestige',
      type: 'LIFE',
      category: 'INVESTMENT_LINKED',
      categoryName: 'ยูนิตลิงค์ & วางแผนมรดกพรีเมียม',
      name: 'AIA Infinite Wealth Prestige (Unit Linked)',
      tagline: 'ส่งต่อความมั่งคั่งเหนือกาลเวลา พร้อมโอกาสเติบโตในกองทุนระดับโลก',
      coverageAmount: 'ทุนประกันชีวิตสูงสุด 50,000,000 บาท',
      startingPrice: 'เริ่มต้น 250,000 บ./ปี',
      features: JSON.stringify([
        'คัดสรรกองทุนระดับเวิลด์คลาส บริหารโดยผู้จัดการกองทุนชั้นนำระดับสากล',
        'ส่งต่อความมั่งคั่งให้ทายาทโดยตรงแบบปลอดภาษีมรดก',
        'สับเปลี่ยนกองทุนฟรีไม่มีค่าธรรมเนียมตลอดอายุสัญญา',
        'ความยืดหยุ่นสูง ปรับเปลี่ยนสัดส่วนเบี้ยและถอนเงินบางส่วนเมื่อจำเป็น',
      ]),
      recommendedFor: 'เจ้าของธุรกิจ, ผู้มีความมั่งคั่งสูง (HNW), ผู้ที่ต้องการวางแผนสถาปัตยกรรมมรดก',
      description: 'โซลูชันทางการเงินระดับไฮเอนด์ที่ผสานความคุ้มครองชีวิตระดับสูงเข้ากับโอกาสสร้างผลตอบแทนจากการลงทุนระดับโลก เพื่อการส่งต่อมรดกอย่างมั่นคงและสง่างาม',
      imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80',
      isActive: true,
      sortOrder: 8,
    },
    {
      slug: 'aia-senior-happy',
      type: 'LIFE',
      category: 'SENIOR',
      categoryName: 'ประกันสุขภาพและอุบัติเหตุวัยเกษียณ',
      name: 'AIA Senior Happy อุ่นใจวัยเกษียณ',
      tagline: 'สมัครง่าย ไม่ต้องตรวจและไม่ต้องตอบคำถามสุขภาพ คุ้มครองอุบัติเหตุและกระดูกแตกหัก',
      coverageAmount: 'ทุนความคุ้มครองสูงสุด 1,000,000 บาท',
      startingPrice: 'เริ่มต้น 1,100 บ./เดือน',
      features: JSON.stringify([
        'อายุรับประกัน 50-75 ปี คุ้มครองยาวต่อเนื่องถึงอายุ 90 ปี',
        'หมดกังวลเรื่องโรคประจำตัว ไม่ต้องตรวจสุขภาพและไม่ต้องตอบคำถามสุขภาพ',
        'คุ้มครองค่ารักษาพยาบาลจากอุบัติเหตุและการลื่นหกล้มในผู้สูงอายุ',
        'เงินชดเชยกรณีสูญเสียอวัยวะหรือกระดูกแตกหักจากอุบัติเหตุ',
      ]),
      recommendedFor: 'ผู้สูงอายุ 50 ปีขึ้นไป, บุตรหลานที่ต้องการมอบความอุ่นใจในการดูแลคุณพ่อคุณแม่',
      description: 'หลักประกันความอุ่นใจสำหรับผู้สูงวัย เข้าใจข้อจำกัดเรื่องสุขภาพ สมัครง่าย ให้ผู้สูงอายุใช้ชีวิตวัยเกษียณได้อย่างมั่นใจและมีศักดิ์ศรี',
      imageUrl: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=800&auto=format&fit=crop&q=80',
      isActive: true,
      sortOrder: 9,
    },
    {
      slug: 'aia-keyman-executive-plan',
      type: 'LIFE',
      category: 'BUSINESS',
      categoryName: 'ประกันบุคคลสำคัญ (Keyman Protection)',
      name: 'AIA Keyman Executive Protection',
      tagline: 'คุ้มครองความต่อเนื่องของธุรกิจ บริหารความเสี่ยงกรรมการ และสิทธิประโยชน์ภาษีนิติบุคคล',
      coverageAmount: 'ทุนประกันตามมูลค่าธุรกิจ สูงสุด 30,000,000 บาท',
      startingPrice: 'ตามโครงสร้างทางการเงินของบริษัท',
      features: JSON.stringify([
        'เบี้ยประกันสามารถบันทึกเป็นรายจ่ายของบริษัทได้ตามประมวลรัษฎากร มาตรา 65 ทวิ (3)',
        'ปกป้องกระแสเงินสดขององค์กรหากเกิดเหตุการณ์ไม่คาดฝันกับกรรมการผู้มีอำนาจ',
        'ใช้เป็นสวัสดิการตอบแทนพิเศษหรือกองทุนเงินชดเชยเมื่อเกษียณอายุ',
        'เสริมเสถียรภาพความมั่นคงและความเชื่อมั่นให้กับสถาบันการเงินและคู่ค้าธุรกิจ',
      ]),
      recommendedFor: 'เจ้าของกิจการนิติบุคคล, กรรมการผู้จัดการ, หุ้นส่วนผู้จัดการ, ผู้บริหารระดับสูง',
      description: 'กลยุทธ์การบริหารความเสี่ยงระดับองค์กร เปลี่ยนค่าใช้จ่ายภาษีให้เป็นทุนสำรองปกป้องกิจการ และสร้างหลักประกันความต่อเนื่องให้ธุรกิจเติบโตอย่างยั่งยืน',
      imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80',
      isActive: true,
      sortOrder: 10,
    },
    {
      slug: 'aia-smart-tax-care',
      type: 'LIFE',
      category: 'TAX',
      categoryName: 'ประกันออมทรัพย์ลดหย่อนภาษี',
      name: 'AIA Smart Tax Care 10/5',
      tagline: 'ชำระเบี้ยสั้นเพียง 5 ปี คุ้มครอง 10 ปี รับเงินคืนแน่นอนทุกปี ลดหย่อนภาษีเต็มสิทธิ',
      coverageAmount: 'ผลประโยชน์รวมตลอดสัญญา 145% ของทุนประกัน',
      startingPrice: 'เริ่มต้น 30,000 บ./ปี',
      features: JSON.stringify([
        'ชำระเบี้ยสั้นเพียง 5 ปี ได้รับความคุ้มครองยาวนาน 10 ปี',
        'รับเงินคืนเข้าบัญชีแน่นอนทุกสิ้นปีกรมธรรม์ 4% ของทุนประกันภัย',
        'ใช้สิทธิลดหย่อนภาษีเงินได้บุคคลธรรมดาได้สูงสุด 100,000 บาทต่อปี',
        'รับเงินครบกำหนดสัญญาคืน 125% ของทุนประกันภัย ณ สิ้นปีที่ 10',
      ]),
      recommendedFor: 'คนทำงานประจำที่เสียภาษีฐาน 15%-35%, ผู้ต้องการพักเงินในสินทรัพย์ผลตอบแทนแน่นอน',
      description: 'แผนการออมเงินที่คุ้มค่ารอบด้าน การันตีผลตอบแทนแน่นอน ไม่ผันผวนตามตลาด พร้อมสิทธิประโยชน์ในการประหยัดภาษีสูงสุดอย่างเต็มเม็ดเต็มหน่วย',
      imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80',
      isActive: true,
      sortOrder: 11,
    },
    {
      slug: 'aia-critical-care-prestige',
      type: 'LIFE',
      category: 'CRITICAL_ILLNESS',
      categoryName: 'ประกันโรคร้ายแรงพรีเมียม Precision Care',
      name: 'AIA Critical Care Prestige (Targeted Therapy)',
      tagline: 'ยกระดับการรักษาโรคมะเร็งขั้นสูง เข้าถึงยานวัตกรรมมุ่งเป้าและการแพทย์แม่นยำ',
      coverageAmount: 'วงเงินค่ารักษาโรคร้ายแรง 15,000,000 บาท',
      startingPrice: 'เริ่มต้น 2,600 บ./เดือน',
      features: JSON.stringify([
        'ครอบคลุมค่ายานอกบัญชีหลัก Targeted Therapy และ Immunotherapy (ภูมิคุ้มกันบำบัด)',
        'คุ้มครองค่าตรวจทางพันธุศาสตร์เพื่อค้นหายาที่แม่นยำตรงจุด (Genomic Testing)',
        'เข้าถึงบริการความเห็นที่สองทางการแพทย์ (Second Medical Opinion) จากแพทย์ระดับโลก',
        'เงินชดเชยรายเดือนเพื่อดูแลครอบครัวอย่างต่อเนื่องนาน 24 เดือน',
      ]),
      recommendedFor: 'ผู้ที่ต้องการมาตรฐานการรักษาที่ดีที่สุด, ผู้ที่กังวลเรื่องภาระค่ายารักษามะเร็งมุ่งเป้า',
      description: 'นวัตกรรมความคุ้มครองโรคร้ายแรงระดับพรีเมียม เปิดประตูสู่เทคโนโลยีการแพทย์แม่นยำยุคใหม่ เพื่อให้คุณและคนที่คุณรักได้รับการรักษาที่ดีที่สุดโดยไร้ข้อจำกัดทางการเงิน',
      imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=80',
      isActive: true,
      sortOrder: 12,
    },
  ];

  for (const plan of insurancePlans) {
    await prisma.insurancePlan.upsert({
      where: { slug: plan.slug },
      update: plan,
      create: plan,
    });
  }
  console.log(`📋 Insurance Plans seeded: ${insurancePlans.length} plans ready`);

  // 3. Seed Earth & Energy (แร่ธาตุ คริสตัล คัดสรรโดย Admin B & Admin A ตามหลักวิทยาศาสตร์และจักระ)
  const products = [
    {
      name: 'หินไหมทองจักรพรรดิ (Golden Rutilated Quartz)',
      category: 'อำนาจ & ความมั่งคั่ง',
      price: 3590.0,
      stoneType: 'ควอตซ์ใส เส้นไหมทองแน่นประกายรุ้ง 12mm',
      dayOfWeek: 'วันพฤหัสบดี, วันจันทร์',
      aspect: 'SCIENCE',
      chakra: 'จักระที่ 3 มณีปุระ (Solar Plexus Chakra)',
      mineralFormula: 'SiO₂ with TiO₂ Rutile Needles',
      isCurated: true,
      description: 'ผลึกควอตซ์ธรรมชาติที่มีแร่รูไทล์ (Titanium Dioxide) ก่อตัวเป็นเส้นไหมสีทองสว่างภายใน ทางฟิสิกส์แร่ธาตุ ควอตซ์มีคุณสมบัติเพียโซอิเล็กทริก (Piezoelectric) ที่ช่วยสร้างความถี่คงที่ เสริมความมั่นคงทางอารมณ์ และเป็นตัวแทนของการขยายขอบเขตความมั่งคั่งและอำนาจการตัดสินใจ',
      imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop&q=80',
      isActive: true,
    },
    {
      name: 'สร้อยข้อมือหินลาพิส ลาซูลี (Lapis Lazuli Royal Grade)',
      category: 'ปัญญาญาณ & วิสัยทัศน์',
      price: 1890.0,
      stoneType: 'หินลาพิส ลาซูลี ลวดลายละอองทองไพไรต์ 10mm',
      dayOfWeek: 'วันพุธ, วันศุกร์',
      aspect: 'HISTORY',
      chakra: 'จักระที่ 6 อาชญา (Third Eye Chakra)',
      mineralFormula: '(Na,Ca)₈(AlSiO₄)₆(S,SO₄,Cl)₁₋₂ + FeS₂',
      isCurated: true,
      description: 'หินสีน้ำเงินครามแห่งราชวงศ์อียิปต์โบราณและเมโสโปเตเมีย มีประวัติศาสตร์กว่า 6,000 ปี ในฐานะสัญลักษณ์แห่งสัจจะ ปัญญา และความสง่างาม ผสมผสานแร่ไพไรต์ประกายทอง ช่วยกระตุ้นสมาธิ การสื่อสารที่มีพลัง และการมองเห็นโอกาสใหม่ๆ',
      imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80',
      isActive: true,
    },
    {
      name: 'สร้อยข้อมือโรสควอตซ์มาดากัสการ์ (Rose Quartz Madagascar)',
      category: 'ความรัก & ความเมตตา',
      price: 1290.0,
      stoneType: 'โรสควอตซ์เกรดท็อป สีชมพูโปร่งแสง 10mm',
      dayOfWeek: 'วันศุกร์, วันอังคาร',
      aspect: 'CHAKRA_ENERGY',
      chakra: 'จักระที่ 4 อนาหตะ (Heart Chakra)',
      mineralFormula: 'SiO₂ with Manganese / Titanium inclusions',
      isCurated: true,
      description: 'คริสตัลแห่งการเยียวยาหัวใจและความสัมพันธ์อันอบอุ่น คลื่นความถี่อ่อนโยนช่วยคลายความตึงเครียดทางอารมณ์ เสริมสร้างความเมตตาต่อตนเองและคนรอบข้าง เป็นสะพานเชื่อมระหว่างโลกกายภาพและโลกภายใน',
      imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop&q=80',
      isActive: true,
    },
    {
      name: 'ผลึกอเมทิสต์อุรุกวัยสีเข้ม (Deep Purple Amethyst Uruguayan)',
      category: 'ความสงบ & สุขภาพการนอน',
      price: 2490.0,
      stoneType: 'อเมทิสต์เนื้อแก้วสีม่วงเข้มธรรมชาติ 10mm',
      dayOfWeek: 'วันเสาร์, วันพุธกลางคืน',
      aspect: 'SCIENCE',
      chakra: 'จักระที่ 7 สหัสราระ (Crown Chakra)',
      mineralFormula: 'SiO₂ with Fe³⁺ Irradiation Lattice',
      isCurated: true,
      description: 'อเมทิสต์คุณภาพสูงจากอุรุกวัย สีม่วงเข้มลึกเกิดจากรังสีธรรมชาติที่ทำปฏิกิริยากับธาตุเหล็กในโครงตาข่ายซิลิกา ได้รับการยอมรับด้านการกล่อมเกลาคลื่นสมองสู่ระดับ Alpha และ Theta ช่วยลดภาวะ Mental Fatigue และส่งเสริมการนอนหลับลึกอย่างมีคุณภาพ',
      imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
      isActive: true,
    },
    {
      name: 'สร้อยข้อมือหินไทเกอร์อายสามกษัตริย์ (Triple Tiger Eye)',
      category: 'การปกป้อง & การตัดสินใจ',
      price: 1490.0,
      stoneType: 'โกลเด้น, เรด, และบลูไทเกอร์อาย 10mm',
      dayOfWeek: 'วันพฤหัสบดี, วันอาทิตย์',
      aspect: 'CULTURE',
      chakra: 'จักระที่ 3 มณีปุระ & จักระที่ 1 มูลธาร',
      mineralFormula: 'SiO₂ Quartz pseudomorph after Crocidolite',
      isCurated: true,
      description: 'ปรากฏการณ์เหลือบแสงแชโตยานซี (Chatoyancy) เสริมมุมมองที่รอบด้าน คมชัด และกล้าหาญ ช่วยให้จิตใจนิ่งสงบเมื่อต้องเผชิญกับสถานการณ์ซับซ้อนและการตัดสินใจครั้งสำคัญในชีวิตและการงาน',
      imageUrl: 'https://images.unsplash.com/photo-1611591475871-33157f49553b?w=800&auto=format&fit=crop&q=80',
      isActive: true,
    },
    {
      name: 'แบล็คทัวร์มาลีนธรรมชาติ (Raw Black Tourmaline - Schorl)',
      category: 'การปกป้อง & กราวด์ดิ้ง',
      price: 1690.0,
      stoneType: 'แบล็คทัวร์มาลีนแท้ ผิวซิกแซกตามธรรมชาติ 10mm',
      dayOfWeek: 'วันเสาร์, วันอังคาร',
      aspect: 'SCIENCE',
      chakra: 'จักระที่ 1 มูลธาร (Root Chakra)',
      mineralFormula: 'NaFe³⁺₃Al₆(BO₃)₃Si₆O₁₈(OH)₄',
      isCurated: true,
      description: 'แร่ทัวร์มาลีนดำ มีคุณสมบัติไพโรอิเล็กทริกและเพียโซอิเล็กทริกที่สามารถสร้างประจุไฟฟ้าอ่อนๆ เมื่อได้รับแรงกดหรือความร้อน ทำหน้าที่เป็นตัวดูดซับคลื่นแม่เหล็กไฟฟ้า (EMF Shielding) และช่วย Grounding ดึงพลังงานส่วนเกินลงสู่พื้นดิน คืนความสมดุลให้ระบบประสาท',
      imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80',
      isActive: true,
    },
    {
      name: 'มาลาไคต์ลวดลายธรรมชาติ (Congo Malachite Specimen)',
      category: 'การเยียวยา & การเติบโต',
      price: 2890.0,
      stoneType: 'มาลาไคต์สีเขียวมรกตลายริ้วกลม 10mm',
      dayOfWeek: 'วันพุธ, วันพฤหัสบดี',
      aspect: 'HISTORY',
      chakra: 'จักระที่ 4 อนาหตะ (Heart Chakra)',
      mineralFormula: 'Cu₂CO₃(OH)₂',
      isCurated: true,
      description: 'แร่คอปเปอร์คาร์บอเนตสีเขียวเหนี่ยวนำที่มีประวัติศาสตร์การใช้งานตั้งแต่สมัยอียิปต์โบราณ เป็นตัวแทนของการผลัดเปลี่ยนและการเติบโตใหม่ ชะล้างอารมณ์ตกค้าง และเปิดรับวิสัยทัศน์ที่สดใส',
      imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80',
      isActive: true,
    },
    {
      name: 'ซิทรินธรรมชาติแสงตะวัน (Natural Golden Citrine)',
      category: 'ความสดใส & แรงผลักดัน',
      price: 2190.0,
      stoneType: 'ซิทรินสีทองอำพันธรรมชาติไม่ผ่านการเผา 10mm',
      dayOfWeek: 'วันจันทร์, วันพฤหัสบดี',
      aspect: 'CHAKRA_ENERGY',
      chakra: 'จักระที่ 3 มณีปุระ (Solar Plexus Chakra)',
      mineralFormula: 'SiO₂ with Iron Color Centers',
      isCurated: true,
      description: 'หินแห่งแสงอาทิตย์และพลังแห่งความมีชีวิตชีวา ช่วยปลุกไฟในการสร้างสรรค์ เสริมความมั่นใจในศักยภาพตนเอง และดึงดูดพลังงานบวกในทุกย่างก้าวของการทำงาน',
      imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80',
      isActive: true,
    },
    {
      name: 'ผลึกอเมทิสต์โพรงธรรมชาติ (Amethyst Cathedral Geode)',
      category: 'ความสงบ & สมาธิขั้นสูง',
      price: 8900.0,
      stoneType: 'โพรงผลึกอเมทิสต์ธรรมชาติจากอุรุกวัย เนื้อสีม่วงเข้มแกมน้ำเงิน',
      dayOfWeek: 'วันเสาร์, วันพุธกลางคืน',
      aspect: 'SCIENCE',
      chakra: 'จักระที่ 6 และ 7 (Third Eye & Crown)',
      mineralFormula: 'SiO₂ with Fe³⁺ Irradiation Centers',
      isCurated: true,
      description: 'ผลึกอเมทิสต์โพรงธรรมชาติระดับสะสม โครงสร้างผลึกซิลิกาที่มีอะตอมเหล็ก (Fe³⁺) ผ่านการแผ่รังสีธรรมชาติใต้พิภพจนเกิดเฉดสีม่วงล้ำลึก ทางชีวฟิสิกส์คลื่นความถี่ช่วยกระตุ้นคลื่นสมองระดับ Alpha ลดความฟุ้งซ่าน และสร้างสนามพลังแห่งความสงบในพื้นที่ทำงานหรือห้องสมาธิ',
      imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
      isActive: true,
    },
    {
      name: 'แบล็คทัวร์มาลีนธรรมชาติ (Black Tourmaline Schorl)',
      category: 'การปกป้อง & กราวน์ดิง (Grounding)',
      price: 1650.0,
      stoneType: 'ผลึกทัวร์มาลีนดำธรรมชาติทรงแท่งปริซึม 8-10cm จากมาดากัสการ์',
      dayOfWeek: 'วันเสาร์, วันอังคาร',
      aspect: 'SCIENCE',
      chakra: 'จักระที่ 1 มูลาธาระ (Root Chakra)',
      mineralFormula: 'NaFe₃Al₆(BO₃)₃Si₆O₁₈(OH)₄',
      isCurated: true,
      description: 'แร่กลุ่มซิลิเกตเชิงซ้อนที่มีสมบัติไพโรอิเล็กทริก (Pyroelectricity) และเพียโซอิเล็กทริก สามารถปล่อยประจุลบ (Negative Ions) ธรรมชาติ ช่วยดูดซับสนามแม่เหล็กไฟฟ้า (EMF) จากคอมพิวเตอร์และมือถือ พร้อมทั้งเชื่อมโยงจิตสำนึกเข้ากับพลังงานแห่งพื้นพิภพ สร้างความรู้สึกมั่นคงปลอดภัย',
      imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=80',
      isActive: true,
    },
    {
      name: 'ผลึกเซเลสไทต์สีฟ้าสวรรค์ (Celestite Geode Cluster)',
      category: 'ความเยือกเย็น & การสื่อสารแห่งจิต',
      price: 3450.0,
      stoneType: 'กลุ่มผลึกเซเลสไทต์ธรรมชาติสีฟ้าอ่อนใสดุจท้องฟ้า',
      dayOfWeek: 'วันศุกร์, วันพุธ',
      aspect: 'CHAKRA_ENERGY',
      chakra: 'จักระที่ 5 และ 7 (Throat & Crown)',
      mineralFormula: 'SrSO₄ (Strontium Sulfate)',
      isCurated: true,
      description: 'แร่สตรอนเชียมซัลเฟตสีฟ้าอ่อนนุ่มนวล ก่อตัวในโพรงหินตะกอนโบราณ พลังงานความถี่ที่แผ่ออกมาเปรียบดั่งสายลมเย็น ช่วยปลอบประโลมระบบประสาทที่เหนื่อยล้า บรรเทาความวิตกกังวล และเปิดช่องสัญญาณการสื่อสารจากความจริงใจภายใน',
      imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80',
      isActive: true,
    },
    {
      name: 'ผลึกไพไรต์ประกายทอง (Pyrite Golden Cluster)',
      category: 'ความมั่งคั่ง & พลังขับเคลื่อนชีวิต',
      price: 2200.0,
      stoneType: 'กลุ่มผลึกลูกบาศก์ไพไรต์เนื้อแวววาวประกายทองคำแท้จากเปรู',
      dayOfWeek: 'วันอาทิตย์, วันพฤหัสบดี',
      aspect: 'HISTORY',
      chakra: 'จักระที่ 3 มณีปุระ (Solar Plexus Chakra)',
      mineralFormula: 'FeS₂ (Iron Disulfide)',
      isCurated: true,
      description: 'หรือที่รู้จักในนาม "ทองคนโง่" (Fool\'s Gold) แต่ในทางประวัติศาสตร์แร่ธาตุ ไพไรต์คือสัญลักษณ์แห่งดวงอาทิตย์ ความทะเยอทะยาน และความเฉลียวฉลาดทางการเงิน ช่วยจุดประกายไฟแห่งความมุ่งมั่น เพิ่มพลังใจในการบริหารจัดการอุปสรรค และดึงดูดกระแสทรัพย์สิน',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
      isActive: true,
    },
    {
      name: 'อความารีนดิบธรรมชาติ (Aquamarine Raw Gemstone)',
      category: 'ความสงบแห่งสายน้ำ & ปัญญาญาณ',
      price: 4200.0,
      stoneType: 'ผลึกหกเหลี่ยมอความารีนเนื้อใสสีฟ้าน้ำทะเลจากนามิเบีย',
      dayOfWeek: 'วันศุกร์, วันจันทร์',
      aspect: 'SCIENCE',
      chakra: 'จักระที่ 5 วิสุทธิ (Throat Chakra)',
      mineralFormula: 'Be₃Al₂Si₆O₁₈ + Fe²⁺',
      isCurated: true,
      description: 'อัญมณีตระกูลเบริลที่ได้สีฟ้าสดใสจากไอออนเหล็ก (Fe²⁺) เปรียบเสมือนหยดน้ำบริสุทธิ์จากมหาสมุทร มีชื่อเสียงในประวัติศาสตร์ว่าเป็นหินคุ้มครองนักเดินทาง ช่วยให้จิตใจนิ่งสงบ ดับความโกรธ และเสริมความกล้าหาญในการเจรจาความสำคัญ',
      imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=80',
      isActive: true,
    },
    {
      name: 'มูนสโตนเหลือบสีรุ้ง (Rainbow Moonstone Adularescence)',
      category: 'สัญชาตญาณ & การเกิดใหม่ของพลังบวก',
      price: 2850.0,
      stoneType: 'หินมูนสโตนเนื้อกึ่งโปร่งแสงเหลือบแสงสีฟ้าประกายรุ้ง 10mm',
      dayOfWeek: 'วันจันทร์, วันศุกร์',
      aspect: 'CULTURE',
      chakra: 'จักระที่ 2 สวาธิษฐาน (Sacral Chakra)',
      mineralFormula: 'KAlSi₃O₈ (Potassium Feldspar)',
      isCurated: true,
      description: 'หินแห่งแสงจันทร์และการสะท้อนแสงแบบแอดูลาเรสเซนซ์ (Adularescence) ที่เกิดจากการแทรกชั้นของแร่เฟลด์สปาร์สองชนิด ส่งเสริมความสมดุลของฮอร์โมนและอารมณ์ ปลุกพลังสัญชาตญาณ และเปิดรับความคิดสร้างสรรค์ใหม่ๆ อย่างเป็นธรรมชาติ',
      imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop&q=80',
      isActive: true,
    },
    {
      name: 'คาร์เนเลียนเปลวเพลิงสมาธิ (Carnelian Flame Meditation Stone)',
      category: 'แรงบันดาลใจ & ความกล้าหาญ',
      price: 1490.0,
      stoneType: 'หินคาร์เนเลียนขัดเงารูปทรงเปลวไฟ สีส้มแสดธรรมชาติ 7-8cm',
      dayOfWeek: 'วันอังคาร, วันอาทิตย์',
      aspect: 'CHAKRA_ENERGY',
      chakra: 'จักระที่ 2 สวาธิษฐาน (Sacral Chakra)',
      mineralFormula: 'SiO₂ (Microcrystalline Chalcedony with Iron Oxide)',
      isCurated: true,
      description: 'แร่คาลซิโดนีที่มีสีส้มสดใสจากเหล็กออกไซด์ เป็นตัวแทนของพลังแห่งการลงมือทำ ช่วยขจัดความเฉื่อยชา เติมเต็มความมั่นใจในตนเอง และช่วยเสริมพลังการเจริญสมาธิในเรื่องของการก้าวข้ามขีดจำกัดเดิม',
      imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80',
      isActive: true,
    },
    {
      name: 'แท่งเซเลไนต์แสงจันทร์ (Selenite Satin Spar Energy Wand)',
      category: 'การชำระล้าง & ความกระจ่างใสแห่งจิต',
      price: 990.0,
      stoneType: 'แท่งเซเลไนต์เส้นใยแก้วธรรมชาติขัดเงาปลายแหลม 15cm จากโมร็อกโก',
      dayOfWeek: 'ทุกวัน, วันจันทร์',
      aspect: 'CHAKRA_ENERGY',
      chakra: 'จักระที่ 7 สหัสราระ (Crown Chakra)',
      mineralFormula: 'CaSO₄·2H₂O (Hydrous Calcium Sulfate)',
      isCurated: true,
      description: 'แร่ยิปซัมโครงสร้างเส้นใยขนานที่มีความเงาคล้ายผ้าไหมซาติน ขึ้นชื่อเรื่องคุณสมบัติในการล้างพลังงานลบตกค้างในพื้นที่อยู่อาศัยและชำระล้างพลังงานของหินชิ้นอื่น ช่วยให้ความคิดปลอดโปร่งและสร้างบรรยากาศที่บริสุทธิ์รอบตัว',
      imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop&q=80',
      isActive: true,
    },
  ];

  for (const prod of products) {
    const existing = await prisma.product.findFirst({ where: { name: prod.name } });
    if (existing) {
      await prisma.product.update({ where: { id: existing.id }, data: prod });
    } else {
      await prisma.product.create({ data: prod });
    }
  }
  console.log(`💎 Earth & Energy Curated Products seeded: ${products.length} items ready`);

  // 4. Seed Posts Across All 7 Content Pillars (Life, Wealth, Wellbeing, Inner Life, Earth Energy, Journal, About)
  const posts = [
    // --- PILLAR 1: LIFE ---
    {
      slug: 'balance-6-dimensions-of-life',
      title: 'สมดุล 6 มิติของชีวิต: เมื่อความสำเร็จไม่ได้วัดแค่ตัวเลขในบัญชีธนาคาร',
      category: 'วิถีชีวิต & สมดุล',
      pillar: 'LIFE',
      postType: 'ARTICLE',
      authorName: 'Admin A & Admin B',
      readTime: '6 นาที',
      tags: '#LifeDesign #Balance #Longevity #Happiness',
      excerpt: 'สำรวจกรอบความคิด Living Wealth 6 Dimensions: สุขภาพ ความมั่งคั่ง เวลา ความสัมพันธ์ โลกภายใน และเป้าหมายชีวิต เพื่อสร้างชีวิตที่สมบูรณ์แบบในแบบฉบับของคุณ',
      content: `ชีวิตที่ได้รับการวางแผนมาอย่างดี ไม่ใช่ชีวิตที่ตึงเครียดหรือเต็มไปด้วยกรอบเกณฑ์ที่อึดอัด แต่คือชีวิตที่มี "พื้นที่ว่าง" ให้เราได้หายใจ ได้มีความสุขกับผู้คนรอบข้าง และได้ทำในสิ่งที่มีความหมายอย่างแท้จริง

ในโลกยุคใหม่ที่ความเร่งรีบกลายเป็นมาตรฐาน เรามักถูกสอนให้วัดความสำเร็จจากตัวเลขในบัญชี ตำแหน่งหน้าที่การงาน หรือทรัพย์สินที่จับต้องได้ แต่เมื่อเวลาผ่านไป หลายคนกลับพบว่าเมื่อไปถึงจุดสูงสุดเหล่านั้น จิตใจกลับว่างเปล่า สุขภาพทรุดโทรม และความสัมพันธ์ที่สำคัญกลับห่างเหิน

ที่ Living Wealth 365 เราเชื่อใน "A Life Well Planned. A Life Well Lived." ซึ่งประกอบด้วย 6 มิติหลัก:
1. **Health (สุขภาพกาย):** ฐานรากที่สำคัญที่สุด ร่างกายที่แข็งแรงทำให้เรามีพลังงานไปทำทุกสิ่ง
2. **Wealth (ความมั่นคงทางการเงิน):** เครื่องมือที่สร้างความอุ่นใจและอิสรภาพในการเลือก
3. **Time (เวลา):** สินทรัพย์ที่มีจำกัดที่สุด การได้ใช้เวลากับสิ่งที่เราแคร์คือความร่ำรวยที่แท้จริง
4. **Relationship (ความสัมพันธ์):** ความอบอุ่น ความผูกพัน และผู้คนที่เป็นพื้นที่ปลอดภัย
5. **Inner Life (โลกภายใน & ความสงบ):** จิตใจที่มั่นคง ท่ามกลางความผันผวนของโลกภายนอก
6. **Purpose (เป้าหมาย & คุณค่า):** การรู้ว่าเราตื่นขึ้นมาเพื่ออะไร และส่งมอบคุณค่าใดให้โลกใบนี้

วันนี้... ลองหยุดพักสักครู่ แล้วถามตัวเองดูว่า ใน 6 มิตินี้ มิติไหนที่คุณกำลังดูแลได้ดี และมิติไหนที่กำลังส่งสัญญาณเตือนให้คุณหันกลับมาดูแล`,
      imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80',
      published: true,
      authorId: topUser.id,
    },
    {
      slug: 'design-your-life-before-others-do',
      title: 'ออกแบบชีวิตก่อนที่ชีวิตจะถูกคนอื่นออกแบบ: บันทึกความคิดในวัย 35+',
      category: 'บทเรียนชีวิต',
      pillar: 'LIFE',
      postType: 'TOPS_NOTES',
      authorName: 'Admin A',
      readTime: '4 นาที',
      tags: '#AdminANotes #SelfReflection #LifePlanning',
      excerpt: 'ถ้าคุณไม่กำหนดลำดับความสำคัญในชีวิตตัวเอง คนอื่นจะเข้ามาจัดลำดับความสำคัญให้คุณอย่างแน่นอน บันทึกความคิดจากการทำงานและพูดคุยกับผู้คน',
      content: `เมื่อเข้าสู่วัย 35 สิ่งหนึ่งที่ตกผลึกชัดเจนมากคือ "เวลาไม่ได้ไหลไปข้างหน้าแบบไม่มีวันหมด" อีกต่อไป

เราเริ่มเห็นคนรุ่นพ่อแม่ค่อยๆ แก่ตัวลง สุขภาพของตัวเราเองเริ่มส่งสัญญาณเตือนหลังจากอดนอน และความรับผิดชอบรอบตัวก็เพิ่มขึ้นทวีคูณ

คำถามสำคัญไม่ใช่ "เราจะทำงานให้หนักขึ้นได้อย่างไร?" แต่เป็น "อะไรคือสิ่งที่เราอยากรักษาไว้มากที่สุด?"
- หากเราอยากรักษาครอบครัว เราได้ให้เวลากับพวกเขาจริงๆ หรือแค่ให้เวลาที่เหลือจากงาน?
- หากเราอยากรักษาสุขภาพ เราได้จัดเวลาออกกำลังกายและนอนหลับอย่างเคารพร่างกายหรือไม่?

การวางแผนชีวิต (Life Planning) จึงไม่ได้เริ่มต้นที่ตัวเลขผลตอบแทน แต่เริ่มต้นจากการกำหนดขอบเขตและคุณค่าว่า อะไรคือสิ่งที่คุณจะไม่ยอมแลกเด็ดขาด`,
      imageUrl: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&auto=format&fit=crop&q=80',
      published: true,
      authorId: topUser.id,
    },

    // --- PILLAR 2: WEALTH ---
    {
      slug: 'financial-architecture-4-pillars',
      title: 'สถาปัตยกรรมการเงิน 4 เสา: ปกป้อง เติบโต ส่งต่อ และอิสรภาพ',
      category: 'สถาปัตยกรรมการเงิน',
      pillar: 'WEALTH',
      postType: 'ARTICLE',
      authorName: 'Admin A & Admin B',
      readTime: '7 นาที',
      tags: '#WealthArchitecture #Protection #Investment #Estate',
      excerpt: 'การสร้างบ้านต้องมีรากฐานที่มั่นคง การวางแผนการเงินก็เช่นเดียวกัน หากมีแต่การลงทุนโดยไร้การปกป้อง พายุลูกเดียวก็อาจทำให้ทุกอย่างพังทลายลงได้',
      content: `หลายคนทุ่มเทเวลาศึกษาหุ้น คริปโต หรืออสังหาริมทรัพย์เพื่อหวังผลตอบแทน 10-20% แต่กลับละเลยฐานรากที่สำคัญที่สุด นั่นคือ "การปกป้องความมั่งคั่ง (Wealth Protection)"

สถาปัตยกรรมการเงิน 4 เสาของ Living Wealth ประกอบด้วย:

1. **เสาที่ 1: การปกป้อง (Protection & Risk Management)**
   ก่อนจะคิดว่าจะได้กำไรเท่าไหร่ ต้องถามตัวเองก่อนว่า ถ้าเกิดเหตุการณ์ไม่คาดฝัน เช่น โรคร้ายแรง อุบัติเหตุ หรือการจากไปก่อนวัยอันควร ใครจะมารับภาระค่าใช้จ่ายแทนเรา? การถ่ายโอนความเสี่ยงผ่านประกันสุขภาพและประกันชีวิตจึงเป็นเกราะกำบังชั้นแรก

2. **เสาที่ 2: สภาพคล่องและความมั่นคง (Emergency & Liquidity)**
   เงินสำรองฉุกเฉิน 6-12 เดือนของค่าใช้จ่าย ที่พร้อมใช้เสมอในวันที่เศรษฐกิจผันผวนหรือมีวิกฤต

3. **เสาที่ 3: การสะสมและเติบโต (Wealth Accumulation & Growth)**
   การลงทุนระยะยาวในสินทรัพย์ที่มีคุณภาพ ผ่านการกระจายความเสี่ยงอย่างเหมาะสม และการบริหารภาษีอย่างชาญฉลาดผ่านกองทุนและประกันบำนาญ

4. **เสาที่ 4: การส่งต่อมรดก (Wealth Transfer & Legacy)**
   การเตรียมความพร้อมในการส่งต่อสินทรัพย์สู่ทายาทโดยไร้รอยต่อ ปลอดข้อพิพาท และได้รับสิทธิประโยชน์ทางภาษีสูงสุด

เมื่อทั้ง 4 เสานี้สมดุล คุณจะไม่ต้องกังวลว่าตลาดหุ้นจะขึ้นหรือลง เพราะฐานชีวิตของคุณมั่นคงแข็งแกร่งแล้ว`,
      imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=800&auto=format&fit=crop&q=80',
      published: true,
      authorId: topUser.id,
    },
    {
      slug: 'tax-planning-strategy-2025',
      title: 'วางแผนภาษีเชิงรุก 2568: สรุปกองทุน Thai ESG ประกันสุขภาพ และการสร้างเงินคืนภาษีสูงสุด',
      category: 'การวางแผนภาษี',
      pillar: 'WEALTH',
      postType: 'ARTICLE',
      authorName: 'Admin A & Admin B',
      readTime: '6 นาที',
      tags: '#TaxPlanning #ThaiESG #LifeInsurance #TaxRefund',
      excerpt: 'เจาะลึกกลยุทธ์การลดหย่อนภาษี 2568 อย่างเป็นระบบ ไม่ใช่แค่การซื้อเพื่อลดหย่อน แต่เป็นการต่อยอดเงินออมเพื่อความมั่งคั่งระยะยาว',
      content: `ภาษีไม่ใช่ค่าใช้จ่ายที่หลีกเลี่ยงไม่ได้ แต่เป็นสิ่งที่สามารถ "บริหารจัดการได้อย่างถูกกฎหมาย"

สำหรับปีภาษี 2568 รัฐบาลได้ปรับปรุงมาตรการส่งเสริมการออมและการลงทุนหลายประการ เช่น กองทุน Thai ESG ที่ให้สิทธิลดหย่อนสูงสุดถึง 300,000 บาท และถือครองเพียง 5 ปี

การจัดพอร์ตลดหย่อนภาษีที่มีประสิทธิภาพควรแบ่งเป็น 3 ตะกร้า:
- **ตะกร้าคุ้มครองและสุขภาพ:** ประกันชีวิตทั่วไป (สูงสุด 100,000 บ.) และประกันสุขภาพ (สูงสุด 25,000 บ.)
- **ตะกร้าเกษียณมั่นคง:** ประกันบำนาญ (สูงสุด 200,000 บ.) และ RMF / กองทุนสำรองเลี้ยงชีพ
- **ตะกร้าส่งเสริมความยั่งยืน:** กองทุน Thai ESG (สูงสุด 300,000 บ.)

ลองใช้เครื่องมือ **Living Wealth Tax Calculator** ของเราในการคำนวณและจำลองผลลัพธ์ภาษี เพื่อให้คุณเห็นภาพชัดเจนที่สุดว่าคุณจะประหยัดภาษีได้กี่บาทในแต่ละปี`,
      imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80',
      published: true,
      authorId: topUser.id,
    },

    // --- PILLAR 3: WELLBEING ---
    {
      slug: 'longevity-science-cellular-health',
      title: 'ศาสตร์แห่ง Longevity: ชะลอวัยระดับเซลล์ การนอนหลับ และการจัดการฮอร์โมนความเครียด',
      category: 'ศาสตร์แห่งอายุวัฒนะ',
      pillar: 'WELLBEING',
      postType: 'ARTICLE',
      authorName: 'Admin B',
      readTime: '6 นาที',
      tags: '#Longevity #SleepQuality #HealthSanctuary #Biohacking',
      excerpt: 'ไม่ใช่แค่อยู่ให้นานขึ้น แต่คือการอยู่ด้วยความกระปรี้กระเปร่าและปลอดจากโรคเรื้อรัง เจาะลึกวิทยาศาสตร์เบื้องหลังการฟื้นฟูเซลล์และการนอนหลับลึก',
      content: `คำว่า "Longevity" ในปัจจุบันไม่ได้หมายถึงเพียงแค่การมีชีวิตยืนยาวถึง 90 หรือ 100 ปี (Lifespan) แต่เน้นไปที่ "ช่วงเวลาของการมีสุขภาพที่ดี ปลอดจากโรคเรื้อรัง และพึ่งพาตนเองได้" (Healthspan)

วิทยาศาสตร์การแพทย์สมัยใหม่ค้นพบว่า ปัจจัยที่เร่งให้เซลล์แก่ตัวเร็วที่สุดคือ:
1. การอักเสบเรื้อรังระดับเซลล์ (Chronic Inflammation) จากอาหารแปรรูปและน้ำตาล
2. ภาวะนอนหลับไม่ลึกพอ ทำให้ระบบ Glymphatic System ในสมองไม่สามารถขับของเสียตกค้างออกไปได้
3. ฮอร์โมนคอร์ติซอล (Cortisol) ที่สูงค้างตลอดวันจากความเครียดเรื้อรัง

วิธีดูแลตัวเองง่ายๆ ที่คุณเริ่มทำได้คืนนี้:
- กำหนดเวลานอนให้สม่ำเสมอ หลีกเลี่ยงแสงสีฟ้าจากจอมือถือ 1 ชั่วโมงก่อนนอน
- สัมผัสแสงแดดยามเช้า 10-15 นาทีเพื่อรีเซ็ตนาฬิกาชีวภาพ (Circadian Rhythm)
- จัดมุมสงบในบ้านให้เป็น Health Sanctuary สำหรับการผ่อนคลายจิตใจ`,
      imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
      published: true,
      authorId: joyUser.id,
    },
    {
      slug: 'home-health-sanctuary-5-habits',
      title: 'สร้าง Health Sanctuary ที่บ้าน: 5 นิสัยเล็กๆ ที่เปลี่ยนสุขภาพกายและจิตใจของคุณทุกวัน',
      category: 'สุขภาพองค์รวม',
      pillar: 'WELLBEING',
      postType: 'ARTICLE',
      authorName: 'Admin B',
      readTime: '5 นาที',
      tags: '#Wellbeing #HomeSanctuary #MindfulLiving',
      excerpt: 'บ้านควรเป็นสถานที่ที่คุณได้ชาร์จพลังงานอย่างแท้จริง เคล็ดลับการปรับสิ่งแวดล้อม กลิ่น แสง และนิสัยประจำวันเพื่อยกระดับคุณภาพชีวิต',
      content: `บ้านไม่ใช่แค่ที่ซุกหัวนอน แต่คือสถานที่ที่ชะล้างความเหนื่อยล้าจากโลกภายนอก

5 นิสัยง่ายๆ ในการเปลี่ยนบ้านให้เป็น Sanctuary:
1. **Air Quality:** เปิดหน้าต่างให้อากาศหมุนเวียนในตอนเช้า และใช้เครื่องฟอกอากาศในห้องนอน
2. **Lighting:** ปรับแสงไฟยามเย็นให้อบอุ่น (Warm White) ช่วยส่งสัญญาณให้ร่างกายหลั่งเมลาโทนิน
3. **Natural Elements:** วางต้นไม้ฟอกอากาศหรือชิ้นงานแร่ธรรมชาติ เช่น ควอตซ์หรืออเมทิสต์ เพื่อสร้างจุดพักสายตา
4. **Hydration Ritual:** เริ่มต้นเช้าวันใหม่ด้วยน้ำอุ่น 1 แก้วเต็ม เพื่อกระตุ้นระบบเผาผลาญและการขับถ่าย
5. **No Phone Zone:** กำหนดพื้นที่ห้องนอนให้เป็นพื้นที่ปลอดหน้าจอ`,
      imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
      published: true,
      authorId: joyUser.id,
    },

    // --- PILLAR 4: INNER_LIFE ---
    {
      slug: 'the-art-of-stillness-modern-world',
      title: 'ศิลปะแห่งความเงียบ (The Art of Stillness): คืนความสงบให้จิตใจในโลกที่เร่งรีบ',
      category: 'โลกภายใน & สมาธิ',
      pillar: 'INNER_LIFE',
      postType: 'TOPS_NOTES',
      authorName: 'Admin A',
      readTime: '5 นาที',
      tags: '#InnerLife #Stillness #Mindfulness #MentalClarity',
      excerpt: 'ในยุคที่ทุกอย่างแข่งขันกันแย่งความสนใจของเรา ความเงียบและสมาธิกลายเป็นความหรูหราที่ประเมินค่าไม่ได้',
      content: `เรามักคิดว่าการพักผ่อนคือการดูซีรีส์ ไถฟีดโซเชียลมีเดีย หรือช้อปปิ้งออนไลน์ แต่แท้จริงแล้วสิ่งเหล่านั้นคือการป้อนข้อมูลใหม่เข้าไปในสมองที่ไม่เคยหยุดทำงาน

การพักผ่อนที่แท้จริงคือ "Stillness" — การอยู่กับตัวเองในความเงียบ

เมื่อเรานั่งนิ่งๆ สัก 10 นาที โดยไม่ทำอะไรเลย ไม่เช็กโทรศัพท์ ไม่ฟังพอดแคสต์ ในช่วงแรกเราจะรู้สึกกระสับกระส่าย แต่เมื่อผ่านจุดนั้นไป เราจะเริ่มได้ยินเสียงความคิดของตนเองชัดเจนขึ้น

ความเงียบไม่ได้แปลว่าว่างเปล่า แต่คือพื้นที่ที่ปัญญาญาณและการตัดสินใจที่ถูกต้องถือกำเนิดขึ้น`,
      imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80',
      published: true,
      authorId: topUser.id,
    },
    {
      slug: 'self-inquiry-emotional-freedom',
      title: 'การฝึกสังเกตใจตนเอง (Self-Inquiry) และการปลดล็อกพันธนาการทางอารมณ์',
      category: 'การเข้าใจตนเอง',
      pillar: 'INNER_LIFE',
      postType: 'ARTICLE',
      authorName: 'Admin A & Admin B',
      readTime: '6 นาที',
      tags: '#SelfInquiry #EmotionalWellness #InnerPeace',
      excerpt: 'เมื่อมีความโกรธ ความกลัว หรือความกังวลเกิดขึ้น แทนที่จะผลักไสหรือจมดิ่ง ลองเปลี่ยนมาเป็น "ผู้สังเกตการณ์" อย่างอ่อนโยน',
      content: `อารมณ์เป็นเหมือนสภาพอากาศบนท้องฟ้า บางวันแดดออก บางวันพายุเข้า แต่ท้องฟ้าไม่เคยเป็นพายุ ท้องฟ้าเป็นเพียงพื้นที่ที่พายุพัดผ่านเข้ามาแล้วก็ผ่านไป

เมื่อเราตระหนักรู้ว่า "เราไม่ใช่อารมณ์ แต่เราคือผู้รับรู้อารมณ์" เราจะได้รับอิสรภาพทางจิตใจอย่างมหาศาล

การฝึกฝนง่ายๆ เมื่อเกิดความเครียด:
1. หยุดหายใจเข้าลึกๆ 3 ครั้ง
2. ถามตัวเองว่า "ตอนนี้ร่างกายกำลังรู้สึกอย่างไรตรงไหน?" (เช่น หน้าอกแน่น ไหล่เกร็ง)
3. ยอมรับความรู้สึกนั้นโดยไม่ตัดสิน
4. เฝ้าดูมันค่อยๆ คลายตัวลงตามธรรมชาติ`,
      imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80',
      published: true,
      authorId: joyUser.id,
    },

    // --- PILLAR 5: EARTH_ENERGY ---
    {
      slug: 'mineral-science-piezoelectricity-crystals',
      title: 'วิทยาศาสตร์แร่ธาตุและคลื่นพลังงานธรรมชาติ: โครงสร้างผลึก SiO₂ และคุณสมบัติเพียโซอิเล็กทริก',
      category: 'วิทยาศาสตร์แร่ธาตุ',
      pillar: 'EARTH_ENERGY',
      postType: 'ARTICLE',
      authorName: 'Admin A',
      readTime: '7 นาที',
      tags: '#MineralScience #Quartz #Piezoelectric #CrystalPhysics',
      excerpt: 'สำรวจแร่ธาตุธรรมชาติผ่านมุมมองวิทยาศาสตร์ ธรณีวิทยา และฟิสิกส์ ทำไมควอตซ์จึงถูกใช้ในนาฬิกาและชิปคอมพิวเตอร์ทั่วโลก',
      content: `คริสตัลและแร่ธาตุธรรมชาติไม่ใช่เรื่องของความงมงาย แต่มีรากฐานทางธรณีวิทยาและฟิสิกส์ที่น่าทึ่ง

ควอตซ์ (Silicon Dioxide - SiO₂) มีโครงสร้างผลึกแบบหกเหลี่ยมที่เสถียรที่สุดชนิดหนึ่งในเปลือกโลก ในปี 1880 สองพี่น้องตระกูลกูว์รี (Jacques and Pierre Curie) ค้นพบปรากฏการณ์ที่เรียกว่า **Piezoelectricity**:
- เมื่อผลึกควอตซ์ได้รับแรงกล (ความดันหรือแรงบิด) มันจะสร้างประจุไฟฟ้าขึ้น
- และในทางกลับกัน เมื่อส่งกระแสไฟฟ้าเข้าไป ควอตซ์จะสั่นด้วยความถี่ที่แม่นยำอย่างยิ่ง (32,768 ครั้งต่อวินาที) ซึ่งเป็นหัวใจสำคัญของนาฬิกาควอตซ์และไมโครโปรเซสเซอร์ทั่วโลก

การนำแร่ธาตุธรรมชาติมาอยู่ใกล้ตัว จึงเป็นเสมือนการนำชิ้นส่วนของประวัติศาสตร์โลกที่ผ่านความกดดันและความร้อนมานับล้านปี มาเป็นเครื่องเตือนใจถึงความหนักแน่น มั่นคง และเป็นระเบียบของธรรมชาติ`,
      imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop&q=80',
      published: true,
      authorId: topUser.id,
    },
    {
      slug: '7-chakras-and-natural-gemstones',
      title: 'ศาสตร์แห่ง 7 จักระและการจัดสมดุลพลังงานร่างกายด้วยอัญมณีธรรมชาติ',
      category: 'จักระ & คลื่นความถี่',
      pillar: 'EARTH_ENERGY',
      postType: 'ARTICLE',
      authorName: 'Admin B',
      readTime: '6 นาที',
      tags: '#Chakras #EnergyHealing #Gemstones #HolisticWellness',
      excerpt: 'เข้าใจความเชื่อมโยงระหว่างศูนย์รวมพลังงาน 7 จุดในร่างกาย กับคลื่นความถี่ของสีและแร่ธรรมชาติเพื่อสร้างสมดุลกายใจ',
      content: `ในประเพณีเวชศาสตร์อายุรเวทและโยคะโบราณ ร่างกายมนุษย์มีศูนย์พลังงานหลัก 7 จุด เรียกว่า "จักระ (Chakra)" ซึ่งสอดคล้องกับต่อมไร้ท่อและระบบประสาทสำคัญในร่างกาย:

1. **Root Chakra (มูลธาร):** ความมั่นคง ปลอดภัย — หินสีดำ/แดง เช่น Black Tourmaline, Red Jasper
2. **Sacral Chakra (สวาธิษฐาน):** อารมณ์ ความคิดสร้างสรรค์ — หินสีส้ม เช่น Carnelian
3. **Solar Plexus (มณีปุระ):** อำนาจ ความมั่นใจ การตัดสินใจ — หินสีทอง/เหลือง เช่น Golden Rutilated Quartz, Citrine
4. **Heart Chakra (อนาหตะ):** ความรัก ความเมตตา การเยียวยา — หินสีชมพู/เขียว เช่น Rose Quartz, Malachite
5. **Throat Chakra (วิสุทธิ):** การสื่อสาร สัจจะ — หินสีฟ้า เช่น Aquamarine
6. **Third Eye (อาชญา):** ปัญญาญาณ สมาธิ วิสัยทัศน์ — หินสีน้ำเงินคราม เช่น Lapis Lazuli
7. **Crown Chakra (สหัสราระ):** ความตระหนักรู้ จิตวิญญาณ — หินสีม่วง/ขาวใส เช่น Amethyst, Clear Quartz

การเลือกใช้อัญมณีจึงเป็นเครื่องมือสนับสนุนการฝึกสติและการจัดระเบียบความคิด ให้คุณกลับคืนสู่จุดสมดุลในทุกวัน`,
      imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80',
      published: true,
      authorId: joyUser.id,
    },
    {
      slug: 'lapis-lazuli-history-4000-years',
      title: 'ประวัติศาสตร์ 4,000 ปีของ Lapis Lazuli: จากหินแห่งฟาโรห์สู่สัญลักษณ์แห่งปัญญา',
      category: 'ประวัติศาสตร์อารยธรรม',
      pillar: 'EARTH_ENERGY',
      postType: 'ARTICLE',
      authorName: 'Admin A',
      readTime: '5 นาที',
      tags: '#LapisLazuli #History #AncientEgypt #Ultramarine',
      excerpt: 'ย้อนรอยหินสีครามที่ล้ำค่ายิ่งกว่าทองคำในยุคโบราณ ประดับหน้ากากตุตันคาเมน และสีอัลตรามารีนของจิตรกรยุคเรเนสซองส์',
      content: `ในหุบเขาบาดัคชาน (Badakhshan) ดินแดนอัฟกานิสถานปัจจุบัน มีเหมืองหินที่เก่าแก่ที่สุดแห่งหนึ่งของมนุษยชาติ นั่นคือเหมืองลาพิส ลาซูลี ที่ถูกขุดมานานกว่า 6,000 ปี

ในอียิปต์โบราณ ลาพิสถูกยกย่องเป็นสัญลักษณ์แห่งท้องฟ้าและดวงดาว เครื่องประดับและหน้ากากทองคำของฟาโรห์ตุตันคาเมนฝังด้วยลาพิส ลาซูลี อย่างวิจิตรตระการตา

ในยุคเรเนสซองส์ ผงลาพิสถูกบดเป็นสี "อัลตรามารีน (Ultramarine)" สีน้ำเงินที่แพงที่สุดในโลก ซึ่งศิลปินเอกอย่างมีเกลันเจโลและเวอร์เมียร์สงวนไว้ใช้วาดเฉพาะฉลองพระองค์ของพระแม่มารีเท่านั้น

หินก้อนหนึ่งจึงไม่ได้เป็นเพียงแค่วัตถุ แต่คือแคปซูลกาลเวลาที่บันทึกความศรัทธาและภูมิปัญญาของมนุษยชาติเอาไว้`,
      imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop&q=80',
      published: true,
      authorId: topUser.id,
    },

    // --- PILLAR 6: JOURNAL ---
    {
      slug: 'tops-notes-listening-to-100-conversations',
      title: "Admin A's Notes: สิ่งที่เราได้ยินจากการสนทนาเรื่องชีวิตและการเงินกับผู้คนกว่า 100 คน",
      category: 'บันทึกของ Admin A',
      pillar: 'JOURNAL',
      postType: 'TOPS_NOTES',
      authorName: 'Admin A',
      readTime: '5 นาที',
      tags: '#AdminANotes #Conversations #LifeInsights',
      excerpt: 'เมื่อนั่งคุยกันอย่างเปิดใจ คนส่วนใหญ่ไม่ได้กังวลเรื่องผลตอบแทนหุ้น แต่กังวลเรื่องการไม่ได้ใช้ชีวิตกับคนที่พวกเขารัก',
      content: `ตลอด 1 ปีที่ผ่านมา ผมมีโอกาสได้นั่งคุยกับผู้คนหลากหลายสาขาอาชีพ ทั้งแพทย์ ผู้บริหาร เจ้าของกิจการฟรีแลนซ์ และคุณแม่ฟูลไทม์

สิ่งที่น่าประหลาดใจคือ ไม่ว่าจะมีความมั่งคั่งระดับใด ปัญหาลึกๆ ที่พวกเขารู้สึกมักคล้ายคลึงกัน:
1. "กลัวว่าวันหนึ่งเมื่อเกษียณแล้ว จะไม่มีความหมาย"
2. "รู้สึกผิดที่ต้องทำงานหนักจนพลาดช่วงเวลาเติบโตของลูก"
3. "มีความกังวลที่ไม่ชัดเจนว่า มีเงินเท่าไหร่ถึงจะพอและปลอดภัยจริงๆ"

เมื่อเราเปลี่ยนบทสนทนาจากการ "ขายผลิตภัณฑ์" มาเป็นการ "รับฟังชีวิต" คำตอบจะปรากฏขึ้นเองเสมอ

การวางแผนการเงินที่แท้จริง ไม่ใช่การบอกให้ใครประหยัดจนไม่มีความสุข แต่คือการช่วยให้พวกเขาเห็นภาพชัดเจนว่า พวกเขาสามารถใช้ชีวิตอย่างเบาใจได้จริง`,
      imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=800&auto=format&fit=crop&q=80',
      published: true,
      authorId: topUser.id,
    },
    {
      slug: 'joys-journey-madagascar-crystal-mines',
      title: "Admin B's Journey: การเดินทางสู่แหล่งกำเนิดหินธรรมชาติที่มาดากัสการ์ และสิ่งที่ธรรมชาติสอนเรา",
      category: 'บันทึกการเดินทาง',
      pillar: 'JOURNAL',
      postType: 'JOURNEY',
      authorName: 'Admin B',
      readTime: '6 นาที',
      tags: '#AdminBJourney #Madagascar #NatureWisdom #Curation',
      excerpt: 'บันทึกความประทับใจจากการเดินทางไปเลือกสรรผลึกโรสควอตซ์และอัญมณีด้วยตนเอง สัมผัสความบริสุทธิ์ของธรรมชาติและพลังที่แท้จริง',
      content: `มาดากัสการ์คือเกาะที่แยกตัวออกจากทวีปใหญ่มาหลายสิบล้านปี ดินแดนแห่งนี้จึงเปรียบเสมือนกล่องสมบัติทางธรณีวิทยาที่อุดมสมบูรณ์ไปด้วยผลึกแร่ธาตุหายาก

การได้ลงไปสัมผัสก้อนหินโรสควอตซ์ที่เพิ่งนำขึ้นมาจากใต้ดิน สัมผัสความเย็นและความใสที่ไร้การปรุงแต่ง ทำให้เราตระหนักว่า ธรรมชาติใช้เวลาเป็นร้อยล้านปีเพื่อสร้างความงดงามนี้ขึ้นมาอย่างไม่เร่งรีบ

มนุษย์เราเองก็เช่นกัน บางครั้งเราใจร้อนกับตัวเองมากเกินไป อยากเห็นผลลัพธ์ในชั่วข้ามคืน

แต่ผลึกหินเหล่านี้สอนเราเสมอว่า: "สิ่งที่ล้ำค่าและมั่นคงที่สุด ต้องใช้เวลาในการตกผลึก"`,
      imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
      published: true,
      authorId: joyUser.id,
    },
    {
      slug: 'exploring-meaning-of-living-well',
      title: 'Exploring: ร่วมเดินทางค้นหาความหมายของชีวิตที่ดีในทุกๆ วัน',
      category: 'การสำรวจความคิด',
      pillar: 'JOURNAL',
      postType: 'EXPLORING',
      authorName: 'Admin A & Admin B',
      readTime: '4 นาที',
      tags: '#Exploring #LivingWell #Community',
      excerpt: 'พื้นที่แห่งการตั้งคำถามและแลกเปลี่ยนมุมมอง เพื่อให้ทุกๆ 365 วันของคุณมีความหมายและงดงาม',
      content: `ชีวิตที่ดีไม่ได้มีสูตรสำเร็จตายตัว สิ่งที่ใช่สำหรับคนหนึ่ง อาจไม่ใช่สำหรับอีกคนหนึ่ง

หมวด Exploring ของ Living Wealth ถูกสร้างขึ้นมาเพื่อเป็นพื้นที่ทดลอง เป็นสมุดบันทึกร่วมกันระหว่างเรากับคุณ ในการสังเกตสิ่งเล็กๆ รอบตัว ที่ทำให้วันธรรมดาวันหนึ่งกลายเป็นวันที่น่าจดจำ

เราขอเชิญชวนคุณมาร่วมเป็นส่วนหนึ่งของการสำรวจนี้ ไม่ว่าคุณจะอยู่ในช่วงเริ่มต้นของชีวิตการทำงาน หรือกำลังเตรียมตัวสู่วัยเกษียณ`,
      imageUrl: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&auto=format&fit=crop&q=80',
      published: true,
      authorId: topUser.id,
    },

    // --- PILLAR 7: ABOUT ---
    {
      slug: 'about-living-wealth-365-philosophy',
      title: 'ปรัชญา Living Wealth 365: จุดเริ่มต้นจากความเชื่อใน A Life Well Planned. A Life Well Lived.',
      category: 'ปรัชญาและเรื่องราวของเรา',
      pillar: 'ABOUT',
      postType: 'ARTICLE',
      authorName: 'Admin A & Admin B',
      readTime: '5 นาที',
      tags: '#AboutUs #Philosophy #AdminAAndAdminB #LivingWealth365',
      excerpt: 'เรื่องราวของ Admin A & Admin B สองผู้ร่วมก่อตั้งที่เชื่อมั่นว่า การวางแผนชีวิตและการเชื่อมโยงกับพลังธรรมชาติสามารถเดินเคียงข้างกันได้อย่างงดงาม',
      content: `Living Wealth 365 ไม่ใช่บริษัทประกัน และไม่ใช่สำนักมูเตลูเชิงพาณิชย์

เราคือ "Life & Wellbeing Platform" ที่ถือกำเนิดขึ้นจากความตั้งใจของ Admin A นักวางแผนการเงินและชีวิตที่เชื่อในความรอบคอบและความมั่นคง และ Admin B ผู้หลงใหลในความงดงามของแร่ธาตุธรรมชาติ สุขภาพองค์รวม และวิถีชีวิตที่สงบสุข

เราพบว่า ผู้คนมักแยกเรื่อง "การเงิน" ออกจาก "สุขภาพจิตใจ"
- บางคนมีความมั่งคั่งแต่ใจร้อนรนและสุขภาพเสื่อมถอย
- บางคนแสวงหาความสงบและเครื่องยึดเหนี่ยวจิตใจ แต่กลับขาดการวางแผนความเสี่ยงที่จับต้องได้

Living Wealth 365 จึงเป็นสะพานเชื่อมระหว่าง "ศาสตร์แห่งโลกกายภาพ" (การวางแผนการเงิน ภาษี และการปกป้องความเสี่ยง) กับ "ศาสตร์แห่งโลกภายใน" (ความสงบ พลังงานธรรมชาติ และความสมดุลของชีวิต)

เราไม่ได้มาเป็นผู้รู้ที่คอยสั่ง แต่เราคือ "เพื่อนร่วมทาง (Fellow Travelers)" ที่พร้อมรับฟัง แลกเปลี่ยน และร่วมค้นหาวิถีชีวิตที่ใช่ที่สุดสำหรับคุณ`,
      imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80',
      published: true,
      authorId: topUser.id,
    },

    // --- EXPANDED 15 POSTS ACROSS 7 PILLARS ---
    // 1. LIFE: Non-Monetary Assets
    {
      slug: 'dignified-retirement-non-monetary-assets',
      title: 'เกษียณอย่างมีศักดิ์ศรี: ถอดรหัส 4 ปัจจัยที่เงินซื้อไม่ได้ (Non-Monetary Assets)',
      category: 'วิถีชีวิต & สมดุล',
      pillar: 'LIFE',
      postType: 'ARTICLE',
      authorName: 'Admin A',
      readTime: '7 นาที',
      tags: '#LifePlanning #Retirement #Dignity #NonMonetaryAssets',
      excerpt: 'ตัวเลขเงินเก็บในบัญชีอาจช่วยให้คุณจ่ายค่ากินอยู่ได้ แต่สิ่งที่จะทำให้ชีวิตวัยเกษียณมีความหมายและเต็มเปี่ยมด้วยศักดิ์ศรี คือสินทรัพย์ 4 ประการที่เงินซื้อไม่ได้',
      content: `เมื่อพูดถึงการวางแผนเกษียณ 99% ของบทสนทนามักมุ่งเน้นไปที่ "ต้องมีเงินกี่ล้านถึงจะพอ?"
แต่จากประสบการณ์การเป็นที่ปรึกษาการเงินและชีวิตมากว่าทศวรรษ เราพบว่า ผู้เกษียณที่มีเงิน 30-50 ล้านบาทจำนวนมาก กลับเผชิญกับภาวะซึมเศร้า ว้าเหว่ และสูญเสียตัวตน

แท้จริงแล้ว ชีวิตหลังเกษียณต้องการ "4 สินทรัพย์ที่เงินซื้อไม่ได้" (The 4 Non-Monetary Assets):

1. **Social Architecture (สถาปัตยกรรมทางความสัมพันธ์):**
เมื่อตำแหน่งงานในนามบัตรหายไป วงสนทนาทางธุรกิจจางหาย คุณเหลือใครที่คุณสามารถโทรหาและนั่งดื่มกาแฟคุยเรื่องธรรมดาๆ ได้อย่างสบายใจ? การสร้างกลุ่มเพื่อนต่างวัยและมิตรภาพที่แท้จริงต้องเริ่มตั้งแต่ก่อนเกษียณ

2. **Physical Autonomy (ความสามารถในการพึ่งพาตนเองทางกายภาพ):**
ความร่ำรวยที่แท้จริงในวัย 70-80 ปี ไม่ใช่การมีรถหรู แต่คือการลุกขึ้นจากเก้าอี้ได้เองโดยไม่ต้องมีคนพยุง สามารถเดินขึ้นบันได และเข้าห้องน้ำได้อย่างเป็นส่วนตัว การลงทุนในกล้ามเนื้อ (Muscle Mass) และความยืดหยุ่นคือประกันชีวิตที่มีค่าที่สุด

3. **Cognitive Reserve (คลังปัญญาและความอยากรู้อยากเห็น):**
สมองที่ไม่ถูกท้าทายจะเสื่อมถอยอย่างรวดเร็ว การเรียนรู้ทักษะใหม่ เช่น การจัดสวน การวาดภาพ หรือการเข้าใจปรัชญาธรรมชาติ จะช่วยสร้างเครือข่ายใยประสาทใหม่ๆ เสมอ

4. **Sense of Contribution (ความรู้สึกว่าตนเองยังมีคุณค่า):**
มนุษย์ต้องการรู้สึกว่าตนเองเป็นประโยชน์ต่อผู้อื่น ไม่ว่าจะเป็นการให้คำปรึกษาแก่รุ่นน้อง การทำงานจิตอาสา หรือการเป็นที่พึ่งพาทางจิตใจให้ลูกหลาน`,
      imageUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&auto=format&fit=crop&q=80',
      published: true,
      authorId: topUser.id,
    },
    // 2. LIFE: Universal Design Home
    {
      slug: 'universal-design-active-aging-home',
      title: 'ออกแบบพื้นที่อยู่อาศัยเพื่อผู้สูงวัย: Universal Design ที่ไม่ดูเหมือนโรงพยาบาล',
      category: 'วิถีชีวิต & สมดุล',
      pillar: 'LIFE',
      postType: 'JOURNEY',
      authorName: 'Admin A & Admin B',
      readTime: '6 นาที',
      tags: '#UniversalDesign #ActiveAging #LivingSpace #HomeArchitecture',
      excerpt: 'บ้านสำหรับผู้สูงอายุไม่จำเป็นต้องติดราวจับสแตนเลสสีเทาเย็นชาเหมือนหอผู้ป่วย แต่สามารถผสานสุนทรียภาพแห่งความอบอุ่น เข้ากับหลักวิศวกรรมความปลอดภัยได้อย่างลงตัว',
      content: `หลายครอบครัวรอให้เกิดอุบัติเหตุ "ลื่นล้ม" ก่อน ถึงจะเริ่มคิดเรื่องปรับปรุงบ้านสำหรับผู้สูงวัย
แต่ความจริงคือ อุบัติเหตุในห้องน้ำและบันไดบ้านคือสาเหตุอันดับต้นๆ ที่เปลี่ยนผู้สูงอายุจาก Active Aging ให้กลายเป็นผู้ป่วยติดเตียง

จากประสบการณ์ที่ Admin A & Admin B ได้ร่วมศึกษาและปรับปรุงพื้นที่บ้านพักอาศัย นี่คือ 5 หลักการออกแบบ Universal Design สไตล์ Zen Warmth:

1. **Zero-Threshold Living (พื้นระนาบเดียวกันทั้งบ้าน):**
ตัดขอบธรณีประตูและพื้นต่างระดับออกทั้งหมดระหว่างห้องนอน ห้องน้ำ และห้องนั่งเล่น ใช้ระบบรางน้ำสแตนเลสแบบซ่อนใต้กระเบื้อง (Linear Drain) แทนการลดระดับพื้นห้องน้ำ

2. **Aesthetic Grab Bars (ราวจับไม้ธรรมชาติและทองเหลืองอบอุ่น):**
บอกลาราวจับท่อกลมสเตนเลสโรงพยาบาล แล้วเลือกใช้ราวจับไม้โอ๊คแท้ขัดด้าน หรือราวจับที่ผสานเป็นส่วนหนึ่งของชั้นวางของข้างชักโครกและฝักบัว

3. **Circadian Lighting (แสงสว่างนำทางอัตโนมัติ):**
ติดตั้งเซนเซอร์ตรวจจับความเคลื่อนไหวบริเวณบัวพื้น (Motion-sensor Baseboard LEDs) ส่องสว่างแสงสี Warm Amber อ่อนๆ อัตโนมัติเมื่อก้าวลงจากเตียงยามค่ำคืน ไม่แยงตาและไม่รบกวนฮอร์โมนเมลาโทนิน

4. **Curated Acoustics & Airflow (ความเงียบและการระบายอากาศธรรมชาติ):**
ออกแบบหน้าต่างข้ามฝั่ง (Cross-ventilation) ให้อากาศบริสุทธิ์ไหลเวียนตลอดเวลา ช่วยลดความอับทึบและเพิ่มออกซิเจนสู่สมอง`,
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80',
      published: true,
      authorId: joyUser.id,
    },
    // 3. LIFE: Ikigai in Daily Routine
    {
      slug: 'ikigai-daily-routine-financial-peace',
      title: 'Ikigai in Daily Routine: ตื่นมาเพื่ออะไรในวันที่พอร์ตการเงินมั่นคงแล้ว',
      category: 'วิถีชีวิต & สมดุล',
      pillar: 'LIFE',
      postType: 'TOPS_NOTES',
      authorName: 'Admin A',
      readTime: '5 นาที',
      tags: '#Ikigai #Purpose #LifeDesign #PeaceOfMind',
      excerpt: 'เมื่อเป้าหมายทางการเงินบรรลุแล้ว คำถามที่ใหญ่กว่าตัวเลขจะดังขึ้นมาในใจ: "วันนี้...อะไรคือสิ่งที่คุณตื่นมาทำแล้วมีความสุขอย่างแท้จริง?"',
      content: `หลายคนคิดว่าการมีอิสรภาพทางการเงิน (Financial Freedom) คือการได้นอนตื่นสาย ไม่ต้องทำงาน และไปเที่ยวรอบโลกตลอดไป
แต่ในความเป็นจริง คนส่วนใหญ่ทำเช่นนั้นได้เพียง 3-6 เดือน จากนั้นความเบื่อหน่ายและความว่างเปล่าจะเริ่มคืบคลานเข้ามา

ปรัชญา "อิคิไก" (Ikigai) ของชาวโอกินาวา ประเทศญี่ปุ่น สอนเราว่า ชีวิตที่ยืนยาวและมีความสุข ไม่ได้เกิดจากการหยุดนิ่ง แต่เกิดจากการมี "เหตุผลเล็กๆ ที่ทำให้อยากตื่นขึ้นมาในทุกเช้า"

เมื่อพอร์ตการเงินและการประกันของคุณถูกวางไว้อย่างมั่นคงจนไม่ต้องกังวลเรื่องปากท้องแล้ว:
- คุณอาจตื่นมาเพื่อชงกาแฟดริปให้คนที่คุณรักอย่างประณีต
- คุณอาจตื่นมาเพื่อปลูกต้นไม้และดูใบอ่อนผลิบาน
- คุณอาจตื่นมาเพื่อศึกษาเรื่องโครงสร้างผลึกแร่ หรือเขียนบทความส่งต่อประสบการณ์ให้คนรุ่นหลัง

ความสุขไม่ได้อยู่ที่ปลายทางอันยิ่งใหญ่ แต่อยู่ที่จังหวะก้าวและพิธีกรรมเล็กๆ ในชีวิตประจำวัน (Daily Rituals) ที่เปี่ยมด้วยสติและความหมาย`,
      imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop&q=80',
      published: true,
      authorId: topUser.id,
    },

    // 4. WEALTH: Keyman Protection
    {
      slug: 'keyman-protection-corporate-tax-strategy',
      title: 'Keyman Protection: บริหารความเสี่ยงบุคคลสำคัญและสิทธิประโยชน์ภาษีนิติบุคคล',
      category: 'ความมั่นคงทางการเงิน',
      pillar: 'WEALTH',
      postType: 'ARTICLE',
      authorName: 'Admin A',
      readTime: '8 นาที',
      tags: '#CorporateTax #KeymanProtection #BusinessContinuity #TaxStrategy',
      excerpt: 'เจาะลึกกลยุทธ์การทำประกันบุคคลสำคัญ (Keyman Protection) ที่ช่วยสร้างเกราะคุ้มครองกระแสเงินสดธุรกิจ พร้อมสิทธิประโยชน์ในการหักค่าใช้จ่ายทางภาษีนิติบุคคลอย่างถูกต้องตามกฎหมาย',
      content: `ในธุรกิจขนาดกลางและขนาดย่อม (SME) ทรัพย์สินที่มีค่าที่สุดของบริษัท มักไม่ใช่ที่ดิน เครื่องจักร หรืออาคารสำนักงาน... แต่คือ "มันสมอง วิสัยทัศน์ และคอนเนกชันของตัวกรรมการผู้จัดการหรือผู้ถือหุ้นใหญ่"

หากเกิดเหตุไม่คาดฝันกับบุคคลสำคัญ (Key Person) เหล่านี้ สิ่งที่จะเกิดขึ้นตามมาในทางธุรกิจคือ:
1. สถาบันการเงินอาจระงับวงเงินกู้เบิกเกินบัญชี (O/D) หรือเรียกหลักประกันเพิ่ม
2. คู่ค้ารายใหญ่เกิดความลังเล ไม่กล้าเซ็นสัญญาต่อเนื่อง
3. เกิดสุญญากาศในการบริหารงาน และทายาทอาจยังไม่พร้อมเข้ามาสืบทอดกิจการ

**เครื่องมือ Keyman Protection ทำงานอย่างไร?**
- บริษัทเป็นผู้ถือกรมธรรม์และเป็นผู้ชำระเบี้ยประกันให้แก่กรรมการหรือบุคคลสำคัญ
- ตามประมวลรัษฎากร มาตรา 65 ทวิ (3) และคำวินิจฉัยของกรมสรรพากร: เบี้ยประกันที่บริษัทจ่ายสามารถนำไปลงเป็น **"รายจ่ายในการคำนวณกำไรสุทธิเพื่อเสียภาษีนิติบุคคลได้ทั้งจำนวน"** หากบริษัทมีมติที่ประชุมผู้ถือหุ้นกำหนดเป็นระเบียบสวัสดิการที่ชัดเจน
- หากเกิดเหตุเสียชีวิต เงินผลประโยชน์จากประกันจะเข้าสู่บริษัทเพื่อใช้เป็นทุนสำรองชดเชยรายได้ เคลียร์หนี้สิน หรือชดเชยให้ครอบครัวของกรรมการโดยตรง
- หากกรรมการอยู่จนครบสัญญา บริษัทสามารถโอนกรมธรรม์ให้เป็นเงินบำเหน็จตอบแทนการทำงาน (Executive Golden Handcuffs) ได้อย่างสง่างาม`,
      imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80',
      published: true,
      authorId: topUser.id,
    },
    // 5. WEALTH: Wealth Transfer & Estate Planning
    {
      slug: 'wealth-transfer-estate-planning-harmony',
      title: 'สถาปัตยกรรมการส่งต่อมรดก: วางแผนส่งมอบสินทรัพย์อย่างไรให้ครอบครัวอบอุ่นไร้ข้อพิพาท',
      category: 'ความมั่นคงทางการเงิน',
      pillar: 'WEALTH',
      postType: 'ARTICLE',
      authorName: 'Admin A',
      readTime: '9 นาที',
      tags: '#WealthTransfer #EstatePlanning #InheritanceTax #FamilyHarmony',
      excerpt: 'การส่งต่อมรดกไม่ใช่แค่การเขียนพินัยกรรม แต่คือการจัดวางสถาปัตยกรรมทางกฎหมาย การเงิน และความรู้สึก เพื่อให้ความมั่งคั่งกลายเป็นพร ไม่ใช่คำสาปสำหรับรุ่นลูกหลาน',
      content: `สุภาษิตโบราณที่ว่า "ความมั่งคั่งอยู่ได้ไม่เกิน 3 รุ่น" (Shirtsleeves to shirtsleeves in three generations) เป็นความจริงทางสถิติที่เกิดขึ้นทั่วโลก
สาเหตุหลักไม่ได้เกิดจากวิกฤตเศรษฐกิจ แต่เกิดจาก "ข้อพิพาทระหว่างพี่น้อง" และ "การขาดการวางแผนสภาพคล่องเพื่อชำระภาษีการรับมรดก"

**3 อุปสรรคใหญ่ในการส่งต่อมรดกในประเทศไทย:**
1. **สินทรัพย์ส่วนใหญ่อยู่ในรูปที่ดินและอสังหาริมทรัพย์ (Illiquid Assets):**
ที่ดินมีมูลค่าสูงแต่แบ่งยาก เมื่อต้องแบ่งให้ลูก 3 คน คนหนึ่งอยากเก็บ คนหนึ่งอยากขาย อีกคนไม่มีเงินจ่ายภาษีมรดก 10% จนนำไปสู่การฟ้องร้อง
2. **ภาษีการรับมรดก (Inheritance Tax):**
สินทรัพย์ส่วนที่เกิน 100 ล้านบาทต่อผู้รับมรดกแต่ละคน ต้องเสียภาษี 5% สำหรับบุพการี/ผู้สืบสันดาน หรือ 10% สำหรับบุคคลอื่น หากลูกหลานไม่มีเงินสดก้อนโต อาจต้องถูกบังคับขายที่ดินในราคาต่ำกว่าตลาดเพื่อนำเงินไปจ่ายภาษี
3. **การเข้าสู่กระบวนการศาลและการเปิดเผยต่อสาธารณะ:**
พินัยกรรมทั่วไปต้องผ่านการตั้งผู้จัดการมรดกในชั้นศาล ซึ่งต้องใช้เวลา 3-12 เดือน และเปิดเผยข้อมูลสินทรัพย์ต่อสาธารณะ

**โซลูชัน Life Insurance Trust & Unit Linked ในการส่งต่อมรดก:**
- เงินผลประโยชน์จากการประกันชีวิต **ไม่ถือเป็นกองมรดก** ตามประมวลกฎหมายแพ่งและพาณิชย์ จึงไม่ต้องผ่านศาล และจ่ายตรงให้ผู้รับประโยชน์ภายในไม่กี่วัน
- **ได้รับการยกเว้นภาษีเงินได้และภาษีการรับมรดกทั้งจำนวน**
- สร้างสภาพคล่องเงินสดก้อนใหญ่ทันที เพื่อให้ทายาทนำไปเป็นกองทุนจ่ายภาษีมรดก โดยไม่ต้องแตะต้องที่ดินหรือหุ้นของครอบครัว`,
      imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80',
      published: true,
      authorId: topUser.id,
    },
    // 6. WEALTH: 3-Bucket Strategy
    {
      slug: 'three-bucket-strategy-retirement-inflation',
      title: 'Cash Bucket Strategy: วางแผนพอร์ตเกษียณ 3 ถังสู้เงินเฟ้อตลอด 30 ปี',
      category: 'การลงทุน & เกษียณ',
      pillar: 'WEALTH',
      postType: 'ARTICLE',
      authorName: 'Admin A',
      readTime: '6 นาที',
      tags: '#BucketStrategy #RetirementPortfolio #Inflation #WealthArchitecture',
      excerpt: 'วิธีจัดการพอร์ตเกษียณที่ไม่ต้องกังวลว่าตลาดหุ้นจะตก และไม่ต้องกลัวเงินเฟ้อจะกัดกินมูลค่าเงินสด ด้วยกลยุทธ์จัดพอร์ตแบบ 3 ถัง',
      content: `ปัญหาใหญ่ของคนเกษียณคือ "Sequence of Returns Risk" หรือความเสี่ยงที่ตลาดหุ้นจะตกหนักในช่วง 3-5 ปีแรกของการเกษียณ
หากคุณต้องขายหุ้นออกมาใช้กินอยู่ในช่วงที่ตลาดติดลบ พอร์ตเกษียณของคุณจะหมดเร็วกว่ากำหนดอย่างมีนัยสำคัญ

กลยุทธ์ "The 3-Bucket Strategy" จึงเป็นมาตรฐานระดับสากลในการแก้ปัญหานี้:

* **Bucket 1: ถังเงินสดและสภาพคล่อง (Cash & Safety - 1 ถึง 3 ปี):**
บรรจุเงินสด เงินฝากดิจิทัล หรือประกันออมทรัพย์ระยะสั้น เท่ากับค่าใช้จ่ายในชีวิตประจำวัน 1-3 ปี ถังนี้ทำให้คุณไม่ต้องแตะต้องสินทรัพย์ลงทุนใดๆ เลยแม้ตลาดหุ้นจะดิ่งลง

* **Bucket 2: ถังรายได้สม่ำเสมอ (Guaranteed Income - 4 ถึง 7 ปี):**
บรรจุหุ้นกู้คุณภาพสูง (Investment Grade) กองทุนตราสารหนี้ และ "ประกันบำนาญ (Annuity)" ที่จ่ายเงินคืนแน่นอนเข้าบัญชีทุกปี เพื่อคอยเติมเต็มเงินกลับเข้าไปใน Bucket 1 อย่างสม่ำเสมอ

* **Bucket 3: ถังเติบโตสู้เงินเฟ้อ (Long-term Growth - 8 ปีขึ้นไป):**
บรรจุกองทุนดัชนีหุ้นระดับโลก (Global Equity Index) หุ้นปันผลคุณภาพสูง และทองคำ สินทรัพย์ในถังนี้มีความผันผวนสูงในระยะสั้น แต่ให้ผลตอบแทนชนะเงินเฟ้อในระยะยาว เพราะเรามีเวลาให้มันเติบโตโดยไม่ต้องรีบถอนออกมา`,
      imageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&auto=format&fit=crop&q=80',
      published: true,
      authorId: topUser.id,
    },

    // 7. WELLBEING: Zone 2 & VO2 Max
    {
      slug: 'zone-2-cardio-vo2-max-longevity',
      title: 'Zone 2 Cardio & VO2 Max: วิทยาศาสตร์การออกกำลังกายเพื่อความอ่อนเยาว์ในระดับเซลล์',
      category: 'ศาสตร์แห่งอายุยืนยาว',
      pillar: 'WELLBEING',
      postType: 'ARTICLE',
      authorName: 'Dr. Kanokwan',
      readTime: '7 นาที',
      tags: '#Longevity #Zone2 #VO2Max #Mitochondria #CellularHealth',
      excerpt: 'ทำไมแพทย์ด้าน Longevity ชั้นนำของโลกจึงยกให้ VO2 Max และ Zone 2 Cardio เป็นตัวชี้วัดความเสี่ยงการเสียชีวิตจากทุกสาเหตุที่แม่นยำกว่าความดันโลหิตและคอเลสเตอรอล',
      content: `ในอดีต เราคิดว่าการออกกำลังกายหนักๆ เหงื่อท่วม หัวใจเต้นแทบหลุดจากอก คือการออกกำลังกายที่ดีที่สุด
แต่งานวิจัยชีววิทยาการแพทย์ยุคใหม่ (โดยเฉพาะงานของ Dr. Peter Attia และ Dr. Inigo San Millan) ได้พลิกความเชื่อนั้นอย่างสิ้นเชิง

**หัวใจสำคัญของ Longevity อยู่ที่ "ไมโทคอนเดรีย (Mitochondria)"**
ไมโทคอนเดรียคือโรงไฟฟ้าในทุกเซลล์ของร่างกาย เมื่อเราอายุมากขึ้น ไมโทคอนเดรียจะเสื่อมประสิทธิภาพ เผาผลาญไขมันได้น้อยลง และสร้างของเสียจนเกิดการอักเสบเรื้อรัง

**Zone 2 Training คืออะไร?**
คือการออกกำลังกายที่ระดับความหนักปานกลาง (หัวใจเต้นประมาณ 60-70% ของอัตราการเต้นสูงสุด) ที่คุณยังสามารถ "พูดเป็นประโยคได้ แต่ไม่สบายพอที่จะร้องเพลง"
- Zone 2 ฝึกให้ร่างกายใช้ "ไขมัน" เป็นพลังงานหลักผ่านกระบวนการ Mitochondrial Beta-Oxidation
- กระตุ้นการสร้างไมโทคอนเดรียใหม่ (Mitochondrial Biogenesis) ช่วยป้องกันโรคเบาหวานประเภทที่ 2 และภาวะดื้อต่ออินซูลิน

**VO2 Max: ดัชนีทำนายอายุยืนยาว:**
การมีค่า VO2 Max ในระดับสูง (Top 25% ของช่วงอายุ) สัมพันธ์กับอัตราการเสียชีวิตจากทุกสาเหตุ (All-cause mortality) ที่ลดลงถึงเกือบ 50% เมื่อเทียบกับผู้ที่มีค่าต่ำสุด การฝึกสัปดาห์ละ 3-4 ชั่วโมงใน Zone 2 ผสานกับการฝึกสปรินต์สั้นๆ สัปดาห์ละ 1 ครั้ง คือการลงทุนทางสุขภาพที่ให้ผลตอบแทนสูงสุดในชีวิต`,
      imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80',
      published: true,
      authorId: drKanokwan.id,
    },
    // 8. WELLBEING: Gut-Brain Axis
    {
      slug: 'gut-brain-axis-microbiome-mental-focus',
      title: 'Gut-Brain Axis: สมองที่สองและจุลินทรีย์ในลำไส้ที่กำหนดอารมณ์และสมาธิ',
      category: 'ศาสตร์แห่งอายุยืนยาว',
      pillar: 'WELLBEING',
      postType: 'ARTICLE',
      authorName: 'Dr. Kanokwan',
      readTime: '6 นาที',
      tags: '#GutBrainAxis #Microbiome #MentalHealth #Serotonin',
      excerpt: 'คุณรู้หรือไม่ว่า 90% ของสารเซโรโทนิน (สารสื่อประสาทแห่งความสุข) ถูกผลิตขึ้นในลำไส้ ไม่ใช่ในสมอง? สุขภาพจิตและการตัดสินใจที่ดีจึงเริ่มต้นที่อาหารที่คุณทาน',
      content: `เคยสงสัยไหมว่าทำไมเวลาเราตื่นเต้นหรือกังวล เราถึงรู้สึก "ปั่นป่วนในท้อง" หรือที่ฝรั่งเรียกว่า Butterflies in the stomach?
คำตอบคือ ทางเดินอาหารและสมองของเราเชื่อมต่อกันโดยตรงผ่านเส้นประสาทเวกัส (Vagus Nerve) ซึ่งเปรียบเสมือนสายเคเบิลใยแก้วนำแสงความเร็วสูง

ระบบประสาทลำไส้ (Enteric Nervous System - ENS) มีเซลล์ประสาทมากกว่า 500 ล้านเซลล์ จนนักประสาทวิทยาขนานนามว่าเป็น "สมองที่สอง (The Second Brain)"

**จุลินทรีย์ลำไส้ (Microbiome) ควบคุมอารมณ์ของเราอย่างไร?**
- จุลินทรีย์ตัวดี (เช่น Bifidobacterium และ Lactobacillus) หมักย่อยไฟเบอร์แล้วสร้างสาร Short-Chain Fatty Acids (SCFAs) เช่น บิวทิเรต (Butyrate) ซึ่งช่วยลดการอักเสบในสมองและปกป้องเยื่อหุ้มสมอง (Blood-Brain Barrier)
- เมื่อไมโครไบโอมเสียสมดุลย์ (Dysbiosis) จากการทานน้ำตาลสูง อาหารแปรรูป หรือความเครียด สารพิษ Endotoxin (LPS) จะรั่วซึมเข้าสู่กระแสเลือด ส่งสัญญาณการอักเสบไปรบกวนสมอง ทำให้เกิดอาการสมองล้า (Brain Fog) สมาธิสั้น และซึมเศร้า

**3 วิธีฟื้นฟูไมโครไบโอมในชีวิตประจำวัน:**
1. ทานผักผลไม้หลากสีสันให้ได้ 30 ชนิดต่อสัปดาห์ (Diverse Plant Fiber)
2. เติมอาหารหมักธรรมชาติ เช่น กิมจิ โยเกิร์ตแท้ไม่เติมน้ำตาล หรือคอมบูชา
3. หลีกเลี่ยงยาปฏิชีวนะเกินความจำเป็น และลดสารให้ความหวานเทียม`,
      imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&auto=format&fit=crop&q=80',
      published: true,
      authorId: drKanokwan.id,
    },
    // 9. WELLBEING: Light Hygiene & Circadian Rhythm
    {
      slug: 'light-hygiene-melatonin-circadian-deep-sleep',
      title: 'Light Hygiene & Melatonin: จัดการแสงสีฟ้าในบ้านเพื่อ Deep Sleep ระดับพรีเมียม',
      category: 'สุขภาพองค์รวม',
      pillar: 'WELLBEING',
      postType: 'JOURNEY',
      authorName: 'Admin A & Admin B',
      readTime: '5 นาที',
      tags: '#LightHygiene #CircadianRhythm #DeepSleep #Melatonin',
      excerpt: 'แสงสว่างคือตัวควบคุมนาฬิกาชีวภาพที่ทรงพลังที่สุดในร่างกาย การเข้าใจจังหวะของแสงธรรมชาติจะเปลี่ยนการนอนของคุณไปตลอดกาล',
      content: `ร่างกายของมนุษย์วิวัฒนาการมานับล้านปีใต้แสงอาทิตย์ นาฬิกาหลักในสมอง (Suprachiasmatic Nucleus) อ่านเวลาของวันผ่านเซลล์รับแสงพิเศษในดวงตา (ipRGCs)

แต่ในสังคมยุคใหม่ เราเปิดไฟขาวจ้าสว่างโร่จนถึงเที่ยงคืน และจ้องหน้าจอสมาร์ทโฟนที่ยิงแสงสีฟ้า 480nm เข้าสู่เรตินาโดยตรง ทำให้สมองเข้าใจผิดว่า "ตอนนี้น่าจะเพิ่งบ่ายสอง" และระงับการหลั่งฮอร์โมนเมลาโทนิน

**การทดลองปรับแสงของ Admin A & Admin B ที่บ้าน:**
- **เช้า (Morning Protocol):** ภายใน 30-60 นาทีหลังตื่นนอน ออกไปรับแสงแดดธรรมชาติ 10-15 นาทีโดยไม่สวมแว่นกันแดด เพื่อสั่งให้สมองหยุดผลิตเมลาโทนินและเริ่มนับถอยหลังสู่การนอนในอีก 16 ชั่วโมงข้างหน้า
- **เย็น (Sunset Protocol):** ปิดไฟเพดานทั้งหมดหลัง 20:00 น. เปลี่ยนมาใช้โคมไฟตั้งโต๊ะแสงสีส้มอุ่น (2200K - 2700K) ที่อยู่ในระดับต่ำกว่าสายตา
- **ก่อนนอน:** งดหน้าจออย่างน้อย 60 นาที หรือเปิด Night Shift สีส้มเข้ม

ผลลัพธ์คือ สัดส่วนของ Deep Sleep และ REM Sleep จาก Oura Ring เพิ่มขึ้นกว่า 35% ตื่นมาด้วยความสดชื่นแจ่มใสโดยไม่ต้องพึ่งพากาแฟปริมาณมาก`,
      imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&auto=format&fit=crop&q=80',
      published: true,
      authorId: joyUser.id,
    },

    // 10. INNER_LIFE: The Power of Not Knowing
    {
      slug: 'the-power-of-not-knowing-peace-in-volatility',
      title: 'The Power of Not Knowing: ศิลปะแห่งการยอมรับความไม่แน่นอนในตลาดและชีวิต',
      category: 'โลกภายใน & สมาธิ',
      pillar: 'INNER_LIFE',
      postType: 'TOPS_NOTES',
      authorName: 'Admin A',
      readTime: '5 นาที',
      tags: '#Philosophy #Uncertainty #Mindfulness #MentalClarity',
      excerpt: 'ความทุกข์ส่วนใหญ่ของนักลงทุนและคนทำงาน ไม่ได้เกิดจากความไม่แน่นอน แต่เกิดจากความพยายามที่จะ "ควบคุมสิ่งที่ควบคุมไม่ได้"',
      content: `เราใช้เวลามากมายไปกับการพยายามคาดเดา:
- หุ้นตัวนี้จะขึ้นหรือลงในสัปดาห์หน้า?
- เศรษฐกิจปีหน้าจะถดถอยไหม?
- ธุรกิจของเราจะมีคู่แข่งรายใหม่เข้ามาหรือไม่?

ในทางจิตวิทยา ความกลัวความไม่แน่นอน (Fear of Uncertainty) ทำให้มนุษย์เกิดความเครียดเรื้อรัง และมักตัดสินใจผิดพลาดจากอารมณ์หวั่นไหว

ในทางพุทธปรัชญาและจิตวิทยาการลงทุนขั้นสูง การฝึกฝนจิตใจให้ยอมรับสภาวะ "ไม่รู้" (The Power of Not Knowing) คือจุดเริ่มต้นของความสงบที่แท้จริง:
- เราไม่รู้ว่าตลาดพรุ่งนี้จะเป็นอย่างไร แต่เรารู้ว่าพอร์ตของเรากระจายความเสี่ยงไว้รอบคอบแล้ว
- เราไม่รู้ว่าสุขภาพในอีก 10 ปีข้างหน้าจะเป็นอย่างไร แต่เรารู้ว่าเราออกกำลังกาย ทานอาหารดี และมีประกันสุขภาพเหมาจ่ายคุ้มครองไว้แล้ว

เมื่อคุณแยกสิ่งที่ "ควบคุมได้" ออกจากสิ่งที่ "ควบคุมไม่ได้" จิตใจจะเบาลง ความวิตกกังวลจะจางหาย และแทนที่ด้วยความมั่นคงที่หยั่งรากลึกจากภายใน`,
      imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80',
      published: true,
      authorId: topUser.id,
    },
    // 11. INNER_LIFE: Mindfulness in Business
    {
      slug: 'daily-mindfulness-in-business-negotiation',
      title: 'Mindfulness ท่ามกลางการเจรจาธุรกิจ: การฝึกรู้กายรู้ใจเพื่อการตัดสินใจที่เฉียบคม',
      category: 'โลกภายใน & สมาธิ',
      pillar: 'INNER_LIFE',
      postType: 'ARTICLE',
      authorName: 'Admin A & Admin B',
      readTime: '6 นาที',
      tags: '#Mindfulness #BusinessStrategy #Negotiation #EmotionalIntelligence',
      excerpt: 'สมาธิไม่ได้จำกัดอยู่แค่บนเบาะนั่งในวัด แต่คืออาวุธลับในการเจรจาธุรกิจ การบริหารข้อขัดแย้ง และการรักษาความเยือกเย็นในห้องประชุม',
      content: `ในห้องเจรจาธุรกิจที่มีผลประโยชน์หลักล้านเป็นเดิมพัน ฝ่ายที่เสียเปรียบมักไม่ใช่ฝ่ายที่มีข้อมูลน้อยกว่า... แต่คือ "ฝ่ายที่สูญเสียความเยือกเย็นทางอารมณ์ก่อน"

เมื่อคู่เจรจาใช้คำพูดกดดัน โจมตี หรือสร้างเงื่อนไขที่ตึงเครียด ร่างกายของเราจะตอบสนองโดยอัตโนมัติด้วยปฏิกิริยา Fight or Flight:
- อัตราการเต้นของหัวใจพุ่งสูง
- กล้ามเนื้อบ่าและคอเกร็งตัว
- สมองส่วนหน้า (Prefrontal Cortex) ที่ใช้คิดวิเคราะห์จะถูกระงับการทำงานชั่วคราว และสมองส่วนอารมณ์ (Amygdala) จะเข้ามาควบคุมแทน

**เทคนิค Micro-Mindfulness ในห้องประชุม:**
1. **The Physical Anchor (จุดยึดเหนี่ยวกายภาพ):**
เมื่อรู้สึกว่าความโกรธหรือความตื่นตระหนกเริ่มก่อตัว อย่าเพิ่งรีบตอบโต้ ให้ย้ายความสนใจลงไปที่ "ฝ่าเท้าทั้งสองข้างที่สัมผัสพื้น" หรือ "น้ำหนักของแผ่นหลังที่พิงพนักเก้าอี้" เพียง 3-5 วินาที
2. **The 4-Second Pause (การหยุดพัก 4 วินาที):**
ก่อนจะตอบประโยคสำคัญ ให้หายใจออกยาวๆ แล้วหยุดนิ่ง 4 วินาที การหยุดนิ่งนี้ไม่เพียงทำให้สมองกลับสู่โหมดวิเคราะห์ แต่ยังส่งสัญญาณเชิงจิตวิทยาว่าคุณเป็นผู้คุมสถานการณ์และไม่ตกเป็นเหยื่อของการยั่วยุ`,
      imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80',
      published: true,
      authorId: topUser.id,
    },
    // 12. INNER_LIFE: Digital Detox Weekend
    {
      slug: 'digital-detox-weekend-neural-rest',
      title: 'Digital Detox Weekend: คืนความเงียบสงบให้สมอง 48 ชั่วโมงเพื่อฟื้นฟูสมาธิ',
      category: 'การเข้าใจตนเอง',
      pillar: 'INNER_LIFE',
      postType: 'JOURNEY',
      authorName: 'Admin B',
      readTime: '5 นาที',
      tags: '#DigitalDetox #MentalRest #BrainHealth #Focus',
      excerpt: 'สมองของเราไม่ได้ถูกออกแบบมาให้รับการแจ้งเตือนวันละ 200 ครั้ง การตัดการเชื่อมต่อจากโลกออนไลน์ 48 ชั่วโมง จะช่วยรีเซ็ตระบบโดปามีนและความคิดสร้างสรรค์ของคุณ',
      content: `ทุกครั้งที่เสียงแจ้งเตือนโทรศัพท์ดังขึ้น สมองจะหลั่งสารโดปามีน (Dopamine) เล็กๆ ออกมา สร้างวงจรพฤติกรรมเสพติดที่ทำให้เราต้องหยิบมือถือขึ้นมาดูซ้ำแล้วซ้ำเล่า
ผลลัพธ์คือ สมาธิแตกกระจาย (Continuous Partial Attention) และความรู้สึกเหนื่อยล้าเรื้อรังที่หาสาเหตุไม่ได้

เมื่อเดือนที่ผ่านมา Admin B ได้ทดลองทำ "Digital Detox Weekend 48 ชั่วโมง":
- ปิดโทรศัพท์และเก็บไว้ในลิ้นชักตั้งแต่เย็นวันศุกร์ 18:00 น. จนถึงเช้าวันจันทร์
- แจ้งครอบครัวและทีมงานล่วงหน้าสำหรับกรณีฉุกเฉินที่มีเบอร์โทรศัพท์บ้าน

**สิ่งที่ค้นพบตลอด 48 ชั่วโมง:**
- ใน 6 ชั่วโมงแรก มือจะเผลอควานหามือถือทุกๆ 15 นาที จิตใจจะรู้สึกกระวนกระวายว่า "เราจะพลาดข่าวสารสำคัญอะไรไหม?"
- เข้าสู่วันเสาร์ จังหวะของเวลาช้าลงอย่างมหัศจรรย์ การอ่านหนังสือจบไป 2 เล่ม การได้มองก้อนเมฆและฟังเสียงนกที่บ้านกลายเป็นความสุขที่ลึกซึ้ง
- คืนวันอาทิตย์ คลื่นสมองสงบนิ่ง นอนหลับสนิทโดยไม่มีอาการสะดุ้งตื่น และตื่นวันจันทร์ด้วยความพร้อมทางจิตใจที่สมบูรณ์แบบที่สุด`,
      imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
      published: true,
      authorId: joyUser.id,
    },

    // 13. EARTH_ENERGY: Amethyst Physics
    {
      slug: 'amethyst-geode-silica-physics-history',
      title: 'Amethyst & Geode Physics: ฟิสิกส์ผลึกซิลิกาและประวัติศาสตร์การใช้งานกว่า 3,000 ปี',
      category: 'วิทยาศาสตร์และพลังงานธรรมชาติ',
      pillar: 'EARTH_ENERGY',
      postType: 'ARTICLE',
      authorName: 'Admin B',
      readTime: '7 นาที',
      tags: '#Amethyst #MineralPhysics #Silica #Chakras #EarthEnergy',
      excerpt: 'เจาะลึกโครงสร้างผลึกควอตซ์สีม่วง จากทฤษฎีการเกิดสีของไอออนเหล็ก (Fe³⁺) ในโครงผลึก SiO₂ สู่การใช้งานในพิธีกรรมบำบัดจิตใจตั้งแต่ยุคกรีกโบราณ',
      content: `คำว่า "อเมทิสต์" (Amethyst) มาจากภาษากรีกโบราณว่า "Amethystos" แปลว่า "ไม่มึนเมา" ชาวกรีกเชื่อว่าการดื่มไวน์จากถ้วยที่แกะสลักจากหินอเมทิสต์จะช่วยป้องกันไม่ให้ขาดสติ

**มิติทางวิทยาศาสตร์และธรณีวิทยา (Mineral Physics):**
- อเมทิสต์คือแร่ควอตซ์ (Silicon Dioxide - SiO₂) ที่มีไอออนของธาตุเหล็ก (Fe³⁺) เข้าไปแทนที่ตำแหน่งซิลิคอนในตาข่ายผลึก
- การแผ่รังสีธรรมชาติจากหินข้างเคียงใต้พื้นพิภพเป็นเวลาหลายล้านปี ทำให้อิเล็กตรอนของเหล็กเกิดการเปลี่ยนระดับพลังงาน ก่อให้เกิด "ศูนย์สี" (Color Center) ที่ดูดกลืนคลื่นแสงสีเหลืองและเขียว จึงสะท้อนแสงสีม่วงที่งดงามสู่สายตามนุษย์
- โครงสร้างผลึกตรีโกณมิติ (Trigonal Crystal System) มีคุณสมบัติในการสร้างคลื่นความถี่การสั่นพ้องที่สม่ำเสมอ

**มิติทางจักระและการจัดวางพื้นที่:**
- อเมทิสต์สัมพันธ์กับ **จักระที่ 6 (ตาที่สาม - ปัญญาญาณ)** และ **จักระที่ 7 (มงกุฎ - จิตวิญญาณและความสงบสูงสุด)**
- การวางโพรงอเมทิสต์ (Geode) ไว้ในห้องทำงานหรือห้องสมาธิ ช่วยลดการสะท้อนของคลื่นแม่เหล็กไฟฟ้า และเป็นจุดรวมสายตา (Visual Anchor) ที่ช่วยนำจิตใจกลับสู่ความสงบนิ่งได้อย่างรวดเร็ว`,
      imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
      published: true,
      authorId: joyUser.id,
    },
    // 14. EARTH_ENERGY: Tourmaline & Pyroelectricity
    {
      slug: 'tourmaline-negative-ions-pyroelectricity',
      title: 'Tourmaline & Pyroelectricity: วิทยาศาสตร์ประจุไฟฟ้าสถิตธรรมชาติและการปกป้องพลังงานรอบตัว',
      category: 'วิทยาศาสตร์และพลังงานธรรมชาติ',
      pillar: 'EARTH_ENERGY',
      postType: 'ARTICLE',
      authorName: 'Admin B',
      readTime: '6 นาที',
      tags: '#Tourmaline #Pyroelectricity #Piezoelectricity #Grounding #EMF',
      excerpt: 'แบล็คทัวร์มาลีนไม่ได้เป็นเพียงหินกันภัยตามความเชื่อ แต่คือผลึกแร่ธาตุที่มีคุณสมบัติทางไฟฟ้าตามธรรมชาติที่นักฟิสิกส์ให้การยอมรับ',
      content: `ในปี 1880 นักฟิสิกส์รางวัลโนเบลสองพี่น้อง ปิแอร์ และ ฌาคส์ กูว์รี (Pierre & Jacques Curie) ได้ค้นพบว่า ผลึกทัวร์มาลีนมีสมบัติอันน่าทึ่งสองประการ:
1. **Piezoelectricity (เพียโซอิเล็กทริซิตี):** สร้างประจุไฟฟ้าเมื่อได้รับแรงกดหรือแรงสั่นสะเทือน
2. **Pyroelectricity (ไพโรอิเล็กทริซิตี):** สร้างประจุไฟฟ้าที่ปลายผลึกทั้งสองข้างเมื่ออุณหภูมิเปลี่ยนแปลง

**การปล่อยประจุลบ (Negative Ions):**
จากสมบัติทางไฟฟ้าดังกล่าว ทัวร์มาลีนตามธรรมชาติสามารถปล่อยอนุภาคประจุลบ (Negative Ions) และคลื่นฟาร์อินฟราเรด (Far Infrared Rays) อ่อนๆ ออกสู่อากาศรอบข้าง ซึ่งในทางการแพทย์สิ่งแวดล้อม ประจุลบมีส่วนช่วยดักจับฝุ่นละออง และช่วยให้ระบบการหายใจรู้สึกปลอดโปร่ง

**มิติการกราวน์ดิง (Grounding & Root Chakra):**
- ทัวร์มาลีนดำ (Schorl) มีธาตุเหล็กสูง สัมพันธ์กับ **จักระที่ 1 (มูลาธาระ - ความมั่นคงและการเอาชีวิตรอด)**
- การพกพาหรือวางไว้ใกล้โต๊ะทำงานที่มีหน้าจอคอมพิวเตอร์และสัญญาณ Wi-Fi ช่วยให้จิตใจรู้สึกยึดเหนี่ยวอยู่กับพื้นดิน (Grounded) ไม่ล่องลอย และช่วยลดความเมื่อยล้าทางสายตาและสมอง`,
      imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=80',
      published: true,
      authorId: joyUser.id,
    },
    // 15. JOURNAL: Admin A's 10-Year Reflections
    {
      slug: 'tops-investment-portfolio-10-years-reflections',
      title: 'บันทึกของ Admin A: ถอดบทเรียนพอร์ตการลงทุน 10 ปี สิ่งที่เปลี่ยนไปในมุมมองความมั่งคั่ง',
      category: 'บันทึกและความคิดของ Admin A',
      pillar: 'JOURNAL',
      postType: 'TOPS_NOTES',
      authorName: 'Admin A',
      readTime: '8 นาที',
      tags: '#AdminANotes #InvestmentLessons #10YearReflection #TrueWealth',
      excerpt: 'จากวันที่วิ่งไล่ล่าผลตอบแทน 30% ต่อปี สู่การค้นพบว่า "พอร์ตที่ดีที่สุดคือพอร์ตที่ทำให้คุณหลับสนิทในทุกค่ำคืน"',
      content: `ย้อนกลับไปเมื่อ 10 ปีก่อน ในฐานะนักวางแผนการเงินรุ่นใหม่ ผมหมกมุ่นอยู่กับการหาหุ้นที่เติบโตเร็วที่สุด ดูกราฟเทคนิคทั้งวัน และภูมิใจกับการทำผลตอบแทนชนะดัชนีตลาด
แต่เมื่อกาลเวลาผ่านไป ผ่านวิกฤตเศรษฐกิจ วิกฤตโรคระบาด และได้ให้คำปรึกษากับครอบครัวมหาเศรษฐีมากมาย มุมมองของผมต่อ "ความมั่งคั่ง" ได้เปลี่ยนไปอย่างสิ้นเชิง

นี่คือ 3 บทเรียนที่ตกผลึกจาก 10 ปีที่ผ่านมา:

1. **Risk Management มาก่อน Return เสมอ:**
การทำผลตอบแทนได้ 50% มีความหมายน้อยมาก หากในปีถัดมาคุณขาดทุน 80% การรักษาสินทรัพย์ให้อยู่รอดในทุกวิกฤต (Survival) สำคัญกว่าการชนะตลาดในระยะสั้น

2. **ประกันไม่ใช่ค่าใช้จ่าย แต่คือ "หลุมหลบภัยของพอร์ต":**
ผมเคยเห็นคนที่พอร์ตหุ้น 20 ล้านบาท ต้องเทขายหุ้นในจุดต่ำสุดของตลาด เพื่อนำเงินสดมารักษาโรคมะเร็งของคนในครอบครัว การมีประกันสุขภาพและโรคร้ายแรงที่ครอบคลุม คือกำแพงที่ปกป้องไม่ให้พอร์ตการลงทุนของคุณต้องถูกบังคับขาย

3. **ความมั่งคั่งที่แท้จริงคือ "อำนาจเหนือเวลาของตนเอง":**
เป้าหมายสูงสุดของการวางแผนการเงิน ไม่ใช่การมีเงินมากที่สุดในสุสาน แต่คือการที่คุณสามารถตื่นเช้าขึ้นมาแล้วพูดได้เต็มปากว่า "วันนี้ ฉันสามารถทำในสิ่งที่ฉันอยากทำ กับคนที่ฉันรัก ได้ตลอดทั้งวัน"`,
      imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80',
      published: true,
      authorId: topUser.id,
    },
  ];

  for (const post of posts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }
  console.log(`📰 Posts across 7 Pillars seeded: ${posts.length} articles ready`);

  // 5. Seed Leads (ตัวอย่าง Leads ใน CRM Pipeline & Let's Talk)
  const leads = [
    {
      name: 'คุณวิชัย พัฒนากูล',
      phone: '089-111-2233',
      interest: 'AIA Health Happy เหมาเบิ้ลคุ้ม',
      preferredTime: 'ช่วงบ่าย (13:00 - 17:00)',
      status: 'NEW',
      notes: 'สนใจวางแผนสุขภาพเหมาจ่าย 25 ล้านบาท และต้องการปรึกษาการลดหย่อนภาษีปี 68',
      userId: customer.id,
    },
    {
      name: 'คุณธิดาพร รัตนชัย',
      phone: '084-555-6677',
      interest: 'หินไหมทองจักรพรรดิ (Golden Rutilated Quartz)',
      preferredTime: 'ช่วงเช้า (09:00 - 12:00)',
      status: 'CONTACTED',
      notes: 'พูดคุยกับ Admin B แล้ว ลูกค้าสนใจขนาดข้อมือ 16 cm ส่งข้อมูลผลึก SiO2 ทางไลน์เรียบร้อย',
      userId: null,
    },
    {
      name: 'คุณเกรียงไกร สมุทรวารี',
      phone: '081-333-9988',
      interest: 'AIA Annuity Fix วางแผนเกษียณ & บำนาญสุขใจ',
      preferredTime: 'ช่วงเย็น (17:00 - 20:00)',
      status: 'CLOSED',
      notes: 'วางแผนพอร์ตเกษียณเรียบร้อย เบี้ยประกันรายปี 120,000 บาท ได้รับสิทธิลดหย่อนเต็มเพดาน',
      userId: customer.id,
    },
    {
      name: 'คุณณภัทร สิริวัฒนา',
      phone: '086-777-8899',
      interest: "Let's Talk กับ Admin A & Admin B (การวางแผนชีวิต 6 มิติ)",
      preferredTime: 'วันเสาร์-อาทิตย์ (10:00 - 15:00)',
      status: 'CONTACTED',
      notes: 'ต้องการคำแนะนำเรื่องสถาปัตยกรรมการเงินสำหรับครอบครัวที่มีลูกเล็ก 2 คน',
      userId: null,
    },
    {
      name: 'คุณวรพล รัตนเวชกุล',
      phone: '081-888-7766',
      interest: 'AIA Infinite Wealth Prestige (Unit Linked) & การวางแผนมรดก',
      preferredTime: 'วันธรรมดาช่วงบ่าย (14:00 - 16:00)',
      status: 'NEW',
      notes: 'ต้องการคำปรึกษาโครงสร้างภาษีมรดก และการตั้ง Life Insurance Trust สำหรับส่งมอบสินทรัพย์ 50 ล้านบาทให้บุตร 2 คน',
      userId: vipUser.id,
    },
    {
      name: 'คุณธนรัตน์ ประเสริฐกิจ',
      phone: '086-333-2211',
      interest: 'AIA Keyman Executive Protection & บริหารภาษีนิติบุคคล',
      preferredTime: 'ช่วงเช้า (10:00 - 12:00)',
      status: 'CONTACTED',
      notes: 'ปรึกษาการลงรายจ่ายภาษีบริษัทจำกัด มาตรา 65 ทวิ (3) และคุ้มครองความเสี่ยงกรรมการผู้จัดการ',
      userId: thanaratBiz.id,
    },
    {
      name: 'คุณเมย์ ธนพร',
      phone: '085-999-1122',
      interest: 'ผลึกอเมทิสต์โพรงธรรมชาติ (Amethyst Cathedral Geode) & จัดวางสตูดิโอ',
      preferredTime: 'ช่วงบ่าย (13:00 - 18:00)',
      status: 'CLOSED',
      notes: 'นัดหมาย Admin B เพื่อคัดเลือกผลึก Amethyst อุรุกวัยเกรดพิพิธภัณฑ์ และแท่ง Selenite สำหรับพื้นที่สมาธิในสตูดิโอเรียบร้อย',
      userId: mayMindful.id,
    },
    {
      name: 'คุณอนัญญา วงศ์สุวรรณ',
      phone: '081-666-3344',
      interest: 'AIA Senior Happy & Universal Design ปรับปรุงบ้านผู้สูงวัย',
      preferredTime: 'ช่วงสาย (10:30 - 12:00)',
      status: 'NEW',
      notes: 'สนใจทำประกันความคุ้มครองอุบัติเหตุและกระดูกแตกหักให้ตนเองในวัย 60 ปี พร้อมขอคำแนะนำเรื่องปรับห้องน้ำแบบ Zero-Threshold',
      userId: ananyaRetire.id,
    },
    {
      name: 'คุณชนินทร์ วัฒนสกุล',
      phone: '089-111-3322',
      interest: 'Cash Bucket Strategy พอร์ตเกษียณ 3 ถัง',
      preferredTime: 'ช่วงเย็น (18:00 - 20:00)',
      status: 'CONTACTED',
      notes: 'วางแผนพอร์ตเกษียณอายุ 55 ปี ต้องการแบ่งสัดส่วน Bucket 1 (เงินสด) และ Bucket 2 (บำนาญ) ให้ชัดเจน',
      userId: null,
    },
    {
      name: 'คุณพิชญา อมรเวช',
      phone: '082-444-9911',
      interest: "Let's Talk กับ Admin A & Admin B (การปรับสมดุลชีวิตและการเงิน)",
      preferredTime: 'วันอาทิตย์ (13:00 - 16:00)',
      status: 'NEW',
      notes: 'สนใจแนวคิดสมดุล 6 มิติของชีวิต รู้สึกหมดไฟจากการทำงานประจำ ต้องการวางแผนทิศทางชีวิตใหม่',
      userId: null,
    },
  ];

  for (const lead of leads) {
    const existing = await prisma.lead.findFirst({
      where: { name: lead.name, phone: lead.phone },
    });
    if (!existing) {
      await prisma.lead.create({ data: lead });
    }
  }
  console.log(`📋 Leads seeded: ${leads.length} leads ready`);

  // 6. Seed Wishlists for multiple members
  const allProducts = await prisma.product.findMany();
  if (allProducts.length > 0) {
    // Somchai wishlist
    await prisma.wishlist.upsert({
      where: {
        userId_productId: {
          userId: customer.id,
          productId: allProducts[0].id,
        },
      },
      update: {},
      create: {
        userId: customer.id,
        productId: allProducts[0].id,
      },
    });

    // May Mindful wishlist (Lapis Lazuli & Amethyst Geode)
    if (allProducts.length > 1) {
      await prisma.wishlist.upsert({
        where: {
          userId_productId: {
            userId: mayMindful.id,
            productId: allProducts[1].id,
          },
        },
        update: {},
        create: {
          userId: mayMindful.id,
          productId: allProducts[1].id,
        },
      });
    }

    // Worraphon VIP wishlist (Pyrite or Golden Rutilated Quartz)
    if (allProducts.length > 2) {
      await prisma.wishlist.upsert({
        where: {
          userId_productId: {
            userId: vipUser.id,
            productId: allProducts[2].id,
          },
        },
        update: {},
        create: {
          userId: vipUser.id,
          productId: allProducts[2].id,
        },
      });
    }
    console.log(`💖 Sample Wishlists seeded for Somchai, May, and Worraphon`);
  }

  console.log('✨ [Success] All 7-Pillar Database Seeds Completed Successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
