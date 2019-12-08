import React, { useState } from "react";
import { ScrollView } from "react-native";
import CalcPicker from "../components/CalcPicker";
import CalcInputs from "../components/CalcInputs";
import CalcContext from "../context/CalcContext";

const lineSizingCalculations = [
  { label: "Choose the line sizing calculation", value: "" },
  {
    label: "Pump Suction",
    value: "pump-suction",
    maxVel: { value: 1, unit: "m/s" },
    maxDeltaP: { initValue: 0.2, unit: "bar/km" }
  },
  {
    label: "Pump Discharge",
    value: "pump-discharge",
    maxVel: { value: 4.5, unit: "m/s" },
    maxDeltaP: { initValue: 1, unit: "bar/km" }
  }
];

const lineSizingCalculationInputs = [
  {
    volFlowRate: {
      initValue: 0,
      unit: "CuMeter/hr"
    }
  },
  {
    density: {
      initValue: 0,
      unit: "kg/CuMeter"
    }
  },
  {
    viscosity: {
      initValue: 0,
      unit: "cP"
    }
  },
  {
    massFlowRate: {
      initValue: 0,
      unit: "kg/hr"
    }
  },
  {
    pipeDiameter: {
      initValue: 2,
      unit: "in"
    }
  },
  {
    pipeDistance: {
      initValue: 0,
      unit: "m"
    }
  }
];

const lineSizingContext = React.createContext({
  calculations: lineSizingCalculations,
  calculationInputs: lineSizingCalculationInputs
});

const lineSizingScreen = props => {
  const [stateLineSizingContext, setstateLineSizingContext] = useState({
    calculations: lineSizingCalculations,
    calculationInputs: lineSizingCalculationInputs
  });

  return (
    <CalcContext.Provider value={stateLineSizingContext}>
      <ScrollView>
        <CalcPicker
          initialValue={lineSizingContext[0][0]}
          availableCalcs={lineSizingContext[0]}
        ></CalcPicker>
        <CalcInputs></CalcInputs>
      </ScrollView>
    </CalcContext.Provider>
  );
};

export default lineSizingScreen;
