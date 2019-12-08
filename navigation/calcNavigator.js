import React from "react";
import { Platform } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import calcMainScreen from "../screens/calcMainScreen";
import lineSizingScreen from "../screens/lineSizingScreen";
import Colors from "../constants/Colors";

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primaryColor : ""
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold"
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans"
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor,
  headerTitle: "A Screen"
};

const calcNavigator = createStackNavigator(
  {
    Calculations: {
      screen: CalcMainScreen
    },
    LineSizing: {
      screen: lineSizingScreen
    }
    //   MealDetail: MealDetailScreen
    // },
  },
  {
    // initialRouteName: 'Categories',
    defaultNavigationOptions: defaultStackNavOptions
  }
);

export default createAppContainer(calcNavigator);
