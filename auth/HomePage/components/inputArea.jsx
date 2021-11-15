import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const InputArea = (props) => {
    let containerStyles = {
        ...styles.container
    };
    if (props.styles) {
        containerStyles = { ...containerStyles, ...props.styles };
    }
    return (<View style={containerStyles}>
        <Text style={styles.text}>${props.state}</Text>
    </View>)
}
console.log(Dimensions.get('window').width)
const styles = StyleSheet.create({
    container: {
        marginTop: Dimensions.get('window').width < 370 ? 10 : 54,
        width: Dimensions.get('window').width - 24,
        paddingVertical: Dimensions.get('window').width < 370 ? 2 : 12,
        marginLeft: Dimensions.get('window').width > 370 ? 22 : 0,
        paddingHorizontal: 10
        // backgroundColor:"#fff"        
    },
    text: {
        fontSize: Dimensions.get('window').width < 370 ? 52 : Dimensions.get('window').width < 375 ? 54 : 60,
        color: "#fff",

    }

})
export default InputArea;