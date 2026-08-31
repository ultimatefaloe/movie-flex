import { Stack } from "expo-router";
import { colors, icons } from "@/src/constant";
import { Image, TouchableOpacity } from "react-native";
import { addToWatchlist } from "@/src/service";
import { movieDetail } from "@/src/data";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="movie/[id]"
        getId={({ params }) => params?.id}
        options={({ route }) => {
          const { title, id } = route.params as { id: string; title: string };
          const movie = movieDetail(id);

          return {
            title: title,
            headerBackTitle: "Back",
            animation: "slide_from_bottom",
            headerStyle: {
              backgroundColor: colors.primary,
            },
            headerTintColor: colors.neutral,
            headerRight: () => (
              <TouchableOpacity
                className="p-2"
                hitSlop={10}
                activeOpacity={0.7}
                onPress={() => addToWatchlist(movie)}
              >
                <Image
                  source={icons.watchlist}
                  className="w-4 h-8"
                  width={16}
                  height={24}
                />
              </TouchableOpacity>
            ),
          };
        }}
      />
    </Stack>
  );
}
