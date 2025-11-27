import { Images } from "@/constants/assets";
import { ClerkProvider } from "@clerk/clerk-expo";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Asset } from "expo-asset";
import { Stack } from "expo-router";
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";

// Token cache for Clerk
const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch {
      return;
    }
  },
};

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: "index",
};

// Preload critical images
async function preloadAssets() {
  try {
    const imageAssets = [
      Images.backgrounds.primary,
      Images.backgrounds.splash,
      Images.icons.logo,
      Images.icons.nameLogo,
      Images.characters.calm,
      Images.characters.happy,
      Images.characters.shy,
    ];

    const cacheImages = imageAssets.map((image) => {
      return Asset.fromModule(image).downloadAsync();
    });

    await Promise.all(cacheImages);
  } catch (error) {
    console.warn("Error preloading assets:", error);
  }
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  useEffect(() => {
    preloadAssets().then(() => setAssetsLoaded(true));
  }, []);

  useEffect(() => {
    if (fontsLoaded && assetsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, assetsLoaded]);

  if (!fontsLoaded || !assetsLoaded) {
    return null;
  }

  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

  if (!publishableKey) {
    throw new Error(
      "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
    );
  }

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <SafeAreaProvider>
        <ThemeProvider value={DefaultTheme}>
          <Stack
            screenOptions={{ contentStyle: { backgroundColor: "#FFFFFF" } }}
          >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
              name="onboarding/index"
              options={{ headerShown: false, title: "Welcome" }}
            />
            <Stack.Screen
              name="onboarding/email-signin"
              options={{ headerShown: false, title: "Email Sign In" }}
            />
            <Stack.Screen
              name="onboarding/verify-otp"
              options={{ headerShown: false, title: "Verify OTP" }}
            />
            <Stack.Screen
              name="onboarding/unique-code"
              options={{ headerShown: false, title: "Unique Code" }}
            />
            <Stack.Screen
              name="onboarding/permissions"
              options={{ headerShown: false, title: "Permissions" }}
            />
            <Stack.Screen
              name="onboarding/profile"
              options={{ headerShown: false, title: "Create Profile" }}
            />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
          <StatusBar style="dark" />
        </ThemeProvider>
      </SafeAreaProvider>
    </ClerkProvider>
  );
}
