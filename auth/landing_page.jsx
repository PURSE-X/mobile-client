import React from "react";
import { TouchableWithoutFeedback } from "react-native";
import { useWindowDimensions, View, KeyboardAvoidingView, Text, StyleSheet, Keyboard, Image, Button, Touchable, TouchableOpacity, TextInput as Input } from 'react-native';

const App = () => {
  const window = useWindowDimensions();
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.logo}>
                {"><"}
            </TouchableOpacity>
              <View>
                <TouchableOpacity style={styles.icon}>
                    {"$"}
                </TouchableOpacity>
              </View>
            <TouchableOpacity style={styles.button}>
                {"exchange"}
            </TouchableOpacity>
              <View style={styles.keypad}>
                <TouchableOpacity style={styles.text}>
                    {"1"}
                </TouchableOpacity>
                <TouchableOpacity style={styles.text}>
                    {"2"}
                </TouchableOpacity>
                <TouchableOpacity style={styles.text}>
                    {"3"}
                </TouchableOpacity>
              </View>
              <View style={styles.keypad}>
                <TouchableOpacity style={styles.text}>
                    {"4"}
                </TouchableOpacity>
                <TouchableOpacity style={styles.text}>
                    {"5"}
                </TouchableOpacity><TouchableOpacity style={styles.text}>
                    {"6"}
                </TouchableOpacity>
              </View>
              <View style={styles.keypad}>
                <TouchableOpacity style={styles.text}>
                    {"7"}
                </TouchableOpacity>
                <TouchableOpacity style={styles.text}>
                    {"8"}
                </TouchableOpacity>
                <TouchableOpacity style={styles.text}>
                    {"9"}
                </TouchableOpacity>
              </View>
              <View style={styles.keypad}>
                <TouchableOpacity style={styles.text}>
                    {"0"}
                </TouchableOpacity>
              </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {backgroundColor: '#000000',
                color: '#000',
                flex:'1',
                padding:'10%'
                },
    logo: {color: '#ffffff',
           fontSize: '500%',
           textAlign: 'center',
           //flex: '1',
            },
    text: {color: '#ffffff',
           textAlign: 'center',
           padding: '10%'},
    icon: {color: '#ffffff',
           fontSize:'500%',
           //flex: '',
            },
    button: {color: '#FF8F1C',
             //flex: '0.5',
             textAlign: 'center',
             marginBottom: 10,
            },
    keypad: {padding:'5%',
             flexDirection:'row',
             justifyContent: 'space-around',
             
            }        

});

export default App;