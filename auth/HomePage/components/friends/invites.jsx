import React, { useEffect } from 'react';
import { Text, View, ScrollView, StyleSheet, Dimensions, TextInput, TouchableOpacity } from 'react-native';

const Invites = (props) => {
    const [receivedRequests, setReceivedRequests] = React.useState({
        hasMore: false,
        data: []
    });
    const [sentRequests, setSentRequests] = React.useState({
        hasMore: false,
        data: []
    });
    useEffect(() => {

    }, [])
    return (<ScrollView>
        <View>
            <Text>Invites Sent</Text>
            {/* <View>
                <FlatList
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
                />
            </View> */}
        </View>
        <View>
            <Text>Invites Received</Text>
            {/* <View>
                <FlatList
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
                />
            </View> */}
        </View>
    </ScrollView>)
}


export default Invites;