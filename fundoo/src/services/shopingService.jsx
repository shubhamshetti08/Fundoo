import axios from 'axios';
require('dotenv').config();
const baseURL = process.env.REACT_APP_BASE_URL
export function service() {
    return axios.get(baseURL+"/user/service")
}
export function addToCart(data) {
    return axios.post(baseURL + '/productcarts/addToCart', data);
}
export function getCartDetails(cartId) {
    return axios.get(baseURL+`/productcarts/getCartDetails/${cartId}`,{
        headers: {
            Authorization: localStorage.getItem('token')

        }
})
}
exports.placeOrder=(data)=>{
    return axios.post(baseURL + '/productcarts/placeOrder/', data,
        {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
}
