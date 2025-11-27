import { Screen } from "@/components/Screen";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { View } from "react-native";

export default function HomeScreen() {
  const { signOut } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.replace("/onboarding");
  };

  return (
    <Screen className="bg-background justify-center items-center p-6">
      <Text variant="h1" className="font-semibold">
        Welcome to PlantPetz! 🌱
      </Text>
      <Text variant="p" className="mt-2">
        Signed in as:{" "}
        {user?.primaryEmailAddress?.emailAddress || user?.fullName || "User"}
      </Text>

      <View className="mt-8">
        <Button onPress={handleSignOut} variant="outline">
          <Text className="text-sm">Sign Out</Text>
        </Button>
      </View>
    </Screen>
  );
}
