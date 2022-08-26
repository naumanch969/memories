import { AUTH, LOGOUT } from "../constants/actionTypes"

const authReducers = (user = { authData: null }, action) => {   // i have changed the state with user -- in this line

    switch (action.type) {
        case AUTH:
            localStorage.setItem("profile", JSON.stringify(action?.payload))  //action.payload - {result: {…}, token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6I…gzOX0.9qxymCWxhYzt_gjbCJcnPiCeuGYFHcn3_hHTbwX-5LI'}
            return { ...user, authData: action?.payload }
        case LOGOUT:
            localStorage.clear()
            return { ...user, authData: null }
        default:
            return user;
    }
}

export default authReducers