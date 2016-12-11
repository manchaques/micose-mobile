export const REQUEST_BOOKS = 'REQUEST_BOOKS';
export function requestBooks(community) {
    return {
        type: REQUEST_BOOKS,
        community: community
    }
}

export const RECEIVE_BOOKS = 'RECEIVE_BOOKS';
export function receiveBooks(community, json) {
    return {
        type: RECEIVE_BOOKS,
        community: community,
        books: json.data
    }
}

export function fetchBooks(community) {
    return function (dispatch) {
        dispatch(requestBooks(community));

        return fetch('https://www.micose.pierrepironin.fr/api/book/find?community=' + community)
            .then(response => response.json())
            .then(json =>
                dispatch(receiveBooks(community, json))
            );
    }
}

export const FILTER_BOOKS = 'FILTER_BOOKS';
export function filterBooks(filter) {
    return {
        type: FILTER_BOOKS,
        filter: filter
    }
}