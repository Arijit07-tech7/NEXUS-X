import { X } from "lucide-react";

export function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  if (!message) return null;
  return <div className="toast" role="status"><span>{message}</span><button aria-label="Close notification" onClick={onClose}><X size={16}/></button></div>;
}