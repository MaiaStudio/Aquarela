"use client";

import Lenis from "lenis";
import type { ReactNode } from "react";
import { useRef } from "react";

import {
  MOTION_QUERIES,
  type MotionConditions,
} from "@/components/motion/motion.config";
import { CustomCursor } from "@/components/motion/CustomCursor";
import { gsap, ScrollTrigger, useGSAP } from "@/components/motion/motion.client";
import { createClosingScene } from "@/components/motion/scenes/closing";
import { createFormScene } from "@/components/motion/scenes/form";
import { createHeroAuthoritySequenceScene } from "@/components/motion/scenes/heroAuthoritySequence";
import { createHeroScene } from "@/components/motion/scenes/hero";
import { createPositioningScene } from "@/components/motion/scenes/positioning";
import { createProcessScene } from "@/components/motion/scenes/process";
import { createRedesignScene } from "@/components/motion/scenes/redesign";

type MotionRootProps = {
  children: ReactNode;
};

export function MotionRoot({ children }: MotionRootProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;

      if (!root) return;

      const lenis = new Lenis({
        anchors: true,
        autoRaf: false,
        respectReducedMotion: true,
        smoothWheel: true,
        stopInertiaOnNavigate: true,
        syncTouch: false,
      });

      const onLenisScroll = () => ScrollTrigger.update();
      const updateLenis = (time: number) => lenis.raf(time * 1000);

      lenis.on("scroll", onLenisScroll);
      gsap.ticker.add(updateLenis);
      gsap.ticker.lagSmoothing(0);

      const media = gsap.matchMedia();

      media.add(MOTION_QUERIES, (context) => {
        const conditions = context.conditions as MotionConditions;
        const disposeHero = createHeroScene(root, conditions);
        const disposeHeroAuthority = createHeroAuthoritySequenceScene(root, conditions);
        const disposeRedesign = createRedesignScene(root, conditions);
        const disposePositioning = createPositioningScene(root, conditions);
        const disposeProcess = createProcessScene(root, conditions);
        const disposeForm = createFormScene(root, conditions);
        const disposeClosing = createClosingScene(root, conditions);

        return () => {
          disposeClosing?.();
          disposeForm?.();
          disposeProcess?.();
          disposePositioning?.();
          disposeRedesign?.();
          disposeHeroAuthority?.();
          disposeHero?.();
        };
      });

      let isDisposed = false;

      void document.fonts.ready.then(() => {
        if (!isDisposed) ScrollTrigger.refresh();
      });

      return () => {
        isDisposed = true;
        media.revert();
        gsap.ticker.remove(updateLenis);
        lenis.off("scroll", onLenisScroll);
        lenis.destroy();
      };
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className="motion-root">
      {children}
      <CustomCursor />
    </div>
  );
}
