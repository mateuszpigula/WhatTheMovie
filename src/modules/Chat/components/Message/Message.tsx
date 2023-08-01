import { clsxm } from "@/utils/clsxm";
import { ClassValue } from "clsx";

interface Props {
  children: React.ReactNode;
  type: "user" | "bot";
  cancelBorderTop?: boolean;
  cancelBorderBottom?: boolean;
  className?: ClassValue;
}

export const Message = ({
  children,
  type,
  cancelBorderTop = false,
  cancelBorderBottom = false,
  className,
}: Props) => {
  return (
    <div
      className={clsxm(
        "p-3 bg-zinc-100 rounded-xl w-3/4 mb-1 last:mb-4 whitespace-pre-line",
        {
          "rounded-tl-none": cancelBorderTop,
          "rounded-bl-none": cancelBorderBottom,
          "bg-zinc-200": type === "user",
          "ml-auto": type === "user",
        },
        className,
      )}
    >
      {children}
    </div>
  );
};
