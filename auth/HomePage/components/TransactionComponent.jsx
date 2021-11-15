import React from 'react';
import { connect } from 'react-redux';
import { proxy } from '../../../redux/actions/auth';
import { Text, View, StyleSheet, Dimensions } from 'react-native'
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
        return () => {
            setMiniState({});
        };
    }, [])
    if (!miniState) {
        return <View></View>
    }
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let date = new Date(props.item.date)
    console.log(miniState)
    return (<>
        <View style={{ width: Dimensions.get('window').width - 50, marginVertical: 10 }}><View style={props.item.to.toString() === props.user._id.toString() ? { ...Styles.container, backgroundColor: "#73DBB4" } : { ...Styles.container, backgroundColor: "#DCC24B" }}>
            <View><Text style={Styles.amount}>${props.item.amount}</Text></View>
            <View style={Styles.message}><Text style={Styles.messageText}>{props.item.to.toString() === props.user._id.toString() ? "Received from " : "Sent to "}{miniState.name} on {date.getDate() - 1} {months[date.getMonth()]} {date.getFullYear()}
            </Text></View></View></View>


    </>)
}
const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
}
const Styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: 150,
        padding: 30,
        borderRadius: 10,
        overflow: 'hidden',
    },
    message: {
        flexDirection: 'row',
    },
    messageText: {
        fontSize: 20,
        writingDirection: 'auto',
        color: "#676766",
        lineHeight: 30
    },
    amount: {
        fontSize: 30,
        color: "#575656"
    }

})
const mapDispatchToProps = (dispatch) => {
    return ({
        SignOut: () => SignOut(dispatch),
        load_user: () => load_user(dispatch)
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(TransactionComponent)