import React, { useState, useEffect, useContext } from 'react';
import { Picker, View, Platform } from 'react-native';
import CalcContext from '../context/CalcContext';
import RNPickerSelect from 'react-native-picker-select';
import { pickerSelectStyles } from '../constants/styles';
import iosPickerIcon from '../components/UI/iosPickerIcon';

const CalcPicker = props => {
  const { availableCalcs } = props;
  const dispatch = useContext(CalcContext)[1];
  const display = props.initialValue.value === null ? 'flex' : 'none';


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
        style={
          Platform.OS === 'ios'
            ? {...pickerSelectStyles.inputIOS,
              iconContainer: {
                top: 7,
                right: 10,
              }} : pickerSelectStyles.inputAndroid
        }
        Icon={Platform.OS === 'ios' ? iosPickerIcon : null}
      />
    </View>
  );
};

export default CalcPicker;
