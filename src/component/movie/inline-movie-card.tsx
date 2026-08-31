import React from "react";
import {
  Image,
  View,
  Text,
  Pressable,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Movie } from "@/src/types";
import { icons, images } from "@/src/constant";
import { useRouter } from "expo-router";
import { removeFromWatchlist } from "@/src/service/watch-list.service";

interface InlineMovieCardProps {
  movie: Movie;
  watchlisted?: boolean;
}

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.25; // Smaller size for regular movie cards

const InlineMovieCard = ({
  movie,
  watchlisted = false,
}: InlineMovieCardProps) => {
  const router = useRouter();
  const { id, title, poster_path, genre, runtime, release_date, vote_average } =
    movie;
  return (
    <Pressable
      className="flex-row gap-2"
      onPress={() =>
        router.push({
          pathname: `/movie/[id]`,
          params: { title, id },
        })
      }
    >
      <View style={{ width: CARD_WIDTH, aspectRatio: 2 / 3, borderRadius: 8 }}>
        <Image
          source={typeof poster_path === "number" ? poster_path : images.dog}
          className="absolute inset-0 w-full h-full"
          resizeMode="cover"
        />
      </View>
      <View className="flex-1 gap-2 justify-between p-2">
        <Text className="text-neutral text-2xl font-bold" numberOfLines={1}>
          {title}
        </Text>
        <View className="gap">
          <View className="flex-row gap-1 items-center">
            <Image source={icons.star} className="h-4 w-4" />
            <Text className="text-tint text-base font-bold">
              {vote_average.toFixed(1)}
            </Text>
          </View>
          <View className="flex-row gap-1 items-center">
            <Image source={icons.ticket} className="h-4 w-4" />
            <Text className="text-light-secondary text-base font-bold">
              {genre.map((g) => g).join(", ")}
            </Text>
          </View>
          <View className="flex-row gap-1 items-center">
            <Image source={icons.clock} className="h-4 w-4" />
            <Text className="text-light-secondary text-base font-bold">
              {runtime} mins
            </Text>
          </View>
        </View>
        {watchlisted && (
          <TouchableOpacity
            className="rounded-full flex-row items-center gap-1"
            onPress={async () => {
              await removeFromWatchlist(id.toString());
            }}
          >
            <Image source={icons.delete} className="h-4 w-4" />
            <Text className="text-red-500 text-base font-bold">
              Remove from Watchlist
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </Pressable>
  );
};

export default InlineMovieCard;
