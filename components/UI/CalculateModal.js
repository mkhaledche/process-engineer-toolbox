import React, { useState, useContext } from 'react';
import {
  Button,
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import CalcContext from '../../context/CalcContext';
import inputUnits from '../../constants/Units';
import { typicalStyles, pickerSelectStyles } from '../../constants/styles';
import RNPickerSelect from 'react-native-picker-select';
import { pipeSizes, pipeSchedules } from '../../data/pipeSizeData';

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

  return (
    <>
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
      <Modal
        animationType="slide"
        transparent={false}
        visible={props.visibility}>
        <View style={{ flex: 0.1, flexDirection: 'row', flexWrap: 'wrap' }}>
            {calcType === 'size' && (
              <View style={{ flex: 1, marginVertical: 10 }}>
                <Text>Nominal Diameter</Text>
                <RNPickerSelect
                  selectedValue={size}
                  style={pickerSelectStyles}
                  onValueChange={itemValue => {
                    setSize(itemValue);
                  }}
                  placeholder={{}}
                  items={pipeSizes}
                />
                <Text>Schedule</Text>
                <RNPickerSelect
                  selectedValue={schedule}
                  onValueChange={itemValue => {
                    setSchedule(itemValue);
                  }}
                  placeholder={{}}
                  items={pipeSchedules}
                  style={pickerSelectStyles}
                />
              </View>
            )}

            {calcType !== 'size' &&
              modalData.map((param, index) => {
                return (
                  <View
            style={(param.unitType !== 'length' && calcType === 'length') ? {
              flexBasis: '40%',
              height: 50,
              marginHorizontal: '2%',
              flexDirection: 'row',
              flexWrap: 'wrap',
              flexGrow: 1
            } : {}}>
            <View
              style={param.unitType !== 'length' && calcType === 'length' ? {
                flexBasis: '40%',
                height: 50,
                marginHorizontal: '2%',
                flexDirection: 'row',
                flexWrap: 'wrap',
                flexGrow: 1
              } : {}}>
                      <Text style={typicalStyles.text}>{param.name}</Text>
                      <TextInput
                        value={sideCalcInput[index].value}
                        placeholder=""
                        onChangeText={e => {
                          let updatedInput = sideCalcInput.map(a => {
                            return { ...a };
                          });
                          updatedInput[index].value = e;
                          setSideCalcInput(updatedInput);
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
                      <View
                        style={{
                          flexBasis: '25%',
                          height: 50,
                          marginHorizontal: '2%',
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          flexGrow: 1
                                }}>
                        <RNPickerSelect
                          mode="dialog"
                          selectedValue={sideCalcInputUnits[index]}
                          style={pickerSelectStyles}
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

            <Button title="Cancel" onPress={hideModal} />
            <Button
              title="Calculate"
              onPress={() => {
                if (calcType === 'size' && props.visibility === true) {
                  dispatch({
                    type: 'CALCULATE_ID',
                    value: [size, calcType, schedule, updateValue, hideModal],
                  });
                } else if (
                  calcType &&
                  typeof calcType === 'string' &&
                  props.visibility === true
                ) {
                  dispatch({
                    type: `CALCULATE_${calcType.toUpperCase()}`,
                    value: [sideCalcInput, calcType, updateValue, hideModal],
                  });
                }
              }}
            />
          </View>
      </Modal>
    </>
  );
};
// const styles = StyleSheet.create({
//   inputModalContainer: {
//     width: '45%',
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginVertical: 10,
//   },
// });

export default CalculateModal;
