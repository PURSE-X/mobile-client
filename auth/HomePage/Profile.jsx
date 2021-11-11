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


import { connect } from 'react-redux';
import axios from "axios";

class Profile extends React.Component {
    componentDidMount = () =>{
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
            ...Styles.container, justifyContent: 'flex-start', alignItems: 'center'
        }}>
            <StatusBar hidden />
            <View style={{ width: '100%', position: "absolute", top: 0, zIndex: 5, justifyContent: 'center', alignItems: "center", backgroundColor: "#222222", height: 70 }}>
                <Text style={{ color: "#fff", fontSize: 30 }}>Profile</Text>
            </View>
            <Modal transparent={true} visible={this.state.funds.opened} animationType='slide' >
                <View style={PageStyles.modalContainer}>
                    <TouchableOpacity style={PageStyles.modalOut} onPress={() => {
                        this.setState(state => {
                            return ({ ...state, funds: { ...state.funds, opened: false } })
                        })
                    }} >
                        <View style={PageStyles.modalOut}>

                        </View>
                    </TouchableOpacity>
                    <View style={PageStyles.modalStyle}>

                        <View style={PageStyles.modalHeader}>
                            <Text style={PageStyles.modalHeaderTitle}>Add Funds</Text>
                        </View>
                        <InputArea styles={{ marginTop: 15 }} state={this.state.funds.amount.length === 0 ? "0" : this.state.funds.amount} />
                        <View styles={{ height: 300 }} >
                            <Number_pad other={true} setState={(value) => {
                                this.setState(state => ({ ...state, funds: { ...state.funds, amount: (state.funds.amount + (value !== '.' ? value : state.funds.amount.includes(value) ? '' : value)) } }))
                            }} delete={() => {
                                this.setState(state => ({ ...state, funds: { ...state.funds, amount: state.funds.amount.slice(0, state.funds.amount.length - 1) } }));

                            }} />
                        </View>

                        <TouchableOpacity onPress={this.confirmFunds} style={PageStyles.modalButton}><Text style={PageStyles.modalButtonTitle}>Add Funds</Text></TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <ScrollView style={{ width: '100%', height: '100%' }} contentContainerStyle={{ justifyContent: 'flex-start', alignItems: 'center' }} >
                <View style={{ width: "90%", borderRadius: 20, flexDirection: 'row', padding: 20, backgroundColor: "#202020", alignItems: 'center', marginTop: 100, justifyContent: 'space-between' }}>
                    <Image style={{ width: 80, height: 80, borderRadius: 80/2 }} source={{ uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" }}></Image>
                    <Text style={{ color: "#fff", fontSize: 25 }}>{this.props.user.name}</Text>
                </View>
                <View style={{ borderRadius: 20, width: "90%", padding: 20, backgroundColor: "#202020", alignItems: 'flex-start', marginTop: 50, justifyContent: 'space-between' }}>
                    <View style={{ width: '100%', borderBottomWidth: 2, paddingBottom: 12 }}>
                        <Text style={{ color: "#fff", fontSize: 24 }}>Balance</Text>
                    </View>
                    <View style={{ width: '100%', marginTop: 30 }}>
                        <Text style={{ color: "#fff", fontSize: 64, textAlign: 'center' }}>
                            ${this.props.user.balance}
                        </Text>
                    </View>
                    <View style={{ width: '100%', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={this.addFunds} style={{ width: 70, height: 70, borderRadius: 70/2, marginTop: 30, backgroundColor: '#73AC3B', justifyContent:'center', alignItems:'center' }}>
                            <Text style={{ color: "#fff", fontSize: 64, textAlign: 'center' }}>+</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={{ width: "90%", borderRadius: 10, padding: 20, backgroundColor: "#202020", alignItems: 'center', marginTop: 50, flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity style={{ padding: 15, backgroundColor: '#0DB681', borderRadius: 10 }}>
                        <Text style={{ color: "#fff", fontSize: 24, textAlign: 'center' }}>Withdraw Funds</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ width: "90%", padding: 20, alignItems: 'center', marginTop: 50, flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <TouchableOpacity onPress={this.props.SignOut} style={{ padding: 15, backgroundColor: '#B6320D', borderRadius: 10 }}>
                        <Text style={{ color: "#fff", fontSize: 24, textAlign: 'center' }}>Sign Out</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
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