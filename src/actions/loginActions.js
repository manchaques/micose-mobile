import {GoogleSignin} from 'react-native-google-signin';
import _ from 'lodash';

export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export function requestLogin() {
    return {
        type: REQUEST_LOGIN
    }
}

export const RECEIVE_LOGIN = 'RECEIVE_LOGIN';
export function receiveLogin(user) {
    return {
        type: RECEIVE_LOGIN,
        user: user
    }
}

export function signInGoogle() {
    return function (dispatch) {
        dispatch(requestLogin());

        return GoogleSignin.hasPlayServices({autoResolve: true})
            .then(() => {
                return GoogleSignin.configure();
            })
            .then(() => {
                return GoogleSignin.signIn()
            })
            .then((googleUser) => {
                return _fetchUser((googleUser));
            })
            .then((completeUser) => {
                dispatch(receiveLogin(completeUser))
            })
            .catch((err) => {
                console.log('WRONG SIGNIN', err);
            });
    }
}

export function trySignInGoogle() {
    return function (dispatch) {
        dispatch(requestLogin());

        return GoogleSignin.hasPlayServices({autoResolve: true})
            .then(() => {
                return GoogleSignin.configure();
            })
            .then(() => {
                return GoogleSignin.currentUserAsync();
            })
            .then((googleUser) => {
                return _fetchUser((googleUser));
            })
            .then((completeUser) => {
                dispatch(receiveLogin(completeUser))
            })
            .catch((err) => {
                console.log("Play services error", err.code, err.message);
            })
    }
}

function _fetchUser(googleUser) {
    return fetch('https://www.micose.pierrepironin.fr/api/user/find?pseudo=' + googleUser.name.replace(' ', '_'))
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            if (!response.data) {
                // TODO create user
            }
            return response.data;
        })
        .then((user) => {
            let completeUser = user;
            _.extend(completeUser, {
                googleProfile: googleUser
            });
            return completeUser;
        })
        .catch((error) => {
            console.warn(error);
        })
}

export const REQUEST_LOGOUT = 'REQUEST_LOGOUT';
export function requestLogout() {
    return {
        type: REQUEST_LOGOUT
    }
}

export const RECEIVE_LOGOUT = 'RECEIVE_LOGOUT';
export function receiveLogout() {
    return {
        type: RECEIVE_LOGOUT
    }
}

export function signOutGoogle() {
    return function (dispatch) {
        dispatch(requestLogout());

        return GoogleSignin.revokeAccess()
            .then(() => GoogleSignin.signOut())
            .then(() => {
                dispatch(receiveLogout())
            })
            .done();
    }
}