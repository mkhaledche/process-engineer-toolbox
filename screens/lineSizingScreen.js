import React, { useState, useReducer, useEffect } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet
} from "react-native";
import CalcPicker from "../components/CalcPicker";
import CalcInputs from "../components/CalcInputs";
import CalcContext, { calcReducer } from "../context/CalcContext";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/UI/HeaderButton";

const lineSizingCalculations = [
  { label: "Choose the line sizing calculation", value: "" },
  {
    label: "Pump Suction",
    value: "pump-suction",
    maxVel: { criteria: "Maximum Velocity", value: 1, unit: "m/s" },
    maxDeltaP: {
      criteria: "Maximum Pressure Drop",
      initValue: "0.2",
      unit: "bar/km"
    },
    calculateDensity: true
  },
  {
    label: "Pump Discharge",
    value: "pump-discharge",
    maxVel: { value: "4.5", unit: "m/s" },
    maxDeltaP: { initValue: "1", unit: "bar/km" }
  }
];

const lineSizingCalculationInputs = [
  {
    name: "Flow Rate",
    value: null,
    unit: "m3/hr",
    unitType: "vFR",
    unitFactor: 1
  },
  {
    name: "Density",
    value: null,
    unit: "kg/m3",
    unitType: "density",
    unitFactor: 1,
    toBeCalculated: false
  },
  {
    name: "Viscosity",
    value: null,
    unit: "cP",
    unitType: "viscosity",
    unitFactor: 1
  },
  {
    name: "Pipe diameter",
    value: "1",
    unit: "in",
    unitType: "size",
    unitFactor: 1,
    toBeCalculated: true
  },
  {
    name: "Pipe Distance",
    value: null,
    unit: "m",
    unitType: "length",
    unitFactor: 1,
    toBeCalculated: true
  },
  {
    name: "Pipe Roughness",
    value: "0.0018",
    unit: "in",
    unitType: "size",
    unitFactor: 1
  }
];

const lineSizingCriteria = [
  {
    service: "Pump Suction",
    criteria: "Maximum Velocity",
    value: "1",
    unit: "m/s",
    unitType: "velocity",
    unitFactor: 1
  },
  {
    service: "Pump Suction",
    criteria: "Maximum Pressure Drop",
    value: "0.2",
    unit: "bar/km",
    unitType: "dpc",
    unitFactor: 1
  },
  {
    service: "Pump Discharge",
    criteria: "Maximum Velocity",
    value: "4.5",
    unit: "m/s",
    unitType: "velocity",
    unitFactor: 1
  },
  {
    service: "Pump Discharge",
    criteria: "Maximum Pressure Drop",
    value: "1",
    unit: "bar/km",
    unitType: "dpc",
    unitFactor: 1
  }
];
const LineSizingScreen = props => {
  const [stateLineSizingContext, setstateLineSizingContext] = useReducer(
    calcReducer,
    {
      calculations: lineSizingCalculations,
      calculationInputs: lineSizingCalculationInputs,
      sizingCriteria: lineSizingCriteria,
      sideCalc: {}
    }
  );

  const {
    calculations,
    calculationInputs,
    selectedCalc
  } = stateLineSizingContext;

  const initValue = !selectedCalc ? calculations[0] : selectedCalc[0];

  useEffect(() => {
    props.navigation.setParams({
      hasChosenAction: selectedCalc ? true : false
    });
  }, [selectedCalc]);

  return (
    <CalcContext.Provider
      value={[stateLineSizingContext, setstateLineSizingContext]}
    >
      <CalcPicker initialValue={initValue} availableCalcs={calculations} />

      <CalcInputs />
    </CalcContext.Provider>
  );
};

LineSizingScreen.navigationOptions = navData => {
  const hasChosenAction = navData.navigation.getParam("hasChosenAction");

  return {
    headerTitle: "Line Sizing",
    headerRight: () => {
      if (hasChosenAction) {
        return (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="Save"
              iconName={
                Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
              }
              // onPress={submitFn}
            />
          </HeaderButtons>
        );
      }
    }
  };
};

export default LineSizingScreen;
