import React from "react";
import { View, Text, Picker } from "react-native";
import TextInput from "react-native-paper";

const CalcInput = () => {
  return (
    <View>
      <Text>{}</Text>
      <TextInput label={} value={} onChangeText={} mode="outlined"></TextInput>
      <Picker selectedValue={} style={} onValueChange={}>
        <Picker.Item label={} value={} />
      </Picker>
    </View>
  );
};

export default CalcInput;
