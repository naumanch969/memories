import React, { useEffect } from 'react'
import { Typography, CircularProgress, Paper, Divider, Box, Grid } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import Post from "../Posts/Post/Post"
import moment from "moment"
import { useParams, useNavigate } from "react-router-dom"
import * as styled from "./styles"
import { getPost, getPostsBySearch } from "../../actions/posts"
import CommentSection from "./CommentSection"

const PostDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { id } = useParams();
    const { post, posts, isLoading } = useSelector(state => state.posts)    // { post,isLoading: true, posts: [] }
    const recommendedPosts = posts.filter(({ _id }) => _id !== post?._id)   // filter all posts except the current one.

    useEffect(() => {
        dispatch(getPost(id))
    }, [dispatch, id])

    useEffect(() => {
        post && dispatch(getPostsBySearch({ search: "none", tags: post?.tags?.join(",") }))
    }, [dispatch, post])


    const Capitalize = (str) => {
        return str && str.charAt(0).toUpperCase() + str.slice(1);
    }

    if (!post) return null;    // when some errors like 'something is undefined' then add checks like if(!post) then do something
    if (isLoading) {
        return <Paper sx={styled.loadingPaper} elevation={6} >  <CircularProgress size="7em" /> </Paper>
    }

    return (
        <>
            <styled.card elevation={6}>
                <styled.section>
                    <Typography variant="h3" component="h2">{Capitalize(post.title)}</Typography>
                    <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map(post => `#${post} `)}</Typography>
                    <Typography variant="body1" >
                        <strong>Created by :</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ textTransform: "capitalize" }} >{post.name}</span>
                    </Typography>
                    <Typography variant="body1">
                        <strong>Created At :</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{Capitalize(moment(post.createdAt).fromNow())}
                    </Typography>
                    <Typography variant="body1" gutterBottom component="p">
                        <strong>Message :  </strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{Capitalize(post.message)}
                    </Typography>

                    <Divider sx={{ margin: '20px 0' }} />

                    <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>

                    <Divider sx={{ margin: '20px 0' }} />

                    <CommentSection post={post} />
                    <Divider sx={{ margin: '20px 0' }} />
                </styled.section>
                <styled.imageSection >
                    <img style={styled.img} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
                </styled.imageSection>
            </styled.card>

            {/* recommended posts section */}
            {
                <Box sx={styled.recommendedPostsSection}>
                    <Paper sx={{
                        marginBottom: '20px',
                        padding: '8px 20px',
                        borderRadius: '15px',
                    }} elevation={6} >   {/* maxWidth="xl" */}
                        <h3 style={{ fontSize: "24px", fontFamily: 'cursive', margin: 0 }}>You Might Also Like</h3>
                    </Paper>
                    <Divider />
                    <styled.recommendedPosts container spacing={3} >
                        {
                            recommendedPosts.map((post) => (   //slice(0).reverse().
                                <Grid key={post._id} xs={12} sm={6} lg={2.4} item>
                                    <Post post={post} />
                                </Grid>
                            ))
                        }
                    </styled.recommendedPosts>
                </Box>
            }

        </>
    )
}

export default PostDetails
                                //  < Box style = {{ margin: "20px", cursor: "pointer" }} onClick = {() => { openPost(_id) }} key = { _id } >
                                //     <Typography gutterBottom variant="h6" >{title}</Typography>
                                //     <Typography gutterBottom variant="subtitle2" >{name}</Typography>
                                //     <Typography gutterBottom variant="subtitle2" >{message}</Typography>
                                //     <Typography gutterBottom variant="subtitle1" >Likes: {likes.length}</Typography>
                                //     <img src={selectedFile} width="200px" alt={title} />
                                //  </ >