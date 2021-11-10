import React from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import Styles from './style.jsx';
import backSpace from '../../../assets/backspace.png'
function Number_pad(props) {
  const onClick = (value, e) => {
    if (props.other) {
      props.setState(value)
    }
    else {
      props.setState(state => (state + (value !== '.' ? value : state.includes(value) ? '' : value)))

    }
  }
  const onDelete = (e) => {
    if (props.other) {
      props.delete()
    }
    else {
      props.setState(state => (state.slice(0, state.length - 1)));
    }
  }
  return (
    <View>
      <View style={Styles.text}>
        <View style={Styles.keypad}>
          <TouchableOpacity value={"1"} onPress={onClick.bind(this, 1)} style={Styles.keypadIcons}>
            <Text style={Styles.keypadIconsText}>{"1"}</Text>
          </TouchableOpacity>
          <TouchableOpacity value={"2"} onPress={onClick.bind(this, 2)} style={Styles.keypadIcons}>
            <Text style={Styles.keypadIconsText}>{"2"}</Text>
          </TouchableOpacity>
          <TouchableOpacity value={"3"} onPress={onClick.bind(this, 3)} style={Styles.keypadIcons}>
            <Text style={Styles.keypadIconsText}>{"3"}</Text>
          </TouchableOpacity>
        </View>

        <View style={Styles.keypad}>
          <TouchableOpacity value={"4"} onPress={onClick.bind(this, 4)} style={Styles.keypadIcons}>
            <Text style={Styles.keypadIconsText}> {"4"}</Text>
          </TouchableOpacity>
          <TouchableOpacity value={"5"} onPress={onClick.bind(this, 5)} style={Styles.keypadIcons}>
            <Text style={Styles.keypadIconsText}> {"5"}</Text>
          </TouchableOpacity>
          <TouchableOpacity value={"6"} onPress={onClick.bind(this, 6)} style={Styles.keypadIcons}>
            <Text style={Styles.keypadIconsText}> {"6"}</Text>
          </TouchableOpacity>
        </View>

        <View style={Styles.keypad}>
          <TouchableOpacity value={"7"} onPress={onClick.bind(this, 7)} style={Styles.keypadIcons}>
            <Text style={Styles.keypadIconsText}> {"7"}</Text>
          </TouchableOpacity>
          <TouchableOpacity value={"8"} onPress={onClick.bind(this, 8)} style={Styles.keypadIcons}>
            <Text style={Styles.keypadIconsText}> {"8"}</Text>
          </TouchableOpacity>
          <TouchableOpacity value={"9"} onPress={onClick.bind(this, 9)} style={Styles.keypadIcons}>
            <Text style={Styles.keypadIconsText}>{"9"}</Text>
          </TouchableOpacity>
        </View>

        <View style={Styles.keypad}>
          <TouchableOpacity value={"."} onPress={onClick.bind(this, '.')} style={Styles.keypadIcons}>
            <Text style={Styles.keypadIconsText}> {"."}</Text>
          </TouchableOpacity>
          <TouchableOpacity value={"0"} onPress={onClick.bind(this, "0")} style={Styles.keypadIcons}>
            <Text style={Styles.keypadIconsText}> {"0"}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete} style={Styles.keypadIcons}>
            <Text style={{ color: '#fff', fontSize: 40 }}> {"<-"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Number_pad;