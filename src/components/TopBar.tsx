"use client";

import { useSyncExternalStore } from "react";

const NAV = [
  { id: "competency", label: "Core" },
  { id: "domain", label: "Domain" },
  { id: "career", label: "Career" },
  { id: "results", label: "Results" },
  { id: "lab", label: "Lab" },
  { id: "skills", label: "Skills" },
];

const clockFormat = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Seoul",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

function subscribeClock(cb: () => void) {
  const id = setInterval(cb, 1000);
  return () => clearInterval(id);
}

function subscribeScroll(cb: () => void) {
  window.addEventListener("scroll", cb, { passive: true });
  return () => window.removeEventListener("scroll", cb);
}

export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
      <defs>
        <linearGradient id="logo-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3ee0ff" />
          <stop offset="1" stopColor="#a98bff" />
        </linearGradient>
      </defs>
      <path d="M16 3 4 10v12l12 7 12-7V10z" stroke="url(#logo-g)" strokeWidth="2" />
      <path d="M4 10l12 7 12-7M16 17v12" stroke="url(#logo-g)" strokeWidth="1.4" opacity=".6" />
      <circle cx="16" cy="17" r="2.6" fill="#3ee0ff" />
    </svg>
  );
}

export function TopBar({ name, nameEn }: { name: string; nameEn: string }) {
  const time = useSyncExternalStore(
    subscribeClock,
    () => clockFormat.format(new Date()),
    () => "--:--:--",
  );
  const scrolled = useSyncExternalStore(
    subscribeScroll,
    () => window.scrollY > 24,
    () => false,
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? "border-line bg-bg/80 backdrop-blur-md" : "border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-[10px] border border-line2 bg-gradient-to-br from-cyan/10 to-violet/10">
            <Logo className="size-6" />
          </span>
          <span className="leading-tight">
            <span className="block text-[15px] font-bold tracking-tight">{name}</span>
            <span className="block font-mono text-[10px] tracking-[0.14em] text-muted uppercase">
              {nameEn}
            </span>
          </span>
        </a>

        <ul className="ml-auto hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="rounded-lg px-3 py-2 text-sm text-fg2 transition-colors hover:bg-panel2 hover:text-fg"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="ml-auto hidden items-center gap-2 font-mono text-[11px] text-muted lg:ml-0 lg:flex">
          <span className="dot-live size-[7px] rounded-full" />
          <span className="text-fg2">KST {time}</span>
        </div>

        <a
          href="#contact"
          className="ml-auto rounded-lg border border-cyan/40 bg-cyan/10 px-3.5 py-2 text-sm font-semibold text-cyan transition-colors hover:bg-cyan/20 md:ml-0"
        >
          Contact
        </a>
      </nav>
    </header>
  );
}
