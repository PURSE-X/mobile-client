import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import UnAuth from './unauth/unauth';
import store from './redux/store';
import { Provider } from 'react-redux';
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      screen: 0
    }
  }
  render() {
    return (
      <Provider store={store}>
        <UnAuth />
      </Provider>

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
