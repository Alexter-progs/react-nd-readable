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
                console.log(posts);
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
        }).then(post => {
            console.log(post);
            dispatch({
                type: ADD_POST,
                post: {
                    ...post
                }
            })
        })
    }
}

export function editPost({ title, body }) {
    return {
        type: EDIT_POST,
        title,
        body
    }
}

export function removePost(id) {
    return {
        type: REMOVE_POST,
        id
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