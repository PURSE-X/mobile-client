import React from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import Styles from './style.jsx';

function Currency(props) {
  return (
    <TouchableOpacity style={Styles.icon}>
      <Text style={Styles.iconSymbol}>  $</Text>
    </TouchableOpacity>
  )
}

export default Currency;