import {
    ADD_ALERT,
    REMOVE_ALERT
} from "../definitions";
const initialState = []

const alerts = (state = initialState, action) => {
    const {
        payload,
        type
    } = action;
    switch (type) {
        case ADD_ALERT:
            return [...state, payload]
        case REMOVE_ALERT:
            return state.filter(alert => {
                if (alert.id !== payload.id) {
                    return alert
                }
            })
        default:
            return state
    }

}

export default alerts;