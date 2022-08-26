import React, { useState } from 'react'
import { useDispatch } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { Grid, Grow, Button, TextField, Paper } from "@mui/material"
import ChipInput from "material-ui-chip-input"
import { getPostsBySearch } from "../../actions/posts"
import * as styled from "./styles.js"
import Form from "../Form/Form.js"
import Posts from '../Posts/Posts.js'
import Pagination from "../Pagination"

function useQuery() {       // for pagination to find current url-location
  return new URLSearchParams(useLocation().search)
}

const Home = () => {
  const [currentId, setCurrentId] = useState(null)
  const [search, setSearch] = useState('')
  const [tags, setTags] = useState([])

  const query = useQuery()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const page = query.get("page") || 1;
  const searchQuery = query.get('searchQuery')

  // useEffect(() => {
  //   dispatch(getPosts())
  // }, [dispatch])


  const searchPost = () => {
    if (search.trim() || tags) {   //removing extra spaces
      dispatch(getPostsBySearch({ search, tags: tags.join(",") }))  // searched
      navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(",")}`)
    } else {
      navigate("/")
    }
  }


  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost()
    }
  }


  const handleAdd = (tag) => {
    setTags([...tags, tag])
  }

  const handleDelete = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete))
  }

  return (

    <Grow in>

      <styled.gridContainer container spacing={3}>
        <Grid item xs={12} sm={6} md={9} >
          <Posts currentId={currentId} setCurrentId={setCurrentId} />
        </Grid>

        <Grid item xs={12} sm={6} md={3} >
          {/* search */}
          <styled.searchForm elevation={6} position='static' color="inherit" >
            <TextField name="search" variant='outlined' label="Search Memories" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} onKeyPress={handleKeyPress} />
            <ChipInput style={{ margin: "10px 0" }} value={tags} label="Search Tags" variant="outlined" onDelete={handleDelete} onAdd={handleAdd} />
            <Button onClick={searchPost} color="primary" variant="contained" >Search Post</Button>
          </styled.searchForm>
          {/* form */}
          <Form currentId={currentId} setCurrentId={setCurrentId} />
          {/* pagination */}
          {(!searchQuery && !tags.length) && (
            <Paper sx={styled.pagination} elevation={6} >
              <Pagination page={page} />
            </Paper>
          )}
        </Grid>

      </styled.gridContainer>

    </Grow>
  )
}

export default Home
