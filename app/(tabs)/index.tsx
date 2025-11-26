import { Screen } from "@/components/Screen";
import { Text } from "@/components/ui/text";

export default function HomeScreen() {
  return (
    <Screen className="bg-background justify-center items-center p-6">
      <Text variant="h1" className="font-semibold">
        PlantPetz Home
      </Text>
      <Text variant="p">Your plants will appear here</Text>
    </Screen>
  );
}
