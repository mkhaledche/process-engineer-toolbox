import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  Picker,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Button,
  Modal,
  Alert,
  TouchableHighlight,
} from 'react-native';
import CalcContext from '../context/CalcContext';
import inputUnits from '../constants/Units';
import CalculateModal from './UI/CalculateModal';
import RNPickerSelect from 'react-native-picker-select';
import sideCalculations from '../data/sideCalculations';

const CalcInput = props => {
  const [state, dispatch] = useContext(CalcContext);
  const {
    calculations,
    calculationInputs,
    selectedCalc,
    sizingCriteria,
  } = state;

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

  let modals = { density: false, size: false, length: false };

  const [inputValue, setInputValue] = useState(calculationInputs);
  const [criteria, setCriteria] = useState(filteredCriteria);
  const [units, setUnits] = useState(initUnits);
  const [criteriaUnits, setCriteriaUnits] = useState(initCriteriaUnits);
  const [basis, setBasis] = useState('volumetric');
  const [showModal, setShowModal] = useState(modals);

  let editable = true;
  let checkedValue;
  let pickerPlaceholder;

  console.log(inputValue);
  return (
    <View style={styles.inputContainer}>
      <Text>Flow Basis</Text>
      <RNPickerSelect
        selectedValue={basis}
        onValueChange={itemValue => {
          setBasis(itemValue);

          let updatedValue = inputValue.map(a => {
            return { ...a };
          });
          let unitType = itemValue === 'mass' ? 'mFR' : 'vFR';
          updatedValue[0].unitType = unitType;
          updatedValue[0].unit = inputUnits[unitType][0].value;
          updatedValue[0].value = '';
          setInputValue(updatedValue);

          let updatedUnit = units.map(a => a);
          updatedUnit[0] = inputUnits[unitType][0].value;
          setUnits(updatedUnit);
          pickerPlaceholder = updatedUnit[0];

          dispatch({
            type: 'SEND_INPUT',
            value: [updatedValue, criteria, updatedUnit, criteriaUnits],
          });
        }}
        placeholder={{}}
        items={[
          { label: 'Volumetric', value: 'volumetric' },
          { label: 'Mass', value: 'mass' },
        ]}
      />

      {calculationInputs.map((param, index) => {
        return (
          <View>
            <Text>{param.name}</Text>
            <View style={styles.inputGroup}>
              <TextInput
                placeholder={`Enter ${param.name} here`}
                value={
                  state.sideCalc[param.unitType]
                    ? state.sideCalc[param.unitType]
                    : inputValue[index].value
                }
                onChangeText={e => {
                  let updatedValue = inputValue.map(a => {
                    return { ...a };
                  });
                  updatedValue[index].value = e;
                  setInputValue(updatedValue);
                }}
                style={styles.input}
                keyboardType="decimal-pad"
                onBlur={() =>
                  dispatch({
                    type: 'SEND_INPUT',
                    value: [inputValue, criteria, units, criteriaUnits],
                  })
                }
              />

              {param.toBeCalculated && (
                <CalculateModal
                  style={styles.button}
                  visibility={showModal[param.unitType]}
                  showingModal={() => {
                    setShowModal({ ...showModal, [param.unitType]: true });
                  }}
                  hideModal={() =>
                    setShowModal({ ...showModal, [param.unitType]: false })
                  }
                  modalData={sideCalculations[param.unitType]}
                  calcType={param.unitType}
                  updateValue={input => {setInputValue(input)}}
                />
              )}

              <RNPickerSelect
                mode="dialog"
                selectedValue={units[index]}
                itemKey={index}
                useNativeAndroidPickerStyle={false}
                onValueChange={itemValue => {
                  let updatedUnits = units.map(a => a);
                  updatedUnits[index] = itemValue;
                  setUnits(updatedUnits);
                  const conversionFactorObject = inputUnits[
                    param.unitType
                  ].find(a => {
                    return a.value === itemValue;
                  });

                  let conversionFactor = conversionFactorObject.factor;

                  let convertedValue = inputValue.map(a => {
                    return { ...a };
                  });

                  convertedValue[index].value =
                    (parseFloat(convertedValue[index].value) *
                      conversionFactor) /
                    convertedValue[index].unitFactor;
                  convertedValue[index].value = convertedValue[
                    index
                  ].value.toString();
                  convertedValue[index].unit = conversionFactorObject.value;
                  convertedValue[index].unitFactor = conversionFactor;

                  setInputValue(convertedValue);

                  dispatch({
                    type: 'SEND_INPUT',
                    value: [
                      convertedValue,
                      criteria,
                      updatedUnits,
                      criteriaUnits,
                    ],
                  });
                }}
                style={styles.picker}
                placeholder={
                  Platform.OS === 'ios' && index === 0
                    ? { label: 'Change Unit', value: pickerPlaceholder }
                    : {}
                }
                items={inputUnits[param.unitType]}
              />
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
                onBlur={() => {
                  dispatch({
                    type: 'SEND_INPUT',
                    value: [inputValue, criteria, units, criteriaUnits],
                  });
                }}
              />
              <RNPickerSelect
                mode="dialog"
                selectedValue={criteriaUnits[index]}
                onValueChange={itemValue => {
                  let updatedCriteriaUnits = criteriaUnits.map(a => {
                    return a;
                  });
                  updatedCriteriaUnits[index] = itemValue;
                  setCriteriaUnits(updatedCriteriaUnits);

                  const conversionFactorObject = inputUnits[
                    criterion.unitType
                  ].find(a => {
                    return a.value === itemValue;
                  });

                  let conversionFactor = conversionFactorObject.factor;

                  let convertedCriterionValue = criteria.map(a => {
                    return { ...a };
                  });

                  convertedCriterionValue[index].value =
                    (parseFloat(convertedCriterionValue[index].value) *
                      conversionFactor) /
                    convertedCriterionValue[index].unitFactor;
                  convertedCriterionValue[
                    index
                  ].value = convertedCriterionValue[index].value.toString();
                  convertedCriterionValue[index].unitFactor = conversionFactor;

                  setCriteria(convertedCriterionValue);
                  dispatch({
                    type: 'SEND_INPUT',
                    value: [
                      inputValue,
                      convertedCriterionValue,
                      units,
                      updatedCriteriaUnits,
                    ],
                  });
                }}
                style={styles.picker}
                placeholder={{}}
                items={inputUnits[criterion.unitType]}
              />
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  inputGroup: {
    flexDirection: Platform.OS === 'ios' ? 'row' : 'column',
    flex: 1,
  },
  input: {
    width: '80%',
    height: 40,
    marginVertical: 3,
    marginLeft: '3%',
    marginRight: '1%',
    paddingHorizontal: '3%',
    paddingVertical: 10,
    borderColor: '#ccc',
    borderWidth: 2,
    fontSize: 14,
    flex: 0.5,
  },
  button: {
    width: '20%',
    height: 40,
    marginVertical: 3,
    marginLeft: '3%',
    marginRight: '1%',
    paddingHorizontal: '3%',
    paddingVertical: 10,
    borderColor: '#ccc',
    borderWidth: 2,
    fontSize: 14,
    flex: 0.5,
  },
  picker: {
    width: '20%',
    height: 40,
    marginVertical: 1,
    marginLeft: '1%',
    marginRight: '1%',
    paddingVertical: 10,
    fontSize: 18,
    flex: 0.3,
  },
  inputContainer: {
    padding: 10,
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default CalcInput;
