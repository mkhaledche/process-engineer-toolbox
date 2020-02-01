import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  Picker,
  TextInput,
  Button,
  Modal,
  Platform,
} from 'react-native';
import CalcContext from '../context/CalcContext';
import inputUnits from '../constants/Units';
import {
  typicalStyles,
  pickerSelectStyles,
  boxContainerStyle,
  boxItemsStyle,
} from '../constants/styles';
import CalculateModal from './UI/CalculateModal';
import RNPickerSelect from 'react-native-picker-select';
import sideCalculations from '../data/sideCalculations';
import { Ionicons } from '@expo/vector-icons';
import {
  pipeSizes,
  pipeSchedules,
  getNominalSize,
  pipeSizeVseqLength,
} from '../data/pipeSizeData';
import iosPickerIcon from '../components/UI/iosPickerIcon';

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

  let modals = { density: false, size: false, length: false, velocity: false };

  const [inputValue, setInputValue] = useState(calculationInputs);
  const [criteria, setCriteria] = useState(filteredCriteria);
  const [units, setUnits] = useState(initUnits);
  const [criteriaUnits, setCriteriaUnits] = useState(initCriteriaUnits);
  const [basis, setBasis] = useState('volumetric');
  const [showModal, setShowModal] = useState(modals);
  const [typingTimer, setTypingTimer] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  let pickerPlaceholder;

  const inputNominalSize = getNominalSize(state.calculationInputs[3].value);

  return (
    <View style={typicalStyles.inputsParent}>
      <View style={{ marginVertical: 10 }}>
        <Text style={{ marginVertical: 10, fontSize: 16 }}>Flow Basis</Text>
        <RNPickerSelect
          selectedValue={basis}
          Icon={Platform.OS === 'ios' ? iosPickerIcon : null}
          style={Platform.OS === 'ios'
            ? {...pickerSelectStyles,
              iconContainer: {
                top: 10,
                right: '30%',
              }} : pickerSelectStyles}
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
      </View>

      {calculationInputs.map((param, index) => {
        return (
          <View style={typicalStyles.inputGroup}>
            <Text>{param.name}</Text>
            <View style={typicalStyles.inputContainer}>
              <View style={typicalStyles.input}>
                <TextInput
                  value={
                    state.sideCalc[param.unitType]
                      ? state.sideCalc[param.unitType]
                      : inputValue[index].value
                  }
                  onChangeText={e => {
                    if (!isNaN(Number(e))) {
                      let updatedValue = inputValue.map(a => {
                        return { ...a };
                      });

                      updatedValue[index].value = e;
                      setInputValue(updatedValue);

                      if (typingTimer) {
                        setButtonDisabled(true);
                        clearTimeout(typingTimer);
                      }

                      setTypingTimer(
                        setTimeout(() => {
                          dispatch({
                            type: 'SEND_INPUT',
                            value: [
                              updatedValue,
                              criteria,
                              units,
                              criteriaUnits,
                              buttonDisabled,
                            ],
                          });
                          if (
                            param.unitType === 'size' &&
                            Array.isArray(state.length)
                          ) {
                            dispatch({
                              type: 'CALCULATE_LENGTH',
                              value: [
                                state.length,
                                'length',
                                input => {
                                  setInputValue(input);
                                },
                                () => setShowModal({ ...showModal }),
                              ],
                            });
                          }
                        }, 200)
                      );
                    }
                  }}
                  style={
                    Platform.OS === 'ios'
                      ? pickerSelectStyles.inputIOS
                      : pickerSelectStyles.inputAndroid
                  }
                  keyboardType="decimal-pad"
                />
              </View>
              {param.toBeCalculated && (
                <CalculateModal
                  style={typicalStyles.button}
                  visibility={showModal[param.unitType]}
                  showingModal={() => {
                    setShowModal({ ...showModal, [param.unitType]: true });
                  }}
                  hideModal={() =>
                    setShowModal({ ...showModal, [param.unitType]: false })
                  }
                  modalData={sideCalculations[param.unitType]}
                  calcType={param.unitType}
                  updateValue={input => {
                    setInputValue(input);
                  }}
                />
              )}
              <View style={typicalStyles.picker}>
                <RNPickerSelect
                  mode="dialog"
                  selectedValue={units[index]}
                  itemKey={index}
                  style={
                    Platform.OS === 'ios'
                      ? {
                          ...pickerSelectStyles.inputIOS,
                          iconContainer: {
                            top: 7,
                            right: 10,
                          },
                        }
                      : pickerSelectStyles.inputAndroid
                  }
                  Icon={Platform.OS === 'ios' ? iosPickerIcon : null}
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
                    convertedValue[index].unit = conversionFactorObject.value;
                    convertedValue[index].unitFactor = conversionFactor;

                    if (isNaN(convertedValue[index].value)) {
                      convertedValue[index].value = 0;
                    }

                    dispatch({
                      type: 'SEND_INPUT',
                      value: [
                        convertedValue,
                        criteria,
                        updatedUnits,
                        criteriaUnits,
                      ],
                    });
                    convertedValue[index].value =
                      param.name === 'Pipe Roughness'
                        ? convertedValue[index].value
                        : Math.round(convertedValue[index].value * 1000) / 1000;
                    convertedValue[index].value = convertedValue[
                      index
                    ].value.toString();
                    setInputValue(convertedValue);
                  }}
                  placeholder={
                    Platform.OS === 'ios' && index === 0
                      ? { label: 'Change Unit', value: pickerPlaceholder }
                      : {}
                  }
                  items={inputUnits[param.unitType]}
                />
              </View>
            </View>
          </View>
        );
      })}

      {filteredCriteria.map((criterion, index) => {
        return (
          <View style={{ flex: 1 }}>
            <Text>{criterion.criteria}</Text>
            <View style={typicalStyles.inputContainer}>
              <View style={typicalStyles.input}>
                <TextInput
                  value={criteria[index].value}
                  onChangeText={e => {
                    if (!isNaN(Number(e))) {
                      let updatedCriteria = criteria.map(a => {
                        return { ...a };
                      });
                      updatedCriteria[index].value = e;
                      setCriteria(updatedCriteria);

                      if (typingTimer) {
                        clearTimeout(typingTimer);
                      }
                      setTypingTimer(
                        setTimeout(() => {
                          dispatch({
                            type: 'SEND_INPUT',
                            value: [
                              inputValue,
                              updatedCriteria,
                              units,
                              criteriaUnits,
                            ],
                          });
                        }, 200)
                      );
                    }
                  }}
                  keyboardType="decimal-pad"
                  style={
                    Platform.OS === 'ios'
                      ? pickerSelectStyles.inputIOS
                      : pickerSelectStyles.inputAndroid
                  }
                />
              </View>
              {criterion.toBeCalculated && (
                <CalculateModal
                  style={typicalStyles.button}
                  visibility={showModal[criterion.unitType]}
                  showingModal={() => {
                    setShowModal({ ...showModal, [criterion.unitType]: true });
                  }}
                  hideModal={() =>
                    setShowModal({ ...showModal, [criterion.unitType]: false })
                  }
                  modalData={sideCalculations[criterion.unitType]}
                  calcType={criterion.unitType}
                  updateValue={input => {
                    const updatedCriteria = input.filter(
                      criterion => criterion.service === selectedCalc[0].label
                    );
                    updatedCriteria.forEach(a => {
                      a.value = Math.round(a.value * 1000) / 1000;
                      a.value = a.value.toString();
                    });
                    setCriteria(updatedCriteria);
                  }}
                />
              )}
              <View style={typicalStyles.picker}>
                <RNPickerSelect
                  mode="dialog"
                  selectedValue={criteriaUnits[index]}
                  Icon={Platform.OS === 'ios' ? iosPickerIcon : null}
                  style={
                    Platform.OS === 'ios'
                      ? {
                          ...pickerSelectStyles.inputIOS,
                          iconContainer: {
                            top: 7,
                            right: 10,
                          },
                        }
                      : pickerSelectStyles.inputAndroid
                  }
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
                    ].unitFactor = conversionFactor;

                    if (isNaN(convertedCriterionValue[index].value)) {
                      convertedCriterionValue[index].value = 0;
                    }

                    dispatch({
                      type: 'SEND_INPUT',
                      value: [
                        inputValue,
                        convertedCriterionValue,
                        units,
                        updatedCriteriaUnits,
                      ],
                    });
                    convertedCriterionValue[index].value =
                      Math.round(convertedCriterionValue[index].value * 1000) /
                      1000;
                    convertedCriterionValue[
                      index
                    ].value = convertedCriterionValue[index].value.toString();
                    setCriteria(convertedCriterionValue);
                  }}
                  placeholder={{}}
                  items={inputUnits[criterion.unitType]}
                />
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default CalcInput;
