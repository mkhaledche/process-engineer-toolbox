import React from 'react';
import { View, Text } from 'react-native';
import lineSizing from '../models/lineSizing';

const CalcResult = props => {
  const { navigation } = props;
  const inputData = navigation.state.params.inputData;
  let inputOutputData = lineSizing(inputData);

  return (
    <View style={{ marginHorizontal: '2%', paddingHorizontal: '2%' }}>
      <View>
        <View style={{ alignItems: 'center', marginBottom: 5 }}>
          <Text style={{ fontSize: 20 }}>Input Data</Text>
        </View>
        {inputOutputData.calculationInputs.map(input => (
          <View style={{ marginVertical: 2.5 }}>
            <Text style={{ fontSize: 15 }}>
              {input.name} = {input.value} {input.unit}
            </Text>
          </View>
        ))}
        {inputOutputData.appliedCriteria.map(criterion => (
          <View style={{ marginVertical: 2.5, fontSize: '13' }}>
            <Text style={{ fontSize: 15 }}>
              {criterion.criteria} = {criterion.value} {criterion.unit}
            </Text>
          </View>
        ))}
      </View>

      <View style={{ alignItems: 'center', marginTop: 50, marginBottom: 20 }}>
        <Text style={{ fontSize: 20 }}>Results</Text>
      </View>
      {inputOutputData.results.map(output => (
        <View style={{ marginVertical: 2.5, flexDirection: 'row', alignItems: 'flex-start' }}>
          <Text style={{ fontSize: 15 }}>{output.label} </Text>
          <Text
            style={{
              fontSize: 15,
              color: output.criteriaMet === 'No' ? 'red' : 'blue',
            }}>
            {Math.round(output.value * 100) / 100} {output.unit}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default CalcResult;
