type SectionLabelProps = {
  index: string;
  children: React.ReactNode;
  inverse?: boolean;
};

export function SectionLabel({ index, children, inverse = false }: SectionLabelProps) {
  return (
    <div className={`section-label${inverse ? " section-label--inverse" : ""}`}>
      <span>{index}</span>
      <span>{children}</span>
    </div>
  );
}
