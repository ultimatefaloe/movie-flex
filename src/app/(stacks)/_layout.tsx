import { Stack } from "expo-router";
import { colors, icons } from "@/src/constant";
import { Image, Pressable } from "react-native";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="movie/[id]"
        getId={({ params }) => params?.id}
        options={({ route }) => {
          const { title } = route.params as { id: string; title: string };

          return {
            title: title,
            headerBackTitle: "Back",
            animation: "slide_from_bottom",
            headerStyle: {
              backgroundColor: colors.primary,
            },
            headerTintColor: colors.neutral,
            headerRight: () => (
              <Pressable
                className="p-2"
                hitSlop={10}
                onPress={() => console.log("added to watch list")}
              >
                <Image
                  source={icons.watchlist}
                  className="w-4 h-8"
                  width={16}
                  height={24}
                />
              </Pressable>
            ),
          };
        }}
      />
    </Stack>
  );
}
