import {
  MOTION_EASE,
  type MotionConditions,
} from "@/components/motion/motion.config";
import { gsap } from "@/components/motion/motion.client";

export function createHeroScene(root: HTMLElement, conditions: MotionConditions) {
  const select = gsap.utils.selector(root);
  const headerLogo = select<HTMLElement>("[data-motion='header-logo']")[0];
  const headerNav = select<HTMLElement>("[data-motion='header-nav']")[0];
  const hero = select<HTMLElement>(".hero")[0];
  const heroTitle = select<HTMLElement>(".hero-title")[0];
  const heroLines = select<HTMLElement>("[data-motion='hero-line']");
  const heroDot = select<HTMLElement>("[data-motion='hero-dot']")[0];

  if (
    !headerLogo ||
    !headerNav ||
    !hero ||
    !heroTitle ||
    heroLines.length === 0 ||
    !heroDot
  ) {
    return;
  }

  const entranceTargets = [headerLogo, headerNav, ...heroLines, heroDot];

  if (conditions.reduceMotion) {
    const reducedEntrance = gsap.timeline({
      defaults: { duration: 0.24, ease: MOTION_EASE.ui },
      onComplete: () => gsap.set(entranceTargets, { clearProps: "transform,opacity,visibility" }),
    });

    reducedEntrance.from([headerLogo, headerNav], { autoAlpha: 0, y: 3, stagger: 0.025 });
    reducedEntrance.from(heroLines, { autoAlpha: 0, y: 3 }, 0.04);

    return () => reducedEntrance.revert();
  }

  const isDesktop = conditions.desktop;
  const isTablet = conditions.tablet;
  const lineTravel = conditions.mobile ? 92 : isTablet ? 102 : 110;
  const lineDuration = isDesktop ? 1.05 : isTablet ? 0.96 : 0.88;

  const entrance = gsap.timeline({
    defaults: { ease: MOTION_EASE.ui },
    onComplete: () => gsap.set(entranceTargets, { clearProps: "transform,opacity,visibility" }),
  });

  entrance
    .from(headerLogo, { autoAlpha: 0, y: isDesktop ? 15 : 11, duration: 0.62 }, 0)
    .from(headerNav, { autoAlpha: 0, y: isDesktop ? 13 : 10, duration: 0.58 }, 0.08)
    .from(
      heroLines,
      {
        autoAlpha: 0.92,
        yPercent: lineTravel,
        duration: lineDuration,
        ease: MOTION_EASE.reveal,
        stagger: 0.11,
      },
      0.16,
    )
    .from(
      heroDot,
      {
        autoAlpha: 0,
        scale: 0.84,
        transformOrigin: "50% 60%",
        duration: 0.42,
        ease: MOTION_EASE.ui,
      },
      0.57,
    );

  return () => {
    entrance.revert();
  };
}
