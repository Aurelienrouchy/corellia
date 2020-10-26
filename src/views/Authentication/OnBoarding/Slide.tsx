import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { useOnBoarding } from "../../../context/OnBoardingContext";

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
  },
  component: {
    flex: 1,
  },
  label: {
    fontFamily: "Coachella-Regular",
    fontSize: 28,
    marginTop: 0.1 * height,
    paddingLeft: 30,
  },
});

interface SlideProps {
  label: string;
  children: any;
  setNextIsVisible: any;
}

const Slide = ({ label, children, setNextIsVisible }: SlideProps) => {
  // const [state, dispatch] = useOnBoarding();
  // // const element = React.cloneElement(children, { state, dispatch, setNextIsVisible });

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>{label}</Text>
      </View>
        <View style={styles.component}>{children()}</View>
    </View>
  );
};

export default Slide;
