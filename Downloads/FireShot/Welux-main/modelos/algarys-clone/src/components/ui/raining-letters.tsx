"use client";

import { useEffect, useRef } from "react";

const GRID = 72;
const MAX_SNAKES = 12;
const MAX_STEPS = 20;
const TRAIL_LIFETIME = 80; // frames até sumir

interface Seg {
  x1: number; y1: number;
  x2: number; y2: number;
  age: number;
}

interface Snake {
  gx: number; gy: number;   // posição atual em coordenadas de grid
  dx: number; dy: number;   // direção (unidade)
  t: number;                // progresso no segmento atual (0..GRID px)
  speed: number;
  alpha: number;
  trail: Seg[];
  steps: number;
  alive: boolean;
}

// direção próxima: tendência de subir, pode virar nas interseções
function nextDir(dx: number, dy: number): [number, number] {
  const r = Math.random();
  if (dy === -1) {           // subindo
    if (r < 0.60) return [0, -1];
    return r < 0.80 ? [-1, 0] : [1, 0];
  }
  if (dx === -1) {           // indo esquerda
    if (r < 0.55) return [0, -1];
    return r < 0.82 ? [-1, 0] : [1, 0];
  }
  // indo direita
  if (r < 0.55) return [0, -1];
  return r < 0.82 ? [1, 0] : [-1, 0];
}

function spawn(cols: number, rows: number, randomY = false): Snake {
  return {
    gx: Math.floor(Math.random() * cols),
    gy: randomY ? Math.floor(Math.random() * rows) : rows + 1,
    dx: 0, dy: -1,
    t: 0,
    speed: 1.4 + Math.random() * 2.6,
    alpha: 0.45 + Math.random() * 0.55,
    trail: [],
    steps: 0,
    alive: true,
  };
}

export default function RainingLetters() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let snakes: Snake[] = [];
    let frame = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const cols = () => Math.floor(canvas.width / GRID) + 1;
    const rows = () => Math.floor(canvas.height / GRID) + 1;

    const drawGrid = () => {
      ctx.strokeStyle = "rgba(255,255,255,0.05)";
      ctx.lineWidth = 1;
      for (let x = 0; x <= canvas.width; x += GRID) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = 0; y <= canvas.height; y += GRID) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }
    };

    const drawTrailSeg = (s: Seg, baseAlpha: number) => {
      // decay exponencial — some mais rápido no fim
      const t = 1 - s.age / TRAIL_LIFETIME;
      const a = t * t * baseAlpha * 0.55;
      if (a < 0.004) return;
      ctx.strokeStyle = `rgba(185,215,255,${a.toFixed(3)})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(s.x1, s.y1);
      ctx.lineTo(s.x2, s.y2);
      ctx.stroke();
    };

    const drawActive = (x1: number, y1: number, x2: number, y2: number, alpha: number) => {
      const g = ctx.createLinearGradient(x1, y1, x2, y2);
      g.addColorStop(0, `rgba(185,215,255,0)`);
      g.addColorStop(0.6, `rgba(210,230,255,${(alpha * 0.5).toFixed(3)})`);
      g.addColorStop(1, `rgba(235,245,255,${alpha.toFixed(3)})`);
      ctx.strokeStyle = g;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    };

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawGrid();

      const c = cols();
      const r = rows();

      for (const sn of snakes) {
        // trail
        for (const seg of sn.trail) {
          drawTrailSeg(seg, sn.alpha);
          seg.age++;
        }
        sn.trail = sn.trail.filter(s => s.age < TRAIL_LIFETIME);

        if (!sn.alive) continue;

        const ox = sn.gx * GRID;
        const oy = sn.gy * GRID;
        const hx = ox + sn.dx * sn.t;
        const hy = oy + sn.dy * sn.t;

        drawActive(ox, oy, hx, hy, sn.alpha);

        sn.t += sn.speed;

        if (sn.t >= GRID) {
          // fecha segmento
          const ngx = sn.gx + sn.dx;
          const ngy = sn.gy + sn.dy;
          sn.trail.push({ x1: ox, y1: oy, x2: ngx * GRID, y2: ngy * GRID, age: 0 });
          sn.gx = ngx;
          sn.gy = ngy;
          sn.t = 0;
          sn.steps++;

          const [ndx, ndy] = nextDir(sn.dx, sn.dy);
          sn.dx = ndx;
          sn.dy = ndy;

          if (sn.gy < -2 || sn.gx < -1 || sn.gx > c + 1 || sn.steps > MAX_STEPS) {
            sn.alive = false;
          }
        }
      }

      snakes = snakes.filter(s => s.alive || s.trail.length > 0);

      // spawn
      const alive = snakes.filter(s => s.alive).length;
      if (alive < MAX_SNAKES) {
        if (frame % 22 === 0) snakes.push(spawn(c, r));
        if (frame % 10 === 0 && Math.random() < 0.35) snakes.push(spawn(c, r));
      }

      frame++;
      animId = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);

    // seed inicial espalhado pela tela
    const c = cols();
    const r = rows();
    for (let i = 0; i < 7; i++) snakes.push(spawn(c, r, true));

    tick();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
