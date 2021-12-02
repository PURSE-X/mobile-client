import React, { useEffect } from 'react';
import { Text, View, ScrollView, FlatList, StyleSheet, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import User from './../User';
import axios from 'axios';
import { proxy } from './../../../../redux/actions/auth';
import { connect } from 'react-redux';
import IndividualInvite from './individualInvite';
const Invites = (props) => {
    let onEndReachedCalledDuringMomentum = false;
    const [state, setState] = React.useState({
        hasMore: false,
        results: [],
        selected: null
    });
    const getFriends = async () => {
        onEndReachedCalledDuringMomentum = true;
        const request = await axios.get(`${proxy}/api/relationships/pending/${state.results.length}`);
        console.log(request.data)
        setState(state => ({ ...state, results: [...state.results, ...request.data.pendingRequests], hasMore: request.data.pendingRequests.length >= 10 }));

    }
    useEffect(() => {
        getFriends();
    }, [])
    console.log(state);
    return (<View style={{ width: '90%', height: '100%', marginTop: 5 }}>
        <View style={{ width: '100%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
            <FlatList
                data={state.results}
                renderItem={(item) => <IndividualInvite setState={setState} state={state} item={item.item} />}
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
                    getFriends();
                } : false : () => { }}
            />
        </View>
    </View>)
}

const mapStateToProps = (state) => {
    return ({
        user: state.auth.user
    })
}
export default connect(mapStateToProps)(Invites);