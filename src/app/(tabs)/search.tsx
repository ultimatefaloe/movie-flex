import EmptyState from "@/src/component/ui/empty-state";
import SearchInput from "@/src/component/ui/search-input";
import { colors, icons } from "@/src/constant";
import { movies } from "@/src/data";
import { Movie } from "@/src/types";
import { tabBarHeight } from "@/src/utils";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InlineMovieCard from "@/src/component/movie/inline-movie-card";

const Search = () => {
  const searchParams = useLocalSearchParams();
  const [searchMovies, setSearchMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState<any>(
    searchParams?.searchTerm || "",
  );

  const handleSearch = () => {
    setLoading(true);
    try {
      // Simulate a search operation (you can replace this with an actual API call)
      const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      // Handle the filtered movies as needed (e.g., update state, navigate, etc.)
      setSearchMovies(filteredMovies);
    } catch (error) {
      console.error("Error during search:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-background">
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  return (
    <SafeAreaView
      className="flex-1"
      style={{ flex: 1, backgroundColor: colors.primary }}
      edges={["top", "bottom"]}
    >
      <View className="p-4">
        <SearchInput
          initialValue={searchTerm}
          onSearch={setSearchTerm}
          onSubmit={handleSearch}
          onClear={() => setSearchTerm("")}
        />
      </View>

      <FlatList
        data={searchMovies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <InlineMovieCard movie={item} />}
        contentContainerStyle={{
          paddingHorizontal: 20,
          gap: 16,
          paddingBottom: tabBarHeight(), // Pushes content above tab bar layout seamlessly
        }}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center mt-10">
            <EmptyState
              title="No movies found"
              description="Try searching for a different term"
              icon={icons.search_2}
            />
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Search;
