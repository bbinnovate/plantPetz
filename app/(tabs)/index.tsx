import { View } from "react-native";
import { Text } from "@/components/ui/text";

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-white justify-center items-center p-6">
      <Text variant="h1" className="font-semibold">
        PlantPetz Home
      </Text>
      <Text variant="p">Your plants will appear here</Text>
    </View>
  );
}
