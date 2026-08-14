export const MOTION_QUERIES = {
  desktop: "(min-width: 1024px)",
  tablet: "(min-width: 768px) and (max-width: 1023px)",
  mobile: "(max-width: 767px)",
  reduceMotion: "(prefers-reduced-motion: reduce)",
} as const;

export const MOTION_EASE = {
  reveal: "power4.out",
  ui: "power3.out",
  scroll: "none",
} as const;
