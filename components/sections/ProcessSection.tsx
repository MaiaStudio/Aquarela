import { Container } from "@/components/layout/Container";

const processSteps = [
  { number: "01", title: "Strategy", detail: "Positioning. Structure. Direction." },
  { number: "02", title: "Design", detail: "Visual system. Interface. Details." },
  { number: "03", title: "Motion", detail: "Rhythm. Interaction. Storytelling." },
  { number: "04", title: "Development", detail: "Performance. Responsiveness. Precision." },
  { number: "05", title: "Launch", detail: "QA. Polish. Go live." },
] as const;

export function ProcessSection() {
  return (
    <section className="process" id="process" aria-labelledby="process-title">
      <Container>
        <h2 className="process-heading" id="process-title">Process</h2>
        <ol className="process-list">
          {processSteps.map((step) => (
            <li className="process-row" key={step.number} data-motion="process-row">
              <span className="process-number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.detail}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
