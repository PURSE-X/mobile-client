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
const styles = StyleSheet.create({
    container: {
        marginTop: 54,
        width: Dimensions.get('window').width - 24,
        paddingVertical: 12,
        paddingHorizontal: 32
        // backgroundColor:"#fff"        
    },
    text: {
        fontSize: 64,
        color: "#fff",

    }

})
export default InputArea;