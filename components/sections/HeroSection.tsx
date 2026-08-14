import { Container } from "@/components/layout/Container";
import { ArrowIcon } from "@/components/ui/ArrowIcon";

export function HeroSection() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <Container className="hero-inner">
        <h1 id="hero-title" className="hero-title">
          <span className="hero-line-mask">
            <span className="hero-line" data-motion="hero-line">What does your brand</span>
          </span>
          <span className="hero-line-mask">
            <span className="hero-line" data-motion="hero-line">
              communicate<span className="hero-dot" data-motion="hero-dot">?</span>
            </span>
          </span>
        </h1>
        <div className="hero-support">
          <p data-motion="hero-support-copy">Your website speaks for your company<br />before you even get the chance.</p>
          <a className="text-cta" href="#work" data-motion="hero-cta">
            See the difference <ArrowIcon />
          </a>
        </div>
      </Container>
    </section>
  );
}
