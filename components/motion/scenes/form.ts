import {
  MOTION_EASE,
  type MotionConditions,
} from "@/components/motion/motion.config";
import { gsap } from "@/components/motion/motion.client";

const CLEAR_PROPS = "opacity,transform,visibility";

export function createFormScene(root: HTMLElement, conditions: MotionConditions) {
  const select = gsap.utils.selector(root);
  const section = select<HTMLElement>("[data-motion='form-section']")[0];
  const heading = select<HTMLElement>("[data-motion='form-heading']")[0];
  const title = select<HTMLElement>("[data-motion='form-heading-title']")[0];
  const copy = select<HTMLElement>("[data-motion='form-heading-copy']")[0];
  const shell = select<HTMLElement>("[data-motion='form-shell']")[0];
  const aside = select<HTMLElement>("[data-motion='form-aside']")[0];
  const surface = shell?.querySelector<HTMLElement>(".project-form");

  if (!section || !heading || !title || !copy || !shell || !aside || !surface) {
    return;
  }

  if (conditions.reduceMotion) return;

  const mobile = conditions.mobile;
  const titleY = mobile ? 26 : conditions.tablet ? 31 : 38;
  const timeline = gsap.timeline({
    defaults: { ease: MOTION_EASE.reveal },
    scrollTrigger: {
      id: "motion-05-form",
      trigger: section,
      start: mobile ? "top 82%" : conditions.tablet ? "top 79%" : "top 76%",
      once: true,
    },
    onComplete: () => {
      gsap.set([heading, title, copy, shell, aside, surface], { clearProps: CLEAR_PROPS });
    },
  });

  timeline
    .from(title, { autoAlpha: 0, y: titleY, duration: mobile ? 0.86 : 0.92 })
    .from(
      copy,
      { autoAlpha: 0, y: mobile ? 18 : 21, duration: mobile ? 0.62 : 0.66, ease: MOTION_EASE.ui },
      "-=0.5",
    )
    .from(shell, { autoAlpha: 0, duration: 0.46, ease: MOTION_EASE.ui }, "-=0.28")
    .from(
      aside,
      { autoAlpha: 0, y: mobile ? 18 : 22, duration: mobile ? 0.56 : 0.66, ease: MOTION_EASE.ui },
      "-=0.4",
    )
    .from(
      surface,
      { autoAlpha: 0, y: mobile ? 15 : 18, duration: mobile ? 0.58 : 0.68, ease: MOTION_EASE.ui },
      "-=0.56",
    );

  return () => {
    timeline.scrollTrigger?.kill();
    timeline.revert();
    gsap.set([heading, title, copy, shell, aside, surface], { clearProps: CLEAR_PROPS });
  };
}
