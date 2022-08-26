import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { Container } from "@mui/material"
import Navbar from './components/Navbar/Navbar.js'
import Home from './components/Home/Home.js'
import Auth from './components/Auth/Auth.js'
import PostDetails from './components/PostDetails/PostDetails.js'

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"))

  return (
    <GoogleOAuthProvider clientId='403911982205-39e2mt4fktk7c2htqtgvq3r2oqh8hjnq.apps.googleusercontent.com'>
      <Router>
        <Container maxWidth="xl">
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Navigate replace to="/posts" />} />
            <Route exact path='/posts' element={<Home />} />
            <Route exact path='/posts/search' element={<Home />} />
            <Route exact path="/auth" element={!user ? <Auth /> : <Navigate replace to="/posts" />} />
            <Route path='/posts/:id' element={<PostDetails />} />
          </Routes>
        </Container>
      </Router>
    </GoogleOAuthProvider>
  )
}

export default App