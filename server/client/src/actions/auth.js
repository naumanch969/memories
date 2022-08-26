import * as api from "../api/index"
import { AUTH } from "../constants/actionTypes"

export const signUp = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData)     // we are getting this type of data  {result: {…}, token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6I…gzOX0.9qxymCWxhYzt_gjbCJcnPiCeuGYFHcn3_hHTbwX-5LI'}
        dispatch({ type: AUTH, payload: data })           // formData   contains token and profileObj (result)
        navigate("/")
    } catch (error) {
        console.log("error in sign up - auth.js actions", error)
    }
}

export const signIn = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData)
        dispatch({ type: AUTH, payload: data })           // formData   contains token and profileObj (result)
        navigate("/")
    } catch (error) {
        console.log("error in sign in - auth.js actions", error)
    }
}