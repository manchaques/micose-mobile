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

export const FAIL_TRY_LOGIN = 'FAIL_TRY_LOGIN';
export function failTryLogin() {
    return {
        type: FAIL_TRY_LOGIN
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
    }
}

function _fetchUser(googleUser) {
    const techName = googleUser.name.replace(' ', '_');
    return fetch('https://www.micose.pierrepironin.fr/api/user/find?techName=' + techName)
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            if (!response.data) {
                // TODO create user
            }
            return response.data;
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
            .then(() => {
                return GoogleSignin.signOut()
            })
            .then(() => {
                dispatch(receiveLogout())
            })
    }
}