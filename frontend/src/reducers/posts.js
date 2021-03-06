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
                ...state,
                [action.post.id]: {
                    ...action.post
                }
            }
        case REMOVE_POST: 
            let newState = Object.keys(state)
            .filter((key) => key !== action.id)
            .reduce((obj, key) => {
                obj[key] = state[key]
                return obj
            }, {})
            return {
                ...newState
            }
        case UPVOTE_POST:
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    voteScore: state[action.id].voteScore + 1
                }
            }
        case DOWNVOTE_POST:
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
