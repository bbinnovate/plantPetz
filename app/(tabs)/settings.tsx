import { Screen } from "@/components/Screen";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { Images } from "@/constants/assets";

export default function SettingsScreen() {
  const { signOut } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.replace("/onboarding");
  };

  return (
    <Screen backgroundImage={Images.backgrounds.primary} className="p-6">
      <View className="flex-1 justify-center items-center">
        <Text variant="h1" className="font-semibold">
          Settings
        </Text>

        <View>
          <View className="p-4">
            <Text variant="muted" className="text-sm">
              {user?.primaryEmailAddress?.emailAddress ||
                user?.fullName ||
                "User"}
            </Text>
          </View>

          <View className="mt-4">
            <Button onPress={handleSignOut} variant="outline">
              <Text className="text-sm">Sign Out</Text>
            </Button>
          </View>
        </View>
      </View>
    </Screen>
  );
}
