import {
    ADD_COMMENT,
    EDIT_COMMENT,
    REMOVE_COMMENT
} from '../actions/comments'

export function comments(state = {}, action) {
    switch(action.type) {
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