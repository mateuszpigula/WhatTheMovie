import { clsxm } from "@/utils/clsxm";
import { ChatMessage, ChatMessageImages } from "../../chat.interface";
import { ClassValue } from "clsx";

interface Props {
  message: ChatMessageImages;
  from: ChatMessage["from"];
  className?: ClassValue;
}

export const ImagesMessage = ({ message, from, className }: Props) => {
  return (
    <ul className="flex overflow-auto gap-4 items-start">
      {message.images.map((image) => {
        return (
          <li
            key={image.src}
            className={clsxm(
              "p-3 bg-zinc-100 rounded-xl min-w-[140px] max-w-[200px] mb-1 last:mb-4 flex-shrink-0",
              {
                "bg-zinc-200": from === "user",
                "ml-auto": from === "user",
              },
              className,
            )}
            style={{
              width: `calc((100vw - 2rem) / ${message.images.length} - 1rem)`,
              aspectRatio: 7 / 10,
            }}
          >
            <img src={image.src} alt={image.alt} className="object-cover h-full w-full" />
          </li>
        );
      })}
    </ul>
  );
};
