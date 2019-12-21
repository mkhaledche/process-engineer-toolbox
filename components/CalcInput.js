import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  Picker,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import CalcContext from '../context/CalcContext';
import inputUnits from '../constants/Units';

const CalcInput = props => {
  const calcs = useContext(CalcContext);
  const {
    calculations,
    calculationInputs,
    selectedCalc,
    sizingCriteria,
  } = calcs[0];

  const filteredCriteria = sizingCriteria.filter(
    criterion => criterion.service === selectedCalc[0].label
  );

  let initUnits = [];
  calculationInputs.map(input => {
    initUnits = [...initUnits, input.unit];
  });

  let initCriteriaUnits = [];
  filteredCriteria.map(input => {
    initCriteriaUnits = [...initCriteriaUnits, input.unit];
  });

  const [inputValue, setInputValue] = useState(calculationInputs);
  const [criteria, setCriteria] = useState(filteredCriteria);
  const [units, setUnits] = useState(initUnits);
  const [criteriaUnits, setCriteriaUnits] = useState(initCriteriaUnits);

  const handleChangePicker = () => {};

  return (
    <View style={styles.inputContainer}>
      {calculationInputs.map((param, index) => {
        return (
          <View>
            <Text>{param.name}</Text>
            <View style={styles.inputGroup}>
              <TextInput
                placeholder={`Enter ${param.name} Here`}
                value={inputValue[index].value}
                onChangeText={e => {
                  let updatedValue = inputValue.map(a => {
                    return { ...a };
                  });
                  updatedValue[index].value = e;
                  setInputValue(updatedValue);
                }}
                style={styles.input}
                keyboardType="decimal-pad"
              />
              <Picker
                mode="dialog"
                selectedValue={units[index]}
                onValueChange={itemValue => {
                  let updatedUnits = units.map(a => {
                    return a;
                  });
                  updatedUnits[index] = itemValue;
                  setUnits(updatedUnits);

                  const conversionFactorObject = inputUnits[
                    param.unitType
                  ].find(a => {
                    return a.name === itemValue;
                  });

                  let conversionFactor = conversionFactorObject.value;

                  let convertedValue = inputValue.map(a => {
                    return { ...a };
                  });

                  convertedValue[index].value =
                    parseFloat(convertedValue[index].value) * conversionFactor /
                    convertedValue[index].unitFactor;
                    convertedValue[index].value = convertedValue[index].value.toString();
                  convertedValue[index].unitFactor = conversionFactor;

                  setInputValue(convertedValue);
                }}
                style={styles.picker}>
                {inputUnits[param.unitType].map((unit, index) => {
                  return <Picker.Item label={unit.name} value={unit.name} />;
                })}
              </Picker>
            </View>
          </View>
        );
      })}

      {filteredCriteria.map((criterion, index) => {
        return (
          <View style={{ flex: 1 }}>
            <Text>{criterion.criteria}</Text>
            <View style={styles.inputGroup}>
              <TextInput
                value={criteria[index].value}
                onChangeText={e => {
                  let updatedCriteria = criteria.map(a => {
                    return { ...a };
                  });
                  updatedCriteria[index].value = e;
                  setCriteria(updatedCriteria);
                }}
                style={styles.input}
                keyboardType="decimal-pad"
              />
              <Picker
                mode="dialog"
                selectedValue={criteriaUnits[index]}
                onValueChange={itemValue => {
                  let updatedCriteriaUnits = criteriaUnits.map(a => {
                    return a;
                  });
                  updatedCriteriaUnits[index] = itemValue;
                  setCriteriaUnits(updatedCriteriaUnits);

                  const conversionFactorObject = inputUnits[criterion.unitType].find(a => {
                    return a.name === itemValue;
                  });

                  let conversionFactor = conversionFactorObject.value;

                  let convertedCriterionValue = criteria.map(a => {
                    return { ...a };
                  });

                  convertedCriterionValue[index].value =
                    parseFloat(convertedCriterionValue[index].value) * conversionFactor /
                    convertedCriterionValue[index].unitFactor;
                    convertedCriterionValue[index].value = convertedCriterionValue[index].value.toString();
                  convertedCriterionValue[index].unitFactor = conversionFactor;

                  setCriteria(convertedCriterionValue);
                }}
                style={styles.picker}>
                {inputUnits[criterion.unitType].map((unit, index) => {
                  return <Picker.Item label={unit.name} value={unit.name} />;
                })}
              </Picker>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  inputGroup: {
    flexDirection: 'row',
    flex: 1,
  },
  input: {
    width: '60%',
    height: 40,
    marginVertical: 3,
    marginLeft: '3%',
    marginRight: '2%',
    paddingHorizontal: '3%',
    paddingVertical: 10,
    borderColor: '#ccc',
    borderWidth: 2,
    fontSize: 14,
    flex: 1,
  },
  picker: {
    width: '30%',
    height: 40,
    marginVertical: 3,
    marginLeft: '2%',
    marginRight: '3%',
    paddingHorizontal: '3%',
    paddingVertical: 10,
    fontSize: 12,
    flex: 1,
  },
  inputContainer: {
    padding: 10,
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default CalcInput;
