import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ApolloProvider } from "@apollo/client";

import { OnBoardingProvider } from "./src/context/OnBoardingContext";
import OnBoarding from "./src/views/Authentication/OnBoarding";
import { LoadAssets } from "./src/components";
import client from "./src/apollo";

const fonts = {
  "Coachella-Black": require("./assets/fonts/coachella/Coachella_Black.otf"),
  "Coachella-Bold": require("./assets/fonts/coachella/Coachella_Bold.otf"),
  "Coachella-Light": require("./assets/fonts/coachella/Coachella_Light.otf"),
  "Coachella-Medium": require("./assets/fonts/coachella/Coachella_Medium.otf"),
  "Coachella-Regular": require("./assets/fonts/coachella/Coachella_Regular.otf"),
  "Coachella-Thin": require("./assets/fonts/coachella/Coachella_Thin.otf"),

  "Montserrat-Black": require("./assets/fonts/montserrat/Montserrat_Black.otf"),
  "Montserrat-BlackItalic": require("./assets/fonts/montserrat/Montserrat_BlackItalic.otf"),
  "Montserrat-Bold": require("./assets/fonts/montserrat/Montserrat_Bold.otf"),
  "Montserrat-BoldItalic": require("./assets/fonts/montserrat/Montserrat_BoldItalic.otf"),
  "Montserrat-Light": require("./assets/fonts/montserrat/Montserrat_Light.otf"),
  "Montserrat-LightItalic": require("./assets/fonts/montserrat/Montserrat_LightItalic.otf"),
  "Montserrat-Medium": require("./assets/fonts/montserrat/Montserrat_Medium.otf"),
  "Montserrat-MediumItalic": require("./assets/fonts/montserrat/Montserrat_MediumItalic.otf"),
  "Montserrat-SemiBold": require("./assets/fonts/montserrat/Montserrat_SemiBold.otf"),
  "Montserrat-SemiBoldItalic": require("./assets/fonts/montserrat/Montserrat_SemiBoldItalic.otf"),
  "Montserrat-Regular": require("./assets/fonts/montserrat/Montserrat_Regular.otf"),
  "Montserrat-Thin": require("./assets/fonts/montserrat/Montserrat_Thin.otf"),
  "Montserrat-ThinItalic": require("./assets/fonts/montserrat/Montserrat_ThinItalic.otf"),
};

const assets = [
  require('./assets/icons/arrow_left.png')
]

const AuthenticationStack = createStackNavigator();
const AuthenticationNavigator = () => {
  return (
    <AuthenticationStack.Navigator headerMode="none">
      <AuthenticationStack.Screen name="OnBoarding" component={OnBoarding} />
    </AuthenticationStack.Navigator>
  );
};

export default function App() {
  return (
    <LoadAssets {...{ assets, fonts }}>
      <ApolloProvider {...{ client }}>
        <OnBoardingProvider>
          <AuthenticationNavigator />
        </OnBoardingProvider>
      </ApolloProvider>
    </LoadAssets>
  );
}
