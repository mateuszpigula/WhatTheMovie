import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { ChatMessage, ChatMessageImages } from "./chat.interface";
import { DistributiveOmit } from "@/types";

const initialMessages: ChatMessage[] = [
  {
    id: uuidv4(),
    from: "bot",
    type: "text",
    content:
      "Hi! Tell me about the movie you're looking for. You can set filters to make the results more precise",
  },
  {
    id: uuidv4(),
    from: "bot",
    type: "text",
    content:
      "Example:\nGuy is not guilty and has life sentence, he's waiting for the death on chair and is accused of killing some children. He's black and movie is really popular.\n\nFilters:\nLanguage: English \nRelease: 10+ years",
  },
  // {
  //   from: "user",
  //   text: "Future times, big corn fields. There's is sort of apocalypse on the Earth. Guy travels in the space to find the proper planet to colonise. It takes him a few year but it is decades on earth. We can say he time travels.",
  // },
  // {
  //   from: "bot",
  //   text: "Great! Depending on that I think it’s one of these. Click to see more details.",
  // },
];

export const useMessages = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);

  const addMessage = (messageData: DistributiveOmit<ChatMessage, "id">) => {
    setMessages((prev) => [
      ...prev,
      {
        id: uuidv4(),
        ...messageData,
      },
    ]);
  };

  const addUserMessage = (message: string, meta?: ChatMessage["meta"]) => {
    addMessage({
      type: "text",
      from: "user",
      content: message,
      meta,
    });
  };

  const addBotMessage = (message: string) => {
    addMessage({
      type: "text",
      from: "bot",
      content: message,
    });
  };

  const addImagesMessage = (images: ChatMessageImages["images"], from: ChatMessage["from"]) => {
    addMessage({
      type: "image",
      from,
      images,
    });
  };

  return {
    messages,
    addUserMessage,
    addBotMessage,
    addImagesMessage,
  };
};
