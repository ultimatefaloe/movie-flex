import EmptyState from "@/src/component/empty-state";
import React from "react";
import { Text, View } from "react-native";

const Search = () => {
  return (
    <View className="flex-1 bg-background">
      {/* <View className="flex-1 items-center justify-center">
        <Text className="text-xl font-bold text-blue-500">
          Search for movies
        </Text>
      </View> */}
      <EmptyState />
    </View>
  );
};

export default Search;
