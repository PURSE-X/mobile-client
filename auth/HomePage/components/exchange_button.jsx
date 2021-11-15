import React from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import Styles from './style.jsx';

function Exchange_button(props) {
  return (
    <TouchableOpacity onPress={props.onPress} style={Styles.button}>
      <Text style={Styles.buttonExchange}> Exchange </Text>
    </TouchableOpacity>
  )
}

export default Exchange_button;