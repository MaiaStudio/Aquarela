import BubbleBurst from "@/components/originkit/ui/bubble-burst";
import Sparkles from "@/components/originkit/ui/stardust";

export function AuthoritySection() {
  return (
    <section
      className="authority"
      id="authority"
      aria-label="Authority"
      data-motion="authority-section"
      data-cursor-theme="dark"
    >
      <div className="authority-stage" data-motion="authority-stage">
        {/* Pure Black Foundation */}
        <div className="authority-black-bg" aria-hidden="true" />

        {/* Stardust Background Atmosphere with contrast veil */}
        <div className="authority-stardust" data-motion="authority-stardust" aria-hidden="true">
          <Sparkles
            background="#000000"
            particleColor="#FFFFFF"
            particleDensity={3.2}
            speed={6}
            particleSpeed={0.8}
            movement={4}
            minSize={1.0}
            maxSize={1.8}
          />
          <div className="authority-stardust-veil" />
        </div>

        {/* Reserved Future Cards Layer (currently empty) */}
        <div className="authority-future-card-layer" aria-hidden="true" />

        {/* 3D Cylindrical Typography Orbit (Middle Layer) */}
        <div className="authority-3d-scene" data-motion="authority-3d-scene">
          <div
            className="authority-phrase authority-phrase--0"
            data-motion="authority-phrase"
            data-index="0"
          >
            More than a website.
          </div>
          <div
            className="authority-phrase authority-phrase--1"
            data-motion="authority-phrase"
            data-index="1"
          >
            It can tell a story.
          </div>
          <div
            className="authority-phrase authority-phrase--2"
            data-motion="authority-phrase"
            data-index="2"
          >
            React.
          </div>
          <div
            className="authority-phrase authority-phrase--3"
            data-motion="authority-phrase"
            data-index="3"
          >
            Surprise.
          </div>
          <div
            className="authority-phrase authority-phrase--4"
            data-motion="authority-phrase"
            data-index="4"
          >
            Be remembered.
          </div>
        </div>

        {/* Bubble Burst Foreground Anchor (Foreground Layer) */}
        <div className="authority-bubble-foreground" data-motion="authority-bubble">
          <BubbleBurst />
        </div>

        {/* Paper Conclusion Epilogue Layer */}
        <div className="authority-paper-layer" data-motion="authority-paper" aria-hidden="true" />

        {/* Original Approved Conclusion */}
        <div className="authority-conclusion-stage" data-motion="authority-conclusion">
          <p className="authority-conclusion">
            <span className="authority-conclusion-mask">
              <span data-motion="authority-conclusion-line">Design changes</span>
            </span>
            <span className="authority-conclusion-mask">
              <span data-motion="authority-conclusion-line">perception.</span>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
