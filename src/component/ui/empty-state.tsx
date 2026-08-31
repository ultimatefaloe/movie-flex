import React from "react";
import { Image, ImageSourcePropType, Text, View } from "react-native";
import { icons } from "@/src/constant";


interface EmptyStateProps {
  title: string;
  description: string;
  icon?: ImageSourcePropType;
}

const EmptyState = ({title, description, icon}: EmptyStateProps) => {
  return (
    <View className="flex-1 justify-center items-center text-center space-y-3">
      <View className="bg-light-secondary/10 p-4 rounded-full mb-8">
        <Image
          source={icon || icons.empty}
          height={32}
          width={32}
          className=""
          resizeMode="cover"
        />
      </View>
      <Text className="text-neutral text-2xl font-bold">
        {title}
      </Text>
      <Text className="text-light-secondary text-base">
        {description}
      </Text>
    </View>
  );
};

export default EmptyState;
