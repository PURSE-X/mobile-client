import React from "react";
import { TouchableWithoutFeedback } from "react-native";
import { View, KeyboardAvoidingView, Text, StyleSheet, Keyboard, Image, Button, Touchable, TouchableOpacity, TextInput as Input } from 'react-native';
// import { Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { login } from '../redux/actions/auth';
class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            textDisplayed: "",
            index: 0,
            timeElapsed: 0,
            blink: true,
            user: {
                password: "",
                email: "",
            }
        }
    }
    blink;
    componentWillUnmount() {
        clearInterval(this.blink);
    }
    componentDidMount() {
        let message = ["May I ask you for your email?", "Please enter your password. "]
        this.blink = setInterval(() => {
            this.setState(state => ({ ...state, blink: !state.blink }))
        }, 500)
        let firstInterval = setInterval(() => {
            this.setState((state) => {
                if (state.textDisplayed.length !== message[0].length) {
                    return {
                        ...state, textDisplayed: state.textDisplayed + message[0][state.textDisplayed.length]
                    }
                }
                else {
                    clearInterval(firstInterval)
                    return {
                        ...state, index: 1, timeElapsed: 0
                    }

                }
            })
        }, 70)
    }
    render() {
        let message = ["May I ask you for your email?", "Please enter your password. "]
        return (

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : null}>

                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>


                    <View style={styles.container}>

                        <Image source={require('../assets/PurseX.png')} />

                        <Text style={{ ...styles.font, ...styles.fontMain }}>{this.state.textDisplayed}{this.state.blink ? "|" : "‏‏‎‏‏‎ ‎"} </Text>

                        {this.state.index === 1 ? <View style={styles.inputView}><Input
                            placeholder="johndoe@freedoe.com"
                            autoCompleteType="email"
                            textContentType="emailAddress"
                            style={styles.input}
                            value={this.state.name}

                            placeholderTextColor="#A1A1A1"
                            onChangeText={e => this.setState(state => ({ ...state, user: { ...state.user, email: e } }))}
                        />
                            <TouchableOpacity onPress={() => {
                                this.setState((e) => ({
                                    index: 2,
                                    textDisplayed: ""
                                }));
                                let text = "";
                                let fullText = message[1];
                                console.log(fullText)
                                let firstInterval = setInterval(() => {
                                    this.setState((state) => {
                                        if (text.length !== fullText.length) {
                                            text = text + fullText[text.length]
                                            return {
                                                ...state, textDisplayed: text
                                            }
                                        }
                                        else {
                                            clearInterval(firstInterval)
                                            return {
                                                ...state, index: 3, timeElapsed: 0
                                            }
                                        }
                                    })
                                }, 70)
                            }}><View style={styles.button}><Text style={styles.font}>Next</Text></View></TouchableOpacity>
                        </View>
                            : this.state.index === 3 ?
                                <View style={styles.inputView}>
                                    <Input
                                        secureTextEntry={true}
                                        placeholder="a random password"
                                        style={styles.input}
                                        value={this.state.name}
                                        placeholderTextColor="#A1A1A1"
                                        onChangeText={e => this.setState(state => ({ ...state, user: { ...state.user, password: e } }))}
                                    />
                                    <TouchableOpacity onPress={() => {
                                        this.setState((e) => ({
                                            index: 4,
                                            textDisplayed: ""
                                        }));
                                        this.props.login(this.state.user)
                                        let text = "";
                                        // let fullText = message[2];
                                        // console.log(fullText)

                                    }}><View style={styles.button}><Text style={styles.font}>Continue</Text></View></TouchableOpacity>
                                </View>
                                : null}
                    </View>


                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        )
    }
}
const styles = StyleSheet.create({
    inputView: {
        width: '100%',
        alignItems: 'center',
        maxWidth: "100%",

    },
    input: {
        color: 'white',
        // height:32,
        padding: 16,
        borderRadius: 8,
        backgroundColor: '#101010',
        fontSize: 24,
        width: "100%",
        // flex: 1,
        maxWidth: "100%",
        marginVertical: 16,
        borderBottomWidth: 4,
        borderColor: "#24987F"
    },
    container: {
        flex: 1,
        padding: 16,
        color: "#fff",
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container2: {
        textAlign: "center",
        // flex: 1,
        padding: 16,
        color: "#fff",
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        justifyContent: "space-evenly",
        flexDirection: "row",

        width: "100%"
    },
    button: {
        padding: 12,
        minWidth: '50%',
        textAlign: 'center',
        alignItems: "center",
        marginVertical: 26,
        fontSize: 24,
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
const mapStateToProps = (props) => {
    return {}
}
const mapDispatchToProps = (dispatch) => {
    return ({
        login: (details) => login(dispatch, details)
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);