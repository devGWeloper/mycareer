"use client";

import { useEffect, useRef } from "react";

const format = (n: number) => Math.round(n).toLocaleString("en-US");

/** 화면에 들어오면 0부터 value까지 올라가는 숫자. SSR · 모션 최소화 환경에서는 최종값을 그대로 보여준다 */
export function CountUp({ value, className }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.textContent = format(0);
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const k = Math.min(1, (now - start) / 1800);
          el.textContent = format(value * (1 - Math.pow(1 - k, 4)));
          if (k < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {format(value)}
    </span>
  );
}
