import axios from 'axios'

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES'

export function fetchCategories() {
    return (dispatch => {
        const url = `${process.env.REACT_APP_BACKEND}/categories`;
        axios.get(url)
            .then(({data}) => {
                dispatch({
                    type: FETCH_CATEGORIES,
                    categories: data.categories
                })
            });
    })
}