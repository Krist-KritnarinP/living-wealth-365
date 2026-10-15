import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting Living Wealth 365 Comprehensive Database Seeding...');

  // 1. Seed Users (Admin, Curators Top & Joy, Customer)
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
      password: hashedAdminPassword,
      role: 'ADMIN',
    },
    create: {
      username: 'top_curator',
      email: 'top@livingwealth365.com',
      password: hashedAdminPassword,
      name: 'Top (นักวางแผนชีวิตและการเงิน)',
      phone: '082-111-2222',
      role: 'ADMIN',
    },
  });

  const joyUser = await prisma.user.upsert({
    where: { username: 'joy_curator' },
    update: {
      password: hashedAdminPassword,
      role: 'ADMIN',
    },
    create: {
      username: 'joy_curator',
      email: 'joy@livingwealth365.com',
      password: hashedAdminPassword,
      name: 'Joy (ผู้คัดสรรพลังงานธรรมชาติและวิถีชีวิต)',
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

  console.log(`👤 Users seeded: Admin (${admin.username}), Top (${topUser.username}), Joy (${joyUser.username}), Customer (${customer.username})`);

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
  ];

  for (const plan of insurancePlans) {
    await prisma.insurancePlan.upsert({
      where: { slug: plan.slug },
      update: plan,
      create: plan,
    });
  }
  console.log(`📋 Insurance Plans seeded: ${insurancePlans.length} plans ready`);

  // 3. Seed Earth & Energy (แร่ธาตุ คริสตัล คัดสรรโดย Joy & Top ตามหลักวิทยาศาสตร์และจักระ)
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
      authorName: 'Top & Joy',
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
      authorName: 'Top',
      readTime: '4 นาที',
      tags: '#TopsNotes #SelfReflection #LifePlanning',
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
      authorName: 'Top & Joy',
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
      authorName: 'Top & Joy',
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
      authorName: 'Joy',
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
      authorName: 'Joy',
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
      authorName: 'Top',
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
      authorName: 'Top & Joy',
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
      authorName: 'Top',
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
      authorName: 'Joy',
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
      authorName: 'Top',
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
      title: "Top's Notes: สิ่งที่เราได้ยินจากการสนทนาเรื่องชีวิตและการเงินกับผู้คนกว่า 100 คน",
      category: 'บันทึกของท็อป',
      pillar: 'JOURNAL',
      postType: 'TOPS_NOTES',
      authorName: 'Top',
      readTime: '5 นาที',
      tags: '#TopsNotes #Conversations #LifeInsights',
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
      title: 'Joy’s Journey: การเดินทางสู่แหล่งกำเนิดหินธรรมชาติที่มาดากัสการ์ และสิ่งที่ธรรมชาติสอนเรา',
      category: 'บันทึกการเดินทาง',
      pillar: 'JOURNAL',
      postType: 'JOURNEY',
      authorName: 'Joy',
      readTime: '6 นาที',
      tags: '#JoysJourney #Madagascar #NatureWisdom #Curation',
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
      authorName: 'Top & Joy',
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
      authorName: 'Top & Joy',
      readTime: '5 นาที',
      tags: '#AboutUs #Philosophy #TopAndJoy #LivingWealth365',
      excerpt: 'เรื่องราวของ Top & Joy สองผู้ร่วมก่อตั้งที่เชื่อมั่นว่า การวางแผนชีวิตและการเชื่อมโยงกับพลังธรรมชาติสามารถเดินเคียงข้างกันได้อย่างงดงาม',
      content: `Living Wealth 365 ไม่ใช่บริษัทประกัน และไม่ใช่สำนักมูเตลูเชิงพาณิชย์

เราคือ "Life & Wellbeing Platform" ที่ถือกำเนิดขึ้นจากความตั้งใจของ ท็อป (Top) นักวางแผนการเงินและชีวิตที่เชื่อในความรอบคอบและความมั่นคง และ จอย (Joy) ผู้หลงใหลในความงดงามของแร่ธาตุธรรมชาติ สุขภาพองค์รวม และวิถีชีวิตที่สงบสุข

เราพบว่า ผู้คนมักแยกเรื่อง "การเงิน" ออกจาก "สุขภาพจิตใจ"
- บางคนมีความมั่งคั่งแต่ใจร้อนรนและสุขภาพเสื่อมถอย
- บางคนแสวงหาความสงบและเครื่องยึดเหนี่ยวจิตใจ แต่กลับขาดการวางแผนความเสี่ยงที่จับต้องได้

Living Wealth 365 จึงเป็นสะพานเชื่อมระหว่าง "ศาสตร์แห่งโลกกายภาพ" (การวางแผนการเงิน ภาษี และการปกป้องความเสี่ยง) กับ "ศาสตร์แห่งโลกภายใน" (ความสงบ พลังงานธรรมชาติ และความสมดุลของชีวิต)

เราไม่ได้มาเป็นผู้รู้ที่คอยสั่ง แต่เราคือ "เพื่อนร่วมทาง (Fellow Travelers)" ที่พร้อมรับฟัง แลกเปลี่ยน และร่วมค้นหาวิถีชีวิตที่ใช่ที่สุดสำหรับคุณ`,
      imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80',
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
      notes: 'พูดคุยกับคุณจอยแล้ว ลูกค้าสนใจขนาดข้อมือ 16 cm ส่งข้อมูลผลึก SiO2 ทางไลน์เรียบร้อย',
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
      interest: "Let's Talk กับ Top & Joy (การวางแผนชีวิต 6 มิติ)",
      preferredTime: 'วันเสาร์-อาทิตย์ (10:00 - 15:00)',
      status: 'CONTACTED',
      notes: 'ต้องการคำแนะนำเรื่องสถาปัตยกรรมการเงินสำหรับครอบครัวที่มีลูกเล็ก 2 คน',
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

  // 6. Seed Wishlist
  const firstProduct = await prisma.product.findFirst();
  if (firstProduct) {
    await prisma.wishlist.upsert({
      where: {
        userId_productId: {
          userId: customer.id,
          productId: firstProduct.id,
        },
      },
      update: {},
      create: {
        userId: customer.id,
        productId: firstProduct.id,
      },
    });
    console.log(`💖 Sample Wishlist seeded for ${customer.username}`);
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
