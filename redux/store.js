import {
    createStore,
    applyMiddleware,
    combineReducers
} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage'

import {
    persistStore,

    persistReducer
} from 'redux-persist';
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: ['alert']
}
import thunk from 'redux-thunk';
import auth from './reducers/auth'
import alert from './reducers/alert';
import transactions from './reducers/transactions';
import friends from './reducers/friends'

const persistedAuth = persistReducer(persistConfig, auth)
const persistedTransactions = persistReducer(persistConfig, transactions)
const persistedAlert = persistReducer(persistConfig, alert)
const persistedFriends = persistReducer(persistConfig, friends)

const store = () => {
    const st = createStore(combineReducers({
        auth: persistedAuth,
        alert: persistedAlert,
        transactions: persistedTransactions,
        friends: persistedFriends
    }, applyMiddleware(thunk)));
    return {
        st,
        persistedStore: persistStore(st)
    };
}

export default store;