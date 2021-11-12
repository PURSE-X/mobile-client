import React from 'react';
import { connect } from 'react-redux';
import { proxy } from '../../../redux/actions/auth';
import { Text, View } from 'react-native'
import axios from 'axios';
const TransactionComponent = (props) => {
    const [miniState, setMiniState] = React.useState(null)
    const getUserData = async (id) => {
        try {
            const request = await axios.get(`${proxy}/api/users/user-info/${id}`)
            setMiniState(request.data.msg);
        }
        catch (err) {
            console.log(err)
        }
    }
    React.useEffect(() => {
        getUserData(props.item.to.toString() === props.user._id.toString() ? props.item.from : props.item.to);
    }, [])
    if (!miniState) {
        return <View></View>
    }
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let date = new Date(props.item.date)
    console.log(miniState)
    return (<View>
        <View><Text style={{ color: '#fff' }}>${props.item.amount}</Text></View>
        <View><Text style={{ color: '#fff' }}>{props.item.to.toString() === props.user._id.toString() ? "received from" : "sent to"}</Text><Text style={{ color: '#fff' }}>{miniState.name}</Text><Text style={{ color: '#fff' }}>
            on {date.getDate() - 1} {months[date.getMonth()]} {date.getFullYear()}
        </Text></View></View>)
}
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
export default connect(mapStateToProps, mapDispatchToProps)(TransactionComponent)