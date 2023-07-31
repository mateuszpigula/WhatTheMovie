"use client";

import { FormEvent, useState } from "react";
import { completion } from "./openai.service";
import { getMovieDetails, parseMovies } from "./movies.service";

export default function Chat() {
  const [response, setResponse] = useState("");
  async function askChat(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const message = (e.currentTarget.elements.namedItem("message") as HTMLInputElement).value;
    const openAiResponse = await completion(message);
    const movies = parseMovies(openAiResponse);
    const moviesDetails = await Promise.all(movies.map((movie) => getMovieDetails(movie)));
    setResponse(openAiResponse);

    console.log("moviesDetails", moviesDetails);
  }

  return (
    <>
      <form onSubmit={askChat} method="post" className="flex flex-col">
        <label htmlFor="message">message:</label>
        <textarea id="message" name="message" className="text-black" />
        <button type="submit">Submit</button>
      </form>
      {response && <div className="text-white">{response}</div>}
    </>
  );
}
