import React, { useState, useEffect, useContext } from 'react';
import { Picker, View, Platform } from 'react-native';
import CalcContext from '../context/CalcContext';
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';

const CalcPicker = props => {
  const { availableCalcs } = props;
  const dispatch = useContext(CalcContext)[1];
  const display = props.initialValue.value === null ? 'flex' : 'none';

  const iosPickerIcon = () => {
    return <Ionicons name="md-arrow-down" size={16} color="gray" />;
  };

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
        Icon={Platform.OS === 'ios' ? iosPickerIcon : null}
      />
    </View>
  );
};

export default CalcPicker;
