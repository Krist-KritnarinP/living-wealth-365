import { useEffect, useRef, useState } from 'react';

export default function RevealOnScroll({ children, className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(() =>
    typeof window === 'undefined' ||
    !('IntersectionObserver' in window) ||
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    if (visible) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <div
      ref={ref}
      className={`reveal-on-scroll ${visible ? 'is-visible' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
