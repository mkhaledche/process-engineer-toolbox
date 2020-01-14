import { StyleSheet, Platform, Dimensions } from 'react-native';

const typicalStyles = StyleSheet.create({
  inputGroup: {
    flexDirection: Platform.OS === 'ios' ? 'row' : 'column',
    flex: 1,
  },
  input: {
    width: '80%',
    height: Dimensions.get('window').height * 0.04,
    marginLeft: '3%',
    marginRight: '1%',
    marginVertical: Dimensions.get('window').height * 0.005,
    paddingHorizontal: '3%',
    borderColor: '#ccc',
    borderWidth: 1,
    fontSize: 14,
  },
  picker: {
    // width: '20%',
    // height: Dimensions.get('window').height * 0.04,
    // marginVertical: Dimensions.get('window').height * 0.005,
    // marginLeft: '1%',
    // marginRight: '1%',
    // paddingVertical: Dimensions.get('window').height * 0.005,
    // fontSize: 18,
    // borderColor: '#ccc',
    // borderWidth: 1,
  },
  inputContainer: {
    padding: 10,
    flex: 1,
    justifyContent: 'flex-end',
  },
  text: {
    marginVertical: Dimensions.get('window').height * 0.006,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: Dimensions.get('window').height * 0.04,
    width: '80%',
    fontSize: 16,
    paddingVertical: Dimensions.get('window').height * 0.002,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    height: Dimensions.get('window').height * 0.04,
    width: '80%',
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: Dimensions.get('window').height * 0.002,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 2,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
export { typicalStyles, pickerSelectStyles };
