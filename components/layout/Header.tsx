import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/layout/Container";
import { ArrowIcon } from "@/components/ui/ArrowIcon";

export function Header() {
  return (
    <header className="site-header">
      <Container className="header-inner">
        <Logo motionId="header-logo" />
        <nav className="header-nav" aria-label="Primary navigation" data-motion="header-nav">
          <a className="header-link header-link--quiet" href="#work">Work</a>
          <a className="header-link header-link--quiet" href="#process">Process</a>
          <a className="header-link header-link--cta" href="#start-project">
            Start a project <ArrowIcon />
          </a>
        </nav>
      </Container>
    </header>
  );
}
