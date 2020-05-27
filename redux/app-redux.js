import {createStore , applyMiddleware} from 'redux'; 
import { combineReducers , compose } from 'redux';
import thunkMiddleware from 'redux-thunk'; 
import * as firebase from 'firebase'; 
import { FirebaseReducer, ReactReduxFirebaseProvider,} from 'react-redux-firebase'; 
import FBconfig from '../APIKEYS/Firebase/firebase'; 
const fbConfig = FBconfig; 
firebase.initializeApp(fbConfig); 



/// init 

const initialState = {
    isLoggedIn: false, 
    currentUser: '', 
}
const rrfConfig = {
    userProfile: 'users'
    // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
    // enableClaims: true // Get custom claims along with the profile
  }

// reducers
const rootReducer = combineReducers({
    firebase:FirebaseReducer
})
const reducer = ( state = initialState, action ) => // takes actions and set the states acordingly 
{
    switch(action.type)
    {
        case 'intiFirebase' : 
        case 'doLogout': return {...state, isLoggedIn: action.logOutValue, currentUser : action.userNameValue };

        case 'SetLogIn' : return {... state, isLoggedIn : action.isLogedIN, currentUser : action.userNameValue};

        default: return state;
    }
}; 

// store 
const store = createStore(reducer,  applyMiddleware(thunkMiddleware), rootReducer);
export {store }; 

const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch
    // createFirestoreInstance // <- needed if using firestore
  }


//action creators 

const  doLogOut = () => 
{
    return{
        
        type:"doLogout",
        logOutValue: false, 
        userNameValue: ''
}; 
}

export {doLogOut}; 


const  SetLogIn = (isLogedIN, userName) => 
{
    return{
        
        type:"setLogIn",
        logOutValue: isLogedIN, 
        userNameValue: userName
}; 
}

export {SetLogIn}; 