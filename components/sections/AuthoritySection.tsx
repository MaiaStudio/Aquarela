import { Container } from "@/components/layout/Container";

export function AuthoritySection() {
  return (
    <section className="authority" aria-labelledby="authority-title">
      <Container className="authority-inner">
        <h2 id="authority-title" className="authority-title">More than a website.</h2>
        <div className="authority-phrases">
          <p data-motion="authority-story">It can tell a story.</p>
          <p data-motion="authority-react">React.</p>
          <p data-motion="authority-surprise">Surprise.</p>
          <p data-motion="authority-remember">Be remembered.</p>
        </div>
        <p className="authority-conclusion">
          <span>Design changes</span>
          <span>perception.</span>
        </p>
      </Container>
    </section>
  );
}
