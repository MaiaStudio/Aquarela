"use client";

interface HeroAFrameProps {
  mode: "default" | "revealed";
  className?: string;
}

export function HeroAFrame({ mode, className = "" }: HeroAFrameProps) {
  const isDefault = mode === "default";

  return (
    <div
      className={`hero-a-frame ${isDefault ? "hero-a-frame--default" : "hero-a-frame--revealed"} ${className}`}
      aria-hidden="true"
    >
      <div className="hero-a-glyph-wrap" data-hero-a-wrap>
        <span
          className={`hero-a-glyph ${isDefault ? "hero-a-glyph--neutral" : "hero-a-glyph--dark"}`}
          data-hero-glyph="a"
        >
          A
        </span>
        <span
          className="hero-a-counter-anchor"
          data-hero-a-counter-anchor
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
