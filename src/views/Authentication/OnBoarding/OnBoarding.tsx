import React, { useRef, useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, Keyboard, Text } from "react-native";
import Animated from 'react-native-reanimated';

import Slide from "./Slide";
import GetName from "./GetName";
import GetGender from "./GetGender";
import GetInterrestedIn from "./GetInterrestedIn";
import GetAge from "./GetAge";
import ConnectPhotosAccounts from "./ConnectPhotosAccounts";
import GetPhotos from "./GetPhotos";
import GetDescription from "./GetDescription";
import Footer from "./Footer";

import { useOnBoarding } from "../../../context/OnBoardingContext";

const { width, height } = Dimensions.get("window");
const components = [
  {
    property: 'one',
    label: "What's your name ?",
    cmp: (params: any) => <ConnectPhotosAccounts {...{...params}}/>,
  },
  {
    property: "first_name",
    label: "What's your name ?",
    cmp: (params: any) => <GetName {...{...params}}/>,
  },
  {
    property: "gender",
    label: "What's your gender ?",
    cmp: (params: any) => <GetGender {...{...params}}/>,
  },
  {
    property: "interested_in",
    label: "You prefer ?",
    cmp: (params: any) => <GetInterrestedIn {...{...params}}/>,
  },
  {
    property: "birth_date",
    label: "How old are you ?",
    cmp: (params: any) => <GetAge {...{...params}}/>,
  },
  {
    property: "photo_provider",
    label: "Connect your...",
    cmp: (params: any) => <ConnectPhotosAccounts {...{...params}}/>,
  },
  {
    property: "photos",
    label: "Choose your best photos !",
    cmp: (params: any) => <GetPhotos {...{...params}}/>,
  },
  {
    property: "bio",
    label: "Something about you ?",
    cmp: (params: any) => <GetDescription {...{...params}}/>,
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slider: {
    height: height - height * 0.07,
  },
  footer: {
    flex: 1,
  },
});

interface OnBoardingProps {};

const OnBoarding = ({}: OnBoardingProps) => {
	const scroll = useRef<Animated.ScrollView>(null);
  const [state, dispatch] = useOnBoarding();
  const [translateY, setTranslateY] = useState(0);

	const goNext = () => {
		if(scroll.current && state.count < components.length - 1) {
      const isNotEmpty = Boolean(state.profile[components[state.count + 1].property] !== undefined);
			scroll.current
				.getNode()
        .scrollTo({ x: (state.count + 1) * width, animated: true });
      Keyboard.dismiss();

      dispatch({ type: 'setNextIsVisible', payload: { nextIsVisible: isNotEmpty }});
      dispatch({ type: 'increment'});
		}
	};
	
	const goPrev = () => {
		if(scroll.current && state.count > 0) {
      const isNotEmpty = Boolean(state.profile[components[state.count - 1].property] !== undefined);
			scroll.current 
				.getNode()
        .scrollTo({ x: (state.count - 1) * width, animated: true });
      Keyboard.dismiss();

      dispatch({ type: 'setNextIsVisible', payload: { nextIsVisible: isNotEmpty }});
      dispatch({ type: 'decrement'});
		}
  };

  const keyboardDidShow = (e) => {
    setTranslateY(-(e.endCoordinates.height));
  };

  const keyboardDidHide = (e) => {
    setTranslateY(e.endCoordinates.height);
  };
  
  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", keyboardDidHide);

    return () => {
      Keyboard.removeListener("keyboardDidShow", keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", keyboardDidHide);
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.slider}>
        <Text>{state.count}</Text>
        <Animated.ScrollView
          ref={scroll}
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          bounces={false}
        >
          {
            components.map((component, index) => <Slide key={index} label={component.label}>{ component.cmp }</Slide>)
          }
        </Animated.ScrollView>
      </View>
        <View style={styles.footer}>
          <Footer 
            dots={ components.length }
            {...{ goPrev, goNext, translateY }}
          />
        </View>
    </View>
  );
};

export default OnBoarding;
