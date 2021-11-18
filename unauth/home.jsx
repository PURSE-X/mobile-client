import React from "react";
import { View, Text, StyleSheet, Image, Button, Touchable, TouchableOpacity } from 'react-native';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            textDisplayed: "",
            index: 0,
            timeElapsed: 0,
            blink: true
        }
    }
    componentWillUnmount() {
        clearInterval(this.blink);
    }
    blink;
    componentDidMount() {
        let message = ["Welcome! I am purseX.", "I have been optimized to provide a variety of world-class services.", "Would you like to Sign In or Sign Up?"]
        this.blink = setInterval(() => {
            this.setState(state => ({ ...state, blink: !state.blink }))
        }, 500)
        let msgInterval = setInterval(() => {
            this.setState(state => {
                if (state.index === 0) {
                    if (state.textDisplayed.length !== message[0].length) {
                        return {
                            ...state, textDisplayed: state.textDisplayed + message[0][state.textDisplayed.length]
                        }
                    }
                    else if (state.timeElapsed <= 20) {
                        return {
                            ...state, timeElapsed: state.timeElapsed + 1
                        }
                    }
                    else {
                        return {
                            ...state, index: 1, timeElapsed: 0
                        }
                    }
                }
                else if (state.index === 1) {

                    return { ...state, index: 2, textDisplayed: "" }


                }
                else if (state.index === 2) {
                    if (state.textDisplayed.length !== message[1].length) {
                        return {
                            ...state, textDisplayed: state.textDisplayed + message[1][state.textDisplayed.length]
                        }
                    }
                    else if (state.timeElapsed <= 20) {
                        return {
                            ...state, timeElapsed: state.timeElapsed + 1
                        }
                    }
                    else {
                        return {
                            ...state, index: 3, timeElapsed: 0
                        }
                    }
                }
                else if (state.index === 3) {
                    return { ...state, index: 4, textDisplayed: "" }

                }
                else {
                    if (state.textDisplayed.length !== message[2].length) {
                        return {
                            ...state, textDisplayed: state.textDisplayed + message[2][state.textDisplayed.length]
                        }
                    }
                    else {
                        clearInterval(msgInterval)
                        return { ...state, index: 5 }
                    }
                }

            })
        }, 70)
    }
    render() {
        return (<View style={styles.container}>
            <Image source={require('../assets/PurseX.png')} />
            <Text style={{ ...styles.font, ...styles.fontMain }}>{this.state.textDisplayed}{this.state.blink ? "|" : "‏‏‎‏‏‎ ‎"} </Text>
            {this.state.index === 5 ? <View style={styles.buttonContainer}><TouchableOpacity onPress={this.props.signIn}><View style={styles.button}><Text style={styles.font}>Sign In</Text></View></TouchableOpacity><TouchableOpacity onPress={this.props.signUp}><View style={styles.button}><Text style={styles.font}>Sign Up</Text></View></TouchableOpacity></View> : null}
        </View>)
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        color: "#fff",
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        justifyContent: "space-evenly",
        flexDirection: "row",
        marginVertical: 26,
        width: "100%"
    },
    button: {
        padding: 12,
        backgroundColor: "#1EBE62",
        borderRadius: 4
    },

    font: {
        fontSize: 17,
        color: "#fff"
    },
    fontMain: {
        textAlign: 'center',
        marginVertical: 24,
        fontSize: 24
    }
});

export default Home;