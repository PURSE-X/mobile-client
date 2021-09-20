import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import UnAuth from './unauth/unauth';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// 
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      screen: 0
    }
  }
  render() {
    return (
      <UnAuth />
    );
  }
}
export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: "#fff",
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  font: {
    color: "#fff"
  }
});
