import { clsxm } from "@/utils/clsxm";
import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button = ({ children, className, ...props }: Props) => {
  return (
    <button
      type="button"
      {...props}
      className={clsxm(
        "uppercase bg-slate-50 rounded-xl px-6 py-4 text-zinc-900 font-medium",
        className,
      )}
    >
      {children}
    </button>
  );
};
