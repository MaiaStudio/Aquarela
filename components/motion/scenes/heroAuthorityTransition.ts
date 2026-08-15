import {
  MOTION_EASE,
  type MotionConditions,
} from "@/components/motion/motion.config";
import { gsap } from "@/components/motion/motion.client";

const CLEAR_PROPS = "transform,visibility";

export function createHeroAuthorityTransitionScene(root: HTMLElement, conditions: MotionConditions) {
  const select = gsap.utils.selector(root);
  const section = select<HTMLElement>("[data-motion='authority-section']")[0];
  const transition = select<HTMLElement>("[data-motion='hero-authority-transition']")[0];
  const panels = select<HTMLElement>("[data-motion='hero-authority-panel']");

  if (!section || !transition || panels.length !== 5 || conditions.reduceMotion) {
    return;
  }

  section.classList.add("authority--reveal-transition");
  gsap.set(panels, { yPercent: 0 });

  const timeline = gsap.timeline({
    defaults: { ease: MOTION_EASE.scroll },
    scrollTrigger: {
      id: "motion-07b-hero-authority-reveal",
      trigger: section,
      start: "top 95%",
      end: "top 8%",
      scrub: 0.45,
      invalidateOnRefresh: true,
    },
  });

  timeline.to(panels, {
    yPercent: -104,
    duration: 0.76,
    stagger: conditions.mobile ? 0.042 : 0.055,
  });

  return () => {
    timeline.scrollTrigger?.kill();
    timeline.revert();
    gsap.set(panels, { clearProps: CLEAR_PROPS });
    section.classList.remove("authority--reveal-transition");
  };
}
