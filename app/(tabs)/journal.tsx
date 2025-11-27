import { Screen } from "@/components/Screen";
import { Text } from "@/components/ui/text";
import { Images } from "@/constants/assets";
import { View } from "react-native";

export default function JournalScreen() {
  return (
    <Screen
      backgroundImage={Images.backgrounds.primary}
      className="justify-center items-center p-6"
    >
      <Text variant="h1" className="font-semibold">
        Journal
      </Text>
      <View className="mt-4">
        <Text variant="p" className="text-center text-muted">
          Your plant care journal entries will appear here
        </Text>
      </View>
    </Screen>
  );
}
