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
        marginTop: Dimensions.get('window').width < 370 ? 10 : 54,
        width: Dimensions.get('window').width - 24,
        paddingVertical: Dimensions.get('window').width < 370 ? 2 : 12,
        paddingHorizontal: Dimensions.get('window').width < 370 ? 10 : 32
        // backgroundColor:"#fff"        
    },
    text: {
        fontSize: Dimensions.get('window').width < 370 ? 52 : 64,
        color: "#fff",

    }

})
export default InputArea;