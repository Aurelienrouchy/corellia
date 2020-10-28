import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Text, Dimensions, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";

import { useOnBoarding } from "../../../context/OnBoardingContext";
import { useAnimationColor } from "../../../hooks/useAnimation";

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width - 60,
    backgroundColor: 'red',
    paddingTop: height / 8,
    marginLeft: 30,
    alignItems: 'center',
    // justifyContent: 'space-between'
  },
  connect_container: {
    justifyContent: 'center',
    marginTop: height / 8
  },
  button: {
    width: width - 60,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    marginVertical: 15,
    alignItems: 'center',
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 20
  },
  provider: {
    fontSize: 18
  }
})

interface ConnectPhotosAccountsProps {}

const ConnectPhotosAccounts = ({}: ConnectPhotosAccountsProps) => {
  const [state, dispatch] = useOnBoarding();
  const [facebook, setFacebook] = useState(Boolean(state.profile.provider));
  const [instagram, setInstagram] = useState(false);
  const [camera, setCamera] = useState(false);

  const backgroundFacebook = useAnimationColor(['rgb(255, 255, 255)', 'rgb(0, 0, 0)'], facebook ? 1 : 0);
  const backgroundInstagram = useAnimationColor(['rgb(255, 255, 255)', 'rgb(0, 0, 0)'], instagram ? 1 : 0);
  const backgroundCamera = useAnimationColor(['rgb(255, 255, 255)', 'rgb(0, 0, 0)'], camera ? 1 : 0);

  // const ckeckCameraPermission = async () => {
  //     try {
  //         const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
  //         if (status === 'granted') setCamera(true);
  //     } catch(err) {
  //         throw new Error('CAMERA_ROLL permission not granted');
  //     }
  // };

  // const ckeckFacebookPermission = async () => {
  //     try {
  //         const { granted } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
  //         if (granted) setCamera(!camera);
  //     } catch(err) {
  //         throw new Error('CAMERA_ROLL permission not granted');
  //     }
  // };
  
  const connect = async type => {
    // switch (type) {
    //   case 'facebook':
          
    //       break;
    //   case 'instagram':
    //       setInstagram(!instagram)
    //       break;
    //   case 'camera':
    //       try{
    //           const {status} = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    //           if(status === 'granted') break;
    //           const { granted } = await ImagePicker.requestCameraRollPermissionsAsync();
    //           if (granted) setCamera(!camera);
    //       } catch(err) {
    //           throw new Error('CAMERA_ROLL permission not granted');
    //       }
    //       break;
  
    //   default:
    //       break;
    // }
  };

  // useEffect(() => {
  //   ckeckCameraPermission();
  // }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => connect('facebook')}>
          <Animated.View style={{backgroundColor: backgroundFacebook,...styles.button}}>
              <Text style={{color: facebook ? '#FFF': '#000', ...styles.provider}}>Facebook</Text>
              <Text style={{color: facebook ? '#FFF': '#000', ...styles.dash}}> + </Text>
          </Animated.View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => connect('instagram')}>
          <Animated.View style={{backgroundColor: backgroundInstagram,...styles.button}}>
              <Text style={{color: instagram ? '#FFF': '#000', ...styles.provider}}>Instagram</Text>
              <Text style={{color: instagram ? '#FFF': '#000', ...styles.dash}}> + </Text>
          </Animated.View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => connect('camera')}>
          <Animated.View style={{backgroundColor: backgroundCamera,...styles.button}}>
              <Text style={{color: camera ? '#FFF': '#000', ...styles.provider}}>Camera</Text>
              <Text style={{color: camera ? '#FFF': '#000', ...styles.dash}}> + </Text>
          </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

export default ConnectPhotosAccounts;
