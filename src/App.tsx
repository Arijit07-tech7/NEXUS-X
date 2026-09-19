import { useCallback, useEffect, useState } from "react";
import { BookOpen, Code2, FileCode2, Menu, Shield, WalletCards, X } from "lucide-react";
import { Splash } from "./components/Splash";
import { Toast } from "./components/Toast";
import { WalletModal } from "./components/WalletModal";
import { Demo } from "./pages/Demo";
import { Home } from "./pages/Home";
import { useWallet } from "./hooks/useWallet";

export default function App() {
  const [splash, setSplash] = useState(true);
  const [page, setPage] = useState<"home"|"demo">("home");
  const [walletOpen, setWalletOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [toast, setToast] = useState("");
  const { wallet, busy, error, connect, disconnect, switchChain } = useWallet();

  useEffect(() => { if (error) setToast(error); }, [error]);
  const notifyCopy = async () => { if (!wallet.address) { setToast("Connect a wallet first."); return; } await navigator.clipboard?.writeText(wallet.address); setToast("Wallet address copied."); };
  const doConnect = async () => { await connect(); };
  const nav = (target: "home"|"demo") => { setPage(target); setMobile(false); window.scrollTo({top:0, behavior:"smooth"}); };

  const done = useCallback(() => setSplash(false), []);
  if (splash) return <Splash onDone={done}/>;

  return <div className="app">
    <header className="navbar"><div className="nav-inner"><button className="brand" onClick={() => nav("home")} aria-label="NEXUS-X home"><span className="brand-mark">NX</span><span><strong>NEXUS-X</strong><small>THE TRUST LAYER</small></span></button>
      <nav className={mobile ? "nav-links open" : "nav-links"}><button onClick={() => nav("home")}>Protocol</button><button onClick={() => document.getElementById("security")?.scrollIntoView({behavior:"smooth"})}>Security</button><button onClick={() => document.getElementById("developers")?.scrollIntoView({behavior:"smooth"})}>Developers</button><button onClick={() => setToast("Documentation is not configured in this standalone build.")}>Docs</button></nav>
      <div className="nav-right"><div className="network-chip"><i/> EVM READY</div>{wallet.connected ? <button className="wallet-chip" onClick={() => setWalletOpen(true)}><WalletCards size={16}/>{wallet.address.slice(0,5)}…{wallet.address.slice(-4)}</button> : <button className="connect-btn" onClick={doConnect} disabled={busy}>{busy ? "Connecting…" : "Connect Wallet"}</button>}</div>
      <button className="menu-btn" onClick={() => setMobile(v=>!v)} aria-label="Toggle navigation">{mobile ? <X/> : <Menu/>}</button>
    </div></header>
    {page === "home" ? <Home wallet={wallet} onConnect={doConnect} onOpenWallet={() => setWalletOpen(true)} onDemo={() => nav("demo")}/> : <Demo onBack={() => nav("home")}/>}
    <Toast message={toast} onClose={() => setToast("")}/>
    {walletOpen && wallet.connected && <WalletModal wallet={wallet} onClose={() => setWalletOpen(false)} onDisconnect={disconnect} onSwitch={switchChain} onCopy={notifyCopy}/>}
  </div>;
}