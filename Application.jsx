import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import UnAuth from './unauth/unauth';
import Auth from './auth/auth';
import { connect } from 'react-redux';
class App extends React.Component {
    componentDidMount() {

    }
    constructor(props) {
        super(props)
        this.state = {
            screen: 0
        }
        console.log(props.loaded)
    }


    render() {
        if (!this.props.loaded) {
            return <UnAuth />
        }
        else {
            return (
                <Auth />



            );
        }

    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        alerts: state.alert,
        loaded: state.auth.loaded
    }
}
export default connect(mapStateToProps)(App);

