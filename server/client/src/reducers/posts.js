// since here state means is post that is why i'm using state instead of state 
import { FETCH_POST, FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, FETCH_BY_SEARCH, START_LOADING, END_LOADING, COMMENT } from "../constants/actionTypes"

export default (state = { isLoading: true, posts: [] }, action) => {
    switch (action.type) {
        case FETCH_POST:
            return { ...state, post: action.payload }   // we added an exrea attribute of post in it.
        case FETCH_ALL:     //action.payload -->   {data: Array(8), currentPage: 1, numberOfPages: 4, totalDocs: 30}
            return {        // we always have to spread state whenever we deals with object (particulary in actions of redux)
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages
            }
        case CREATE:
            return { ...state, posts: [...state.posts, action.payload] }
        case UPDATE:
            return { ...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post) }     //action.payload is updated post
        case DELETE:
            return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) }    //action.payload is the id of post to be deleted
        case LIKE:
            return { ...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post) }
        case COMMENT:
            return { ...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post) }  // change the post that just receive  a comment and return the rest posts normally
        case FETCH_BY_SEARCH:
            return { ...state, posts: action.payload }
        case START_LOADING:
            return { ...state, isLoading: true }
        case END_LOADING:
            return { ...state, isLoading: false }
        default:
            return state;
    }
}
