import React from 'react';
const CalcContext = React.createContext([
  {
    calculations: [{ label: 'Choose calculation', value: '' }],
    calculationInputs: {},
  },
]);
export default CalcContext;

const calcReducer = (state, action) => {
  const selectedCalc = state.calculations.filter(
    calculation => calculation.value === action.value
  );
  switch (action.type) {
    case 'SWITCH_TO_CALC': {
      const { calculationInputs } = state;
      const densityToBeCalculated = selectedCalc[0].calculateDensity;
      calculationInputs[1].toBeCalculated = densityToBeCalculated;

      return { ...state, calculationInputs, selectedCalc };
    }
    case 'SEND_INPUT': {
      const [inputs, criteria, inputUnits, criteriaUnits] = action.value;

      let calculationInputs = [];

      for (let i = 0; i < inputs.length; i++) {
        calculationInputs = [
          ...calculationInputs,
          { ...inputs[i], unit: inputUnits[i] },
        ];
      }

      let sizingCriteria = [];
      for (let j = 0; j < inputs.length; j++) {
        sizingCriteria = [
          ...sizingCriteria,
          { ...criteria[j], unit: criteriaUnits[j] },
        ];
      }
      return { ...state, calculationInputs, sizingCriteria };
    }

    case 'SEND_SIDE_INPUT': {
      const [sideCalcInput, sideCalcInputUnits, calcType] = action.value;
      let sideCalculationInputs = [];
      for (let h = 0; h < sideCalcInput.length; h++) {
        sideCalculationInputs = [
          ...sideCalculationInputs,
          { ...sideCalcInput[h], unit: sideCalcInputUnits[h].value },
        ];
      }
      return { ...state, [calcType]: sideCalculationInputs };
    }

    case 'ADD_SIDE_CALC': {
      const [calcType, modalData, sideCalcInputUnits] = action.value;
      return { ...state, [calcType]: modalData };
    }

    case 'CALCULATE_DENSITY': {
      const [sideCalcInput, calcType, updateValue, hideModal] = action.value;
      const { calculationInputs } = state;
      const pressure =
        parseFloat(sideCalcInput[0].value) / sideCalcInput[0].unitFactor + 1;
      const molwt = parseFloat(sideCalcInput[1].value);
      const temperature =
        sideCalcInput[2].unit === 'F'
          ? (parseFloat(sideCalcInput[2].value) - 32) /
            sideCalcInput[2].unitFactor
          : parseFloat(sideCalcInput[2].value);

      const density = (pressure * molwt) / (0.082 * (temperature + 273));

      const relatedInputIndex = state.calculationInputs.findIndex(
        a => a.unitType === calcType
      );

      const relatedInput = {
        ...state.calculationInputs[1],
        value: density.toString(),
      };

      calculationInputs[1] = relatedInput;

      updateValue(calculationInputs);

      hideModal();

      return { ...state, calculationInputs };
    }

    default:
      ``;
      throw new Error();
  }
};

export { calcReducer };
