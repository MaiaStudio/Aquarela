"use client";

import { useEffect, useRef } from "react";

interface VerticalBarsProps {
  className?: string;
  lineColor?: string;
  barColor?: string;
  backgroundColor?: string;
  animationSpeed?: number;
  xSpacing?: number;
  lineSpacing?: number;
  lineWidth?: number;
}

// Lightweight 2D Perlin Noise Generator for smooth ambient animation
function createNoise2D() {
  const perm = new Uint8Array(512);
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  for (let i = 255; i > 0; i--) {
    const r = Math.floor(Math.random() * (i + 1));
    const t = p[i];
    p[i] = p[r];
    p[r] = t;
  }
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];

  const grad2 = [
    [1, 1], [-1, 1], [1, -1], [-1, -1],
    [1, 0], [-1, 0], [0, 1], [0, -1],
  ];

  return function noise2D(x: number, y: number): number {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    const xf = x - Math.floor(x);
    const yf = y - Math.floor(y);

    const u = xf * xf * (3 - 2 * xf);
    const v = yf * yf * (3 - 2 * yf);

    const g00 = grad2[perm[X + perm[Y]] % 8];
    const g10 = grad2[perm[X + 1 + perm[Y]] % 8];
    const g01 = grad2[perm[X + perm[Y + 1]] % 8];
    const g11 = grad2[perm[X + 1 + perm[Y + 1]] % 8];

    const n00 = g00[0] * xf + g00[1] * yf;
    const n10 = g10[0] * (xf - 1) + g10[1] * yf;
    const n01 = g01[0] * xf + g01[1] * (yf - 1);
    const n11 = g11[0] * (xf - 1) + g11[1] * (yf - 1);

    const nx0 = n00 * (1 - u) + n10 * u;
    const nx1 = n01 * (1 - u) + n11 * u;

    return nx0 * (1 - v) + nx1 * v;
  };
}

export function VerticalBars({
  className = "",
  lineColor = "rgba(68, 68, 68, 0.22)", // Original 21st.dev dark line grid
  barColor = "#171814",                  // Original 21st.dev dark segmented bars
  backgroundColor = "#F4F1E8",           // Paper foundation
  animationSpeed = 0.0005,
  xSpacing = 9,
  lineSpacing = 11,
  lineWidth = 1.2,
}: VerticalBarsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let time = 0;

    const noise2D = createNoise2D();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      if (width === 0 || height === 0) return;

      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);

      // Clean transform reset before DPR scaling
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (reducedMotion) {
        renderFrame(0);
      }
    };

    resize();
    const resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 },
    );
    intersectionObserver.observe(container);

    const renderFrame = (currentTime: number) => {
      if (width === 0 || height === 0) return;

      // Base background fill (Paper)
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);

      const cols = Math.ceil(width / xSpacing) + 2;
      const rows = Math.ceil(height / lineSpacing) + 2;

      // 1. Draw horizontal grid lines across canvas
      ctx.lineWidth = 0.75;
      ctx.strokeStyle = lineColor;
      for (let j = 0; j < rows; j++) {
        const y = j * lineSpacing;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Draw animated dark segmented vertical bars
      ctx.lineWidth = lineWidth;

      for (let i = 0; i < cols; i++) {
        const xBase = i * xSpacing;

        for (let j = 0; j < rows; j++) {
          const yBase = j * lineSpacing;

          // Multi-octave ambient noise calculation for organic wave clusters
          const n1 = noise2D(xBase * 0.0035, yBase * 0.0035 + currentTime * 0.9);
          const n2 = noise2D(xBase * 0.007 + 50, yBase * 0.007 + currentTime * 0.45);
          const noiseVal = n1 * 0.7 + n2 * 0.3; // Range approx [-1, 1]

          // Only draw bars where noise creates wave crests
          if (noiseVal > -0.15) {
            // Subtle horizontal wave displacement
            const xOffset = noiseVal * 2.8;
            const x = xBase + xOffset;
            const y = yBase;

            // Bar height modulated by noise amplitude
            const normalized = (noiseVal + 0.15) / 1.15;
            const barHeight = Math.min(Math.max(normalized * lineSpacing * 1.5, 3), lineSpacing * 2.2);

            // Dark high-contrast opacity for strong graphic texture
            const alpha = Math.min(Math.max(0.35 + normalized * 0.65, 0.25), 0.95);

            ctx.strokeStyle = `rgba(23, 24, 20, ${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(x, y - barHeight * 0.5);
            ctx.lineTo(x, y + barHeight * 0.5);
            ctx.stroke();
          }
        }
      }
    };

    let lastTimestamp = performance.now();

    const loop = (now: number) => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(loop);
        return;
      }

      const delta = now - lastTimestamp;
      lastTimestamp = now;

      time += delta * animationSpeed;
      renderFrame(time);

      if (!reducedMotion) {
        animationFrameId = requestAnimationFrame(loop);
      }
    };

    if (reducedMotion) {
      renderFrame(0);
    } else {
      animationFrameId = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [lineColor, barColor, backgroundColor, animationSpeed, xSpacing, lineSpacing, lineWidth]);

  return (
    <div
      ref={containerRef}
      className={`vertical-bars-container ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="vertical-bars-canvas" />
      {/* Soft Readability Veil over the central reading zone */}
      <div className="vertical-bars-veil" />
    </div>
  );
}
