// for any CRUD function
// first call that function from backend (api folder)
// dispatch the id and payload

import * as api from "../api/index"
import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, FETCH_BY_SEARCH, START_LOADING, END_LOADING, FETCH_POST, COMMENT } from "../constants/actionTypes"     // new to me

export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })

        const { data } = await api.fetchPost(id);
        dispatch({ type: FETCH_POST, payload: data })

        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log("error in getpost - action ", error)
    }
}


export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })

        const { data } = await api.fetchPosts(page);           // {data: Array(8), currentPage: 1, numberOfPages: 4, totalDocs: 30}
        dispatch({ type: FETCH_ALL, payload: data })

        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log("error in api/getposts - ", error)
    }
}

// this createPost is different from createPost() in following line. It is called at frontend wile next createPost is called in backend level.
export const createPost = (newPost, navigate) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })

        const { data } = await api.createPost(newPost);       // {title: '', message: '', name: 'ali alina', creater: '62e7931bddab1eab38e93b49', tags: Array(1), …}
        dispatch({ type: CREATE, payload: data })
        // navigate(`/posts/${data._id}`)
        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log("error in api/createPosts", error)
    }
}

// simillar to above createPost comment
export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post)       // post stands  for req.body 
        dispatch({ type: UPDATE, payload: data })
    } catch (error) {
        console.log("error in  updating post in actions", error)
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id)
        dispatch({ type: DELETE, payload: id })
    } catch (error) {
        console.log("error in deleting post ", error)
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id)
        dispatch({ type: LIKE, payload: data })
    } catch (error) {
        console.log("error in liking post frontend ", error)
    }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })

        const { data: { data } } = await api.fetchPostsBySearch(searchQuery)    // searched posts
        dispatch({ type: FETCH_BY_SEARCH, payload: data })

        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log("error in searching posts - actions/posts ", error)
    }
}

export const commentPost = (value, id) => async (dispatch) => {
    try {
        const { data } = await api.comment(value, id)               //{_id: '62ee11394f027695fde94c3a', title: 'madrid', message: 'this is madrid', name: 'ahmad ali', creater: '62ed37cbce636ed17893379e', …}
        console.log("data of comments ", data)
        dispatch({ type: COMMENT, payload: data })
        return data.comments;                                       // to get immediate comments
    } catch (error) {
        console.log("error in comment actions ", error)
    }
}