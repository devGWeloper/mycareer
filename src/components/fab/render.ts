import type { Box, Cyl, Fab, Path, RGB } from "./model";
import { RAIL_Z, hex } from "./model";

export type View = { s: number; ox: number; oy: number };

const COS = Math.cos(Math.PI / 6);
const SIN = 0.5;
const ZK = 0.9;

export function project(v: View, x: number, y: number, z: number): [number, number] {
  return [(x - y) * COS * v.s + v.ox, (x + y) * SIN * v.s - z * ZK * v.s + v.oy];
}

const rgb = (c: RGB, f = 1) =>
  `rgb(${Math.min(255, c[0] * f) | 0},${Math.min(255, c[1] * f) | 0},${Math.min(255, c[2] * f) | 0})`;
const alpha = (h: string, a: number) => {
  const [r, g, b] = hex(h);
  return `rgba(${r},${g},${b},${a})`;
};
const ease = (t: number) => 1 - Math.pow(1 - t, 3);
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

function quad(ctx: CanvasRenderingContext2D, pts: [number, number][], fill: string) {
  ctx.beginPath();
  ctx.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
}

/** k: 인트로에서 바닥부터 솟아오르는 비율 */
export function drawBox(ctx: CanvasRenderingContext2D, v: View, b: Box, k = 1) {
  const z0 = b.z * k;
  const z1 = (b.z + b.h) * k;
  const x0 = b.x;
  const x1 = b.x + b.w;
  const y0 = b.y;
  const y1 = b.y + b.d;
  const A = project(v, x0, y1, z0);
  const B = project(v, x1, y1, z0);
  const C = project(v, x1, y0, z0);
  const At = project(v, x0, y1, z1);
  const Bt = project(v, x1, y1, z1);
  const Ct = project(v, x1, y0, z1);
  const Dt = project(v, x0, y0, z1);

  quad(ctx, [A, B, Bt, At], rgb(b.c, 0.82));
  quad(ctx, [B, C, Ct, Bt], rgb(b.c, 0.6));
  quad(ctx, [Dt, Ct, Bt, At], rgb(b.c, 1.22));

  if (b.shelves) {
    ctx.strokeStyle = "rgba(10,16,24,0.55)";
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    for (let z = 0.55; z < b.h - 0.2; z += 0.55) {
      const [ax, ay] = project(v, x0 + 0.12, y1, z * k);
      const [bx, by] = project(v, x1 - 0.12, y1, z * k);
      ctx.moveTo(ax, ay);
      ctx.lineTo(bx, by);
    }
    ctx.stroke();
    // 적재된 FOUP
    let i = 0;
    for (let z = 0.08; z < b.h - 0.5; z += 0.55) {
      for (let x = x0 + 0.25; x < x1 - 0.4; x += 0.42) {
        if ((i++ * 7) % 5 > 2) continue;
        quad(
          ctx,
          [project(v, x, y1, z * k), project(v, x + 0.3, y1, z * k), project(v, x + 0.3, y1, (z + 0.32) * k), project(v, x, y1, (z + 0.32) * k)],
          "rgba(201,214,230,0.28)",
        );
      }
    }
  }

  if (b.tanks) {
    const n = b.tanks;
    const step = (b.d - 0.5) / n;
    for (let i = 0; i < n; i++) {
      const ty = y0 + 0.25 + i * step;
      quad(
        ctx,
        [project(v, x0 + 0.25, ty, z1), project(v, x1 - 0.25, ty, z1), project(v, x1 - 0.25, ty + step - 0.12, z1), project(v, x0 + 0.25, ty + step - 0.12, z1)],
        i % 2 ? "rgba(62,224,255,0.16)" : "rgba(20,32,46,0.85)",
      );
    }
  }

  ctx.strokeStyle = "rgba(170,200,240,0.16)";
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(At[0], At[1]);
  ctx.lineTo(Bt[0], Bt[1]);
  ctx.lineTo(Ct[0], Ct[1]);
  ctx.moveTo(Bt[0], Bt[1]);
  ctx.lineTo(B[0], B[1]);
  ctx.stroke();
}

export function drawCyl(ctx: CanvasRenderingContext2D, v: View, c: Cyl, k = 1) {
  const [cx, yb] = project(v, c.x, c.y, c.z * k);
  const [, yt] = project(v, c.x, c.y, (c.z + c.h) * k);
  const A = c.r * v.s * COS * Math.SQRT2;
  const B = c.r * v.s * SIN * Math.SQRT2;
  const g = ctx.createLinearGradient(cx - A, 0, cx + A, 0);
  g.addColorStop(0, rgb(c.c, 0.95));
  g.addColorStop(0.55, rgb(c.c, 0.72));
  g.addColorStop(1, rgb(c.c, 0.5));
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.moveTo(cx - A, yt);
  ctx.lineTo(cx - A, yb);
  ctx.ellipse(cx, yb, A, B, 0, Math.PI, 0, true);
  ctx.lineTo(cx + A, yt);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = rgb(c.c, 1.25);
  ctx.beginPath();
  ctx.ellipse(cx, yt, A, B, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "rgba(170,200,240,0.18)";
  ctx.lineWidth = 0.6;
  ctx.stroke();
}

function drawFloor(ctx: CanvasRenderingContext2D, v: View, fab: Fab, mono: string) {
  ctx.save();
  // 월드 바닥(z=0) 평면으로 변환해 그리면 글자도 바닥에 인쇄된 것처럼 보인다
  ctx.transform(COS * v.s, SIN * v.s, -COS * v.s, SIN * v.s, v.ox, v.oy);

  ctx.fillStyle = "#070c14";
  ctx.fillRect(0, 0, 60, 36);

  ctx.lineWidth = 1 / v.s;
  ctx.strokeStyle = "rgba(120,160,210,0.05)";
  ctx.beginPath();
  for (let x = 0; x <= 60; x += 2) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 36);
  }
  for (let y = 0; y <= 36; y += 2) {
    ctx.moveTo(0, y);
    ctx.lineTo(60, y);
  }
  ctx.stroke();

  ctx.fillStyle = "rgba(62,224,255,0.03)";
  ctx.fillRect(0, 15.5, 60, 5);

  for (const b of fab.bays) {
    ctx.fillStyle = alpha(b.color, 0.035);
    ctx.fillRect(b.x, b.y, 14, 14);
    ctx.fillStyle = "rgba(140,175,220,0.035)";
    ctx.fillRect(b.x + 5.6, b.y, 2.8, 14);
    ctx.strokeStyle = alpha(b.color, 0.24);
    ctx.lineWidth = 1.2 / v.s;
    ctx.setLineDash([0.5, 0.35]);
    ctx.strokeRect(b.x, b.y, 14, 14);
    ctx.setLineDash([]);
  }

  ctx.strokeStyle = "rgba(62,224,255,0.25)";
  ctx.lineWidth = 1.5 / v.s;
  ctx.strokeRect(0, 0, 60, 36);

  ctx.scale(0.1, 0.1);
  ctx.textBaseline = "middle";
  for (const b of fab.bays) {
    const ly = b.top ? 14.45 : 35.4;
    ctx.font = `500 5.5px ${mono}`;
    ctx.fillStyle = "rgba(140,175,220,0.5)";
    ctx.fillText(b.code, (b.x + 0.4) * 10, (ly - 0.85) * 10);
    ctx.font = `700 8.5px ${mono}`;
    ctx.fillStyle = alpha(b.color, 0.8);
    ctx.fillText(b.label, (b.x + 0.4) * 10, ly * 10);
  }
  ctx.font = `600 6.5px ${mono}`;
  ctx.fillStyle = "rgba(62,224,255,0.45)";
  ctx.fillText("INTERBAY · OHT LOOP", 17.6 * 10, 18.15 * 10);
  ctx.restore();
}

function drawRail(ctx: CanvasRenderingContext2D, v: View, p: Path) {
  ctx.beginPath();
  p.pts.forEach(([x, y], i) => {
    const [sx, sy] = project(v, x, y, RAIL_Z);
    if (i === 0) ctx.moveTo(sx, sy);
    else ctx.lineTo(sx, sy);
  });
  ctx.closePath();
  ctx.strokeStyle = "rgba(62,224,255,0.07)";
  ctx.lineWidth = 5;
  ctx.stroke();
  ctx.strokeStyle = "rgba(62,224,255,0.38)";
  ctx.lineWidth = 1.1;
  ctx.stroke();
}

/** 바닥 · 설비 · 레일. time이 있으면 인트로(바닥부터 조립) 상태로 그린다 */
export function drawStatic(ctx: CanvasRenderingContext2D, v: View, fab: Fab, mono: string, time: number | null) {
  ctx.globalAlpha = time === null ? 1 : clamp01(time / 0.5);
  drawFloor(ctx, v, fab, mono);
  ctx.globalAlpha = 1;

  for (const tool of fab.tools) {
    const k = time === null ? 1 : ease(clamp01((time - tool.delay) / 0.7));
    if (k <= 0) continue;
    for (const p of tool.parts) {
      if (p.t === "box") drawBox(ctx, v, p, k);
      else drawCyl(ctx, v, p, k);
    }
  }

  const railA = time === null ? 1 : clamp01((time - 1.5) / 0.6);
  if (railA > 0) {
    ctx.globalAlpha = railA;
    for (const r of fab.rails) drawRail(ctx, v, r);
    ctx.globalAlpha = 1;
  }
}
