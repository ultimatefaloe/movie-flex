import { ImageProps } from "react-native";

interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: ImageProps | null;
  backdrop_path: ImageProps | null;
  vote_average: number;
  vote_count: number;
  genres: { id: number; name: string }[];
  runtime: number | null;
  tagline: string | null;
  homepage: string | null;
}

export type { MovieDetails };

interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: ImageProps | null;
  backdrop_path: ImageProps | null;
  vote_average: number;
  vote_count: number;
}

export type { Movie };

interface MovieList {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}