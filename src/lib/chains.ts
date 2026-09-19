export const CHAINS: Record<string, { name: string; native: string }> = {
  "0x1": { name: "Ethereum", native: "ETH" },
  "0x89": { name: "Polygon", native: "POL" },
  "0xa4b1": { name: "Arbitrum One", native: "ETH" },
  "0x2105": { name: "Base", native: "ETH" }
};

export function chainName(chainId: string): string {
  return CHAINS[chainId]?.name ?? `Chain ${parseInt(chainId, 16) || chainId}`;
}