import { useState } from 'react';
import { Copy, Check, MessageCircle } from 'lucide-react';
import LeadCaptureForm from '../forms/LeadCaptureForm';

const QUICK_LINE_TOPICS = [
  {
    id: 'WORKSHOP',
    label: 'จัดเวิร์กชอป',
    advisor: 'Admin A & Admin B',
    message: `สวัสดีครับ/ค่ะ Admin A & Admin B
สนใจสอบถามการจัดเวิร์กชอป (องค์กร / กลุ่มเล็ก) จากเว็บไซต์ Living Wealth 365
รบกวนขอรายละเอียดหัวข้อและช่วงเวลาที่สะดวกพูดคุยครับ/ค่ะ`,
  },
  {
    id: 'INSURANCE',
    label: 'ประกันสุขภาพ / AIA',
    advisor: 'Admin A',
    message: `สวัสดีครับ/ค่ะ Admin A
สนใจปรึกษาและเปรียบเทียบแผนประกันสุขภาพ / โรคร้ายแรง / อุบัติเหตุ AIA จาก Living Wealth 365
อยากขอคำแนะนำให้เหมาะกับช่วงอายุและงบประมาณครับ/ค่ะ`,
  },
  {
    id: 'TAX',
    label: 'ภาษี & เกษียณ',
    advisor: 'Admin A',
    message: `สวัสดีครับ/ค่ะ Admin A
สนใจปรึกษาเรื่องการวางแผนภาษีและการเตรียมงบเกษียณผ่าน Living Wealth 365 ครับ/ค่ะ`,
  },
  {
    id: 'ENERGY',
    label: 'แร่ธาตุ & หินมงคล',
    advisor: 'Admin B',
    message: `สวัสดีค่ะ Admin B
สนใจปรึกษาการเลือกแร่ธาตุและหินธรรมชาติแท้ให้เหมาะกับวันเกิดและเป้าหมายชีวิตค่ะ`,
  },
];

export default function HomeContactHub({
  selection,
  defaultInterest,
  defaultNotes,
  title,
  subtitle,
}) {
  const [selectedTopic, setSelectedTopic] = useState('WORKSHOP');
  const [copied, setCopied] = useState(false);

  const currentTopic =
    QUICK_LINE_TOPICS.find((t) => t.id === selectedTopic) || QUICK_LINE_TOPICS[0];

  const handleCopy = () => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(currentTopic.message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section
      id="talk-form"
      className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 pb-6 scroll-mt-24"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        {/* Left: Compact Quick LINE Helper (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl zen-surface border border-secondary/30 p-6 sm:p-8 flex flex-col justify-between gap-6 shadow-xs">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-success/10 border border-success/25 text-success text-xs font-black tracking-wide">
              <MessageCircle className="w-4 h-4 shrink-0" />
              <span>คุยด่วนทาง LINE • ปรึกษาฟรี</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-primary leading-tight">
              สะดวกทัก LINE?
              <br />
              <span className="text-secondary">คัดลอกข้อความส่งได้ใน 1 คลิก</span>
            </h2>

            <p className="text-sm sm:text-base text-base-content/80 leading-relaxed">
              เลือกเรื่องที่ต้องการปรึกษา แล้วกดคัดลอกข้อความไปวางใน LINE เพื่อคุยกับ{' '}
              <strong>{currentTopic.advisor}</strong> ได้ทันที ไม่มีพนักงานโทรตื๊อ
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              {QUICK_LINE_TOPICS.map((topic) => (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => setSelectedTopic(topic.id)}
                  className={`btn btn-xs sm:btn-sm rounded-xl font-bold ${
                    selectedTopic === topic.id
                      ? 'btn-primary'
                      : 'btn-ghost border border-base-300 text-base-content/80'
                  }`}
                >
                  {topic.label}
                </button>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-base-200/60 border border-base-300/60 text-xs sm:text-sm text-base-content/85 whitespace-pre-line leading-relaxed">
              {currentTopic.message}
            </div>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className={`btn w-full rounded-2xl font-bold gap-2 ${
              copied ? 'btn-success text-white' : 'btn-secondary text-secondary-content'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 shrink-0" />
                <span>คัดลอกข้อความแล้ว นำไปวางใน LINE ได้เลย</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 shrink-0" />
                <span>คัดลอกข้อความไปส่งใน LINE</span>
              </>
            )}
          </button>
        </div>

        {/* Right: Callback Lead Form (7 cols) */}
        <div className="lg:col-span-7 flex flex-col">
          <LeadCaptureForm
            selection={selection}
            defaultInterest={defaultInterest}
            defaultNotes={defaultNotes}
            title={title}
            subtitle={subtitle}
          />
        </div>
      </div>
    </section>
  );
}
