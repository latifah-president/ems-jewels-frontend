import usersReducer from "./usersReducer";
import productReducer from "./producsReducer";
import adminReducer from "./adminReducer";

import {combineReducers} from "redux";

export default combineReducers({
    user: usersReducer,
    product:  productReducer,
    admin: adminReducer,
}); 
