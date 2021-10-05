import {
    LOAD_FRIENDS
} from "../definitions";
const initialState = []

const friends = (state = initialState, action) => {
    const {
        payload,
        type
    } = action;
    switch (type) {
        case LOAD_FRIENDS:
            return [...state, ...payload]
        default:
            return state
    }

}

export default friends;