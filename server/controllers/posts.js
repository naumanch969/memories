import mongoose from "mongoose"
import postModel from "../models/postMessage.js"

export const getPost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await postModel.findById(id)
        res.status(200).json(post)
    } catch (error) {
        console.log("error in getting only post -controllers", error)
    }
}

export const getPosts = async (req, res) => {
    const { page } = req.query;
    try {
        const limit = 8;
        const startIndex = (Number(page) - 1) * limit;  // getting the starting index of every page
        const totalDocs = await postModel.countDocuments({})
        const posts = await postModel.find().sort({ _id: -1 }).limit(limit).skip(startIndex)//.sort({ _id: -1 })
        res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(totalDocs / limit), totalDocs })
    } catch (error) {
        console.log("error in getting posts-controllers", error)
    }
}


export const createPost = async (req, res) => {
    const post = req.body;   // newPost ---- "client/api/index.js-axios.post"
    try {
        const newPost = await postModel.create({ ...post, creater: req.userId, createdAt: new Date().toISOString() })
        await newPost.save()
        res.status(200).json(newPost)
    } catch (error) {
        console.log("error in creating posts-controllers", error)
    }
}

export const updatePost = async (req, res) => {
    const id = req.params.id;
    const post = req.body;   // updatePost ----- "client/api/index.js-axios.patch"
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: "no post with this id" })
        const updatedPost = await postModel.findByIdAndUpdate(id, post, { new: true })    // (id,updatedPost,{new:true})
        res.status(200).json(updatedPost)
    } catch (error) {
        console.log("error in updatng posts-controllers", error)
    }
}

export const deletePost = async (req, res) => {
    const id = req.params.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: "id does not match" })
        const deletedPost = await postModel.findByIdAndDelete(id)  // in this case i have not write the id as {id} -- it is true  -----  but in case i have to write in {} then it will be written as {_id:id}
        res.status(200).json({ message: "post deleted successfully", deletedPost: deletedPost })
    } catch (error) {
        console.log("error in deleting post-controllers ", error)
    }
}

export const likePost = async (req, res) => {
    const id = req.params.id;    // id of that specific post 
    if (!req.userId) return res.json({ message: "Unauthenticated" })            //req.userId (user id) comes from auth middleware. it refers whether the user has token or not 
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("no post with this id")
    try {
        const post = await postModel.findById(id)
        const index = await post?.likes.findIndex((id) => id === String(req.userId))  // findIndex loop through all the id's of user who liked the post

        if (index === -1) {
            post.likes.push(req.userId)
        } else {
            post.likes = post.likes.filter((id) => id !== String(req.userId))
        }

        const updatedPost = await postModel.findByIdAndUpdate(id, post, { new: true })
        res.status(200).json(updatedPost)
    } catch (error) {
        console.log("error in liking post - controller", error)
    }
}




export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;

    try {
        const title = new RegExp(searchQuery, "i")              // it becomes as /title/i   as seen in terminal
        // { title } --> searching documents (posts) by their title
        // { tags: {$in: tags.split(",")} } --> searching document (posts) by their tags   || is one of tags in the array of "tags" (req.query) is equal to any of tag of any document
        // tags: {$in: tags.split(",")}   --> it means any given (searched) tags is matched to the tags of any of the document
        // tags (of documents) --> is particularly a collection of tags of all the documents    (for my sense)
        // $in: tags.split(",") --> this 'tags' comes from req.query as an array
        // $in is usually used to match any element of array 
        const posts = await postModel.find({ $or: [{ title }, { tags: { $in: tags.split(",") } }] })    // array of searched posts in databs  // and tags.split(",") is an array of searched tags
        res.status(200).json({ data: posts })
    } catch (error) {
        res.status(404).json({ message: "error in searching posts in controllers ", error })
        console.log("error in getPostsbySearch controllers ", error)
    }
}

export const commentPost = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;
    try {
        const post = await postModel.findById(id)
        post.comments.push(value)
        const updatedPost = await postModel.findByIdAndUpdate(id, post, { new: true })
        res.status(200).json(updatedPost)
    } catch (error) {
        res.status(404).json({ message: "error in comment post controllers ", error })
    }
}