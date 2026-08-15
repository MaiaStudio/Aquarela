import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/layout/Container";

export function Footer() {
  return (
    <footer className="site-footer" data-cursor-theme="dark">
      <Container className="footer-inner">
        <Logo inverse />
        <p>Web Design — Motion — Development</p>
      </Container>
    </footer>
  );
}
