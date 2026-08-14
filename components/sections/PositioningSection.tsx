import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function PositioningSection() {
  return (
    <section className="positioning" aria-labelledby="positioning-title">
      <Container>
        <SectionLabel index="04">Positioning</SectionLabel>
        <h2 id="positioning-title" className="positioning-title">
          Great design shouldn&apos;t be reserved for <span>big brands.</span>
        </h2>
        <div className="positioning-copy">
          <p className="positioning-bridge">Growing businesses deserve digital experiences<br className="desktop-break" /> that match their ambition.</p>
          <p>We create websites and landing pages with creative direction, motion, modern technology, and obsessive attention to detail.</p>
        </div>
      </Container>
    </section>
  );
}
