export const MOTION_QUERIES = {
  desktop: "(min-width: 1024px)",
  tablet: "(min-width: 768px) and (max-width: 1023.98px)",
  mobile: "(max-width: 767.98px)",
  reduceMotion: "(prefers-reduced-motion: reduce)",
} as const;

export type MotionConditions = {
  desktop: boolean;
  tablet: boolean;
  mobile: boolean;
  reduceMotion: boolean;
};

export const MOTION_EASE = {
  reveal: "power4.out",
  ui: "power3.out",
  scroll: "none",
} as const;
