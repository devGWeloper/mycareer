import type { ReactNode } from "react";
import type { SectionCopy } from "@/data/types";

/** text 안의 accent 부분만 className으로 감싼다 */
export function Accent({ text, accent, className }: { text: string; accent?: string; className: string }) {
  if (!accent || !text.includes(accent)) return <>{text}</>;
  const i = text.indexOf(accent);
  return (
    <>
      {text.slice(0, i)}
      <span className={`whitespace-nowrap ${className}`}>{accent}</span>
      {text.slice(i + accent.length)}
    </>
  );
}

export function SectionHeader({ copy, accentClass = "text-cyan" }: { copy: SectionCopy; accentClass?: string }) {
  return (
    <header className="reveal max-w-3xl">
      <p className="flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] text-cyan">
        <span>{copy.index}</span>
        <span className="draw-x h-px w-10 bg-cyan/50" />
        <span>{copy.eyebrow}</span>
      </p>
      <h2 className="mt-5 text-3xl leading-[1.25] font-bold tracking-[-0.025em] whitespace-pre-line sm:text-[2.6rem]">
        <Accent text={copy.title} accent={copy.accent} className={accentClass} />
      </h2>
      {copy.description && <p className="mt-5 text-base leading-relaxed text-pretty text-fg2 sm:text-lg">{copy.description}</p>}
    </header>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 ${className}`}>{children}</div>;
}
