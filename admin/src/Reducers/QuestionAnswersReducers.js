import { GET_QA_DATA_FAILURE, GET_QA_DATA_SUCCESS } from '../Constants/UserConstants';
export function questionAnswers (state = { qa: [] }, action) {
    switch (action.type) {
        case GET_QA_DATA_SUCCESS:
            return {
                ...state,
                getAdminData: true,
                qa: action.payload
            };
        case GET_QA_DATA_FAILURE:
            return {
                ...state,
                getAdminData: false,
                qa: action.payload

                
            };
            
        default:
            return state
    }
}