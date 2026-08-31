import React, { useState } from "react";
import EmptyState from "@/src/component/ui/empty-state";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, images, icons } from "@/src/constant";
import { ImageBackground, ScrollView, View, Text, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Movie } from "@/src/types";
import { TabButton } from "@/src/component/ui/tab-button";
import { reviews, casts, movieDetail } from "@/src/data";
import ReviewCard from "@/src/component/movie-detail/review-card";
import CastCard from "@/src/component/movie-detail/cast-card";

const actionMenu: { title: string; value: string }[] = [
  { title: "About Movie", value: "movie" },
  { title: "Reviews", value: "reviews" },
  { title: "Cast", value: "cast" },
];

const MovieDetail = () => {
  const [selectedAction, setSelectedAction] = useState<
    "movie" | "reviews" | "cast"
  >("movie");
  const { id } = useLocalSearchParams();
  const movie: Movie = movieDetail(id as string);

  console.log("MovieDetail movie:", movie);
  if (!movie) {
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: colors.primary }}
        edges={["top", "bottom"]}
      >
        <EmptyState
          title="Movie not found"
          description="The movie you are looking for does not exist."
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.primary }}
      edges={["bottom"]}
    >
      <ScrollView className="flex-1">
        <ImageBackground
          source={
            typeof movie.backdrop_path === "number"
              ? movie.poster_path
              : images.bgImage
          }
          className="w-full h-82"
          resizeMode="cover"
        />
        <View className="flex-row items-center justify-between mb-4 absolute top-40 left-8 right-4">
          <Image
            source={
              typeof movie.poster_path === "number"
                ? movie.poster_path
                : images.spiderman
            }
            className="w-32 h-54 rounded-2xl"
            resizeMode="cover"
          />
        </View>
        <View className="p-4 absolute top-80 left-40 right-4">
          <Text className="text-neutral text-2xl font-bold">{movie.title}</Text>
        </View>
        <View className="p-2 absolute top-70  right-4 flex-row items-center gap-2 bg-primary/50 rounded-xl">
          <Image source={icons.star} className="h-4 w-4" />
          <Text className="text-tint text-base font-bold">
            {movie.vote_average.toFixed(1)}
          </Text>
        </View>

        <View className="mt-12 p-4 flex-col items-center gap">
          <View className="flex-row gap-3 ">
            <View className="flex-row items-center gap-1">
              <Image source={icons.calendar} className="w-5 h-5" />
              <Text className="text-light-secondary text-xl">
                {movie.release_date}
              </Text>
            </View>
            <Text className="text-light-secondary text-2xl font-bold">|</Text>
            <View className="flex-row items-center gap-1">
              <Image source={icons.clock} className="w-5 h-5" />
              <Text className="text-light-secondary text-xl">
                {movie.runtime} min
              </Text>
            </View>
          </View>
          <View className="flex-row items-center gap-1">
            <Image source={icons.ticket} className="w-5 h-5" />
            <Text className="text-light-secondary text-xl">
              {movie.genre.join(", ")}
            </Text>
          </View>
        </View>

        <View className="p-4">
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View className="flex-row gap-4">
              {actionMenu.map((item) => (
                <TabButton
                  key={item.value}
                  title={item.title}
                  value={item.value}
                  activeTab={selectedAction}
                  onPress={() => setSelectedAction(item.value as any)}
                />
              ))}
            </View>
          </ScrollView>
        </View>

        {/* tab content */}
        <View className="p-4">
          {selectedAction === "movie" && (
            <View className="px-4">
              <Text className="text-neutral text-xl">{movie.overview}</Text>
            </View>
          )}
          {selectedAction === "reviews" && (
            <View className="px-4">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </View>
          )}
          {selectedAction === "cast" && (
            <View className="px-4 grid grid-cols-2 gap-4">
              {casts.map((cast, index) => (
                <CastCard key={index} cast={cast} />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MovieDetail;
