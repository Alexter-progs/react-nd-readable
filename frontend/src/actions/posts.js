import { guid } from '../utils'
import axios from 'axios'

export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const UPVOTE_POST = 'UPVOTE_POST'
export const DOWNVOTE_POST = 'DOWNVOTE_POST'
export const FETCH_POSTS = 'FETCH_POSTS'


export function fetchPosts() {
    return (dispatch) => {
        const url = `${process.env.REACT_APP_BACKEND}/posts`;
        axios.get(url)
            .then(({data}) => {
                let posts = data;
                posts = posts.reduce((obj, post) => {
                    obj[post.id] = post
                    return obj
                }, {})

                dispatch({
                    type: FETCH_POSTS,
                    posts
                })
            })
    }
}

export function addPost(post) {
    return dispatch => {
        const url = `${process.env.REACT_APP_BACKEND}/posts`
        const id = guid()
        const timestamp = Date.now()
        axios.post(url, {
            id,
            timestamp,
            ...post
        }).then(({data}) => {
            let post = data
            dispatch({
                type: ADD_POST,
                post: {
                    ...post
                }
            })
        })
    }
}

export function editPost(id, body, title) {
    return dispatch => {
        const url = `${process.env.REACT_APP_BACKEND}/posts/${id}`
        axios.put(url, {
            body,
            title
        }).then(({data}) => {
            const post = data
            dispatch({
                type: EDIT_POST,
                post: {
                    ...post
                }
            })
        })
        
    }
}

export function removePost(id) {
    return (dispatch) => {
        const url = `${process.env.REACT_APP_BACKEND}/posts/${id}`
        axios.delete(url).then(() => {
            dispatch({
                type: REMOVE_POST,
                id
            })
        })
    }
}

export function upvotePost(id) {
    return (dispatch) => {
        const url = `${process.env.REACT_APP_BACKEND}/posts/${id}`
        axios.post(url, {
            option: 'upVote'
        }).then(() => {
            dispatch({
                type: UPVOTE_POST,
                id
            })
        })
    }
}

export function downvotePost(id) {
    return (dispatch) => {
        const url = `${process.env.REACT_APP_BACKEND}/posts/${id}`
        axios.post(url, {
            option: 'downVote'
        }).then(() => {
            dispatch({
                type: DOWNVOTE_POST,
                id
            })
        })
        
    }
}