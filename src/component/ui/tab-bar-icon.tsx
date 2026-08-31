import React from "react";
import { Image, Text, View, ImageSourcePropType } from "react-native";

interface TabBarIconProps {
  focused: boolean;
  title: string;
  icon: ImageSourcePropType;
  activeIcon: ImageSourcePropType;
}

const TabBarIcon = ({ focused, title, icon, activeIcon }: TabBarIconProps) => {
  return (
    <View
      className={`flex-row items-center justify-center gap-2 mt-5 w-25 h-14`}
    >
      <View className="flex-row items-center justify-center">
        {focused ? (
          <Image
            source={activeIcon}
            height={24}
            width={24}
            className="size-4 p-2"
          />
        ) : (
          <Image source={icon} height={24} width={24} className="size-4 p-2" />
        )}
      </View>
      {focused && (
        <Text className="text-base font-bold text-accent">{title}</Text>
      )}
    </View>
  );
};

export default TabBarIcon;
