import React from "react";
import {
    Dimensions,
    View,
    Image,
    StatusBar,
    Modal,
    StyleSheet,
    SafeAreaView,
    Text,
    TouchableWithoutFeedback,
    TouchableOpacity,
    FlatList,
    ImageBackground
} from 'react-native';
import { v4 as uuid } from 'uuid'
import { connect } from 'react-redux';
import axios from "axios";
import Header from "./components/header";;
import { proxy, SignOut, load_user } from "../../redux/actions/auth";
import TransactionComponent from "./components/TransactionComponent";
import Styles from './components/style';
import tree from './assets/tree.png';


class Profile extends React.Component {
    componentDidMount = () => {
        this.props.load_user()
        this.loadMore();
    }

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            hasMore: true,
            transactions: []
        };


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
    updating = false;
    loadMore = async () => {
        this.onEndReachedCalledDuringMomentum = true;
        updating = true
        try {
            console.log(this.state.transactions.length)
            const request = await axios.get(`${proxy}/api/transfer/${this.state.transactions.length}/3`)
            let hasMore = request.data.payments.length < 10 ? false : true;
            this.setState(state => ({ ...state, hasMore, transactions: [...state.transactions, ...request.data.payments] }));
            updating = false
        }
        catch (err) {

        }
    }

    render() {

        
        

        return (
        
            <ImageBackground source={tree} style = {Styles.container}>
        
        <><StatusBar hidden />
            <Header>Transactions</Header><View style={{ marginTop: 50, height: Dimensions.get('window').height - 150, flex: 1, flexGrow: 1 }}>

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



                        </View>

                    </View>
                </Modal>
                {this.state.transactions.length === 0 ? <View style={{ flex: 1, height: Dimensions.get('window').height, width: Dimensions.get('window').width, marginTop: 70, justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontSize: 24, color: "#fff" }}>You haven't made any transactions yet</Text></View> : null}
                <FlatList
                    data={this.state.transactions}
                    renderItem={(item) => <TouchableWithoutFeedback onPress={() => { }}><TransactionComponent {...item} /></TouchableWithoutFeedback>}
                    keyExtractor={item => item._id}
                    contentContainerStyle={{
                        flexDirection: 'column',
                        marginTop: 70,
                        alignItems: 'center',
                        paddingBottom: 150,
                        width: '100%',
                    }}
                    onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
                    initialNumToRender={10}
                    onEndReachedThreshold={1}
                    onEndReached={this.state.hasMore ? !this.onEndReachedCalledDuringMomentum ? () => {
                        
                        this.loadMore();

                    } : false : () => { }}
                />
            </View></>

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
    modalContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        height: "100%",
        width: '100%',
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