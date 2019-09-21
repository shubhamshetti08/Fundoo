import axios from 'axios';
const baseURL="http://fundoonotes.incubation.bridgelabz.com/api"
export function userRegister(regDetails){
    return axios.post(baseURL+'/user/userSignUp',regDetails)
}
export function userLogin(loginDetails){
    return axios.post(baseURL+'/user/login',loginDetails)
}
export function addNotes(data) {
    return axios.post(baseURL + "/notes/addNotes", data,
        {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
}
export function getAllNotes(){
    return axios.get(baseURL+"/notes/getNotesList",
    {
        headers: {
            Authorization: localStorage.getItem("token")
        }
    })
}
export  function colorChange(data) {
    return axios.post(baseURL + '/notes/changesColorNotes',data,{
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })   
}
export function updateNotes(data){
    return axios.post(baseURL+'/notes/updateNotes',data,{
        headers:{
            Authorization:localStorage.getItem('token')

        }
    })
}