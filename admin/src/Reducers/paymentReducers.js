import { GET_USER_CART_LIST_FAILURE, GET_USER_CART_LIST_SUCCESS } from '../Constants/UserConstants'
export default (state = {getCartData:false, cartData: [] }, action) => {
    switch (action.type) {
        case GET_USER_CART_LIST_SUCCESS: 
        return {
            ...state,
            cartData:action.payload
        }
        case GET_USER_CART_LIST_FAILURE: return {
            ...state,
            getCartData: false,
            cartData:action.payload
        }
        default:return{
            state
        }
    }
}