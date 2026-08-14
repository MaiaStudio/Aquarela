import { Container } from "@/components/layout/Container";
import { ArrowIcon } from "@/components/ui/ArrowIcon";

export function HeroSection() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <Container className="hero-inner">
        <h1 id="hero-title" className="hero-title">
          <span>What does your brand</span>
          <span>communicate<span className="hero-dot">?</span></span>
        </h1>
        <div className="hero-support">
          <p>Your website speaks for your company<br />before you even get the chance.</p>
          <a className="text-cta" href="#work">
            See the difference <ArrowIcon />
          </a>
        </div>
      </Container>
    </section>
  );
}
