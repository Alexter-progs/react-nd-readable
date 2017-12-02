export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const REMOVE_COMMENT = 'DELETE_COMMENT'

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