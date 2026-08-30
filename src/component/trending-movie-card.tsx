import React from "react";
import { Image, View, Text, Dimensions } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { colors, images } from "../constant";
import { Movie } from "../types";

interface TrendingMovieCardProps {
  movie: Movie;
  index: number;
}

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.35; // Larger size for trending cards

const TrendingMovieCard = ({ movie, index }: TrendingMovieCardProps) => {
  const rankNumber = (index + 1).toString();

  console.log(movie.poster_path);

  return (
    <View className="gap-2 relative" style={{ width: CARD_WIDTH }}>
      {/* Card Image and Rank Container */}
      <View className="relative w-full" style={{ height: CARD_WIDTH * 1.5 }}>
        <Image
          source={
            typeof movie.poster_path === "number"
              ? movie.poster_path
              : images.cidadePerdida
          }
          className="w-full h-full rounded-2xl"
          resizeMode="cover"
        />

        {/* Trending Rank Number Overlay */}
        <View className="absolute -top-4 -right-3 z-20">
          <Text
            className="text-8xl font-bold text-primary tracking-tighter"
            style={{
              textShadowColor: colors.accent,
              textShadowOffset: { width: 2, height: 1 },
              textShadowRadius: 2,
              // Fallback for iOS platforms to enforce clear outline boundaries
              shadowColor: colors.accent,
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 1,
              shadowRadius: 1,
            }}
          >
            {rankNumber}
          </Text>
        </View>
      </View>

      {/* Movie Title Meta */}
      <View className="absolute bottom-0 p-2 bg-background/80 w-full">
        <Text className="text-white text-sm font-semibold" numberOfLines={2}>
          {movie.title}
        </Text>
      </View>
    </View>
  );
};

export default TrendingMovieCard;
