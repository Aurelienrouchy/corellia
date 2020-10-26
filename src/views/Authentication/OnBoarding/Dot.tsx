import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { timing, Easing } from "react-native-reanimated";

const styles = StyleSheet.create({
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#000",
    opacity: 0.2
  }
})

interface DotProps {
  index: number;
  currentIndex: number;
}

const Dot = ({ index, currentIndex }: DotProps) => {
  const [opacity] = useState(new Animated.Value(0.2));
  const [scale] = useState(new Animated.Value(1));

  useEffect(() => {
    const opacityConfig = {
      duration: 100,
      toValue: currentIndex === index ? 1 : 0.2,
      easing: Easing.inOut(Easing.ease),
    };
    const scaleConfig = {
      duration: 100,
      toValue: currentIndex === index ? 1.3 : 1,
      easing: Easing.inOut(Easing.ease),
    };
    const animOpacity = timing(opacity, opacityConfig);
    const animScale = timing(scale, scaleConfig);

    animOpacity.start();
    animScale.start();
    return () => {}
  }, [currentIndex, index]);

  return (
    <Animated.View 
      style={{
        ...styles.dot,
        opacity,
        transform: [{ scale }]
      }}
    />
  )
}

export default Dot;
