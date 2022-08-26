import mongoose from "mongoose"

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creater: String,
    tags: [String],
    selectedFile: String,
    likes: {
        type: [String],
        default: []
    },
    comments: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const PostMessage = new mongoose.model("PostMessage", postSchema)
export default PostMessage
