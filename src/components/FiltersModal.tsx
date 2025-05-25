import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { Dispatch, forwardRef, SetStateAction, useMemo, useState } from "react";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from "react-native-reanimated";
import { BlurView } from "expo-blur";
import { data, FiltersKeyType, FilterType } from "@/constants/data";
import { CommonFilterRow } from "./FiltersView";

interface Props {
  innerRef?: React.Ref<BottomSheetModal>;
  filters: FilterType;
  setFilters: Dispatch<SetStateAction<FilterType>>;
  closeFiltersModal?: () => void;
}

export const FiltersModal = forwardRef<BottomSheetModal, Props>(
  ({ innerRef, filters, setFilters, closeFiltersModal }, ref) => {
    const snapPoints = useMemo(() => ["75%"], []);

    const [temporalFilters, setTemporalFilters] = useState<FilterType>({
      order: "",
      orientation: "",
      type: "",
      colors: "",
    });

    const applyFilters = () => {
      setFilters(temporalFilters);
      if (!!closeFiltersModal) {
        closeFiltersModal();
      }
    };

    const resetFilters = () => {
      setFilters({
        order: "",
        orientation: "",
        type: "",
        colors: "",
      });
      setTemporalFilters({
        order: "",
        orientation: "",
        type: "",
        colors: "",
      });
      if (!!closeFiltersModal) {
        closeFiltersModal();
      }
    };

    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backdropComponent={CustomBackdrop}
      >
        <BottomSheetView style={styles.contentContainer} className="px-4">
          <View className="flex-1 gap-6 w-full">
            <Text className="text-2xl font-semibold">Filters</Text>
            <View className="px-2">
              {Object.keys(data.filters).map((filterName, index) => (
                <CommonFilterRow
                  key={`${filterName}-${index}`}
                  title={filterName}
                  filterValues={data.filters[filterName as FiltersKeyType]}
                  setFilters={setTemporalFilters}
                  filters={temporalFilters}
                />
              ))}
            </View>
            <View className="px-4 flex flex-row gap-2 items-center justify-center ">
              <Pressable
                onPress={resetFilters}
                className="flex flex-row justify-center w-1/2 px-4 py-3 border border-neutral-500 rounded-xl active:bg-neutral-300"
              >
                <Text>Reset</Text>
              </Pressable>
              <Pressable
                onPress={applyFilters}
                className="flex flex-row justify-center w-1/2 px-4 py-3 border rounded-xl bg-neutral-600 active:bg-neutral-600/80"
              >
                <Text className="text-white">Apply</Text>
              </Pressable>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

const CustomBackdrop = ({ animatedIndex, style }: { animatedIndex: SharedValue<number>; style?: any }) => {
  const containerAnimatedStyles = useAnimatedStyle(() => {
    let opacity = interpolate(animatedIndex.value, [-1, 0], [0, 1], Extrapolation.CLAMP);
    return {
      opacity,
    };
  });
  const containerStyles = [StyleSheet.absoluteFill, style, styles.overlay, containerAnimatedStyles];
  return (
    <Animated.View style={containerStyles}>
      <BlurView style={StyleSheet.absoluteFillObject} tint="dark" intensity={25}></BlurView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
