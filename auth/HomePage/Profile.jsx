import React from "react";
import {
    Dimensions,
    View,
    Image,
    StatusBar,
    Text,
    Modal,
    Linking,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';
//import Header from "./components/header";
import Number_pad from "./components/number_pad";
import { proxy, SignOut, load_user } from "../../redux/actions/auth";
import InputArea from './components/inputArea';
import Styles from './components/style';
//import BgPic from './components/BgPic.jsx';
import tree from './assets/tree.png';
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
        return (
        
            <ImageBackground source={tree} style = {Styles.container}> 

        <View style={{
            ...Styles.container, justifyContent: 'flex-start', alignItems: 'center'}}>
            
            <StatusBar hidden />
            
            <Modal transparent={true} visible={this.state.funds.opened} animationType='slide' >
                
                <View style={Styles.modalContainer}>
                    
                    <TouchableOpacity style={Styles.modalOut} onPress={() => {
                        this.setState(state => {
                            return ({ ...state, funds: { ...state.funds, opened: false } })
                        })
                    }} >    
                    </TouchableOpacity>
                    
                    <View style={Styles.modalStyle}>

                        <View style={Styles.modalHeader}>
                            <Text style={Styles.modalHeaderTitle}>Add Funds</Text>
                        </View>
                        
                        <InputArea styles={{ marginTop: 15 }} state={this.state.funds.amount.length === 0 ? "0" : this.state.funds.amount} />
                        
                        <View styles={{ height: 300 }} >
                            <Number_pad other={true} setState={(value) => {
                                this.setState(state => ({ ...state, funds: { ...state.funds, amount: (state.funds.amount + (value !== '.' ? value : state.funds.amount.includes(value) ? '' : value)) } }))
                            }} delete={() => {
                                this.setState(state => ({ ...state, funds: { ...state.funds, amount: state.funds.amount.slice(0, state.funds.amount.length - 1) } }));

                            }} />
                        </View>

                        <TouchableOpacity onPress={this.confirmFunds} style={Styles.modalButton}>
                            <Text style={Styles.modalButtonTitle}>Add Funds</Text>
                        </TouchableOpacity>
                    
                    </View>
                </View>
            </Modal>
            
            <ScrollView style={{ width: '100%', height: '100%' }} contentContainerStyle={{ justifyContent: 'flex-start', alignItems: 'center' }} >
                
                <View style={{ width: "90%", borderRadius: 20, flexDirection: 'row', padding: 10, backgroundColor: "transparent", alignItems: 'center', marginTop: 10, justifyContent: 'space-between' }}>
                    <Image style={{ width: 80, height: 80, borderRadius: 80 / 2 }} source={{ uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" }}></Image>
                    
                    <Text style={{ color: "#fff", fontSize: 25 }}>{this.props.user.name}</Text>
                </View>
                
                <View style={{ borderRadius: 20, width: "90%", padding: 20, backgroundColor: "transparent", alignItems: 'flex-start', marginTop: 50, justifyContent: 'space-between' }}>
                    
                    <View style={{ width: '100%', borderBottomWidth: 2, paddingBottom: 12 }}>
                        <Text style={{ color: "#fff", fontSize: 24, textAlign:'center' }}>Balance</Text>
                    </View>
                    
                    <View style={{ width: '100%', marginTop: 30 }}>
                        <Text style={{ color: "#fff", fontSize: 64, textAlign: 'center' }}>
                            ${this.props.user.balance}
                        </Text>
                    </View>
                    
                    <View style={{ width: '100%', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={this.addFunds} style={{ borderRadius: 40, marginTop: 30, height: 60, width: 60, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: "#fff", fontSize: 64, textAlign: 'center' }}>+</Text>
                        </TouchableOpacity>
                    </View>
                
                </View>
                
                

            </ScrollView>
        
        </View >
        
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);