import axios from 'axios';
import {
    ASSIGN_TOKEN,
    LOAD_USER
} from '../definitions';
const proxy = "https://505d-171-61-10-135.ngrok.io"


export const set_header = async (token) => {
    try {
        axios.defaults.headers.common = {
            "x-auth-token": token
        };

    } catch (err) {
        console.log(err)
    }
}
export const load_user = async (dispatch) => {
    try {
        const request = await axios.get(proxy+"/api/users/info");
        dispatch({
            type: LOAD_USER,
            payload: {
                user: request.data.msg
            }
        });
    } catch (err) {

    }
}
export const login = async (dispatch, details) => {
    try {
        const {
            email,
            password
        } = details;
        const request = await axios.post(proxy+'/api/users/sign-in', {
            email,
            password
        })
        console.log(request.data.token)
        dispatch({
            type: ASSIGN_TOKEN,
            payload: request.data.token
        });
        set_header(request.data.token);
        load_user(dispatch);
    } catch (err) {
        console.log(err)
    }
}
export const register = async (dispatch, details) => {
    try {
        const {
            name,
            email,
            password
        } = details;
        const request = await axios.post(proxy+'/api/users/sign-up', {
            name,
            email,
            password
        })

        dispatch({
            type: ASSIGN_TOKEN,
            payload: request.data.token
        });
        set_header(request.data.token);
        load_user(dispatch);
    } catch (err) {
        console.log(err)
    }
}