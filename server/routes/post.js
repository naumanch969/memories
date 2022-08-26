import express from "express"
const router = express.Router()
import { getPost, getPosts, createPost, updatePost, deletePost, likePost, getPostsBySearch, commentPost } from "../controllers/posts.js"
import { auth } from "../middleware/auth.js"

// here "/" = localhost:5000/posts/
router.get("/", getPosts)
router.post("/", auth, createPost)
router.get('/search', getPostsBySearch)
router.get("/:id", getPost)                 // routes with id needs to come after other routes
router.patch(`/:id`, auth, updatePost)
router.delete(`/:id`, auth, deletePost)
router.patch("/:id/likePost", auth, likePost)
router.post("/:id/commentPost", auth, commentPost)
export default router
