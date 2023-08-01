import { clsxm } from "@/utils/clsxm";
import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input = ({ className, type = "text", ...props }: Props) => {
  return (
    <input
      {...props}
      className={clsxm(
        "px-4 py-2 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-300 text-zinc-800 placeholder:text-zinc-700",
        className,
      )}
    />
  );
};
