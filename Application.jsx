import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import UnAuth from './unauth/unauth';
import Auth from './auth/auth';
import { connect } from 'react-redux';
import { set_header, load_user } from './redux/actions/auth'
class App extends React.Component {
    async componentDidMount() {
        if (this.props.loaded) {
            set_header(this.props.token);
            this.props.load_user();
        }
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
        loaded: state.auth.loaded,
        token: state.auth.token
    }
}
const mapDispatchToProps = (dispatch) => {
    return ({
        load_user: () => {
            load_user(dispatch)
        }
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(App);

