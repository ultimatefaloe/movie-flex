import React from "react";
import { Image, Text, View } from "react-native";
import { icons } from "../constant";

const EmptyState = () => {
  return (
    <View className="flex-1 justify-center items-center text-center space-y-3">
      <View>
        <Image
          source={icons.empty}
          height={32}
          width={32}
          className=""
          resizeMode="cover"
        />
      </View>
      <Text className="text-neutral text-2xl font-bold">
        There is no movie yet!
      </Text>
      <Text className="text-light-secondary text-base">
        Find your movie by Type title, categories, years, etc 
      </Text>
    </View>
  );
};

export default EmptyState;
