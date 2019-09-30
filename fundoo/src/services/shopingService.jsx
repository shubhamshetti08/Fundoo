import axios from 'axios';
require('dotenv').config();
const baseURL = process.env.REACT_APP_BASE_URL
export function service() {
    return axios.get(baseURL+"/user/service")
}
export function addToCart(data) {
    return axios.post(baseURL + '/productcarts/addToCart', data);
}

