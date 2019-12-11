import React from "react";
const CalcContext = React.createContext({
  calculations: [{ label: "Choose calculation", value: "" }],
  calculationInputs: {},
  calcReducer: (state, action) => {
    switch (action.type) {
      case "SWITCH_TO_CALC":
        return state.calculations.filter(
          calculation => calculation.value === action.value
        );
      default:
        throw new Error();
    }
  }
});
export default CalcContext;
