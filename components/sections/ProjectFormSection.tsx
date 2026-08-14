"use client";

import { FormEvent, useState } from "react";
import { Container } from "@/components/layout/Container";
import { ArrowIcon } from "@/components/ui/ArrowIcon";

type ChoiceStep = 1 | 2 | 3;
type Step = ChoiceStep | 4;
type ChoiceKey = "need" | "size" | "experience";

const choiceSteps: Record<ChoiceStep, { question: string; field: ChoiceKey; options: readonly string[] }> = {
  1: {
    question: "What do you need?",
    field: "need",
    options: ["Website redesign", "New website", "Landing page"],
  },
  2: {
    question: "Approximate size",
    field: "size",
    options: ["1 page", "2–5 pages", "6–10 pages", "Not sure yet"],
  },
  3: {
    question: "Desired experience",
    field: "experience",
    options: ["Elegant and straightforward", "Motion and interactions", "Immersive experience"],
  },
};

type FormData = {
  need: string;
  size: string;
  experience: string;
  name: string;
  email: string;
  company: string;
  website: string;
  notes: string;
};

const initialData: FormData = {
  need: "",
  size: "",
  experience: "",
  name: "",
  email: "",
  company: "",
  website: "",
  notes: "",
};

function isChoiceStep(value: Step): value is ChoiceStep {
  return value < 4;
}

export function ProjectFormSection() {
  const [step, setStep] = useState<Step>(1);
  const [data, setData] = useState<FormData>(initialData);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const activeChoiceStep = isChoiceStep(step) ? step : null;

  const choose = (field: ChoiceKey, value: string) => {
    setData((current) => ({ ...current, [field]: value }));
    setError("");
  };

  const continueForm = () => {
    if (isChoiceStep(step)) {
      const current = choiceSteps[step];
      if (!data[current.field]) {
        setError("Choose one option to continue.");
        return;
      }
      setStep((step + 1) as Step);
      setError("");
    }
  };

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (step < 4) {
      continueForm();
      return;
    }

    // TODO: Connect approved production project-intake endpoint.
    if (process.env.NODE_ENV === "development") {
      console.info("Aquarela project inquiry", data);
    }
    setSubmitted(true);
  };

  return (
    <section className="project-form-section" id="start-project" aria-labelledby="project-form-title">
      <Container>
        <div className="form-heading">
          <p className="form-section-index">06 — Conversion</p>
          <h2 id="project-form-title">Ready to change how your brand is <em>perceived?</em></h2>
          <p>Tell us a little about the project.</p>
        </div>

        <div className="form-shell">
          <aside className="form-aside" aria-label="Project information">
            <p><strong>Projects start at €1,500.</strong></p>
            <p>Premium execution.<br />Built for growing businesses.</p>
            <div className="form-progress" role="progressbar" aria-label="Project form progress" aria-valuemin={1} aria-valuemax={4} aria-valuenow={step}>
              {[1, 2, 3, 4].map((number) => (
                <span className={number <= step ? "is-complete" : ""} key={number} />
              ))}
              <span className="sr-only">Step {step} of 4</span>
            </div>
          </aside>

          <form className="project-form" onSubmit={submitForm} noValidate={false}>
            {submitted ? (
              <div className="form-success" role="status">
                <span aria-hidden="true">✓</span>
                <h3>Project received.</h3>
                <p>We&apos;ll be in touch soon.</p>
              </div>
            ) : activeChoiceStep !== null ? (
              <ChoicePanel
                step={activeChoiceStep}
                value={data[choiceSteps[activeChoiceStep].field]}
                onChoose={choose}
                error={error}
              />
            ) : (
              <ContactPanel data={data} setData={setData} />
            )}

            {!submitted && (
              <div className="form-actions">
                {step > 1 && (
                  <button className="button-back" type="button" onClick={() => { setStep((step - 1) as Step); setError(""); }}>
                    Back
                  </button>
                )}
                <button className="button-submit" type={step === 4 ? "submit" : "button"} onClick={isChoiceStep(step) ? continueForm : undefined}>
                  {step === 4 ? "Send project" : "Continue"} <ArrowIcon />
                </button>
              </div>
            )}
          </form>
        </div>
      </Container>
    </section>
  );
}

function ChoicePanel({
  step,
  value,
  onChoose,
  error,
}: {
  step: ChoiceStep;
  value: string;
  onChoose: (field: ChoiceKey, value: string) => void;
  error: string;
}) {
  const config = choiceSteps[step];
  return (
    <fieldset className="choice-panel" aria-describedby={error ? "choice-error" : undefined}>
      <legend>
        <span>Step 0{step}</span>
        {config.question}
      </legend>
      <div className="choice-list">
        {config.options.map((option, index) => {
          const id = `${config.field}-${index}`;
          return (
            <label className={`choice-option${value === option ? " is-selected" : ""}`} htmlFor={id} key={option}>
              <input
                checked={value === option}
                id={id}
                name={config.field}
                onChange={() => onChoose(config.field, option)}
                required
                type="radio"
                value={option}
              />
              <span className="choice-index">0{index + 1}</span>
              <span>{option}</span>
              <span className="choice-indicator" aria-hidden="true" />
            </label>
          );
        })}
      </div>
      {error && <p className="form-error" id="choice-error" role="alert">{error}</p>}
    </fieldset>
  );
}

function ContactPanel({ data, setData }: { data: FormData; setData: React.Dispatch<React.SetStateAction<FormData>> }) {
  const updateField = (field: keyof FormData, value: string) => {
    setData((current) => ({ ...current, [field]: value }));
  };

  return (
    <fieldset className="contact-panel">
      <legend><span>Step 04</span>And where can we reach you?</legend>
      <div className="field-grid">
        <label className="field">
          <span>Name</span>
          <input autoComplete="name" name="name" required value={data.name} onChange={(event) => updateField("name", event.target.value)} />
        </label>
        <label className="field">
          <span>Work email</span>
          <input autoComplete="email" name="email" required type="email" value={data.email} onChange={(event) => updateField("email", event.target.value)} />
        </label>
        <label className="field">
          <span>Company / Brand</span>
          <input autoComplete="organization" name="company" required value={data.company} onChange={(event) => updateField("company", event.target.value)} />
        </label>
        <label className="field">
          <span>Current website <em>— Optional</em></span>
          <input autoComplete="url" inputMode="url" name="website" type="url" value={data.website} onChange={(event) => updateField("website", event.target.value)} />
        </label>
        <label className="field field--wide">
          <span>Anything we should know? <em>— Optional</em></span>
          <textarea name="notes" rows={3} value={data.notes} onChange={(event) => updateField("notes", event.target.value)} />
        </label>
      </div>
    </fieldset>
  );
}
