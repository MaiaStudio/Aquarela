import {
  MOTION_EASE,
  type MotionConditions,
} from "@/components/motion/motion.config";
import { gsap } from "@/components/motion/motion.client";

const CLEAR_PROPS = "opacity,transform,visibility";

export function createProcessScene(root: HTMLElement, conditions: MotionConditions) {
  const select = gsap.utils.selector(root);
  const section = select<HTMLElement>("[data-motion='process-section']")[0];
  const heading = select<HTMLElement>("[data-motion='process-heading']")[0];
  const rows = select<HTMLElement>("[data-motion='process-row']");

  if (!section || !heading || rows.length === 0) {
    return;
  }

  if (conditions.reduceMotion) return;

  const mobile = conditions.mobile;
  const motionTargets: HTMLElement[] = [heading];
  const headingTimeline = gsap.timeline({
    defaults: { ease: MOTION_EASE.ui },
    scrollTrigger: {
      id: "motion-04-process-heading",
      trigger: section,
      start: "top 82%",
      once: true,
    },
    onComplete: () => gsap.set(heading, { clearProps: CLEAR_PROPS }),
  });

  headingTimeline.from(heading, { autoAlpha: 0, y: mobile ? 12 : 15, duration: mobile ? 0.58 : 0.64 });

  const rowTimelines = rows.map((row, index) => {
    const rule = row.querySelector<HTMLElement>("[data-motion='process-rule']");
    const number = row.querySelector<HTMLElement>("[data-motion='process-number']");
    const title = row.querySelector<HTMLElement>("[data-motion='process-title']");
    const detail = row.querySelector<HTMLElement>("[data-motion='process-detail']");

    if (!rule || !number || !title || !detail) return;

    motionTargets.push(rule, number, title, detail);

    const ruleDuration = mobile ? 0.66 : 0.82;
    const rowTimeline = gsap.timeline({
      defaults: { ease: MOTION_EASE.ui },
      scrollTrigger: {
        id: `motion-04-process-row-${index + 1}`,
        trigger: row,
        start: mobile ? "top 80%" : "top 82%",
        once: true,
      },
      onComplete: () => gsap.set([rule, number, title, detail], { clearProps: CLEAR_PROPS }),
    });

    gsap.set(rule, { scaleX: 0, transformOrigin: "left center" });
    gsap.set([number, title, detail], { autoAlpha: 0 });

    rowTimeline
      .to(rule, { scaleX: 1, duration: ruleDuration })
      .to(number, { autoAlpha: 1, y: mobile ? 9 : 12, duration: 0.01 }, 0)
      .to(number, { y: 0, duration: mobile ? 0.42 : 0.5 }, ruleDuration * 0.36)
      .to(title, { autoAlpha: 1, y: mobile ? 16 : 23, duration: 0.01 }, ruleDuration * 0.2)
      .to(title, { y: 0, duration: mobile ? 0.58 : 0.7 }, ruleDuration * 0.38)
      .to(detail, { autoAlpha: 1, y: mobile ? 12 : 17, duration: 0.01 }, ruleDuration * 0.34)
      .to(detail, { y: 0, duration: mobile ? 0.5 : 0.62 }, ruleDuration * 0.52);

    return rowTimeline;
  });

  return () => {
    headingTimeline.scrollTrigger?.kill();
    headingTimeline.revert();

    rowTimelines.forEach((timeline) => {
      timeline?.scrollTrigger?.kill();
      timeline?.revert();
    });

    gsap.set(motionTargets, { clearProps: CLEAR_PROPS });
  };
}
