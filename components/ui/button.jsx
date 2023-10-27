import { twMerge } from "tailwind-merge";

export default function Button({ className, children }) {
  return <button className={twMerge("shrink-0 bg-amaranth border border-amaranth-700 hover:bg-amaranth-600 h-12 px-6 text-white font-bold rounded flex items-center gap-2 transition-all active:scale-95 hover:shadow disabled:contrast-50 disabled:cursor-not-allowed", className)}>{children}</button>;
}
