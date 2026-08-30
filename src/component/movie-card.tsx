import React from "react";
import { View, Text, Image, Dimensions } from "react-native";
import { Movie } from "../types";
import { icons, images } from "../constant";

interface MoviecardProps {
  movie: Movie;
}

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.28; // Smaller size for regular movie cards

const MovieCard = ({ movie }: MoviecardProps) => {
  // Safely extract the year from the date format (e.g., "5234" from "21-4-5234")
  const releaseYear = movie.release_date
    ? movie.release_date.split("-")[2]
    : "N/A";

  // Custom fallback text handling for empty string overviews
  const displayOverview = movie.overview?.trim()
    ? movie.overview
    : "No overview summary is currently available for this title.";

  return (
    <View
      className="bg-zinc-900 rounded-xl overflow-hidden shadow-sm relative"
      style={{ width: CARD_WIDTH, height: CARD_WIDTH * 1.5 }}
    >
      {/* Background Poster Image */}
      <Image
        source={
          typeof movie.poster_path === "number"
            ? movie.poster_path
            : images.dog
        }
        className="absolute inset-0 w-full h-full"
        resizeMode="cover"
      />

      {/* Dark overlay mix to ensure high contrast/readability */}
      <View className="absolute inset-0 bg-background/40 justify-between">
        {/* Top Badges Layer */}
        <View className="flex-row justify-between items-center w-full">
          {/* Rating Badge */}
          <View className="bg-background/75 px-2 py-1 rounded-br-xl items-center flex-row gap-1">
            <Image source={icons.star} className="h-3 w-3" />
            <Text className="text-tint text-xs font-bold">
              {movie.vote_average.toFixed(1)}
            </Text>
            <Text className="text-light-secondary text-[9px] mt-0.5">
              ({movie.vote_count})
            </Text>
          </View>

          {/* Release Year Badge */}
          <View className="bg-black/75 px-2 py-1 rounded-xl">
            <Text className="text-white text-xs font-semibold">
              {releaseYear}
            </Text>
          </View>
        </View>

        {/* Bottom Title & Details Segment */}
        <View className="bg-secondary/80 p-2.5 rounded-xl w-full">
          <Text
            className="text-neutral text-sm font-bold mb-1"
            numberOfLines={1}
          >
            {movie.title}
          </Text>

          <Text
            className="text-light-secondary text-xs leading-4"
            numberOfLines={2}
          >
            {displayOverview}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default MovieCard;
