import React from "react";
import { StyleSheet } from 'react-native';
import { Dimensions } from "react-native";
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
const Styles = StyleSheet.create({
        container: {
                alignSelf: "stretch",
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#000000',
                color: '#fff',
                flex: 1,
                padding: 2
        },
        navigationText: {
                color: "#fff",
                fontSize: 32,
        },
        navigationBorder: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: "center"
        },
        keypadIconsText: {
                color: "#fff",
                fontSize: 64
        },
        logo: {
                color: '#ffffff',
                fontSize: 32,
                textAlign: 'center',
                //flex: '1',
        },
        text: {
                alignItems: 'center',
                color: '#ffffff',
                textAlign: 'center',
                padding: 10
        },
        iconSymbol: {
                color: "#ffff"
        },
        icon: {
                color: '#ffffff',

                fontSize: 16,
                padding: 10,
        },
        button: {
                color: '#FF8F1C',
                //flex: '0.5',
                textAlign: 'center',
                marginBottom: 10,
        },
        keypad: {
                padding: 12,
                width: width - 24,
                paddingBottom: "2%",
                flexDirection: 'row',
                justifyContent: 'space-around',

        },
        amountDisplay: {
                flexDirection: 'row',
                fontSize: 16,
                color: '#ffffff'
        },
        buttonExchange: {
                fontSize: 32,
                color: "#fff"
        },
        circle: {
                minWidth: 60,
                height: 60,
                borderRadius: 150 / 2,
                backgroundColor: 'black',
                color: 'white',
                borderColor: 'white',
                borderWidth: 1,
                marginTop: 23,
                textAlign: 'center',
                fontSize: 16,
                padding: 10,
        },
        navigationLogo: {

                height: 60,
                width: 60
        },
        keypadIcons: {
                borderColor:'#fff',
                width: 45,
                justifyContent: "center",
                alignItems: 'center'
        },
        navigation: {
                paddingBottom: 12,
                paddingHorizontal: 12,
                width: width,
                alignSelf: "stretch",
                justifyContent: 'space-between',
                flexDirection: 'row'
        }

});

export default Styles;