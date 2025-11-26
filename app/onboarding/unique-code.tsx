import { Screen } from "@/components/Screen";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Images } from "@/constants/assets";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, TextInput, View } from "react-native";

export default function UniqueCodeScreen() {
  const router = useRouter();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState(false);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const isCodeComplete = code.every((digit) => digit !== "");

  const handleCodeChange = (value: string, index: number) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError(false);

    // Move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (index: number, key: string) => {
    // Handle backspace
    if (key === "Backspace") {
      if (code[index]) {
        // Clear current box if it has value
        const newCode = [...code];
        newCode[index] = "";
        setCode(newCode);
        setError(false);
      } else if (index > 0) {
        // Move to previous box and clear it immediately
        const newCode = [...code];
        newCode[index - 1] = "";
        setCode(newCode);
        setError(false);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleSubmitCode = () => {
    if (isCodeComplete) {
      const codeValue = code.join("");
      // TODO: Verify code with backend
      // For now, simulate error for demo
      if (codeValue === "123459") {
        router.push("/onboarding/permissions");
      } else {
        setError(true);
      }
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
              Unique Code
            </Text>

            {/* Image Placeholder */}
            <View className="bg-[#CED4DA] rounded-2xl h-[180px]" />

            {/* Description */}
            <Text variant="muted" className="text-center text-sm">
              Please enter your unique code to verify your account and activate
              your personalised dashboard.
            </Text>

            {/* Code Input */}
            <View className="gap-3 mt-4">
              <View className="flex-row justify-between gap-2">
                {code.map((digit, index) => (
                  <View
                    key={index}
                    className={`flex-1 h-14 border-2 rounded-lg items-center justify-center ${
                      error
                        ? "border-[#C40101] bg-[#FFDEDF]"
                        : digit
                        ? "border-[#699057] bg-[#DDEFCE]"
                        : "border-[#E5E5E5] bg-white"
                    }`}
                  >
                    <TextInput
                      ref={(ref) => {
                        inputRefs.current[index] = ref;
                      }}
                      value={digit}
                      onChangeText={(value) => handleCodeChange(value, index)}
                      onKeyPress={({ nativeEvent }) =>
                        handleKeyPress(index, nativeEvent.key)
                      }
                      keyboardType="number-pad"
                      maxLength={1}
                      className={`text-center text-lg font-semibold w-full ${
                        error
                          ? "text-[#C40101]"
                          : digit
                          ? "text-[#699057]"
                          : "text-[#C3C3C3]"
                      }`}
                      style={{ textAlign: "center" }}
                    />
                  </View>
                ))}
              </View>

              {error && (
                <Text className="text-sm font-medium text-[#C40101]">
                  Incorrect Code
                </Text>
              )}
            </View>
          </View>

          {/* Bottom Section */}
          <View className="gap-4 pb-6">
            <Button
              variant={isCodeComplete ? "default" : "outline"}
              className={`rounded-full h-[54px] ${
                error
                  ? "bg-[#FFACAD] border-2 border-[#C40101]"
                  : isCodeComplete
                  ? "bg-[#355339] border-2 border-primary"
                  : "bg-[#CED4DA] border-0"
              }`}
              onPress={handleSubmitCode}
              disabled={!isCodeComplete && !error}
            >
              <Text
                className={`font-medium text-base ${
                  error
                    ? "text-[#C40101]"
                    : isCodeComplete
                    ? "text-white"
                    : "text-[#7A7A7A]"
                }`}
              >
                {error ? "Retry" : "Submit Code"}
              </Text>
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}
