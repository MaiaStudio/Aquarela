"use client";

import { useRef } from "react";

import { MOTION_EASE } from "@/components/motion/motion.config";
import { gsap, useGSAP } from "@/components/motion/motion.client";

const INTERACTIVE_SELECTOR = "a, button, label, [role='button'], [data-cursor-interactive]";
const TEXT_INPUT_SELECTOR = "input, textarea, select, [contenteditable='true']";

function getElement(target: EventTarget | null) {
  return target instanceof Element ? target : null;
}

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cursor = cursorRef.current;
      const dot = cursor?.querySelector<HTMLElement>("[data-cursor='dot-position']");
      const follower = cursor?.querySelector<HTMLElement>("[data-cursor='follower-position']");
      const supportsCursor = window.matchMedia("(hover: hover) and (pointer: fine)").matches
        && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!cursor || !dot || !follower || !supportsCursor) return;

      const html = document.documentElement;
      const dotX = gsap.quickTo(dot, "x", { duration: 0.07, ease: MOTION_EASE.ui });
      const dotY = gsap.quickTo(dot, "y", { duration: 0.07, ease: MOTION_EASE.ui });
      const followerX = gsap.quickTo(follower, "x", { duration: 0.24, ease: MOTION_EASE.ui });
      const followerY = gsap.quickTo(follower, "y", { duration: 0.24, ease: MOTION_EASE.ui });
      let hasPosition = false;

      gsap.set([dot, follower], { xPercent: -50, yPercent: -50 });

      const setContext = (target: EventTarget | null) => {
        const element = getElement(target);
        const isTextInput = Boolean(element?.closest(TEXT_INPUT_SELECTOR));
        const interactive = !isTextInput && Boolean(element?.closest(INTERACTIVE_SELECTOR));
        const theme = element?.closest<HTMLElement>("[data-cursor-theme]")?.dataset.cursorTheme;

        cursor.classList.toggle("is-text-input", isTextInput);
        cursor.classList.toggle("is-interactive", interactive);
        cursor.classList.toggle("is-dark", theme === "dark");
        cursor.classList.toggle("is-adaptive", theme === "adaptive");
      };

      const revealAt = (event: PointerEvent) => {
        if (!hasPosition) {
          hasPosition = true;
          gsap.set([dot, follower], { x: event.clientX, y: event.clientY });
          html.classList.add("custom-cursor-ready");
          gsap.to(cursor, { autoAlpha: 1, duration: 0.16, ease: MOTION_EASE.ui, overwrite: true });
          return;
        }

        dotX(event.clientX);
        dotY(event.clientY);
        followerX(event.clientX);
        followerY(event.clientY);
      };

      const hideCursor = () => {
        hasPosition = false;
        gsap.to(cursor, { autoAlpha: 0, duration: 0.15, ease: MOTION_EASE.ui, overwrite: true });
      };

      const handlePointerMove = (event: PointerEvent) => revealAt(event);
      const handlePointerOver = (event: PointerEvent) => setContext(event.target);
      const handlePointerOut = (event: PointerEvent) => {
        if (!event.relatedTarget) {
          hideCursor();
          return;
        }

        setContext(event.relatedTarget);
      };

      document.addEventListener("pointermove", handlePointerMove, { passive: true });
      document.addEventListener("pointerover", handlePointerOver);
      document.addEventListener("pointerout", handlePointerOut);
      window.addEventListener("blur", hideCursor);

      return () => {
        document.removeEventListener("pointermove", handlePointerMove);
        document.removeEventListener("pointerover", handlePointerOver);
        document.removeEventListener("pointerout", handlePointerOut);
        window.removeEventListener("blur", hideCursor);
        dotX.tween.kill();
        dotY.tween.kill();
        followerX.tween.kill();
        followerY.tween.kill();
        html.classList.remove("custom-cursor-ready");
        gsap.set(cursor, { clearProps: "opacity,visibility" });
      };
    },
    { scope: cursorRef },
  );

  return (
    <div className="custom-cursor" ref={cursorRef} aria-hidden="true">
      <span className="cursor-follower-position" data-cursor="follower-position">
        <span className="cursor-follower-visual" />
      </span>
      <span className="cursor-dot-position" data-cursor="dot-position">
        <span className="cursor-dot-visual" />
      </span>
    </div>
  );
}
