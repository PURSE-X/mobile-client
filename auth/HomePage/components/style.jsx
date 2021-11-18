import React from "react";
import { StyleSheet, Dimensions } from 'react-native';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;



const Styles = StyleSheet.create({
        backgroundPic: {
                alignSelf: "stretch",
                justifyContent: 'space-between',
                alignItems: 'center',
                //backgroundColor: '#000000',
                color: '#fff',
                width: "100%",
                flex: 1,
                height: height - 100,
                padding: 2
        },
        
        container: {
                alignSelf: "stretch",
                justifyContent: 'space-between',
                alignItems: 'center',
                //backgroundColor: '#000000',
                color: '#fff',
                width: "100%",
                flex: 1,
                height: height + 100,
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
                textAlign: 'left',
                fontSize: 50,
                //fontFamily: 'AguafinaScript_400Regular',
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
                marginBottom: Dimensions.get('window').width < 370 ? 3 : 10,
        },
        keypad: {
                padding: Dimensions.get('window').width < 370 ? 10 : 12,
                width: width - 58,
                paddingBottom: Dimensions.get('window').width < 370 ? 0 : "2%",

                flexDirection: 'row',

                justifyContent: 'space-between',

        },
        amountDisplay: {
                flexDirection: 'row',
                fontSize: Dimensions.get('window').width < 370 ? 10 : 16,
                color: '#ffffff'
        },
        buttonExchange: {
                fontSize: Dimensions.get('window').width < 370 ? 20 : 32,
                color: "#fff"
        },
        circle: {
                //width: 60,
                //height: 60,
                //borderRadius: 150 / 2,
                //backgroundColor: 'black',
                //color: 'white',
                //borderColor: 'black',
                //borderWidth: 1,
                marginTop: 23,
                textAlign: 'center',
                fontSize: 16,
                padding: 10,
        },
        navigationLogo: {

                height: 50,
                width: 50
        },
        keypadIcons: {
                borderColor: '#fff',
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
        },
        modalContainer: {
                justifyContent: 'space-between',
                alignItems: 'center',
                height: "100%",
                margin: 0,
                color: "#00000090",
                backgroundColor: '#00000030'
            },
            modalHeader: {
                textAlign: 'center',
        
                width: '100%',
                backgroundColor: '#131313',
                padding: 32,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
            },
            modalHeaderTitle: {
                textAlign: 'center',
                fontSize: 24,
                color: '#fff'
            },
            modalButtonTitle: {
                color: "#fff",
                fontSize: 24,
            },
            modalButton: {
                backgroundColor: "#73AC3B",
                padding: 20,
                marginTop: 30,
                // width: 100,
                borderRadius: 30,
                marginBottom: 32
            },
            modalOut: {
                height: Dimensions.get('window').width < 370 ? "5%" : '10%',
                // backgroundColor: '#00000080',
                width: '100%'
            },
            modalStyle: {
                alignItems: 'center',
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                height: Dimensions.get('window').width < 370 ? "95%" : "90%",
                justifyContent: 'space-between',
                backgroundColor: "#292929",
                width: "100%"
            }

});

export default Styles;