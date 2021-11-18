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
    TouchableOpacity,
    ImageBackground,
} from 'react-native';
import { connect } from 'react-redux';
import axios from "axios";
import Header from "./components/header";
import Number_pad from "./components/number_pad";
import { BarCodeScanner } from 'expo-barcode-scanner';
import { proxy, SignOut, load_user } from "../../redux/actions/auth";
import InputArea from './components/inputArea';
import Styles from './components/style';
import QRCode from 'react-native-qrcode-svg';
import logo from '../../assets/PurseX.png';
import tree from './assets/tree.png';


class Profile extends React.Component {
    componentDidMount = () => {
        this.props.load_user()
    }

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            receiver: null,
            amount: "",
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
    getUserData = async (id) => {
        try {
            const request = await axios.get(`${proxy}/api/users/user-info/${id}`)

            this.setState(state => ({ ...state, receiver: request.data.msg }));

        }
        catch (err) {
            console.log(err)
        }
    }
    handleBarCodeScanned = async ({ type, data }) => {
        console.log(data);
        await this.getUserData(data);
    };
    sendFunds = async () => {
        try {
            const request = await axios.post(`${proxy}/api/transfer/send`, { amount: Math.ceil(Number(this.state.amount)), to: this.state.receiver._id })
            this.setState(state => ({ ...state, receiver: null }))
        }
        catch (err) {
            console.log(err);
        }
    }
    render() {
        return (
        
            <ImageBackground source={tree} style = {Styles.container}> 
        
        <View style={{
            ...Styles.container, justifyContent: 'space-evenly', alignItems: 'center'
        }}>
            <StatusBar hidden />
            <Header>QR Code</Header>
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

                        {!this.state.receiver ? <View style={PageStyles.modalHeader}>
                            <Text style={PageStyles.modalHeaderTitle}>Scan QR Code</Text>
                        </View> : <View style={{ width: '100%', paddingHorizontal: 60, position: "absolute", top: 0, zIndex: 5, justifyContent: 'space-between', alignItems: "center", flexDirection: 'row', backgroundColor: "#222222", height: 70, borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
                            <Text style={{ color: "#fff", fontSize: 30 }}>Pay {this.state.receiver.name}</Text>
                            <Image style={{ width: 30, height: 30, borderRadius: 30 / 2 }} source={{ uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" }}></Image>

                        </View>}

                        {this.state.cameraPermission ? !this.state.receiver ? <><View><BarCodeScanner
                            onBarCodeScanned={this.handleBarCodeScanned}
                            style={{
                                height: Dimensions.get('window').width * 0.8,
                                width: Dimensions.get('window').width * 0.8
                            }}
                        /></View><View /></> : <View style={{ alignItems: 'center' }}>
                            <InputArea styles={{ marginTop: 80 }} state={this.state.amount.length === 0 ? "0" : this.state.amount} />
                            <View styles={{ height: 300 }} >
                                <Number_pad other={true} setState={(value) => {
                                    if (this.state.amount.includes('.') || value === ".") {
                                        if (value === ".") {
                                            this.setState(state => ({ ...state, amount: (state.amount + (value !== '.' ? value : state.amount.includes(value) ? '' : value)) }))
                                        }
                                        else if ((this.state.amount.length - (this.state.amount.indexOf('.') + 1)) <= 1) {
                                            this.setState(state => ({ ...state, amount: (state.amount + (value !== '.' ? value : state.amount.includes(value) ? '' : value)) }))
                                        }
                                    } else if (this.state.amount.length < 6) {
                                        this.setState(state => ({ ...state, amount: (state.amount + (value !== '.' ? value : state.amount.includes(value) ? '' : value)) }))
                                    }
                                }} delete={() => {
                                    this.setState(state => ({ ...state, amount: state.amount.slice(0, state.amount.length - 1) }));

                                }} />
                            </View>
                            <TouchableOpacity onPress={this.sendFunds} style={{ ...PageStyles.modalButton, width: '30%', marginTop: 15, borderRadius: 15 }}><Text style={PageStyles.modalButtonTitle}>PAY</Text></TouchableOpacity>

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

</ImageBackground>

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
        borderRadius: 20,
        marginTop: 30,
        padding: 15,
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
        marginTop: 30,
        // width: 100,
        borderRadius: 30,
        marginBottom: 32
    },
    modalOut: {
        height: Dimensions.get('window').width < 370 ? "5%" : '15%',
        // backgroundColor: '#00000080',
        width: '100%'
    },
    modalStyle: {
        alignItems: 'center',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        height: Dimensions.get('window').width < 370 ? "95%" : "85%",
        justifyContent: 'space-between',
        backgroundColor: "#292929",
        width: "100%"
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);