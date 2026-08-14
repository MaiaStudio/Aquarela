import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function AuthoritySection() {
  return (
    <section className="authority" aria-labelledby="authority-title">
      <Container className="authority-inner">
        <SectionLabel index="02">Possibility</SectionLabel>
        <h2 id="authority-title" className="authority-title">More than a website.</h2>
        <div className="authority-phrases">
          <p data-motion="authority-story">It can tell a <em>story.</em></p>
          <p data-motion="authority-react">React.</p>
          <p data-motion="authority-surprise">Surprise.</p>
          <p data-motion="authority-remember">Be remembered.</p>
        </div>
        <p className="authority-conclusion">Design changes <span>perception.</span></p>
      </Container>
    </section>
  );
}
