import { Text } from "@/components/ui/text";
import { Images } from "@/constants/assets";
import { Image, View } from "react-native";

export default function OnboardingScreen() {
  return (
    <View className="flex-1 bg-background">
      <Image
        source={Images.backgrounds.primary}
        className="absolute w-full h-full"
        resizeMode="cover"
      />

      <View className="flex-1 justify-center items-center px-6">
        <Image
          source={Images.icons.logo}
          className="w-[200px] h-20 mb-8"
          resizeMode="contain"
        />

        <Text variant="h1" className="text-center mb-3 font-semibold">
          Welcome to PlantPetz
        </Text>
        <Text variant="p" className="text-center text-mediumGray">
          Your plants have feelings too. Let&apos;s chat with them!
        </Text>
      </View>
    </View>
  );
}
