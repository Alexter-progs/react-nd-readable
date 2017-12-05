import {
    ADD_COMMENT,
    EDIT_COMMENT,
    REMOVE_COMMENT,
    FETCH_COMMENTS,
    UPVOTE_COMMENT,
    DOWNVOTE_COMMENT
} from '../actions/comments'

export function comments(state = {}, action) {
    switch(action.type) {
        case FETCH_COMMENTS:
            return {
                ...state,
                ...action.comments
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
        case UPVOTE_COMMENT: 
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    voteScore: state[action.id].voteScore + 1
                }
            }
        case DOWNVOTE_COMMENT: 
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    voteScore: state[action.id].voteScore - 1
                }
            }
        default: 
            return {
                ...state
            }
    }
}