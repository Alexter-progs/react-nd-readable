import { 
    ADD_POST,
    EDIT_POST,
    REMOVE_POST,
    UPVOTE_POST,
    DOWNVOTE_POST,
} from '../actions/posts'

export function posts(state = {}, action) {
    switch(action.type) {
        case ADD_POST:
            return {
                ...state
            }
        case EDIT_POST:
            return {
                ...state
            }
        case REMOVE_POST: 
            return {
                ...state
            }
        case UPVOTE_POST:
            return {
                ...state
            }
        case DOWNVOTE_POST:
            return {
                ...state
            }
        default: 
            return {
                ...state
            }
    }
}
