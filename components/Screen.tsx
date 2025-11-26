import { Image, ImageSourcePropType, View, ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ScreenProps extends ViewProps {
  children: React.ReactNode;
  className?: string;
  disableSafeArea?: boolean;
  backgroundImage?: ImageSourcePropType;
}

export function Screen({
  children,
  className = "",
  disableSafeArea = false,
  backgroundImage,
  style,
  ...props
}: ScreenProps) {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1">
      {/* Background Image - Full Screen (ignores safe area) */}
      {backgroundImage && (
        <Image
          source={backgroundImage}
          className="absolute top-0 left-0 right-0 bottom-0"
          style={{ position: "absolute", width: "100%", height: "100%" }}
          resizeMode="cover"
        />
      )}

      {/* Content with Safe Area */}
      <View
        className={`flex-1 ${className}`}
        style={[
          !disableSafeArea && {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
          },
          style,
        ]}
        {...props}
      >
        {children}
      </View>
    </View>
  );
}
