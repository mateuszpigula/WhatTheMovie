import { useState } from "react";
import { ChatMessage } from "./chat.interface";

const initialMessages: ChatMessage[] = [
  {
    type: "bot",
    text: "Hi! Tell me about the movie you're looking for. You can set filters to make the results more precise",
  },
  {
    type: "bot",
    text: "Example:\nGuy is not guilty and has life sentence, he's waiting for the death on chair and is accused of killing some children. He's black and movie is really popular.\n\nFilters:\nLanguage: English \nRelease: 10+ years",
  },
  // {
  //   type: "user",
  //   text: "Future times, big corn fields. There's is sort of apocalypse on the Earth. Guy travels in the space to find the proper planet to colonise. It takes him a few year but it is decades on earth. We can say he time travels.",
  // },
  // {
  //   type: "bot",
  //   text: "Great! Depending on that I think it’s one of these. Click to see more details.",
  // },
];

export const useMessages = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);

  const addUserMessage = (message: string) => {
    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        text: message,
      },
    ]);
  };

  const addBotMessage = (message: string) => {
    setMessages((prev) => [
      ...prev,
      {
        type: "bot",
        text: message,
      },
    ]);
  };

  return {
    messages,
    addUserMessage,
    addBotMessage,
  };
};
