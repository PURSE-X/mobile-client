import React from 'react';
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
import CurrentFriends from './friends/friends';
import Invite from './friends/invite';
import Invites from './friends/invites';

class Friends extends React.Component {
    componentDidMount() {

    }
    constructor(props) {
        super(props);
        this.state = {
            navigation: 0
        };
    }
    render() {
        return (
            <Modal transparent={true} visible={this.props.open} animationType='slide' >
                <View style={PageStyles.modalContainer}>
                    <TouchableOpacity style={PageStyles.modalOut} onPress={() => {
                        this.props.setOpen(false);
                    }} >
                        <View style={PageStyles.modalOut}>

                        </View>
                    </TouchableOpacity>
                    <View style={PageStyles.modalStyle}>
                        <View style={PageStyles.modalHeader}>
                            <Text style={PageStyles.modalHeaderTitle}>Friends</Text>
                        </View>
                        <View>
                            <View style={{ width: '100%', alignItems: 'center' }}>
                                <View style={{ width: "90%", padding: 0, alignItems: 'center', marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <TouchableOpacity onPress={() => {
                                        this.setState(state => ({ ...state, navigation: 0 }))
                                    }} style={{ padding: 15, zIndex: 5, width: '30%', backgroundColor: "transparent", borderRadius: 10 }}>
                                        <Text style={{ color: "#fff", fontSize: 24, zIndex: 5, textAlign: 'center' }}>Friends</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        this.setState(state => ({ ...state, navigation: 1 }))
                                    }} style={{ padding: 15, zIndex: 5, width: '40%', backgroundColor: "transparent", borderRadius: 10 }}>
                                        <Text style={{ color: "#fff", fontSize: 24, textAlign: 'center' }}>Add Friend</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        this.setState(state => ({ ...state, navigation: 2 }))
                                    }} style={{ padding: 15, zIndex: 5, width: '30%', backgroundColor: "transparent", borderRadius: 10 }}>
                                        <Text style={{ color: "#fff", fontSize: 24, textAlign: 'center' }}>Invites</Text>
                                    </TouchableOpacity>
                                    <View style={{ padding: 15, zIndex: 1, left: this.state.navigation === 0 ? '0%' : this.state.navigation === 1 ? "30%" : "70%", transition: 'all 1s', backgroundColor: '#57F885', borderRadius: 10, width: this.state.navigation === 1 ? '40%' : '30%', height: 54, position: 'absolute' }}>

                                    </View>
                                </View>
                            </View>
                        </View>
                        {this.state.navigation === 1 ? <Invite /> : this.state.navigation === 0 ? <CurrentFriends /> : <Invites/>}

                    </View>
                </View>
            </Modal>
        )
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
        height: Dimensions.get('window').width < 370 ? "5%" : '10%',
        // backgroundColor: '#00000080',
        width: '100%'
    },
    modalStyle: {
        alignItems: 'center',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        height: Dimensions.get('window').width < 370 ? "95%" : "90%",
        justifyContent: 'space-between',
        backgroundColor: "#292929",
        width: "100%"
    }
})
export default Friends;