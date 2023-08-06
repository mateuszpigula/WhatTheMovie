import { useState, FormEvent } from "react";
import { useMessages } from "./useMessages";
import { completion } from "./openai.service";
import { getMovieDetails, parseMovies } from "./movies.service";
import { useMessageFilters } from "@/contexts/MessageFilters/MessageFilters";

export const useChat = () => {
  const [chatState, setChatState] = useState({
    loading: false,
    resultsReceived: false,
    input: "",
  });

  const { messages, addBotMessage, addUserMessage, addImagesMessage } = useMessages();
  const { filtersToText } = useMessageFilters();

  async function askChat(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const message = (e.currentTarget.elements.namedItem("message") as HTMLInputElement).value;
    if (!message) return;

    setChatState((state) => ({ ...state, loading: true, input: "" }));
    addUserMessage(message, filtersToText);

    try {
      const openAiResponse = await completion(message);
      const movies = parseMovies(openAiResponse);
      const moviesDetails = await Promise.all(movies.map((movie) => getMovieDetails(movie)));

      if (moviesDetails.length === 0) {
        addBotMessage("Sorry, I couldn't find any movies that match your criteria.");
        return;
      }

      // TODO: remove this timeout
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // TODO: add placeholder image
      const images = moviesDetails.map((movie) => ({
        src: movie.poster || "placeholder",
        alt: movie.title,
      }));
      addBotMessage(
        "Great! Depending on that I think it’s one of these. Click to see more details.",
      );
      addImagesMessage(images, "bot");
      setChatState((state) => ({ ...state, resultsReceived: true }));
    } catch (e) {
      // TODO: handle error with toast
      console.error(e);
    } finally {
      setChatState((state) => ({ ...state, loading: false }));
    }
  }

  const resetChat = () => {
    setChatState((state) => ({ ...state, resultsReceived: false }));
  };

  const handleSuccessfulResults = () => {
    // TODO: handle successful results
    console.log("handleSuccessfulResults");
  };

  const handleInputChange = (value: string) => {
    setChatState((state) => ({ ...state, input: value }));
  };

  return {
    chatState,
    askChat,
    resetChat,
    handleInputChange,
    handleSuccessfulResults,
    messages,
  };
};
