import { loadStorage, saveStorage } from "@/src/utils";
import { Movie } from "../types";
const KEY_WATCHLIST = "watchlist";
export const getWatchlist = async (): Promise<Movie[]> => {
  try {
    const response = await loadStorage(KEY_WATCHLIST);
    return response || [];
  } catch (error) {
    console.error("Error fetching watchlist:", error);
    return [];
  }
}

export const addToWatchlist = async (movie: Movie): Promise<void> => {
  try {
    const currentWatchlist = await getWatchlist();
    const updatedWatchlist = [...currentWatchlist, movie];
    await saveStorage(KEY_WATCHLIST, updatedWatchlist);
  } catch (error) {
    console.error("Error adding to watchlist:", error);
  }
}

export const removeFromWatchlist = async (movieId: string): Promise<void> => {
  try {
    console.log("Removing movie with ID:", movieId);
    const currentWatchlist = await getWatchlist();
    const updatedWatchlist = currentWatchlist.filter(movie => movie.id !== parseInt(movieId));
    await saveStorage(KEY_WATCHLIST, updatedWatchlist);
  } catch (error) {
    console.error("Error removing from watchlist:", error);
  }
}

export const clearWatchlist = async (): Promise<void> => {
  try {
    await saveStorage(KEY_WATCHLIST, []);
  } catch (error) {
    console.error("Error clearing watchlist:", error);
  }
}