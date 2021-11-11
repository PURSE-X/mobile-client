import React from "react";
import {
    Dimensions,
    View,
    Image,
    StatusBar,
    Text,
    Touchable,
    Modal,
    StyleSheet,
    Linking,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import Number_pad from "./components/number_pad";
import { proxy, SignOut, load_user } from "../../redux/actions/auth";
import InputArea from './components/inputArea';
import Styles from './components/style';
import QRCode from 'react-native-qrcode-svg';
import logo from '../../assets/PurseX.png';


import { connect } from 'react-redux';
import axios from "axios";

class Profile extends React.Component {
    componentDidMount = () => {
        this.props.load_user()
    }

    constructor(props) {
        super(props);
        this.state = {
            funds: {
                opened: false,
                amount: ""
            }
        }

    }
    confirmFunds = async () => {
        try {
            console.log(Math.ceil(Number(this.state.funds.amount)))
            const request = await axios.post(`${proxy}/api/payment/deposit`, {
                amount: Math.ceil(Number(this.state.funds.amount))
            })
            Linking.openURL(request.data.url);

        }
        catch (err) {
            console.log(err);
        }
    }
    addFunds = async () => {
        this.setState(state => {
            return ({ ...state, funds: { ...state.funds, opened: true } })
        })
    }
    componentDidMount() {
        console.log(this.props.user.profilePicture)
    }
    render() {
        return (<View style={{
            ...Styles.container, justifyContent: 'space-evenly', alignItems: 'center'
        }}>
            <StatusBar hidden />
            <View style={{ width: '100%', position: "absolute", top: 0, zIndex: 5, justifyContent: 'center', alignItems: "center", backgroundColor: "#222222", height: 70 }}>
                <Text style={{ color: "#fff", fontSize: 30 }}>Profile</Text>
            </View>
            <View style={PageStyles.qrNavigation}>
                <TouchableOpacity style={PageStyles.qrNavigationButtons}>
                    <Text style={PageStyles.qrNavigationText}>
                        Scan QR Code
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{ backgroundColor: '#00C80B', padding:10 }}>
                <QRCode
                    value={"pursex:" + this.props.user._id}
                    // logo={logo}
                    // logoSize={30}
                    logoBackgroundColor='transparent'
                />
            </View>
        </View>
        );
    }


};
const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
}
const mapDispatchToProps = (dispatch) => {
    return ({
        SignOut: () => SignOut(dispatch),
        load_user: () => load_user(dispatch)
    })
}
const PageStyles = StyleSheet.create({

})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);