import React, { useState, useReducer } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import CalcPicker from '../components/CalcPicker';
import CalcInputs from '../components/CalcInputs';
import CalcContext, { calcReducer } from '../context/CalcContext';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

const lineSizingCalculations = [
  { label: 'Choose the line sizing calculation', value: '' },
  {
    label: 'Pump Suction',
    value: 'pump-suction',
    maxVel: { criteria: 'Maximum Velocity', value: 1, unit: 'm/s' },
    maxDeltaP: {
      criteria: 'Maximum Pressure Drop',
      initValue: '0.2',
      unit: 'bar/km',
    },
  },
  {
    label: 'Pump Discharge',
    value: 'pump-discharge',
    maxVel: { value: '4.5', unit: 'm/s' },
    maxDeltaP: { initValue: '1', unit: 'bar/km' },
  },
];

const lineSizingCalculationInputs = [
  {
    name: 'Flow Rate',
    value: '0',
    unit: 'm3/hr',
    unitType: 'vFR',
    unitFactor: 1
  },
  {
    name: 'Density',
    value: '0',
    unit: 'kg/m3',
    unitType: 'density',
    unitFactor: 1
  },
  {
    name: 'Viscosity',
    value: '0',
    unit: 'cP',
    unitType: 'viscosity',
    unitFactor: 1
  },
  {
    name: 'Mass Flow Rate',
    value: '0',
    unit: 'kg/hr',
    unitType: 'mFR',
    unitFactor: 1
  },
  {
    name: 'Pipe diameter',
    value: '2',
    unit: 'in',
    unitType: 'size',
    unitFactor: 1
  },
  {
    name: 'Pipe Distance',
    value: '0',
    unit: 'm',
    unitType: 'length',
    unitFactor: 1
  }
];

const lineSizingCriteria = [
  {
    service: 'Pump Suction',
    criteria: 'Maximum Velocity',
    value: '1',
    unit: 'm/s',
    unitType: 'velocity',
    unitFactor: 1
  },
  {
    service: 'Pump Suction',
    criteria: 'Maximum Pressure Drop',
    value: '0.2',
    unit: 'bar/km',
    unitType: 'dpc',
    unitFactor: 1
  },
  {
    service: 'Pump Discharge',
    criteria: 'Maximum Velocity Drop',
    value: '4.5',
    unit: 'm/s',
    unitType: 'velocity',
    unitFactor: 1
  },
  {
    service: 'Pump Discharge',
    criteria: 'Maximum Pressure Drop',
    value: '1',
    unit: 'bar/km',
    unitType: 'dpc',
    unitFactor: 1
  },
];
const lineSizingScreen = props => {
  const [stateLineSizingContext, setstateLineSizingContext] = useReducer(
    calcReducer,
    {
      calculations: lineSizingCalculations,
      calculationInputs: lineSizingCalculationInputs,
      sizingCriteria: lineSizingCriteria,
    }
  );

  const {
    calculations,
    calculationInputs,
    selectedCalc,
  } = stateLineSizingContext;

  const initValue = !selectedCalc ? calculations[0] : selectedCalc[0];

  return (
    <CalcContext.Provider
      value={[stateLineSizingContext, setstateLineSizingContext]}>
      <CalcPicker initialValue={initValue} availableCalcs={calculations} />

      <CalcInputs />
    </CalcContext.Provider>
  );
};

// const styles = StyleSheet.create({
//   inner: {
//     padding: 24,
//     flex: 1,
//     justifyContent: 'flex-end',
//   },
// });

export default lineSizingScreen;
