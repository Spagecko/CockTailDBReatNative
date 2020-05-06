import React from 'react';
import {Text, View, Button,} from 'react-native';

const  radioButton = (props) => {
  return (
      <View>
    <Button title = {props.name}></Button>
    </View>
  );
}
export default radioButton;

