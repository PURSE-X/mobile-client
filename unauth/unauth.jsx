import React from "react";
import { ScrollView as View, Text, StyleSheet } from 'react-native';
import Home from "./home";
// import SignIn from "./signin";
import SignUp from "./signup";
// let SignIn, signUp;
import SignIn from "./signin";
class UnAuth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            screen: 0,
            screens: ["PurseX", "Sign In!", "Sign Up!"]
        }
    }
    render() {
        return (<View contentContainerStyle={styles.container}>
            {this.state.screen === 0 ? <Home signIn={() => {
                this.setState(state => ({ ...state, screen: 1 }))
            }} signUp={() => {
                this.setState(state => ({ ...state, screen: 2 }))
            }} /> : this.state.screen === 1 ? <SignIn /> : <SignUp />}

        </View>)
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        color: "#fff",
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'flex-start',
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

export default UnAuth;