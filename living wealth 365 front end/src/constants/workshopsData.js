// ==========================================
// 🎓 Living Wealth 365 — Workshops & Presentation Catalog
// Supports both Corporate (B2B) and Small Group / Private (B2C) sessions.
// ==========================================

export const WORKSHOP_AUDIENCES = [
  { id: 'ALL', label: 'ทั้งหมด' },
  { id: 'CORPORATE', label: 'สำหรับองค์กร (Corporate)' },
  { id: 'SMALL_GROUP', label: 'กลุ่มเล็ก & ส่วนตัว' },
];

export const WORKSHOP_TRACKS = [
  { id: 'ALL', label: 'ทุกหลักสูตร' },
  { id: 'CRYSTAL', label: 'ทำหินมงคล & แร่ธาตุ' },
  { id: 'LIFE_WEALTH', label: 'ศาสตร์ชีวิต & การเงิน' },
  { id: 'WELLBEING_THERAPY', label: 'บำบัด สมาธิ & คำปรึกษา' },
];

export const WORKSHOPS_CATALOG = [
  {
    id: 'ws-crystal-craft',
    track: 'CRYSTAL',
    trackLabel: 'ทำหินมงคล & แร่ธาตุ',
    audiences: ['CORPORATE', 'SMALL_GROUP'],
    title: 'Crystal & Mineral Crafting Workshop',
    subtitle: 'ออกแบบชิ้นงานแร่ธรรมชาติเฉพาะตัว ผสานวิทยาศาสตร์ผลึก SiO₂ และพลังประจำวันเกิด',
    duration: '2.5 – 3 ชั่วโมง',
    groupSize: '6–12 คน (กลุ่มเล็ก) / 20–60 คน (องค์กร)',
    format: 'On-site / Studio / ออฟฟิศองค์กร',
    facilitator: 'Admin B',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1000&auto=format&fit=crop&q=80',
    highlights: [
      'ทำความรู้จักโครงสร้างแร่ธรรมชาติจริง แยกแยะหินแท้และคุณสมบัติเพียโซอิเล็กทริก',
      'วิเคราะห์คู่สีและแร่ธาตุที่เหมาะกับบุคลิก เป้าหมาย และวันเกิดของแต่ละคน',
      'ลงมือร้อยและออกแบบกำไลหรือชิ้นงานตั้งโต๊ะด้วยตัวเอง พร้อมนำกลับบ้าน',
    ],
    agenda: [
      { time: '00:00 – 00:30', topic: 'เปิดมุมมองวิทยาศาสตร์แร่ธาตุและประวัติศาสตร์คริสตัล' },
      { time: '00:30 – 01:15', topic: 'คัดเลือกหินแท้ตามวันเกิดและเป้าหมายชีวิตเฉพาะบุคคล' },
      { time: '01:15 – 02:30', topic: 'ลงมือออกแบบและประกอบชิ้นงาน (Hands-on Crafting)' },
      { time: '02:30 – 03:00', topic: 'วิธีดูแลรักษาผลึกหินและสรุปความหมายชิ้นงานของแต่ละคน' },
    ],
    takeaways: 'ชิ้นงานหินธรรมชาติแท้ที่ออกแบบเอง 1 ชิ้น พร้อมคู่มือข้อมูลแร่และการดูแล',
  },
  {
    id: 'ws-life-retirement',
    track: 'LIFE_WEALTH',
    trackLabel: 'ศาสตร์ชีวิต & การเงิน',
    audiences: ['CORPORATE', 'SMALL_GROUP'],
    title: 'Life Map 6 มิติ & Retirement Readiness',
    subtitle: 'เวิร์กชอปออกแบบสมดุลชีวิตและวางแผนเตรียมเกษียณอย่างเป็นระบบสำหรับวัยทำงานและองค์กร',
    duration: 'ครึ่งวัน (3 ชม.) หรือ เต็มวัน (6 ชม.)',
    groupSize: '8–15 คน (กลุ่มเล็ก) / 20–100+ คน (องค์กร)',
    format: 'On-site / ออฟฟิศองค์กร / Online',
    facilitator: 'Admin A',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1000&auto=format&fit=crop&q=80',
    highlights: [
      'ประเมินสมดุลชีวิต 6 มิติ (งาน เงิน สุขภาพ ครอบครัว จิตใจ เวลา) เพื่อเห็นจุดที่ต้องดูแลก่อน',
      'แยกแยะรายจ่ายหลังเกษียณ 3 กลุ่ม และคำนวณงบชีวิตที่ต้องการจริง',
      'วางโครงสร้างการเงิน 4 เสาหลัก ลดหย่อนภาษี และโอนย้ายความเสี่ยงสุขภาพ',
    ],
    agenda: [
      { time: 'ช่วงที่ 1', topic: 'สำรวจสมดุลชีวิต 6 มิติ (Life Map Self-Assessment)' },
      { time: 'ช่วงที่ 2', topic: 'ออกแบบภาพชีวิตหลังเกษียณและทำบัญชีรายจ่าย 3 กลุ่ม' },
      { time: 'ช่วงที่ 3', topic: 'โครงสร้างการเงิน 4 เสาหลัก & กลยุทธ์ภาษีสำหรับพนักงาน' },
      { time: 'ช่วงที่ 4', topic: 'Q&A และเวิร์กชีตแผนปฏิบัติการ 90 วัน' },
    ],
    takeaways: 'สมุดแผน Life Map 6 มิติ และตารางประเมินงบเกษียณส่วนตัว',
  },
  {
    id: 'ws-burnout-sanctuary',
    track: 'WELLBEING_THERAPY',
    trackLabel: 'บำบัด สมาธิ & คำปรึกษา',
    audiences: ['CORPORATE', 'SMALL_GROUP'],
    title: 'Burnout Recovery & Deep Sleep Sanctuary',
    subtitle: 'ฟื้นฟูร่างกายจากความล้าสะสม จัดสมดุลการนอน และลดความเครียดด้วยหลัก Longevity',
    duration: '2 – 3 ชั่วโมง',
    groupSize: '6–12 คน (กลุ่มเล็ก) / 15–80 คน (องค์กร)',
    format: 'On-site / Studio / Online',
    facilitator: 'Admin B',
    imageUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1000&auto=format&fit=crop&q=80',
    highlights: [
      'เข้าใจกลไกความเครียดเรื้อรัง นาฬิกาชีวภาพ (Circadian Rhythm) และคุณภาพการนอนลึก',
      'ฝึกเทคนิคหายใจลดคอร์ติซอล (Box Breathing & Vagus Nerve Reset) ทำได้จริงที่โต๊ะทำงาน',
      'ออกแบบ Home Health Sanctuary ให้ห้องนอนและบ้านเป็นพื้นที่ฟื้นฟูพลังงาน',
    ],
    agenda: [
      { time: '00:00 – 00:45', topic: 'เช็กสัญญาณ Burnout และกลไกการฟื้นฟูร่างกายระดับเซลล์' },
      { time: '00:45 – 01:30', topic: 'ฝึกปฏิบัติการหายใจและผ่อนคลายระบบประสาทอัตโนมัติ' },
      { time: '01:30 – 02:30', topic: 'ออกแบบตารางการนอนและเช็กลิสต์จัดพื้นที่พักผ่อนที่บ้าน' },
    ],
    takeaways: 'คู่มือฟื้นฟูการนอน 7 วัน และเช็กลิสต์ Home Health Sanctuary',
  },
  {
    id: 'ws-stillness-advisory',
    track: 'WELLBEING_THERAPY',
    trackLabel: 'บำบัด สมาธิ & คำปรึกษา',
    audiences: ['SMALL_GROUP'],
    title: 'Stillness Circle & Private Life Advisory',
    subtitle: 'วงสนทนาขนาดเล็ก ฝึกสังเกตใจ วางความกังวล และรับคำปรึกษาชีวิต-การเงินอย่างเป็นส่วนตัว',
    duration: '2.5 ชั่วโมง',
    groupSize: '4–8 คน (จำกัดจำนวนเพื่อความเป็นส่วนตัว)',
    format: 'Private Studio / Online',
    facilitator: 'Admin A & Admin B',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1000&auto=format&fit=crop&q=80',
    highlights: [
      'พื้นที่ปลอดภัยสำหรับหยุดพัก สังเกตความคิด และทบทวนสิ่งที่สำคัญในช่วงวัยปัจจุบัน',
      'กิจกรรมฝึกสติแบบร่วมสมัย เข้าใจง่าย ใช้ได้จริงในชีวิตประจำวัน',
      'เปิดช่วงปรึกษาแบบใกล้ชิดทั้งเรื่องการจัดสรรเวลา ความเครียด และความกังวลเรื่องการเงิน',
    ],
    agenda: [
      { time: '00:00 – 00:30', topic: 'Check-in & Mindfulness Pause วางภาระจากงานประจำวัน' },
      { time: '00:30 – 01:30', topic: 'กิจกรรม Self-Inquiry ทบทวนคุณค่าและทางเลือกชีวิต' },
      { time: '01:30 – 02:30', topic: 'Open Advisory Circle แลกเปลี่ยนและรับคำแนะนำจาก Admin A & Admin B' },
    ],
    takeaways: 'แนวทางจัดลำดับความสำคัญชีวิตส่วนตัว และสิทธิ์นัดคุย 1-on-1 ต่อเนื่อง',
  },
  {
    id: 'ws-tax-clinic',
    track: 'LIFE_WEALTH',
    trackLabel: 'ศาสตร์ชีวิต & การเงิน',
    audiences: ['CORPORATE'],
    title: 'Corporate Financial Wellness & Tax Clinic',
    subtitle: 'สวัสดิการความรู้ด้านภาษี ประกันสุขภาพ และบริหารกระแสเงินสดสำหรับพนักงานองค์กร',
    duration: '2 – 3 ชั่วโมง (+ บูธให้คำปรึกษาส่วนตัว)',
    groupSize: '30–150 คน',
    format: 'ออฟฟิศองค์กร / Online Webinar',
    facilitator: 'Admin A',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1000&auto=format&fit=crop&q=80',
    highlights: [
      'อัปเดตสิทธิลดหย่อนภาษีเงินได้บุคคลธรรมดาและวิธีใช้สิทธิให้คุ้มค่าตามฐานภาษีจริง',
      'สอนวิธีอ่านสวัสดิการประกันกลุ่มบริษัทและอุดช่องว่างค่ารักษาพยาบาลอย่างประหยัด',
      'มีช่วง Private Clinic เปิดให้พนักงานเข้ามาถามแผนการเงินส่วนตัวได้หลังจบสัมมนา',
    ],
    agenda: [
      { time: '00:00 – 01:00', topic: 'วางแผนภาษีและจัดโครงสร้างรายจ่ายสำหรับมนุษย์เงินเดือน' },
      { time: '01:00 – 01:45', topic: 'เสริมเกราะสวัสดิการสุขภาพและเตรียมเงินสำรองฉุกเฉิน' },
      { time: '01:45 – 03:00', topic: 'Private 1-on-1 Financial Clinic สำหรับพนักงานที่สนใจ' },
    ],
    takeaways: 'สไลด์สรุปลดหย่อนภาษีประจำปี และสิทธิ์ใช้เครื่องมือคำนวณภาษีออนไลน์',
  },
  {
    id: 'ws-mindful-space',
    track: 'CRYSTAL',
    trackLabel: 'ทำหินมงคล & แร่ธาตุ',
    audiences: ['SMALL_GROUP', 'CORPORATE'],
    title: 'Mindful Desk & Crystal Energy Styling',
    subtitle: 'เวิร์กชอปจัดโต๊ะทำงานและมุมพักผ่อนด้วยผลึกแร่ธรรมชาติเพื่อสมาธิและความสบายตา',
    duration: '2 ชั่วโมง',
    groupSize: '6–12 คน (กลุ่มเล็ก) / 15–40 คน (องค์กร)',
    format: 'Studio / ออฟฟิศองค์กร',
    facilitator: 'Admin B',
    imageUrl: 'https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?w=1000&auto=format&fit=crop&q=80',
    highlights: [
      'หลักการจัดแสง สี และวางผลึกแร่ธรรมชาติบนโต๊ะทำงานเพื่อลดความล้าทางสายตาและอารมณ์',
      'เรียนรู้ความแตกต่างของควอตซ์ อเมทิสต์ ซิทริน และลาพิส ลาซูลี ในเชิงแร่ธาตุและสุนทรียศาสตร์',
      'ทดลองจัดชุดหินตั้งโต๊ะจริงพร้อมรับคำแนะนำการจับคู่โทนสีตามพื้นที่ของแต่ละคน',
    ],
    agenda: [
      { time: '00:00 – 00:40', topic: 'สภาพแวดล้อมกับสมาธิ: จัดโต๊ะทำงานให้ลดความเครียด' },
      { time: '00:40 – 01:30', topic: 'ทำความรู้จักผลึกตั้งโต๊ะและทดลองจัดวางจริง' },
      { time: '01:30 – 02:00', topic: 'สรุปชุดแร่ที่เหมาะกับแต่ละพื้นที่และวิธีทำความสะอาด' },
    ],
    takeaways: 'ชุดหินธรรมชาติตั้งโต๊ะขนาดพกพา 1 ชุด พร้อมการ์ดข้อมูลแร่',
  },
];

// Built-in Pitch Deck slides for 1-click Fullscreen / Modal presentation
export const WORKSHOP_DECK_SLIDES = [
  {
    id: 'slide-1',
    kicker: 'LIVING WEALTH 365 • WORKSHOPS & EXPERIENCES',
    title: 'เวิร์กชอปออกแบบชีวิต การเงิน สุขภาพ และแร่ธาตุธรรมชาติ',
    subtitle: 'กิจกรรมเชิงปฏิบัติการสำหรับองค์กร (Corporate) และกลุ่มเล็ก (Private) โดย Admin A & Admin B',
    points: [
      'ผสานความรู้ที่ใช้ได้จริงกับกิจกรรมลงมือทำที่ผ่อนคลายและเป็นกันเอง',
      'ปรับเนื้อหา เวลา และกิจกรรมให้เข้ากับโจทย์ของแต่ละองค์กรและกลุ่มผู้เข้าร่วม',
      'พร้อมสื่อประกอบ เวิร์กชีต และอุปกรณ์หินธรรมชาติแท้ครบชุด',
    ],
    highlight: 'A Life Well Planned. A Life Well Lived.',
  },
  {
    id: 'slide-2',
    kicker: '01 • WHY THIS MATTERS',
    title: 'ความมั่นคงของคนทำงานต้องดูแลทั้งการเงินและจิตใจไปพร้อมกัน',
    subtitle: 'หลายองค์กรพบว่าความเครียดเรื่องเงินและภาวะหมดไฟส่งผลโดยตรงต่อความสุขและประสิทธิภาพงาน',
    points: [
      'เรื่องการเงินและภาษี: ช่วยให้พนักงานเห็นภาพชัด ลดความกังวลระยะยาวและเตรียมพร้อมก่อนเกษียณ',
      'เรื่องสุขภาพและการพักผ่อน: ฟื้นฟูคุณภาพการนอนและคลายความล้าด้วยแนวทางที่ทำได้ทุกวัน',
      'เรื่องสมาธิและความสร้างสรรค์: กิจกรรมทำชิ้นงานแร่ธรรมชาติช่วยดึงใจกลับมาอยู่กับปัจจุบัน',
    ],
    highlight: 'ออกแบบให้ผู้เข้าร่วมได้ทั้ง "ความรู้ที่ใช้ได้จริง" และ "ความผ่อนคลายกลับบ้าน"',
  },
  {
    id: 'slide-3',
    kicker: '02 • THREE SIGNATURE TRACKS',
    title: '3 กลุ่มหลักสูตรหลักที่เลือกจัดเดี่ยวหรือผสมกันได้',
    subtitle: 'ครอบคลุมตั้งแต่กิจกรรมสร้างสรรค์ผ่อนคลาย ไปจนถึงเวิร์กชอปวางแผนชีวิตและการเงินเชิงลึก',
    points: [
      '1. ทำหินมงคล & แร่ธาตุธรรมชาติ (Crystal Crafting & Mindful Desk): เรียนรู้วิทยาศาสตร์ SiO₂ และลงมือออกแบบชิ้นงานหินแท้ด้วยตัวเอง',
      '2. ศาสตร์ชีวิต & การเงิน (Life Map 6 มิติ, เตรียมเกษียณ & Tax Clinic): วางแผนชีวิตและภาษีอย่างเป็นระบบโดย Admin A',
      '3. บำบัด สมาธิ & คำปรึกษา (Burnout Recovery, Sleep Sanctuary & Stillness Circle): ฟื้นฟูกายใจและวงสนทนากลุ่มเล็กโดย Admin B',
    ],
    highlight: 'สามารถจัดแบบ Hybrid เช่น ครึ่งเช้าวางแผนชีวิต ครึ่งบ่ายทำชิ้นงานแร่ธรรมชาติ',
  },
  {
    id: 'slide-4',
    kicker: '03 • TWO FORMATS',
    title: 'รองรับทั้งรูปแบบองค์กร (Corporate) และกลุ่มเล็ก (Small Group)',
    subtitle: 'ปรับสเกลอุปกรณ์ วิทยากร และรูปแบบกิจกรรมตามจำนวนผู้เข้าร่วม',
    points: [
      'สำหรับองค์กร (20–150 คน): สัมมนาเชิงปฏิบัติการ, Employee Wellbeing Day, Pre-Retirement Program, Team Bonding พร้อมทีมผู้ช่วย',
      'สำหรับกลุ่มเล็ก & ส่วนตัว (4–12 คน): บรรยากาศอบอุ่นเป็นกันเอง ดูแลใกล้ชิดรายบุคคล เหมาะกับกลุ่มเพื่อน ครอบครัว หรือผู้บริหาร',
      'สถานที่ยืดหยุ่น: จัดที่ออฟฟิศลูกค้า, Private Studio หรือรูปแบบ Online สำหรับทีมที่ทำงานทางไกล',
    ],
    highlight: 'ทุกหลักสูตรมีเอกสารสรุปและคำแนะนำต่อเนื่องหลังจบกิจกรรม',
  },
  {
    id: 'slide-5',
    kicker: '04 • HOW WE WORK TOGETHER',
    title: '4 ขั้นตอนออกแบบเวิร์กชอปให้ตรงโจทย์ของคุณ',
    subtitle: 'กระบวนการทำงานที่ชัดเจน เรียบง่าย และยืดหยุ่นตามงบประมาณและเวลา',
    points: [
      'ขั้นที่ 1 รับฟังโจทย์: พูดคุยเป้าหมาย จำนวนคน ช่วงวัย และระยะเวลาที่ต้องการ',
      'ขั้นที่ 2 ออกแบบหลักสูตร: เสนอโครงสร้างเนื้อหา กำหนดการ และรายการอุปกรณ์ที่เหมาะสม',
      'ขั้นที่ 3 จัดกิจกรรมจริง: ดำเนินเวิร์กชอปโดย Admin A & Admin B พร้อมอุปกรณ์ครบชุด',
      'ขั้นที่ 4 สรุปผลและดูแลต่อ: ส่งมอบสรุปเนื้อหาและเปิดช่องทางให้คำปรึกษาเพิ่มเติมสำหรับผู้สนใจ',
    ],
    highlight: 'นัดคุยเพื่อออกแบบหลักสูตรและรับข้อเสนอเบื้องต้นได้โดยไม่มีค่าใช้จ่าย',
  },
  {
    id: 'slide-6',
    kicker: '05 • NEXT STEP',
    title: 'พร้อมออกแบบเวิร์กชอปสำหรับองค์กรหรือกลุ่มของคุณ',
    subtitle: 'ติดต่อ Admin A & Admin B เพื่อรับโครงร่างหลักสูตรและนัดคุยรายละเอียด',
    points: [
      'ระบุรูปแบบที่สนใจ (องค์กร / กลุ่มเล็ก) และจำนวนผู้เข้าร่วมโดยประมาณ',
      'เลือกหัวข้อหลักหรือให้เราช่วยแนะนำหลักสูตรที่เหมาะกับช่วงวัยของกลุ่มเป้าหมาย',
      'นัดหมายพูดคุยผ่านแบบฟอร์มบนหน้าเว็บ หรือส่งรายละเอียดทาง LINE ได้ทันที',
    ],
    highlight: 'Living Wealth 365 — A Life Well Planned. A Life Well Lived.',
  },
];

// Structure ready for customer-uploaded Canva / PowerPoint exported 16:9 image slides or PDF (Phase 2 CMS)
export const CUSTOM_DECK_CONFIG = {
  title: 'พื้นที่สไลด์จาก Canva / PowerPoint',
  slides: [], // Array of { imageUrl, caption } exported 16:9 from Canva/PPT onto Cloudflare R2
  pdfUrl: '', // Optional direct R2 PDF URL
};
