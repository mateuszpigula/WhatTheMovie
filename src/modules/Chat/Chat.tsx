"use client";

import { useEffect, useRef } from "react";

import { Button } from "@/components/Button/Button";
import { Message } from "./components/Message/Message";
import { clsxm } from "@/utils/clsxm";
import { Input } from "@/components/Input/Input";
import { ImagesMessage } from "./components/ImagesMessage/ImagesMessage";
import { useChat } from "./useChat";

export default function Chat() {
  const bottomElRef = useRef<HTMLDivElement>(null);
  const { chatState, messages, askChat, resetChat, handleInputChange, handleSuccessfulResults } =
    useChat();

  useEffect(() => {
    if (bottomElRef.current) {
      bottomElRef?.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, chatState]);

  return (
    <div>
      <div className="w-full h-20 bg-zinc-100 fixed left-0 top-0" />

      <form onSubmit={askChat} className="flex flex-col px-4 pt-24 pb-20">
        {messages.map((message, index) => {
          const prevMsg = messages[index - 1];
          const nextMsg = messages[index + 1];

          if (message.type === "image") {
            return <ImagesMessage key={message.id} message={message} from={message.from} />;
          }

          return (
            <Message
              key={message.id}
              from={message.from}
              cancelBorderTop={prevMsg?.from === message.from}
              cancelBorderBottom={nextMsg?.from === message.from}
              className={clsxm({
                "mb-6": nextMsg && nextMsg.from !== message.from,
              })}
            >
              {message.content}
            </Message>
          );
        })}

        {/* TODO: add filters */}
        {/* <Button className="w-3/4 mb-6">Set Filters</Button> */}

        {/* TODO: Add animation to loading */}
        {chatState.loading && (
          <Message from="bot" className="mt-6">
            Loading...
          </Message>
        )}

        <div ref={bottomElRef} aria-hidden />
        <div className="fixed bottom-0 w-full p-3 flex justify-center left-0 bg-zinc-100">
          {chatState.resultsReceived && (
            <>
              <Button className="text-sm" onClick={resetChat}>
                Try again
              </Button>
              <Button className="text-sm" onClick={handleSuccessfulResults}>
                Successful results!
              </Button>
            </>
          )}

          {!chatState.resultsReceived && (
            <>
              <Input
                placeholder="What movie are you looking for?"
                className="w-full"
                name="message"
                value={chatState.input}
                onChange={(e) => handleInputChange(e.target.value)}
                autoFocus
              />

              <Button type="submit" className="hidden sm:block" disabled={chatState.loading}>
                Submit
              </Button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
