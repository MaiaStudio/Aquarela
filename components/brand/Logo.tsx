import Link from "next/link";

type LogoProps = {
  inverse?: boolean;
};

export function Logo({ inverse = false }: LogoProps) {
  return (
    <Link className={`wordmark${inverse ? " wordmark--inverse" : ""}`} href="#top" aria-label="Aquarela Design, back to top">
      Aquarela
    </Link>
  );
}
