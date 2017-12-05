import {
    ADD_COMMENT,
    EDIT_COMMENT,
    REMOVE_COMMENT,
    FETCH_COMMENTS_FOR_POST
} from '../actions/comments'

export function comments(state = {}, action) {
    switch(action.type) {
        case FETCH_COMMENTS_FOR_POST:
            return {
                ...state,
                [action.postId]: {
                    ...state[action.postId],
                    ...action.comments
                }
            }
        case ADD_COMMENT:
            return {
                ...state
            }
        case EDIT_COMMENT:
            return {
                ...state
        }
        case REMOVE_COMMENT: 
            return {
                ...state
            }
        default: 
            return {
                ...state
            }
    }
}