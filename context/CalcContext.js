import React from "react";
const CalcContext = React.createContext({
  calculations: [{ label: "Choose calculation", value: "" }],
  calculationInputs: {}
});
export default CalcContext;

const calcReducer = (state, action) => {
  const selectedCalc = state.calculations.filter(
          calculation => calculation.value === action.value
        );
    switch (action.type) {
      case "SWITCH_TO_CALC":
          return {...state, selectedCalc}

      default:``
        throw new Error();
    }
};

export {calcReducer};