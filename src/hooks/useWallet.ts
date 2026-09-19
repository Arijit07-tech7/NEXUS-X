import { useCallback, useEffect, useState } from "react";
import { chainName } from "../lib/chains";
import type { Eip1193Provider, WalletState } from "../types/wallet";

declare global {
  interface Window {
    ethereum?: Eip1193Provider;
  }
}

const initial: WalletState = { address: "", chainId: "", chainName: "", connected: false };

export function useWallet() {
  const [wallet, setWallet] = useState<WalletState>(initial);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    const provider = window.ethereum;
    if (!provider) return;
    try {
      const accounts = (await provider.request({ method: "eth_accounts" })) as string[];
      const id = (await provider.request({ method: "eth_chainId" })) as string;
      setWallet({ address: accounts[0] ?? "", chainId: id, chainName: chainName(id), connected: Boolean(accounts[0]) });
    } catch {
      setError("Unable to read wallet state.");
    }
  }, []);

  const connect = useCallback(async () => {
    setError("");
    const provider = window.ethereum;
    if (!provider) {
      setError("No compatible wallet detected. Install or enable an EVM wallet to continue.");
      return;
    }
    setBusy(true);
    try {
      const accounts = (await provider.request({ method: "eth_requestAccounts" })) as string[];
      const id = (await provider.request({ method: "eth_chainId" })) as string;
      setWallet({ address: accounts[0] ?? "", chainId: id, chainName: chainName(id), connected: Boolean(accounts[0]) });
    } catch (e) {
      const message = e instanceof Error ? e.message : "Connection failed. Please try again.";
      setError(message.includes("rejected") ? "Connection request was rejected." : "Connection failed. Please try again.");
    } finally {
      setBusy(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    // Injected wallets generally do not expose programmatic disconnect.
    // Clear the application's session without touching the user's wallet.
    setWallet(initial);
  }, []);

  const switchChain = useCallback(async (id: string) => {
    if (!window.ethereum) { setError("No compatible wallet detected."); return; }
    setError("");
    try {
      await window.ethereum.request({ method: "wallet_switchEthereumChain", params: [{ chainId: id }] });
      await refresh();
    } catch {
      setError("Network switch was not completed by the wallet.");
    }
  }, [refresh]);

  useEffect(() => {
    void refresh();
    const provider = window.ethereum;
    if (!provider?.on) return;
    const onAccounts = () => void refresh();
    const onChain = () => void refresh();
    provider.on("accountsChanged", onAccounts);
    provider.on("chainChanged", onChain);
    return () => {
      provider.removeListener?.("accountsChanged", onAccounts);
      provider.removeListener?.("chainChanged", onChain);
    };
  }, [refresh]);

  return { wallet, busy, error, connect, disconnect, switchChain, refresh };
}