import { FiltersKeyType, FilterType } from "@/constants/data";
import { Dispatch, SetStateAction, useState } from "react";
import { View, Text, Pressable } from "react-native";

interface CommonFilterRowProps {
  title: string;
  filterValues: string[];
  filters: FilterType;
  setFilters: Dispatch<SetStateAction<FilterType>>;
}

export const CommonFilterRow = ({ title, filterValues, filters, setFilters }: CommonFilterRowProps) => {
  const isColor = title === "colors";

  const toggleFilter = (filter: string) => {
    const currentFilter = filters?.[title as FiltersKeyType];
    if (currentFilter !== filter) {
      const newFilter = { [title]: filter };
      setFilters({ ...filters, ...newFilter });
    } else {
      const copy = { ...filters };
      delete copy[title as FiltersKeyType];
      setFilters(copy);
    }
  };

  return (
    <View>
      <Text className="font-semibold capitalize text-xl">{title}</Text>
      <View className="flex flex-row gap-2 flex-wrap py-2">
        {filterValues.map((filter, index) => {
          const selectedFilter = filters?.[title as FiltersKeyType];
          const isActive = filter == selectedFilter;
          const activeClassName = `${isActive ? `bg-neutral-400/80` : ""}`;
          return (
            <Pressable
              key={`${title}-${filter}-${index}`}
              className={`${activeClassName} ${
                isColor && "mx-auto"
              } px-4 py-2 border border-neutral-500/20 rounded-xl active:bg-neutral-300`}
              onPress={() => toggleFilter(filter)}
            >
              {!isColor && <Text className={isActive ? "text-white font-bold" : ""}>{filter}</Text>}
              {isColor && <View className="w-4 h-4 rounded-full border" style={{ backgroundColor: filter }}></View>}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};
