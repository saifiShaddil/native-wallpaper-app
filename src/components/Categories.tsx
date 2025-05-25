import { View, Text, FlatList, Pressable } from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import { data } from "@/constants/data";
import Animated, { FadeInRight } from "react-native-reanimated";

export const Categories = ({
  currentCategory,
  setCurrentCategory,
}: {
  currentCategory: string | null;
  setCurrentCategory: Dispatch<SetStateAction<string | null>>;
}) => {
  return (
    <FlatList
      contentContainerStyle={{ gap: 16 }}
      horizontal
      showsHorizontalScrollIndicator={false}
      data={data.categories}
      keyExtractor={(item) => item}
      renderItem={({ item, index }) => (
        <CategoryItem
          item={item}
          index={index}
          currentCategory={currentCategory}
          setCurrentCategory={setCurrentCategory}
        />
      )}
    />
  );
};

export const CategoryItem = ({
  item,
  index,
  currentCategory,
  setCurrentCategory,
}: {
  item: string;
  index: number;
  currentCategory: string | null;
  setCurrentCategory: Dispatch<SetStateAction<string | null>>;
}) => {
  const isActive = !!currentCategory ? currentCategory == item : false;
  const activeColorClassName = isActive ? "bg-neutral-600" : "bg-white";
  const updateCurrentCategory = () => {
    if (isActive) {
      setCurrentCategory(null);
      return;
    }
    setCurrentCategory(item);
  };

  return (
    <Animated.View
      entering={FadeInRight.delay(index * 200)
        .duration(2000)
        .springify()}
    >
      <Pressable onPress={updateCurrentCategory} className={`${activeColorClassName} rounded-lg px-4 py-2`}>
        <Text className={`text-base font-bold ${isActive && "text-white"}`}>{item}</Text>
      </Pressable>
    </Animated.View>
  );
};
