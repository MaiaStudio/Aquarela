import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MotionRoot } from "@/components/motion/MotionRoot";
import { HeroAuthoritySection } from "@/components/sections/HeroAuthoritySection";
import { ClosingSection } from "@/components/sections/ClosingSection";
import { PositioningSection } from "@/components/sections/PositioningSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ProjectFormSection } from "@/components/sections/ProjectFormSection";
import { RedesignSection } from "@/components/sections/RedesignSection";

export default function Home() {
  return (
    <MotionRoot>
      <Header />
      <main id="main-content">
        <HeroAuthoritySection />
        <RedesignSection />
        <PositioningSection />
        <ProcessSection />
        <ProjectFormSection />
        <ClosingSection />
      </main>
      <Footer />
    </MotionRoot>
  );
}
