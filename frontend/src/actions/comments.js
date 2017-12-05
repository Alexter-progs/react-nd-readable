export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const REMOVE_COMMENT = 'DELETE_COMMENT'
export const UPVOTE_COMMENT = 'UPVOTE_COMMENT'
export const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT'
export const FETCH_COMMENTS_FOR_POST = 'FETCH_COMMENTS_FOR_POST'

export function fetchComments(postId) {
    return (dispatch) => {
        const url = `${process.env.REACT_APP_BACKEND}/posts/${postId}/comments`;
        fetch(url)
            .then(res => res.json())
            .then((comments) => {
                dispatch({
                    type: FETCH_COMMENTS_FOR_POST,
                    postId,
                    comments
                })
            })
    }
}

export function addComment({ id, timestamp, body, owner, postId }) {
    return {
        type: ADD_COMMENT,
        id,
        timestamp,
        body,
        owner,
        postId
    }
}

export function editComment({ timestamp, body }) {
    return {
        type: EDIT_COMMENT,
        timestamp,
        body
    }
}

export function deleteComment(id) {
    return {
        type: REMOVE_COMMENT,
        id
    }
}

export function upvoteComment(id) {
    return {
        type: UPVOTE_COMMENT,
        id
    }
}

export function downvoteComment(id) {
    return {
        type: DOWNVOTE_COMMENT,
        id
    }
}