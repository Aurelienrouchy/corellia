import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useOnBoarding } from "../../../context/OnBoardingContext";

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: height / 8,
    paddingHorizontal: 30
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 5,
    marginTop: height / 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#D2D2D2'
  },
  date: {
    fontFamily: "Montserrat-Medium",
    fontSize: width / 8,
    color: '#FF7878',
  },
  dash: {
    fontFamily: "Montserrat-Medium",
    fontSize: width / 8,
    color: '#D2D2D2',
  },
  major: {
    width: "100%",
    marginTop: 40,
    textAlign: 'center',
    fontSize: 18,
    fontFamily: "Montserrat-Medium",
    color: "#ea5151" 
  }
})

interface GetAgeProps {}

const GetAge = ({}: GetAgeProps) => {
  const [state, dispatch] = useOnBoarding();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [birthDate, setBirthDate] = useState(state.profile.birth_date);
  const [isMajor, setIsMajor] = useState(false);
  const [day, setDay] = useState(0);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);

  const getAge = (date: Date) => { 
    const diff = Date.now() - date.getTime();
    const age = new Date(diff); 
    return Math.abs(age.getUTCFullYear() - 1970);
}

  const setDate = (date: Date) => {
    setDay(date.getDate());
    setMonth(date.getMonth());
    setYear(date.getFullYear());
  }
  useEffect(() => {
    const date = new Date();
    setIsMajor(getAge(date) > 18);
    setDate(date);
  }, []);

  useEffect(() => {
    dispatch({ type: "setNextIsVisible", payload: { nextIsVisible: isMajor } });
    if (isMajor) {
      dispatch({ type: "setProfileProperty", payload: { property: "birth_date", val: birthDate }});
    }
  }, [birthDate]);

  const showDatePicker = () => setDatePickerVisibility(true);

  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = (date: Date) => {
    setDate(date);
    hideDatePicker();
    setIsMajor(!(getAge(date) < 18));
    setBirthDate(date);
  };
  
  return (
    <View style={styles.container} >
      <TouchableOpacity style={styles.button} onPress={showDatePicker}>
          <Text style={styles.date}>{day}</Text>
          <Text style={styles.dash}> - </Text>
          <Text style={styles.date}>{month + 1}</Text>
          <Text style={styles.dash}> - </Text>
          <Text style={styles.date}>{year}</Text>
      </TouchableOpacity>
      {
        !isMajor && <Text style={styles.major}>🔞  No one under eighteen !</Text>
      }
      <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          date={birthDate}
          locale="fr_FR"
          maximumDate={new Date()}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
      />
    </View>
  );
};

export default GetAge;
