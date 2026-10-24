import type { CSSProperties } from "react";
import type { CareerStep, Milestone, Resume, SectionCopy } from "@/data/types";
import { Container, SectionHeader } from "./SectionHeader";
import { TONE } from "./tone";

const toMonth = (ym: string) => {
  const [y, m] = ym.split(".").map(Number);
  return y * 12 + (m - 1);
};

/** 연도 축 위에 역할 구간을 비율대로 그리는 가로 타임라인 (md 이상) */
function Timeline({ company, career, milestones }: { company: Resume["company"]; career: CareerStep[]; milestones: Milestone[] }) {
  const startYear = Number(company.start.slice(0, 4));
  const lastYear = Math.max(...[...career.map((c) => c.end ?? c.start), ...milestones.map((m) => m.date)].map((d) => Number(d.slice(0, 4))));
  const axisStart = startYear * 12;
  const axisEnd = (lastYear + 1) * 12;
  const pct = (month: number) => ((month - axisStart) / (axisEnd - axisStart)) * 100;
  const years = Array.from({ length: lastYear - startYear + 1 }, (_, i) => startYear + i);

  return (
    <div className="reveal hidden rounded-2xl border border-line2 bg-panel/80 p-8 md:block">
      <div className="relative">
        {years.map((y) => (
          <div key={y} aria-hidden className="absolute top-0 bottom-0 w-px bg-line2" style={{ left: `${pct(y * 12)}%` }} />
        ))}

        {/* 마일스톤 */}
        <div className="relative h-9">
          {milestones.map((m) => {
            const left = pct(toMonth(m.date));
            const right = left > 70;
            return (
              <div
                key={m.date}
                className={`absolute bottom-1 flex items-center gap-1.5 font-mono text-[11px] whitespace-nowrap text-fg2 ${right ? "-translate-x-full flex-row-reverse" : ""}`}
                style={{ left: `${left}%` }}
              >
                <span className="size-2 rotate-45 bg-cyan shadow-[0_0_8px_#3ee0ff]" />
                <span className="text-muted">{m.date}</span>
                <span>{m.label}</span>
              </div>
            );
          })}
        </div>

        {/* 회사 */}
        <div className="relative h-11">
          <div
            className="absolute inset-y-0 right-0 flex items-center gap-3 rounded-lg border border-line3 bg-panel2 px-4 text-sm"
            style={{ left: `${pct(toMonth(company.start))}%` }}
          >
            <span className="font-bold">{company.name}</span>
            <span className="text-muted">{company.note}</span>
            <span className="text-dim">|</span>
            <span className="text-fg2">{company.position}</span>
            <span className="text-dim">|</span>
            <span className="text-fg2">{company.client}</span>
            <span className="ml-auto font-mono text-xs text-muted">{company.start} – 현재 →</span>
          </div>
        </div>

        {/* 역할 */}
        <div className="relative mt-2 h-[92px]">
          {career.map((step, i) => {
            const tone = TONE[step.tone];
            const start = toMonth(step.start);
            const next = career[i + 1];
            const end = next ? toMonth(next.start) : step.end ? toMonth(step.end) + 1 : axisEnd;
            const current = !step.end;
            return (
              <a
                key={step.id}
                href={`#step-${step.id}`}
                className="group absolute inset-y-0 px-[3px]"
                style={{ left: `${pct(start)}%`, width: `${pct(end) - pct(start)}%` }}
              >
                <div
                  className={`flex h-full flex-col justify-between rounded-lg border p-3 transition group-hover:brightness-125 ${tone.border}`}
                  style={{
                    background: current
                      ? `linear-gradient(90deg, ${tone.hex}33, ${tone.hex}0a)`
                      : `${tone.hex}22`,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-mono text-[10.5px] font-semibold tracking-[0.14em] ${tone.text}`}>{step.phase}</span>
                    {current && <span className="dot-live size-1.5 rounded-full" />}
                  </div>
                  <div>
                    <p className="font-bold whitespace-nowrap">{step.role}</p>
                    <p className="mt-0.5 font-mono text-[11px] whitespace-nowrap text-fg2">
                      {step.start} – {step.end ?? "현재"}
                    </p>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {/* 연도 축 */}
        <div className="relative mt-3 h-4">
          {years.map((y) => (
            <span key={y} className="absolute pl-1.5 font-mono text-[11px] text-muted" style={{ left: `${pct(y * 12)}%` }}>
              {y}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/** 모바일용 세로 타임라인 */
function TimelineCompact({ company, career }: { company: Resume["company"]; career: CareerStep[] }) {
  return (
    <ol className="reveal ml-1.5 border-l border-line3 md:hidden">
      <li className="relative pb-6 pl-6">
        <span aria-hidden className="absolute top-1.5 -left-[5px] size-2.5 rotate-45 bg-cyan" />
        <p className="font-mono text-xs text-muted">{company.start}</p>
        <p className="mt-0.5 font-bold">
          {company.name} <span className="text-sm font-normal text-muted">({company.note}) 입사</span>
        </p>
      </li>
      {career.map((step) => {
        const tone = TONE[step.tone];
        return (
          <li key={step.id} className="relative pb-6 pl-6 last:pb-0">
            <span aria-hidden className={`absolute top-1.5 -left-[6px] size-3 rounded-full border-2 border-bg ${tone.dot}`} />
            <p className="font-mono text-xs text-muted">
              {step.start} – {step.end ?? "현재"} · {step.duration}
            </p>
            <p className={`mt-0.5 text-lg font-bold ${tone.text}`}>{step.role}</p>
            <p className="text-sm text-fg2">{step.position}</p>
          </li>
        );
      })}
    </ol>
  );
}

/** 레일 노드 높이 = 카드 안 phase 배지 중심 */
const RAIL_TOP = 42;

/** 카드 왼쪽 진행 레일 (lg 이상): 이 단계 노드 → 다음 단계 노드 구간. 마지막 단계는 아래로 흐려진다 */
function Rail({ step, next }: { step: CareerStep; next?: CareerStep }) {
  const from = TONE[step.tone].hex;
  const to = next ? TONE[next.tone].hex : from;

  return (
    <div aria-hidden className="absolute inset-y-0 -left-12 hidden w-12 lg:block">
      <div className="absolute left-1/2 w-[2px] -translate-x-1/2" style={{ top: RAIL_TOP, bottom: next ? -RAIL_TOP : 0 }}>
        <span
          className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2"
          style={{ background: next ? "var(--color-line2)" : "linear-gradient(var(--color-line3), transparent)" }}
        />
        <span
          className="rail-fill absolute inset-0"
          style={{ background: `linear-gradient(${from}, ${next ? to : "transparent"})` }}
        />
        <span
          className="rail-head absolute left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ "--from": from, "--to": to } as CSSProperties}
        />
      </div>
      <span
        className="node-on absolute left-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
        style={{ top: RAIL_TOP, background: from, borderColor: from, boxShadow: `0 0 0 4px ${from}33, 0 0 14px ${from}` }}
      />
    </div>
  );
}

function StepCard({ step, next }: { step: CareerStep; next?: CareerStep }) {
  const tone = TONE[step.tone];
  return (
    <li id={`step-${step.id}`} className="rail-scope relative scroll-mt-24 pb-6 last:pb-0" style={{ "--rail-top": `${RAIL_TOP}px` } as CSSProperties}>
      <Rail step={step} next={next} />
      <article className="reveal relative grid overflow-clip rounded-2xl border border-line2 bg-panel/80 lg:grid-cols-[240px_1fr]">
        <span aria-hidden className={`draw-y absolute inset-y-0 left-0 w-[3px] ${tone.dot}`} />

        <div className="border-b border-line p-6 sm:p-8 lg:border-r lg:border-b-0">
          <span className={`rounded-md border px-2 py-0.5 font-mono text-[11px] font-semibold tracking-[0.14em] ${tone.text} ${tone.border} ${tone.bg}`}>
            {step.phase}
          </span>
          <p className={`mt-4 text-2xl font-bold tracking-tight ${tone.text}`}>{step.role}</p>
          <p className="mt-1 text-sm text-fg2">{step.position}</p>
          <p className="mt-4 font-mono text-sm">
            {step.start} – {step.end ?? "현재"}
          </p>
          <p className="font-mono text-xs text-muted">{step.duration}</p>

          <p className="mt-6 font-mono text-[11px] tracking-[0.16em] text-muted">주요 성과</p>
          <ul className="mt-2 flex flex-wrap gap-1.5 lg:flex-col lg:items-start">
            {step.results.map((r) => (
              <li key={r} className={`rounded-md border px-2 py-1 text-xs font-medium ${tone.border} ${tone.bg} ${tone.text}`}>
                {r}
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 sm:p-8">
          <h3 className="text-xl font-bold tracking-tight sm:text-2xl">{step.title}</h3>
          <p className="mt-2 leading-relaxed text-fg2">{step.summary}</p>

          <div className="mt-7 grid gap-x-8 gap-y-6 xl:grid-cols-2">
            {step.groups.map((g) => (
              <div key={g.label}>
                <p className={`border-l-2 pl-2.5 font-mono text-xs font-semibold tracking-wide ${tone.border} ${tone.text}`}>[{g.label}]</p>
                <ul className="mt-3 space-y-2">
                  {g.points.map((p) => (
                    <li key={p} className="flex gap-2.5 text-[14.5px] leading-relaxed">
                      <span aria-hidden className="mt-[10px] size-1 shrink-0 rounded-full bg-muted" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <ul className="mt-7 flex flex-wrap gap-1.5 border-t border-line pt-5">
            {step.tech.map((t) => (
              <li key={t} className="rounded-md border border-line2 bg-panel2 px-2 py-1 font-mono text-[11px] text-fg2">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </li>
  );
}

export function CareerSection({
  copy,
  company,
  career,
  milestones,
}: {
  copy: SectionCopy;
  company: Resume["company"];
  career: CareerStep[];
  milestones: Milestone[];
}) {
  return (
    <section id="career" className="scroll-mt-16 border-b border-line py-24 sm:py-32">
      <Container>
        <SectionHeader copy={copy} accentClass="text-violet" />

        <div className="mt-14">
          <Timeline company={company} career={career} milestones={milestones} />
          <TimelineCompact company={company} career={career} />
        </div>

        <ol className="mt-8 lg:pl-12">
          {career.map((step, i) => (
            <StepCard key={step.id} step={step} next={career[i + 1]} />
          ))}
        </ol>
      </Container>
    </section>
  );
}
