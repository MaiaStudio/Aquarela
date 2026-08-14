import { Container } from "@/components/layout/Container";
import { ArrowIcon } from "@/components/ui/ArrowIcon";

export function ClosingSection() {
  return (
    <section className="closing" aria-labelledby="closing-title">
      <Container className="closing-inner">
        <p data-motion="closing-intro">Your website speaks before you do.</p>
        <h2 id="closing-title" data-motion="closing-title">
          <span>Make it worth</span>
          <span>remembering<span className="closing-dot">.</span></span>
        </h2>
        <a className="closing-cta" href="#start-project">Start a project <ArrowIcon /></a>
      </Container>
    </section>
  );
}
