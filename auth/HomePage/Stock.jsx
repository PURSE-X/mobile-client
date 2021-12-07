import React from 'react';
import { proxy } from '../../redux/actions/auth';
import { connect } from 'react-redux';
import axios from 'axios';
import Header from "./components/header";
import Stock from './stock/stock';
import Styles from './components/style'
import { View, Text, TouchableOpacity, StyleSheet, Keyboard, TouchableWithoutFeedback, Modal, StatusBar, FlatList, Dimensions, TextInput } from 'react-native';
class Stocks extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ownedStocks: [],
            searchedStocks: [],
            search: "",
            clicked: null
        }

    }
    async componentDidMount() {
        await this.getUserOwnedStocks();
    }
    getUserOwnedStocks = async (refresh = false) => {
        const request = await axios.get(`${proxy}/api/stock/`);
        this.setState(state => ({ ...state, ownedStocks: refresh ? request.data.stocks : [...state.ownedStocks, ...request.data.stocks], searchedStocks: refresh ? [] : state.searchedStocks }));
    }
    buyOrSellAStock = async ({ symbol, amount, type }) => {
        try {
            const request = await axios.post(`${proxy}/api/stock`, { symbol, amount, type });
            alert(request.data.msg);
        }
        catch (err) {
            alert(err.response.data.error)
        }
    }
    buyOrSellACrypto = async ({ symbol, amount, type }) => {
        try {
            const request = await axios.post(`${proxy}/api/stock/crypto`, { symbol, amount, type });
            alert(request.data.msg);
        }
        catch (err) {

            alert(err.response.data.error)
        }
    }
    render() {
        return (<View style={{
            ...Styles.container, justifyContent: 'flex-start', alignItems: 'center'
        }}>
            <Header>Stonks</Header>
            <Modal transparent={true} visible={this.state.clicked ? true : false} animationType='slide' >
                {this.state.clicked ? <View style={PageStyles.modalContainer}>
                    <TouchableOpacity style={PageStyles.modalOut} onPress={() => {
                        this.setState(state => ({
                            ...state, clicked: null
                        }))
                    }} >
                        <View style={PageStyles.modalOut}>

                        </View>
                    </TouchableOpacity>
                    <View style={PageStyles.modalStyle}>
                        <View style={{ width: '80%', marginTop: 30 }}><Stock onPress={() => { }} symbol={this.state.clicked.symbol} owned={this.state.clicked.amount} apiKey={([" ECEMXZRRA5XW99DN",
                            "G5RW4SX35IOCIVEW",
                            "8N79FADOPCSVPXGU",
                            "I6AWWIB99XEDEL41"])[Math.floor(Math.random() * 4)]} /></View>

                        <View style={{ width: '90%', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ color: 'white', backgroundColor: "#1160C1", padding: 10, borderRadius: 10, marginBottom: 40 }}>
                                <Text style={{ color: 'white' }}>Your total invested capital in ${this.state.clicked.symbol} = ${this.state.clicked.price * this.state.clicked.amount}</Text></View>
                            <Text style={{ color: 'white' }}>Stock Owned: </Text>
                            <View style={{ width: '30%', marginTop: 30, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: 'white', marginBottom: 20, fontSize: 24 }}>
                                    {this.state.clicked.amountChanged}
                                </Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 100 }}>
                                    <TouchableOpacity onPress={() => { this.setState(state => ({ ...state, clicked: { ...state.clicked, amountChanged: state.clicked.amountChanged + 1 } })) }}>
                                        <View style={{ padding: 10, width: 40, height: 40, borderRadius: 40, backgroundColor: 'green', justifyContent: "center", alignItems: 'center', position: 'relative' }}><Text style={[{ color: 'white', fontSize: 24, textAlign: 'center' }, {
                                            transform: [
                                                { translate: [0, -2.4] }
                                            ]
                                        }]}>+</Text></View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => { this.setState(state => ({ ...state, clicked: { ...state.clicked, amountChanged: state.clicked.amountChanged > 0 ? state.clicked.amountChanged - 1 : 0 } })) }}>
                                        <View style={{ padding: 10, width: 40, height: 40, borderRadius: 40, justifyContent: "flex-start", alignItems: 'center', backgroundColor: 'red', position: 'relative' }}><Text style={[{
                                            color: 'white', fontSize: 24, textAlign: 'center', position: 'absolute', top: '50%', left: '50%'
                                        }, {
                                            transform: [
                                                { translate: [5, -2.4] }
                                            ]
                                        }]}>-</Text></View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {this.state.clicked.amount !== this.state.clicked.amountChanged ? <TouchableOpacity style={{ backgroundColor: this.state.clicked.amountChanged > this.state.clicked.amount ? "#42731F" : "#F62202", borderRadius: 10, marginTop: 20, padding: 10 }} onPress={async () => {
                                await this.buyOrSellAStock({ symbol: this.state.clicked.symbol, amount: Math.abs(this.state.clicked.amount - this.state.clicked.amountChanged), type: this.state.clicked.amountChanged > this.state.clicked.amount ? "buy" : "sell" })
                                await this.getUserOwnedStocks(true);

                            }}>
                                <View><Text style={{ fontSize: 20, color: "#fff" }}>{this.state.clicked.amountChanged > this.state.clicked.amount ? "Buy" : "Sell"} {Math.abs(this.state.clicked.amount - this.state.clicked.amountChanged)}</Text>
                                </View></TouchableOpacity> : null}
                        </View>

                    </View>
                </View> : null}
            </Modal>
            <View style={{ marginTop: 100, marginBottom:170, color: 'white', width: '85%' }}>
                <View style={{ width: '100%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}><TextInput style={{
                    color: 'white',
                    // height:32,
                    padding: 16,
                    borderRadius: 8,
                    backgroundColor: '#101010',
                    fontSize: 24,
                    width: "70%",
                    // flex: 1,
                    maxWidth: "100%",
                    textTransform: 'uppercase',
                    marginVertical: 16,
                    borderBottomWidth: 4,
                    borderColor: "#fff"
                }} value={this.state.search} onChangeText={(e) => this.setState(state => ({ ...state, search: e.toUpperCase() }))} placeholderTextColor="#ffffff70" name="name" placeholder="symbol" />
                    <TouchableOpacity onPress={() => {
                        if (this.state.searchedStocks.includes(this.state.search.trim()) || this.state.ownedStocks.includes(this.state.search.trim())) {
                            return;
                        }
                        this.setState(state => ({ ...state, searchedStocks: [...state.searchedStocks, this.state.search.trim()], search: "" }));
                    }} style={{ padding: 15, zIndex: 5, width: '30%', backgroundColor: "transparent", borderRadius: 10 }}>
                        <Text style={{ color: "#fff", fontSize: 24, textAlign: 'center' }}>ADD</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ height: this.state.searchedStocks.length > 0 ? '40%' : 0 }}>
                    {this.state.searchedStocks.length > 0 ? <><Text style={{ color: "#fff", marginVertical: 20, fontSize: 20 }}>
                        Searched Stocks
                    </Text>
                        <FlatList
                            renderItem={({ item }) => <Stock onPress={(price) => {
                                this.setState(state => ({
                                    ...state, clicked: {
                                        symbol: item,
                                        amount: 0,
                                        price,
                                        amountChanged: 0
                                    }
                                }));
                            }} symbol={item} owned={0} apiKey={([" ECEMXZRRA5XW99DN",
                                "G5RW4SX35IOCIVEW",
                                "8N79FADOPCSVPXGU",
                                "I6AWWIB99XEDEL41"])[Math.floor(Math.random() * 4)]} />}
                            data={this.state.searchedStocks}
                            keyExtractor={(data) => data}
                        />
                    </> : null}
                </View>
                <View style={{ height: this.state.searchedStocks.length === 0 ? '100%' : '50%' }}>
                    <Text style={{ color: "#fff", marginVertical: 20, fontSize: 20 }}>
                        MY stocks
                    </Text>
                    <FlatList
                        renderItem={({ item }) => <Stock onPress={(price) => {
                            this.setState(state => ({
                                ...state, clicked: {
                                    symbol: item.symbol,
                                    amount: item.amount,
                                    price,
                                    amountChanged: item.amount
                                }
                            }));
                        }} symbol={item.symbol} owned={item.amount} apiKey={([" ECEMXZRRA5XW99DN",
                            "G5RW4SX35IOCIVEW",
                            "8N79FADOPCSVPXGU",
                            "I6AWWIB99XEDEL41"])[Math.floor(Math.random() * 4)]} />}
                        data={this.state.ownedStocks}
                        keyExtractor={(data) => data._id}
                    />
                </View>
                <StatusBar hidden />
            </View>
          
        </View>)
    }
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
        fontSize: 34,
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
        height: Dimensions.get('window').width < 370 ? "20%" : '30%',
        // backgroundColor: '#00000080',
        width: '100%'
    },
    modalStyle: {
        alignItems: 'center',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        height: Dimensions.get('window').width < 370 ? "80%" : "70%",
        justifyContent: 'flex-start',
        backgroundColor: "#292929",
        width: "100%"
    }
})
const mapStateToProps = (state) => {
    return ({
        user: state.auth.user
    })
}
export default connect(mapStateToProps)(Stocks);