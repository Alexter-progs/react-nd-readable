import axios from 'axios'

import { guid } from '../utils'

export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const REMOVE_COMMENT = 'DELETE_COMMENT'
export const UPVOTE_COMMENT = 'UPVOTE_COMMENT'
export const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT'
export const FETCH_COMMENTS = 'FETCH_COMMENTS'

export function fetchComments(postId) {
    return (dispatch) => {
        const url = `${process.env.REACT_APP_BACKEND}/posts/${postId}/comments`;
        axios.get(url)
            .then(({data}) => {
                let comments = data;
                comments = comments.reduce((obj, comment) => {
                    obj[comment.id] = comment
                    return obj
                }, {})

                dispatch({
                    type: FETCH_COMMENTS,
                    postId,
                    comments
                })
            })
    }
}

export function addComment(comment) {
    return (dispatch) => {
        const url = `${process.env.REACT_APP_BACKEND}/comments`
        let id = guid()
        let timestamp = Date.now()
        
        axios.post(url, {
            id,
            timestamp,
            ...comment
        }).then(({data}) => {
            let comment = data
            dispatch({
                type: ADD_COMMENT,
                comment: {
                    ...comment
                }
            })
        })
    }
}

export function editComment(id, body) {
    let timestamp = Date.now()
    return (dispatch => {
        const url = `${process.env.REACT_APP_BACKEND}/comments/${id}`
        axios.put(url, {
            body,
            timestamp
        }).then(({data}) => {
            const comment = data
            dispatch({
                type: EDIT_COMMENT,
                comment: {
                    ...comment
                }
            })
        })
    })
}

export function removeComment(id) {
    return (dispatch) => {
        const url = `${process.env.REACT_APP_BACKEND}/comments/${id}`
        axios.delete(url).then(() => {
            dispatch({
                type: REMOVE_COMMENT,
                id
            })
        })
    }
    

}

export function upvoteComment(id) {
    return (dispatch) => {
        const url = `${process.env.REACT_APP_BACKEND}/comments/${id}`
        axios.post(url, {
            option: 'upVote'
        }).then(() => {
            dispatch({
                type: UPVOTE_COMMENT,
                id
            })
        })
    }
}

export function downvoteComment(id) {
    return (dispatch) => {
        const url = `${process.env.REACT_APP_BACKEND}/comments/${id}`
        axios.post(url, {
            option: 'downVote'
        }).then(() => {
            dispatch({
                type: DOWNVOTE_COMMENT,
                id
            })
        })
    }
}