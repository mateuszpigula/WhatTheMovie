import { Result } from "@/api/movies/movies.contract";

export interface MovieDetails extends Result {
  poster: string;
}
