import Post from "./Post/Post"
import { useSelector } from 'react-redux';
import { Grid, CircularProgress, Typography, Paper } from "@mui/material"
import * as styled from "./styles"

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector(state => state.posts) //we have set store in index.js and we can access any reducer function (stored in store) by this syntax (using useSelector)

  if (!posts.length && !isLoading) {
    return <>
      <Typography variant="h4" align="center" > No Post To Show </Typography>
    </>
  }

  return (
    isLoading ? <Paper sx={styled.loadingPaper} elevation={6} >  <CircularProgress size="7em" /> </Paper> :
      <>
        <Grid className="classes.container" container alignItems="stretch" spacing={3}>
          {
            posts.map((post) => (   //slice(0).reverse().
              <Grid sx={{ paddingBottom: "24px" }} key={post._id} xs={12} sm={6} lg={3} item>
                <Post post={post} setCurrentId={setCurrentId} />
              </Grid>
            ))
          }
        </Grid>
      </>
  )
}

export default Posts
