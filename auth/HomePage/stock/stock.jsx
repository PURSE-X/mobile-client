import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

class Stock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            price: 0,
            owned: this.props.owned,
            change: 0,
            changeSelected: 0
        };
    }
    async componentDidMount() {
        let name = await (await axios.get(`https://api.polygon.io/v1/meta/symbols/${this.props.symbol}/company?apiKey=U3boHDi4O_S7o5lB181xoKwu8jGcXXw0`)).data.name;
        let price = await axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${this.props.symbol}&apikey=${this.props.apiKey}`)
        let rate = price.data["Global Quote"]["10. change percent"];
        console.log(rate);
        rate = (Math.round(Number(rate.slice(0, rate.length - 1)) * 100) / 100) + "%";
        console.log(rate);
        this.setState(state => ({ ...state, price: price.data["Global Quote"]["05. price"], name, change: [price.data["Global Quote"]["09. change"], rate] }))
    }
    render() {
        console.log(this.state)
        return (
            <TouchableOpacity onPress={()=>{this.props.onPress(this.state.price)}}>
                <View style={{ color: 'white', width: '100%', marginBottom: 20, backgroundColor: this.state.change[0] > 0 ? "#14650050" : '#65000050', padding: 20, borderRadius: 20 }}>
                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View>
                            <Text style={{ color: 'white', fontSize: 35, marginBottom: 5 }}>
                                {this.props.symbol}
                            </Text>
                            <Text style={{ color: '#C2C1C1', fontSize: 15 }}>
                                {this.state.name}
                            </Text>
                        </View>
                        <View>
                            <Text style={{ color: 'white', fontSize: 20, marginBottom: 10, textAlign: 'center' }}>${Math.round(this.state.price * 100) / 100}</Text>
                            <TouchableOpacity onPress={() => {
                                this.setState(state => ({ ...state, changeSelected: state.changeSelected === 0 ? 1 : 0 }));
                            }}><View style={{ borderRadius: 10, padding: 10, backgroundColor: this.state.change[0] > 0 ? "#2BC111" : '#FF3232' }}><Text style={{ color: 'white', fontSize: 18 }}>
                                {this.state.changeSelected === 1 ? this.state.change[0] > 0 ? "+" + this.state.change[1] : this.state.change[1] : this.state.change[0] > 0 ? "+" + Math.round(this.state.change[this.state.changeSelected] * 100) / 100 : Math.round(this.state.change[this.state.changeSelected] * 100) / 100}</Text></View></TouchableOpacity>
                        </View>
                    </View>

                </View>
            </TouchableOpacity>
        )
    }
}


export default Stock;
