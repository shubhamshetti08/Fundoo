import {
    GET_ADMIN_DATA
} from '../Constants/UserConstants';
export function dashboardReducers(state = {
    user: []
}, action) {
    switch (action.type) {
        case GET_ADMIN_DATA:
            return {
                ...state,
                user: action.payload
            };
        default:
            return state
    }
}