import React from "react";
import { View, Image, TextInput, Pressable } from "react-native";
import { icons } from "@/src/constant";

interface SearchInputProps {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
  initialValue?: string;
  onClear?: () => void;
  onSubmit?: () => void;
  editable?: boolean;
}

const SearchInput = ({
  onSearch,
  placeholder,
  initialValue,
  onClear,
  onSubmit,
  editable = true,
}: SearchInputProps) => {
  return (
    <View className="mt-4 relative mb-4">
      <View className="absolute right-3 top-3.5 z-10 flex-row items-center gap-4 space-x-2">
        {initialValue && initialValue.length > 0 && (
          <Pressable onPress={onClear} hitSlop={10}>
            <Image
              source={icons.close}
              className=" w-5 h-5"
              resizeMode="contain"
            />
          </Pressable>
        )}
        <Pressable onPress={onSubmit} hitSlop={10}>
          <Image
            source={icons.search}
            className=" w-5 h-5"
            resizeMode="contain"
          />
        </Pressable>
      </View>

      <TextInput
        placeholder={placeholder || "Search for movies..."}
        className="bg-secondary text-neutral placeholder:text-light-secondary p-3.5 pr-10 rounded-2xl"
        value={initialValue}
        onChangeText={(text) => onSearch(text)}
        returnKeyType="search"
        placeholderTextColor="#71717a"
        onSubmitEditing={onSubmit}
        editable={editable}
      />
    </View>
  );
};

export default React.memo(SearchInput);
