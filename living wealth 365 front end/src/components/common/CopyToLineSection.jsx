import { useState } from 'react';
import { Copy, Check, MessageCircle, Sparkles, Send } from 'lucide-react';

export default function CopyToLineSection() {
  const [selectedTopic, setSelectedTopic] = useState('INSURANCE');
  const [copied, setCopied] = useState(false);

  const topics = [
    {
      id: 'INSURANCE',
      label: '🛡️ ประกันสุขภาพ & โรคร้าย',
      advisor: 'Admin A',
      message: `สวัสดีครับ/ค่ะ Admin A
ผม/ดิฉันได้เข้าชมเว็บไซต์ Living Wealth 365 และสนใจปรึกษาเรื่องการวางแผนประกันสุขภาพเหมาจ่าย / คุ้มครองโรคร้ายแรง
อยากขอคำแนะนำเบื้องต้นเพื่อเปรียบเทียบแผนที่เหมาะสมกับช่วงอายุและงบประมาณครับ/ค่ะ`,
    },
    {
      id: 'TAX',
      label: '📈 วางแผนภาษี & เกษียณ',
      advisor: 'Admin A',
      message: `สวัสดีครับ/ค่ะ Admin A
ผม/ดิฉันสนใจปรึกษาเรื่องการบริหารภาษีเงินได้บุคคลธรรมดา และการวางแผนพอร์ตเกษียณบำนาญผ่าน Living Wealth 365
อยากขอคำแนะนำเพื่อเตรียมลดหย่อนภาษีให้คุ้มค่าที่สุดครับ/ค่ะ`,
    },
    {
      id: 'ENERGY',
      label: '💎 คริสตัล & พลังธรรมชาติ',
      advisor: 'Admin B',
      message: `สวัสดีค่ะ Admin B
สนใจปรึกษาเรื่องการเลือกแร่ธาตุและคริสตัลธรรมชาติแท้ตามหลักจักระและวันเกิด ผ่าน Living Wealth 365
อยากขอคำแนะนำหินมงคลชิ้นงานคัดสรรที่เหมาะสมกับพลังงานประจำตัวค่ะ`,
    },
    {
      id: 'LIFEMAP',
      label: '🧘‍♀️ สมดุลชีวิต 6 มิติ',
      advisor: 'Admin A & Admin B',
      message: `สวัสดีครับ/ค่ะ Admin A & Admin B
ผม/ดิฉันสนใจพูดคุยประเมินสมดุลชีวิต 6 มิติ (Life Map Architecture) กับ Living Wealth 365
อยากนัดหมายเวลาเพื่อสนทนาและร่วมออกแบบแนวทางชีวิตครับ/ค่ะ`,
    },
  ];

  const currentTopic = topics.find((t) => t.id === selectedTopic) || topics[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentTopic.message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="w-full rounded-3xl zen-surface hover-card-elevate border border-secondary/30 p-6 sm:p-10 lg:p-12 shadow-sm relative overflow-hidden transition-all duration-300">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left Column: Heading & Value Prop */}
        <div className="lg:col-span-5 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/15 text-secondary text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5" />
            <span>LINE CONSULTATION HELPER</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-primary leading-tight">
            สะดวกคุยทาง LINE?<br />
            <span className="text-secondary">เราเตรียมข้อความให้พร้อมส่งใน 1 คลิก</span>
          </h3>

          <p className="text-sm sm:text-base text-base-content/80 leading-relaxed">
            ไม่ต้องกังวลว่าจะเริ่มต้นถามอย่างไร เพียงเลือกเรื่องที่คุณสนใจ แล้วกดคัดลอกข้อความนำไปส่งใน LINE ของ <strong>Admin A & Admin B</strong> ได้ทันที ปรึกษาฟรี ไม่มีพนักงานโทรตื๊อ
          </p>

          <div className="space-y-2 pt-2">
            <label className="text-xs font-bold text-base-content/70 uppercase tracking-wider block">
              เลือกเรื่องที่คุณต้องการปรึกษา:
            </label>
            <div className="flex flex-wrap gap-2">
              {topics.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setSelectedTopic(t.id)}
                  className={`btn btn-xs sm:btn-sm rounded-xl font-bold transition-all cursor-pointer ${
                    selectedTopic === t.id
                      ? 'btn-primary shadow-xs'
                      : 'btn-ghost border border-base-300 text-base-content/75 hover:border-secondary'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Pre-formatted Message Box */}
        <div className="lg:col-span-7">
          <div className="bg-base-100 rounded-2xl p-5 sm:p-6 border border-base-300/80 shadow-md space-y-4">
            <div className="flex items-center justify-between text-xs text-base-content/60 border-b border-base-300/40 pb-2.5">
              <span>ร่างข้อความอัตโนมัติ (ส่งถึง {currentTopic.advisor})</span>
              <span className="text-secondary font-bold">พร้อมคัดลอกทันที</span>
            </div>

            <div className="bg-base-200/50 rounded-xl p-4 font-mono text-xs sm:text-sm text-base-content/90 whitespace-pre-wrap leading-relaxed border border-base-300/40 max-h-48 overflow-y-auto">
              {currentTopic.message}
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={handleCopy}
                className={`btn btn-sm sm:btn-md rounded-xl font-bold gap-2 transition-all cursor-pointer ${
                  copied
                    ? 'btn-success text-white shadow-xs'
                    : 'btn-primary shadow-xs'
                }`}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'คัดลอกข้อความแล้ว!' : 'คัดลอกข้อความ (Copy)'}</span>
              </button>

              <a
                href="https://line.me/ti/p/~livingwealth365"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm sm:btn-md rounded-xl font-bold gap-2 bg-[#06C755] hover:bg-[#05b34c] text-white border-0 shadow-xs cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>เปิด LINE ทักหาที่ปรึกษา</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
