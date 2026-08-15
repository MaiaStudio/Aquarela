import { Container } from "@/components/layout/Container";

export function AuthoritySection() {
  return (
    <section
      className="authority"
      aria-labelledby="authority-title"
      data-motion="authority-section"
      data-cursor-theme="adaptive"
    >
      <div className="authority-stage" data-motion="authority-stage">
        <div className="authority-wash" data-motion="authority-wash" aria-hidden="true" />
        <Container className="authority-inner">
          <h2
            id="authority-title"
            className="authority-title"
            data-motion="authority-title"
          >
            More than a website.
          </h2>
          <div className="authority-phrases" data-motion="authority-phrases">
            <p data-motion="authority-story">It can tell a story.</p>
            <p data-motion="authority-react">
              <span data-motion="authority-react-inner">React.</span>
            </p>
            <p data-motion="authority-surprise">Surprise.</p>
            <p data-motion="authority-remember">Be remembered.</p>
          </div>
          <p className="authority-conclusion" data-motion="authority-conclusion">
            <span className="authority-conclusion-mask">
              <span data-motion="authority-conclusion-line">Design changes</span>
            </span>
            <span className="authority-conclusion-mask">
              <span data-motion="authority-conclusion-line">perception.</span>
            </span>
          </p>
        </Container>
      </div>
    </section>
  );
}
