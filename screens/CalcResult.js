import React from 'react';
import {View} from 'react-native';
import lineSizing from '../models/lineSizing'


const CalcResult = props => {
    const { navigation } = props;
    const inputData = navigation.state.params.inputData;
    lineSizing(inputData);
    return (
        <View>
            
        </View>
    )
}

export default CalcResult
