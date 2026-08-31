import EmptyState from "@/src/component/ui/empty-state";
import React from "react";
import { View } from "react-native";

const Watchlist = () => {
  return (
    <View className="flex-1 bg-background">
      <EmptyState
        title="Watchlist is empty"
        description="You haven't added any movies to your watchlist yet."
      />
    </View>
  );
};

export default Watchlist;
