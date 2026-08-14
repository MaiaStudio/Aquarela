import Link from "next/link";

type LogoProps = {
  inverse?: boolean;
  motionId?: string;
};

export function Logo({ inverse = false, motionId }: LogoProps) {
  return (
    <Link
      className={`wordmark${inverse ? " wordmark--inverse" : ""}`}
      href="#top"
      aria-label="Aquarela Design, back to top"
      data-motion={motionId}
    >
      Aquarela
    </Link>
  );
}
