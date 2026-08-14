import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ProjectComparisonPlaceholder } from "@/components/ui/ProjectComparisonPlaceholder";

export function RedesignSection() {
  return (
    <section className="redesign" id="work" aria-labelledby="redesign-title">
      <Container>
        <SectionLabel index="03" inverse>Proof</SectionLabel>
        <div className="redesign-heading">
          <h2 id="redesign-title"><span>Same business.</span><span>Different <em>perception.</em></span></h2>
        </div>
        <div className="comparison-labels" aria-hidden="true">
          <span><i /> Before</span>
          <span><i /> After Aquarela</span>
        </div>
        <ProjectComparisonPlaceholder />
      </Container>
    </section>
  );
}
