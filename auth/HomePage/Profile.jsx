import React from "react";
import {
    Dimensions,
    View,
    Image,
    StatusBar,
    Text,
    Touchable,
    StyleSheet,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { SignOut } from "../../redux/actions/auth";
import Styles from './components/style';


import { connect } from 'react-redux';

class Profile extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        console.log(this.props.user.profilePicture)
    }
    render() {
        return (<View style={{
            ...Styles.container, justifyContent: 'flex-start', alignItems: 'center'
        }}>
            <StatusBar hidden />
            <View style={{ width: '100%', position: "absolute", top: 0, zIndex: 5, justifyContent: 'center', alignItems: "center", backgroundColor: "#222222", height: 70 }}>
                <Text style={{ color: "#fff", fontSize: 30 }}>Profile</Text>
            </View>
            <ScrollView style={{ width: '100%', height: '100%' }} contentContainerStyle={{ justifyContent: 'flex-start', alignItems: 'center' }} >
                <View style={{ width: "90%", borderRadius:20, flexDirection: 'row', padding: 20, backgroundColor: "#202020", alignItems: 'center', marginTop: 100, justifyContent: 'space-between' }}>
                    <Image style={{ width: 80, height: 80, borderRadius: "100%" }} source={{ uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" }}></Image>
                    <Text style={{ color: "#fff", fontSize: 25 }}>{this.props.user.name}</Text>
                </View>
                <View style={{borderRadius:20, width: "90%", padding: 20, backgroundColor: "#202020", alignItems: 'start', marginTop: 50, justifyContent: 'space-between' }}>
                    <View style={{ width: '100%', borderBottomWidth: 2, paddingBottom: 12 }}>
                        <Text style={{ color: "#fff", fontSize: 24 }}>Balance</Text>
                    </View>
                    <View style={{ width: '100%', marginTop: 30 }}>
                        <Text style={{ color: "#fff", fontSize: 64, textAlign: 'center' }}>
                            ${this.props.user.balance}
                        </Text>
                    </View>
                    <View style={{ width: '100%', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity style={{ width: 70, height: 70, borderRadius: '100%', marginTop: 30, backgroundColor: '#73AC3B' }}>
                            <Text style={{ color: "#fff", fontSize: 64, textAlign: 'center' }}>+</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={{ width: "90%", borderRadius: 10, padding: 20, backgroundColor: "#202020", alignItems: 'center', marginTop: 50, flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity style={{ padding: 15, backgroundColor: '#0DB681', borderRadius: 10 }}>
                        <Text style={{ color: "#fff", fontSize: 24, textAlign: 'center' }}>Withdraw Funds</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ width: "90%", padding: 20, alignItems: 'center', marginTop: 50, flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <TouchableOpacity onPress={this.props.SignOut} style={{ padding: 15, backgroundColor: '#B6320D', borderRadius: 10 }}>
                        <Text style={{ color: "#fff", fontSize: 24, textAlign: 'center' }}>Sign Out</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>
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
        SignOut: () => SignOut(dispatch)
    })
}
const PageStyles = StyleSheet.create({
    containerGeneral: {

    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);