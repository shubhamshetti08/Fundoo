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
export function archive(data){
    return axios.post(baseURL+'/notes/archiveNotes',data,{
        headers:{
            Authorization:localStorage.getItem('token')

        }
    })
}
export function trash(data){
    console.log('service trash',data)
    return axios.post(baseURL+'/notes/trashNotes',data,{
        headers:{
            Authorization:localStorage.getItem('token')

        }
    })
}
// export function label(data){
//     console.log('service label',data)

//     return axios.post(baseURL+'/noteLabels',data,{
//         headers:{
//             Authorization:localStorage.getItem('token')

//         }
//     })
// }
export function createlabel(id,data){
    console.log('service label',id)
    return axios.post(baseURL+`/notes/${id}/noteLabels`,data,{
        headers:{
            Authorization:localStorage.getItem('token')

        }
    })
}
export function getLabels(){
    return axios.get(baseURL+'/noteLabels/getNoteLabelList',{
        headers:{
            Authorization:localStorage.getItem('token')

        }
    })
}
// export function createNoteLabels(){
//     return axios.get(baseURL+'/notes/{id}/noteLabels',{
//         headers:{
//             Authorization:localStorage.getItem('token')

//         }
//     })
// }
export function noteLabels(data){
    const noteId=data.noteId;
    const labelId=data.labelId;
    return axios.post(baseURL+`/notes/${noteId}/addLabelToNotes/${labelId}/add`,data,{
        headers:{
            Authorization:localStorage.getItem('token')

        }
    })
}
export function deleteLabels(data,noteId,labelId){
    return axios.post(baseURL+`/notes/${noteId}/addLabelToNotes/${labelId}/remove`,data,{
        headers:{
            Authorization:localStorage.getItem('token')

        }
    })
}