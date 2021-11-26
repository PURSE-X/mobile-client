import React from 'react';
import { Text, View, StyleSheet, Dimensions, FlatList, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import axios from 'axios';
import { proxy } from './../../../../redux/actions/auth';
import User from '../User';
const Invite = (props) => {
    const [state, setState] = React.useState({
        search: "",
        searchedFor: "",
        results: [],
        hasMore: false,
        invite: null
    })
    let onEndReachedCalledDuringMomentum = false;
    return (
        <TouchableWithoutFeedback onPress={
            Keyboard.dismiss
        }>
            {!state.invite ? <View style={{ width: '90%', height: '100%', marginTop: 5 }}>
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
                    marginVertical: 16,
                    borderBottomWidth: 4,
                    borderColor: "#fff"
                }} onChangeText={(e) => setState(state => ({ ...state, search: e }))} placeholderTextColor="#ffffff70" name="name" placeholder="name" />
                    <TouchableOpacity onPress={async () => {
                        const request = await axios.get(`${proxy}/api/profile/search/${state.search}/0`);
                        console.log(request.data);
                        setState(state => ({ ...state, searchedFor: state.search, results: request.data.profiles }));

                    }} style={{ padding: 15, zIndex: 5, width: '30%', backgroundColor: "transparent", borderRadius: 10 }}>
                        <Text style={{ color: "#fff", fontSize: 24, textAlign: 'center' }}>Search</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <View>
                        {state.searchedFor.length>0?<Text style={{ color: "#fff", fontSize: 24, textAlign: 'left' }}>Showing Results for {state.searchedFor}</Text>:null}
                    </View>
                    {state.results.length === 0 ? <Text></Text> : <FlatList
                        data={state.results}
                        renderItem={(item) => <User setSelected={(user) => {
                            setState(state => ({ ...state, invite: user }));
                        }} id={item.item.user} />}
                        keyExtractor={item => item._id}
                        contentContainerStyle={{
                            flexDirection: 'column',
                            alignItems: 'center',
                            paddingBottom: 350,
                            width: '100%',
                        }}
                        onMomentumScrollBegin={() => { onEndReachedCalledDuringMomentum = false; }}
                        initialNumToRender={10}
                        onEndReachedThreshold={1}
                        onEndReached={state.hasMore ? !onEndReachedCalledDuringMomentum ? async () => {
                            onEndReachedCalledDuringMomentum = true;
                            const request = await axios.get(`${proxy}/api/profile/search/${state.search}/${state.results.length}`);
                            setState(state => ({ ...state, searchedFor: state.search, results: [...state.results, ...request.data.profiles] }));
                        } : false : () => { }}
                    />}

                </View>
            </View> : <View style={{ width: '90%', height: '100%', marginTop: 5, alignItems: 'center', justifyContent: 'flex-start' }}>
                <User setSelected={(user) => {
                    // setState(state => ({ ...state, invite: user._id }));
                }} id={state.invite._id} />
                <TouchableOpacity onPress={async () => {
                    const request = await axios.post(`${proxy}/api/relationships/send/${state.invite._id}`);
                    console.log(request.data);
                    alert(`Friend request successfully sent to ${state.invite.name}`);
                    setState(state => ({ ...state, invite: null }));

                }} style={{ padding: 15, zIndex: 5, width: '90%', backgroundColor: "#186BA3", marginTop: 180, borderRadius: 10 }}>
                    <Text style={{ color: "#fff", fontSize: 24, textAlign: 'center' }}>Send Friend Request</Text>
                </TouchableOpacity>
            </View>}
        </TouchableWithoutFeedback>)
}


export default Invite;