import EmptyState from "@/src/component/ui/empty-state";
import MovieCard from "@/src/component/movie/movie-card";
import SearchInput from "@/src/component/ui/search-input";
import { colors, icons } from "@/src/constant";
import { movies } from "@/src/data";
import { Movie } from "@/src/types";
import { tabBarHeight } from "@/src/utils";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Search = () => {
  const searchParams = useLocalSearchParams();
  const [searchMovies, setSearchMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(
    typeof searchParams?.searchTerm === "string"
      ? searchParams?.searchTerm
      : "",
  );

  const handleSearch = () => {
    const filteredMovies = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    // Handle the filtered movies as needed (e.g., update state, navigate, etc.)
    setSearchMovies(filteredMovies);
  };

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
        renderItem={({ item }) => <MovieCard movie={item} />}
        numColumns={3}
        columnWrapperClassName="justify-between mb-4 gap-2"
        contentContainerClassName="px-5"
        contentContainerStyle={{
          paddingHorizontal: 20,
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
