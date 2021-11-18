import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = (props) => {
    return (<View style={Styles.container}>
        <Text style={Styles.title}>{props.children}</Text>
    </View>)
}

const Styles = StyleSheet.create({
    container: {
        width: '90%', position: "absolute", top: 0, zIndex: 5, justifyContent: 'center', alignItems: "center", backgroundColor: "#222222", height: 70
    },
    title: {
        color: "#fff", fontSize: 30
    }
})

export default Header;