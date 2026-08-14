import {
  MOTION_EASE,
  type MotionConditions,
} from "@/components/motion/motion.config";
import { gsap } from "@/components/motion/motion.client";

const CLEAR_PROPS = "clipPath,left,opacity,color,transform,visibility";

export function createRedesignScene(root: HTMLElement, conditions: MotionConditions) {
  const select = gsap.utils.selector(root);
  const section = select<HTMLElement>("[data-motion='redesign-section']")[0];
  const heading = select<HTMLElement>("[data-motion='redesign-heading']")[0];
  const headingLines = select<HTMLElement>("[data-motion='redesign-heading-line']");
  const stage = select<HTMLElement>("[data-motion='redesign-stage']")[0];
  const runway = select<HTMLElement>("[data-motion='redesign-runway']")[0];
  const afterReveal = select<HTMLElement>("[data-motion='redesign-after-reveal']")[0];
  const divider = select<HTMLElement>("[data-motion='redesign-divider']")[0];
  const beforeLabel = select<HTMLElement>("[data-motion='redesign-before-label']")[0];
  const afterLabel = select<HTMLElement>("[data-motion='redesign-after-label']")[0];

  if (
    !section ||
    !heading ||
    headingLines.length !== 2 ||
    !stage ||
    !runway ||
    !afterReveal ||
    !divider ||
    !beforeLabel ||
    !afterLabel
  ) {
    return;
  }

  if (conditions.reduceMotion) return;

  const headingReveal = gsap.from(headingLines, {
    yPercent: 105,
    autoAlpha: 0.85,
    duration: 0.9,
    ease: MOTION_EASE.reveal,
    stagger: 0.1,
    scrollTrigger: {
      id: "motion-03-redesign-heading",
      trigger: heading,
      start: "top 82%",
      once: true,
    },
  });

  gsap.set(afterReveal, { clipPath: "inset(0 100% 0 0)" });
  gsap.set(divider, { left: "0%", autoAlpha: 1 });
  gsap.set(beforeLabel, { autoAlpha: 1, color: "var(--color-paper)" });
  gsap.set(afterLabel, { autoAlpha: 0.48, color: "var(--color-paper)" });

  section.classList.add(conditions.mobile ? "redesign--mobile-motion" : "redesign--motion");

  const isTablet = conditions.tablet;
  const timeline = gsap.timeline({
    defaults: { ease: MOTION_EASE.scroll },
    scrollTrigger: conditions.mobile
      ? {
          id: "motion-03-redesign-mobile",
          trigger: runway,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
        }
      : {
          id: "motion-03-redesign",
          trigger: stage,
          start: "top top",
          end: () => `+=${window.innerHeight * (isTablet ? 2.05 : 2.5)}`,
          pin: stage,
          scrub: isTablet ? 0.55 : 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
  });

  timeline
    .addLabel("beforeHold", 0)
    .to(afterReveal, { clipPath: "inset(0 100% 0 0)", duration: 15 }, "beforeHold")
    .to(divider, { left: "0%", duration: 15 }, "beforeHold")
    .to(afterLabel, { autoAlpha: 0.48, color: "var(--color-paper)", duration: 15 }, "beforeHold")
    .addLabel("wipe", 15)
    .to(afterReveal, { clipPath: "inset(0 18% 0 0)", duration: 40 }, "wipe")
    .to(divider, { left: "82%", duration: 40 }, "wipe")
    .to(beforeLabel, { autoAlpha: 0.48, color: "var(--color-paper)", duration: 40 }, "wipe")
    .to(afterLabel, { autoAlpha: 1, color: "var(--color-yellow)", duration: 40 }, "wipe")
    .addLabel("comparisonHold", 55)
    .to(afterReveal, { clipPath: "inset(0 18% 0 0)", duration: 13 }, "comparisonHold")
    .to(divider, { left: "82%", duration: 13 }, "comparisonHold")
    .addLabel("afterFinish", 68)
    .to(afterReveal, { clipPath: "inset(0 0% 0 0)", duration: 14 }, "afterFinish")
    .to(divider, { left: "100%", duration: 14 }, "afterFinish")
    .addLabel("afterHold", 82)
    .to(afterReveal, { clipPath: "inset(0 0% 0 0)", duration: 18 }, "afterHold")
    .to(divider, { autoAlpha: 0, duration: 4 }, "afterHold+=10");

  return () => {
    headingReveal.scrollTrigger?.kill();
    headingReveal.revert();
    timeline.scrollTrigger?.kill();
    timeline.revert();
    gsap.set([heading, afterReveal, divider, beforeLabel, afterLabel], {
      clearProps: CLEAR_PROPS,
    });
    section.classList.remove("redesign--motion", "redesign--mobile-motion");
  };
}
