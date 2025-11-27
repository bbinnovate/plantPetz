import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";

export default function Index() {
  const { isSignedIn, isLoaded } = useAuth();

  // Wait for auth to load
  if (!isLoaded) {
    return null;
  }

  // If authenticated, go to main app
  if (isSignedIn) {
    return <Redirect href="/(tabs)" />;
  }

  // If not authenticated, go to onboarding
  return <Redirect href="/onboarding" />;
}
