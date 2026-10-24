// 아이소메트릭 FAB 트윈의 월드 모델: Bay · 설비 · Stocker · OHT 레일 · 차량
// 단위는 월드 좌표(x: 0~60, y: 0~36, z: 높이)

export type RGB = [number, number, number];
export type Box = {
  t: "box";
  x: number;
  y: number;
  z: number;
  w: number;
  d: number;
  h: number;
  c: RGB;
  tanks?: number;
  shelves?: boolean;
};
export type Cyl = { t: "cyl"; x: number; y: number; z: number; r: number; h: number; c: RGB };
export type Part = Box | Cyl;
export type ToolState = "RUN" | "IDLE" | "DOWN" | "PM";

export type Tool = {
  id: string;
  parts: Part[];
  lamp: [number, number, number] | null;
  state: ToolState;
  euv: Cyl | null;
  delay: number;
};

export type Bay = { x: number; y: number; label: string; code: string; color: string; top: boolean };
export type Path = { pts: [number, number][]; seg: number[]; len: number };
export type Station = { s: number; x: number; y: number; tool: Tool };

export type Vehicle = {
  path: Path;
  s: number;
  speed: number;
  carrying: boolean;
  stations: Station[] | null;
  phase: "move" | "hoist";
  from: number;
  dist: number;
  t: number;
  dur: number;
  target: Station | null;
  unloading: boolean;
  handed: boolean;
};

export type Fab = { tools: Tool[]; bays: Bay[]; rails: Path[]; vehicles: Vehicle[] };

export const RAIL_Z = 5.2;
export const PORT_Z = 0.95;
export const CARRY_Z = 4.05;
export const HOIST_DUR = 2.9;

export const STATE_COLOR: Record<ToolState, string> = {
  RUN: "#36d98e",
  IDLE: "#64748b",
  DOWN: "#ff4d5e",
  PM: "#4d8dff",
};

const BAYS = [
  { area: "PHOTO", label: "PHOTO · EUV", color: "#f5c542", kind: "photo" },
  { area: "ETCH", label: "ETCH", color: "#ff7a59", kind: "cluster" },
  { area: "DEPO", label: "DEPOSITION", color: "#4fd1c5", kind: "cluster" },
  { area: "DIFF", label: "DIFFUSION", color: "#ff5fa2", kind: "furnace" },
  { area: "CLEAN", label: "WET CLEAN", color: "#9be15d", kind: "bench" },
  { area: "CMP", label: "CMP", color: "#7aa2ff", kind: "cmp" },
  { area: "IMP", label: "IMPLANT", color: "#b48cff", kind: "imp" },
  { area: "METRO", label: "METROLOGY", color: "#c0c8d6", kind: "metro" },
] as const;
type Kind = (typeof BAYS)[number]["kind"];

export const hex = (h: string): RGB => {
  const n = parseInt(h.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};
const mix = (a: RGB, b: RGB, t: number): RGB => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t,
];
const pad = (n: number) => String(n).padStart(2, "0");

const BODY = hex("#34465c");
const EFEM = hex("#44576f");
const CH = hex("#55677f");
const DARK = hex("#26334a");
const TRACK = hex("#2f4157");
const STK = hex("#2a3c55");
const EUV = hex("#4a3f70");
const PLATEN = hex("#5d7088");

// ---------------------------------------------------------------- path
function makePath(pts: [number, number][]): Path {
  const seg: number[] = [];
  let len = 0;
  pts.forEach(([ax, ay], i) => {
    const [bx, by] = pts[(i + 1) % pts.length];
    seg.push(len);
    len += Math.hypot(bx - ax, by - ay);
  });
  return { pts, seg, len };
}

/** 경로 위 s 지점의 [x, y, dirX, dirY] */
export function pointAt(p: Path, s: number): [number, number, number, number] {
  const ss = ((s % p.len) + p.len) % p.len;
  let i = p.seg.length - 1;
  while (i > 0 && p.seg[i] > ss) i--;
  const [ax, ay] = p.pts[i];
  const [bx, by] = p.pts[(i + 1) % p.pts.length];
  const l = Math.hypot(bx - ax, by - ay);
  const k = (ss - p.seg[i]) / l;
  return [ax + (bx - ax) * k, ay + (by - ay) * k, (bx - ax) / l, (by - ay) / l];
}

function sOf(p: Path, x: number, y: number) {
  let best = 0;
  let bestD = Infinity;
  p.pts.forEach(([ax, ay], i) => {
    const [bx, by] = p.pts[(i + 1) % p.pts.length];
    const l = Math.hypot(bx - ax, by - ay);
    const k = Math.max(0, Math.min(1, ((x - ax) * (bx - ax) + (y - ay) * (by - ay)) / (l * l)));
    const d = Math.hypot(ax + (bx - ax) * k - x, ay + (by - ay) * k - y);
    if (d < bestD) {
      bestD = d;
      best = p.seg[i] + k * l;
    }
  });
  return best;
}

// ---------------------------------------------------------------- tools
/** 통로(aisle) 기준 로컬 좌표(u: 통로에서 멀어지는 방향, v: y 방향)로 설비 형상을 만든다 */
function toolParts(kind: Kind, X: (u: number, w: number) => number, y: number, tint: RGB, rand: () => number, side: number) {
  const parts: Part[] = [];
  let euv: Cyl | null = null;
  const box = (u: number, w: number, v: number, d: number, z: number, h: number, c: RGB, extra: Partial<Box> = {}) => {
    parts.push({ t: "box", x: X(u, w), y: y + v, z, w, d, h, c, ...extra });
  };
  const cyl = (u: number, v: number, r: number, z: number, h: number, c: RGB) => {
    const p: Cyl = { t: "cyl", x: X(u - r, 2 * r) + r, y: y + v, z, r, h, c };
    parts.push(p);
    return p;
  };

  let len: number;
  switch (kind) {
    case "photo": {
      const isEuv = side < 0;
      const H = isEuv ? 3 : 2.4;
      box(0, 1.4, 0, 3, 0, 1.8, TRACK);
      box(1.6, 3, 0, 3, 0, H, tint);
      box(1.9, 2.4, 0.8, 1.4, H, 0.45, EFEM);
      if (isEuv) euv = cyl(3.75, 2.3, 0.55, H, 0.95, EUV);
      len = 3.0;
      break;
    }
    case "cluster": {
      box(0, 1.0, 0.25, 2.8, 0, 1.5, EFEM);
      cyl(2.05, 1.65, 0.78, 0, 1.0, tint);
      for (const [du, dv] of [
        [1.3, -1.1],
        [1.75, 0],
        [1.3, 1.1],
      ])
        cyl(2.05 + du, 1.65 + dv, 0.6, 0, 1.35, CH);
      len = 3.3;
      break;
    }
    case "furnace": {
      const h = 3.3 + rand() * 0.9;
      box(0, 1.1, 0.1, 1.3, 0, 1.1, EFEM);
      box(1.3, 1.4, 0.05, 1.4, 0, h, tint);
      cyl(2.0, 0.75, 0.3, h, 0.35, DARK);
      len = 1.5;
      break;
    }
    case "bench": {
      box(0, 2.0, 0, 5.4, 0, 1.3, tint, { tanks: 6 });
      box(0.15, 1.7, 1.6, 0.55, 1.3, 0.5, DARK);
      box(2.6, 2.2, 0.6, 2.2, 0, 1.75, tint);
      box(2.85, 1.7, 0.85, 1.7, 1.75, 0.35, EFEM);
      len = 5.6;
      break;
    }
    case "cmp": {
      box(0, 1.2, 0.2, 3.4, 0, 1.6, EFEM);
      box(1.4, 3.2, 0.2, 3.4, 0, 1.15, tint);
      for (let k = 0; k < 3; k++) cyl(3.0, 0.85 + k * 1.05, 0.42, 1.15, 0.08, PLATEN);
      len = 3.8;
      break;
    }
    case "imp": {
      box(0, 1.6, 0.1, 1.8, 0, 1.9, EFEM);
      box(1.7, 1.4, 0.55, 0.9, 0, 1.15, DARK);
      cyl(2.45, 2.35, 0.7, 0, 1.55, EUV);
      box(3.2, 1.6, 1.6, 2.3, 0, 2.1, tint);
      len = 4.0;
      break;
    }
    default: {
      box(0, 1.6, 0.15, 1.6, 0, 1.1, tint);
      cyl(0.8, 0.95, 0.36, 1.1, 0.3, CH);
      box(2.1, 1.6, 0.15, 1.6, 0, 0.9, EFEM);
      len = 1.9;
    }
  }

  // 가장 높은 박스 위, 통로 쪽 뒷모서리에 Signal Tower
  let tallest: Box | null = null;
  for (const p of parts) if (p.t === "box" && (!tallest || p.z + p.h > tallest.z + tallest.h)) tallest = p;
  const tb = tallest!;
  const tx = side > 0 ? tb.x + 0.22 : tb.x + tb.w - 0.22;
  const ty = tb.y + 0.22;
  const tz = tb.z + tb.h;
  parts.push({ t: "cyl", x: tx, y: ty, z: tz, r: 0.07, h: 0.55, c: DARK });

  // 바닥 파트 → 위에 얹힌 파트 순, 각각 깊이순
  const depth = (p: Part) => (p.t === "box" ? p.x + p.w / 2 + p.y + p.d / 2 : p.x + p.y);
  parts.sort((a, b) => (a.z > 0 ? 1 : 0) - (b.z > 0 ? 1 : 0) || depth(a) - depth(b));

  return { parts, euv, len, lamp: [tx, ty, tz + 0.62] as [number, number, number] };
}

function randomState(rand: () => number): ToolState {
  const r = rand();
  return r < 0.74 ? "RUN" : r < 0.86 ? "IDLE" : r < 0.93 ? "PM" : "DOWN";
}

// ---------------------------------------------------------------- build
export function buildFab(rand: () => number): Fab {
  const tools: Tool[] = [];
  const bays: Bay[] = [];
  const vehicles: Vehicle[] = [];
  const counters: Record<string, number> = {};
  const nextId = (area: string) => `${area}-${pad((counters[area] = (counters[area] ?? 0) + 1))}`;

  const inter = makePath([
    [1.2, 16.5],
    [58.8, 16.5],
    [58.8, 19.5],
    [1.2, 19.5],
  ]);
  const rails: Path[] = [inter];

  BAYS.forEach((def, i) => {
    const top = i < 4;
    const bx = 1 + (i % 4) * 14.5;
    const y0 = top ? 1 : 21;
    const ax = bx + 7;
    bays.push({ x: bx, y: y0, label: def.label, code: `BAY-${pad(i + 1)}`, color: def.color, top });
    const tint = mix(BODY, hex(def.color), 0.13);

    const path = top
      ? makePath([
          [ax + 0.7, 16.5],
          [ax + 0.7, 1.6],
          [ax - 0.7, 1.6],
          [ax - 0.7, 16.5],
        ])
      : makePath([
          [ax - 0.7, 19.5],
          [ax - 0.7, 34.4],
          [ax + 0.7, 34.4],
          [ax + 0.7, 19.5],
        ]);
    rails.push(path);
    const stations: Station[] = [];

    for (const side of [-1, 1]) {
      const X = (u: number, w: number) => (side > 0 ? ax + 1.4 + u : ax - 1.4 - u - w);
      let y = top ? y0 + 0.5 : y0 + 1.2;
      const yEnd = top ? y0 + 12.8 : y0 + 13.5;
      for (;;) {
        const spec = toolParts(def.kind, X, y, tint, rand, side);
        if (y + spec.len > yEnd) break;
        const tool: Tool = { id: nextId(def.area), parts: spec.parts, lamp: spec.lamp, state: randomState(rand), euv: spec.euv, delay: 0 };
        tools.push(tool);
        const sx = ax + side * 0.7;
        const sy = y + spec.len / 2;
        stations.push({ s: sOf(path, sx, sy), x: sx, y: sy, tool });
        y += spec.len + 0.35;
      }
    }

    const v: Vehicle = {
      path,
      s: rand() * path.len,
      speed: 0,
      carrying: rand() < 0.5,
      stations,
      phase: "move",
      from: 0,
      dist: 0,
      t: 0,
      dur: 0,
      target: null,
      unloading: false,
      handed: false,
    };
    nextMove(v, rand);
    vehicles.push(v);
  });

  // Interbay Stocker
  [4.25, 15.25, 29.75, 44.25, 55.5].forEach((cx, i) => {
    tools.push({
      id: `STK-${pad(i + 1)}`,
      parts: [
        { t: "box", x: cx - 1.6, y: 17.15, z: 0, w: 3.2, d: 1.7, h: 4.2, c: STK, shelves: true },
        { t: "box", x: cx - 1.45, y: 17.3, z: 4.2, w: 2.9, d: 1.4, h: 0.22, c: EFEM },
      ],
      lamp: null,
      state: "RUN",
      euv: null,
      delay: 0,
    });
  });

  // Interbay 순환 차량
  for (let i = 0; i < 10; i++) {
    vehicles.push({
      path: inter,
      s: (inter.len / 10) * i,
      speed: 4.2,
      carrying: rand() < 0.6,
      stations: null,
      phase: "move",
      from: 0,
      dist: 0,
      t: 0,
      dur: 0,
      target: null,
      unloading: false,
      handed: false,
    });
  }

  const center = (t: Tool) => {
    const p = t.parts[0];
    return p.t === "box" ? p.x + p.w / 2 + p.y + p.d / 2 : p.x + p.y;
  };
  tools.sort((a, b) => center(a) - center(b));
  for (const t of tools) t.delay = 0.15 + (center(t) / 96) * 1.35 + rand() * 0.12;

  return { tools, bays, rails, vehicles };
}

export function nextMove(v: Vehicle, rand: () => number) {
  const st = v.stations!;
  let target = st[Math.floor(rand() * st.length)];
  if (target === v.target && st.length > 1) target = st[(st.indexOf(target) + 1) % st.length];
  v.target = target;
  v.from = v.s;
  v.dist = (((target.s - v.s) % v.path.len) + v.path.len) % v.path.len;
  v.t = 0;
  v.dur = 0.8 + v.dist / 3.4;
  v.phase = "move";
}

/** 호이스트 동작 중 그리퍼 높이 */
export function hoistZ(t: number) {
  const e = (k: number) => (k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2);
  if (t < 1.0) return CARRY_Z + (PORT_Z - CARRY_Z) * e(t);
  if (t < 1.5) return PORT_Z;
  if (t < 2.5) return PORT_Z + (CARRY_Z - PORT_Z) * e(t - 1.5);
  return CARRY_Z;
}
