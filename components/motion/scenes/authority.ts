import {
  MOTION_EASE,
  type MotionConditions,
} from "@/components/motion/motion.config";
import { gsap } from "@/components/motion/motion.client";

type PointerState = {
  strength: number;
  x: number;
  y: number;
};

const CLEAR_PROPS = "color,opacity,transform,transformOrigin,visibility";

export function createAuthorityScene(root: HTMLElement, conditions: MotionConditions) {
  const select = gsap.utils.selector(root);
  const section = select<HTMLElement>("[data-motion='authority-section']")[0];
  const stage = select<HTMLElement>("[data-motion='authority-stage']")[0];
  const title = select<HTMLElement>("[data-motion='authority-title']")[0];
  const phrases = select<HTMLElement>("[data-motion='authority-phrases']")[0];
  const story = select<HTMLElement>("[data-motion='authority-story']")[0];
  const react = select<HTMLElement>("[data-motion='authority-react']")[0];
  const reactInner = select<HTMLElement>("[data-motion='authority-react-inner']")[0];
  const surprise = select<HTMLElement>("[data-motion='authority-surprise']")[0];
  const remember = select<HTMLElement>("[data-motion='authority-remember']")[0];
  const conclusion = select<HTMLElement>("[data-motion='authority-conclusion']")[0];
  const conclusionLines = select<HTMLElement>("[data-motion='authority-conclusion-line']");
  const wash = select<HTMLElement>("[data-motion='authority-wash']")[0];

  if (
    !section ||
    !stage ||
    !title ||
    !phrases ||
    !story ||
    !react ||
    !reactInner ||
    !surprise ||
    !remember ||
    !conclusion ||
    conclusionLines.length !== 2 ||
    !wash
  ) {
    return;
  }

  if (conditions.reduceMotion) return;

  if (conditions.mobile) {
    section.classList.add("authority--mobile-motion");

    const intro = gsap.timeline({
      defaults: { ease: MOTION_EASE.ui },
      scrollTrigger: {
        id: "motion-02b-authority-intro",
        trigger: section,
        start: "top 82%",
        once: true,
      },
    });

    const storyBeat = gsap.timeline({
      defaults: { ease: MOTION_EASE.scroll },
      scrollTrigger: {
        id: "motion-02b-authority-story",
        trigger: story,
        start: "top 82%",
        end: "bottom 38%",
        scrub: 0.35,
      },
    });

    const reactBeat = gsap.timeline({
      defaults: { ease: MOTION_EASE.scroll },
      scrollTrigger: {
        id: "motion-02b-authority-react",
        trigger: react,
        start: "top 78%",
        end: "bottom 62%",
        scrub: 0.32,
      },
    });

    const surpriseBeat = gsap.timeline({
      defaults: { ease: MOTION_EASE.scroll },
      scrollTrigger: {
        id: "motion-02b-authority-surprise",
        trigger: surprise,
        start: "top 62%",
        end: "bottom 32%",
        scrub: 0.32,
      },
    });

    const rememberBeat = gsap.timeline({
      defaults: { ease: MOTION_EASE.scroll },
      scrollTrigger: {
        id: "motion-02b-authority-remember",
        trigger: remember,
        start: "top 78%",
        end: "bottom 42%",
        scrub: 0.35,
      },
    });

    const thesis = gsap.timeline({
      defaults: { ease: MOTION_EASE.scroll },
      scrollTrigger: {
        id: "motion-02b-authority-thesis",
        trigger: conclusion,
        start: "top 84%",
        end: "top 54%",
        scrub: 0.35,
      },
    });

    gsap.set(title, { autoAlpha: 0, y: 24 });
    gsap.set([story, react, surprise, remember], { transformOrigin: "0% 50%" });
    gsap.set(story, { autoAlpha: 0, y: 24, scale: 1, x: 0 });
    gsap.set(react, { autoAlpha: 0.18, scale: 1, x: 0 });
    gsap.set(surprise, { autoAlpha: 0.12, scale: 1, x: 0 });
    gsap.set(remember, { autoAlpha: 0.18, scale: 1, x: 0 });
    gsap.set(wash, { scaleY: 0, transformOrigin: "50% 100%" });
    gsap.set(conclusionLines, { yPercent: 110 });

    intro.fromTo(title, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.72 });

    storyBeat
      .fromTo(
        story,
        { autoAlpha: 0, y: 24, scale: 1, x: 0 },
        { autoAlpha: 1, y: 0, scale: 1, x: 0, duration: 0.34, ease: MOTION_EASE.ui },
      )
      .to(story, { autoAlpha: 1, scale: 1.08, x: -6, duration: 0.36 })
      .to(story, { autoAlpha: 0.56, scale: 1, x: 0, duration: 0.42 });

    reactBeat
      .fromTo(
        react,
        { autoAlpha: 0.18, scale: 1, x: 0 },
        { autoAlpha: 1, scale: 1.2, x: 14, duration: 0.56 },
      )
      .to(react, { autoAlpha: 0.66, scale: 1.08, x: 5, duration: 0.44 });

    surpriseBeat
      .set(wash, { transformOrigin: "50% 100%" })
      .to(wash, { scaleY: 1, duration: 0.32 })
      .to(
        surprise,
        { autoAlpha: 1, color: "var(--color-paper)", scale: 1.3, x: -12, duration: 0.36 },
        "<",
      )
      .to([title, story, react, remember], { autoAlpha: 0.12, color: "var(--color-paper)", duration: 0.28 }, "<")
      .to(wash, { scaleY: 1, duration: 0.26 })
      .set(wash, { transformOrigin: "50% 0%" })
      .to(wash, { scaleY: 0, duration: 0.32 })
      .to(
        surprise,
        { autoAlpha: 0.12, color: "var(--color-ink)", scale: 1, x: 0, duration: 0.32 },
        "<",
      )
      .to([title, story, react, remember], { color: "var(--color-ink)", duration: 0.24 }, "<");

    rememberBeat
      .fromTo(
        remember,
        { autoAlpha: 0.38, scale: 1, x: 0 },
        { autoAlpha: 1, scale: 1.13, x: -4, duration: 0.55 },
      )
      .to(remember, { autoAlpha: 1, scale: 1.08, x: 0, duration: 0.45 })
      .to(surprise, { autoAlpha: 0.08, duration: 0.35 }, 0.3);

    thesis.fromTo(
      conclusionLines,
      { yPercent: 110 },
      { yPercent: 0, duration: 0.84, stagger: 0.13, ease: MOTION_EASE.reveal },
    );

    return () => {
      thesis.scrollTrigger?.kill();
      rememberBeat.scrollTrigger?.kill();
      surpriseBeat.scrollTrigger?.kill();
      reactBeat.scrollTrigger?.kill();
      storyBeat.scrollTrigger?.kill();
      intro.scrollTrigger?.kill();
      thesis.revert();
      rememberBeat.revert();
      surpriseBeat.revert();
      reactBeat.revert();
      storyBeat.revert();
      intro.revert();
      gsap.set([title, story, react, surprise, remember, ...conclusionLines, wash], {
        clearProps: CLEAR_PROPS,
      });
      section.classList.remove("authority--mobile-motion");
    };
  }

  section.classList.add("authority--motion");

  const compact = conditions.tablet || window.innerWidth <= 1100;
  const phraseTargets = [story, react, surprise, remember];
  const pointerState: PointerState = { strength: 0, x: 0, y: 0 };
  const reactX = gsap.quickTo(reactInner, "x", { duration: 0.32, ease: MOTION_EASE.ui });
  const reactY = gsap.quickTo(reactInner, "y", { duration: 0.32, ease: MOTION_EASE.ui });
  const finePointer = !compact && window.matchMedia("(pointer: fine)").matches;

  const applyPointer = () => {
    reactX(pointerState.x * pointerState.strength * 13);
    reactY(pointerState.y * pointerState.strength * 8);
  };

  const handlePointerMove = (event: PointerEvent) => {
    const bounds = stage.getBoundingClientRect();
    const normalizedX = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
    const normalizedY = ((event.clientY - bounds.top) / bounds.height) * 2 - 1;

    pointerState.x = gsap.utils.clamp(-1, 1, normalizedX);
    pointerState.y = gsap.utils.clamp(-1, 1, normalizedY);
    applyPointer();
  };

  const handlePointerLeave = () => {
    pointerState.x = 0;
    pointerState.y = 0;
    applyPointer();
  };

  if (finePointer) {
    stage.addEventListener("pointermove", handlePointerMove);
    stage.addEventListener("pointerleave", handlePointerLeave);
  }

  gsap.set(phraseTargets, { transformOrigin: "0% 50%" });
  gsap.set(wash, { scaleY: 0, transformOrigin: "50% 100%" });
  gsap.set(conclusion, { autoAlpha: 0 });
  gsap.set(conclusionLines, { yPercent: 110 });

  const timeline = gsap.timeline({
    defaults: { ease: MOTION_EASE.scroll },
    scrollTrigger: {
      id: "motion-02-authority",
      trigger: stage,
      start: "top top",
      end: () => `+=${window.innerHeight * (compact ? 2.5 : 3.2)}`,
      pin: true,
      scrub: compact ? 0.55 : 0.7,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  const storyScale = compact ? 1.15 : 1.24;
  const reactScale = compact ? 1.52 : 1.76;
  const surpriseScale = compact ? 1.68 : 2.06;
  const rememberScale = compact ? 1.38 : 1.54;
  const storyX = compact ? -24 : -64;
  const reactXOffset = () => -Math.min(stage.clientWidth * (compact ? 0.12 : 0.22), compact ? 150 : 340);
  const surpriseX = () => -Math.min(stage.clientWidth * (compact ? 0.17 : 0.3), compact ? 210 : 430);

  timeline
    .addLabel("intro", 0)
    .addLabel("story", 0.8)
    .to(title, { autoAlpha: 0.46, y: compact ? -10 : -15, duration: 1.05 }, "story")
    .to(story, {
      autoAlpha: 1,
      x: storyX,
      yPercent: compact ? 105 : 138,
      scale: storyScale,
      duration: 1.05,
    }, "story")
    .to([react, surprise, remember], { autoAlpha: 0.14, duration: 0.9 }, "story")
    .addLabel("react", 2.7)
    .to(story, { autoAlpha: 0.13, x: 0, yPercent: 0, scale: 1, duration: 1.05 }, "react")
    .to(react, {
      autoAlpha: 1,
      x: reactXOffset,
      yPercent: compact ? 28 : 46,
      scale: reactScale,
      duration: 1.15,
    }, "react")
    .to(title, { autoAlpha: 0.22, y: compact ? -13 : -18, duration: 0.9 }, "react")
    .to([surprise, remember], { autoAlpha: 0.11, duration: 0.9 }, "react")
    .to(pointerState, {
      strength: finePointer ? 1 : 0,
      duration: 0.72,
      onUpdate: applyPointer,
    }, "react+=0.2")
    .addLabel("surprise", 4.5)
    .to(pointerState, { strength: 0, duration: 0.55, onUpdate: applyPointer }, "surprise")
    .to(react, { autoAlpha: 0.1, x: 0, yPercent: 0, scale: 1, duration: 1 }, "surprise")
    .to(wash, { scaleY: 1, duration: 1.2 }, "surprise")
    .to([title, story, react, remember], { color: "var(--color-paper)", duration: 0.86 }, "surprise+=0.2")
    .to(surprise, {
      autoAlpha: 1,
      color: "var(--color-paper)",
      x: surpriseX,
      yPercent: compact ? -30 : -50,
      scale: surpriseScale,
      duration: 1.18,
    }, "surprise")
    .to(title, { autoAlpha: 0.16, duration: 0.8 }, "surprise")
    .to([story, react, remember], { autoAlpha: 0.08, duration: 0.8 }, "surprise")
    .addLabel("remember", 6.3)
    .set(wash, { transformOrigin: "50% 0%" }, "remember")
    .to(wash, { scaleY: 0, duration: 1.15 }, "remember")
    .to([title, story, react, surprise, remember], { color: "var(--color-ink)", duration: 0.84 }, "remember+=0.16")
    .to(surprise, { autoAlpha: 0.04, x: 0, yPercent: 0, scale: 1, duration: 0.95 }, "remember")
    .to(remember, {
      autoAlpha: 1,
      x: compact ? -72 : -180,
      yPercent: compact ? -104 : -138,
      scale: rememberScale,
      duration: 1.25,
    }, "remember")
    .to([title, story, react], { autoAlpha: 0.035, duration: 0.8 }, "remember")
    .addLabel("thesis", 8.1)
    .to(remember, { autoAlpha: 0, yPercent: compact ? -116 : -154, scale: compact ? 1.34 : 1.48, duration: 0.9 }, "thesis")
    .to([title, story, react, surprise], { autoAlpha: 0, duration: 0.65 }, "thesis")
    .set(conclusion, { autoAlpha: 1 }, "thesis+=0.15")
    .to(conclusionLines[0], { yPercent: 0, duration: 0.82 }, "thesis+=0.15")
    .to(conclusionLines[1], { yPercent: 0, duration: 0.82 }, "thesis+=0.43")
    .to(conclusion, { autoAlpha: 1, duration: 1.55 }, "thesis+=0.98");

  return () => {
    if (finePointer) {
      stage.removeEventListener("pointermove", handlePointerMove);
      stage.removeEventListener("pointerleave", handlePointerLeave);
    }

    pointerState.strength = 0;
    pointerState.x = 0;
    pointerState.y = 0;
    reactX(0);
    reactY(0);
    reactX.tween.kill();
    reactY.tween.kill();
    timeline.scrollTrigger?.kill();
    timeline.revert();
    gsap.set(stage, { clearProps: "all" });
    gsap.set([title, ...phraseTargets, reactInner, conclusion, ...conclusionLines, wash], {
      clearProps: CLEAR_PROPS,
    });
    section.classList.remove("authority--motion");
  };
}
