import { Pressable, Text, View } from "react-native";

export const TabButton = ({
  title,
  activeTab,
  onPress,
}: {
  title: string;
  activeTab: string;
  onPress: () => void;
}) => {
  const isActive = activeTab === title.toLowerCase();

  return (
    <Pressable
      className={`px-6 py-1 rounded-lg ${isActive && "bg-accent/10"}`}
      onPress={onPress}
    >
      <Text
        className={`text-light-secondary text-lg capitalize font-semibold ${
          isActive ? "text-neutral" : ""
        }`}
      >
        {title}
      </Text>
      {isActive && <View className="w-full h-1 mt-1 bg-accent" />}
    </Pressable>
  );
};