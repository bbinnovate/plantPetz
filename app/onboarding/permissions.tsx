import { Screen } from "@/components/Screen";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Images } from "@/constants/assets";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Switch, View } from "react-native";

type IconName = keyof typeof Ionicons.glyphMap;

export default function PermissionsScreen() {
  const router = useRouter();
  const [permissions, setPermissions] = useState({
    notifications: false,
    camera: false,
    location: false,
    media: false,
  });

  const togglePermission = (key: keyof typeof permissions) => {
    setPermissions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
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
