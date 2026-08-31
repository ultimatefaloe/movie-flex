import EmptyState from "@/src/component/ui/empty-state";
import MovieCard from "@/src/component/movie/movie-card";
import TrendingMovieCard from "@/src/component/movie/trending-movie-card";
import SearchInput from "@/src/component/ui/search-input";
import { TabButton } from "@/src/component/ui/tab-button";
import { colors } from "@/src/constant";
import { icons } from "@/src/constant/icons";
import { movies, trendingMovies } from "@/src/data";
import { tabBarHeight } from "@/src/utils";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { FlatList, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const tabs = [
  {
    title: "All",
    value: "all",
  },
  {
    title: "Action",
    value: "action",
  },
  {
    title: "Comedy",
    value: "comedy",
  },
  {
    title: "Drama",
    value: "drama",
  },
  {
    title: "Horror",
    value: "horror",
  },
  {
    title: "Sci-Fi",
    value: "sci-fi",
  },
];

export default function App() {
  const [moviesData, setMoviesData] = useState(movies);
  const [searchTerm, setSearchTerm] = useState("");
  const [active, setActive] = useState<
    "all" | "action" | "comedy" | "drama" | "horror" | "sci-fi"
  >("all");
  const router = useRouter();

  useEffect(() => {
    if (active === "all") {
      setMoviesData(movies);
    } else {
      const filteredMovies = movies.filter((movie) =>
        movie.genre.map((g) => g.toLowerCase()).includes(active),
      );
      setMoviesData(filteredMovies);
    }
  }, [active]);

  const routeToSearch = () => {
    setSearchTerm("");
    router.push(`/search`);
  };

  // Header Sub-Component Layer (Search Bar + First Carousel Slider)
  const renderHeader = useMemo(
    () => (
      <View className="mb-4">
        <Text className="text-xl font-bold text-neutral">
          What do you want to watch?
        </Text>

        {/* Search Input Input */}
        <Pressable onPress={routeToSearch} className="mt-4 relative">
          <SearchInput
            initialValue={searchTerm}
            onSearch={setSearchTerm}
            onSubmit={routeToSearch}
            editable={false} // Add this prop
          />
        </Pressable>

        {/* Horizontal Carousel Section 1 */}
        <View className="pt-2">
          <Text className="text-xl text-neutral font-semibold mb-2">
            Top Movies for the week
          </Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={trendingMovies}
            keyExtractor={(item) => `trending-top-${item.id}`}
            renderItem={({ item, index }) => (
              <TrendingMovieCard movie={item} index={index} />
            )}
            contentContainerClassName="gap-4 pb-2"
          />
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="gap-2 mt-4"
        >
          {tabs.map((tab) => (
            <TabButton
              key={tab.value}
              title={tab.title}
              activeTab={active}
              onPress={() => setActive(tab.value as any)}
            />
          ))}
        </ScrollView>
      </View>
    ),
    [active, searchTerm],
  );

  return (
    // Fixed Edge Configuration Array context
    <SafeAreaView
      className="flex-1 bg-background"
      style={{ backgroundColor: colors.primary }}
      edges={["top"]}
    >
      <FlatList
        data={moviesData}
        keyExtractor={(item) => `grid-${item.id}`}
        renderItem={({ item }) => <MovieCard movie={item} />}
        // 3-Column Grid Configuration Options
        numColumns={3}
        columnWrapperClassName="justify-between mb-4 gap-2"
        // Component Structural Layout Placements
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          <EmptyState
            title="There is no movie yet!"
            description="Find your movie by Type title, categories, years, etc "
            icon={icons.empty}
          />
        }
        // Main Core Content Settings & Scrollable Extra Tab Padding
        showsVerticalScrollIndicator={false}
        className="px-5"
        contentContainerStyle={{
          paddingTop: 16,
          paddingBottom: tabBarHeight() + 24, // Pushes content above tab bar layout seamlessly
        }}
      />
    </SafeAreaView>
  );
}

// import { useState } from "react";
// import {
//   FlatList,
//   Image,
//   Text,
//   TextInput,
//   View,
// } from "react-native";
// import { icons } from "@/src/constant/icons";
// import { movies, trendingMovies } from "@/src/data";
// import { SafeAreaView } from "react-native-safe-area-context";
// import TrendingMovieCard from "@/src/component/trending-movie-card";
// import EmptyState from "@/src/component/empty-state";
// import MovieCard from "@/src/component/movie-card";

// export default function App() {
//   const [searchTerm, setSearchTerm] = useState("");
//   return (
//     <SafeAreaView className="flex-1 p-5 pb-10 bg-background" edges={{'top', 'bottom'}}>
//       <Text className="text-xl font-bold text-neutral">
//         What do you want to watch?
//       </Text>
//       <View className="mt-4 relative">
//         <Image
//           source={icons.search}
//           height={20}
//           width={20}
//           className="absolute right-3 top-3 z-10 w-2 h-2 p-2"
//         />
//         <TextInput
//           placeholder="Search for movies..."
//           className="bg-secondary text-neutral placeholder:text-light-secondary p-3 rounded-2xl"
//           value={searchTerm}
//           onChangeText={(text) => setSearchTerm(text)}
//           returnKeyType="search"
//           onSubmitEditing={() => {
//             console.log("Searching for:", searchTerm);
//           }}
//         />
//       </View>

//       <View className="pt-4">
//         {/* The header is now safely above the horizontal scroll view */}
//         <Text className="text-xl text-neutral font-semibold mb-0">
//           Top Movies for the week
//         </Text>

//         <FlatList
//           horizontal={true}
//           showsHorizontalScrollIndicator={false}
//           data={trendingMovies}
//           keyExtractor={(item) => item.id.toString()}
//           renderItem={({ item, index }) => (
//             <TrendingMovieCard movie={item} index={index} />
//           )}
//           contentContainerClassName="gap-4 py-2" // Keep vertical padding, move horizontal padding if needed
//         />
//       </View>

//       <View className="mt-4 pb-10">
//         <FlatList
//           showsHorizontalScrollIndicator={false}
//           data={movies}
//           keyExtractor={(item) => item.id.toString()}
//           renderItem={({ item }) => <MovieCard movie={item} />}
//           numColumns={3}
//           columnWrapperClassName="gap justify-between"
//           contentContainerClassName="gap-4 "
//           ListEmptyComponent={<EmptyState />}
//         />
//       </View>

//        <View className="pt-4">
//         <Text className="text-xl text-neutral font-semibold mb-0">
//           Top Movies for the week
//         </Text>

//         <FlatList
//           horizontal={true}
//           showsHorizontalScrollIndicator={false}
//           data={trendingMovies}
//           keyExtractor={(item) => item.id.toString()}
//           renderItem={({ item, index }) => (
//             <TrendingMovieCard movie={item} index={index} />
//           )}
//           contentContainerClassName="gap-4 py-2" // Keep vertical padding, move horizontal padding if needed
//         />
//       </View>
//     </SafeAreaView>
//   );
// };
