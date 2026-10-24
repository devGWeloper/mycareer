import type { Competency, SectionCopy } from "@/data/types";
import { Container, SectionHeader } from "./SectionHeader";
import { TONE } from "./tone";

export function CompetencySection({ copy, items }: { copy: SectionCopy; items: Competency[] }) {
  return (
    <section id="competency" className="scroll-mt-16 border-b border-line py-24 sm:py-32">
      <Container>
        <SectionHeader copy={copy} accentClass="text-gradient" />

        <ol className="mt-14 grid gap-4 lg:grid-cols-3">
          {items.map((c) => {
            const tone = TONE[c.tone];
            return (
              <li key={c.no} className="reveal relative flex flex-col overflow-clip rounded-2xl border border-line2 bg-panel/80 p-6 sm:p-7">
                <span aria-hidden className="draw-x absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, ${tone.hex}, transparent)` }} />
                <span className={`font-mono text-4xl font-semibold ${tone.text}`}>{c.no}</span>
                <h3 className="mt-4 text-xl leading-snug font-bold tracking-tight">[{c.title}]</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-fg2">{c.summary}</p>
                <ul className="mt-6 space-y-2 border-t border-line pt-5">
                  {c.points.map((p) => (
                    <li key={p} className="flex gap-2.5 text-sm leading-relaxed">
                      <span aria-hidden className={`mt-[7px] size-1.5 shrink-0 rounded-full ${tone.dot}`} />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
