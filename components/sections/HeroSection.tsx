import { Container } from "@/components/layout/Container";
import { ArrowIcon } from "@/components/ui/ArrowIcon";

export function HeroSection() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <Container className="hero-inner">
        <h1 id="hero-title" className="hero-title">
          <span>What does your brand</span>
          <span className="hero-title-last">communicate<span className="hero-dot">?</span></span>
        </h1>
        <div className="hero-support">
          <p>Your website speaks for your company<br className="desktop-break" /> before you even get the chance.</p>
          <a className="text-cta" href="#work">
            See the difference <ArrowIcon />
          </a>
        </div>
        <p className="hero-index" aria-hidden="true">01 — 07</p>
      </Container>
    </section>
  );
}
