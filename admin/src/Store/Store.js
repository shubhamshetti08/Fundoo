 
// import {createStore, applyMiddleware} from 'redux';
// import reducer from "../reducer";
// import logger from 'redux-logger';



// const store =createStore(reducer,applyMiddleware(logger));

// export default store;
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../Reducers/Reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const loggerMiddleware = createLogger();
 const Store = createStore(
    rootReducer,composeWithDevTools(
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    ))
);
export default Store;


// import { createStore, applyMiddleware } from 'redux';
// import thunkMiddleware from 'redux-thunk'
// import { createLogger } from 'redux-logger';
// import rootReducer from '../reducers/reducers'
// const store = createStore(
//     rootReducer,
//      applyMiddleware(createLogger(),thunkMiddleware)
// )
// export default store; 