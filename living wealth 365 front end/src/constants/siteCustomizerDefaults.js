// Default Curated Content for Living Wealth 365
export const DEFAULT_SITE_CONTENT = {
  // 1. Top Announcement Bar (Disabled by default for clean floating Liquid Glass header)
  announcement: {
    enabled: false,
    badge: 'NEW 2026',
    text: '✨ สัมผัสสมดุลชีวิต 6 มิติ (Life Map) และพลังงานธรรมชาติ พร้อมปรึกษาฟรีกับ Admin A & Admin B',
    link: '#lifemap',
    linkText: 'สำรวจเลย →',
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
    primaryBtnText: 'ลองเครื่องมือวางแผนฟรี',
    primaryBtnLink: '#lifemap',
    secondaryBtnText: 'รู้จัก Admin A & Admin B',
    secondaryBtnLink: '/about',
    trust1: 'วางแผนการเงิน & ประกัน AIA โดยที่ปรึกษาที่ได้รับอนุญาต',
    trust2: 'เวิร์กชอปองค์กร & กลุ่มเล็ก • วิทยาศาสตร์แร่ธาตุ SiO₂',
    imageUrl:
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1000&auto=format&fit=crop&q=80',
    imageBadge: 'Fellow Travelers',
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
      point1: 'Life: การออกแบบเวลา & เกษียณสำราญ',
      point2: 'Wellbeing: Home Health Sanctuary',
      point3: 'Earth & Energy: ผลึกแร่ธาตุ & 3D Visualizer',
      btnText: 'สำรวจหมวด Living',
      link: '/life',
    },
    learning: {
      badge: 'Gateway 02',
      title: 'Learning (การเรียนรู้)',
      desc: 'สถาปัตยกรรมการเงิน 4 เสาหลัก, การคำนวณและวางแผนภาษีเชิงรุก 2568, และโลกภายใน (Inner Life) เพื่อคืนความเงียบสงบให้จิตใจ',
      point1: 'Wealth: แผนประกันเหมาจ่าย & ภาษี 2568',
      point2: 'Inner Life: ศิลปะแห่งความเงียบสงบ (Stillness)',
      point3: "Journal: บันทึกความคิดของ Admin A & Admin B",
      btnText: 'สำรวจหมวด Learning',
      link: '/wealth',
    },
    connecting: {
      badge: 'Gateway 03',
      title: 'Connecting (เพื่อนร่วมทาง)',
      desc: "ทำความรู้จัก Admin A & Admin B และนัดพูดคุยแบบเป็นกันเอง (Let's Talk) เพื่อแลกเปลี่ยนมุมมองและวางแผนชีวิตให้เหมาะกับคุณ",
      point1: 'About: จุดเริ่มต้นของ Living Wealth 365',
      point2: 'Fellow Travelers: ปรัชญาไม่ตัดสิน',
      point3: "Let's Talk: นัดหมายพูดคุยฟรี 1-on-1",
      btnText: 'รู้จักเรา & นัดหมายพูดคุย',
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
    btnText: 'เปิด 3D Visualizer & คลังแร่ทั้งหมด',
    btnLink: '/earth-energy',
  },

  // 7. Journal Section Header
  journal: {
    badge: 'Reflections & Knowledge Hub',
    title: "วารสารความคิดและ Admin A's Notes",
    subtitle: 'บทความคัดสรรเพื่อช่วยให้คุณวางแผนชีวิต บริหารภาษี และดูแลสุขภาพ',
    btnText: 'อ่านวารสารทั้งหมด',
    btnLink: '/journal',
  },

  // 8. Lead Capture / Let's Talk Section
  leadForm: {
    badge: '1-ON-1 CONFIDENTIAL CONSULTATION',
    title: 'พร้อมเริ่มต้นสร้างชีวิตที่คุณอยากรักษาไว้แล้วหรือยัง?',
    subtitle:
      'Admin A & Admin B พร้อมรับฟังและร่วมออกแบบแนวทางชีวิตและการเงินที่เหมาะกับคุณโดยเฉพาะ (ไม่มีค่าใช้จ่าย)',
    ctaButtonText: 'ส่งข้อมูลเพื่อให้นัดหมายติดต่อกลับ',
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
