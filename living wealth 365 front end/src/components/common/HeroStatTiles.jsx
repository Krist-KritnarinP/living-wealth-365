import { ShieldCheck, HeartHandshake, Compass, Sparkles } from 'lucide-react';

export default function HeroStatTiles() {
  const stats = [
    {
      value: '10+ ปี',
      label: 'ประสบการณ์ที่ปรึกษา',
      sub: 'คุณท็อป (AIA / การเงิน)',
      icon: ShieldCheck,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      value: '100+',
      label: 'ครอบครัวที่ดูแล',
      sub: 'วางแผนชีวิต & พอร์ตการเงิน',
      icon: HeartHandshake,
      color: 'text-secondary',
      bg: 'bg-secondary/15',
    },
    {
      value: '6 มิติ',
      label: 'Life Map สมดุล',
      sub: 'สุขภาวะกาย ใจ การเงิน',
      icon: Compass,
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-500/15',
    },
    {
      value: '฿0',
      label: 'ค่าบริการเริ่มต้น',
      sub: 'รับฟัง & ออกแบบแผนเฉพาะคุณ',
      icon: Sparkles,
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-500/15',
    },
  ];

  return (
    <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-2">
      {stats.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div
            key={idx}
            className="zen-surface rounded-2xl p-3.5 sm:p-4 border border-base-300/60 shadow-xs flex flex-col justify-between transition-all hover:border-secondary/60 hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-base-content font-mono tabular-nums">
                {item.value}
              </span>
              <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl ${item.bg} ${item.color} flex items-center justify-center shrink-0`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-bold text-base-content leading-snug">
                {item.label}
              </p>
              <p className="text-[10px] sm:text-xs text-base-content/65 truncate mt-0.5">
                {item.sub}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
