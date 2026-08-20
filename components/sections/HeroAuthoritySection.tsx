"use client";

import { useRef } from "react";
import { Container } from "@/components/layout/Container";
import { HeroAFrame } from "@/components/hero/HeroAFrame";
import { HeroTextLoop } from "@/components/hero/HeroTextLoop";
import { HeroParticleMask } from "@/components/hero/HeroParticleMask";
import { VerticalBars } from "@/components/ui/VerticalBars";
import BubbleBurst from "@/components/originkit/ui/bubble-burst";
import Sparkles from "@/components/originkit/ui/stardust";

export function HeroAuthoritySection() {
  const stageRef = useRef<HTMLDivElement>(null);

  return (
    <section
      className="hero-authority-experience"
      id="top"
      aria-label="Hero and Authority"
      data-motion="hero-authority-experience"
    >
      <div className="hero-authority-runway" data-motion="hero-authority-runway">
        <div
          className="hero-authority-stage"
          data-motion="hero-authority-stage"
          ref={stageRef}
        >
          {/* =========================================================================
              LAYER 1 (BEHIND): REAL AUTHORITY STAGE
              Physically mounted behind Hero. Zero match cuts, zero section movement.
              ========================================================================= */}
          <div
            className="authority-real-stage"
            id="authority"
            data-motion="authority-real-stage"
            aria-label="Authority"
            data-cursor-theme="dark"
          >
            {/* Pure Black Foundation */}
            <div className="authority-black-bg" aria-hidden="true" />

            {/* Stardust Background Atmosphere with contrast veil */}
            <div
              className="authority-stardust"
              data-motion="authority-stardust"
              aria-hidden="true"
            >
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

            {/* Reserved Future Cards Layer */}
            <div className="authority-future-card-layer" aria-hidden="true" />

            {/* 3D Cylindrical Typography Orbit (Middle Layer) */}
            <div className="authority-3d-scene" data-motion="authority-3d-scene">
              <div
                className="authority-phrase authority-phrase--0"
                data-motion="authority-phrase"
                data-index="0"
              >
                More than a website.
              </div>
              <div
                className="authority-phrase authority-phrase--1"
                data-motion="authority-phrase"
                data-index="1"
              >
                It can tell a story.
              </div>
              <div
                className="authority-phrase authority-phrase--2"
                data-motion="authority-phrase"
                data-index="2"
              >
                React.
              </div>
              <div
                className="authority-phrase authority-phrase--3"
                data-motion="authority-phrase"
                data-index="3"
              >
                Surprise.
              </div>
              <div
                className="authority-phrase authority-phrase--4"
                data-motion="authority-phrase"
                data-index="4"
              >
                Be remembered.
              </div>
            </div>

            {/* Bubble Burst Foreground Anchor */}
            <div className="authority-bubble-foreground" data-motion="authority-bubble">
              <BubbleBurst />
            </div>

            {/* Paper Conclusion Epilogue Layer */}
            <div
              className="authority-paper-layer"
              data-motion="authority-paper"
              aria-hidden="true"
            />

            {/* Original Approved Conclusion */}
            <div
              className="authority-conclusion-stage"
              data-motion="authority-conclusion"
            >
              <p className="authority-conclusion">
                <span className="authority-conclusion-mask">
                  <span data-motion="authority-conclusion-line">Design changes</span>
                </span>
                <span className="authority-conclusion-mask">
                  <span data-motion="authority-conclusion-line">perception.</span>
                </span>
              </p>
            </div>
          </div>

          {/* =========================================================================
              LAYER 2 (FOREGROUND): HERO STAGE
              Composed of Hero A + Hero B, masked by the circular aperture from 'A' counter.
              ========================================================================= */}
          <div
            className="hero-foreground-stage"
            data-motion="hero-foreground-stage"
          >
            {/* SVG Gooey Particle Mask for Hero A / Hero B interaction */}
            <HeroParticleMask stageRef={stageRef} />

            {/* HERO A — DEFAULT */}
            <div className="hero-layer hero-layer--default">
              <VerticalBars className="hero-a-vertical-bars" />
              <HeroAFrame mode="default" />
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

            {/* HERO B — REVEALED */}
            <div className="hero-layer hero-layer--revealed" data-cursor-theme="dark">
              <HeroAFrame mode="revealed" />
              <div className="hero-b-text-loop-layer">
                <HeroTextLoop />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
