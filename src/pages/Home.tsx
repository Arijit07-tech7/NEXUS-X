import {
ArrowRight,
Blocks,
CheckCircle2,
Code2,
Fingerprint,
GitBranch,
LockKeyhole,
ShieldCheck,
Sparkles,
Zap,
} from "lucide-react";
import { useState } from "react";
import type { WalletState } from "../types/wallet";

const features = [
[
"Privacy-preserving execution",
"Sensitive intent stays with the user while settlement remains verifiable.",
LockKeyhole,
],
[
"Cross-chain coordination",
"A unified trust surface for multi-network workflows and settlement.",
GitBranch,
],
[
"Verifiable security",
"Clear wallet boundaries, explicit transaction states and auditable protocol paths.",
ShieldCheck,
],
[
"Developer-native",
"Composable primitives designed for teams building the next generation of on-chain products.",
Code2,
],
] as const;

export function Home({
wallet,
onConnect,
onOpenWallet,
onDemo,
}: {
wallet: WalletState;
onConnect: () => void;
onOpenWallet: () => void;
onDemo: () => void;
}) {
const [copied, setCopied] = useState(false);

const copy = async () => {
if (!wallet.address) return;

await navigator.clipboard?.writeText(wallet.address);
setCopied(true);
window.setTimeout(() => setCopied(false), 1300);

};

return ( <main> <section className="hero section-shell"> <div className="hero-copy"> <div className="live-pill"> <span className="pulse-dot" /> NETWORK LIVE <em>•</em> EVM READY </div>


      <h1>
        The <span>Trust Layer.</span>
      </h1>

      <p className="hero-sub">Private. Cross-chain. Intelligent.</p>

      <p className="hero-body">
        Move value across blockchains with privacy-preserving execution,
        intelligent risk analysis and verifiable settlement.
      </p>

      <div className="hero-actions">
        {wallet.connected ? (
          <button className="primary-btn" onClick={onOpenWallet}>
            <span>
              {wallet.address.slice(0, 6)}…{wallet.address.slice(-4)}
            </span>
            <ArrowRight />
          </button>
        ) : (
          <button className="primary-btn" onClick={onConnect}>
            Launch NEXUS <ArrowRight />
          </button>
        )}

        <button
          className="secondary-btn"
          onClick={() =>
            document
              .getElementById("protocol")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          Explore Protocol <Sparkles size={16} />
        </button>
      </div>

      <div className="hero-trust">
        <CheckCircle2 size={15} /> Non-custodial by design <span />{" "}
        <Fingerprint size={15} /> Provider-signed <span />{" "}
        <Sparkles size={15} /> Demo isolated
      </div>
    </div>

    <div className="hero-visual">
      <div className="orbital orbital-a" />
      <div className="orbital orbital-b" />

      <div className="core">
        <div className="core-mark">NX</div>
        <span>
          TRUST
          <br />
          CORE
        </span>
      </div>

      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div key={i} className={`node node-${i}`}>
          <span />
        </div>
      ))}

      <div className="flow flow-1" />
      <div className="flow flow-2" />

      <div className="visual-card vc-top">
        <small>PROTOCOL STATE</small>
        <strong>VERIFIABLE</strong>
        <i />
      </div>

      <div className="visual-card vc-bottom">
        <small>EXECUTION</small>
        <strong>NON-CUSTODIAL</strong>
        <span>
          0x…{wallet.connected ? wallet.address.slice(-4) : "----"}
        </span>
      </div>
    </div>
  </section>

  <section className="metrics section-shell">
    <div>
      <span>NETWORK</span>
      <strong>{wallet.connected ? wallet.chainName : "Not connected"}</strong>
    </div>

    <div>
      <span>WALLET</span>
      <strong>{wallet.connected ? "Connected" : "Not connected"}</strong>
    </div>

    <div>
      <span>SETTLEMENT</span>
      <strong>Verifiable</strong>
    </div>

    <div>
      <span>MODE</span>
      <strong>Production UI</strong>
    </div>
  </section>

  <section id="protocol" className="section-shell section">
    <div className="section-heading">
      <div>
        <span className="eyebrow">01 / PROTOCOL</span>
        <h2>
          Infrastructure built around <span>trust.</span>
        </h2>
      </div>

      <p>
        NEXUS-X is a premium interface for secure, transparent on-chain
        workflows. Live protocol values remain blank until a real provider
        or contract is configured.
      </p>
    </div>

    <div className="feature-grid">
      {features.map(([title, text, Icon]) => (
        <article className="glass-card feature" key={title}>
          <div className="feature-icon">
            <Icon />
          </div>

          <span className="card-index">
            0{features.indexOf([title, text, Icon] as never) + 1}
          </span>

          <h3>{title}</h3>
          <p>{text}</p>

          <button
            onClick={() =>
              document
                .getElementById("security")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Read layer <ArrowRight size={15} />
          </button>
        </article>
      ))}
    </div>
  </section>

  <section
    id="security"
    className="section-shell section split-section"
  >
    <div className="security-panel glass-card">
      <span className="eyebrow">02 / SECURITY</span>

      <h2>
        Wallet boundaries are <span>non-negotiable.</span>
      </h2>

      <p>
        Your wallet remains the signing authority. NEXUS-X only receives
        public account and network information from an injected EVM
        provider.
      </p>

      <div className="security-list">
        <div>
          <ShieldCheck /> No private-key collection
        </div>
        <div>
          <LockKeyhole /> No seed-phrase storage
        </div>
        <div>
          <CheckCircle2 /> No fabricated confirmations
        </div>
      </div>
    </div>

    <div className="terminal glass-card">
      <div className="terminal-top">
        <span>
          <i /> NEXUS / PROVIDER
        </span>
        <span>SECURE CHANNEL</span>
      </div>

      <div className="terminal-body">
        <p>
          <b>01</b> provider.detected{" "}
          <strong>→ {window.ethereum ? "true" : "false"}</strong>
        </p>

        <p>
          <b>02</b> signer.mode <strong>→ external-wallet</strong>
        </p>

        <p>
          <b>03</b> private.key <strong>→ never-accessed</strong>
        </p>

        <p>
          <b>04</b> transaction.status{" "}
          <strong>→ user-controlled</strong>
        </p>

        <p>
          <b>05</b> protocol.contract{" "}
          <strong>→ not-configured</strong>
        </p>
      </div>
    </div>
  </section>

  <section
    id="developers"
    className="section-shell section developer-band"
  >
    <div>
      <span className="eyebrow">03 / DEVELOPERS</span>
      <h2>Build on a trust-first foundation.</h2>
      <p>
        Wallet-aware UX, truthful state handling and a clean boundary
        between production integrations and sandbox simulations.
      </p>
    </div>

    <div className="dev-actions">
      <button className="secondary-btn" onClick={onDemo}>
        Open Sandbox <Blocks size={16} />
      </button>

      <button
        className="ghost-btn"
        onClick={() => {
          void copy();
        }}
      >
        Copy wallet {copied ? "✓" : ""}
      </button>
    </div>
  </section>

  <footer className="footer section-shell">
    <div>
      <strong>NEXUS-X</strong>
      <span>THE TRUST LAYER</span>
    </div>

    <p>© 2026 NEXUS-X. Interface for verifiable Web3 infrastructure.</p>

    <span>NON-CUSTODIAL • EVM</span>
  </footer>
</main>


);
}
