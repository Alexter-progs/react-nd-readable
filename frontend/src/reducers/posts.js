import { 
    ADD_POST,
    EDIT_POST,
    REMOVE_POST,
    UPVOTE_POST,
    DOWNVOTE_POST,
    FETCH_POSTS,
} from '../actions/posts'

export function posts(state = {}, action) {
    switch(action.type) {
        case ADD_POST:
            return {
                ...state,
                [action.post.id]: {
                    ...state[action.post.id],
                    ...action.post
                }
            }
        case FETCH_POSTS:
            return {
                ...state,
                ...action.posts
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
