import React, { useState, useEffect } from "react";
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
        onValueChange={(itemValue, itemIndex) => {
          const chosenCalc = availableCalcs.filter(
            calc => calc.value === itemValue
          );
          setPickerValue(chosenCalc[0]);
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
