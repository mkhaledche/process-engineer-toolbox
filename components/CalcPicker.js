import React, { useState, useEffect, useContext } from "react";
import { Picker, View } from "react-native";
import CalcContext from "../context/CalcContext";

const CalcPicker = props => {
  const { availableCalcs } = props;
  const dispatch = useContext(CalcContext)[1];

  return (
    <View>
      <Picker
        selectedValue={props.initialValue.value}
        style={{ height: 50, width: "100%" }}
        onValueChange={itemValue => {
          dispatch({ type: "SWITCH_TO_CALC", value: itemValue });
        }
        }
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
