import { Container } from "@/components/layout/Container";

export function PositioningSection() {
  return (
    <section className="positioning" aria-labelledby="positioning-title">
      <Container>
        <div className="positioning-layout">
          <h2 id="positioning-title" className="positioning-title">
            Great design shouldn&apos;t be reserved for <span>big brands.</span>
          </h2>
          <div className="positioning-copy">
            <p className="positioning-bridge">Growing businesses deserve digital experiences that match their ambition.</p>
            <p>We create websites and landing pages with creative direction, motion, modern technology, and obsessive attention to detail.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
