import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, TextInput, Text, Dimensions } from "react-native";
import { useOnBoarding } from "../../../context/OnBoardingContext";

const { height } = Dimensions.get("window");

interface GetNameProps {
  state: any;
  dispatch: any;
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      paddingTop: height / 8,
      paddingHorizontal: 30,
  },
  info: { 
      fontSize: 12, 
      marginTop: 5, 
      color: 'red' 
  },
  input: {
      borderBottomColor: '#000',
      borderBottomWidth: 2,
      height: 60,
      marginTop: 20,
      fontSize: 28,
      color: '#FF7878',
      fontWeight: '700'
  }
})

const GetName = () => {
  const [state, dispatch] = useOnBoarding();
  const [info, setInfo] = useState('');

  useEffect(() => {
    const inf = state.profile.first_name.length < 3 && state.profile.first_name.length !== 0 ? 'Min 3' : state.profile.first_name.length > 50 ? 'Max 50' : state.profile.first_name.length < 1 ? 'Required' : ''
    setInfo(inf);
    dispatch({ type: 'setNextIsVisible', payload: { nextIsVisible: !!!inf }});
  }, [state.profile.first_name]);

  return (
    <View style={styles.container} >
      <TextInput
          style={styles.input}
          placeholder="Fisrt name"
          placeholderTextColor="#D2D2D2"
          onChangeText={val => dispatch({ type: "setProfileProperty", payload: { property: "first_name", val }})}
          value={state.profile.first_name}/>
      <Text style={styles.info}>{info}</Text>
      <TextInput
          style={styles.input}
          placeholder="Last name"
          placeholderTextColor="#D2D2D2"
          onChangeText={val => dispatch({ type: "setProfileProperty", payload: { property: "last_name", val }})}
          value={state.profile.last_name}/>
    </View>
  );
};

export default GetName;
