import React, { useEffect, useState } from 'react'
import { TextField, Button, Typography, Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import FireBase from "react-file-base64"
import * as styled from './styles'
import { createPost, updatePost } from '../../actions/posts'   //every action/function to be performed must be imported from actions
import { useLocation, useNavigate } from 'react-router-dom'

const Form = ({ currentId, setCurrentId }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()        //dispatch is used to execute the function imported from actions
  const [postData, setPostData] = useState({ title: "", message: "", tags: "", selectedFile: "" })
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")))
  const post = useSelector(state => currentId ? state.posts.posts.find(p => p._id === currentId) : null) //finding the post to update by using currentId (prop)    // state refers to the whole reducers

  useEffect(() => {                       // in case of updating the post
    post && setPostData(post)             // it will execute whenever post is changed from null to post 
  }, [post])

  useEffect(() => {                       // so that we have not to refresh for logout , sign in  
    setUser(JSON.parse(localStorage.getItem("profile")))
  }, [location])

  const handlesubmit = (e) => {
    e.preventDefault()
    if (currentId) {                      //updation
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }))
    }
    else {                                // creation 
      navigate("/")
      dispatch(createPost({ ...postData, name: user?.result?.name }, navigate))
    }
    clear()
  }

  const clear = () => {
    setCurrentId(null)
    setPostData({ title: "", message: "", tags: "", selectedFile: null })
  }

  if (!user?.result?.name) {
    return (
      <styled.paper>
        <Typography variant='h6' align='center' >Please sign in to create your own memories and like other's memories. </Typography>
      </styled.paper>
    )
  }


  return (
    <styled.paper elevation={6} >
      <styled.form autoComplete='off' noValidate onSubmit={handlesubmit}>

        <Typography variant="h6">{currentId ? "Editing" : "Creating"} a Memory</Typography>
        <TextField sx={styled.textField} name="title" variant='outlined' label="Title" fullWidth value={postData.title} onChange={(e) => { setPostData({ ...postData, title: e.target.value }) }} />
        <TextField sx={styled.textField} name="message" variant='outlined' label="Message" fullWidth value={postData.message} onChange={(e) => { setPostData({ ...postData, message: e.target.value }) }} />
        <TextField sx={styled.textField} name="tags" variant='outlined' label="Tags" fullWidth value={postData.tags} onChange={(e) => { setPostData({ ...postData, tags: e.target.value.split(",") }) }} />
        <Box sx={styled.box}> <FireBase type='file' multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /> </Box>
        <Button sx={styled.submitButton} variant="contained" color="primary" size='large' type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size='small' onClick={clear} fullWidth>Clear</Button>

      </styled.form>
    </styled.paper>
  )
}

export default Form