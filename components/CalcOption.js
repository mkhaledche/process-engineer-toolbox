import * as React from "react";
import {View, TouchableOpacity} from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";

const CalcOption = props => {
  return (
    <View>
    <TouchableOpacity onPress={props.onPress}>  
    <Card>
      <Card.Content>
        <Title>{props.title}</Title>
        <Paragraph>{props.content}</Paragraph>
      </Card.Content>
      <Card.Cover source={{uri:props.image}} style={{height: 150, width: '100%'}} />
      <Card.Actions>
      </Card.Actions>
    </Card></TouchableOpacity></View>

  );
};

export default CalcOption;