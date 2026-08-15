"use client";

import {
  type Dispatch,
  type FormEvent,
  type SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

import { Container } from "@/components/layout/Container";
import { MOTION_EASE } from "@/components/motion/motion.config";
import { gsap, useGSAP } from "@/components/motion/motion.client";
import { ArrowIcon } from "@/components/ui/ArrowIcon";

type ChoiceStep = 1 | 2 | 3;
type Step = ChoiceStep | 4;
type ChoiceKey = "need" | "size" | "experience";
type Direction = 1 | -1;

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

const INTERACTIVE_CLEAR_PROPS = "opacity,transform,visibility";

function isChoiceStep(value: Step): value is ChoiceStep {
  return value < 4;
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function ProjectFormSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const activeAnimationRef = useRef<gsap.core.Timeline | null>(null);
  const directionRef = useRef<Direction>(1);
  const hasPendingInteractionRef = useRef(false);
  const isMountedRef = useRef(true);
  const isTransitioningRef = useRef(false);
  const [step, setStep] = useState<Step>(1);
  const [data, setData] = useState<FormData>(initialData);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const activeChoiceStep = isChoiceStep(step) ? step : null;

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
      activeAnimationRef.current?.kill();
    };
  }, []);

  const { contextSafe } = useGSAP({ scope: sectionRef });

  useGSAP(
    () => {
      const root = sectionRef.current;
      const panel = root?.querySelector<HTMLElement>("[data-motion='form-panel']");
      const progressValue = root?.querySelector<HTMLElement>("[data-motion='form-progress-value']");
      const progressFill = root?.querySelector<HTMLElement>("[data-motion='form-progress-fill']");

      if (!panel || !progressValue || !progressFill) return;

      if (!hasPendingInteractionRef.current) {
        gsap.set(progressFill, { scaleX: step / 4 });
        return;
      }

      const focusPanel = () => panel.focus({ preventScroll: true });

      if (prefersReducedMotion()) {
        gsap.set(progressFill, { scaleX: step / 4 });
        gsap.set([panel, progressValue], { clearProps: INTERACTIVE_CLEAR_PROPS });
        hasPendingInteractionRef.current = false;
        focusPanel();
        return;
      }

      const mobile = window.matchMedia("(max-width: 767px)").matches;
      const direction = directionRef.current;
      const incomingX = (mobile ? 14 : 20) * direction;
      const legend = panel.querySelector<HTMLElement>("legend");
      const hierarchy = panel.querySelectorAll<HTMLElement>(".choice-option, .field");
      const successCheck = panel.querySelector<HTMLElement>(".form-success-check");
      const successHeading = panel.querySelector<HTMLElement>("h3");
      const successCopy = panel.querySelector<HTMLElement>("p");
      const clearTargets: gsap.TweenTarget[] = [panel, progressValue];

      if (legend) clearTargets.push(legend);
      if (hierarchy.length > 0) clearTargets.push(hierarchy);
      if (successCheck) clearTargets.push(successCheck);
      if (successHeading) clearTargets.push(successHeading);
      if (successCopy) clearTargets.push(successCopy);

      const timeline = gsap.timeline({
        onComplete: () => {
          gsap.set(clearTargets, { clearProps: INTERACTIVE_CLEAR_PROPS });
          focusPanel();
          if (!isMountedRef.current) return;
          hasPendingInteractionRef.current = false;
          isTransitioningRef.current = false;
          setIsTransitioning(false);
        },
      });

      activeAnimationRef.current = timeline;

      if (submitted && successCheck && successHeading && successCopy) {
        timeline
          .fromTo(panel, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.18 })
          .fromTo(
            successCheck,
            { autoAlpha: 0, scale: 0.88 },
            { autoAlpha: 1, scale: 1, duration: 0.46, ease: MOTION_EASE.ui },
            0.04,
          )
          .fromTo(
            successHeading,
            { autoAlpha: 0, y: 18 },
            { autoAlpha: 1, y: 0, duration: 0.48, ease: MOTION_EASE.ui },
            0.16,
          )
          .fromTo(
            successCopy,
            { autoAlpha: 0, y: 12 },
            { autoAlpha: 1, y: 0, duration: 0.4, ease: MOTION_EASE.ui },
            0.27,
          );
      } else {
        timeline.fromTo(
          panel,
          { autoAlpha: 0, x: incomingX },
          { autoAlpha: 1, x: 0, duration: mobile ? 0.46 : 0.5, ease: MOTION_EASE.ui },
        );

        if (legend) {
          timeline.fromTo(
            legend,
            { autoAlpha: 0, y: 12 },
            { autoAlpha: 1, y: 0, duration: 0.36, ease: MOTION_EASE.ui },
            0.08,
          );
        }

        if (hierarchy.length > 0) {
          timeline.fromTo(
            hierarchy,
            { autoAlpha: 0, y: panel.classList.contains("contact-panel") ? 11 : 9 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.34,
              ease: MOTION_EASE.ui,
              stagger: panel.classList.contains("contact-panel") ? 0.04 : 0.045,
            },
            0.14,
          );
        }
      }

      timeline
        .fromTo(
          progressValue,
          { autoAlpha: 0.45, y: 6 },
          { autoAlpha: 1, y: 0, duration: 0.32, ease: MOTION_EASE.ui },
          0,
        )
        .to(
          progressFill,
          { scaleX: step / 4, duration: 0.42, ease: MOTION_EASE.ui },
          0,
        );

      return () => timeline.kill();
    },
    { dependencies: [step, submitted], scope: sectionRef, revertOnUpdate: true },
  );

  useGSAP(
    () => {
      if (!error) return;

      const errorElement = sectionRef.current?.querySelector<HTMLElement>(".form-error");
      if (!errorElement || prefersReducedMotion()) return;

      const tween = gsap.fromTo(
        errorElement,
        { autoAlpha: 0, y: 6 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.3,
          ease: MOTION_EASE.ui,
          onComplete: () => gsap.set(errorElement, { clearProps: INTERACTIVE_CLEAR_PROPS }),
        },
      );

      return () => tween.kill();
    },
    { dependencies: [error], scope: sectionRef, revertOnUpdate: true },
  );

  const choose = (field: ChoiceKey, value: string) => {
    setData((current) => ({ ...current, [field]: value }));
    setError("");
  };

  const transitionToStep = (nextStep: Step, direction: Direction) => {
    contextSafe(() => {
      if (isTransitioningRef.current) return;

      const panel = sectionRef.current?.querySelector<HTMLElement>("[data-motion='form-panel']");
      const reducedMotion = prefersReducedMotion();

      directionRef.current = direction;
      hasPendingInteractionRef.current = true;
      isTransitioningRef.current = true;
      setIsTransitioning(true);
      setError("");

      const commitStep = () => {
        if (!isMountedRef.current) return;
        setStep(nextStep);
        if (reducedMotion) {
          isTransitioningRef.current = false;
          setIsTransitioning(false);
        }
      };

      if (!panel || reducedMotion) {
        commitStep();
        return;
      }

      const mobile = window.matchMedia("(max-width: 767px)").matches;
      const outgoingX = (mobile ? 12 : 18) * -direction;

      activeAnimationRef.current?.kill();
      activeAnimationRef.current = gsap.timeline({ onComplete: commitStep }).to(panel, {
        autoAlpha: 0,
        x: outgoingX,
        duration: 0.24,
        ease: "power2.in",
      });
    })();
  };

  const continueForm = () => {
    if (isTransitioningRef.current || !isChoiceStep(step)) return;

    const current = choiceSteps[step];
    if (!data[current.field]) {
      setError("Choose one option to continue.");
      return;
    }

    transitionToStep((step + 1) as Step, 1);
  };

  const goBack = () => {
    if (isTransitioningRef.current || step === 1) return;
    transitionToStep((step - 1) as Step, -1);
  };

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    contextSafe(() => {
      if (isTransitioningRef.current) return;

      if (step < 4) {
        continueForm();
        return;
      }

      const panel = sectionRef.current?.querySelector<HTMLElement>("[data-motion='form-panel']");
      const reducedMotion = prefersReducedMotion();
      hasPendingInteractionRef.current = true;
      isTransitioningRef.current = true;
      setIsTransitioning(true);

      const commitSubmission = () => {
        if (!isMountedRef.current) return;

        // TODO: Connect approved production project-intake endpoint.
        if (process.env.NODE_ENV === "development") {
          console.info("Aquarela project inquiry", data);
        }
        setSubmitted(true);

        if (reducedMotion) {
          isTransitioningRef.current = false;
          setIsTransitioning(false);
        }
      };

      if (!panel || reducedMotion) {
        commitSubmission();
        return;
      }

      activeAnimationRef.current?.kill();
      activeAnimationRef.current = gsap.timeline({ onComplete: commitSubmission }).to(panel, {
        autoAlpha: 0,
        y: -10,
        duration: 0.25,
        ease: "power2.in",
      });
    })();
  };

  return (
    <section
      ref={sectionRef}
      className="project-form-section"
      data-motion="form-section"
      id="start-project"
      aria-labelledby="project-form-title"
    >
      <Container>
        <div className="form-heading" data-motion="form-heading">
          <h2 data-motion="form-heading-title" id="project-form-title">Ready to change how your brand is <em>perceived?</em></h2>
          <p data-motion="form-heading-copy">Tell us a little about the project.</p>
        </div>

        <div className="form-shell" data-motion="form-shell">
          <aside className="form-aside" data-motion="form-aside" aria-label="Project information">
            <p><strong>Projects start at €1,500.</strong></p>
            <p>Premium execution.<br />Built for growing businesses.</p>
            <div
              className="form-progress"
              data-motion="form-progress"
              role="progressbar"
              aria-label="Project form progress"
              aria-valuemin={1}
              aria-valuemax={4}
              aria-valuenow={step}
            >
              <span data-motion="form-progress-value" aria-hidden="true">0{step} / 04</span>
              <span className="sr-only">Step {step} of 4</span>
              <span className="form-progress-track" aria-hidden="true">
                <span className="form-progress-fill" data-motion="form-progress-fill" />
              </span>
            </div>
          </aside>

          <form className="project-form" onSubmit={submitForm} noValidate={false}>
            {submitted ? (
              <div
                className="form-success"
                data-motion="form-panel"
                key="success"
                role="status"
                tabIndex={-1}
              >
                <span className="form-success-check" aria-hidden="true">✓</span>
                <h3>Project received.</h3>
                <p>We&apos;ll be in touch soon.</p>
              </div>
            ) : activeChoiceStep !== null ? (
              <ChoicePanel
                key={`step-${step}`}
                step={activeChoiceStep}
                value={data[choiceSteps[activeChoiceStep].field]}
                onChoose={choose}
                error={error}
              />
            ) : (
              <ContactPanel key="step-4" data={data} setData={setData} />
            )}

            {!submitted && (
              <div className="form-actions">
                {step > 1 && (
                  <button className="button-back" type="button" disabled={isTransitioning} onClick={goBack}>
                    Back
                  </button>
                )}
                <button
                  className="button-submit"
                  type={step === 4 ? "submit" : "button"}
                  disabled={isTransitioning}
                  onClick={isChoiceStep(step) ? continueForm : undefined}
                >
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
    <fieldset
      className="choice-panel"
      data-motion="form-panel"
      aria-describedby={error ? "choice-error" : undefined}
      tabIndex={-1}
    >
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
              <span className="choice-label">{option}</span>
              <span className="choice-indicator" aria-hidden="true" />
            </label>
          );
        })}
      </div>
      {error && <p className="form-error" id="choice-error" role="alert">{error}</p>}
    </fieldset>
  );
}

function ContactPanel({ data, setData }: { data: FormData; setData: Dispatch<SetStateAction<FormData>> }) {
  const updateField = (field: keyof FormData, value: string) => {
    setData((current) => ({ ...current, [field]: value }));
  };

  return (
    <fieldset className="contact-panel" data-motion="form-panel" tabIndex={-1}>
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
