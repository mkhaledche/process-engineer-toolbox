import React, { useState, useEffect, useContext } from 'react';
import { Picker, View } from 'react-native';
import CalcContext from '../context/CalcContext';
import RNPickerSelect from 'react-native-picker-select';

const CalcPicker = props => {
  const { availableCalcs } = props;
  const dispatch = useContext(CalcContext)[1];
  const display = props.initialValue.value === null ? 'flex' : 'none';

  // {availableCalcs.map((item, index) => {
  //   return (
  //     <Picker.Item key={index} label={item.label} value={item.value} />
  //   );
  // })}

  return (
    <View
      style={{
        marginTop: 30,
        padding: 10,
      }}>
      <RNPickerSelect
        selectedValue={props.initialValue.value}
        onValueChange={itemValue => {
          dispatch({ type: 'SWITCH_TO_CALC', value: itemValue });
        }}
        placeholder={{}}
        items={availableCalcs}
        style={{
        fontSize: 25,
        justifyContent: 'center',
      }}
      />
    </View>
  );
};

export default CalcPicker;
