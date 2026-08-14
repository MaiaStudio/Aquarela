function BrowserBar({ after = false }: { after?: boolean }) {
  return (
    <div className={`browser-bar${after ? " browser-bar--after" : ""}`} aria-hidden="true">
      <span className="browser-dots"><i /><i /><i /></span>
      <span className="browser-address" />
      <span className="browser-menu" />
    </div>
  );
}

export function ProjectComparisonPlaceholder() {
  return (
    <div className="comparison" role="img" aria-label="Neutral visual comparison showing a basic before interface and a refined after interface">
      {/* TODO: Replace neutral comparison artwork with approved Aquarela case-study assets. */}
      <div className="comparison-panel comparison-before" data-motion="comparison-before">
        <BrowserBar />
        <div className="before-ui" aria-hidden="true">
          <div className="before-nav"><span className="skeleton short" /><span className="before-links"><i /><i /><i /></span></div>
          <div className="before-content">
            <span className="skeleton eyebrow" />
            <span className="skeleton headline" />
            <span className="skeleton headline headline-short" />
            <span className="skeleton copy" />
            <span className="skeleton copy copy-short" />
            <span className="before-button" />
          </div>
          <div className="before-box" />
        </div>
      </div>
      <div className="comparison-panel comparison-after" data-motion="comparison-after">
        <BrowserBar after />
        <div className="after-ui" aria-hidden="true">
          <div className="after-nav"><span className="after-mark">A.</span><span className="after-nav-rule" /><span className="after-nav-cta" /></div>
          <div className="after-number">01</div>
          <div className="after-display">
            <span>Shape</span>
            <span>perception<span className="after-period">.</span></span>
          </div>
          <div className="after-orbit"><span /></div>
          <div className="after-caption"><i /><span /></div>
        </div>
      </div>
    </div>
  );
}
