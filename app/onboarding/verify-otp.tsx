import { Screen } from "@/components/Screen";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Images } from "@/constants/assets";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function VerifyOTPScreen() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const isOtpComplete = otp.every((digit) => digit !== "");

  const handleOtpChange = (value: string, index: number) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (index: number, key: string) => {
    // Handle backspace
    if (key === "Backspace") {
      if (otp[index]) {
        // Clear current box if it has value
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        // Move to previous box and clear it immediately
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleSubmitOTP = () => {
    if (isOtpComplete) {
      router.push("/onboarding/unique-code");
    }
  };

  const handleReenterEmail = () => {
    router.back();
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

            {/* OTP Input */}
            <View className="gap-3">
              <View className="flex-row items-center gap-2">
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="#7A7A7A"
                />
                <Text className="text-sm font-medium text-[#645D23]">
                  Enter OTP
                </Text>
              </View>

              {/* OTP Boxes */}
              <View className="flex-row justify-between gap-2">
                {otp.map((digit, index) => (
                  <View
                    key={index}
                    className={`flex-1 h-14 border-2 rounded-lg items-center justify-center ${
                      digit
                        ? "border-[#699057] bg-[#DDEFCE]"
                        : "border-[#E5E5E5] bg-white"
                    }`}
                  >
                    <TextInput
                      ref={(ref) => {
                        inputRefs.current[index] = ref;
                      }}
                      value={digit}
                      onChangeText={(value) => handleOtpChange(value, index)}
                      onKeyPress={({ nativeEvent }) =>
                        handleKeyPress(index, nativeEvent.key)
                      }
                      keyboardType="number-pad"
                      maxLength={1}
                      className={`text-center text-lg font-semibold w-full ${
                        digit ? "text-[#699057]" : "text-[#C3C3C3]"
                      }`}
                      style={{ textAlign: "center" }}
                    />
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* Bottom Section */}
          <View className="gap-4 pb-6">
            <Button
              variant={isOtpComplete ? "default" : "outline"}
              className={`rounded-full h-[54px] ${
                isOtpComplete
                  ? "bg-[#355339] border-2 border-primary"
                  : "bg-[#CED4DA] border-0"
              }`}
              onPress={handleSubmitOTP}
              disabled={!isOtpComplete}
            >
              <Text
                className={`font-medium text-base ${
                  isOtpComplete ? "text-white" : "text-[#7A7A7A]"
                }`}
              >
                Submit OTP
              </Text>
            </Button>

            <TouchableOpacity onPress={handleReenterEmail}>
              <Text className="text-center text-sm text-[#355339] underline">
                Re-enter the email
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}
