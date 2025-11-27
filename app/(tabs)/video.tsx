import { Screen } from "@/components/Screen";
import { Text } from "@/components/ui/text";
import { Images } from "@/constants/assets";
import { View } from "react-native";

export default function VideoScreen() {
  return (
    <Screen
      backgroundImage={Images.backgrounds.primary}
      className="p-6 justify-center items-center"
    >
      <Text variant="h1" className="font-semibold">
        Guide & Tutorials
      </Text>
      <View className="mt-4">
        <Text variant="p" className="text-center text-muted">
          Plant care videos and tutorials coming soon
        </Text>
      </View>
    </Screen>
  );
}
