import { cacheLife } from "next/cache";
import { ImageResponse } from "next/og";
import { resume } from "@/data/resume";
import { TONE } from "@/components/tone";

// 링크 미리보기 카드 (LinkedIn · 카카오톡 등). 빌드 시 한 번 생성되는 정적 이미지
export const alt = `${resume.name} · ${resume.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// 한글 글리프가 필요해서 사이트와 같은 Pretendard를 빌드 시점에 받아 쓴다
const PRETENDARD = "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard/dist/public/static";
const MONO = "https://cdn.jsdelivr.net/npm/@fontsource/jetbrains-mono@5.0.20/files";
const font = (url: string) => fetch(url).then((r) => r.arrayBuffer());

// Cache Components에서는 외부 fetch를 use cache 안에서 해야 빌드 시 프리렌더된다
async function loadFonts() {
  "use cache";
  cacheLife("max");
  return Promise.all([
    font(`${PRETENDARD}/Pretendard-ExtraBold.otf`),
    font(`${PRETENDARD}/Pretendard-Medium.otf`),
    font(`${MONO}/jetbrains-mono-latin-500-normal.woff`),
  ]);
}

const C = {
  bg: "#05080d",
  panel: "#0a1018",
  line: "rgba(140,175,220,0.15)",
  fg: "#e4ebf5",
  fg2: "#b3c0d2",
  muted: "#6f7e94",
  cyan: TONE.cyan.hex,
  violet: TONE.violet.hex,
};


export default async function Image() {
  const [extraBold, medium, mono] = await loadFonts();
  const [line1, line2] = resume.headline.split("\n");

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: C.bg, fontFamily: "Pretendard", color: C.fg }}>
        {/* 블루프린트 격자 + 우측 글로우 */}
        <svg width="1200" height="630" style={{ position: "absolute", top: 0, left: 0 }}>
          <defs>
            <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M48 0H0V48" fill="none" stroke="rgba(140,175,220,0.07)" strokeWidth="1" />
            </pattern>
            <radialGradient id="glow" cx="0.78" cy="0.42" r="0.5">
              <stop offset="0" stopColor={C.violet} stopOpacity="0.22" />
              <stop offset="0.5" stopColor={C.cyan} stopOpacity="0.06" />
              <stop offset="1" stopColor={C.bg} stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="1200" height="630" fill="url(#grid)" />
          <rect width="1200" height="630" fill="url(#glow)" />
        </svg>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${C.cyan}, ${C.violet} 60%, transparent)` }} />

        <div style={{ display: "flex", flexDirection: "column", width: "100%", padding: "52px 64px 56px" }}>
          {/* 상단: 로고 · 이름 / 소속 */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <svg width="44" height="44" viewBox="0 0 32 32" fill="none">
                <defs>
                  <linearGradient id="logo" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor={C.cyan} />
                    <stop offset="1" stopColor={C.violet} />
                  </linearGradient>
                </defs>
                <path d="M16 3 4 10v12l12 7 12-7V10z" stroke="url(#logo)" strokeWidth="2" />
                <path d="M4 10l12 7 12-7M16 17v12" stroke="url(#logo)" strokeWidth="1.4" opacity=".6" />
                <circle cx="16" cy="17" r="2.6" fill={C.cyan} />
              </svg>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: 26, fontWeight: 800, letterSpacing: -0.5 }}>{resume.name}</span>
                <span style={{ fontFamily: "Mono", fontSize: 13, letterSpacing: 4, color: C.muted }}>{resume.nameEn.toUpperCase()}</span>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "Mono", fontSize: 15, color: C.fg2 }}>
              <span style={{ width: 8, height: 8, borderRadius: 8, background: TONE.green.hex, boxShadow: `0 0 10px ${TONE.green.hex}` }} />
              {resume.company.name} · {resume.company.position}
            </div>
          </div>

          {/* 본문: 헤드라인 / 커리어 레일 */}
          <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: "Mono", fontSize: 16, letterSpacing: 5, color: C.cyan }}>
                <span style={{ width: 40, height: 1, background: C.cyan, opacity: 0.6 }} />
                {resume.role.toUpperCase()}
              </div>
              <span style={{ marginTop: 22, fontSize: 66, fontWeight: 800, letterSpacing: -2, lineHeight: 1.15 }}>{line1}</span>
              <span
                style={{
                  fontSize: 66,
                  fontWeight: 800,
                  letterSpacing: -2,
                  lineHeight: 1.15,
                  backgroundImage: `linear-gradient(100deg, ${C.cyan}, ${C.violet})`,
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                {line2}
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", width: 330, position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  left: 7,
                  top: 14,
                  bottom: 14,
                  width: 2,
                  background: `linear-gradient(${resume.career.map((s) => TONE[s.tone].hex).join(", ")})`,
                }}
              />
              {resume.career.map((s, i) => {
                const hex = TONE[s.tone].hex;
                return (
                  <div key={s.id} style={{ display: "flex", alignItems: "flex-start", gap: 22, marginTop: i === 0 ? 0 : 26 }}>
                    <span
                      style={{ marginTop: 6, width: 16, height: 16, borderRadius: 16, background: hex, border: `3px solid ${C.bg}`, boxShadow: `0 0 0 2px ${hex}55, 0 0 16px ${hex}` }}
                    />
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div style={{ display: "flex", gap: 12, fontFamily: "Mono", fontSize: 13, letterSpacing: 3 }}>
                        <span style={{ color: hex }}>{s.phase}</span>
                        <span style={{ color: C.muted }}>
                          {s.start} – {s.end ?? "NOW"}
                        </span>
                      </div>
                      <span style={{ marginTop: 4, fontSize: 24, fontWeight: 800, color: C.fg }}>{s.role}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 하단: 경력 띠 (메인 화면과 같은 데이터) */}
          <div style={{ display: "flex", gap: 14 }}>
            {resume.heroSteps.map((step) => {
              const hex = TONE[step.tone].hex;
              return (
                <div
                  key={step.title}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    padding: "14px 18px 16px",
                    borderRadius: 14,
                    background: C.panel,
                    border: `1px solid ${C.line}`,
                    borderTop: `2px solid ${hex}`,
                  }}
                >
                  <span style={{ fontFamily: "Mono", fontSize: 11, letterSpacing: 2, color: hex, whiteSpace: "nowrap" }}>{step.phase}</span>
                  <span style={{ marginTop: 6, fontSize: 28, fontWeight: 800, color: hex, letterSpacing: -0.5 }}>{step.role}</span>
                  <span style={{ marginTop: 6, fontSize: 14, fontWeight: 800, color: C.fg, wordBreak: "keep-all" }}>{step.title}</span>
                  {step.note && <span style={{ marginTop: 2, fontSize: 13, color: C.muted }}>{step.note}</span>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Pretendard", data: extraBold, weight: 800, style: "normal" },
        { name: "Pretendard", data: medium, weight: 500, style: "normal" },
        { name: "Mono", data: mono, weight: 500, style: "normal" },
      ],
    },
  );
}
