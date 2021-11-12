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
    TouchableOpacity,
    FlatList
} from 'react-native';
import { connect } from 'react-redux';
import axios from "axios";
import Header from "./components/header";;
import { proxy, SignOut, load_user } from "../../redux/actions/auth";
import TransactionComponent from "./components/TransactionComponent";
import Styles from './components/style';


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
    loadMore = async () => {
        try {
            const request = await axios.get(`${proxy}/api/transfer/${this.state.transactions.length}/3`)
            console.log(request.data)
            let hasMore = request.data.payments.length < 5 ? false : true;
            this.setState(state => ({ ...state, hasMore, transactions: [...state.transactions, ...request.data.payments] }));
        }
        catch (err) {

        }
    }

    render() {
        return (<><StatusBar hidden />
            <Header>Transactions</Header><SafeAreaView style={{
                ...Styles.container, justifyContent: 'space-between', alignItems: 'center'
            }}>

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
                <FlatList
                    data={this.state.transactions}
                    renderItem={(item) => <TransactionComponent {...item} />}
                    keyExtractor={item => item._id}
                    contentContainerStyle={{
                        flex: 1,
                        flexDirection: 'column',
                        marginTop: 200,
                        height: Dimensions.get('window').height - 200,
                        width: '100%'
                    }}
                    onEndReached={this.state.hasMore ? this.loadMore : () => { }}
                />
            </SafeAreaView></>
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