import React from 'react';
import axios from 'axios';
import { props } from '../../../redux/actions/auth';
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { proxy } from '../../../redux/actions/auth';
class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        }
        console.log(props.id)

    }
    async componentDidMount() {

        const request = await axios.get(`${proxy}/api/users/user-info/${this.props.id}`)
        console.log(request.data)
        this.setState(state => ({ ...state, user: request.data.msg }))

    }
    render() {

        if (!this.state.user) {
            return (<View></View>)
        }
        console.log(this.props)
        return (<TouchableOpacity onPress={() => {
            this.props.setSelected(this.state.user)
        }} style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}><View style={{ width: "90%", borderRadius: 20, flexDirection: 'row', padding: 20, backgroundColor: "#202020", alignItems: 'center', marginTop: 30, justifyContent: 'space-between' }}>
                <Image style={{ width: 80, height: 80, borderRadius: 80 / 2 }} source={{ uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" }}></Image>
                <Text style={{ color: "#fff", fontSize: 25 }}>{this.state.user.name}</Text>
            </View></TouchableOpacity>)
    }
}
export default User;

