import {
    REQUEST_BOOKS, RECEIVE_BOOKS
} from '../actions/bookActions';

export function books(state = {
    loading: false,
    isRefreshing: false,
    data: []
}, action) {
    switch (action.type) {
        case REQUEST_BOOKS:
            return Object.assign({}, state, {
                loading: true,
                isRefreshing: false
            });
        case RECEIVE_BOOKS:
            return Object.assign({}, state, {
                loading: false,
                isRefreshing: false,
                data: action.books
            });
        default:
            return state
    }
}