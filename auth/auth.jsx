import React from "react";
import { ScrollView as View, Text, StyleSheet } from 'react-native';
import Home from './HomePage/AuthHome';
class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            screen: 0,
            screens: ["PurseX", "Sign In!", "Sign Up!"]
        }
    }
    render() {
        return (<Home/>)
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        color: "#fff",
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    heading: {
        // backgroundColor:"#",
        padding: 18,
        paddingTop: 28,
        width: "100%",
        backgroundColor: "#0F0F0F"
    },
    headingFont: {
        color: "#6E6E6E",
        fontSize: 24,
        textAlign: "center"
    },
    font: {
        color: "#fff"
    }
});

export default Auth;