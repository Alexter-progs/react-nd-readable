export const EDIT_POST = 'EDIT_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const ADD_COMMENT = 'ADD_COMMENT'
export const DELETE_COMMNET = 'DELETE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const UPVOTE_POST = 'UPVOTE_POST'
export const DOWNVOTE_POST = 'DOWNVOTE_POST'
export const ADD_POST = 'ADD_POST'

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

export function deleteComment(id) {
    return {
        type: DELETE_COMMNET,
        id
    }
}

export function editComment({ timestamp, body }) {
    return {
        type: EDIT_COMMENT,
        timestamp,
        body
    }
}

export function upvotePost() {
    return {
        type: UPVOTE_POST
    }
}

export function downvotePost() {
    return {
        type: DOWNVOTE_POST
    }
}

export function addPost({ id, timestamp, title, body, owner, category }) {
    return {
        type: ADD_POST,
        timestamp,
        title,
        body,
        owner,
        category
    }
}
