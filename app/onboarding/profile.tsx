import { Screen } from "@/components/Screen";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { Images } from "@/constants/assets";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [level, setLevel] = useState<"beginner" | "intermediate" | "advance">(
    "beginner"
  );
  const [city, setCity] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState<string>("shy");

  const avatars = [
    { id: "shy", image: Images.characters.shy },
    { id: "happy", image: Images.characters.happy },
    { id: "calm", image: Images.characters.calm },
  ];

  const levelData = [
    {
      id: "beginner",
      label: "Beginner",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      image: Images.characters.shy,
    },
    {
      id: "intermediate",
      label: "Intermediate",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      image: Images.characters.calm,
    },
    {
      id: "advance",
      label: "Advance",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      image: Images.characters.happy,
    },
  ];

  const handleSaveProfile = () => {
    router.replace("/(tabs)");
  };

  return (
    <Screen backgroundImage={Images.backgrounds.primary}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >
        <View className="flex-1">
          {/* Header */}
          <View className="gap-3 mb-6 px-6 pt-6">
            <Text className="text-center text-xl font-semibold text-[#645D23] uppercase">
              Create Profile
            </Text>
            <Text variant="muted" className="text-center">
              Every plant parent is unique, tell us a bit about you so we can
              grow together the right way.
            </Text>
          </View>

          {/* Scrollable Content */}
          <ScrollView
            className="flex-1"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 16 }}
            // keyboardShouldPersistTaps="handled"
          >
            <View className="px-6">
              <View className="gap-5">
                {/* Name Input */}
                <View className="gap-3">
                  <View className="flex-row items-center gap-2">
                    <Ionicons name="person-outline" size={18} color="#7A7A7A" />
                    <Text className="text-sm font-medium text-[#645D23]">
                      Your Name
                    </Text>
                  </View>
                  <View
                    className={`border-2 bg-white rounded-full px-6 h-14 justify-center ${
                      name ? "border-primary" : "border-[#E5E5E5]"
                    }`}
                  >
                    <Input
                      placeholder="Enter Your Name"
                      placeholderTextColor="#C3C3C3"
                      value={name}
                      onChangeText={setName}
                      className="text-base text-[#355339] border-0 bg-transparent"
                      style={{ paddingVertical: 0, borderWidth: 0 }}
                    />
                  </View>
                </View>

                {/* Phone Input */}
                <View className="gap-3">
                  <View className="flex-row items-center gap-2">
                    <Ionicons name="call-outline" size={18} color="#7A7A7A" />
                    <Text className="text-sm font-medium text-[#645D23]">
                      Your Mobile Number ( Optional )
                    </Text>
                  </View>
                  <View className="border-2 border-[#E5E5E5] bg-white rounded-full px-6 h-14 justify-center">
                    <Input
                      placeholder="Enter Your Mobile Number"
                      placeholderTextColor="#C3C3C3"
                      value={phone}
                      onChangeText={setPhone}
                      keyboardType="phone-pad"
                      className="text-base text-[#355339] border-0 bg-transparent"
                      style={{ paddingVertical: 0, borderWidth: 0 }}
                    />
                  </View>
                </View>

                {/* Level Selection */}
                <View className="gap-3">
                  <View className="flex-row items-center gap-2">
                    <Ionicons name="leaf-outline" size={18} color="#7A7A7A" />
                    <Text className="text-sm font-medium text-[#645D23]">
                      Your Level
                    </Text>
                  </View>
                  <View className="gap-3">
                    {levelData.map((item) => (
                      <TouchableOpacity
                        key={item.id}
                        onPress={() =>
                          setLevel(
                            item.id as "beginner" | "intermediate" | "advance"
                          )
                        }
                        className={`flex-row items-center p-3 rounded-2xl border-2 ${
                          level === item.id
                            ? "bg-[#FFF3C9] border-primary"
                            : "bg-white border-[#E5E5E5]"
                        }`}
                      >
                        <Image
                          source={item.image}
                          className="w-[60px] h-[60px] rounded-lg"
                          resizeMode="cover"
                        />
                        <View className="flex-1 ml-3">
                          <Text className="text-base font-semibold text-[#355339]">
                            {item.label}
                          </Text>
                          <Text variant="muted" className="text-xs mt-1">
                            {item.desc}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                {/* City Input */}
                <View className="gap-3">
                  <View className="flex-row items-center gap-2">
                    <Ionicons
                      name="location-outline"
                      size={18}
                      color="#7A7A7A"
                    />
                    <Text className="text-sm font-medium text-[#645D23]">
                      Your City
                    </Text>
                  </View>
                  <View className="border-2 border-[#E5E5E5] bg-white rounded-full px-6 h-14 justify-center">
                    <Input
                      placeholder="Your city name"
                      placeholderTextColor="#C3C3C3"
                      value={city}
                      onChangeText={setCity}
                      className="text-base text-[#355339] border-0 bg-transparent"
                      style={{ paddingVertical: 0, borderWidth: 0 }}
                    />
                  </View>
                </View>

                {/* Avatar Selection */}
                <View className="gap-3">
                  <View className="flex-row items-center gap-2">
                    <Ionicons name="happy-outline" size={18} color="#7A7A7A" />
                    <Text className="text-sm font-medium text-[#645D23]">
                      Select Your Avatar
                    </Text>
                  </View>
                  <View className="flex-row gap-3">
                    {avatars.map((avatar) => (
                      <TouchableOpacity
                        key={avatar.id}
                        onPress={() => setSelectedAvatar(avatar.id)}
                        className={`w-[70px] h-[70px] rounded-xl items-center justify-center ${
                          selectedAvatar === avatar.id
                            ? "bg-[#699057]"
                            : "bg-white border-2 border-[#E5E5E5]"
                        }`}
                      >
                        <Image
                          source={avatar.image}
                          className="w-[50px] h-[50px]"
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                    ))}
                    <TouchableOpacity className="w-[70px] h-[70px] bg-white border-2 border-[#E5E5E5] rounded-xl items-center justify-center">
                      <Ionicons
                        name="camera-outline"
                        size={28}
                        color="#C3C3C3"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>

          {/* Fixed Button at Bottom */}
          <View className="px-6 pb-6 pt-2">
            <Button
              className={`rounded-full h-[54px] ${
                name.trim()
                  ? "bg-[#355339] border-2 border-primary"
                  : "bg-[#CED4DA] border-0"
              }`}
              onPress={handleSaveProfile}
              disabled={!name.trim()}
            >
              <Text
                className={`font-medium text-base ${
                  name.trim() ? "text-white" : "text-[#7A7A7A]"
                }`}
              >
                Save Profile
              </Text>
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}
