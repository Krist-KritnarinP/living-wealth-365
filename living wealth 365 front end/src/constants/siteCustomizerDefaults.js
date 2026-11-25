// Default Curated Content for Living Wealth 365
export const DEFAULT_SITE_CONTENT = {
  // 1. Top Announcement Bar (Disabled by default for clean floating Liquid Glass header)
  announcement: {
    enabled: false,
    badge: 'NEW 2026',
    text: 'ประเมินสมดุลชีวิต 6 มิติ (Life Map) และศึกษาข้อมูลแร่ธาตุธรรมชาติ พร้อมนัดหมายปรึกษา Admin A & Admin B',
    link: '#lifemap',
    linkText: 'สำรวจเพิ่มเติม',
  },

  // 2. Brand Identity & Founders
  brand: {
    name: 'Living Wealth 365',
    slogan: 'A LIFE WELL PLANNED. A LIFE WELL LIVED.',
    adminAName: 'Admin A',
    adminARole: 'Life & Wealth Planner',
    adminBName: 'Admin B',
    adminBRole: 'Natural Energy & Wellbeing Curator',
  },

  // 3. Hero Section (Homepage)
  hero: {
    badge: 'A LIFE WELL PLANNED. A LIFE WELL LIVED.',
    titleLine1: 'วันนี้... อะไรคือสิ่งที่คุณ',
    titleLine2: 'อยากรักษาไว้มากที่สุด?',
    description:
      'ดูแลสุขภาพที่แข็งแรง เวลาอยู่กับคนที่รัก และความสบายใจไปพร้อมกับการวางแผนการเงิน Living Wealth 365 รวมเวิร์กชอป แผนประกัน AIA ภาษี สุขภาพ และแร่ธาตุธรรมชาติไว้ในที่เดียว โดย Admin A & Admin B',
    primaryBtnText: 'เครื่องมือประเมินและวางแผน',
    primaryBtnLink: '#lifemap',
    secondaryBtnText: 'รู้จัก Admin A & Admin B',
    secondaryBtnLink: '/about',
    trust1: 'วางแผนการเงิน & ประกัน AIA โดยที่ปรึกษาที่ได้รับอนุญาต',
    trust2: 'เวิร์กชอปองค์กร & กลุ่มเล็ก • วิทยาศาสตร์แร่ธาตุ SiO₂',
    imageUrl:
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1000&auto=format&fit=crop&q=80',
    imageBadge: 'ที่ปรึกษาคู่คิด',
    imageTitle: 'สุขภาพดี • การเงินมั่นคง • จิตใจสงบสุข',
    imageSubtitle: 'Admin A & Admin B พร้อมร่วมค้นหาชีวิตที่ใช่ที่สุดสำหรับคุณ',
  },

  // 4. Core Pathways
  gateways: {
    sectionBadge: '4 เส้นทางหลักของ Living Wealth 365',
    sectionTitle: 'เลือกเรื่องที่คุณต้องการดูแลวันนี้',
    sectionSubtitle: 'จัดหมวดหมู่ชัดเจนเพื่อให้คุณเข้าถึงข้อมูลและบริการที่ตรงใจได้ทันที',
    living: {
      badge: 'Gateway 01',
      title: 'Living (วิถีชีวิต)',
      desc: 'การสร้างสมดุลชีวิต 6 มิติ (Life Map), วิทยาศาสตร์การชะลอวัยระดับเซลล์ (Longevity), และแร่ธาตุธรรมชาติคัดสรรตามหลักธรณีวิทยาและพลังจักระ',
      point1: 'Life: การออกแบบเวลา & เกษียณอย่างมั่นคง',
      point2: 'Wellbeing: การจัดสภาพแวดล้อมบ้านเพื่อการพักผ่อน',
      point3: 'Earth & Energy: โครงสร้างแร่ธาตุธรรมชาติ',
      btnText: 'สำรวจหมวด Living',
      link: '/life',
    },
    learning: {
      badge: 'Gateway 02',
      title: 'Learning (การเรียนรู้)',
      desc: 'โครงสร้างการเงิน 4 เสาหลัก การคำนวณและวางแผนภาษี 2568 และแนวทางการดูแลจิตใจอย่างเป็นระบบ',
      point1: 'Wealth: แผนประกันสุขภาพ & วางแผนภาษี 2568',
      point2: 'Inner Life: การฝึกสติและความสงบภายใน',
      point3: "Journal: บันทึกความคิดของ Admin A & Admin B",
      btnText: 'สำรวจหมวด Learning',
      link: '/wealth',
    },
    connecting: {
      badge: 'Gateway 03',
      title: 'Connecting (เพื่อนร่วมทาง)',
      desc: 'ทำความรู้จัก Admin A & Admin B และนัดหมายสนทนาเพื่อแลกเปลี่ยนมุมมองและวางแผนชีวิตอย่างเป็นกลาง',
      point1: 'About: จุดเริ่มต้นของ Living Wealth 365',
      point2: 'แนวทางการให้คำปรึกษาอย่างเป็นกลาง',
      point3: 'นัดหมายปรึกษาส่วนตัว 1 ต่อ 1',
      btnText: 'รู้จักเรา & นัดหมายสนทนา',
      link: '/about',
    },
  },

  // 5. Personal Brand Narrative (Admin A & Admin B)
  narrative: {
    badge: 'ADMIN A & ADMIN B • เพื่อนร่วมทางของคุณ',
    titleLine1: 'เริ่มจากการรับฟังชีวิตที่คุณต้องการ',
    titleLine2: 'แล้วค่อยวางแผนการเงินไปพร้อมกัน',
    body: 'Admin A และ Admin B เชื่อว่าความมั่นคงทางการเงินกับสุขภาพกายใจต้องเดินไปด้วยกัน การมีแผนรับมือความเสี่ยงที่รัดกุมช่วยให้คุณมีพื้นที่และเวลาดูแลตัวเองกับคนที่รักได้อย่างเต็มที่',
    boxQuote:
      '"ทุกบทสนทนาเริ่มต้นจากการรับฟัง เพื่อให้คุณได้แผนที่เข้าใจง่ายและสบายใจที่จะตัดสินใจด้วยตัวเอง"',
    btnText: "นัดหมายสนทนา (Let's Talk)",
    btnLink: '/about#talk',
    adminAImage:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
    adminBImage:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80',
  },

  // 6. Curated Mineral Section Header
  minerals: {
    badge: 'Earth & Energy Curation',
    title: 'แร่ธาตุธรรมชาติ คัดสรรตามหลักวิทยาศาสตร์และจักระ',
    subtitle: 'ผลึกธรรมชาติแท้ โครงสร้าง SiO₂ และคุณสมบัติเพียโซอิเล็กทริกเพื่อความสงบมั่นคง',
    btnText: 'ชมคลังแร่ธาตุทั้งหมด',
    btnLink: '/earth-energy',
  },

  // 7. Journal Section Header
  journal: {
    badge: 'คลังความรู้และบทความ',
    title: "วารสารความคิดและ Admin A's Notes",
    subtitle: 'บทความคัดสรรเพื่อช่วยให้คุณวางแผนชีวิต บริหารภาษี และดูแลสุขภาพ',
    btnText: 'อ่านวารสารทั้งหมด',
    btnLink: '/journal',
  },

  // 8. Lead Capture / Let's Talk Section
  leadForm: {
    badge: 'การให้คำปรึกษาแบบส่วนตัว',
    title: 'พร้อมเริ่มต้นวางแผนชีวิตและการเงินแล้วหรือยัง?',
    subtitle:
      'Admin A & Admin B พร้อมรับฟังและร่วมออกแบบแนวทางชีวิตและการเงินที่เหมาะสมกับคุณโดยเฉพาะ',
    ctaButtonText: 'ส่งคำขอรับคำปรึกษา',
    successTitle: 'รับข้อมูลเรียบร้อยแล้ว',
    successMessage:
      'ขอบคุณที่ไว้วางใจ Admin A & Admin B จะติดต่อกลับเพื่อนัดหมายเวลาที่สะดวกโดยเร็วที่สุดครับ',
  },

  // 9. Footer & Legal
  footer: {
    aboutText:
      'พื้นที่รวบรวมความรู้และเครื่องมือวางแผนชีวิต การเงิน สุขภาพ และแร่ธาตุธรรมชาติ โดย Admin A & Admin B',
    quote:
      '"เพื่อนร่วมทางที่พร้อมรับฟังและช่วยวางแผนชีวิตให้เหมาะกับคุณในทุกช่วงวัย"',
    phone: '081-234-5678',
    email: 'contact@livingwealth365.com',
    location: 'กรุงเทพมหานคร, ประเทศไทย',
    copyright: '© 2026 Living Wealth 365. All rights reserved.',
    disclaimer:
      'ข้อมูลและบทความในเว็บไซต์นี้จัดทำขึ้นเพื่อให้ความรู้และเป็นแนวทางในการวางแผนเบื้องต้นเท่านั้น ไม่ถือเป็นการให้คำปรึกษาทางกฎหมายหรือการลงทุนโดยตรง',
  },
};

// Deep merge helper
export function deepMerge(target, source) {
  const output = { ...target };
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}

export function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

// Deep get helper with dot-notation
export function getByPath(obj, path, fallback = '') {
  if (!obj || !path) return fallback;
  const parts = path.split('.');
  let curr = obj;
  for (const part of parts) {
    if (curr === undefined || curr === null) return fallback;
    curr = curr[part];
  }
  return curr !== undefined && curr !== null ? curr : fallback;
}

// Deep set helper returning a cloned updated object
export function setByPath(obj, path, value) {
  const parts = path.split('.');
  const clone = JSON.parse(JSON.stringify(obj || {}));
  let curr = clone;
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    if (!curr[part] || typeof curr[part] !== 'object') {
      curr[part] = {};
    }
    curr = curr[part];
  }
  curr[parts[parts.length - 1]] = value;
  return clone;
}
