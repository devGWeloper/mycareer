import type { Resume } from "@/data/types";
import { CountUp } from "./CountUp";
import { FabCanvas } from "./fab/FabCanvas";
import { Accent } from "./SectionHeader";
import { TONE } from "./tone";

const LEGEND = [
  { label: "RUN", className: "bg-green" },
  { label: "IDLE", className: "bg-[#64748b]" },
  { label: "DOWN", className: "bg-red" },
  { label: "PM", className: "bg-blue" },
  { label: "OHT", className: "bg-fg2" },
];

export function Hero({ resume }: { resume: Resume }) {

  return (
    <section id="top" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden border-b border-line">
      {/* 모바일: 상단 영역에만 FAB, 데스크톱: 전체 배경 */}
      <FabCanvas className="absolute inset-x-0 top-0 -z-20 h-[50svh] w-full lg:inset-0 lg:h-full" />

      {/* 가독성용 그라데이션: 모바일은 FAB 아래쪽, 데스크톱은 왼쪽 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[50svh] bg-[linear-gradient(180deg,rgb(5_8_13/0.6)_0%,transparent_22%,transparent_62%,var(--color-bg)_100%)] lg:inset-0 lg:h-full lg:bg-[linear-gradient(90deg,var(--color-bg)_0%,rgb(5_8_13/0.9)_26%,rgb(5_8_13/0.35)_52%,transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 hidden h-48 bg-gradient-to-t from-bg to-transparent lg:block"
      />

      {/* HUD */}
      <div aria-hidden className="fade-up absolute top-24 right-6 hidden flex-col items-end gap-2 lg:flex [--delay:2.2s]">
        <div className="flex items-center gap-2.5 rounded-[10px] border border-line2 bg-panel/80 px-3 py-2 backdrop-blur">
          <span className="dot-live size-[7px] rounded-full" />
          <span className="text-[13px] font-semibold">
            KGW-FAB <span className="font-normal text-muted">Isometric Career Twin</span>
          </span>
        </div>
        <div className="flex gap-2 font-mono text-[10.5px] tracking-wider">
          <span className="rounded-md border border-cyan/25 bg-cyan/10 px-2 py-1 text-cyan">LIVE SIM</span>
          <span className="rounded-md border border-line2 bg-panel/80 px-2 py-1 text-fg2">8 BAYS</span>
          <span className="rounded-md border border-line2 bg-panel/80 px-2 py-1 text-fg2">OHT · AMHS</span>
        </div>
      </div>

      <div aria-hidden className="fade-up absolute right-6 bottom-36 hidden gap-3 rounded-[10px] border border-line2 bg-panel/80 px-3 py-2 font-mono text-[10.5px] text-fg2 backdrop-blur lg:flex [--delay:2.4s]">
        {LEGEND.map((l) => (
          <span key={l.label} className="flex items-center gap-1.5">
            <i className={`size-2 rounded-[2px] ${l.className}`} />
            {l.label}
          </span>
        ))}
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-start px-4 pt-[44svh] pb-10 sm:px-6 lg:justify-center lg:pt-28 lg:pb-16">
        <div className="max-w-xl">
          <p className="fade-up inline-flex items-center gap-2 rounded-full border border-line2 bg-panel/70 px-3 py-1.5 font-mono text-[11px] tracking-[0.16em] text-fg2 backdrop-blur [--delay:0.2s]">
            <span className="size-1.5 rounded-full bg-cyan" />
            MANUFACTURING × AI
          </p>

          <h1 className="fade-up mt-6 text-[2.25rem] leading-[1.18] font-extrabold tracking-[-0.03em] whitespace-pre-line sm:text-6xl [--delay:0.35s]">
            <Accent text={resume.headline} accent={resume.headlineAccent} className="text-gradient" />
          </h1>

          <p className="fade-up mt-6 text-base leading-relaxed text-fg2 sm:text-lg [--delay:0.5s]">
            <strong className="font-semibold text-fg">{resume.name}</strong>
            <span className="mx-2 text-dim">·</span>
            {resume.summary}
          </p>

          <div className="fade-up mt-8 flex flex-wrap gap-3 [--delay:0.65s]">
            <a
              href="#career"
              className="group inline-flex items-center gap-2 rounded-[10px] bg-cyan px-5 py-3 text-sm font-bold text-bg shadow-[0_0_32px_rgb(62_224_255/0.35)] transition hover:shadow-[0_0_44px_rgb(62_224_255/0.55)]"
            >
              경력 보기
              <span className="transition-transform group-hover:translate-y-0.5">↓</span>
            </a>
            <a
              href={`mailto:${resume.email}`}
              className="inline-flex items-center rounded-[10px] border border-line3 bg-panel/70 px-5 py-3 text-sm font-semibold backdrop-blur transition hover:border-cyan/50 hover:text-cyan"
            >
              이메일
            </a>
            <a
              href={resume.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-[10px] border border-line3 bg-panel/70 px-5 py-3 text-sm font-semibold backdrop-blur transition hover:border-cyan/50 hover:text-cyan"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>

      {/* KPI 스트립 */}
      <div className="fade-up border-t border-line bg-bg/75 backdrop-blur-md [--delay:0.9s]">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-px bg-line sm:grid-cols-3 lg:grid-cols-6">
          {resume.kpis.map((kpi) => (
            <div key={kpi.label} className="bg-bg/85 px-4 py-5 sm:px-6">
              <dt className="text-[11px] tracking-wide text-muted">{kpi.label}</dt>
              <dd className={`mt-1.5 font-mono text-2xl font-semibold tracking-tight ${TONE[kpi.tone].text}`}>
                {kpi.prefix}
                <CountUp value={kpi.value} />
                {kpi.plus && "+"}
                <small className="ml-1 text-[11px] font-medium text-muted">{kpi.suffix}</small>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
