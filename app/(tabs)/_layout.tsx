import { Stack } from "expo-router";
import React from "react";

import { useColorScheme } from "@/hooks/use-color-scheme";

import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { useFonts } from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { colorPlater } from "@/constants/theme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const [fontsLoaded] = useFonts({
    Roboto: Roboto_400Regular,
    RobotoMedium: Roboto_500Medium,
    RobotoBold: Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "none",
        animationDuration: 10,
        contentStyle: {
          backgroundColor: colorPlater.color.background,
        },
        presentation: "card",
      }}
      
    />
    
  );
}
