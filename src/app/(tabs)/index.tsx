import { useState } from "react";
import {
  FlatList,
  Image,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { icons } from "@/src/constant/icons";
import { movies, trendingMovies } from "@/src/data";
import { SafeAreaView } from "react-native-safe-area-context";
import TrendingMovieCard from "@/src/component/trending-movie-card";
import EmptyState from "@/src/component/empty-state";
import MovieCard from "@/src/component/movie-card";
import { colors } from "@/src/constant";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Dynamically catch the tab bar footprint height to compute perfect padding thresholds
  let tabBarHeight = 0;
  try {
    tabBarHeight = useBottomTabBarHeight();
  } catch (e) {
    // Fallback static height padding if this screen isn't directly inside a Tab Navigator tree context
    tabBarHeight = 80; 
  }

  // Header Sub-Component Layer (Search Bar + First Carousel Slider)
  const renderHeader = () => (
    <View className="mb-4">
      <Text className="text-xl font-bold text-neutral">
        What do you want to watch?
      </Text>
      
      {/* Search Input Input */}
      <View className="mt-4 relative mb-4">
        <Image
          source={icons.search}
          className="absolute right-3 top-3.5 z-10 w-5 h-5 text-neutral"
          resizeMode="contain"
        />
        <TextInput
          placeholder="Search for movies..."
          className="bg-secondary text-neutral placeholder:text-light-secondary p-3.5 pr-10 rounded-2xl"
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
          returnKeyType="search"
          placeholderTextColor="#71717a"
          onSubmitEditing={() => console.log("Searching for:", searchTerm)}
        />
      </View>

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
    </View>
  );

  // Footer Sub-Component Layer (Second Carousel Slider)
  const renderFooter = () => (
    <View className="mt-6">
      <Text className="text-xl text-neutral font-semibold mb-2">
        Recommended for You
      </Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={trendingMovies}
        keyExtractor={(item) => `trending-bottom-${item.id}`}
        renderItem={({ item, index }) => (
          <TrendingMovieCard movie={item} index={index} />
        )}
        contentContainerClassName="gap-4 pb-2"
      />
    </View>
  );

  return (
    // Fixed Edge Configuration Array context
    <SafeAreaView className="flex-1 bg-background" style={{ backgroundColor: colors.primary}} edges={['top']}>
      <FlatList
        data={movies}
        keyExtractor={(item) => `grid-${item.id}`}
        renderItem={({ item }) => <MovieCard movie={item} />}
        
        // 3-Column Grid Configuration Options
        numColumns={3}
        columnWrapperClassName="justify-between mb-4 gap-2"
        
        // Component Structural Layout Placements
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={<EmptyState />}
        
        // Main Core Content Settings & Scrollable Extra Tab Padding
        showsVerticalScrollIndicator={false}
        className="px-5"
        contentContainerStyle={{
          paddingTop: 16,
          paddingBottom: tabBarHeight + 24, // Pushes content above tab bar layout seamlessly
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