import { clsxm } from "@/utils/clsxm";
import { ClassValue } from "clsx";
import { ChatMessage } from "../../chat.interface";

interface Props {
  children: React.ReactNode;
  from: ChatMessage["from"];
  cancelBorderTop?: boolean;
  cancelBorderBottom?: boolean;
  className?: ClassValue;
}

export const Message = ({
  children,
  from,
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
          "bg-zinc-200": from === "user",
          "ml-auto": from === "user",
        },
        className,
      )}
    >
      {children}
    </div>
  );
};
