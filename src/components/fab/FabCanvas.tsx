"use client";

import { useEffect, useRef } from "react";
import {
  buildFab,
  hoistZ,
  nextMove,
  pointAt,
  type Fab,
  type Tool,
  type ToolState,
  type Vehicle,
  CARRY_Z,
  HOIST_DUR,
  PORT_Z,
  RAIL_Z,
  STATE_COLOR,
} from "./model";
import { drawBox, drawStatic, project, type View } from "./render";

type Label = { x: number; y: number; z: number; text: string; color: string; t: number };
type Ping = { x: number; y: number; z: number; color: string; t: number };

const INTRO = 2.6;
const LABEL_LIFE = 2.6;
const MAX_LABELS = 5;

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

function makeGlow(color: string) {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, color);
  grad.addColorStop(0.25, `${color}aa`);
  grad.addColorStop(1, `${color}00`);
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  return c;
}

function computeView(W: number, H: number): View {
  const wide = W >= 1024;
  const s = wide ? Math.min(W / 88, H / 55) : Math.max((W / 83) * 1.3, 5.5);
  const cx = wide ? W * 0.64 : W * 0.5;
  const cy = wide ? H * 0.5 : H * 0.56;
  // 월드 투영 범위의 중심: x-y ∈ [-36, 60] · cos30, x+y ∈ [0, 96] · 0.5
  return { s, ox: cx - 10.4 * s, oy: cy - 21.3 * s };
}

export function FabCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rand = mulberry32(20200101);
    const fab: Fab = buildFab(rand);
    const cache = document.createElement("canvas");
    const cctx = cache.getContext("2d")!;
    const mono =
      getComputedStyle(document.documentElement).getPropertyValue("--font-jetbrains-mono").trim() ||
      "ui-monospace, monospace";
    const glows = Object.fromEntries(
      (Object.keys(STATE_COLOR) as ToolState[]).map((k) => [k, makeGlow(STATE_COLOR[k])]),
    ) as Record<ToolState, HTMLCanvasElement>;
    const euvGlow = makeGlow("#a98bff");
    const cyanGlow = makeGlow("#3ee0ff");

    let W = 0;
    let H = 0;
    let dpr = 1;
    let view: View = { s: 1, ox: 0, oy: 0 };
    let cached = false;
    let raf = 0;
    let visible = true;
    const start = performance.now();
    let last = start;
    let nextEvent = 2.2;
    let lot = 2400;
    const labels: Label[] = [];
    const pings: Ping[] = [];
    const pointer = { tx: 0, ty: 0, x: 0, y: 0 };
    const operable = fab.tools.filter((t) => t.lamp);

    const pushLabel = (l: Label) => {
      labels.push(l);
      if (labels.length > MAX_LABELS) labels.shift();
    };

    const setState = (tool: Tool, state: ToolState, time: number, text?: string) => {
      tool.state = state;
      if (!tool.lamp) return;
      const [x, y, z] = tool.lamp;
      pings.push({ x, y, z, color: STATE_COLOR[state], t: time });
      if (text) pushLabel({ x, y, z, text, color: STATE_COLOR[state], t: time });
    };

    const update = (dt: number, time: number) => {
      for (const v of fab.vehicles) {
        if (!v.stations) {
          v.s = (v.s + v.speed * dt) % v.path.len;
          continue;
        }
        v.t += dt;
        if (v.phase === "move") {
          const k = clamp01(v.t / v.dur);
          const e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
          v.s = (v.from + v.dist * e) % v.path.len;
          if (k >= 1) {
            v.phase = "hoist";
            v.t = 0;
            v.unloading = v.carrying;
            v.handed = false;
          }
        } else {
          if (!v.handed && v.t >= 1.25 && v.target) {
            v.handed = true;
            v.carrying = !v.unloading;
            const tool = v.target.tool;
            const id = `L${lot++}`;
            if (v.unloading) {
              pushLabel({ x: v.target.x, y: v.target.y, z: 1.4, text: `TRACK-IN ${id} · ${tool.id}`, color: "#3ee0ff", t: time });
              if (tool.state !== "DOWN") setState(tool, "RUN", time);
            } else {
              pushLabel({ x: v.target.x, y: v.target.y, z: 1.4, text: `TRACK-OUT ${id}`, color: "#36d98e", t: time });
            }
          }
          if (v.t >= HOIST_DUR) nextMove(v, rand);
        }
      }

      if (time >= nextEvent) {
        nextEvent = time + 0.9 + rand() * 1.3;
        const tool = operable[Math.floor(rand() * operable.length)];
        if (tool.state === "DOWN") setState(tool, "RUN", time, `RECOVER ${tool.id}`);
        else if (tool.state !== "RUN") setState(tool, "RUN", time);
        else {
          const r = rand();
          if (r < 0.32) setState(tool, "DOWN", time, `ALARM ${tool.id}`);
          else if (r < 0.5) setState(tool, "PM", time, `PM START ${tool.id}`);
          else setState(tool, "IDLE", time);
        }
      }

      for (let i = labels.length - 1; i >= 0; i--) if (time - labels[i].t > LABEL_LIFE) labels.splice(i, 1);
      for (let i = pings.length - 1; i >= 0; i--) if (time - pings[i].t > 1.2) pings.splice(i, 1);
    };

    const drawVehicle = (v: Vehicle, a: number) => {
      const [x, y, dx, dy] = pointAt(v.path, v.s);
      const along = Math.abs(dx) > Math.abs(dy);
      const w = along ? 1.0 : 0.62;
      const d = along ? 0.62 : 1.0;
      const hoisting = v.phase === "hoist" && v.stations;
      const body = v.carrying || (hoisting && v.unloading && !v.handed) ? [223, 233, 245] : [125, 142, 166];
      ctx.globalAlpha = a;

      if (hoisting) {
        const gz = hoistZ(v.t);
        const [cx0, cy0] = project(view, x, y, RAIL_Z - 0.65);
        const [, cy1] = project(view, x, y, gz + 0.45);
        ctx.strokeStyle = "rgba(200,220,245,0.55)";
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(cx0 - 2, cy0);
        ctx.lineTo(cx0 - 2, cy1);
        ctx.moveTo(cx0 + 2, cy0);
        ctx.lineTo(cx0 + 2, cy1);
        ctx.stroke();

        let foupZ = gz;
        let foupA = 1;
        if (v.unloading && v.handed) {
          foupZ = PORT_Z;
          foupA = 1 - clamp01((v.t - 1.25) / 0.5);
        } else if (!v.unloading && !v.handed) {
          foupZ = PORT_Z;
          foupA = clamp01((v.t - 0.75) / 0.4);
        }
        if (foupA > 0) {
          ctx.globalAlpha = a * foupA;
          drawBox(ctx, view, { t: "box", x: x - 0.25, y: y - 0.25, z: foupZ, w: 0.5, d: 0.5, h: 0.45, c: [201, 214, 230] });
          ctx.globalAlpha = a;
        }
        // 그리퍼
        drawBox(ctx, view, { t: "box", x: x - 0.3, y: y - 0.3, z: gz + 0.45, w: 0.6, d: 0.6, h: 0.08, c: [90, 110, 135] });
      } else if (v.carrying) {
        drawBox(ctx, view, { t: "box", x: x - 0.25, y: y - 0.25, z: CARRY_Z, w: 0.5, d: 0.5, h: 0.45, c: [201, 214, 230] });
      }

      drawBox(ctx, view, {
        t: "box",
        x: x - w / 2,
        y: y - d / 2,
        z: RAIL_Z - 0.65,
        w,
        d,
        h: 0.5,
        c: body as [number, number, number],
      });
      const [lx, ly] = project(view, x, y, RAIL_Z - 0.1);
      ctx.drawImage(cyanGlow, lx - 5, ly - 5, 10, 10);
      ctx.globalAlpha = 1;
    };

    const drawDynamic = (time: number) => {
      const intro = !reduce && time < INTRO + 0.6;
      const k = Math.min(1, view.s / 16);

      // EUV 광원 글로우
      for (const tool of fab.tools) {
        if (!tool.euv || tool.state !== "RUN") continue;
        const appear = intro ? clamp01((time - tool.delay - 0.6) / 0.4) : 1;
        const e = tool.euv;
        const [x, y] = project(view, e.x, e.y, e.z + e.h);
        const r = (18 + Math.sin(time * 2.2 + e.x) * 3) * k;
        ctx.globalAlpha = 0.55 * appear;
        ctx.drawImage(euvGlow, x - r, y - r * 0.7, r * 2, r * 1.4);
      }

      // 설비 상태등 (Signal Tower)
      for (const tool of operable) {
        const appear = intro ? clamp01((time - tool.delay - 0.6) / 0.4) : 1;
        if (appear <= 0) continue;
        const [lx, ly, lz] = tool.lamp!;
        const [x, y] = project(view, lx, ly, lz);
        let a = 1;
        if (tool.state === "IDLE") a = 0.45;
        else if (tool.state === "PM") a = 0.55 + 0.35 * Math.sin(time * 2.4);
        else if (tool.state === "DOWN") a = Math.sin(time * 9) > 0 ? 1 : 0.25;
        const r = (tool.state === "DOWN" ? 13 : 9) * k + 3;
        ctx.globalAlpha = a * appear;
        ctx.drawImage(glows[tool.state], x - r, y - r, r * 2, r * 2);
        ctx.fillStyle = STATE_COLOR[tool.state];
        ctx.beginPath();
        ctx.arc(x, y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // 상태 변화 핑
      for (const p of pings) {
        const e = (time - p.t) / 1.2;
        const [x, y] = project(view, p.x, p.y, p.z);
        ctx.globalAlpha = 1 - e;
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.ellipse(x, y, 4 + e * 26 * k, (4 + e * 26 * k) * 0.58, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      // OHT 차량 (깊이순)
      const va = reduce ? 1 : clamp01((time - 1.9) / 0.6);
      if (va > 0) {
        const sorted = fab.vehicles
          .map((v) => {
            const [x, y] = pointAt(v.path, v.s);
            return { v, depth: x + y };
          })
          .sort((a, b) => a.depth - b.depth);
        for (const { v } of sorted) drawVehicle(v, va);
      }

      // 이벤트 라벨
      ctx.font = `600 10.5px ${mono}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (const l of labels) {
        const e = (time - l.t) / LABEL_LIFE;
        const a = e < 0.12 ? e / 0.12 : e > 0.75 ? (1 - e) / 0.25 : 1;
        const [px, py] = project(view, l.x, l.y, l.z);
        const y = py - 26 - e * 16;
        const w = ctx.measureText(l.text).width + 16;
        ctx.globalAlpha = a;
        ctx.strokeStyle = `${l.color}66`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(px, y + 9);
        ctx.stroke();
        ctx.fillStyle = "rgba(8,13,21,0.9)";
        ctx.beginPath();
        ctx.roundRect(px - w / 2, y - 9, w, 18, 4);
        ctx.fill();
        ctx.strokeStyle = `${l.color}99`;
        ctx.stroke();
        ctx.fillStyle = l.color;
        ctx.fillText(l.text, px, y + 0.5);
      }
      ctx.globalAlpha = 1;
    };

    const drawSweep = (time: number) => {
      const top = project(view, 0, 36, 6)[1];
      const bottom = project(view, 60, 36, 0)[1];
      const k = (time % 8) / 8;
      const sy = top - 120 + (bottom - top + 240) * k;
      ctx.globalCompositeOperation = "source-atop";
      const g = ctx.createLinearGradient(0, sy - 110, 0, sy + 10);
      g.addColorStop(0, "rgba(62,224,255,0)");
      g.addColorStop(0.92, "rgba(62,224,255,0.07)");
      g.addColorStop(1, "rgba(62,224,255,0.22)");
      ctx.fillStyle = g;
      ctx.fillRect(-100, sy - 110, W + 200, 120);
      ctx.globalCompositeOperation = "source-over";
    };

    const render = (time: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      ctx.translate(pointer.x, pointer.y);
      if (!reduce && time < INTRO) {
        drawStatic(ctx, view, fab, mono, time);
      } else {
        if (!cached) {
          cctx.setTransform(dpr, 0, 0, dpr, 0, 0);
          cctx.clearRect(0, 0, W, H);
          drawStatic(cctx, view, fab, mono, null);
          cached = true;
        }
        ctx.drawImage(cache, 0, 0, W, H);
        if (!reduce) drawSweep(time);
      }
      drawDynamic(time);
    };

    const frame = (now: number) => {
      raf = 0;
      const time = (now - start) / 1000;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;
      if (time > 1.6) update(dt, time);
      render(time);
      if (visible && !document.hidden) raf = requestAnimationFrame(frame);
    };

    const resume = () => {
      if (reduce || raf || !visible || document.hidden) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };

    const resize = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      cache.width = canvas.width;
      cache.height = canvas.height;
      view = computeView(W, H);
      cached = false;
      if (reduce) render(INTRO + 10);
    };

    const onPointer = (e: PointerEvent) => {
      pointer.tx = (e.clientX / window.innerWidth - 0.5) * -22;
      pointer.ty = (e.clientY / window.innerHeight - 0.5) * -12;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      resume();
    });
    io.observe(canvas);

    const onVisibility = () => resume();
    document.addEventListener("visibilitychange", onVisibility);
    if (!reduce) window.addEventListener("pointermove", onPointer, { passive: true });
    document.fonts?.ready.then(() => {
      cached = false;
      if (reduce) render(INTRO + 10);
    });
    resume();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={className} />;
}
