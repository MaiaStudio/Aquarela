"use client";

import { useRef } from "react";
import { Container } from "@/components/layout/Container";
import { HeroAFrame } from "@/components/hero/HeroAFrame";
import { HeroTextLoop } from "@/components/hero/HeroTextLoop";
import { HeroParticleMask } from "@/components/hero/HeroParticleMask";
import { VerticalBars } from "@/components/ui/VerticalBars";
import Sparkles from "@/components/originkit/ui/stardust";

export function HeroSection() {
  const stageRef = useRef<HTMLDivElement>(null);

  return (
    <section className="hero" id="top" aria-labelledby="hero-title" ref={stageRef}>
      {/* SVG Gooey Particle Mask Definition */}
      <HeroParticleMask stageRef={stageRef} />

      <div className="hero-stage" data-motion="hero-stage">
        {/* HERO A — DEFAULT (Base Layer: Clean Paper Background + Centered Headline) */}
        <div className="hero-layer hero-layer--default">
          {/* Vertical Bars Ambient Background for Hero A */}
          <VerticalBars className="hero-a-vertical-bars" />

          {/* Large Centered Sogea 'A' (Neutral Low-Contrast Baseline) */}
          <HeroAFrame mode="default" />

          {/* Hero A Content (Centered Headline) */}
          <Container className="hero-layer-inner hero-a-inner">
            <h1 id="hero-title" className="hero-title hero-title--centered">
              <span className="hero-line-mask">
                <span className="hero-line" data-motion="hero-line">
                  What does your brand
                </span>
              </span>
              <span className="hero-line-mask">
                <span className="hero-line" data-motion="hero-line">
                  communicate<span className="hero-dot" data-motion="hero-dot">?</span>
                </span>
              </span>
            </h1>
          </Container>
        </div>

        {/* HERO B — REVEALED (Underlying Layer masked by the SVG Gooey Particle Portal) */}
        <div className="hero-layer hero-layer--revealed" data-cursor-theme="dark">
          {/* Large Centered Sogea 'A' (Exact Same Coordinates & Scale) */}
          <HeroAFrame mode="revealed" />

          {/* Text Loop Wave Ribbon */}
          <div className="hero-b-text-loop-layer">
            <HeroTextLoop />
          </div>
        </div>

        {/* HERO → AUTHORITY PORTAL LAYER (Clipped preview of Authority initial state) */}
        <div
          className="hero-authority-portal"
          data-motion="hero-authority-portal"
          aria-hidden="true"
        >
          <div className="hero-portal-black-bg" />
          <div className="hero-portal-stardust">
            <Sparkles
              background="#000000"
              particleColor="#FFFFFF"
              particleDensity={3.2}
              speed={6}
              particleSpeed={0.8}
              movement={4}
              minSize={1.0}
              maxSize={1.8}
            />
            <div className="authority-stardust-veil" />
          </div>
          <div className="hero-portal-phrase-stage">
            <div
              className="authority-phrase authority-phrase--0 hero-portal-phrase"
              data-motion="hero-portal-phrase"
            >
              More than a website.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
