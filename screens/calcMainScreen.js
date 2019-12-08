import React from "react";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";
import CalcOption from "../components/CalcOption";
import availableCalcs from "../data/availableCalcs";

const calcMainScreen = props => {
  return (
    <ScrollView>
      {availableCalcs.map((item, index) => {
        let imgLocation = item.image;
        return (
          <CalcOption
            key={index}
            title={item.title}
            content={item.content}
            image={item.image}
            onPress={() => props.navigation.navigate(item.screen)}
          />
        );
      })}
    </ScrollView>
  );
};

export default calcMainScreen;
