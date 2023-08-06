import { clsxm } from "@/utils/clsxm";
import { ClassValue } from "clsx";
import { ChatMessage } from "../../chat.interface";

interface Props {
  children: React.ReactNode;
  from: ChatMessage["from"];
  cancelBorderTop?: boolean;
  cancelBorderBottom?: boolean;
  className?: ClassValue;
  meta?: ChatMessage["meta"];
}

export const Message = ({
  children,
  from,
  cancelBorderTop = false,
  cancelBorderBottom = false,
  className,
  meta,
}: Props) => {
  return (
    <>
      {meta && (
        <span
          className={clsxm("block italic text-sm mb-0.5", {
            "text-right": from === "user",
          })}
        >
          {meta}
        </span>
      )}
      <div
        className={clsxm(
          "p-3 bg-zinc-100 rounded-xl w-3/4 mb-1 last:mb-4 whitespace-pre-line relative",
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
    </>
  );
};
