"use client";

import Lenis from "lenis";
import type { ReactNode } from "react";
import { useRef } from "react";

import {
  MOTION_QUERIES,
  type MotionConditions,
} from "@/components/motion/motion.config";
import { gsap, ScrollTrigger, useGSAP } from "@/components/motion/motion.client";
import { createAuthorityScene } from "@/components/motion/scenes/authority";
import { createHeroScene } from "@/components/motion/scenes/hero";

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
        const disposeAuthority = createAuthorityScene(root, conditions);

        return () => {
          disposeAuthority?.();
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
    </div>
  );
}
