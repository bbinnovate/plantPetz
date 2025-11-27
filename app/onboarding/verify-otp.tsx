import { Screen } from "@/components/Screen";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Images } from "@/constants/assets";
import { syncClerkUserToFirestore } from "@/services/clerk-sync";
import { useClerk, useSignIn } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { OTPInput } from "input-otp-native";
import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  View,
} from "react-native";

export default function VerifyOTPScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ email: string }>();
  const email = params.email;
  const { signIn, setActive } = useSignIn();
  const clerk = useClerk();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isOtpComplete = otp.length === 6;

  const handleOtpChange = (value: string) => {
    setOtp(value);
    setError(null);
  };

  const handleSubmitOTP = async () => {
    if (!isOtpComplete || !signIn) return;

    try {
      setLoading(true);
      setError(null);

      // Attempt to verify the code
      const result = await signIn.attemptFirstFactor({
        strategy: "email_code",
        code: otp,
      });

      if (result.status === "complete") {
        await setActive!({ session: result.createdSessionId! });

        await new Promise((resolve) => setTimeout(resolve, 1000));

        const user = clerk.user;

        if (!user) {
          throw new Error("User data not available");
        }

        const userStatus = await syncClerkUserToFirestore(
          user.id,
          user.primaryEmailAddress?.emailAddress,
          user.fullName,
          user.imageUrl
        );

        console.log("User status:", userStatus);

        if (userStatus.isNewUser || !userStatus.hasEnteredCode) {
          router.push("/onboarding/unique-code");
        } else if (!userStatus.profileComplete) {
          router.push("/onboarding/profile");
        } else {
          router.push("/(tabs)");
        }
      }
    } catch (err: any) {
      console.error("Error verifying OTP:", err);

      let errorMessage = "Invalid code. Please try again.";

      if (err?.errors?.[0]?.message) {
        const clerkError = err.errors[0].message;
        if (
          clerkError.includes("Incorrect code") ||
          clerkError.includes("incorrect")
        ) {
          errorMessage =
            "The code you entered is incorrect. Please check and try again.";
        } else if (clerkError.includes("expired")) {
          errorMessage = "This code has expired. Please request a new one.";
        } else if (clerkError.includes("attempts")) {
          errorMessage = "Too many attempts. Please request a new code.";
        } else {
          errorMessage = clerkError;
        }
      } else if (
        err?.message?.includes("network") ||
        err?.message?.includes("Network")
      ) {
        errorMessage = "Network error. Please check your connection.";
      }

      setError(errorMessage);

      setOtp("");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!signIn || !email || resending) return;

    try {
      setResending(true);
      setError(null);
      setOtp("");

      // Resend the code
      await signIn.create({
        identifier: email,
        strategy: "email_code",
      });
    } catch (err: any) {
      console.error("Error resending OTP:", err);
      setError(
        err?.errors?.[0]?.message || "Failed to resend code. Please try again."
      );
    } finally {
      setResending(false);
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
              {email
                ? `We sent a code to ${email}. Enter it below to verify your email.`
                : "Enter the 6-digit code sent to your email."}
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

              <OTPInput
                maxLength={6}
                value={otp}
                onChange={handleOtpChange}
                textAlign="center"
                editable={!loading && !resending}
                autoFocus
                containerStyle={{
                  gap: 8,
                }}
                render={({ slots }) => (
                  <View className="flex-row gap-2">
                    {slots.map((slot, index) => (
                      <View
                        key={index}
                        className={`flex-1 h-14 border-2 rounded-lg items-center justify-center ${
                          error
                            ? "border-[#C40101] bg-[#FFDEDF]"
                            : slot.char
                            ? "border-[#699057] bg-[#DDEFCE]"
                            : "border-[#E5E5E5] bg-white"
                        }`}
                      >
                        <Text
                          className={`text-center text-lg font-semibold ${
                            error
                              ? "text-[#C40101]"
                              : slot.char
                              ? "text-[#699057]"
                              : "text-[#C3C3C3]"
                          }`}
                        >
                          {slot.char || (slot.isActive ? "|" : "")}
                        </Text>
                      </View>
                    ))}
                  </View>
                )}
              />

              {error && (
                <View className="bg-[#FFDEDF] border border-[#C40101] rounded-lg p-3">
                  <Text className="text-sm font-medium text-[#C40101] text-center">
                    {error}
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* Bottom Section */}
          <View className="gap-4 pb-6">
            <Button
              variant={isOtpComplete ? "default" : "outline"}
              className={`rounded-full h-[54px] ${
                error
                  ? "bg-[#FFACAD] border-2 border-[#C40101]"
                  : isOtpComplete
                  ? "bg-[#355339] border-2 border-primary"
                  : "bg-[#CED4DA] border-0"
              }`}
              onPress={handleSubmitOTP}
              disabled={!isOtpComplete || loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Text
                  className={`font-medium text-base ${
                    error
                      ? "text-[#C40101]"
                      : isOtpComplete
                      ? "text-white"
                      : "text-[#7A7A7A]"
                  }`}
                >
                  {error ? "Try Again" : "Submit OTP"}
                </Text>
              )}
            </Button>

            {/* Resend and Re-enter options */}
            <View className="flex-row justify-center items-center gap-4">
              <TouchableOpacity onPress={handleResendOTP} disabled={resending}>
                <Text className="text-center text-sm text-[#355339] underline">
                  {resending ? "Sending..." : "Resend Code"}
                </Text>
              </TouchableOpacity>

              <Text className="text-[#C3C3C3]">•</Text>

              <TouchableOpacity onPress={handleReenterEmail}>
                <Text className="text-center text-sm text-[#355339] underline">
                  Change Email
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}
