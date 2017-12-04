export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const UPVOTE_POST = 'UPVOTE_POST'
export const DOWNVOTE_POST = 'DOWNVOTE_POST'
export const FETCH_POSTS = 'FETCH_POSTS'

export function fetchPosts() {
    return (dispatch) => {
        const url = `${process.env.REACT_APP_BACKEND}/posts`;
        fetch(url)
          .then((res) => { return(res.json()) })
          .then((posts) => {
              console.log(posts);
            dispatch({
                type: FETCH_POSTS,
                posts
            })
        });
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

export function upvotePost(id) {
    return {
        type: UPVOTE_POST,
        id
    }
}

export function downvotePost(id) {
    return {
        type: DOWNVOTE_POST,
        id
    }
}