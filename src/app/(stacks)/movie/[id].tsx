import React, { useState } from "react";
import EmptyState from "@/src/component/ui/empty-state";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, images, icons } from "@/src/constant";
import {
  ImageBackground,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Movie } from "@/src/types";
import { TabButton } from "@/src/component/ui/tab-button";
import { reviews, casts, movieDetail } from "@/src/data";
import ReviewCard from "@/src/component/movie-detail/review-card";
import CastCard from "@/src/component/movie-detail/cast-card";
import Slider from "@react-native-community/slider";

const actionMenu: { title: string; value: string }[] = [
  { title: "About Movie", value: "movie" },
  { title: "Reviews", value: "reviews" },
  { title: "Cast", value: "cast" },
];

const MovieDetail = () => {
  const [selectedAction, setSelectedAction] = useState<
    "movie" | "reviews" | "cast"
  >("movie");
  const [modalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const { id } = useLocalSearchParams();
  const movie: Movie = movieDetail(id as string);

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
          <View className="flex-row gap-4 items-center justify-center">
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
            <View className="flex-row flex-wrap px-4" style={{ gap: 16 }}>
              {casts.map((cast, index) => (
                <View key={index} style={{ width: "47%" }}>
                  <CastCard cast={cast} />
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      <TouchableOpacity
        className="p-4 bg-accent rounded-xl m-4 absolute bottom-4 left-4 right-4"
        activeOpacity={0.7}
        onPress={() => setModalVisible(true)}
      >
        <Text className="text-neutral text-center text-xl font-bold">
          Rate Movie
        </Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-primary/80">
          <View
            className="bg-neutral rounded-t-3xl p-6 w-full"
            // style={{ height: MODAL_HEIGHT }}
          >
            {/* Drag Handle */}
            <View className="items-center mb-4">
              <View className="w-12 h-1.5 bg-zinc-400 rounded-full" />
            </View>

            <Text className="text-primary text-2xl font-bold mb-4">
              Rate this movie
            </Text>

            <View className="mb-6 flex-row items-center gap-2">
              <Text className="text-light-secondary text-base ">
                How would you rate this movie?
              </Text>
              <View className="flex-row items-center gap-1">
                <Text className="text-tint text-lg font-bold">
                  {rating.toFixed(1)}
                </Text>
                <Text className="text-light-secondary font-bold">/ 10.0</Text>
              </View>
            </View>

            {/* Star Rating Options */}
            <View className="flex-row justify-between mb-6">
              <Slider
                minimumValue={0}
                maximumValue={10}
                step={0.5}
                value={rating}
                onValueChange={(val: number) => setRating(val)}
                minimumTrackTintColor={colors.tint}
                maximumTrackTintColor={colors.accent}
                thumbTintColor={colors.tint}
                trackStyle={{ height: 4, borderRadius: 2 }}
                thumbStyle={{ width: 20, height: 20, borderRadius: 10 }}
              />
            </View>

            <View className="flex-row justify-between gap-4">
              <TouchableOpacity
                className="p-4 bg-light-secondary rounded-xl flex-1"
                onPress={() => setModalVisible(false)}
              >
                <Text className="text-secondary text-center font-bold">
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-accent p-4 rounded-xl flex-1"
                onPress={() => {
                  console.log("Submit rating", rating);
                  setModalVisible(false);
                }}
              >
                <Text className="text-neutral text-center font-bold text-lg">
                  Submit Rating
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default MovieDetail;
