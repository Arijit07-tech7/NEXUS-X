import { useEffect, useState } from "react";

export function Splash({ onDone }: { onDone: () => void }) {
  const [out, setOut] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setOut(true), 1750);
    const d = window.setTimeout(onDone, 2180);
    return () => { clearTimeout(t); clearTimeout(d); };
  }, [onDone]);

  return <div className={out ? "splash splash-out" : "splash"} aria-label="Loading NEXUS-X">
    <div className="splash-noise" />
    <div className="splash-grid" />
    <div className="splash-scan" />
    <div className="splash-particles" aria-hidden="true">
      {Array.from({ length: 18 }, (_, i) => <i key={i} style={{ "--i": i } as React.CSSProperties} />)}
    </div>
    <div className="splash-center">
      <div className="splash-orbit orbit-one" />
      <div className="splash-orbit orbit-two" />
      <div className="splash-core">
        <span className="splash-core-glow" />
        <strong>NX</strong>
        <small>TRUST<br/>CORE</small>
      </div>
    </div>
    <div className="splash-brand">
      <strong>NEXUS-X</strong>
      <small>THE TRUST LAYER</small>
      <div className="splash-line"><span /></div>
    </div>
    <div className="splash-status"><i/> ESTABLISHING SECURE SESSION <b>01 / 04</b></div>
  </div>;
}
