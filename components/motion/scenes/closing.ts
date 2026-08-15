import {
  MOTION_EASE,
  type MotionConditions,
} from "@/components/motion/motion.config";
import { gsap } from "@/components/motion/motion.client";

const CLEAR_PROPS = "opacity,transform,visibility";

export function createClosingScene(root: HTMLElement, conditions: MotionConditions) {
  const select = gsap.utils.selector(root);
  const section = select<HTMLElement>("[data-motion='closing-section']")[0];
  const intro = select<HTMLElement>("[data-motion='closing-intro']")[0];
  const lines = select<HTMLElement>("[data-motion='closing-line']");
  const dot = select<HTMLElement>("[data-motion='closing-dot']")[0];
  const cta = select<HTMLElement>("[data-motion='closing-cta']")[0];

  if (!section || !intro || lines.length !== 2 || !dot || !cta) {
    return;
  }

  if (conditions.reduceMotion) return;

  const mobile = conditions.mobile;
  const tablet = conditions.tablet;
  const motionTargets = [intro, ...lines, dot, cta];
  const timeline = gsap.timeline({
    scrollTrigger: {
      id: "motion-06-closing",
      trigger: section,
      start: mobile ? "top 82%" : tablet ? "top 76%" : "top 72%",
      once: true,
    },
    onComplete: () => {
      gsap.set(motionTargets, { clearProps: CLEAR_PROPS });
    },
  });

  timeline
    .from(
      intro,
      {
        autoAlpha: 0,
        y: mobile ? 14 : tablet ? 18 : 22,
        duration: mobile ? 0.58 : tablet ? 0.64 : 0.68,
        ease: MOTION_EASE.ui,
      },
      0,
    )
    .from(
      lines[0],
      {
        autoAlpha: 0.9,
        yPercent: 108,
        duration: mobile ? 0.82 : tablet ? 0.94 : 1,
        ease: MOTION_EASE.reveal,
      },
      mobile ? 0.16 : 0.18,
    )
    .from(
      lines[1],
      {
        autoAlpha: 0.9,
        yPercent: 108,
        duration: mobile ? 0.82 : tablet ? 0.94 : 0.98,
        ease: MOTION_EASE.reveal,
      },
      mobile ? 0.29 : 0.31,
    )
    .from(
      dot,
      {
        autoAlpha: 0,
        scale: 0.82,
        transformOrigin: "center",
        duration: mobile ? 0.34 : 0.38,
        ease: MOTION_EASE.ui,
      },
      mobile ? 0.84 : 0.96,
    )
    .from(
      cta,
      {
        autoAlpha: 0,
        y: mobile ? 14 : tablet ? 16 : 18,
        duration: mobile ? 0.58 : tablet ? 0.62 : 0.64,
        ease: MOTION_EASE.ui,
      },
      mobile ? 0.93 : 1.04,
    );

  return () => {
    timeline.scrollTrigger?.kill();
    timeline.revert();
    gsap.set(motionTargets, { clearProps: CLEAR_PROPS });
  };
}
