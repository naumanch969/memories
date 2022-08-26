import { useState, useRef } from "react"
import "./style.css"
import { Typography, TextField, Button } from "@mui/material"
import { useDispatch } from "react-redux"
import * as styled from "./styles"
import { commentPost } from "../../actions/posts"

const CommentSection = ({ post }) => {
    const dispatch = useDispatch();
    const commentsRef = useRef();
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState(post.comments)
    const user = JSON.parse(localStorage.getItem("profile"))

    const handleClick = async () => {
        const finalComment = `${user?.result?.name}: ${comment}`
        const newCommentsObj = await dispatch(commentPost(finalComment, post._id))
        console.log("newCommentsObj", newCommentsObj)
        console.log("newCommentsObj.comments", newCommentsObj.comments)
        setComments(newCommentsObj)
        setComment('')
        console.log('comments', comments)
        // commentsRef.current.scrollIntoView();
    }

    return (
        <styled.commentsOuterContainer className="commentsOuterContainer" >

            <styled.commentsInnerContainer   >
                <styled.commentHeading gutterbottom variant="h6" >Comments</styled.commentHeading>
                {comments && comments.slice(0).reverse().map((comment, index) => (
                    <Typography sx={styled.listOfComments} key={index} variant="subtitle1" >
                        {comment &&
                            <>
                                <styled.purple alt={user?.result.name} src={user?.result.imageUrl} >{user?.result.name.charAt(0)}</styled.purple>
                                <span sx={{ display: 'flex', gap: '20px', alignItems: 'center' }} >
                                    <strong style={{ textTransform: "capitalize" }} > {comment.split(":")[0]} </strong>
                                    <styled.commentText >{comment.split(":")[1]}</styled.commentText>
                                </span>
                            </>
                        }
                    </Typography>
                ))}
                <span ref={commentsRef} />
            </styled.commentsInnerContainer>

            {user && (
                <styled.commentBlock  >
                    <Typography gutterbottom variant="h5" sx={{ marginBottom: "4px" }}> Write a Comments</Typography>
                    <TextField multiline fullWidth rows={4} variant="outlined" label="Comment" value={comment} onChange={(e) => setComment(e.target.value)} />
                    <Button sx={{ marginTop: "1opx" }} fullWidth variant="contained" disabled={!comment} onClick={handleClick} >Comment</Button>
                </styled.commentBlock>
            )}

        </styled.commentsOuterContainer>
    )

}

export default CommentSection