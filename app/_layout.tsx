import { Stack } from "expo-router";
import { NativeWindStyleSheet } from "nativewind";
import { BottomSheetModal, BottomSheetView, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

NativeWindStyleSheet.setOutput({
  default: "native",
});

const _layout = () => {
  return (
    <GestureHandlerRootView className="flex-1">
      <BottomSheetModalProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="home" options={{ headerShown: false }} />
        </Stack>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default _layout;
