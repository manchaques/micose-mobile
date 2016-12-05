import {
    SELECT_COMMUNITY,
} from '../actions/communityActions';

export function community(state = 1, action) {
    switch (action.type) {
        case SELECT_COMMUNITY:
            return action.community;
        default:
            return state
    }
}