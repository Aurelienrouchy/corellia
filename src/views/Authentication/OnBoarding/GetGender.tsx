import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Dimensions, StyleSheet, Image, Animated } from "react-native";

import { useAnimationColor } from "./../../../hooks/useAnimation";
import { useOnBoarding } from "./../../../context/OnBoardingContext";

import MenWhite from "./../../../../assets/images/men-white.png";
import MenBlack from "./../../../../assets/images/men-black.png";
import WomanWhite from "./../../../../assets/images/woman-white.png";
import WomanBlack from "./../../../../assets/images/woman-black.png";

const { height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-evenly'
  },
  title: {
      fontSize: 24,
      fontFamily: 'coachellaregular',
      marginBottom: 20
  },
  button_black: {
      width: height - height / 4 * 3 - 20,
      height: height - height / 4 * 3 - 20,
      borderRadius: 18,
      justifyContent: 'center',
      alignItems: 'center'
  },
  button: {
      width: height - height / 4 * 3,
      height: height - height / 4 * 3,
      marginVertical: 10,
      borderWidth: 1,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center'
  },
  image: {
      width: '80%',
      height: '80%'
  }
})

interface GetGenderProps {}

// 0 => Woman
// 1 => Man

const GetGender = ({}: GetGenderProps) => {
  const [state, dispatch] = useOnBoarding();
  const gender = state.profile.gender;
  const [imageWoman, setImageWoman] = useState(WomanBlack);
  const [imageMen, setImageMen] = useState(MenBlack);
  const backgroundWoman = useAnimationColor(['rgb(255, 255, 255)', 'rgb(0, 0, 0)'], gender === 0 ? 1 : 0);
  const backgroundMan = useAnimationColor(['rgb(255, 255, 255)', 'rgb(0, 0, 0)'], gender === 1 ? 1 : 0);

  useEffect(() => {
    setImageWoman(gender === 0 ? WomanWhite : gender === 1 ? WomanBlack : WomanBlack);
    setImageMen(gender === 0 ? MenBlack : gender === 1 ? MenWhite : MenBlack);
    
    if (gender !== undefined) {
      dispatch({ type: "setNextIsVisible", payload: { nextIsVisible: true } })
    }
  }, [gender]);

  return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => dispatch({ type: "setProfileProperty", payload: { property: "gender", val: 0 }})}>
            <View style={styles.button}>
                <Animated.View style={{backgroundColor: backgroundWoman, ...styles.button_black}}>
                    <Image style={styles.image} source={imageWoman} />
                </Animated.View>
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dispatch({ type: "setProfileProperty", payload: { property: "gender", val: 1 }})}>
            <View style={styles.button}>
                <Animated.View style={{backgroundColor: backgroundMan, ...styles.button_black}}>
                    <Image style={styles.image} source={imageMen} />
                </Animated.View>
            </View>
        </TouchableOpacity>
      </View>
    )
};

export default GetGender;
