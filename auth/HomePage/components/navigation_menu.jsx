import React from "react";
import outlineReorderWhite24dp from '../assets/outlineReorderWhite24dp.png'
import { View, TouchableOpacity, Text, Image, Touchable } from "react-native";
import Styles from './style.jsx';
import dollarIcon from '../assets/dollarIcon.png'
import PurseXLogo from '../../../assets/PurseX.png'
import twotoneLocalLibraryWhite24dp from '../assets/twotoneLocalLibraryWhite24dp.png'
import twotoneBookmarkBorderWhite24dp from '../assets/twotoneBookmarkBorderWhite24dp.png'
import twotoneMenuBookWhite24dp from '../assets/twotoneMenuBookWhite24dp.png'
import twotoneBookOnlineWhite24dp from '../assets/twotoneBookOnlineWhite24dp.png'
import twotoneReceiptLongWhite24dp from '../assets/twotoneReceiptLongWhite24dp.png'
import roundAccountBalanceWhite24dp from '../assets/roundAccountBalanceWhite24dp.png'
import roundAccountBalanceWalletWhite24dp from '../assets/roundAccountBalanceWalletWhite24dp.png'
import theone from '../assets/theone.png'
import fourCornerOne from '../assets/fourCornerOne.png'
import QRdesign from '../assets/QRdesign.png'
import QRcodeReader from '../assets/QRcodeReader.png'
import money from '../assets/money.png'
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