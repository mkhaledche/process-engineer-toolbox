import * as React from "react";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";

const CalcOption = props => {
  return (
    <Card>
      <Card.Content>
        <Title>{props.title}</Title>
        <Paragraph>{props.content}</Paragraph>
      </Card.Content>
      <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
      <Card.Actions>
        <Button>Cancel</Button>
        <Button>Ok</Button>
      </Card.Actions>
    </Card>
  );
};

export default CalcOption;
