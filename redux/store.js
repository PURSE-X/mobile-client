import {
    createStore,
    applyMiddleware,
    combineReducers
} from 'redux';
import thunk from 'redux-thunk';
import auth from './reducers/auth'
import alert from './reducers/alert';
import transactions from './reducers/transactions';
import friends from './reducers/friends'
const store = () => {
    return createStore(combineReducers({
        auth,
        alert,
        transactions,
        friends
    }, applyMiddleware(thunk)))
}

export default store;