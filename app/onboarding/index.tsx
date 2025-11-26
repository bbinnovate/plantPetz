import { Screen } from "@/components/Screen";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Images } from "@/constants/assets";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, View } from "react-native";

export default function SignUpScreen() {
  const router = useRouter();

  const handleGoogleSignIn = () => {
    router.push("/onboarding/profile");
  };

  const handleAppleSignIn = () => {
    router.push("/onboarding/profile");
  };

  const handleEmailSignIn = () => {
    router.push("/onboarding/email-signin");
  };

  return (
    <Screen backgroundImage={Images.backgrounds.primary}>
      <View className="flex-1">
        {/* Logo Header */}
        <View className="items-center pt-6">
          <Image
            source={Images.icons.logo}
            className="w-[180px] h-[32px]"
            resizeMode="contain"
          />
        </View>

        {/* Character and Content */}
        <View className="flex-1 items-center justify-between px-6 pb-6">
          <View className="flex-1 items-center justify-center">
            {/* Large Character */}
            <Image
              source={Images.characters.calm}
              className="w-[320px] h-[380px]"
              resizeMode="cover"
            />

            {/* Text directly below character */}
            <Text variant="muted" className="text-center px-6 mt-2">
              Before we dive in, we&apos;d love to know a little more{"\n"}about
              you.
            </Text>
          </View>

          {/* Auth Buttons */}
          <View className="w-full gap-3">
            <Button
              variant="outline"
              className="border-2 border-primary bg-white rounded-full h-[54px] flex-row items-center justify-center gap-2"
              onPress={handleEmailSignIn}
            >
              <Ionicons name="mail-outline" size={18} color="#1A1A1A" />
              <Text className="text-black font-medium text-sm">
                Sign In With Email
              </Text>
            </Button>

            <Button
              variant="outline"
              className="border-2 border-primary bg-white rounded-full h-[54px] flex-row items-center justify-center gap-2"
              onPress={handleGoogleSignIn}
              disabled
            >
              <Ionicons name="logo-google" size={18} color="#1A1A1A" />
              <Text className="text-black font-medium text-sm">
                Sign In With Google
              </Text>
            </Button>

            <Button
              variant="outline"
              className="border-2 border-primary bg-white rounded-full h-[54px] flex-row items-center justify-center gap-2"
              onPress={handleAppleSignIn}
              disabled
            >
              <Ionicons name="logo-apple" size={18} color="#1A1A1A" />
              <Text className="text-black font-medium text-sm">
                Sign In With Apple
              </Text>
            </Button>
          </View>
        </View>
      </View>
    </Screen>
  );
}
