import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const SEED_WORKSHOPS = [
  {
    slug: 'crystal-mineral-crafting',
    track: 'CRYSTAL',
    trackLabel: 'ทำหินมงคล & แร่ธาตุ',
    audiences: ['CORPORATE', 'SMALL_GROUP'],
    title: 'Crystal & Mineral Crafting Workshop',
    subtitle:
      'ออกแบบชิ้นงานแร่ธรรมชาติเฉพาะตัว ผสานวิทยาศาสตร์ผลึก SiO₂ โทนสีบำบัด และความหมายประจำวันเกิด',
    duration: '2.5 – 3 ชั่วโมง',
    groupSize: '6–12 คน (กลุ่มเล็ก) / 20–60 คน (องค์กร)',
    format: 'On-site / Studio / ออฟฟิศองค์กร',
    facilitator: 'Admin B',
    imageUrl:
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1000&auto=format&fit=crop&q=80',
    painPoints: [
      'ทีมงานทำงานหน้าจอต่อเนื่องจนสมาธิสั้นและล้าสะสม อยากได้กิจกรรมผ่อนคลายที่ได้ลงมือทำจริงด้วยมือ',
      'หลายคนสนใจหินมงคลแต่อยากเข้าใจข้อมูลจริงว่าหินแท้ดูอย่างไร มีโครงสร้างแร่แบบไหน ไม่ใช่ความเชื่อลอยๆ',
      'กิจกรรมองค์กรแบบเดิมๆ มักเป็นการนั่งฟังบรรยาย ทำให้คนในทีมไม่ค่อยได้พูดคุยแลกเปลี่ยนกันอย่างเป็นธรรมชาติ',
    ],
    whatAndHow: [
      {
        step: '01',
        title: 'ปูพื้นวิทยาศาสตร์แร่ธาตุและแยกหินแท้',
        detail:
          'ทำความรู้จักโครงสร้างผลึกควอตซ์ (SiO₂) คุณสมบัติเพียโซอิเล็กทริก และวิธีสังเกตเนื้อหินธรรมชาติด้วยตาเปล่าและไฟฉายส่องแร่',
      },
      {
        step: '02',
        title: 'เลือกแร่และคู่สีตามจังหวะชีวิต',
        detail:
          'จับคู่โทนสีและชนิดหินให้เข้ากับวันเกิด บุคลิก และเป้าหมายที่แต่ละคนอยากโฟกัสในช่วง 6–12 เดือนข้างหน้า',
      },
      {
        step: '03',
        title: 'ลงมือออกแบบและร้อยชิ้นงานด้วยตัวเอง',
        detail:
          'ออกแบบกำไลหินหรือชิ้นงานตั้งโต๊ะแบบ 1-on-1 โดยมี Admin B และทีมงานคอยดูแลการวัดขนาด การจัดสมดุลเม็ดหิน และการเก็บปมอย่างประณีต',
      },
    ],
    outcomes: [
      'ผู้เข้าร่วมได้พักสายตาจากหน้าจอ กลับมาอยู่กับปัจจุบันผ่านงานคราฟต์ที่ช่วยลดความตึงเครียดได้จริง',
      'ได้ชิ้นงานหินธรรมชาติแท้ที่ออกแบบด้วยตัวเอง 1 ชิ้น พร้อมการ์ดบันทึกชนิดแร่และวิธีดูแลรักษา',
      'เกิดบทสนทนาข้ามแผนกในองค์กรอย่างผ่อนคลาย ช่วยละลายพฤติกรรมโดยไม่ต้องฝืนเล่นเกมเสียงดัง',
    ],
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
    credits: [
      {
        name: 'ทีม People & Culture บจก. สยามเฮลท์เทค โซลูชันส์',
        orgType: 'องค์กรธุรกิจเทคโนโลยีสุขภาพ',
        participants: '38 ท่าน',
        note: 'กิจกรรม Wellness Day ประจำไตรมาส 3 (On-site ออฟฟิศสาทร)',
      },
      {
        name: 'กลุ่มลูกค้า VIP ธนาคารและที่ปรึกษาส่วนบุคคล',
        orgType: 'Private Client Appreciation',
        participants: '14 ท่าน',
        note: 'เวิร์กชอปกลุ่มเล็ก ณ Studio ย่านสุขุมวิท',
      },
      {
        name: 'ชมรมเจ้าของกิจการรุ่นใหม่ อารีย์–พหลโยธิน',
        orgType: 'กลุ่มผู้ประกอบการ SME',
        participants: '10 ท่าน',
        note: 'Private Weekend Session พร้อมเวิร์กชอปเลือกหินตั้งโต๊ะทำงาน',
      },
    ],
    slides: [],
    isActive: true,
    sortOrder: 1,
    seedFeedbacks: [
      {
        authorName: 'คุณพิมพ์ชนก ว.',
        authorRole: 'People Experience Lead • บจก. สยามเฮลท์เทค โซลูชันส์',
        rating: 5,
        comment:
          'พนักงานในทีมชอบมากค่ะ ปกติสาย Tech จะไม่ค่อยอินกับกิจกรรมสายมู แต่พอ Admin B อธิบายเรื่องโครงสร้างผลึกและแร่ธาตุแบบวิทยาศาสตร์ก่อน ทุกคนตั้งใจเลือกหินและคุยกันสนุกมาก บรรยากาศผ่อนคลายตั้งแต่ต้นจนจบ',
      },
      {
        authorName: 'คุณธนกร ร.',
        authorRole: 'เจ้าของธุรกิจนำเข้า • กลุ่มเล็กวันเสาร์',
        rating: 5,
        comment:
          'ได้ลองจับหินแท้หลายชนิดเทียบกันจริงๆ ทำให้เข้าใจความต่างของเนื้อหิน กลับมาใส่กำไลที่ร้อยเองทุกวัน เหมือนเป็นตัวเตือนสติให้ใจเย็นลงเวลางานยุ่งครับ',
      },
    ],
  },
  {
    slug: 'life-map-retirement-readiness',
    track: 'LIFE_WEALTH',
    trackLabel: 'ศาสตร์ชีวิต & การเงิน',
    audiences: ['CORPORATE', 'SMALL_GROUP'],
    title: 'Life Map 6 มิติ & Retirement Readiness',
    subtitle:
      'เวิร์กชอปออกแบบสมดุลชีวิตและวางแผนเตรียมเกษียณอย่างเป็นระบบสำหรับวัยทำงานและองค์กร',
    duration: 'ครึ่งวัน (3 ชม.) หรือ เต็มวัน (6 ชม.)',
    groupSize: '8–15 คน (กลุ่มเล็ก) / 20–100+ คน (องค์กร)',
    format: 'On-site / ออฟฟิศองค์กร / Online',
    facilitator: 'Admin A',
    imageUrl:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1000&auto=format&fit=crop&q=80',
    painPoints: [
      'พนักงานวัย 35–55 ปีเริ่มกังวลเรื่องเงินหลังเกษียณและค่ารักษาพยาบาล แต่ไม่รู้จะเริ่มคำนวณจากตรงไหน',
      'หลายคนซื้อกองทุนหรือประกันตามกระแสช่วงปลายปีโดยไม่มีภาพรวม ทำให้เงินจมหรือความคุ้มครองไม่ตรงความเสี่ยงจริง',
      'องค์กรต้องการสวัสดิการด้าน Financial Wellbeing ที่เป็นกลาง ให้ความรู้เชิงวางแผนจริงโดยไม่กดดันขายสินค้าในห้องเรียน',
    ],
    whatAndHow: [
      {
        step: '01',
        title: 'สำรวจสมดุลชีวิต 6 มิติ (Life Map)',
        detail:
          'ให้คะแนนและวาดแผนที่ชีวิตทั้ง 6 ด้าน (งาน เงิน สุขภาพ ครอบครัว จิตใจ เวลา) เพื่อเห็นจุดที่กำลังรั่วไหลก่อนวางแผนตัวเลข',
      },
      {
        step: '02',
        title: 'แยกบัญชีรายจ่ายหลังเกษียณ 3 กลุ่ม',
        detail:
          'ลงมือกรอกเวิร์กชีตแยกค่าใช้จ่ายที่ลดลง ค่าใช้จ่ายที่คงอยู่ และค่าใช้จ่ายที่มักเพิ่มขึ้น (เช่น สุขภาพและการดูแลระยะยาว)',
      },
      {
        step: '03',
        title: 'จัดโครงสร้างการเงิน 4 เสาหลัก & แผน 90 วัน',
        detail:
          'จัดลำดับเงินสำรอง การโอนย้ายความเสี่ยงสุขภาพ สิทธิลดหย่อนภาษี และแผนออมระยะยาว พร้อม Q&A ถามตอบเคสจริงกับ Admin A',
      },
    ],
    outcomes: [
      'ผู้เข้าร่วมเห็นตัวเลขงบเกษียณของตัวเองชัดเจนภายใน 3 ชั่วโมง แทนการคาดเดาด้วยความกังวล',
      'ได้ตารางแยกค่าใช้จ่าย 3 กลุ่ม และเช็กลิสต์ตรวจสอบสิทธิภาษีกับความคุ้มครองสุขภาพที่มีอยู่เดิม',
      'พนักงานรู้สึกมั่นคงทางการเงินมากขึ้น ลดความเครียดเรื่องเงินที่ส่งผลต่อสมาธิในการทำงาน',
    ],
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
    credits: [
      {
        name: 'ฝ่ายพัฒนาบุคลากร บมจ. แปซิฟิก โลจิสติกส์ กรุ๊ป',
        orgType: 'องค์กรขนาดใหญ่ด้านโลจิสติกส์',
        participants: '65 ท่าน',
        note: 'โครงการเตรียมความพร้อมก่อนเกษียณสำหรับพนักงานอายุ 45+ ปี',
      },
      {
        name: 'ทีมวิศวกรและผู้จัดการโครงการ บจก. เอเพ็กซ์ เอ็นจิเนียริ่ง',
        orgType: 'ธุรกิจวิศวกรรมและก่อสร้าง',
        participants: '42 ท่าน',
        note: 'Financial & Tax Wellbeing ครึ่งวัน (On-site)',
      },
      {
        name: 'กลุ่มครอบครัววัยสร้างตัว (Small Group Cohort #4)',
        orgType: 'กลุ่มเล็กวางแผนครอบครัว',
        participants: '12 ท่าน',
        note: 'เวิร์กชอปวันอาทิตย์พร้อมตรวจสุขภาพการเงินเบื้องต้น',
      },
    ],
    slides: [],
    isActive: true,
    sortOrder: 2,
    seedFeedbacks: [
      {
        authorName: 'คุณสุรชัย ป.',
        authorRole: 'HRD Manager • บมจ. แปซิฟิก โลจิสติกส์ กรุ๊ป',
        rating: 5,
        comment:
          'แบบประเมินหลังจบคลาสได้คะแนนความพึงพอใจสูงมากครับ พนักงานรุ่นพี่บอกว่าเพิ่งเคยเห็นการแยกรายจ่ายหลังเกษียณ 3 กลุ่มที่เข้าใจง่ายและเอาไปใช้คุยกับครอบครัวต่อได้ทันที ที่สำคัญคือ Admin A สอนเป็นกลางมากครับ',
      },
      {
        authorName: 'คุณกนกวรรณ ท.',
        authorRole: 'Senior Project Engineer • บจก. เอเพ็กซ์ เอ็นจิเนียริ่ง',
        rating: 5,
        comment:
          'ชอบช่วงทำ Life Map 6 มิติมากค่ะ ทำให้เห็นว่าที่ผ่านมาเราเทเวลาให้งานกับเงินจนลืมดูเรื่องสุขภาพและประกันส่วนเกิน พอได้เขียนแผน 90 วันแล้วรู้สึกโล่งขึ้นเยอะเลยค่ะ',
      },
    ],
  },
  {
    slug: 'burnout-recovery-deep-sleep',
    track: 'WELLBEING_THERAPY',
    trackLabel: 'บำบัด สมาธิ & คำปรึกษา',
    audiences: ['CORPORATE', 'SMALL_GROUP'],
    title: 'Burnout Recovery & Deep Sleep Sanctuary',
    subtitle:
      'ฟื้นฟูร่างกายจากความล้าสะสม จัดสมดุลการนอน และลดความเครียดด้วยหลัก Longevity',
    duration: '2 – 3 ชั่วโมง',
    groupSize: '6–12 คน (กลุ่มเล็ก) / 15–80 คน (องค์กร)',
    format: 'On-site / Studio / Online',
    facilitator: 'Admin B',
    imageUrl:
      'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1000&auto=format&fit=crop&q=80',
    painPoints: [
      'พนักงานและผู้บริหารหลับยาก ตื่นกลางดึก และรู้สึกไม่สดชื่นแม้จะนอนครบ 7–8 ชั่วโมง',
      'ความเครียดสะสมทำให้อารมณ์แปรปรวน ตัดสินใจช้าลง และเกิดภาวะหมดไฟ (Burnout) เงียบๆ ในทีม',
      'คำแนะนำสุขภาพทั่วไปมักทำตามยากในชีวิตจริงของคนทำงานออฟฟิศที่มีเวลาน้อย',
    ],
    whatAndHow: [
      {
        step: '01',
        title: 'เช็กสัญญาณ Burnout และนาฬิกาชีวภาพ',
        detail:
          'ทำความเข้าใจกลไกคอร์ติซอล เมลาโทนิน และพฤติกรรมเล็กๆ ช่วงเย็นที่รบกวนการนอนลึกโดยไม่รู้ตัว',
      },
      {
        step: '02',
        title: 'ฝึกหายใจรีเซ็ตระบบประสาทอัตโนมัติ',
        detail:
          'ฝึกปฏิบัติจริงกับเทคนิค Box Breathing และ Vagus Nerve Reset ที่ใช้เวลาเพียง 3 นาทีที่โต๊ะทำงานหรือก่อนนอน',
      },
      {
        step: '03',
        title: 'ออกแบบ Home Health Sanctuary ของตัวเอง',
        detail:
          'ปรับแสง อุณหภูมิ เสียง และกิจวัตร 60 นาทีก่อนนอนให้เหมาะกับตารางชีวิตจริงของแต่ละคน',
      },
    ],
    outcomes: [
      'ผู้เข้าร่วมมีเครื่องมือลดความตึงเครียดที่หยิบมาใช้ได้ทันทีระหว่างวันทำงาน',
      'ได้แผนฟื้นฟูการนอน 7 วัน และเช็กลิสต์จัดห้องนอนแบบ Home Health Sanctuary ที่ทำตามได้จริง',
      'ทีมงานตระหนักเรื่องการดูแลพลังงานและกล้าสื่อสารเรื่องภาระงานกันอย่างสร้างสรรค์มากขึ้น',
    ],
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
    credits: [
      {
        name: 'ทีมบริหารและแพทย์ คลินิกเวลเนส ทองหล่อ',
        orgType: 'ธุรกิจคลินิกสุขภาพและความงาม',
        participants: '24 ท่าน',
        note: 'In-house Stress & Sleep Recovery Workshop',
      },
      {
        name: 'ฝ่ายสร้างสรรค์และดิจิทัล บจก. นอร์ทสตาร์ ครีเอทีฟ',
        orgType: 'ดิจิทัลเอเจนซี่',
        participants: '30 ท่าน',
        note: 'Mental Recharge Session ช่วงปิดแคมเปญปลายปี',
      },
    ],
    slides: [],
    isActive: true,
    sortOrder: 3,
    seedFeedbacks: [
      {
        authorName: 'คุณณัฐธิดา ส.',
        authorRole: 'Creative Director • บจก. นอร์ทสตาร์ ครีเอทีฟ',
        rating: 5,
        comment:
          'ปกติทีมเอเจนซี่นอนดึกและคิดงานตลอดเวลา พอได้ลองฝึกหายใจในห้องเวิร์กชอปแล้วเห็นผลเลยว่าหัวโล่งขึ้นจริง กลับไปลองปรับไฟห้องนอนตามเช็กลิสต์ 3 คืน หลับสนิทขึ้นชัดเจนค่ะ',
      },
    ],
  },
  {
    slug: 'stillness-circle-private-advisory',
    track: 'WELLBEING_THERAPY',
    trackLabel: 'บำบัด สมาธิ & คำปรึกษา',
    audiences: ['SMALL_GROUP'],
    title: 'Stillness Circle & Private Life Advisory',
    subtitle:
      'วงสนทนาขนาดเล็ก ฝึกสังเกตใจ วางความกังวล และรับคำปรึกษาชีวิต-การเงินอย่างเป็นส่วนตัว',
    duration: '2 ชั่วโมง (จำกัดรอบละไม่เกิน 8 ท่าน)',
    groupSize: '4–8 คน (กลุ่มเล็กส่วนตัว)',
    format: 'Private Studio / Online (Zoom กลุ่มปิด)',
    facilitator: 'Admin A & Admin B',
    imageUrl:
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1000&auto=format&fit=crop&q=80',
    painPoints: [
      'อยู่ในช่วงเปลี่ยนผ่านของชีวิต (เปลี่ยนงาน สร้างครอบครัว ดูแลพ่อแม่ หรือเตรียมเกษียณ) แต่ไม่รู้จะปรึกษาใครอย่างเปิดใจ',
      'ความคิดวนซ้ำเรื่องอนาคตและการเงินทำให้ตัดสินใจไม่ได้ และไม่อยากเข้าสัมมนาห้องใหญ่ที่คนเยอะ',
      'ต้องการพื้นที่ปลอดภัยที่รับฟังทั้งด้านจิตใจและช่วยจัดระเบียบโครงสร้างชีวิตจริงควบคู่กัน',
    ],
    whatAndHow: [
      {
        step: '01',
        title: 'ฝึกสติอยู่กับปัจจุบันแบบไม่เคร่งเครียด',
        detail:
          'เริ่มด้วยการฝึกสังเกตลมหายใจและวางความคิดฟุ้งซ่าน 20 นาที เพื่อให้ใจนิ่งพอสำหรับการมองปัญหาอย่างเป็นกลาง',
      },
      {
        step: '02',
        title: 'วงสนทนารับฟังอย่างลึกซึ้ง (Deep Listening Circle)',
        detail:
          'แลกเปลี่ยนมุมมองในกลุ่มเล็กไม่เกิน 8 ท่าน ภายใต้กติการักษาความลับและไม่ตัดสินกัน',
      },
      {
        step: '03',
        title: 'สรุปเข็มทิศชีวิต-การเงินรายบุคคล',
        detail:
          'Admin A & Admin B ช่วยสะท้อนจุดแข็งและชี้ 1–2 ก้าวแรกที่ทำได้ทันทีหลังออกจากวงสนทนา',
      },
    ],
    outcomes: [
      'คลายความกังวลที่ค้างคาใจ และมองเห็นทางเลือกของชีวิตชัดขึ้นอย่างมีสติ',
      'ได้บันทึกสรุปเข็มทิศส่วนตัว (Personal Reflection Card) พร้อมก้าวแรกที่ลงมือทำได้ทันทีในสัปดาห์นั้น',
      'ได้มิตรภาพและมุมมองจากเพื่อนร่วมวงสนทนาที่กำลังเดินผ่านช่วงวัยใกล้เคียงกัน',
    ],
    highlights: [
      'ฝึกสติและสังเกตความคิดในชีวิตประจำวันโดยไม่เคร่งเครียด',
      'วงสนทนาแลกเปลี่ยนอย่างปลอดภัย (Safe Space) เพื่อจัดระเบียบใจในช่วงเปลี่ยนผ่านของชีวิต',
      'ช่วงรับคำปรึกษาเฉพาะจุดเรื่องสมดุลชีวิต สุขภาพ และการเงินกับ Admin A & Admin B',
    ],
    agenda: [
      { time: '00:00 – 00:30', topic: 'Guided Mindfulness: วางความคิดวนซ้ำและกลับมาอยู่กับปัจจุบัน' },
      { time: '00:30 – 01:30', topic: 'Deep Listening Circle & แลกเปลี่ยนมุมมองการใช้ชีวิต' },
      { time: '01:30 – 02:00', topic: 'สรุปเข็มทิศส่วนตัวและรับคำแนะนำรายบุคคล' },
    ],
    takeaways: 'บันทึกสรุปเข็มทิศส่วนตัว (Personal Reflection Card) และนัดติดตามผลแบบ 1-on-1',
    credits: [
      {
        name: 'กลุ่มผู้บริหารหญิงและเจ้าของกิจการ (Private Circle #7)',
        orgType: 'กลุ่มเล็กส่วนตัว',
        participants: '6 ท่าน',
        note: 'Private Studio Session ย่านเอกมัย',
      },
      {
        name: 'กลุ่มวัยเตรียมเกษียณ 50+ (Online Closed Group #3)',
        orgType: 'กลุ่มปิดออนไลน์',
        participants: '8 ท่าน',
        note: 'Zoom กลุ่มปิด 2 ชั่วโมง พร้อมนัดติดตามผลรายบุคคล',
      },
    ],
    slides: [],
    isActive: true,
    sortOrder: 4,
    seedFeedbacks: [
      {
        authorName: 'คุณวิภาดา จ.',
        authorRole: 'เจ้าของกิจการร้านอาหาร • Private Circle #7',
        rating: 5,
        comment:
          'เป็น 2 ชั่วโมงที่รู้สึกปลอดภัยและอบอุ่นมากค่ะ ปกติเป็นคนต้องตัดสินใจทุกอย่างคนเดียว พอได้มานั่งฟังและจัดระเบียบความคิดกับ Admin A และ Admin B ทำให้รู้เลยว่าอะไรควรปล่อยวางและอะไรควรรีบจัดการก่อน',
      },
    ],
  },
];

async function seedWorkshops() {
  console.log('🌱 Seeding Living Wealth 365 Workshops & Feedbacks...');

  for (const item of SEED_WORKSHOPS) {
    const { seedFeedbacks, ...workshopData } = item;

    const workshop = await prisma.workshop.upsert({
      where: { slug: workshopData.slug },
      update: {
        track: workshopData.track,
        trackLabel: workshopData.trackLabel,
        audiences: workshopData.audiences,
        title: workshopData.title,
        subtitle: workshopData.subtitle,
        duration: workshopData.duration,
        groupSize: workshopData.groupSize,
        format: workshopData.format,
        facilitator: workshopData.facilitator,
        imageUrl: workshopData.imageUrl,
        painPoints: workshopData.painPoints,
        whatAndHow: workshopData.whatAndHow,
        outcomes: workshopData.outcomes,
        highlights: workshopData.highlights,
        agenda: workshopData.agenda,
        takeaways: workshopData.takeaways,
        credits: workshopData.credits,
        isActive: workshopData.isActive,
        sortOrder: workshopData.sortOrder,
      },
      create: workshopData,
    });

    const existingCount = await prisma.workshopFeedback.count({
      where: { workshopId: workshop.id },
    });

    if (existingCount === 0 && seedFeedbacks.length > 0) {
      await prisma.workshopFeedback.createMany({
        data: seedFeedbacks.map((fb) => ({
          workshopId: workshop.id,
          authorName: fb.authorName,
          authorRole: fb.authorRole,
          rating: fb.rating,
          comment: fb.comment,
          isApproved: true,
        })),
      });
    }

    console.log(`   ✅ Upserted workshop: ${workshop.title} (${workshop.slug})`);
  }

  console.log('✨ Workshops & Feedbacks seed completed!');
}

seedWorkshops()
  .catch((e) => {
    console.error('❌ Seed workshops failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
