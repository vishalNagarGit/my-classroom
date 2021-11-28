 import { combineReducers } from "redux";
import signupReducer from "./signupReducer";
import socketReducer from "./socketReducer";


// composition of all the reducers

export default combineReducers({
    signup: signupReducer,
    socket: socketReducer
})