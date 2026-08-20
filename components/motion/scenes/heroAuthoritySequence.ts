import {
  MOTION_EASE,
  type MotionConditions,
} from "@/components/motion/motion.config";
import { gsap } from "@/components/motion/motion.client";

type OrbitConfig = {
  perspective: number;
  perspectiveOrigin: string;
  radiusXRatio: number;
  radiusZ: number;
  stepAngle: number;
  visibleAngle: number;
  rotationMultiplier: number;
  entryYRatio: number;
  exitYRatio: number;
  bubbleZ: number;
};

// EXACT PRE-PORTAL WORKING ORBIT CONFIGURATION
const ORBIT_CONFIG = {
  desktop: {
    perspective: 680,
    perspectiveOrigin: "50% 48%",
    radiusXRatio: 0.72,
    radiusZ: 760,
    stepAngle: 88,
    visibleAngle: 88,
    rotationMultiplier: 0.98,
    entryYRatio: 0.31,
    exitYRatio: 0.075,
    bubbleZ: 90,
  },
  tablet: {
    perspective: 720,
    perspectiveOrigin: "50% 48%",
    radiusXRatio: 0.62,
    radiusZ: 540,
    stepAngle: 88,
    visibleAngle: 84,
    rotationMultiplier: 0.90,
    entryYRatio: 0.27,
    exitYRatio: 0.07,
    bubbleZ: 70,
  },
  mobile: {
    perspective: 650,
    perspectiveOrigin: "50% 48%",
    radiusXRatio: 0.52,
    radiusZ: 380,
    stepAngle: 84,
    visibleAngle: 76,
    rotationMultiplier: 0.82,
    entryYRatio: 0.22,
    exitYRatio: 0.055,
    bubbleZ: 45,
  },
} as const;

const BASE_ANGLES = [0, 88, 176, 264, 352] as const;

export function createHeroAuthoritySequenceScene(
  root: HTMLElement,
  conditions: MotionConditions
) {
  const experience = root.querySelector<HTMLElement>("[data-motion='hero-authority-experience']");
  const runway = root.querySelector<HTMLElement>("[data-motion='hero-authority-runway']");
  const stage = root.querySelector<HTMLElement>("[data-motion='hero-authority-stage']");
  const heroForeground = root.querySelector<HTMLElement>("[data-motion='hero-foreground-stage']");
  const aAnchor = root.querySelector<HTMLElement>("[data-hero-a-counter-anchor]");

  // Real Authority Elements
  const phrases = root.querySelectorAll<HTMLElement>("[data-motion='authority-phrase']");
  const bubble = root.querySelector<HTMLElement>("[data-motion='authority-bubble']");
  const stardust = root.querySelector<HTMLElement>("[data-motion='authority-stardust']");
  const paperLayer = root.querySelector<HTMLElement>("[data-motion='authority-paper']");
  const conclusionStage = root.querySelector<HTMLElement>("[data-motion='authority-conclusion']");
  const conclusionLines = root.querySelectorAll<HTMLElement>("[data-motion='authority-conclusion-line']");

  if (
    !experience ||
    !runway ||
    !stage ||
    !heroForeground ||
    phrases.length !== 5 ||
    !conclusionStage ||
    conclusionLines.length !== 2
  ) {
    return;
  }

  // Reduced motion: standard linear flow
  if (conditions.reduceMotion) {
    runway.style.height = "auto";
    stage.style.position = "relative";
    heroForeground.style.position = "relative";
    phrases.forEach((phrase) => {
      phrase.style.position = "relative";
      phrase.style.top = "auto";
      phrase.style.left = "auto";
      phrase.style.transform = "none";
      phrase.style.opacity = "1";
      phrase.style.visibility = "visible";
      phrase.style.marginBottom = "2rem";
    });
    conclusionStage.style.position = "relative";
    conclusionStage.style.opacity = "1";
    conclusionStage.style.visibility = "visible";
    conclusionLines.forEach((line) => {
      line.style.transform = "none";
    });
    return;
  }

  const cfg: OrbitConfig = conditions.mobile
    ? ORBIT_CONFIG.mobile
    : conditions.tablet
    ? ORBIT_CONFIG.tablet
    : ORBIT_CONFIG.desktop;

  // =========================================================================
  // 1. PRE-PORTAL WORKING AUTHORITY 3D ENGINE (PAUSED CHILD TIMELINE)
  // =========================================================================
  const orbitState = {
    angle: 0,
    phrase4Fade: 1,
    phrase4YOffset: 0,
  };

  function applyOrbitTransform(
    el: HTMLElement,
    theta: number,
    vw: number,
    vh: number,
    isPhrase4 = false
  ) {
    const thetaRad = (theta * Math.PI) / 180;
    const orbitRadiusX = vw * cfg.radiusXRatio;
    const orbitRadiusZ = cfg.radiusZ;

    // X position along ellipse
    const x = Math.sin(thetaRad) * orbitRadiusX;

    // True Z depth
    const z = Math.cos(thetaRad) * orbitRadiusZ - orbitRadiusZ;

    // Rotate Y (strong perspective foreshortening)
    const rotY = -theta * cfg.rotationMultiplier;

    // Asymmetric vertical path:
    // theta > 0 (incoming right) comes from below (+entryY)
    // theta < 0 (outgoing left) rises slightly (-exitY)
    let y = 0;
    if (theta > 0) {
      const norm = Math.max(0, Math.min(1, theta / cfg.visibleAngle));
      y = Math.pow(norm, 1.30) * vh * cfg.entryYRatio;
    } else if (theta < 0) {
      const norm = Math.max(0, Math.min(1, Math.abs(theta) / cfg.visibleAngle));
      y = -Math.pow(norm, 1.20) * vh * cfg.exitYRatio;
    }

    if (isPhrase4) {
      y += orbitState.phrase4YOffset;
    }

    // Small Roll (rotateZ)
    const rotZ = theta * 0.055;

    // Opacity window (clean falloff only beyond 70deg)
    const absTheta = Math.abs(theta);
    let opacity = 0;
    if (absTheta <= 70) {
      opacity = 1;
    } else if (absTheta <= cfg.visibleAngle) {
      opacity = (cfg.visibleAngle - absTheta) / (cfg.visibleAngle - 70);
    } else {
      opacity = 0;
    }

    if (isPhrase4) {
      opacity *= orbitState.phrase4Fade;
    }

    el.style.transform = `translate3d(calc(-50% + ${x.toFixed(2)}px), calc(-50% + ${y.toFixed(2)}px), ${z.toFixed(2)}px) rotateY(${rotY.toFixed(2)}deg) rotateZ(${rotZ.toFixed(2)}deg)`;
    el.style.opacity = opacity.toFixed(3);
    el.style.visibility = opacity > 0.001 ? "visible" : "hidden";
  }

  function renderOrbit() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const currentAngle = orbitState.angle;

    for (let i = 0; i < 5; i++) {
      const baseAngle = BASE_ANGLES[i];
      const localTheta = baseAngle - currentAngle;
      applyOrbitTransform(phrases[i], localTheta, vw, vh, i === 4);
    }
  }

  // Initial States for Authority elements
  gsap.set(conclusionStage, { autoAlpha: 0 });
  gsap.set(conclusionLines, { yPercent: 110 });
  if (paperLayer) {
    gsap.set(paperLayer, { autoAlpha: 0 });
  }

  // Render initial frame of pre-portal Authority 3D scene
  renderOrbit();

  // Child Authority Timeline (Completely deterministic, owns all Authority transforms)
  const authorityTimeline = gsap.timeline({
    paused: true,
    defaults: { ease: "none" },
    onUpdate: renderOrbit,
  });

  authorityTimeline
    // ----------------------------------------------------
    // PART A: 3D CYLINDRICAL CAROUSEL
    // ----------------------------------------------------
    .addLabel("phrase0-hold", 0)
    .to(orbitState, { angle: 0, duration: 1.0 }, "phrase0-hold")
    .addLabel("rotate-1", 1.0)
    .to(orbitState, { angle: 88, duration: 1.4 }, "rotate-1")
    .addLabel("phrase1-hold", 2.4)
    .to(orbitState, { angle: 88, duration: 0.8 }, "phrase1-hold")
    .addLabel("rotate-2", 3.2)
    .to(orbitState, { angle: 176, duration: 1.4 }, "rotate-2")
    .addLabel("phrase2-hold", 4.6)
    .to(orbitState, { angle: 176, duration: 0.8 }, "phrase2-hold")
    .addLabel("rotate-3", 5.4)
    .to(orbitState, { angle: 264, duration: 1.4 }, "rotate-3")
    .addLabel("phrase3-hold", 6.8)
    .to(orbitState, { angle: 264, duration: 0.8 }, "phrase3-hold")
    .addLabel("rotate-4", 7.6)
    .to(orbitState, { angle: 352, duration: 1.4 }, "rotate-4")
    .addLabel("phrase4-hold", 9.0)
    .to(orbitState, { angle: 352, duration: 1.0 }, "phrase4-hold")

    // ----------------------------------------------------
    // PART B: CAROUSEL -> CONCLUSION HANDOFF & DARK -> PAPER
    // ----------------------------------------------------
    .addLabel("conclusion-handoff", 10.0)
    .to(
      orbitState,
      {
        phrase4Fade: 0,
        phrase4YOffset: -18,
        duration: 0.8,
        ease: "power2.inOut",
      },
      "conclusion-handoff",
    )
    .to(
      bubble,
      {
        autoAlpha: 0,
        scale: 0.94,
        duration: 0.8,
        ease: "power2.inOut",
      },
      "conclusion-handoff",
    )
    .to(
      stardust,
      {
        autoAlpha: 0,
        duration: 0.7,
        ease: "power2.inOut",
      },
      "conclusion-handoff",
    )
    .to(
      paperLayer,
      {
        autoAlpha: 1,
        duration: 0.9,
        ease: "power2.inOut",
      },
      "conclusion-handoff+=0.1",
    )

    // ----------------------------------------------------
    // PART C: ORIGINAL THESIS REVEAL & BRIDGE HOLD
    // ----------------------------------------------------
    .addLabel("thesis-reveal", 11.0)
    .set(conclusionStage, { autoAlpha: 1 }, "thesis-reveal")
    .to(
      conclusionLines[0],
      {
        yPercent: 0,
        duration: 0.85,
        ease: MOTION_EASE.reveal,
      },
      "thesis-reveal",
    )
    .to(
      conclusionLines[1],
      {
        yPercent: 0,
        duration: 0.85,
        ease: MOTION_EASE.reveal,
      },
      "thesis-reveal+=0.15",
    )
    .addLabel("thesis-hold", 12.2)
    .to(
      conclusionStage,
      {
        autoAlpha: 1,
        duration: 1.6,
      },
      "thesis-hold",
    );

  // =========================================================================
  // 2. HERO PORTAL GEOMETRY & APERTURE MASK (AFFECTS HERO ONLY)
  // =========================================================================
  let portalOriginX = 0;
  let portalOriginY = 0;
  let halfCoverageRadius = 0;
  let maxRadius = 0;

  function computePortalGeometry() {
    if (!stage || !runway) return;
    const stageRect = stage.getBoundingClientRect();
    const w = stageRect.width || window.innerWidth;
    const h = stageRect.height || window.innerHeight;

    // Total scroll budget: 0.8vh (portal) + 5.1vh (Authority) = 5.9vh
    const totalScrollVH = conditions.mobile ? 5.2 : 5.9;
    const scrollDistancePx = totalScrollVH * h;
    runway.style.height = `calc(100svh + ${scrollDistancePx.toFixed(0)}px)`;

    if (aAnchor) {
      const aRect = aAnchor.getBoundingClientRect();
      portalOriginX = aRect.left - stageRect.left + aRect.width * 0.5;
      portalOriginY = aRect.top - stageRect.top + aRect.height * 0.5;
    } else {
      portalOriginX = w * 0.5;
      portalOriginY = h * 0.575;
    }

    halfCoverageRadius = Math.sqrt((w * h * 0.5) / Math.PI) * 1.05;
    const d1 = Math.hypot(portalOriginX, portalOriginY);
    const d2 = Math.hypot(w - portalOriginX, portalOriginY);
    const d3 = Math.hypot(portalOriginX, h - portalOriginY);
    const d4 = Math.hypot(w - portalOriginX, h - portalOriginY);
    maxRadius = Math.max(d1, d2, d3, d4) * 1.03;
  }

  computePortalGeometry();

  function applyHeroAperture(radius: number) {
    if (!heroForeground) return;

    if (radius <= 0.001) {
      heroForeground.style.removeProperty("mask-image");
      heroForeground.style.removeProperty("-webkit-mask-image");
      heroForeground.style.visibility = "visible";
      heroForeground.style.pointerEvents = "auto";
      return;
    }

    if (radius >= maxRadius) {
      heroForeground.style.visibility = "hidden";
      heroForeground.style.pointerEvents = "none";
      return;
    }

    heroForeground.style.visibility = "visible";
    heroForeground.style.pointerEvents = "auto";

    // Circular hole in hero foreground (MASK LIVES ON HERO FOREGROUND ONLY)
    const maskStr = `radial-gradient(circle ${radius.toFixed(1)}px at ${portalOriginX.toFixed(1)}px ${portalOriginY.toFixed(1)}px, transparent 0px, transparent ${radius.toFixed(1)}px, #000000 ${(radius + 0.5).toFixed(1)}px, #000000 100%)`;
    heroForeground.style.setProperty("mask-image", maskStr);
    heroForeground.style.setProperty("-webkit-mask-image", maskStr);
  }

  // Initial state at rest: radius = 0 (Hero 100% opaque, zero hole)
  applyHeroAperture(0);

  // =========================================================================
  // 3. MASTER SCROLL RUNWAY (CONTROLS PROGRESS ONLY)
  // =========================================================================
  const masterProgressState = {
    portalProgress: 0,
    authorityProgress: 0,
  };

  function onMasterUpdate() {
    // 1. Update Hero Portal Aperture (Hero layer only)
    const p = masterProgressState.portalProgress;
    let radius = 0;
    if (p <= 0.001) {
      radius = 0;
    } else if (p <= 0.5) {
      radius = (p / 0.5) * halfCoverageRadius;
    } else {
      const t = (p - 0.5) / 0.5;
      radius = halfCoverageRadius + t * (maxRadius - halfCoverageRadius);
    }
    applyHeroAperture(radius);

    // 2. Drive Child Authority Engine through pure normalized progress
    authorityTimeline.progress(masterProgressState.authorityProgress, false);
  }

  const masterTimeline = gsap.timeline({
    defaults: { ease: "none" },
    onUpdate: onMasterUpdate,
    scrollTrigger: {
      id: "hero-authority-master",
      trigger: runway,
      start: "top top",
      end: "bottom bottom",
      pin: false, // CSS Sticky handles fixation; no pinSpacers or jumps
      scrub: conditions.mobile ? 0.55 : 0.75, // Numeric scrub for smooth catch-up
      invalidateOnRefresh: true,
      onRefresh: () => {
        computePortalGeometry();
        onMasterUpdate();
      },
    },
  });

  /*
    MASTER TIMELINE PROGRESS MAPPING:
    - Phase 1 (0.00 -> 1.00): Hero Portal Aperture reveals Authority behind Hero
    - Phase 2 (1.00 -> 6.10): Restored Pre-Portal Authority 3D Carousel + Conclusion Engine
  */
  masterTimeline
    .to(masterProgressState, { portalProgress: 1.0, duration: 1.0 }, 0)
    .to(masterProgressState, { authorityProgress: 1.0, duration: 5.1 }, 1.0);

  return () => {
    masterTimeline.scrollTrigger?.kill();
    masterTimeline.revert();
    authorityTimeline.kill();
    if (heroForeground) {
      heroForeground.style.removeProperty("mask-image");
      heroForeground.style.removeProperty("-webkit-mask-image");
      heroForeground.style.visibility = "";
      heroForeground.style.pointerEvents = "";
    }
    phrases.forEach((phrase) => {
      phrase.style.transform = "";
      phrase.style.opacity = "";
      phrase.style.visibility = "";
    });
    if (bubble) {
      bubble.style.transform = "";
      bubble.style.opacity = "";
      bubble.style.visibility = "";
    }
    if (stardust) {
      stardust.style.opacity = "";
      stardust.style.visibility = "";
    }
    if (paperLayer) {
      paperLayer.style.opacity = "";
      paperLayer.style.visibility = "";
    }
    if (conclusionStage) {
      conclusionStage.style.opacity = "";
      conclusionStage.style.visibility = "";
    }
    conclusionLines.forEach((line) => {
      line.style.transform = "";
    });
  };
}
