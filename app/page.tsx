import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { AuthoritySection } from "@/components/sections/AuthoritySection";
import { ClosingSection } from "@/components/sections/ClosingSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { PositioningSection } from "@/components/sections/PositioningSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ProjectFormSection } from "@/components/sections/ProjectFormSection";
import { RedesignSection } from "@/components/sections/RedesignSection";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <HeroSection />
        <AuthoritySection />
        <RedesignSection />
        <PositioningSection />
        <ProcessSection />
        <ProjectFormSection />
        <ClosingSection />
      </main>
      <Footer />
    </>
  );
}
