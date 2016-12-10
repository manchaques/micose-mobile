import {
    REQUEST_LOGIN, RECEIVE_LOGIN,
    REQUEST_LOGOUT, RECEIVE_LOGOUT,
    FAIL_TRY_LOGIN
} from '../actions/loginActions';

export function login(state = {
    loading: false,
    user: null,
    community: null
}, action) {
    switch (action.type) {
        case REQUEST_LOGIN:
            return Object.assign({}, state, {
                loading: true
            });
        case RECEIVE_LOGIN:
            return Object.assign({}, state, {
                loading: false,
                user: action.user,
                community: action.community
            });
        case REQUEST_LOGOUT:
            return Object.assign({}, state, {
                loading: true
            });
        case RECEIVE_LOGOUT:
            return Object.assign({}, state, {
                loading: false,
                user: null,
                community: null
            });
        case FAIL_TRY_LOGIN:
            return Object.assign({}, state, {
                loading: false,
                user: null,
                community: null
            });
        default:
            return state
    }
}
