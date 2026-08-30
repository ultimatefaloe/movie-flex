import { Movie } from "../types";
import { images } from "@/src/constant"

const baseMovies: Movie[] = [
  {
    id: 1,
    title: "The Avengers",
    poster_path: images.avengers,
    release_date: "21-4-1998",
    backdrop_path: null,
    overview: "Earth's mightiest heroes must come together to save the world from destruction.",
    vote_average: 8.5,
    vote_count: 15000,
    genre: ["Action", "Adventure", "Sci-Fi"],
  },
  {
    id: 2,
    title: "Cidade Perdida",
    poster_path: images.cidadePerdida,
    release_date: "15-3-2022",
    backdrop_path: null,
    overview: "A reclusive romance novelist on a book tour with her cover model gets swept up in a kidnapping attempt.",
    vote_average: 7.2,
    vote_count: 4500,
    genre: ["Action", "Adventure", "Comedy"],
  },
  {
    id: 3,
    title: "The Cuite Dog",
    poster_path: images.dog,
    release_date: "10-1-2024",
    backdrop_path: null,
    overview: "A heartwarming tale of a dog and his owner's journey across the country.",
    vote_average: 7.8,
    vote_count: 3200,
    genre: ["Drama", "Family", "Adventure"],
  },
  {
    id: 4,
    title: "Jurrasic World",
    poster_path: images.jurassicWorld,
    release_date: "12-6-2015",
    backdrop_path: null,
    overview: "A new theme park is built on the original site of Jurassic Park.",
    vote_average: 8.3,
    vote_count: 12000,
    genre: ["Action", "Adventure", "Sci-Fi"],
  },
];

// Duplicate the base movies to create 50 entries
export const movies: Movie[] = Array.from({ length: 50 }, (_, index) => {
  const baseIndex = index % baseMovies.length;
  const baseMovie = baseMovies[baseIndex];
  return {
    ...baseMovie,
    id: index + 1,
    vote_average: Number((baseMovie.vote_average + (Math.random() * 0.4 - 0.2)).toFixed(1)),
    vote_count: Math.floor(baseMovie.vote_count * (0.7 + Math.random() * 0.6)),
  };
});