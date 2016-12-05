export const REQUEST_USERS = 'REQUEST_USERS';
export function requestUsers(community) {
    return {
        type: REQUEST_USERS,
        community: community
    }
}

export const RECEIVE_USERS = 'RECEIVE_USERS';
export function receiveUsers(community, json) {
    return {
        type: RECEIVE_USERS,
        community: community,
        users: json.data
    }
}

export function fetchUsers(community) {
    return function (dispatch) {
        dispatch(requestUsers(community));

        console.log("community : "  + community);
        return fetch('https://www.micose.pierrepironin.fr/api/user/find?community=' + community)
            .then(response => response.json())
            .then(json => {
                    dispatch(receiveUsers(community, json))
                }
            );
    }
}