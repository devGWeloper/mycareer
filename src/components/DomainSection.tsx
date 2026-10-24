import type { CSSProperties } from "react";
import type { Resume, SectionCopy } from "@/data/types";
import { Container, SectionHeader } from "./SectionHeader";

const C = 280;
const R = 178;

function DomainMap({ nodes }: { nodes: Resume["domain"]["nodes"] }) {
  const placed = nodes.map((n, i) => {
    const a = ((-90 + i * (360 / nodes.length)) * Math.PI) / 180;
    return { ...n, x: C + Math.cos(a) * R, y: C + Math.sin(a) * R };
  });

  return (
    <svg
      viewBox="0 0 560 560"
      className="w-full max-w-[560px]"
      role="img"
      aria-label={`MES를 중심으로 ${nodes.map((n) => n.label).join(", ")} 시스템이 연결된 제조 시스템 구조도`}
    >
      <defs>
        <radialGradient id="hub-glow">
          <stop offset="0" stopColor="#3ee0ff" stopOpacity="0.35" />
          <stop offset="1" stopColor="#3ee0ff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hub-stroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3ee0ff" />
          <stop offset="1" stopColor="#a98bff" />
        </linearGradient>
      </defs>

      {/* AI Agent 레이어: 도메인 전체를 감싸는 궤도 */}
      <g className="spin-slow">
        <circle cx={C} cy={C} r={262} fill="none" stroke="#a98bff" strokeOpacity="0.35" strokeDasharray="2 10" strokeWidth="1.5" />
        <circle cx={C} cy={18} r={4} fill="#a98bff" />
        <circle cx={C} cy={542} r={3} fill="#a98bff" fillOpacity="0.6" />
      </g>
      <text x={C} y={36} textAnchor="middle" className="fill-violet font-mono text-[10.5px] tracking-[0.2em]">
        AI AGENT LAYER · 2025 →
      </text>

      <circle cx={C} cy={C} r={130} fill="url(#hub-glow)" />
      <circle cx={C} cy={C} r={R} fill="none" stroke="rgb(140 175 220 / 0.1)" strokeDasharray="3 6" />

      {placed.map((n, i) => (
        <g key={n.code}>
          <line x1={C} y1={C} x2={n.x} y2={n.y} stroke="rgb(62 224 255 / 0.22)" strokeWidth="1" pathLength={1} strokeDasharray="1" className="draw-stroke" />
          <circle
            cx={C}
            cy={C}
            r={3}
            fill="#3ee0ff"
            className="packet"
            style={{ "--dx": `${n.x - C}px`, "--dy": `${n.y - C}px`, "--delay": `${i * 0.43}s` } as CSSProperties}
          />
          <circle
            cx={n.x}
            cy={n.y}
            r={2.5}
            fill="#a98bff"
            className="packet"
            style={{ "--dx": `${C - n.x}px`, "--dy": `${C - n.y}px`, "--delay": `${1.3 + i * 0.37}s`, "--dur": "3.1s" } as CSSProperties}
          />
        </g>
      ))}

      {placed.map((n) => (
        <g key={`${n.code}-node`}>
          <rect x={n.x - 62} y={n.y - 28} width={124} height={56} rx={12} fill="#0a1018" stroke="rgb(140 175 220 / 0.24)" />
          <text x={n.x} y={n.y - 4} textAnchor="middle" className="fill-cyan font-mono text-[11px] font-semibold tracking-[0.12em]">
            {n.code}
          </text>
          <text x={n.x} y={n.y + 15} textAnchor="middle" className="fill-fg2 text-[13px]">
            {n.label}
          </text>
        </g>
      ))}

      <path
        d={`M${C} ${C - 74} L${C + 64} ${C - 37} L${C + 64} ${C + 37} L${C} ${C + 74} L${C - 64} ${C + 37} L${C - 64} ${C - 37} Z`}
        fill="#0e1621"
        stroke="url(#hub-stroke)"
        strokeWidth="2"
      />
      <text x={C} y={C + 6} textAnchor="middle" className="fill-fg text-[34px] font-extrabold tracking-[-0.02em]">
        MES
      </text>
      <text x={C} y={C + 28} textAnchor="middle" className="fill-muted font-mono text-[9.5px] tracking-[0.16em]">
        EXECUTION HUB
      </text>
    </svg>
  );
}

export function DomainSection({ copy, domain }: { copy: SectionCopy; domain: Resume["domain"] }) {
  return (
    <section id="domain" className="relative scroll-mt-16 border-b border-line py-24 sm:py-32">
      <div aria-hidden className="bg-blueprint pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <Container>
        <SectionHeader copy={copy} />

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div className="reveal map-scope flex justify-center">
            <DomainMap nodes={domain.nodes} />
          </div>

          <ul className="grid gap-4 sm:grid-cols-2">
            {domain.facts.map((f) => (
              <li
                key={f.label}
                className="reveal group relative overflow-clip rounded-2xl border border-line2 bg-panel/80 p-6 transition-colors hover:border-cyan/40"
              >
                <span aria-hidden className="draw-x absolute top-0 left-6 h-px w-12 bg-gradient-to-r from-cyan to-transparent" />
                <p className="font-mono text-3xl font-semibold tracking-tight text-fg">{f.value}</p>
                <p className="mt-3 font-semibold">{f.label}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{f.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
