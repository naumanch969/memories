import express from "express"
const router = express.Router()
import { signUp, signIn } from "../controllers/user.js"

// here "/" = "localahost:5000/user/"
router.post("/signUp", signUp)
router.post("/signIn", signIn)

export default router

