import posts from "./posts";
import authReducers from "./auth";

// here posts is the state of reducers ---- as describe in any reducer function
import { combineReducers } from "redux";

export default combineReducers({
    posts:posts,
    authReducers:authReducers
})

// there may be multiple reducers
