import { useRouter } from "expo-router";
import React from "react";
import { Dimensions, Image, Pressable, Text, View } from "react-native";
import { icons, images } from "../../constant";
import { Movie } from "../../types";

interface MoviecardProps {
  movie: Movie;
}

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.28; // Smaller size for regular movie cards

const MovieCard = ({ movie }: MoviecardProps) => {
  const router = useRouter();
  // Safely extract the year from the date format (e.g., "5234" from "21-4-5234")
  const releaseYear = movie.release_date
    ? movie.release_date.split("-")[2]
    : "N/A";

  return (
    <Pressable
      className="bg-zinc-900 rounded-xl overflow-hidden shadow-sm relative"
      style={{ width: CARD_WIDTH, height: CARD_WIDTH * 1.5 }}
      onPress={() =>
        router.push({
          pathname: `/movie/[id]`,
          params: { title: movie.title, id: movie.id },
        })
      }
    >
      {/* Background Poster Image */}
      <Image
        source={
          typeof movie.poster_path === "number" ? movie.poster_path : images.dog
        }
        className="absolute inset-0 w-full h-full"
        resizeMode="cover"
      />

      {/* Dark overlay mix to ensure high contrast/readability */}
      <View className="absolute bottom-0 bg-background/40 justify-between">
        {/* Bottom Title & Details Segment */}
        <View className="bg-secondary/80 p-2.5 rounded-xl w-full">
          <Text
            className="text-neutral text-sm font-bold mb-1"
            numberOfLines={1}
          >
            {movie.title}
          </Text>

          <View className="flex-row justify-between items-center w-full">
            {/* Rating Badge */}
            <View className="items-center flex-row gap-1">
              <Image source={icons.star} className="h-3 w-3" />
              <Text className="text-tint text-xs font-bold">
                {movie.vote_average.toFixed(1)}
              </Text>
            </View>

            {/* Release Year Badge */}
            <View className="bg-black/75 px-2 py-1 rounded-xl">
              <Text className="text-white text-xs font-semibold">
                {releaseYear}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default MovieCard;
