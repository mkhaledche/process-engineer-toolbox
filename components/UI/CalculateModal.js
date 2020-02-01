import React, { useState, useContext } from 'react';
import {
  Button,
  Modal,
  View,
  Text,
  TextInput,
  Platform,
  Dimensions,
} from 'react-native';
import CalcContext from '../../context/CalcContext';
import inputUnits from '../../constants/Units';
import {
  typicalStyles,
  pickerSelectStyles,
  boxContainerStyle,
  boxItemsStyle,
} from '../../constants/styles';
import RNPickerSelect from 'react-native-picker-select';
import {
  pipeSizes,
  pipeSchedules,
  pipeSizeVsSchedule,
  getNominalSize,
} from '../../data/pipeSizeData';
import { Ionicons } from '@expo/vector-icons';
import iosPickerIcon from '../UI/iosPickerIcon';

const CalculateModal = props => {
  const { showingModal, hideModal, modalData, calcType, updateValue } = props;
  const [state, dispatch] = useContext(CalcContext);

  let initUnits = [];

  modalData.forEach(a => {
    if (a.unitType === 'density') {
      let modifiedDensity =
        Math.round(state.calculationInputs[1].value * 100) / 100;
      a.value = state.calculationInputs[1].value
        ? modifiedDensity.toString()
        : '';
      a.unit = state.calculationInputs[1].unit;
      a.unitFactor = state.calculationInputs[1].unitFactor;
    }
  });

  const fillinitUnits = modalData => {
    modalData.map(input => {
      initUnits = [...initUnits, input.unit];
    });
  };

  const [sideCalcInput, setSideCalcInput] = useState(modalData);
  const [sideCalcInputUnits, setSideCalcInputUnits] = useState(initUnits);

  const [size, setSize] = useState('1in');
  const [schedule, setSchedule] = useState('40-STD');

  const inputNominalSize =
    getNominalSize(state.calculationInputs[3].value).indexOf('Cannot') > -1
      ? '36in'
      : getNominalSize(state.calculationInputs[3].value);

  return (
    <View>
      <Button
        title="Calculate"
        color="#042f4b"
        style={{ ...props.style }}
        onPress={() => {
          showingModal();
          fillinitUnits(modalData);
          setSideCalcInputUnits(initUnits);

          dispatch({
            type: 'ADD_SIDE_CALC',
            value: [calcType, modalData, sideCalcInputUnits],
          });
        }}
      />
      <View style={typicalStyles.inputModalContainer}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={props.visibility}>
          <View
            style={{
              flexDirection: calcType === 'size' ? 'column' : 'row',
              flexWrap: 'wrap',
              backgroundColor: '#fcfafa',
              flex:
                calcType === 'length'
                  ? 1
                  : calcType === 'density'
                  ? 0.58
                  : 0.52,
              justifyContent: 'space-between',
            }}>
            {calcType === 'size' && (
              <View style={{ marginTop: 30, marginLeft: 10, width: '85%' }}>
                <View style={typicalStyles.pickerContainer}>
                  <Text style={{ marginVertical: 7, fontSize: 16 }}>
                    Nominal Diameter
                  </Text>
                  <RNPickerSelect
                    selectedValue={size}
                    style={
                      Platform.OS === 'ios'
                        ? {
                            ...pickerSelectStyles.inputIOS,
                            iconContainer: {
                              top: 7,
                              right: 7,
                            },
                          }
                        : pickerSelectStyles.inputAndroid
                    }
                    onValueChange={itemValue => {
                      setSize(itemValue);
                    }}
                    Icon={Platform.OS === 'ios' ? iosPickerIcon : null}
                    placeholder={{}}
                    items={pipeSizes}
                  />
                </View>
                <View style={typicalStyles.pickerContainer}>
                  <Text style={{ marginVertical: 7, fontSize: 16 }}>
                    Schedule
                  </Text>
                  <RNPickerSelect
                    selectedValue={schedule}
                    onValueChange={itemValue => {
                      setSchedule(itemValue);
                    }}
                    Icon={Platform.OS === 'ios' ? iosPickerIcon : null}
                    placeholder={{}}
                    items={pipeSchedules}
                    style={
                      Platform.OS === 'ios'
                        ? {
                            ...pickerSelectStyles.inputIOS,
                            iconContainer: {
                              top: 7,
                              right: 7,
                            },
                          }
                        : pickerSelectStyles.inputAndroid
                    }
                  />
                </View>
                <Text>
                  {pipeSizeVsSchedule[size][schedule] === null
                    ? 'Schedule N/A for this size'
                    : ''}
                </Text>
              </View>
            )}
            {calcType == 'density' ||
              (calcType !== 'length' && (
                <View
                  style={{
                    marginTop: Dimensions.get('window').height * 0.05,
                    marginHorizontal: '3%',
                  }}>
                  <Text>
                    {calcType === 'length'
                      ? `Pipe Length shall be calculated based on a pipe size of ${inputNominalSize}`
                      : calcType === 'density'
                      ? 'Calculation is based on ideal gas law. For steam or non ideal gas, please enter the density manually'
                      : null}
                  </Text>
                </View>
              ))}
            {calcType !== 'size' &&
              modalData.map((param, index) => {
                return (
                  <View
                    style={
                      param.unitType !== 'length' && calcType === 'length'
                        ? boxContainerStyle.lengthInputStyle
                        : param.unitType === 'length'
                        ? boxContainerStyle.otherEqLengthInputsStyle
                        : boxContainerStyle.generalInputsStyle
                    }>
                    <View
                      style={
                        param.unitType !== 'length' && calcType === 'length'
                          ? boxItemsStyle.lengthInputStyle
                          : param.unitType !== 'length'
                          ? boxItemsStyle.otherEqLengthInputsStyle
                          : boxItemsStyle.generalInputsStyle
                      }>
                      <Text style={typicalStyles.text}>{param.name}</Text>
                      <TextInput
                        value={sideCalcInput[index].value}
                        placeholder=""
                        onChangeText={e => {
                          if (isNaN(parseFloat(e)) || e !== '') {
                            let updatedInput = sideCalcInput.map(a => {
                              return { ...a };
                            });
                            updatedInput[index].value = e;
                            setSideCalcInput(updatedInput);
                          }
                        }}
                        style={
                          Platform.OS === 'ios'
                            ? {
                                ...pickerSelectStyles.inputIOS,
                              }
                            : {
                                ...pickerSelectStyles.inputAndroid,
                              }
                        }
                        keyboardType="decimal-pad"
                        onBlur={() => {
                          if (
                            calcType &&
                            typeof calcType === 'string' &&
                            props.visibility === true
                          ) {
                            dispatch({
                              type: 'SEND_SIDE_INPUT',
                              value: [
                                sideCalcInput,
                                sideCalcInputUnits,
                                calcType,
                              ],
                            });
                          }
                        }}
                      />
                    </View>
                    {inputUnits[param.unitType] && (
                      <View style={boxItemsStyle.pickerContainer}>
                        <RNPickerSelect
                          mode="dialog"
                          selectedValue={sideCalcInputUnits[index]}
                          style={
                            Platform.OS === 'ios'
                              ? {
                                  ...typicalStyles.picker,
                                  iconContainer: {
                                    top: 7,
                                    right: 10,
                                  },
                                }
                              : typicalStyles.picker
                          }
                          Icon={Platform.OS === 'ios' ? iosPickerIcon : null}
                          onValueChange={itemValue => {
                            let updatedUnits = sideCalcInputUnits.map(a => {
                              return a;
                            });

                            const conversionFactorObject = inputUnits[
                              param.unitType
                            ].find(a => {
                              return a.value === itemValue;
                            });

                            let conversionFactor =
                              conversionFactorObject.factor;

                            updatedUnits[index] = {
                              label: itemValue,
                              value: itemValue,
                              factor: conversionFactor,
                            };
                            setSideCalcInputUnits(updatedUnits);

                            let convertedValue = sideCalcInput.map(a => {
                              return { ...a };
                            });

                            if (
                              convertedValue[index].unitType === 'temperature'
                            ) {
                              convertedValue[index].value =
                                conversionFactorObject.value === 'F'
                                  ? (parseFloat(convertedValue[index].value) *
                                      conversionFactor) /
                                      convertedValue[index].unitFactor +
                                    32
                                  : (parseFloat(convertedValue[index].value) *
                                      conversionFactor -
                                      32) /
                                    convertedValue[index].unitFactor;

                              convertedValue[index].value = convertedValue[
                                index
                              ].value.toString();
                            } else {
                              convertedValue[index].value =
                                (parseFloat(convertedValue[index].value) *
                                  conversionFactor) /
                                convertedValue[index].unitFactor;

                              convertedValue[index].value = convertedValue[
                                index
                              ].value.toString();
                            }
                            if (isNaN(convertedValue[index].value)) {
                              convertedValue[index].value = 0;
                            }
                            convertedValue[index].unit =
                              conversionFactorObject.value;
                            convertedValue[index].unitFactor = conversionFactor;

                            setSideCalcInput(convertedValue);
                            if (
                              calcType &&
                              typeof calcType === 'string' &&
                              props.visibility === true
                            ) {
                              dispatch({
                                type: 'SEND_SIDE_INPUT',
                                value: [
                                  sideCalcInput,
                                  sideCalcInputUnits,
                                  calcType,
                                ],
                              });
                            }
                          }}
                          placeholder={{}}
                          items={
                            sideCalcInputUnits[index] !==
                            inputUnits[param.unitType][0].value
                              ? inputUnits[param.unitType].reverse()
                              : inputUnits[param.unitType]
                          }
                        />
                      </View>
                    )}
                  </View>
                );
              })}

            <View style={typicalStyles.buttonContainer}>
              <View style={typicalStyles.buttonItem}>
                <Button title="Cancel" onPress={hideModal} color="#943855" />
              </View>
              <View style={typicalStyles.buttonItem}>
                <Button
                  title="Calculate"
                  color="#042f4b"
                  disabled={
                    calcType === 'size' &&
                    pipeSizeVsSchedule[size][schedule] === null
                      ? true
                      : false
                  }
                  onPress={() => {
                    if (calcType === 'size' && props.visibility === true) {
                      dispatch({
                        type: 'CALCULATE_ID',
                        value: [
                          size,
                          calcType,
                          schedule,
                          updateValue,
                          hideModal,
                        ],
                      });
                      if (Array.isArray(state.length)) {
                        dispatch({
                          type: 'CALCULATE_LENGTH',
                          value: [
                            state.length,
                            'length',
                            updateValue,
                            hideModal,
                          ],
                        });
                      }
                    } else if (
                      calcType &&
                      typeof calcType === 'string' &&
                      props.visibility === true
                    ) {
                      dispatch({
                        type: `CALCULATE_${calcType.toUpperCase()}`,
                        value: [
                          sideCalcInput,
                          calcType,
                          updateValue,
                          hideModal,
                        ],
                      });
                    }
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default CalculateModal;
