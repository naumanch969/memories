import React, { useState } from 'react'
import { Grid, Typography, Container } from "@mui/material"
import * as styled from "./styles"
import { LockOutlined } from '@mui/icons-material'
import Input from './Input'
import { GoogleLogin } from "@react-oauth/google"
import jwt_decode from "jwt-decode"
import { useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { signUp, signIn } from "../../actions/auth"

const Auth = () => { 

  const [showPassword, setShowPassword] = useState(false)
  const [isSignUpPage, setIsSignUpPage] = useState(false)
  const initialState = { firstName: "", lastName: "", email: "", password: "", confirmPassword: "" }
  const [formData, setFormData] = useState(initialState)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword)
    // setShowPassword(() => showPassword ? false : true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isSignUpPage) {
      dispatch(signUp(formData, navigate))
    } else {
      dispatch(signIn(formData, navigate))
    }
  }

  const googleSuccess = async (res) => {
    try {
      console.log(res)
      const token = await res?.credential;    // it will not return an error (cannot read profileObj property of undefined) if response is null
      const result = await jwt_decode(token);
      dispatch({ type: "AUTH", payload: { result, token } })
      navigate("/")
    } catch (error) {
      console.log("error in google success - Auth.js", error)
    }
  }

  const googleError = (error) => {
    console.log("error in google authentication ", error)
  }

  const switchMode = () => {
    setIsSignUpPage((prevIsSignUpPage) => !prevIsSignUpPage)
  }

  return (
    <Container component="main" maxWidth="xs" >
      <styled.paper elevation={3} >
        <styled.avatar > <LockOutlined /> </styled.avatar>
        <Typography variant="h5" > {isSignUpPage ? "Sign Up" : "Sign In"} </Typography>
        <styled.form onSubmit={handleSubmit}>

          <Grid container spacing={2} >
            {isSignUpPage && (
              <>
                <Input name='firstName' label="First Name" handleChange={handleChange} half />
                <Input name='lastName' label="Last Name" handleChange={handleChange} half />
              </>
            )}
            <Input name="email" label="Email" type="email" handleChange={handleChange} />
            <Input name="password" label="Password" type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} handleChange={handleChange} />
            {isSignUpPage && (
              <Input name="confirmPassword" label="Confirm Password" type="password" handleChange={handleChange} />
            )}
          </Grid>
          {/* submit button */}
          <styled.submit type="submit" fullWidth variant="contained" color='primary' > {isSignUpPage ? "Sign Up" : "Sing In"} </styled.submit>
          {/* google button */}
          <GoogleLogin onSuccess={googleSuccess} onError={googleError} />
          {/* switch between login/signin and signup */}
          <Grid container  >
            <Grid item >
              <styled.googleButton variant="outlined" fullWidth onClick={switchMode} color="primary" > {isSignUpPage ? "Already have an account? Sign In" : "Don't have an account? Sign Up"} </styled.googleButton>
            </Grid>
          </Grid>

        </styled.form>
      </styled.paper>
    </Container>
  )
}

export default Auth


// client id
// 852629080543-59fla6jkhjahqh6fdn3ijdu925d4li0k.apps.googleusercontent.com
// client secret
// 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
