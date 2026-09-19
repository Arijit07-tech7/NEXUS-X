import { Copy, LogOut, Network, X } from "lucide-react";
import { CHAINS } from "../lib/chains";
import type { WalletState } from "../types/wallet";

function short(a: string) {
return a ? `${a.slice(0, 6)}…${a.slice(-4)}` : "";
}

export function WalletModal({
wallet,
onClose,
onDisconnect,
onSwitch,
onCopy,
}: {
wallet: WalletState;
onClose: () => void;
onDisconnect: () => void;
onSwitch: (id: string) => void;
onCopy: () => void;
}) {
return ( <div className="modal-backdrop" onMouseDown={onClose}>
<section
className="wallet-modal"
onMouseDown={(e) => e.stopPropagation()}
role="dialog"
aria-modal="true"
aria-label="Wallet"
> <div className="modal-head"> <div> <span className="eyebrow">WALLET SESSION</span> <h3>Connected identity</h3> </div>

      <button
        className="icon-btn"
        onClick={onClose}
        aria-label="Close"
      >
        <X />
      </button>
    </div>

    <div className="address-box">
      <div className="wallet-orb">◆</div>

      <div>
        <span>PUBLIC ADDRESS</span>
        <strong>{short(wallet.address)}</strong>
      </div>

      <button
        className="icon-btn"
        onClick={onCopy}
        aria-label="Copy address"
      >
        <Copy size={17} />
      </button>
    </div>

    <div className="network-box">
      <div>
        <span>ACTIVE NETWORK</span>
        <strong>{wallet.chainName}</strong>
      </div>

      <Network size={19} />
    </div>

    <div className="chain-grid">
      {Object.entries(CHAINS).map(([id, c]) => (
        <button
          key={id}
          className={wallet.chainId === id ? "chain active" : "chain"}
          onClick={() => onSwitch(id)}
        >
          <span>{c.name}</span>
          <small>{c.native}</small>
        </button>
      ))}
    </div>

    <button
      className="danger-btn"
      onClick={() => {
        onDisconnect();
        onClose();
      }}
    >
      <LogOut size={17} /> Disconnect session
    </button>

    <p className="modal-note">
      NEXUS-X never requests, stores, or transmits private keys, seed
      phrases, or wallet passwords. Signing remains inside your wallet
      provider.
    </p>
  </section>
</div>


);
}
