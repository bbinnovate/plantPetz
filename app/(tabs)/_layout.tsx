import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { isLiquidGlassAvailable } from "expo-glass-effect";
import { Redirect } from "expo-router";
import {
  Icon,
  Label,
  NativeTabs,
  VectorIcon,
} from "expo-router/unstable-native-tabs";
import React from "react";
import {
  ColorValue,
  DynamicColorIOS,
  ImageSourcePropType,
  Platform,
} from "react-native";

type VectorIconFamily = {
  getImageSource: (
    name: string,
    size: number,
    color: ColorValue
  ) => Promise<ImageSourcePropType>;
};

export default function TabLayout() {
  const { isSignedIn, isLoaded } = useAuth();

  // Wait for auth to load
  if (!isLoaded) {
    return null;
  }

  // redirect to onboarding if not signed in
  if (!isSignedIn) {
    return <Redirect href="/onboarding" />;
  }

  const tintColor = "#355339";
  const inactiveTintColor =
    Platform.OS === "ios" && isLiquidGlassAvailable()
      ? DynamicColorIOS({
          light: "#00000090",
          dark: "#FFFFFF90",
        })
      : "#7A7A7A";

  const labelSelectedStyle =
    Platform.OS === "ios" ? { color: tintColor } : undefined;

  return (
    <NativeTabs
      tintColor={
        Platform.OS === "ios"
          ? DynamicColorIOS({ light: tintColor, dark: tintColor })
          : tintColor
      }
      iconColor={
        Platform.OS === "ios" && isLiquidGlassAvailable()
          ? DynamicColorIOS({
              light: "#355339",
              dark: "#355339",
            })
          : inactiveTintColor
      }
      labelStyle={{
        color:
          Platform.OS === "ios" && isLiquidGlassAvailable()
            ? DynamicColorIOS({
                light: "#355339",
                dark: "#355339",
              })
            : inactiveTintColor,
      }}
      labelVisibilityMode="labeled"
      disableTransparentOnScrollEdge={true}
      badgeBackgroundColor={tintColor}
    >
      <NativeTabs.Trigger name="index">
        {Platform.select({
          ios: <Icon sf="house" />,
          android: (
            <Icon
              src={
                <VectorIcon
                  family={Ionicons as VectorIconFamily}
                  name="home-outline"
                />
              }
              selectedColor={tintColor}
            />
          ),
        })}
        <Label selectedStyle={labelSelectedStyle}>Home</Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="journal">
        {Platform.select({
          ios: <Icon sf="book" />,
          android: (
            <Icon
              src={
                <VectorIcon
                  family={Ionicons as VectorIconFamily}
                  name="book-outline"
                />
              }
              selectedColor={tintColor}
            />
          ),
        })}
        <Label selectedStyle={labelSelectedStyle}>Journal</Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="video">
        {Platform.select({
          ios: <Icon sf="play.circle" />,
          android: (
            <Icon
              src={
                <VectorIcon
                  family={Ionicons as VectorIconFamily}
                  name="play-circle-outline"
                />
              }
              selectedColor={tintColor}
            />
          ),
        })}
        <Label selectedStyle={labelSelectedStyle}>Guide</Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="settings">
        {Platform.select({
          ios: <Icon sf="gearshape" />,
          android: (
            <Icon
              src={
                <VectorIcon
                  family={Ionicons as VectorIconFamily}
                  name="settings-outline"
                />
              }
              selectedColor={tintColor}
            />
          ),
        })}
        <Label selectedStyle={labelSelectedStyle}>Settings</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
