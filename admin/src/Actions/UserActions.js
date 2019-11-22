import { LOGIN_SUCCESS,LOGIN_FAILURE,GET_QA_DATA_FAILURE,GET_QA_DATA_SUCCESS} from '../Constants/UserConstants'
import { adminLogin, getAllUnApprovedList } from '../Services/AdminServices';
const userActions = {
    login,
    getUnApprovedData
}
export default userActions

function login(data) {
    console.log("log",data);
    return function(dispatch){
        // dispatch(request(data));
        console.log("date inside lotgin action",data);
        
        adminLogin(data)
        .then(data => {
            console.log("rsponse after admin login",data); 
            // localStorage.setItem('token',data.data.id)         
            dispatch(success(data));
            // this.props.history.push('/dashboard')
            // window.location.href="/dashboard"
        }).catch(err => {
            dispatch(failure(err.toString()))
        })
    }
    // function request(data) { return { type:LOGIN_REQUEST, data } }

    function success(data) {
        return {
            type: LOGIN_SUCCESS,
            data
        }
    }
    function failure(err) {
        return {
            type: LOGIN_FAILURE,
            err
        }
    }
}
function getUnApprovedData() {
    return (dispatch) => {
        getAllUnApprovedList().then(data => {
            console.log("res in get unapproved list", data);

            dispatch(success(data));
        }).catch(err => {
            console.log("error in get unapproved list", err);
            dispatch(failure(err));
        })
    }
    function success(data) {
        return { type: GET_QA_DATA_SUCCESS, payload: data }
    }
    function failure(err) {
        return { type: GET_QA_DATA_FAILURE, payload: err }
    }
}
