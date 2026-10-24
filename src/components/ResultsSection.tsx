import type { CaseStudy, SectionCopy } from "@/data/types";
import { PipelineVisual, RagVisual, ReplayVisual, UtilizationVisual } from "./CaseVisuals";
import { Container, SectionHeader } from "./SectionHeader";
import { TONE } from "./tone";

const VISUALS = {
  utilization: UtilizationVisual,
  pipeline: PipelineVisual,
  rag: RagVisual,
  replay: ReplayVisual,
};

function CaseCard({ item, flip }: { item: CaseStudy; flip: boolean }) {
  const tone = TONE[item.tone];
  const Visual = VISUALS[item.visual];

  return (
    <article className="reveal relative overflow-clip rounded-3xl border border-line2 bg-panel/80">
      <span aria-hidden className="draw-x absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, ${tone.hex}, transparent 70%)` }} />
      <span aria-hidden className={`draw-y absolute inset-y-0 left-0 w-[3px] ${tone.dot}`} />
      <div className={`grid gap-10 p-6 sm:p-10 lg:grid-cols-2 lg:gap-14 ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
        <div>
          <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] tracking-[0.16em]">
            <span className="text-muted">{item.code}</span>
            <span className={tone.text}>{item.tag}</span>
          </div>
          <h3 className="mt-4 text-2xl leading-snug font-bold tracking-tight text-balance sm:text-3xl">{item.title}</h3>

          <p className="mt-6 font-mono text-[11px] tracking-[0.16em] text-muted">PROBLEM</p>
          <p className="mt-2 leading-relaxed text-fg2">{item.problem}</p>

          <p className="mt-6 font-mono text-[11px] tracking-[0.16em] text-muted">ACTION</p>
          <ul className="mt-2 space-y-2">
            {item.actions.map((a) => (
              <li key={a} className="flex gap-3 text-[15px] leading-relaxed">
                <span aria-hidden className={`mt-0.5 font-mono text-xs ${tone.text}`}>▸</span>
                <span>{a}</span>
              </li>
            ))}
          </ul>

          <p className="mt-8 font-mono text-[11px] tracking-[0.16em] text-muted">RESULT</p>
          <dl className="mt-3 grid grid-cols-2 gap-3">
            {item.metrics.map((m) => (
              <div key={m.label} className={`flex flex-col-reverse rounded-xl border px-4 py-3 ${tone.border} ${tone.bg}`}>
                <dt className="mt-1 text-xs text-fg2">{m.label}</dt>
                <dd className={`font-mono text-2xl font-semibold tracking-tight ${tone.text}`}>{m.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="flex items-center">
          <div className="w-full">
            <Visual />
          </div>
        </div>
      </div>
    </article>
  );
}

export function ResultsSection({ copy, cases }: { copy: SectionCopy; cases: CaseStudy[] }) {
  return (
    <section id="results" className="scroll-mt-16 border-b border-line py-24 sm:py-32">
      <Container>
        <SectionHeader copy={copy} accentClass="text-gradient" />
        <div className="mt-14 space-y-8">
          {cases.map((c, i) => (
            <CaseCard key={c.code} item={c} flip={i % 2 === 1} />
          ))}
        </div>
      </Container>
    </section>
  );
}
