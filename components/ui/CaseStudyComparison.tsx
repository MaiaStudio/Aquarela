import Image from "next/image";

import afterImage from "@/Assets/case-studies/fotomaton-party/after.jpg";
import beforeImage from "@/Assets/case-studies/fotomaton-party/before.jpg";

const imageSizes = "(max-width: 767.98px) calc(100vw - 2 * 1.25rem), (max-width: 1439px) 90vw, 1400px";

export function CaseStudyComparison() {
  return (
    <div className="comparison" aria-label="Fotomatón Party Madrid website redesign comparison">
      <div className="comparison-labels" aria-hidden="true">
        <span data-motion="redesign-before-label">Before</span>
        <span data-motion="redesign-after-label">After Aquarela</span>
      </div>

      <div className="comparison-frame" data-motion="redesign-frame">
        <div className="case-media case-media--before" data-motion="redesign-before">
          <div className="case-media-slot" data-media-slot="before">
            <Image
              className="case-media-image"
              src={beforeImage}
              alt="Original Fotomatón Party Madrid website before redesign"
              fill
              sizes={imageSizes}
            />
          </div>
        </div>

        <div className="case-reveal" data-motion="redesign-after-reveal">
          <div className="case-media case-media--after" data-motion="redesign-after">
            <div className="case-media-slot" data-media-slot="after">
              {/* Future: this media slot may render the final case-study video. */}
              <Image
                className="case-media-image"
                src={afterImage}
                alt="Aquarela redesign for Fotomatón Party Madrid"
                fill
                sizes={imageSizes}
              />
            </div>
          </div>
        </div>

        <span className="case-divider" data-motion="redesign-divider" aria-hidden="true" />
      </div>
    </div>
  );
}
