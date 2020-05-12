import usersReducer from "./usersReducer";
import productReducer from "./producsReducer";
import {combineReducers} from "redux";

export default combineReducers({
    user: usersReducer,
    product:  productReducer,
}); 
