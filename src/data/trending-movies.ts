import { Movie } from "../types";
import { images } from "@/src/constant"

export const trendingMovies: Movie[] = [
  {
    id: 1,
    title: "The Avengers",
    poster_path: images.avengers,
    release_date: "21-4-5234",
    backdrop_path: null,
    overview: "",
    vote_average: 2,
    vote_count: 9,
    genre: ["Action", "Adventure", "Sci-Fi"]
  },
  {
    id: 2,
    title: "Cidade Perdida",
    poster_path: images.cidadePerdida,
    release_date: "21-4-5234",
    backdrop_path: null,
    overview: "",
    vote_average: 2,
    vote_count: 9,
    genre: ["Action", "Adventure", "Comedy"]
  },
  {
    id: 3,
    title: "The Cuite Dog",
    poster_path: images.dog,
    release_date: "21-4-5234",
    backdrop_path: null,
    overview: "",
    vote_average: 2,
    vote_count: 9,
    genre: ["Drama", "Family", "Adventure"]
  },
  {
    id: 4,
    title: "Jurrasic World",
    poster_path: images.jurassicWorld,
    release_date: "21-4-5234",
    backdrop_path: null,
    overview: "",
    vote_average: 2,
    vote_count: 9,
    genre: ["Action", "Adventure", "Sci-Fi"]
  },
];