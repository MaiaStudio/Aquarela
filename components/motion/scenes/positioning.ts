import {
  MOTION_EASE,
  type MotionConditions,
} from "@/components/motion/motion.config";
import { gsap } from "@/components/motion/motion.client";

const CLEAR_PROPS = "opacity,transform,visibility";

export function createPositioningScene(root: HTMLElement, conditions: MotionConditions) {
  const select = gsap.utils.selector(root);
  const section = select<HTMLElement>("[data-motion='positioning-section']")[0];
  const layout = select<HTMLElement>("[data-motion='positioning-layout']")[0];
  const title = select<HTMLElement>("[data-motion='positioning-title']")[0];
  const highlight = select<HTMLElement>("[data-motion='positioning-highlight']")[0];
  const bridge = select<HTMLElement>("[data-motion='positioning-bridge']")[0];
  const copy = select<HTMLElement>("[data-motion='positioning-copy']")[0];
  const body = copy?.querySelector<HTMLElement>("p:last-child");

  if (!section || !layout || !title || !highlight || !bridge || !copy || !body) {
    return;
  }

  if (conditions.reduceMotion) return;

  const mobile = conditions.mobile;
  const timeline = gsap.timeline({
    defaults: { ease: MOTION_EASE.reveal },
    scrollTrigger: {
      id: "motion-04-positioning",
      trigger: section,
      start: mobile ? "top 78%" : "top 74%",
      once: true,
    },
    onComplete: () => {
      gsap.set([title, highlight, bridge, body], { clearProps: CLEAR_PROPS });
    },
  });

  timeline
    .from(title, { autoAlpha: 0, y: mobile ? 28 : conditions.tablet ? 38 : 42, duration: mobile ? 0.8 : 0.92 })
    .from(
      highlight,
      { autoAlpha: 0, y: mobile ? 8 : 10, duration: 0.54, ease: MOTION_EASE.ui },
      "-=0.46",
    )
    .from(
      bridge,
      { autoAlpha: 0, y: mobile ? 20 : conditions.tablet ? 23 : 26, duration: 0.68, ease: MOTION_EASE.ui },
      "-=0.32",
    )
    .from(
      body,
      { autoAlpha: 0, y: mobile ? 15 : conditions.tablet ? 18 : 20, duration: 0.62, ease: MOTION_EASE.ui },
      "-=0.32",
    );

  return () => {
    timeline.scrollTrigger?.kill();
    timeline.revert();
    gsap.set([layout, title, highlight, bridge, body], { clearProps: CLEAR_PROPS });
  };
}
