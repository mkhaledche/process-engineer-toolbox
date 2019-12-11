import React, { useContext } from "react";
import { View, Text } from "react-native";
import CalcInput from "../components/CalcInput";
import CalcContext from "../context/CalcContext";

const CalcInputs = props => {
  const calcs = useContext(CalcContext);
  const { calculations, calculationInputs } = calcs;

  return (
    <View>
      <Text>{calculations[1].value}</Text>
      <CalcInput></CalcInput>
    </View>
  );
};

export default CalcInputs;
