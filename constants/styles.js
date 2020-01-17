import { StyleSheet, Platform, Dimensions, Ionicons } from 'react-native';

let heightFactor = Platform.OS === 'ios' ? 0.08 : 0.05;

const typicalStyles = StyleSheet.create({
  inputGroup: {
    // flexDirection: Platform.OS === 'ios' ? 'row' : 'column',
    // flex: 1,
    marginVertical: Dimensions.get('window').height * 0.004,
  },
  input: {
    width: '40%',
    height: Dimensions.get('window').height * 0.04,
    marginLeft: '3%',
    marginRight: '1%',
    // marginBottom: Dimensions.get('window').height * 0.01,
    paddingHorizontal: '3%',
    borderColor: '#ccc',
    borderWidth: 1,
    fontSize: 14,
  },
  inputModalContainer: { flexDirection: 'row', flexWrap: 'wrap' },
  inputContainer: {
    padding: 10,
    flex: 1,
    justifyContent: 'flex-end',
  },
  text: {
    marginVertical: Dimensions.get('window').height * 0.001,
    height: Dimensions.get('window').height * 0.03,
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
    // paddingRight: 30, // to ensure the text is never behind the icon
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
    marginVertical: Dimensions.get('window').height * 0.05,
    paddingVertical: Dimensions.get('window').height * 0.05,
    flexWrap: 'wrap',
    flexGrow: 1,
  },
});

const boxItemsStyle = StyleSheet.create({
  lengthInputStyle: {
    width: '45%',
    height: Dimensions.get('window').height * heightFactor,
    marginHorizontal: '2%',
    marginVertical: Dimensions.get('window').height * 0.002,
    flexDirection: 'column',
    flexGrow: 1,
    paddingVertical: Dimensions.get('window').height * 0.002,
  },
  otherEqLengthInputsStyle: {
    width: '45%',
    height: Dimensions.get('window').height * heightFactor,
    marginHorizontal: '2%',
    marginVertical: Dimensions.get('window').height * 0.002,
    flexDirection: 'column',
    paddingVertical: Dimensions.get('window').height * 0.002,
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
