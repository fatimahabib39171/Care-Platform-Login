import { Animated } from "react-native";
import { colorPlater, font } from "@/constants/theme";
import { router } from "expo-router";
import { useState } from "react";


export const AnimationScreen = (
  direction: "forward" | "backward"
) => {
  const translateX = new Animated.Value(
    direction === "forward" ? 50 : -50
  );

  const opacity = new Animated.Value(0);

  Animated.parallel([
    Animated.timing(translateX, {
      toValue: 0,
      duration: 350,
      useNativeDriver: true,
    }),

    Animated.timing(opacity, {
      toValue: 1,
      duration: 350,
      useNativeDriver: true,
    }),
  ]).start();

  return {
    translateX,
    opacity,
  };
};