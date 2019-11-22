import axios from 'axios';
// import authHeader from '../helpers/auth-header';
const BASE_URL = "http://fundoonotes.incubation.bridgelabz.com/api";

export function adminLogin(data) {
    return axios.post(BASE_URL + '/user/adminLogin', data)
}
export function getAdminUsersList() {
    return axios.get(BASE_URL + '/user/getAdminUserList', {
    headers: {
        Authorization: localStorage.getItem('token')
    }
    }).then(res=>{
        console.log("response in get users list",res);
        return res;
    })
}
export function userService() {
    return axios.get(BASE_URL + '/user/service', {
    headers: {
        Authorization: localStorage.getItem('token')
    }
    }).then(res=>{
        console.log("response in get user services list",res);
        return res;
    })
}

export function getAllUnApprovedList() {

    return axios.get(BASE_URL + '/questionAndAnswerNotes/getUnApprovedAnswer', {
    headers: {
        Authorization: localStorage.getItem('token')
    }
    }).then(res=>{
        console.log("response in get user services list",res.data.data);
        return res.data.data;
    })
}

export function getUsersCartList() {
    return axios.get(BASE_URL + '/productcarts/userCartList', {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    }).then(res => {
        console.log("response in get user cart list", res.data.data);
        return res.data.data;
    })
}