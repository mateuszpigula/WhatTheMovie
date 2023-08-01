"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { completion } from "./openai.service";
import { getMovieDetails, parseMovies } from "./movies.service";
import { Button } from "@/components/Button/Button";
import { Message } from "./components/Message/Message";
import { clsxm } from "@/utils/clsxm";
import { ChatMessage } from "./chat.interface";
import { Input } from "@/components/Input/Input";
import { useMessages } from "./useMessages";

export default function Chat() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomElRef = useRef<HTMLDivElement>(null);
  const { messages, addUserMessage, addBotMessage } = useMessages();

  async function askChat(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const message = (e.currentTarget.elements.namedItem("message") as HTMLInputElement).value;
    setInput("");
    addUserMessage(message);
    setLoading(true);

    try {
      const openAiResponse = await completion(message);
      const movies = parseMovies(openAiResponse);
      const moviesDetails = await Promise.all(movies.map((movie) => getMovieDetails(movie)));

      // TODO: remove this timeout
      await new Promise((resolve) => setTimeout(resolve, 3000));
      moviesDetails.forEach((movie) => {
        addBotMessage(movie.title);
      });
    } catch (e) {
      // TODO: handle error with toast
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (bottomElRef.current) {
      bottomElRef?.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  return (
    <div>
      <div className="w-full h-20 bg-zinc-100 fixed left-0 top-0" />

      <form onSubmit={askChat} className="flex flex-col px-4 pt-24 pb-20">
        {messages.map((message, index) => {
          const prevMsg = messages[index - 1];
          const nextMsg = messages[index + 1];

          return (
            <Message
              key={index}
              type={message.type}
              cancelBorderTop={prevMsg?.type === message.type}
              cancelBorderBottom={nextMsg?.type === message.type}
              className={clsxm({
                "mb-6": nextMsg && nextMsg.type !== message.type,
              })}
            >
              {message.text}
            </Message>
          );
        })}

        {/* TODO: add filters */}
        {/* <Button className="w-3/4 mb-6">Set Filters</Button> */}

        {/* TODO: Add animation to loading */}
        {loading && (
          <Message type="bot" className="mt-6">
            Loading...
          </Message>
        )}

        <div ref={bottomElRef} aria-hidden />
        <div className="fixed bottom-0 w-full p-3 flex justify-center left-0 bg-zinc-100">
          <Input
            placeholder="What movie are you looking for?"
            className="w-full"
            name="message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          {/* TODO: Change footer state after submit */}
          {/* <Button type="submit">Submit</Button> */}
        </div>
      </form>
    </div>
  );
}
