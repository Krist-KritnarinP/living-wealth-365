import { useState, useEffect, useRef } from 'react';
import { ShieldCheck, HeartHandshake, Compass, Sparkles } from 'lucide-react';

function AnimatedNumber({ target, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (target === 0) {
      setCount(0);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1400; // 1.4s smooth ease-out
          const start = performance.now();

          const step = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic curve: 1 - (1 - t)^3
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeOut * target));

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCount(target);
            }
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.15 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="font-mono tabular-nums inline-block tracking-tight">
      {prefix}{count}{suffix}
    </span>
  );
}

export default function HeroStatTiles() {
  const stats = [
    {
      target: 10,
      suffix: '+ ปี',
      prefix: '',
      label: 'ประสบการณ์ที่ปรึกษา',
      sub: 'คุณท็อป (AIA / การเงิน)',
      icon: ShieldCheck,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      target: 100,
      suffix: '+',
      prefix: '',
      label: 'ครอบครัวที่ดูแล',
      sub: 'วางแผนชีวิต & พอร์ตการเงิน',
      icon: HeartHandshake,
      color: 'text-secondary',
      bg: 'bg-secondary/15',
    },
    {
      target: 6,
      suffix: ' มิติ',
      prefix: '',
      label: 'Life Map สมดุล',
      sub: 'สุขภาวะกาย ใจ การเงิน',
      icon: Compass,
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-500/15',
    },
    {
      target: 0,
      suffix: '',
      prefix: '฿',
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
            className="zen-surface hover-card-elevate rounded-2xl p-3.5 sm:p-4 border border-base-300/60 shadow-xs flex flex-col justify-between cursor-default group"
          >
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-xl sm:text-2xl lg:text-3xl font-black text-base-content">
                <AnimatedNumber
                  target={item.target}
                  prefix={item.prefix}
                  suffix={item.suffix}
                />
              </span>
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl ${item.bg} ${item.color} flex items-center justify-center shrink-0 hover-icon-spin`}
              >
                <Icon className="w-4 h-4" />
              </div>
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-bold text-base-content leading-snug group-hover:text-primary transition-colors">
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
