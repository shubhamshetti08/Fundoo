import { combineReducers } from 'redux';
import {loginReducers} from './LoginReducers';
import {dashboardReducers} from './dashboardReducers';
import paymentReducers from './paymentReducers'
import {questionAnswers} from './QuestionAnswersReducers'
const allReducers = combineReducers({
    loginReducers,
    dashboardReducers,
    paymentReducers,
    questionAnswers,
    
})
export default allReducers;