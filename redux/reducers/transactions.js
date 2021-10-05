import {
    LOAD_TRANSACTIONS
} from "../definitions";
const initialState = []

const transactions = (state = initialState, action) => {
    const {
        payload,
        type
    } = action;
    switch (type) {
        case LOAD_TRANSACTIONS:
            return [...state, ...payload]
        default:
            return state
    }

}

export default transactions;