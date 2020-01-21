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
  getNominalSize,
} from '../../data/pipeSizeData';
import { Ionicons } from '@expo/vector-icons';

const CalculateModal = props => {
  const { showingModal, hideModal, modalData, calcType, updateValue } = props;
  const [state, dispatch] = useContext(CalcContext);

  let initUnits = [];
  const fillinitUnits = modalData => {
    modalData.map(input => {
      initUnits = [...initUnits, input.unit];
    });
  };

  const [sideCalcInput, setSideCalcInput] = useState(modalData);
  const [sideCalcInputUnits, setSideCalcInputUnits] = useState(initUnits);

  const [size, setSize] = useState('1in');
  const [schedule, setSchedule] = useState('40-STD');

  const iosPickerIcon = () => {
    return <Ionicons name="md-arrow-down" size={16} color="gray" />;
  };

  const inputNominalSize = getNominalSize(state.calculationInputs[3].value).indexOf("Cannot") > -1 ? "36in": getNominalSize(state.calculationInputs[3].value);
  return (
    <View>
      <Button
        title="Calculate"
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
              flexDirection: 'row',
              flexWrap: 'wrap',
              backgroundColor: '#d3d3d3',
              height:
                calcType === 'length'
                  ? Dimensions.get('window').height
                  : calcType === 'size'
                  ? Dimensions.get('window').height * 0.45
                  : Dimensions.get('window').height * 0.85,
              justifyContent: 'space-between',
            }}>
            {calcType === 'size' && (
              <View style={{ flex: 1, marginVertical: 10 }}>
                <View style={typicalStyles.pickerContainer}>
                  <Text>Nominal Diameter</Text>
                  <RNPickerSelect
                    selectedValue={size}
                    style={typicalStyles.picker}
                    onValueChange={itemValue => {
                      setSize(itemValue);
                    }}
                    Icon={Platform.OS === 'ios' ? iosPickerIcon : null}
                    placeholder={{}}
                    items={pipeSizes}
                  />
                </View>
                <View style={{ ...typicalStyles.pickerContainer }}>
                  <Text>Schedule</Text>
                  <RNPickerSelect
                    selectedValue={schedule}
                    onValueChange={itemValue => {
                      setSchedule(itemValue);
                    }}
                    Icon={Platform.OS === 'ios' ? iosPickerIcon : null}
                    placeholder={{}}
                    items={pipeSchedules}
                    style={{ ...typicalStyles.picker, width: '95%' }}
                  />
                </View>
              </View>
            )}
            <View
              style={{
                marginTop: Dimensions.get('window').height * 0.065,
              }}>
              <Text>
                {calcType === 'length'
                  ? `Pipe Length shall be calculated based on a pipe size of ${inputNominalSize}`
                  : calcType === 'density'
                  ? 'Calculation is based on ideal gas law. For steam or non ideal gas, please enter the density manually'
                  : null}
              </Text>
            </View>
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
                          style={typicalStyles.picker}
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
                          items={inputUnits[param.unitType]}
                        />
                      </View>
                    )}
                  </View>
                );
              })}

            <View style={typicalStyles.buttonContainer}>
              <View style={typicalStyles.buttonItem}>
                <Button title="Cancel" onPress={hideModal} color="red" />
              </View>
              <View style={typicalStyles.buttonItem}>
                <Button
                  title="Calculate"
                  color="blue"
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
