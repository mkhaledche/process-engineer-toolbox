import React, { useState, useContext } from 'react';
import {
  Button,
  Modal,
  View,
  Text,
  TouchableHighlight,
  TextInput,
  StyleSheet,
  Platform,
} from 'react-native';
import CalcContext from '../../context/CalcContext';
import inputUnits from '../../constants/Units';
import RNPickerSelect from 'react-native-picker-select';

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
        <View style={styles.inputContainer}>
          {modalData.map((param, index) => {
            return (
              <View style={{ flex: 1 }}>
                <Text>{param.name}</Text>
                <View style={styles.inputGroup}>
                  <TextInput
                    value={sideCalcInput[index].value}
                    onChangeText={e => {
                      let updatedInput = sideCalcInput.map(a => {
                        return { ...a };
                      });
                      updatedInput[index].value = e;
                      setSideCalcInput(updatedInput);
                    }}
                    style={styles.input}
                    keyboardType="decimal-pad"
                    onBlur={() => {
                      if (
                        calcType &&
                        typeof calcType === 'string' &&
                        props.visibility === true
                      ) {
                        dispatch({
                          type: 'SEND_SIDE_INPUT',
                          value: [sideCalcInput, sideCalcInputUnits, calcType],
                        });
                      }
                    }}
                  />
                  {inputUnits[param.unitType] && (
                    <RNPickerSelect
                      mode="dialog"
                      selectedValue={sideCalcInputUnits[index]}
                      onValueChange={itemValue => {
                        let updatedUnits = sideCalcInputUnits.map(a => {
                          return a;
                        });

                        const conversionFactorObject = inputUnits[
                          param.unitType
                        ].find(a => {
                          return a.value === itemValue;
                        });

                        let conversionFactor = conversionFactorObject.factor;

                        updatedUnits[index] = {
                          label: itemValue,
                          value: itemValue,
                          factor: conversionFactor,
                        };
                        setSideCalcInputUnits(updatedUnits);

                        let convertedValue = sideCalcInput.map(a => {
                          return { ...a };
                        });

                        if (convertedValue[index].unitType === 'temperature') {
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
                      style={styles.picker}
                      placeholder={{}}
                      items={inputUnits[param.unitType]}
                    />
                  )}
                </View>
              </View>
            );
          })}

          <Button title="Cancel" onPress={hideModal} />
          <Button
            title="Calculate"
            onPress={() => {
              if (
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

export default CalculateModal;
