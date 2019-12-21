import React, { useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
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
      behavior='padding'
      keyboardVerticalOffset={50}
      style={{ flexGrow: 1}}
      enabled={true}>
      <View style={styles.inputContainer}>
        <Text>
          {selectedCalc && selectedCalc[0].value !== ''
            ? selectedCalc[0].label
            : ''}
        </Text>
        <ScrollView style={{ flexGrow: 1}}>
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
