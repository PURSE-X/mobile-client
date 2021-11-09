import React from "react";

import { ScrollView as View, Text, StyleSheet } from 'react-native';
import Home from './HomePage/AuthHome';
import NavigationMenu from './HomePage/components/navigation_menu'
import Profile from './HomePage/Profile';
class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            screen: 0,
            screens: [0, //home
                1,  //profile page
                2,  //add money
                3,  //send money
                4 //friend's page
            ]
        }

    }
    setScreen = (screenId) => {
        this.setState(state => ({ ...state, screen: screenId }));
    }
    render() {
        if (this.state.screen === 0) {
            return (<View style={{ backgroundColor: "#000", flex: 1 }}><Home /><NavigationMenu setScreen={this.setScreen} /></View>)
        }
        else if (this.state.screen === 1) {
            return <View style={{ backgroundColor: "#000", flex: 1 }}><Profile /><NavigationMenu setScreen={this.setScreen} /></View>
        }
        else if (this.state.screen === 2) {
            return <Home />
        }
        else if (this.state.screen === 3) {
            return <Home />
        }
        else {
            return <Home />
        }
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