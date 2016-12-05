import {
    REQUEST_USERS, RECEIVE_USERS
} from '../actions/userActions';

export function users(state = {
    loading: false,
    isRefreshing: false,
    data: []
}, action) {
    switch (action.type) {
        case REQUEST_USERS:
            return Object.assign({}, state, {
                loading: true,
                isRefreshing: false
            });
        case RECEIVE_USERS:
            return Object.assign({}, state, {
                loading: false,
                isRefreshing: false,
                data: action.users
            });
        default:
            return state
    }
}