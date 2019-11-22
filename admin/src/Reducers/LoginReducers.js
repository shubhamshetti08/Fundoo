import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE
} from '../Constants/UserConstants';
let user = JSON.parse(localStorage.getItem('data'));
const initialState = user ? {
    loggedIn: true,
    user
} : {};

export function loginReducers(state = initialState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                loggedIn: true,
                    user: action.data
            };
        case LOGIN_FAILURE:
            return {
                loggedIn: false,
            };

        default:
            return state
    }
}