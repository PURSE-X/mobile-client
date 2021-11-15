import React from 'react';
import { Modal, View, Text, StyleSheet, TextInput, Keyboard, Dimensions, TouchableOpacity, FlatList, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { proxy } from '../../../redux/actions/auth';
import Header from './header';
import axios from 'axios';
import User from './User'
export default (props) => {
    const [friends, setFriends] = React.useState([])
    const [navigation, setNavigation] = React.useState(0)
    const [recent, setRecent] = React.useState([]);
    const [selected, setSelected] = React.useState(null)
    const [search, setSearch] = React.useState({
        value: "",
        results: []
    });
    const loadMore = async () => {

    }
    React.useEffect(() => {
        (async () => {
            try {
                const acquaintances = await axios.get(`${proxy}/api/transfer`);
                setRecent(acquaintances.data.users);
            }
            catch (err) {
                console.log(err)
            }
        })()
    }, [])
    console.log(recent)

    return (
        <View>
            <Modal transparent={true} visible={props.open} animationType='slide' >

                <View style={PageStyles.modalContainer}>
                    <TouchableOpacity style={PageStyles.modalOut} onPress={() => {
                        props.setOpen(false)
                    }} >
                        <View style={PageStyles.modalOut}>

                        </View>
                    </TouchableOpacity>

                    <View onPress={() => {
                        Keyboard.dismiss()
                    }} style={PageStyles.modalStyle} >
                        {!selected ? <><TextInput placeholderTextColor="#fff" style={PageStyles.input} type="text" placeholder="Search" />
                            <View style={PageStyles.modalButtons}>
                                <TouchableOpacity onPress={() => setNavigation(0)} style={navigation === 0 ? PageStyles.modalButton : { ...PageStyles.modalButton, backgroundColor: '#73AC3B30' }}>
                                    <Text style={PageStyles.modalButtonTitle}>Friends</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setNavigation(1)} style={navigation === 1 ? PageStyles.modalButton : { ...PageStyles.modalButton, backgroundColor: '#73AC3B30' }}>
                                    <Text style={PageStyles.modalButtonTitle}>Recent</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1, height: '100%', width: '100%', flexGrow: 1 }}>
                                {recent.length > 0 && navigation === 1 ? <FlatList contentContainerStyle={{
                                    flexGrow: 1,
                                    paddingBottom: 50
                                }} data={recent} renderItem={data => <User key={data.key} id={data.item} setSelected={setSelected} />} keyExtractor={data => data} /> : null}
                            </View>
                        </> : <View style={{ width: '90%', alignItems: 'center', justifyContent: 'space-between', height: '100%', paddingVertical: 50 }}>
                            <Text style={{ fontSize: 50, textAlign: 'center', color: '#fff' }} >{props.amount}$</Text>
                            <User id={selected._id} setSelected={() => { }} />
                            <TouchableOpacity onPress={async () => {
                                try {
                                    const request = await axios.post(`${proxy}/api/transfer/send`, { amount: Math.ceil(Number(props.amount)), to: selected._id })
                                    props.setOpen(false)
                                }
                                catch (err) {
                                    console.log(err);
                                }
                            }} style={{ backgroundColor: "#3677F1", padding: 15, borderRadius: 20 }}><Text style={{ fontSize: 40, color: "#fff" }}>Pay</Text></TouchableOpacity>

                        </View>}
                    </View>
                </View>
            </Modal >
        </View >
    )
}
const PageStyles = StyleSheet.create({
    modalButtons: {
        width: '80%',
        marginTop: 10,
        padding: 10,
        paddingBottom: 20,
        flexDirection: 'row', justifyContent: 'space-evenly',
        borderBottomWidth: 2,
        borderColor: '#ffffff20'
    },
    input: {
        height: 60,
        borderRadius: 10,
        width: '80%',
        marginTop: 30,
        fontSize: 24,
        paddingHorizontal: 22,
        // paddingVertical: 0,
        color: "#fff",
        backgroundColor: '#011310',
    },
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
        padding: 10,

        // width: 100,
        borderRadius: 10,
        // marginBottom: 32
    },
    modalOut: {
        height: Dimensions.get('window').width < 370 ? "5%" : '20%',
        // backgroundColor: '#00000080',
        width: '100%'
    },
    modalStyle: {
        alignItems: 'center',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        height: Dimensions.get('window').width < 370 ? "95%" : "80%",
        justifyContent: 'space-between',
        backgroundColor: "#292929",
        width: "100%"
    }
})

