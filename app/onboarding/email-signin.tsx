import { Screen } from "@/components/Screen";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { Images } from "@/constants/assets";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";

export default function EmailSignInScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const isValidEmail = email.length > 0 && email.includes("@");

  const handleSendOTP = () => {
    if (isValidEmail) {
      router.push("/onboarding/verify-otp");
    }
  };

  return (
    <Screen backgroundImage={Images.backgrounds.primary}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View className="flex-1 px-6 pt-6 justify-between">
          {/* Header */}
          <View className="gap-4">
            <Text className="text-center text-xl font-semibold text-[#645D23] uppercase">
              Sign In With Email
            </Text>
            <Text variant="muted" className="text-center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod.
            </Text>

            {/* Email Input */}
            <View className="gap-3">
              <View className="flex-row items-center gap-2">
                <Ionicons name="mail-outline" size={20} color="#7A7A7A" />
                <Text className="text-sm font-medium text-[#645D23]">
                  Your Email
                </Text>
              </View>

              <Input
                placeholder="Enter Your Email"
                placeholderTextColor="#C3C3C3"
                value={email}
                onChangeText={setEmail}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                className={`h-14 rounded-full px-6 text-base text-[#355339] bg-white ${
                  isFocused && email.length > 0
                    ? "border-2 border-primary"
                    : "border-2 border-[#E5E5E5]"
                }`}
              />
            </View>
          </View>

          {/* Bottom Section */}
          <View className="gap-6 pb-6">
            {/* Send OTP Button */}
            <Button
              variant={isValidEmail ? "default" : "outline"}
              className={`rounded-full h-[54px] ${
                isValidEmail
                  ? "bg-[#355339] border-2 border-primary"
                  : "bg-[#CED4DA] border-0"
              }`}
              onPress={handleSendOTP}
              disabled={!isValidEmail}
            >
              <Text
                className={`font-medium text-base ${
                  isValidEmail ? "text-white" : "text-[#7A7A7A]"
                }`}
              >
                Send OTP
              </Text>
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}
