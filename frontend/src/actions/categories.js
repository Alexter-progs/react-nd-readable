export const FETCH_CATEGORIES = 'FETCH_CATEGORIES'

export function fetchCategories() {
    return (dispatch => {
        const url = `${process.env.REACT_APP_BACKEND}/categories`;
        fetch(url)
            .then((res) => { return(res.json()) })
            .then((data) => {
                dispatch({
                    type: FETCH_CATEGORIES,
                    categories: data.categories
                })
            });
    })
}