import EmptyState from "@/src/component/empty-state";
import React from "react";
import { View } from "react-native";

const Watchlist = () => {
  return (
    <View className="flex-1 bg-background">
     
      <EmptyState />
    </View>
  );
};

export default Watchlist;
