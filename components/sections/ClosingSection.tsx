import { Container } from "@/components/layout/Container";
import { ArrowIcon } from "@/components/ui/ArrowIcon";

export function ClosingSection() {
  return (
    <section
      className="closing"
      aria-labelledby="closing-title"
      data-motion="closing-section"
    >
      <Container className="closing-inner" data-motion="closing-inner">
        <p data-motion="closing-intro">Your website speaks before you do.</p>
        <h2 id="closing-title" data-motion="closing-title">
          <span className="closing-line-mask">
            <span className="closing-line" data-motion="closing-line">
              Make it worth
            </span>
          </span>
          <span className="closing-line-mask">
            <span className="closing-line" data-motion="closing-line">
              <span className="closing-word">
                remembering<span className="closing-dot" data-motion="closing-dot">.</span>
              </span>
            </span>
          </span>
        </h2>
        <a
          className="closing-cta"
          href="#start-project"
          data-motion="closing-cta"
        >
          Start a project <ArrowIcon />
        </a>
      </Container>
    </section>
  );
}
