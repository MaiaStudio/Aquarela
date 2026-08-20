"use client";

import { useEffect, useRef, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  initialRadius: number;
  currentRadius: number;
  createdAt: number;
}

interface HeroParticleMaskProps {
  stageRef: React.RefObject<HTMLDivElement | null>;
}

// Centralized Tuning Configuration
const PARTICLE_CONFIG = {
  sizeMultiplier: 0.42,
  minSize: 10,
  maxSize: 72,
  growthMultiplier: 2.5,
  spacing: 12, // pixels between interpolated particles
  movementThreshold: 0.75, // minimum velocity to emit
  sizeVariationMin: 0.88,
  sizeVariationMax: 1.12,
  microOffsetMax: 3.0, // micro position variation in px
  growDuration: 2.3, // seconds to grow to peak 2.5x size
  shrinkStart: 4.2, // seconds when shrink phase begins
  shrinkDuration: 4.5, // seconds to complete shrink to 0 (total life ~8.7s)
  maxActive: 320, // max simultaneous particles (drops oldest first)
  gooeyBlur: 28, // stdDeviation for organic circle merging
};

export function HeroParticleMask({ stageRef }: HeroParticleMaskProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mobilePulse, setMobilePulse] = useState<{ x: number; y: number; r: number } | null>(null);

  const particlesRef = useRef<Particle[]>([]);
  const idCounter = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  const mouseRef = useRef({
    x: 0,
    y: 0,
    smoothX: 0,
    smoothY: 0,
    diff: 0,
    isHovering: false,
    hasMoved: false,
  });

  const lastSpawnPos = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    let isVisible = true;
    const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    // Visibility Observer to pause offscreen
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 },
    );
    intersectionObserver.observe(stage);

    if (!hasFinePointer) {
      // Mobile / Coarse pointer: Gentle ambient fluid aperture
      let t = 0;
      const animateMobile = () => {
        if (!isVisible) {
          animationFrameRef.current = requestAnimationFrame(animateMobile);
          return;
        }
        t += 0.016;
        const rect = stage.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          const x = rect.width * (0.5 + 0.22 * Math.sin(t * 0.7));
          const y = rect.height * (0.5 + 0.16 * Math.cos(t * 0.9));
          const r = 130 + 30 * Math.sin(t * 1.3);
          setMobilePulse({ x, y, r });
        }
        animationFrameRef.current = requestAnimationFrame(animateMobile);
      };
      animationFrameRef.current = requestAnimationFrame(animateMobile);
      return () => {
        intersectionObserver.disconnect();
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      };
    }

    const onPointerEnter = (e: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseRef.current.x = x;
      mouseRef.current.y = y;
      mouseRef.current.smoothX = x;
      mouseRef.current.smoothY = y;
      mouseRef.current.isHovering = true;
      lastSpawnPos.current = { x, y };
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x >= 0 && y >= 0 && x <= rect.width && y <= rect.height) {
        mouseRef.current.x = x;
        mouseRef.current.y = y;
        mouseRef.current.isHovering = true;
        mouseRef.current.hasMoved = true;
      }
    };

    const onPointerLeave = () => {
      mouseRef.current.isHovering = false;
      lastSpawnPos.current = null;
    };

    stage.addEventListener("pointerenter", onPointerEnter, { passive: true });
    stage.addEventListener("pointermove", onPointerMove, { passive: true });
    stage.addEventListener("pointerleave", onPointerLeave, { passive: true });

    const emitSingleParticle = (x: number, y: number, baseRadius: number, now: number) => {
      idCounter.current += 1;
      const variation = PARTICLE_CONFIG.sizeVariationMin + Math.random() * (PARTICLE_CONFIG.sizeVariationMax - PARTICLE_CONFIG.sizeVariationMin);
      const initialRadius = baseRadius * variation;

      const newParticle: Particle = {
        id: idCounter.current,
        x,
        y,
        initialRadius,
        currentRadius: initialRadius,
        createdAt: now,
      };

      const current = particlesRef.current;
      current.push(newParticle);

      // Max active particles cap: remove oldest from the beginning
      while (current.length > PARTICLE_CONFIG.maxActive) {
        current.shift();
      }
    };

    // Main 60fps physics, path sampling & lifecycle loop
    const updateLoop = () => {
      if (!isVisible) {
        animationFrameRef.current = requestAnimationFrame(updateLoop);
        return;
      }

      const now = performance.now() * 0.001; // seconds
      const m = mouseRef.current;

      if (m.isHovering && m.hasMoved) {
        // Mouse smoothing algorithm: smooth += (target - smooth) * 0.1
        m.smoothX += (m.x - m.smoothX) * 0.1;
        m.smoothY += (m.y - m.smoothY) * 0.1;

        // Compute diff from velocity
        m.diff = Math.hypot(m.x - m.smoothX, m.y - m.smoothY);

        // Only emit if movement threshold is met
        if (m.diff >= PARTICLE_CONFIG.movementThreshold) {
          // Velocity-driven particle sizing with controlled minimum
          const calculatedSize = Math.min(
            Math.max(m.diff * PARTICLE_CONFIG.sizeMultiplier, PARTICLE_CONFIG.minSize),
            PARTICLE_CONFIG.maxSize,
          );

          if (!lastSpawnPos.current) {
            emitSingleParticle(m.smoothX, m.smoothY, calculatedSize, now);
            lastSpawnPos.current = { x: m.smoothX, y: m.smoothY };
          } else {
            // Path distance interpolation to ensure continuous trail density
            const dist = Math.hypot(m.smoothX - lastSpawnPos.current.x, m.smoothY - lastSpawnPos.current.y);

            if (dist >= PARTICLE_CONFIG.spacing) {
              const steps = Math.max(1, Math.ceil(dist / PARTICLE_CONFIG.spacing));

              for (let i = 1; i <= steps; i++) {
                const progress = i / steps;
                let px = lastSpawnPos.current.x + (m.smoothX - lastSpawnPos.current.x) * progress;
                let py = lastSpawnPos.current.y + (m.smoothY - lastSpawnPos.current.y) * progress;

                // Subtle micro-position variation for organic edge texture
                px += (Math.random() - 0.5) * PARTICLE_CONFIG.microOffsetMax;
                py += (Math.random() - 0.5) * PARTICLE_CONFIG.microOffsetMax;

                emitSingleParticle(px, py, calculatedSize, now);
              }

              lastSpawnPos.current = { x: m.smoothX, y: m.smoothY };
            }
          }
        }
      }

      // Update existing particles lifecycle
      const active = particlesRef.current;
      if (active.length > 0) {
        const next: Particle[] = [];
        for (let i = 0; i < active.length; i++) {
          const p = active[i];
          const elapsed = now - p.createdAt;

          if (elapsed <= PARTICLE_CONFIG.growDuration) {
            // Phase 1: Grows from 1x to 2.5x size over 2.3s
            const progress = elapsed / PARTICLE_CONFIG.growDuration;
            p.currentRadius = p.initialRadius * (1.0 + (PARTICLE_CONFIG.growthMultiplier - 1.0) * progress);
            next.push(p);
          } else if (elapsed <= PARTICLE_CONFIG.shrinkStart) {
            // Phase 2: Holds peak 2.5x size until 4.2s
            p.currentRadius = p.initialRadius * PARTICLE_CONFIG.growthMultiplier;
            next.push(p);
          } else if (elapsed <= (PARTICLE_CONFIG.shrinkStart + PARTICLE_CONFIG.shrinkDuration)) {
            // Phase 3: Shrinks smoothly to 0 between 4.2s and 8.7s
            const shrinkProgress = (elapsed - PARTICLE_CONFIG.shrinkStart) / PARTICLE_CONFIG.shrinkDuration;
            const factor = Math.max(0, 1.0 - shrinkProgress);
            // Power curve for natural organic shrinkage
            p.currentRadius = p.initialRadius * PARTICLE_CONFIG.growthMultiplier * Math.pow(factor, 1.6);
            if (p.currentRadius > 0.5) {
              next.push(p);
            }
          }
          // Phase 4: elapsed > 8.7s -> particle naturally removed
        }
        particlesRef.current = next;
        setParticles(next);
      } else if (particles.length > 0) {
        setParticles([]);
      }

      animationFrameRef.current = requestAnimationFrame(updateLoop);
    };

    animationFrameRef.current = requestAnimationFrame(updateLoop);

    return () => {
      intersectionObserver.disconnect();
      stage.removeEventListener("pointerenter", onPointerEnter);
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerleave", onPointerLeave);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [stageRef, particles.length]);

  return (
    <svg className="hero-particle-mask-svg" width="100%" height="100%" aria-hidden="true">
      <defs>
        {/* Gooey filter merging blurred circles into organic liquid shapes */}
        <filter id="hero-gooey-filter" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
          <feGaussianBlur in="SourceGraphic" stdDeviation={PARTICLE_CONFIG.gooeyBlur} result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 32 -13"
            result="goo"
          />
        </filter>

        <mask id="hero-gooey-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%">
          {/* Black base hides Hero B */}
          <rect x="0" y="0" width="100%" height="100%" fill="#000000" />

          {/* White circles processed through gooey filter reveal Hero B */}
          <g filter="url(#hero-gooey-filter)">
            {mobilePulse && (
              <circle cx={mobilePulse.x} cy={mobilePulse.y} r={mobilePulse.r} fill="#ffffff" />
            )}
            {particles.map((p) => (
              <circle
                key={p.id}
                cx={p.x}
                cy={p.y}
                r={p.currentRadius}
                fill="#ffffff"
              />
            ))}
          </g>
        </mask>
      </defs>
    </svg>
  );
}
