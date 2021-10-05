import {
    LOAD_USER,
    REMOVE_USER
} from "../definitions";
const initialState = {
    loaded: false,
    user: {}
}

const auth = (state=initialState, action) => {
    const {
        payload,
        type
    } = action;
    switch (type) {
        case LOAD_USER:
            return Object.assign({}, state, {
                user: payload.user,
                loaded: true
            })
        case REMOVE_USER:
            return Object.assign({}, state, {
                loaded: false,
                user: {

                }
            })
        default:
            return state
    }

}

export default auth;