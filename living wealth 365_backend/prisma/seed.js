import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting Living Wealth 365 Database Seeding...');

  // 1. Seed Users (Admin & Customer)
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
      name: 'กฤษณรินทร์ (ผู้ดูแลระบบ)',
      phone: '081-999-8888',
      role: 'ADMIN',
    },
  });
  console.log(`👤 Admin user ready: ${admin.username} (${admin.email})`);

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
  console.log(`👤 Customer user ready: ${customer.username} (${customer.email})`);

  // 2. Seed Insurance Plans (แผนประกันภัยและการเงิน)
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

  // 3. Seed Products (หินมงคล & สินค้าสายมู)
  const products = [
    {
      name: 'สร้อยข้อมือหินไทเกอร์อาย (Tiger Eye)',
      category: 'ดึงดูดทรัพย์ & โชคลาภ',
      price: 1290.0,
      stoneType: 'หินไทเกอร์อายแท้ คัดเกรดพรีเมียม 10mm',
      dayOfWeek: 'วันพฤหัสบดี, วันอาทิตย์',
      description: 'หินแห่งความกล้าหาญ การมองการณ์ไกล และการดึงดูดโชคลาภ ช่วยปกป้องคุ้มครองจากพลังงานด้านลบ และเสริมความมั่นใจในการตัดสินใจเรื่องเงินทอง',
      imageUrl: 'https://images.unsplash.com/photo-1611591475871-33157f49553b?w=800&auto=format&fit=crop&q=80',
      isActive: true,
    },
    {
      name: 'สร้อยข้อมือหินลาพิส ลาซูลี (Lapis Lazuli)',
      category: 'ปัญญา & ความคิดสร้างสรรค์',
      price: 1890.0,
      stoneType: 'หินลาพิส ลาซูลี ลวดลายละอองทองไพไรต์ 10mm',
      dayOfWeek: 'วันพุธ, วันศุกร์',
      description: 'หินแห่งสัจจะ ปัญญาญาณ และการสื่อสาร ช่วยเปิดจักระดวงตาที่สาม เสริมพลังการเจรจาการค้าให้ราบรื่น เป็นที่รักและเคารพของผู้ร่วมงาน',
      imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80',
      isActive: true,
    },
    {
      name: 'หินไหมทองจักรพรรดิ (Golden Rutilated Quartz)',
      category: 'อำนาจ & การเงิน',
      price: 3590.0,
      stoneType: 'ควอตซ์ใส เส้นไหมทองแน่นประกายรุ้ง 12mm',
      dayOfWeek: 'วันพฤหัสบดี, วันจันทร์',
      description: 'ราชาแห่งหินดึงดูดทรัพย์ เสริมบารมีมหาเศรษฐี เส้นไหมสีทองทำหน้าที่เสมือนเสาอากาศรับพลังงานโชคลาภ เสริมสภาพคล่องทางการเงินให้ไหลมาเทมาไม่ขาดสาย',
      imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop&q=80',
      isActive: true,
    },
    {
      name: 'สร้อยข้อมือโรสควอตซ์มาดากัสการ์ (Rose Quartz)',
      category: 'เมตตามหานิยม',
      price: 990.0,
      stoneType: 'โรสควอตซ์สีชมพูละมุน เนื้อเนียนใส 8mm',
      dayOfWeek: 'วันศุกร์, วันอังคาร',
      description: 'หินแห่งความรักอันบริสุทธิ์ เมตตามหานิยม ช่วยสร้างเสน่ห์ให้คนรักใคร่เอ็นดู ผู้ใหญ่เมตตาอุปถัมภ์ และบำบัดหัวใจให้สงบผ่อนคลาย',
      imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop&q=80',
      isActive: true,
    },
    {
      name: 'หินอเมทิสต์เสริมสมาธิ (Amethyst)',
      category: 'ความสงบ & สุขภาพใจ',
      price: 1490.0,
      stoneType: 'อเมทิสต์สีม่วงเข้มธรรมชาติ 10mm',
      dayOfWeek: 'วันเสาร์, วันพุธกลางคืน',
      description: 'หินแห่งความสงบสุขและการบำบัด ช่วยระงับความเครียดจากการทำงาน บรรเทาอาการนอนไม่หลับ และเสริมสร้างความสงบมั่นคงในจิตใจ',
      imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
      isActive: true,
    },
    {
      name: 'หินแบล็คทัวร์มาลีนคุ้มภัย (Black Tourmaline)',
      category: 'เจรจาค้าขาย & คุ้มครอง',
      price: 1690.0,
      stoneType: 'แบล็คทัวร์มาลีนผิวดำมันเงา 10mm',
      dayOfWeek: 'วันเสาร์, วันอังคาร',
      description: 'หินเกราะกำบังอันทรงพลัง ช่วยสะท้อนพลังงานลบ คุ้มครองจากสิ่งอัปมงคล และช่วยให้มีจิตใจที่หนักแน่นมั่นคงท่ามกลางแรงกดดัน',
      imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80',
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
  console.log(`💎 Products seeded: ${products.length} products ready`);

  // 4. Seed Posts (บทความความรู้การเงิน)
  const posts = [
    {
      slug: 'tax-saving-guide-2025',
      title: 'สรุปสิทธิลดหย่อนภาษี 2568 ฉบับสมบูรณ์ วางแผนอย่างไรให้คุ้มค่าที่สุด',
      category: 'การวางแผนภาษี',
      excerpt: 'เจาะลึกทุกสิทธิลดหย่อนภาษี ทั้งประกันชีวิต ประกันสุขภาพ กองทุน Thai ESG และเทคนิคการกระจายเงินเพื่อรับเงินคืนภาษีสูงสุด',
      content: 'การวางแผนภาษีไม่ใช่เพียงแค่เรื่องของการจ่ายภาษีให้น้อยลง แต่เป็นยุทธศาสตร์การสร้างความมั่งคั่งระยะยาว...',
      imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80',
      published: true,
      authorId: admin.id,
    },
    {
      slug: 'health-insurance-vs-medical-inflation',
      title: 'ทำไมคนวัยทำงานยุคนี้ ต้องมีประกันสุขภาพเหมาจ่าย? เจาะลึกเงินเฟ้อค่ารักษาพยาบาล',
      category: 'ประกันสุขภาพ',
      excerpt: 'เมื่อค่ารักษาพยาบาลในโรงพยาบาลเอกชนเติบโตเฉลี่ยปีละ 8-10% ประกันสุขภาพเหมาจ่ายจึงเป็นเครื่องมือปกป้องเงินเก็บที่ดีที่สุด',
      content: 'อัตราเงินเฟ้อทางการแพทย์ (Medical Inflation) สูงกว่าอัตราเงินเฟ้อทั่วไปถึง 3-4 เท่า การเจ็บป่วยเพียงครั้งเดียวอาจกลืนเงินเก็บทั้งชีวิต...',
      imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
      published: true,
      authorId: admin.id,
    },
    {
      slug: 'auspicious-stones-feng-shui-wealth',
      title: 'ศาสตร์แห่งหินมงคลและพลังธรรมชาติ: วิถีเสริมบารมีการค้าตามหลักเบญจธาตุ',
      category: 'สายมู & พลังใจ',
      excerpt: 'เปิดตำราพลังงานแห่งอัญมณีธรรมชาติ เลือกหินอย่างไรให้หนุนดวงชะตาถูกโฉลก และเสริมกระแสทรัพย์ให้คล่องตัว',
      content: 'หินธรรมชาติแต่ละชนิดมีโครงสร้างโมเลกุลและความถี่พลังงานที่เป็นเอกลักษณ์ เมื่อสวมใส่คู่กับการคิดดีทำดี จะช่วยเสริมสมาธิและความมั่นใจ...',
      imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop&q=80',
      published: true,
      authorId: admin.id,
    },
  ];

  for (const post of posts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }
  console.log(`📰 Blog Posts seeded: ${posts.length} posts ready`);

  // 5. Seed Leads (ตัวอย่าง Leads ใน CRM Pipeline)
  const leads = [
    {
      name: 'คุณวิชัย พัฒนากูล',
      phone: '089-111-2233',
      interest: 'AIA Health Happy เหมาเบิ้ลคุ้ม',
      preferredTime: 'ช่วงบ่าย (13:00 - 17:00)',
      status: 'NEW',
      notes: 'ต้องการเปรียบเทียบแผนค่าห้อง 3,000 กับ 5,000 บ.',
      userId: customer.id,
    },
    {
      name: 'คุณธิดาพร รัตนชัย',
      phone: '084-555-6677',
      interest: 'หินไหมทองจักรพรรดิ (Golden Rutilated Quartz)',
      preferredTime: 'ช่วงเช้า (09:00 - 12:00)',
      status: 'CONTACTED',
      notes: 'ติดต่อแล้ว ลูกค้าสนใจขนาดข้อมือ 16 cm นัดส่งมอบสัปดาห์หน้า',
      userId: null,
    },
    {
      name: 'คุณเกรียงไกร สมุทรวารี',
      phone: '081-333-9988',
      interest: 'AIA Annuity Fix วางแผนเกษียณ & บำนาญสุขใจ',
      preferredTime: 'ช่วงเย็น (17:00 - 20:00)',
      status: 'CLOSED',
      notes: 'อนุมัติกรมธรรม์เรียบร้อยแล้ว เบี้ยประกันรายปี 60,000 บ.',
      userId: customer.id,
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

  // 6. Seed Wishlist สำหรับ Customer
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

  console.log('✅ [Success] All database seeds completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
