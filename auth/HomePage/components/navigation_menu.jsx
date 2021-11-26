import React from "react";

import { View, TouchableOpacity, Text, Image, Touchable } from "react-native";
import Styles from './style.jsx';

import roundAccountBalanceWhite24dp from '../assets/roundAccountBalanceWhite24dp.png'
import roundAccountBalanceWalletWhite24dp from '../assets/roundAccountBalanceWalletWhite24dp.png'
import theone from '../assets/theone.png'

import QRcodeReader from '../assets/QRcodeReader.png'

import PurseXNoBackground from '../assets/PurseXNoBackground.png'

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
          <Image source={roundAccountBalanceWhite24dp} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
          this.setScreen(2)
        }} style={{ ...Styles.circle, ...Styles.navigationBorder, borderWidth: 0 }}>
          <Image source={QRcodeReader} style={Styles.navigationSnake} />

        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          this.setScreen(0)
        }} style={{ ...Styles.circle, ...Styles.navigationBorder, borderWidth: 0 }}>
          <Image style={Styles.navigationLogo} source={PurseXNoBackground}></Image>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          this.setScreen(3)
        }} style={{ ...Styles.circle, ...Styles.navigationBorder, borderWidth: 0, }}>
          <Image source={theone} style={Styles.navigationSnake} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
          this.setScreen(1)
        }} style={{ ...Styles.circle, ...Styles.navigationBorder }}>
          <Image source={roundAccountBalanceWalletWhite24dp} /*style={Styles.navigationSnake}*/ />
          
        </TouchableOpacity>

      </View>
    )
  }

}

export default Nav;