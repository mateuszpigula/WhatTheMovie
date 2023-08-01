import axios from "axios";
import { MovieResults } from "../../api/movies/movies.contract";
import { MovieDetails } from "./movies.interface";
import { allMoviesMock } from "./movies.mock";

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const TMDB_API_URL = "https://api.themoviedb.org/3";

export const parseMovies = (input: string) => {
  const movies = input.split("\n");
  return movies.map((movie) => movie.replace(/\d+\.\s/, ""));
};

const getImageUrl = (path: string | null) => {
  return path ? `${TMDB_IMAGE_BASE_URL}${path}` : null;
};

export const getMovieDetails = async (title: string): Promise<MovieDetails> => {
  // TODO: Remove mock
  const response = { data: allMoviesMock[title as keyof typeof allMoviesMock] };
  // const response = await axios.get<MovieResults>(`${TMDB_API_URL}/search/movie?query=${title}`, {
  //   headers: {
  //     Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
  //   },
  // });

  const details = response.data.results[0];

  return { ...details, poster: getImageUrl(details.poster_path) };
};
