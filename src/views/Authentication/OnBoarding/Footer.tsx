import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity, Image } from "react-native";
import { useOnBoarding } from "../../../context/OnBoardingContext";
import Animated, {timing, Easing} from "react-native-reanimated";

import Dot from "./Dot";

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    width,
    height: 50 + height * 0.07,
    paddingBottom: height * 0.07,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontFamily: "Coachella-Regular",
    fontSize: 28,
    marginTop: 0.1 * height,
    marginLeft: 0.1 * width,
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center"
  },
  prev: {
    borderColor: "#000",
    borderWidth: 1
  },
  next: {
    backgroundColor: "#000"
  },
  dotsContainer: {
    flexDirection: 'row',
    height: 50,
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#C4C4C4"
  },
  currentDot: {
    width: 20,
    backgroundColor: "#000"
  },
  arrow: {
    width: 20,
    height: 20
  },
  leftArrow: {
    marginRight: 3
  },
  rightArrow: {
    marginLeft: 3
  },
});

interface FooterProps {
  goPrev: () => void;
  goNext: () => void;
  dots: number;
  translateY: any;
}

const Footer = ({ goPrev, goNext, dots, translateY }: FooterProps) => {
  const [state] = useOnBoarding();
  const [opacity] = useState(new Animated.Value(0));

  useEffect(() => {
    const config = {
      duration: 300,
      toValue: state.nextIsVisible ? 1 : 0,
      easing: Easing.inOut(Easing.ease),
    };
    const anim = timing(opacity, config);
    anim.start();
    return () => {}
  }, [state.nextIsVisible])

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.button, styles.prev]} onPress={ goPrev }>
        <Image style={[styles.arrow, styles.leftArrow]} source={require('./../../../../assets/icons/arrow_left.png')} />
      </TouchableOpacity>
      <View style={styles.dotsContainer}>
        {
          Array(dots).fill(0).map((_, index) => <Dot key={index} index={index} currentIndex={state.count}/>)
        }
      </View>
      <Animated.View style={[styles.button, styles.next, {opacity, transform: [{ translateY }]}]}>
        {
          state.nextIsVisible && (
            <TouchableOpacity style={styles.button} onPress={ goNext }>
              <Image style={[styles.arrow, styles.rightArrow]} source={require('./../../../../assets/icons/arrow-right.png')} />
            </TouchableOpacity>
          )
        }
      </Animated.View>
    </View>
  );
};

export default Footer;
