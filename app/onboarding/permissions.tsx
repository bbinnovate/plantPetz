import { Screen } from "@/components/Screen";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Images } from "@/constants/assets";
import { Ionicons } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { Linking, Alert, Switch, View } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";

type IconName = keyof typeof Ionicons.glyphMap;

export default function PermissionsScreen() {
  const router = useRouter();
  const [permissions, setPermissions] = useState({
    notifications: false,
    camera: false,
    location: false,
    media: false,
  });

  // Load existing permission states on mount
  useEffect(() => {
    (async () => {
      try {
        const [notif, cam, loc, lib] = await Promise.all([
          Notifications.getPermissionsAsync(),
          Camera.getCameraPermissionsAsync(),
          Location.getForegroundPermissionsAsync().catch(() => ({
            status: "undetermined" as const,
          })),
          MediaLibrary.getPermissionsAsync(),
        ]);

        setPermissions({
          notifications: notif.status === "granted",
          camera: cam.status === "granted",
          location: loc.status === "granted",
          media: lib.status === "granted",
        });
      } catch {
        // Best-effort: keep defaults if something fails
      }
    })();
  }, []);

  const openSettings = () => Linking.openSettings();

  const requestPermission = async (key: keyof typeof permissions) => {
    try {
      let granted = false;
      switch (key) {
        case "notifications": {
          const { status } = await Notifications.requestPermissionsAsync();
          granted = status === "granted";
          break;
        }
        case "camera": {
          const { status } = await Camera.requestCameraPermissionsAsync();
          granted = status === "granted";
          break;
        }
        case "location": {
          const { status } = await Location.requestForegroundPermissionsAsync();
          granted = status === "granted";
          break;
        }
        case "media": {
          const { status } = await MediaLibrary.requestPermissionsAsync();
          granted = status === "granted";
          break;
        }
      }

      setPermissions((prev) => ({ ...prev, [key]: granted }));

      if (!granted) {
        Alert.alert(
          "Permission needed",
          "To enable this feature, please allow access in your device Settings.",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Open Settings", onPress: openSettings },
          ]
        );
      }
    } catch {
      Alert.alert("Error", "Could not request permission. Please try again.");
    }
  };

  const togglePermission = (key: keyof typeof permissions) => {
    setPermissions((prev) => ({ ...prev }));
    // If turning on, request permission; turning off requires user action in Settings
    if (!permissions[key]) {
      requestPermission(key);
    } else {
      Alert.alert(
        "Turn off permission",
        "Permissions can only be turned off from device Settings.",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Open Settings", onPress: openSettings },
        ]
      );
    }
  };

  const handleDone = () => {
    router.push("/onboarding/profile");
  };

  const PermissionItem = ({
    icon,
    title,
    description,
    value,
    onToggle,
  }: {
    icon: IconName;
    title: string;
    description: string;
    value: boolean;
    onToggle: () => void;
  }) => (
    <View
      className={`flex-row items-center justify-between bg-white border-2 rounded-2xl p-4 ${
        value === true ? "border-primary" : `border-[#E5E5E5]`
      }`}
    >
      <View className="flex-1 gap-2 pr-3">
        <View className="flex-row items-center gap-3">
          <Ionicons name={icon} size={20} color="#699057" />
          <Text className="text-base font-semibold text-[#355339]">
            {title}
          </Text>
        </View>
        <Text variant="muted">{description}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: "#E5E5E5", true: "#699057" }}
        thumbColor="#FDC526"
        ios_backgroundColor="#E5E5E5"
      />
    </View>
  );

  return (
    <Screen backgroundImage={Images.backgrounds.primary}>
      <View className="flex-1 px-6 pt-6 justify-between">
        {/* Header */}
        <View className="gap-4">
          <Text className="text-center text-xl font-semibold text-[#645D23] uppercase">
            App Permissions
          </Text>
          <Text variant="muted" className="text-center">
            Please enter your unique code to verify your account and activate
            your personalised dashboard.
          </Text>
        </View>

        {/* Permission Items */}
        <View className="flex-1 my-6 gap-4">
          <PermissionItem
            icon="notifications-outline"
            title="Notifications"
            description="Get timely reminders to water and care for your plants."
            value={permissions.notifications}
            onToggle={() => togglePermission("notifications")}
          />

          <PermissionItem
            icon="camera-outline"
            title="Camera"
            description="Take photos of your plants to track their growth."
            value={permissions.camera}
            onToggle={() => togglePermission("camera")}
          />

          <PermissionItem
            icon="location-outline"
            title="Location"
            description="Get location-based plant care tips and weather updates."
            value={permissions.location}
            onToggle={() => togglePermission("location")}
          />

          <PermissionItem
            icon="images-outline"
            title="Media"
            description="Access your photo library to add plant images."
            value={permissions.media}
            onToggle={() => togglePermission("media")}
          />
        </View>

        {/* Done Button */}
        <View className="pb-6">
          <Button
            className="bg-[#355339] rounded-full h-[54px] border-2 border-primary"
            onPress={handleDone}
          >
            <Text className="text-white font-medium text-base">Done</Text>
          </Button>
        </View>
      </View>
    </Screen>
  );
}
