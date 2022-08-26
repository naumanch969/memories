import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5000' })

API.interceptors.request.use((req) => {     // new to me  // for auth middleware. We are giving an token in headers
    if (localStorage.getItem("profile")) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`
    }
    return req
})

// backend CRUD functions ( of controllers ) called 
export const fetchPost = (id) => { return API.get(`/posts/${id}`) }
export const fetchPosts = (page) => { return API.get(`/posts?page=${page}`) }
export const createPost = (newPost) => { return API.post(`/posts`, newPost) }   // newPost is req.body
export const likePost = (id) => { return API.patch(`/posts/${id}/likePost`) }
export const comment = (value, id) => { return API.post(`/posts/${id}/commentPost`, { value }) }   //value is req.body
export const fetchPostsBySearch = (searchQuery) => { return API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`) }
export const updatePost = (id, updatedPost) => { return API.patch(`/posts/${id}`, updatedPost) }  // updatePost is req.body
export const deletePost = (id) => { return API.delete(`/posts/${id}`) }

export const signUp = (userData) => { return API.post("/user/signUp", userData) }   // formData is req.body
export const signIn = (userData) => { return API.post("/user/signIn", userData) }  // formData is req.body