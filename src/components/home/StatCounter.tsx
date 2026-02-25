"use client";

import { useEffect, useState, useRef } from "react";

type Props = {
  value: number;
  suffix?: string;
};

export default function StatCounter({ value, suffix }: Props) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        // Jika elemen terlihat & belum pernah animasi
        if (entry.isIntersecting && !hasAnimated.current) {
          startCounting();
          hasAnimated.current = true;
        }
      },
      { threshold: 0.5 } // Mulai saat 50% elemen terlihat
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [value]);

  const startCounting = () => {
    let start = 0;
    const duration = 2000; // 2 detik durasi animasi
    const increment = value / (duration / 16); // 60 FPS

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
  };

  return (
    <div ref={ref} className="flex items-center justify-center gap-1 font-serif font-bold text-4xl md:text-5xl text-white mb-2">
      <span>{count}</span>
      <span className="text-gold-primary">{suffix}</span>
    </div>
  );
}