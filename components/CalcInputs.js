import React, { useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Keyboard,
} from 'react-native';
import CalcInput from '../components/CalcInput';
import CalcContext from '../context/CalcContext';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const CalcInputs = props => {
  const calcs = useContext(CalcContext);
  const {
    calculations,
    calculationInputs,
    selectedCalc,
    sizingCriteria,
  } = calcs[0];

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={{ flexGrow: 1 }}
      enabled={true}>
      <View style={styles.inputContainer}>
        <ScrollView
          style={{ flexGrow: 1 }}
          onScroll={() => {
            Keyboard.dismiss;
          }}>
          {selectedCalc && selectedCalc[0].value !== '' && <CalcInput />}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    padding: 20,
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default CalcInputs;
