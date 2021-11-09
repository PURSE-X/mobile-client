import React from "react";
import snakeIcon from '../assets/snakeIcon.png'
import { View, TouchableOpacity, Text, Image, Touchable } from "react-native";
import Styles from './style.jsx';
import dollarIcon from '../assets/dollarIcon.png'
import PurseXLogo from '../../../assets/PurseX.png'
class Nav extends React.Component {
  constructor(props) {
    super(props);

    // console.log(props.setScreen)
  }
  setScreen = (a) => {
    this.props.setScreen(a);
  }
  render() {
    return (
      <View style={Styles.navigation}>

        <TouchableOpacity style={{ ...Styles.circle, ...Styles.navigationBorder }}>
          <Image source={dollarIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={{ ...Styles.circle, ...Styles.navigationBorder, borderWidth: 0 }}>
          <Text style={Styles.navigationText}>{"><"}</Text>

        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          this.setScreen(0)
        }} style={{ ...Styles.circle, ...Styles.navigationBorder, borderWidth: 0 }}>
          <Image style={Styles.navigationLogo} source={PurseXLogo}></Image>
        </TouchableOpacity>
        <TouchableOpacity style={{ ...Styles.circle, ...Styles.navigationBorder, borderWidth: 0 }}>
          <Image source={snakeIcon} style={Styles.navigationSnake} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
          this.setScreen(1)
        }} style={{ ...Styles.circle, ...Styles.navigationBorder }}>
          <Text style={Styles.navigationText}>{""}</Text>
        </TouchableOpacity>

      </View>
    )
  }

}

export default Nav;