import React from "react";
import { Platform } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import CalcMainScreen from "../screens/calcMainScreen";
import LineSizingScreen from "../screens/lineSizingScreen";
import CalcResult from "../screens/CalcResult";
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
  headerTitle: "Process Engineer Toolbox"
};

const calcNavigator = createStackNavigator(
  {
    Calculations: {
      screen: CalcMainScreen
    },
    LineSizing: {
      screen: LineSizingScreen
    },
    Results: {
      screen: CalcResult
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
