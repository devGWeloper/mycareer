import type { CSSProperties } from "react";

/* CASE 01 — 장비 가동 타임라인 (개념도) */
const BEFORE = [
  ["run", 17],
  ["idle", 6],
  ["run", 14],
  ["idle", 8],
  ["run", 19],
  ["idle", 5],
  ["run", 15],
  ["idle", 7],
  ["run", 9],
] as const;

export function UtilizationVisual() {
  return (
    <div className="rounded-xl border border-line2 bg-bg2/80 p-5 font-mono text-[11px]">
      <div className="flex items-center justify-between text-muted">
        <span className="tracking-[0.14em]">EUV EQP · 24H TIMELINE</span>
        <span className="text-dim">개념도</span>
      </div>

      <div className="mt-5 space-y-4">
        <div>
          <div className="mb-1.5 flex justify-between">
            <span className="text-fg2">BEFORE · In / Out 미구분</span>
            <span className="text-amber">PORT IDLE</span>
          </div>
          <div className="flex h-7 gap-px overflow-hidden rounded-md">
            {BEFORE.map(([kind, w], i) => (
              <span
                key={i}
                style={{ width: `${w}%` }}
                className={
                  kind === "run"
                    ? "bg-green/70"
                    : "bg-[repeating-linear-gradient(135deg,rgb(255_176_32/0.55)_0_4px,rgb(255_176_32/0.15)_4px_8px)]"
                }
              />
            ))}
          </div>
        </div>

        <div>
          <div className="mb-1.5 flex justify-between">
            <span className="text-fg2">AFTER · 논리 In / Out 분리</span>
            <span className="text-green">CONTINUOUS</span>
          </div>
          <div className="relative h-7 overflow-clip rounded-md bg-panel3">
            <span className="grow-on-view absolute inset-0 rounded-md bg-gradient-to-r from-green/60 to-green/90" />
          </div>
        </div>
      </div>

      <div className="mt-3 flex justify-between text-dim">
        <span>00h</span>
        <span>06h</span>
        <span>12h</span>
        <span>18h</span>
        <span>24h</span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2">
        {[
          ["IN PORT", "투입 전용"],
          ["OUT PORT", "반출 전용"],
        ].map(([code, label], i) => (
          <div key={code} className="flex items-center gap-2 rounded-lg border border-line2 bg-panel/80 px-3 py-2">
            <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-panel3">
              <span
                className="travel-x absolute top-0 size-1.5 -translate-x-1/2 rounded-full bg-cyan shadow-[0_0_8px_#3ee0ff]"
                style={{ "--dur": "1.8s", "--delay": `${i * 0.9}s` } as CSSProperties}
              />
            </span>
            <span className="text-cyan">{code}</span>
            <span className="text-muted">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* CASE 02 — 메신저 → MES 5-Layer 파이프라인 */
const LAYERS = [
  { code: "L1", name: "사내 메신저", sub: "자연어 요청" },
  { code: "L2", name: "챗봇 서버", sub: "메시지 중계" },
  { code: "L3", name: "AI 백엔드", sub: "LangGraph Agent" },
  { code: "L4", name: "MCP Gateway", sub: "Tool · 권한 통제" },
  { code: "L5", name: "Legacy MES", sub: "실제 실행" },
];

export function PipelineVisual() {
  return (
    <div className="rounded-xl border border-line2 bg-bg2/80 p-5">
      <div className="flex items-center justify-between font-mono text-[11px] text-muted">
        <span className="tracking-[0.14em]">5-LAYER E2E PIPELINE</span>
        <span className="flex items-center gap-1.5 text-green">
          <span className="dot-live size-1.5 rounded-full" />
          PRODUCTION
        </span>
      </div>

      <ol className="mt-5 flex flex-col">
        {LAYERS.map((l, i) => (
          <li key={l.code} className="flex flex-col">
            <div
              className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 ${
                i === 2 ? "border-violet/40 bg-violet/10" : i === 4 ? "border-amber/40 bg-amber/10" : "border-line2 bg-panel/80"
              }`}
            >
              <span className="font-mono text-[10.5px] text-dim">{l.code}</span>
              <span className="text-sm font-semibold">{l.name}</span>
              <span className="ml-auto font-mono text-[11px] text-muted">{l.sub}</span>
            </div>
            {i < LAYERS.length - 1 && (
              <div className="relative mx-auto h-5 w-px">
                <span className="flow-y absolute inset-0 text-violet/60" />
                <span
                  className="travel-y absolute left-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet shadow-[0_0_8px_#a98bff]"
                  style={{ "--dur": "0.9s", "--delay": `${i * 0.22}s` } as CSSProperties}
                />
              </div>
            )}
          </li>
        ))}
      </ol>

      <p className="mt-4 rounded-lg border border-dashed border-line3 px-3 py-2 text-center font-mono text-[11px] text-fg2">
        보안 거버넌스 충족 · 폐쇄망 배포
      </p>
    </div>
  );
}

/* CASE 03 — RAG 컬렉션 선별 깔때기 */
const FUNNEL = [
  { label: "RAG 컬렉션 생성", value: "80+", w: 100 },
  { label: "자동 Scoring", value: "TOP-N", w: 84 },
  { label: "실사용자 평가표 검증", value: "FIELD", w: 70 },
  { label: "Hybrid + Reranker", value: "PROD", w: 56 },
];

export function RagVisual() {
  return (
    <div className="rounded-xl border border-line2 bg-bg2/80 p-5 font-mono text-[11px]">
      <div className="flex items-center justify-between text-muted">
        <span className="tracking-[0.14em]">COLLECTION SELECTION</span>
        <span className="text-cyan">축약어 · 동의어 대응</span>
      </div>
      <div className="mt-5 space-y-2.5">
        {FUNNEL.map((f, i) => (
          <div key={f.label} className="flex items-center gap-3">
            <span className="w-5 text-dim">{String(i + 1).padStart(2, "0")}</span>
            <div className="flex-1">
              <div
                className="grow-on-view flex h-9 items-center justify-between rounded-md border border-cyan/30 px-3"
                style={{
                  width: `${f.w}%`,
                  background: `linear-gradient(90deg, rgb(62 224 255 / ${0.06 + i * 0.06}), rgb(62 224 255 / ${0.02 + i * 0.03}))`,
                }}
              >
                <span className="truncate text-fg2">{f.label}</span>
                <span className="ml-2 shrink-0 text-cyan">{f.value}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-center text-fg2">→ 현장 맞춤 기준정보 가이드 Agent</p>
    </div>
  );
}
