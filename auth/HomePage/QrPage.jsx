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
import { BarCodeScanner } from 'expo-barcode-scanner';

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
            open: false,
            receiver: null,
            amount: 0,
            cameraPermission: false
        };
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            console.log(status)
            this.setState(state => ({ ...state, cameraPermission: status === "granted" }))
        })();

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
    async componentDidMount() {

    }
    handleBarCodeScanned = ({ type, data }) => {
        console.log(data);
        this.setState(state => ({ ...state, receiver: data }));
        // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };
    render() {
        return (<View style={{
            ...Styles.container, justifyContent: 'space-evenly', alignItems: 'center'
        }}>
            <StatusBar hidden />
            <View style={{ width: '100%', position: "absolute", top: 0, zIndex: 5, justifyContent: 'center', alignItems: "center", backgroundColor: "#222222", height: 70 }}>
                <Text style={{ color: "#fff", fontSize: 30 }}>Profile</Text>
            </View>
            <Modal transparent={true} visible={this.state.open} animationType='slide' >
                <View style={PageStyles.modalContainer}>
                    <TouchableOpacity style={PageStyles.modalOut} onPress={() => {
                        this.setState(state => {
                            return ({ ...state, open: false })
                        })
                    }} >
                        <View style={PageStyles.modalOut}>

                        </View>
                    </TouchableOpacity>
                    <View style={PageStyles.modalStyle}>

                        <View style={PageStyles.modalHeader}>
                            <Text style={PageStyles.modalHeaderTitle}>Scan QR Code</Text>
                        </View>

                        {this.state.cameraPermission ? !this.state.receiver ?<><View><BarCodeScanner
                            onBarCodeScanned={this.handleBarCodeScanned}
                            style={{
                                height: Dimensions.get('window').width * 0.8,
                                width: Dimensions.get('window').width * 0.8
                            }}
                        /></View><View /></> : <View>
                            <Text>User Profile(I am making this part rn)</Text>
                        </View> : <Text>We can't help you scan QR codes, if you don't enable the camera</Text>}


                    </View>

                </View>
            </Modal>
            <View style={PageStyles.qrNavigation}>
                <TouchableOpacity onPress={(e) => this.setState(state => ({ ...state, open: true }))} style={PageStyles.qrNavigationButtons}>
                    <Text style={PageStyles.qrNavigationText}>
                        Scan QR Code
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={{ backgroundColor: '#00C80B', padding: 2 }}>
                <QRCode
                    value={this.props.user._id.toString()}
                    logo={logo}
                    size={Dimensions.get('window').width * 0.6}
                    logoSize={Dimensions.get('window').width * 0.1}
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
    qrNavigation: {
        width: Dimensions.get('window').width / 2,
        // backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    qrNavigationText: {
        color: '#fff',
        fontSize: 26,
        textAlign: 'center'
    },
    qrNavigationButtons: {
        borderRadius: 15,
        backgroundColor: '#0164A3',
        width: Dimensions.get('window').width * .6,

    },
    modalContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        height: "100%",
        margin: 0,
        color: "#00000090",
        backgroundColor: '#00000030'
    },
    modalHeader: {
        textAlign: 'center',

        width: '100%',
        backgroundColor: '#131313',
        padding: 32,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    modalHeaderTitle: {
        textAlign: 'center',
        fontSize: 24,
        color: '#fff'
    },
    modalButtonTitle: {
        color: "#fff",
        fontSize: 24,
    },
    modalButton: {
        backgroundColor: "#73AC3B",
        padding: 20,
        // width: 100,
        borderRadius: 30,
        marginBottom: 32
    },
    modalOut: {
        height: '15%',
        // backgroundColor: '#00000080',
        width: '100%'
    },
    modalStyle: {
        alignItems: 'center',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        height: "85%",
        justifyContent: 'space-between',
        backgroundColor: "#292929",
        width: "100%"
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);