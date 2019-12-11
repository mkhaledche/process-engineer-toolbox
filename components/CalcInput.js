import React from "react";
import { View, Text, Picker } from "react-native";
import { TextInput } from "react-native-paper";

const CalcInput = props => {
  const handleChangeInput = () => {};
  const handleChangePicker = () => {};
  return (
    <View>
      <Text>{}</Text>
      <TextInput
        label="Label"
        value="Value"
        onChangeText={handleChange}
        mode="outlined"
      ></TextInput>
      <Picker selectedValue="{}" onValueChange={handleChangePicker}>
        <Picker.Item label="{}" value="{}" />
      </Picker>
    </View>
  );
};

export default CalcInput;
