import React from "react";
import { View, Text, Image, ImageSourcePropType } from "react-native";
import { icons } from "@/src/constant";
import { Review } from "@/src/types";

interface ReviewCardProps {
 review: Review
}

const ReviewCard = (data: ReviewCardProps) => {
  const { icon, name, review, rating } = data.review;
  return (
    <View className="flex-row items-start gap-4 mb-4">
      <View>
        <Image
          source={icon || icons.avatar}
          className="rounded-xl"
          width={60}
          height={60}
        />
      </View>
      <View className="">
        <Text className="text-neutral text-lg font-bold">{name}</Text>
        <Text className="text-light-secondary text-base">{review}</Text>
        <Text className="text-accent text-base font-bold">
          {rating.toFixed(1)}
        </Text>
      </View>
    </View>
  );
};

export default ReviewCard;
