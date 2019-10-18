import axios from 'axios';
const baseURL =process.env.REACT_APP_BASE_URL;
export function userRegister(regDetails) {
    console.log("reg"+baseURL);
    
    return axios.post(baseURL + '/user/userSignUp', regDetails)
}   
export function userLogin(loginDetails) {
    console.log("reg  "+baseURL);

    return axios.post(baseURL + '/user/login', loginDetails)
}
export function addNotes(data) {
    return axios.post(baseURL + "/notes/addNotes", data,
        {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
}
export function getAllNotes() {
    return axios.get(baseURL + "/notes/getNotesList",
        {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
}
export function colorChange(data) {
    return axios.post(baseURL + '/notes/changesColorNotes', data, {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })
}
export function updateNotes(data) {
    return axios.post(baseURL + '/notes/updateNotes', data, {
        headers: {
            Authorization: localStorage.getItem('token')

        }
    })
}
export function archive(data) {
    return axios.post(baseURL + '/notes/archiveNotes', data, {
        headers: {
            Authorization: localStorage.getItem('token')

        }
    })
}
export function trash(data) {
    console.log('service trash', data)
    return axios.post(baseURL + '/notes/trashNotes', data, {
        headers: {
            Authorization: localStorage.getItem('token')

        }
    })
}
export function label(data){
    console.log('service label',data)

    return axios.post(baseURL+'/noteLabels',data,{
        headers:{
            Authorization:localStorage.getItem('token')

        }
    })
}
export function createlabel(id, data) {
    console.log('service label', id)
    return axios.post(baseURL + `/notes/${id}/noteLabels`, data, {
        headers: {
            Authorization: localStorage.getItem('token')

        }
    })
}
export function getLabels() {
    return axios.get(baseURL + '/noteLabels/getNoteLabelList', {
        headers: {
            Authorization: localStorage.getItem('token')

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
export function noteLabels(data) {
    const noteId = data.noteId;
    const labelId = data.labelId;
    return axios.post(baseURL + `/notes/${noteId}/addLabelToNotes/${labelId}/add`, data, {
        headers: {
            Authorization: localStorage.getItem('token')

        }
    })
}
exports.deleteLabels=(data, noteId, labelId)=>{
    return axios.post(baseURL + `/notes/${noteId}/addLabelToNotes/${labelId}/remove`, data, {
        headers: {
            Authorization: localStorage.getItem('token')

        }
    })
}
exports.deleteReminder=(data)=>{
    return axios.post(baseURL + `/notes/removeReminderNotes`, data, {
        headers: {
            Authorization: localStorage.getItem('token')

        }
    })
}
exports.profileUpload=async (upload)=> {
        console.log("upload image in services");
    
    return await axios.post(baseURL + '/user/uploadProfileImage', upload, {
        headers: {
            'Content-Type':'multipart/form-data',
            Authorization: localStorage.getItem('token')

        }
    })
    // .then(res=>{
    //     console.log("response"+res)
        
    // })
}
exports.addReminder=(data)=>{
    console.log('service addReminder', data)
    return axios.post(baseURL + '/notes/addUpdateReminderNotes', data, {
        headers: {
            Authorization: localStorage.getItem('token')

        }
    })
}
exports.getReminder=()=>{
    return axios.get(baseURL + '/notes/getReminderNotesList',  {
        headers: {
            Authorization: localStorage.getItem('token')

        }
    })
}
exports.getTrash=()=>{
    return axios.get(baseURL + '/notes/getTrashNotesList',  {
        headers: {
            Authorization: localStorage.getItem('token')

        }
    })
}
exports.getArchive=()=>{
    return axios.get(baseURL + '/notes/getArchiveNotesList',  {
        headers: {
            Authorization: localStorage.getItem('token')

        }
    })
}
exports.deleteForever=(data)=>{
    console.log('service deleteForever', data)
    return axios.post(baseURL + '/notes/deleteForeverNotes',data,  {
        headers: {
            Authorization: localStorage.getItem('token')

        }
    })
}
exports.deleteNoteLabel=(data)=>{
    console.log('service deleteNoteLabel', data)
    const id=data.labelId;
    return axios.delete(baseURL +`/noteLabels/${id}/deleteNoteLabel`,  {
        headers: {
            Authorization: localStorage.getItem('token')

        }
    })
}
export function editNoteLabel(data) {
    const labelId = data.labelId;
    var data1 = {
        "label": data.label
    }
    return axios.post(baseURL + `/noteLabels/${labelId}/updateNoteLabel`, data1, {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })
}
export function removeCollabNotes(data) {
    const id = data.id;
    const  collaboratorUserId=data.collaboratorUserId;
    return axios.delete(baseURL + `/notes/${id}/removeCollaboratorsNotes/${collaboratorUserId}`, {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })
}

export function addCollaboratorNotes(data, id) {
    console.log("data1/n id", data, id);
    return axios.post(baseURL + `/notes/${id}/AddcollaboratorsNotes`, data, {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })
}
export function searchUserList(data) {
    return axios.post(baseURL + '/user/searchUserList', data, {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })
}

export function getUserEmails() {
    return axios.get(baseURL + '/user', {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })
}
export function questionAndAnswer(data) {
    return axios.post(baseURL + '/questionAndAnswerNotes/addQuestionAndAnswer', data, {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })
}

export function getQuesAns(id) {
    return axios.get(baseURL + `/notes/${id}/questionAndAnswerNotes`, {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })
}

export function postLike(data) {
    const like=data.like
    var data1 = {
        "like":like
    }
    return axios.post(baseURL + `/questionAndAnswerNotes/like/${data.id}`,data1, {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })
}
export function postRate(data,parentId) {
   
    
    return axios.post(baseURL + `/questionAndAnswerNotes/rate/${parentId}`,data, {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })
}

export function questionAndAnswerReply(data) {
    var data1 = {
        'message': data.message
    }
    return axios.post(baseURL + `/questionAndAnswerNotes/reply/${data.id}`, data1, {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })
}