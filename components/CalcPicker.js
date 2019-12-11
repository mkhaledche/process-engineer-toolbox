import React, { useState, useEffect, useContext } from "react";
import { Picker, View } from "react-native";
import CalcContext from "../context/CalcContext";

const CalcPicker = props => {
  const [pickerValue, setPickerValue] = useState(props.initialValue);
  const { availableCalcs } = props;
  const calcState = useContext(CalcContext);
  console.log(CalcContext);

  return (
    <View>
      <Picker
        selectedValue={pickerValue.value}
        style={{ height: 50, width: "90%" }}
        onValueChange={itemValue => {
          dispatch({ type: "SWITCH_TO_CALC", value: itemValue });
          setPickerValue((pickerValue, itemValue) => {
            const chosenCalc = pickerValue.filter(
              calc => calc.value === itemValue
            );
          });
        }}
      >
        {availableCalcs.map((item, index) => {
          return (
            <Picker.Item key={index} label={item.label} value={item.value} />
          );
        })}
      </Picker>
    </View>
  );
};

export default CalcPicker;
