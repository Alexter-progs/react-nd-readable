import { 
    EDIT_POST,
    REMOVE_POST,
    ADD_COMMENT,
    DELETE_COMMNET,
    EDIT_COMMENT,
    UPVOTE_POST,
    DOWNVOTE_POST,
    ADD_POST 
} from '../actions'

function posts(state, action) {
    switch(action.type) {
        case EDIT_POST:
            return {
                ...state
            }
        case REMOVE_POST: 
            return {
                ...state
            }
        case ADD_COMMENT:
            return {
                ...state
            }
        case DELETE_COMMNET: 
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
        case ADD_POST:
            return {
                ...state
            }
    }
}