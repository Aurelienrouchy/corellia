import React, { useMemo, useState } from "react";
import { Animated } from "react-native";

import { timing, Easing, Extrapolate, interpolate, Value } from "react-native-reanimated";

export const useAnimation = function(value: any, toValue: number, config: any): void {
  if (!toValue) {
    return
  }
  const cfg = config || {
    duration: 300,
    easing: Easing.inOut(Easing.ease),
  };
  cfg.toValue = toValue;
  const animation = timing(value, cfg);
  
  animation.start();
}

export const useAnimationColor = (outputRange: any[], toValue: number, duration: number = 300) => {
  const value = new Animated.Value(0);
  const cfg = {
    duration,
    toValue,
    useNativeDriver: false,
  };
  Animated.timing(value, cfg).start();
  return value.interpolate({
    inputRange: [0, 1],
    outputRange,
  });
};