"use client";

interface HeroTextLoopProps {
  className?: string;
  speed?: number;
}

export function HeroTextLoop({ className = "", speed = 18 }: HeroTextLoopProps) {
  const phrase = "YOUR WEBSITE SPEAKS FOR YOU ✦ ";
  const repeatedText = phrase.repeat(16);

  return (
    <div className={`hero-text-loop-wrap ${className}`} aria-hidden="true">
      <svg
        className="hero-text-loop-svg"
        viewBox="0 0 2400 480"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Sinuous wave path spanning double-width for infinite looping */}
          <path
            id="text-loop-wave"
            d="M -1200 240 Q -900 120, -600 240 T 0 240 T 600 240 T 1200 240 T 1800 240 T 2400 240 T 3000 240 T 3600 240"
            fill="none"
          />
        </defs>

        {/* Outer Ribbon Glow / Accent Border */}
        <path
          d="M -1200 240 Q -900 120, -600 240 T 0 240 T 600 240 T 1200 240 T 1800 240 T 2400 240 T 3000 240 T 3600 240"
          fill="none"
          stroke="rgba(242, 200, 75, 0.32)"
          strokeWidth="166"
          strokeLinecap="round"
        />

        {/* Main Ribbon Body (Thick Branded Accent) */}
        <path
          d="M -1200 240 Q -900 120, -600 240 T 0 240 T 600 240 T 1200 240 T 1800 240 T 2400 240 T 3000 240 T 3600 240"
          fill="none"
          stroke="#414a24"
          strokeWidth="156"
          strokeLinecap="round"
        />

        {/* Looping Typography along Wave Ribbon */}
        <text
          fill="#f4f1e8"
          fontSize="66"
          fontWeight="800"
          letterSpacing="4.5"
          fontFamily="var(--font-interface)"
          dominantBaseline="central"
          dy="3"
        >
          <textPath href="#text-loop-wave" startOffset="0%">
            {repeatedText}
            <animate
              attributeName="startOffset"
              from="0%"
              to="-50%"
              dur={`${speed}s`}
              repeatCount="indefinite"
            />
          </textPath>
        </text>
      </svg>
    </div>
  );
}
