import React, { useState } from "react";
import { Text, View } from "react-native";
import * as Font from "expo-font";
import { AppLoading } from "expo";
//import { enableScreens } from 'react-native-screens';

import CalcNavigator from "./navigation/calcNavigator";

//enableScreens();

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/Roboto-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/Roboto-Bold.ttf")
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }

  return <CalcNavigator />;
}
