import { ArrowLeft, Beaker, CheckCircle2, Clock3, Cpu, Fingerprint, LockKeyhole, Radio, RotateCcw, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { useState } from "react";

export function Demo({ onBack }: { onBack: () => void }) {
  const [running, setRunning] = useState(false);
  const run = () => {
    if (running) return;
    setRunning(true);
    window.setTimeout(() => setRunning(false), 1800);
  };
  return <main className="section-shell page demo-page">
    <div className="page-top"><button className="back-btn" onClick={onBack}><ArrowLeft size={16}/> Back to NEXUS</button><span className="demo-badge"><Beaker size={14}/> DEMO / SANDBOX</span></div>

    <div className="page-title demo-title"><span className="eyebrow">CONTROLLED SIMULATION ENVIRONMENT</span><h1>Experience the <span>Trust Layer.</span></h1><p>Explore the NEXUS-X workflow in a completely isolated sandbox. Every value below is illustrative, no wallet approval is requested, and no blockchain transaction is submitted.</p></div>

    <div className="demo-hero glass-card">
      <div className="demo-hero-copy"><span className="eyebrow">01 / SIMULATION ENGINE</span><h2>{running ? "Executing a simulated trust flow…" : "A live-looking interface. Zero fake blockchain claims."}</h2><p>The demo mirrors the product experience while keeping production state and sandbox state visibly separated.</p><div className="demo-actions"><button className="primary-btn" onClick={run} disabled={running}><Zap size={15}/>{running ? "Processing…" : "Run simulation"}</button><button className="secondary-btn" onClick={() => window.scrollTo({ top: 520, behavior: "smooth" })}>View modules <ArrowLeft size={15} style={{ transform: "rotate(-90deg)" }}/></button></div></div>
      <div className={running ? "demo-core active" : "demo-core"}><div className="demo-core-ring ring-a"/><div className="demo-core-ring ring-b"/><div className="demo-core-center"><Sparkles size={19}/><strong>NX</strong><small>{running ? "PROCESSING" : "SANDBOX"}</small></div><span className="demo-node n1"/><span className="demo-node n2"/><span className="demo-node n3"/></div>
    </div>

    <div className="demo-grid demo-modules">
      <div className="glass-card demo-card"><div className="demo-card-top"><Radio/><span>NETWORK ACTIVITY</span></div><strong>Simulation active</strong><small>Mock execution stream</small><div className="mock-bars"><i/><i/><i/><i/><i/></div></div>
      <div className="glass-card demo-card"><div className="demo-card-top"><Clock3/><span>SETTLEMENT</span></div><strong>12.4 sec</strong><small>Illustrative timing only</small><div className="demo-state"><CheckCircle2/> Simulated confirmation</div></div>
      <div className="glass-card demo-card"><div className="demo-card-top"><Cpu/><span>EXECUTION</span></div><strong>{running ? "Running…" : "Ready"}</strong><small>No wallet request</small><div className="demo-mini-progress"><span className={running ? "fill running" : "fill"}/></div></div>
    </div>

    <section className="demo-details">
      <div className="section-heading"><div><span className="eyebrow">02 / PREMIUM MODULES</span><h2>Built to feel <span>real.</span> Designed to stay truthful.</h2></div><p>These modules demonstrate the product language without pretending to be live infrastructure.</p></div>
      <div className="demo-feature-grid">
        <article className="glass-card demo-feature"><div><ShieldCheck/></div><h3>Trust-aware states</h3><p>Clear distinction between connected wallet state, configured infrastructure and simulation state.</p><span>STATE VISIBILITY</span></article>
        <article className="glass-card demo-feature"><div><Fingerprint/></div><h3>Identity boundary</h3><p>Public wallet identity can be represented without ever requesting private credentials or seed phrases.</p><span>NON-CUSTODIAL</span></article>
        <article className="glass-card demo-feature"><div><LockKeyhole/></div><h3>Secure by default</h3><p>Demo actions stay local to the interface and never send a transaction to an external network.</p><span>NO TRANSACTION</span></article>
        <article className="glass-card demo-feature"><div><RotateCcw/></div><h3>Replayable flow</h3><p>Run the same sandbox sequence repeatedly to preview loading, processing and completion states.</p><span>REPEATABLE</span></article>
      </div>
    </section>

    <div className="warning-box demo-warning"><b>DEMO ONLY</b><span>Values, timings and transaction states on this page are simulated. Production screens must only display verified provider, RPC or contract data.</span></div>
  </main>;
}
