import { Screen } from "@/components/Screen";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Images } from "@/constants/assets";
import { syncClerkUserToFirestore } from "@/services/clerk-sync";
import { useClerk, useSSO } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useState } from "react";
import { ActivityIndicator, Alert, Image, View } from "react-native";

// Ensure browser auth session completes
WebBrowser.maybeCompleteAuthSession();

export default function SignUpScreen() {
  const router = useRouter();
  const [googleLoading, setGoogleLoading] = useState(false);
  const [appleLoading, setAppleLoading] = useState(false);
  const clerk = useClerk();
  const { startSSOFlow } = useSSO();

  const handleGoogleSignIn = async () => {
    try {
      setGoogleLoading(true);
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_google",
      });

      // If sign in was successful, set the active session
      if (createdSessionId) {
        await setActive!({ session: createdSessionId });

        // Wait a moment for Clerk to fully populate the user
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Get user data from Clerk using the clerk instance
        const user = clerk.user;

        if (!user) {
          throw new Error("User data not available");
        }

        // Sync with Firebase and get user status
        const userStatus = await syncClerkUserToFirestore(
          user.id,
          user.primaryEmailAddress?.emailAddress,
          user.fullName,
          user.imageUrl
        );

        console.log("User status:", userStatus);

        // Navigate based on user status
        if (userStatus.isNewUser || !userStatus.hasEnteredCode) {
          router.push("/onboarding/unique-code");
        } else if (!userStatus.profileComplete) {
          router.push("/onboarding/profile");
        } else {
          router.push("/(tabs)");
        }
      }
    } catch (err: any) {
      console.error("Google Sign-In error:", err);
      Alert.alert(
        "Sign In Failed",
        err.message || "An unexpected error occurred"
      );
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleAppleSignIn = async () => {
    try {
      setAppleLoading(true);
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_apple",
      });

      if (createdSessionId) {
        await setActive!({ session: createdSessionId });

        await new Promise((resolve) => setTimeout(resolve, 1000));

        const user = clerk.user;

        if (!user) {
          throw new Error("User data not available");
        }

        const userStatus = await syncClerkUserToFirestore(
          user.id,
          user.primaryEmailAddress?.emailAddress,
          user.fullName,
          user.imageUrl
        );

        console.log("User status:", userStatus);

        if (userStatus.isNewUser || !userStatus.hasEnteredCode) {
          router.push("/onboarding/unique-code");
        } else if (!userStatus.profileComplete) {
          router.push("/onboarding/profile");
        } else {
          router.push("/(tabs)");
        }
      }
    } catch (err: any) {
      console.error("Apple Sign-In error:", err);
      Alert.alert(
        "Sign In Failed",
        err.message || "An unexpected error occurred"
      );
    } finally {
      setAppleLoading(false);
    }
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
            source={Images.icons.nameLogo}
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
              disabled={googleLoading || appleLoading}
            >
              {googleLoading ? (
                <ActivityIndicator size="small" color="#1A1A1A" />
              ) : (
                <>
                  <Ionicons name="logo-google" size={18} color="#1A1A1A" />
                  <Text className="text-black font-medium text-sm">
                    Sign In With Google
                  </Text>
                </>
              )}
            </Button>

            <Button
              variant="outline"
              className="border-2 border-primary bg-white rounded-full h-[54px] flex-row items-center justify-center gap-2"
              onPress={handleAppleSignIn}
              disabled={googleLoading || appleLoading}
            >
              {appleLoading ? (
                <ActivityIndicator size="small" color="#1A1A1A" />
              ) : (
                <>
                  <Ionicons name="logo-apple" size={18} color="#1A1A1A" />
                  <Text className="text-black font-medium text-sm">
                    Sign In With Apple
                  </Text>
                </>
              )}
            </Button>
          </View>
        </View>
      </View>
    </Screen>
  );
}
