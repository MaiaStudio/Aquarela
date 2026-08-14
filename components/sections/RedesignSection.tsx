import { Container } from "@/components/layout/Container";
import { CaseStudyComparison } from "@/components/ui/CaseStudyComparison";

export function RedesignSection() {
  return (
    <section
      className="redesign"
      id="work"
      aria-labelledby="redesign-title"
      data-motion="redesign-section"
    >
      <Container>
        <div className="redesign-heading" data-motion="redesign-heading">
          <h2 id="redesign-title">
            <span className="redesign-heading-line-mask">
              <span data-motion="redesign-heading-line">Same business.</span>
            </span>
            <span className="redesign-heading-line-mask">
              <span data-motion="redesign-heading-line">
                Different <em>perception.</em>
              </span>
            </span>
          </h2>
        </div>
      </Container>

      <div className="redesign-stage" data-motion="redesign-stage">
        <Container className="redesign-stage-inner">
          <div className="comparison-runway" data-motion="redesign-runway">
            <div className="comparison-sticky" data-motion="redesign-sticky">
              <CaseStudyComparison />
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
