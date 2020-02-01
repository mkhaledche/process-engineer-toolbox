import { StyleSheet, Platform, Dimensions, Ionicons, View } from 'react-native';
import React from 'react';

let heightFactor = Platform.OS === 'ios' ? 0.08 : 0.05;

const typicalStyles = StyleSheet.create({
  inputsParent: {
    padding: 10,
    flex: 1,
    justifyContent: 'flex-end',
  },
  button: {
    height: Dimensions.get('window').height * 0.06,
    width: '20%',
    paddingVertical: Dimensions.get('window').height * 0.004,
    // marginVertical: Dimensions.get('window').height * 0.004,
  },
  inputGroup: {
    // flexDirection: Platform.OS === 'ios' ? 'row' : 'column',
    // flex: 1,
    marginVertical: Dimensions.get('window').height * 0.004,
  },
  inputContainer: {
    width: '100%',
    marginHorizontal: 'auto',
    flexDirection: 'row',
    marginVertical: Dimensions.get('window').height * 0.01,
    paddingVertical: Dimensions.get('window').height * 0.01,
    alignItems: 'space-between',
  },
  inputModalContainer: { flexDirection: 'column', flexGrow: 0 },
  input: {
    width: '34%',
    height: Dimensions.get('window').height * 0.07,
    paddingVertical: Dimensions.get('window').height * 0.004,
    marginVertical: Dimensions.get('window').height * 0.004,
    marginRight: 0,
  },
  text: {
    marginVertical: Dimensions.get('window').height * 0.001,
    height: Dimensions.get('window').height * 0.03,
  },
  picker: {
    width: '33%',
    height: Dimensions.get('window').height * 0.06,
    marginVertical: Dimensions.get('window').height * 0.004,
    marginLeft: 'auto',
    paddingVertical: Dimensions.get('window').height * 0.004,
    fontSize: 15,
    borderColor: '#ccc',
    borderWidth: Dimensions.get('window').height * 0.001,
    alignItems: 'flex-end',
  },
  buttonContainer: {
    marginTop: Dimensions.get('window').height * 0.025,
    marginBottom: Dimensions.get('window').height * 0.01,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'space-around',
  },
  buttonItem: {
    width: '38%',
    marginHorizontal: '5%',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: Dimensions.get('window').height * 0.05,
    width: '80%',
    fontSize: 15,
    paddingVertical: Dimensions.get('window').height * 0.002,
    paddingHorizontal: '1%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    marginVertical: Dimensions.get('window').height * 0.002,
    flex: 1,
  },
  inputAndroid: {
    height: Dimensions.get('window').height * 0.05,
    width: '80%',
    fontSize: 15,
    paddingVertical: Dimensions.get('window').height * 0.002,
    paddingHorizontal: '1%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    marginVertical: Dimensions.get('window').height * 0.002,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

const boxContainerStyle = StyleSheet.create({
  lengthInputStyle: {
    flexBasis: '45%',
    height: Dimensions.get('window').height * heightFactor,
    marginHorizontal: '2%',
    marginVertical: Dimensions.get('window').height * 0.02,
    flexDirection: 'row',
    flexGrow: 1,
    paddingVertical: Dimensions.get('window').height * 0.002,
  },
  otherEqLengthInputsStyle: {
    width: '90%',
    height: Dimensions.get('window').height * heightFactor,
    marginHorizontal: '2%',
    flexDirection: 'row',
    marginTop: Dimensions.get('window').height * 0.04,
    marginBottom: Dimensions.get('window').height * 0.02,
    flexWrap: 'wrap',
  },
  generalInputsStyle: {
    width: '90%',
    height: Dimensions.get('window').height * heightFactor,
    marginHorizontal: '2%',
    flexDirection: 'row',
    marginVertical: Dimensions.get('window').height * 0.02,
    flexWrap: 'wrap',
    flexGrow: 1,
  },
  sizeInputsStyle: {
    width: '90%',
    height: Dimensions.get('window').height * heightFactor,
    marginHorizontal: '2%',
    flexDirection: 'column',
    marginVertical: Dimensions.get('window').height * 0.05,
    paddingVertical: Dimensions.get('window').height * 0.05,
    flex: 1,
  },
});

const boxItemsStyle = StyleSheet.create({
  lengthInputStyle: {
    width: '45%',
    height: Dimensions.get('window').height * heightFactor,
    marginHorizontal: '2%',
    marginBottom: Dimensions.get('window').height * 0.001,
    flexDirection: 'column',
    flexGrow: 1,
    paddingBottom: Dimensions.get('window').height * 0.001,
  },
  otherEqLengthInputsStyle: {
    width: '45%',
    height: Dimensions.get('window').height * heightFactor,
    marginHorizontal: '2%',
    marginVertical: Dimensions.get('window').height * 0.0017,
    flexDirection: 'column',
    paddingVertical: Dimensions.get('window').height * 0.0017,
  },
  generalInputsStyle: {
    width: '45%',
    height: Dimensions.get('window').height * heightFactor,
    marginHorizontal: '2%',
    flexDirection: 'column',
    paddingVertical: Dimensions.get('window').height * 0.002,
    marginVertical: Dimensions.get('window').height * 0.002,
  },
  pickerContainer: {
    width: '40%',
    height: Dimensions.get('window').height * heightFactor,
    marginTop: Dimensions.get('window').height * 0.03,
    marginHorizontal: '7%',
    flexDirection: 'column',
    paddingBottom: Dimensions.get('window').height * 0.002,
    fontSize: 18,
    borderColor: '#ccc',
    borderWidth: Dimensions.get('window').height * 0.001,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export { typicalStyles, pickerSelectStyles, boxContainerStyle, boxItemsStyle };
