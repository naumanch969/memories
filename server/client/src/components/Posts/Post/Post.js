import { useEffect, useState } from "react"
import { } from "@mui/material"
import { CardContent, Button, Typography, CardMedia, Box, ButtonBase, CardActions } from "@mui/material"

import { ThumbUpAlt, Delete, MoreHoriz, ThumbUpAltOutlined } from "@mui/icons-material"
import { useLocation, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import moment from "moment"
import * as styled from "./styles"
import "./style.css"
import { deletePost, likePost } from "../../../actions/posts"

const Post = ({ post, setCurrentId }) => {

    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")))
    const [likes, setLikes] = useState(post?.likes)  // post is comming from posts.js as prop
    const userId = user?.result?._id || user?.result?.sub;
    const hasLikedPost = likes.find((id) => id === userId)

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("profile")))
    }, [location])

    const Capitalize = (str) => {
        return str && str.charAt(0).toUpperCase() + str.slice(1);
    }
    const openPost = () => {
        navigate(`/posts/${post._id}`)
    }
    const handleLikeClick = () => {         // jo kam backend pe kia h whi frontend pe again kia h is se speed me azafa hota h
        dispatch(likePost(post._id))
        if (hasLikedPost) {
            setLikes(likes.filter((id) => id !== userId))
        } else {
            setLikes([...likes, userId])
        }
    }
    const limitText = (str) => {
        if (str) {
            if (str.split("").length > 150) {
                const strArr = str.slice(0, 150).trim().split(" ")
                const string = strArr.slice(0, strArr.length - 1).join(" ")
                return <>{`${Capitalize(string)} ....`}</>
            }
            else {
                return Capitalize(str)
            }
        }
    }

    const Likes = () => {         // new to me
        if (likes.length > 0) {
            return hasLikedPost
                ? (<> <ThumbUpAlt fontSize="small" /> &nbsp; {likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} Like${likes.length > 1 ? 's' : ''}`}  </>)    // if user likes the post
                : (<> <ThumbUpAltOutlined fontSize="small" /> &nbsp; {likes.length} {likes.length > 1 ? "Likes" : "Like"} </>)      // if user does not like the post
        }
        return <> <ThumbUpAltOutlined fontSize="small" />&nbsp;'Like'</>
    }



    return (
        <styled.card raised elevation={6}>  {/* Card component*/}

            <ButtonBase sx={styled.buttonBase} onClick={openPost}>
                <CardMedia image={post.selectedFile} sx={styled.media} />          {/* image - CardMedia component*/}
                <Box style={styled.overlay} >                              {/* name,date - Box*/}
                    <Typography variant="h6" sx={{ textTransform: "capitalize" }}  >{Capitalize(post.name)}</Typography>
                    <Typography variant="body2" sx={{ opacity: .6 }} >{Capitalize(moment(post.createdAt).fromNow())}</Typography>
                </Box>
                {(user?.result?.sub === post?.creater || user?.result?._id === post?.creater) && (
                    <Box style={styled.overlay2} name="edit">           {/* updatePost button - Box*/}
                        <span onClick={(e) => { e.stopPropagation(); setCurrentId(post._id); }} style={{ color: 'white' }} size="small" > <MoreHoriz fontSize="default" /> </span>
                    </Box>
                )}
                <Box sx={styled.details}>        {/* card details - Box*/}
                    <Typography sx={{ padding: '4px 16px 0 16px', width: '100%', boxSizing: 'border-box', margin: 0, textAlign: 'initial', }} variant="body2" color="textSecondary"  >{post.tags.map((tag) => (`#${tag} `))}</Typography>
                </Box>
                <Box style={styled.title} >
                    <Typography variant="h5" component={'span'}  >{Capitalize(post.title)}</Typography>
                </Box>
                <CardContent sx={styled.cardContent}>
                    <Box style={styled.message} variant="body1" color="textSecondary"  >{limitText(post.message)}</Box>
                </CardContent>
            </ButtonBase>
            <CardActions sx={styled.cardActions}>        {/* like and delete button - CardActions component */}
                <Button size="small" color="primary" disabled={!user?.result} onClick={handleLikeClick} >
                    <Likes />
                </Button>
                {(user?.result?.sub === post?.creater || user?.result?._id === post?.creater) && (
                    <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>  <Delete size="small" />Delete </Button>
                )}
            </CardActions>
        </styled.card>
    )
}

export default Post