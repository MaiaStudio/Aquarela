import { Container } from "@/components/layout/Container";

export function PositioningSection() {
  return (
    <section
      className="positioning"
      aria-labelledby="positioning-title"
      data-motion="positioning-section"
    >
      <Container>
        <div className="positioning-layout" data-motion="positioning-layout">
          <h2 id="positioning-title" className="positioning-title" data-motion="positioning-title">
            Great design shouldn&apos;t be reserved for{" "}
            <span data-motion="positioning-highlight">big brands.</span>
          </h2>
          <div className="positioning-copy" data-motion="positioning-copy">
            <p className="positioning-bridge" data-motion="positioning-bridge">
              Growing businesses deserve digital experiences that match their ambition.
            </p>
            <p>
              We create websites and landing pages with creative direction, motion, modern technology, and obsessive attention to detail.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
