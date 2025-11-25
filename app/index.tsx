import { Redirect } from "expo-router";

export default function Index() {
  // Check if user is authenticated
  // If authenticated, redirect to /(tabs)
  // If not, redirect to /onboarding

  return <Redirect href="/onboarding" />;
}


