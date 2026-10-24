import type { Tone } from "@/data/types";

// Tailwind가 클래스를 정적으로 찾을 수 있도록 전체 클래스명을 나열한다
export const TONE: Record<Tone, { text: string; bg: string; border: string; dot: string; hex: string }> = {
  cyan: { text: "text-cyan", bg: "bg-cyan/10", border: "border-cyan/30", dot: "bg-cyan", hex: "#3ee0ff" },
  violet: { text: "text-violet", bg: "bg-violet/10", border: "border-violet/30", dot: "bg-violet", hex: "#a98bff" },
  amber: { text: "text-amber", bg: "bg-amber/10", border: "border-amber/30", dot: "bg-amber", hex: "#ffb020" },
  green: { text: "text-green", bg: "bg-green/10", border: "border-green/30", dot: "bg-green", hex: "#36d98e" },
  blue: { text: "text-blue", bg: "bg-blue/10", border: "border-blue/30", dot: "bg-blue", hex: "#4d8dff" },
  red: { text: "text-red", bg: "bg-red/10", border: "border-red/30", dot: "bg-red", hex: "#ff4d5e" },
};
