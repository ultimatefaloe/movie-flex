import {  ImageSourcePropType } from "react-native";

interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: ImageSourcePropType | null;
  backdrop_path: ImageSourcePropType | null;
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
  poster_path: ImageSourcePropType | null;
  backdrop_path: ImageSourcePropType | null;
  vote_average: number;
  vote_count: number;
  runtime: number;
  genre: string[];
}

export type { Movie };

interface MovieList {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}