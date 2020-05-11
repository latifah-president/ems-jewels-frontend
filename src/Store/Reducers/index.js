import usersReducer from './usersReducer';
import {combineReducers} from 'redux';

export default combineReducers({
    user: usersReducer
}); 
