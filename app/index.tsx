import { View, Text, Image, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { AppImages } from "@/core/assets/images";
import { wp, hp } from "@/helpers/common";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useRouter } from "expo-router";
import { useTailwind } from "nativewind";

const WelcomeScreen = () => {
  const router = useRouter();
  return (
    <View className="flex-1">
      <StatusBar style="light" />
      <Image
        source={AppImages.welcomeBG}
        className="absolute"
        resizeMode="cover"
        style={{ width: wp(100), height: hp(100) }}
      />
      <Animated.View entering={FadeInDown.duration(1000)} className="flex-1">
        <LinearGradient
          className="absolute bottom-0"
          colors={["transparent", "white"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 0.8 }}
          style={{ width: wp(100), height: hp(100) }}
        />
        <View className="flex-1 justify-end items-center gap-4 pb-24">
          <Animated.Text entering={FadeInDown.delay(400).springify()} className="font-bold text-black text-4xl">
            Pixels
          </Animated.Text>
          <Animated.Text entering={FadeInDown.delay(500).springify()} className="text-xl mb-4">
            Every Pixel Tells a story
          </Animated.Text>
          <Animated.View entering={FadeInDown.delay(500).springify()}>
            <Pressable
              className="bg-neutral-900 px-24 py-3 rounded-xl active:opacity-70"
              onPress={() => router.navigate("/home")}
            >
              <Text className="text-white text-xl">Start Explore</Text>
            </Pressable>
          </Animated.View>
        </View>
      </Animated.View>
    </View>
  );
};

export default WelcomeScreen;
