import React from 'react';
import { Text, View, TouchableOpacity, Image, Dimensions, StyleSheet } from 'react-native';
import axios from 'axios';
import { proxy } from '../../../../redux/actions/auth';
import { AntDesign, Entypo as Cross } from '@expo/vector-icons';


class IndividualInvite extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            expanded: false,
            user: {
                name: ""
            },
        }
    }
    async componentDidMount() {
        try {
            const request = await axios.get(`${proxy}/api/users/user-info/${this.props.item.from}`);
            this.setState(state => ({ ...state, user: request.data.msg }))
        }
        catch (e) {
            console.log(e)
        }
    }
    accept = async () => {
        try {
            const request = await axios.put(`${proxy}/api/relationships/accept/${this.props.item._id}`);
            this.props.setState(state => ({
                ...state, results: state.results.filter(a => {
                    if (a._id.toString() !== this.props.item._id.toString()) {
                        return a;
                    }

                })
            }))
        }
        catch (e) {
            alert(e.response.data.error)
        }

    }
    reject = async () => {
        try {
            const request = await axios.put(`${proxy}/api/relationships/reject/${this.props.item._id}`);
            this.props.setState(state => ({
                ...state, results: state.results.filter(a => {
                    if (a._id.toString() !== this.props.item._id.toString()) {
                        return a;
                    }

                })
            }))
        }
        catch (e) {
            alert(e.response.data.error)
        }
    }
    render() {
        console.log(this.state)
        return (<View style={{ width: '100%', height: '100%', alignItems: 'center', marginTop: 25, flex: '1', flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ width: '100%', alignItems: 'center', height: '100%', marginTop: 5, flex: '1', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Image style={{ width: 40, height: 40, borderRadius: 20 }} source={{ uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" }}></Image>
                <Text style={{ color: "#fff", fontSize: 25, marginLeft: 10 }}>{this.state.user.name}</Text>
            </View>
            <View style={{ width: '10%', height: '100%', marginTop: 5, flex: '1', alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-end' }}>
                <TouchableOpacity onPress={this.accept}><AntDesign name="checkcircle" size={24} color="#8DDA30" style={{ marginRight: 15 }} /></TouchableOpacity>
                <TouchableOpacity onPress={this.reject}><Cross name="circle-with-cross" size={28} onClick={this.reject} color="#C8051E" /></TouchableOpacity>
            </View>
        </View>)
    }
}

export default IndividualInvite;