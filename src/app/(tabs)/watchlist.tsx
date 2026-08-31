import React, { useState, useEffect, useCallback } from "react";
import EmptyState from "@/src/component/ui/empty-state";
import InlineMovieCard from "@/src/component/movie/inline-movie-card";
import {
  ActivityIndicator,
  FlatList,
  Image,
  View,
  Text,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, icons } from "@/src/constant";
import { clearWatchlist, getWatchlist } from "@/src/service";
import { Movie } from "@/src/types/movie";
import { tabBarHeight } from "@/src/utils";
import { useRouter } from "expo-router";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchWatchlist = async () => {
    setLoading(true);
    try {
      // Fetch the watchlist data from your API or local storage
      const response = await getWatchlist();
      setWatchlist(response);
    } catch (error) {
      console.error("Error fetching watchlist:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);


  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-background">
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.primary }}
      edges={["top", "bottom"]}
    >
      <FlatList
        data={watchlist}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <InlineMovieCard movie={item} watchlisted={true} />}
        contentContainerStyle={{
          paddingHorizontal: 20,
          gap: 16,
          paddingBottom: tabBarHeight(), // Pushes content above tab bar layout seamlessly
        }}
        ListHeaderComponent={
          <View className="py-4 flex-row items-center gap-4 justify-between ">
            <Pressable onPress={() => router.back()} className="p-2">
              <Image source={icons.back} className="w-8 h-8" />
            </Pressable>
            <Text className="text-2xl font-bold text-neutral">
              My Watchlist
            </Text>
            <TouchableOpacity
              className="flex-row items-center gap-2  p-2 rounded-lg"
              hitSlop={10}
              onPress={async () => {
                await clearWatchlist();
                fetchWatchlist(); // Refresh the watchlist after removal
              }}
              activeOpacity={0.7}
            >
              <Image source={icons.delete} className="w-6 h-6" />
            </TouchableOpacity>
          </View>
        }
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center bg-background mt-10">
            <EmptyState
              title="Watchlist is empty"
              description="You haven't added any movies to your watchlist yet."
            />
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Watchlist;
