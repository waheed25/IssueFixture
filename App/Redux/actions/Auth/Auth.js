import {
  FETCH_AUTH_LOADING, GOOGLE_AUTH_LOADING, FACEBOOK_AUTH_LOADING,
  REGISTERING_USER, USER_LOGIN, USER_LOGOUT
} from '../../constants/Constants'

function authUserRequest (requestPayload) {
  return {
    type: FETCH_AUTH_LOADING,
    requestPayload
  }
}
function facebookAuthRequest (requestPayload) {
  return {
    type: FACEBOOK_AUTH_LOADING,
    requestPayload
  }
}
function googleAuthRequest (requestPayload) {
  return {
    type: GOOGLE_AUTH_LOADING,
    requestPayload
  }
}
function signUpRequest (requestPayload) {
  return {
    type: REGISTERING_USER,
    requestPayload
  }
}
export function authUser (requestPayload = {}) {
  return (dispatch) => {
    dispatch(authUserRequest(requestPayload))
  }
}

export function googleAuth (requestPayload = {}) {
  return (dispatch) => {
    dispatch(googleAuthRequest(requestPayload))
  }
}
export function facebookAuth (requestPayload = {}) {
  return (dispatch) => {
    dispatch(facebookAuthRequest(requestPayload))
  }
}

export function signUp (requestPayload = {}) {
  return (dispatch) => {
    dispatch(signUpRequest(requestPayload))
  }
}

export function changeAuthStatus (requestPayload = {}) {
  return (dispatch) => {
    if (requestPayload.login) {
      dispatch(userLoggedIn(requestPayload))
    }
    if (requestPayload.logout) {
      dispatch(userLoggedOut(requestPayload))
    }
  }
}

function userLoggedIn (requestPayload) {
  return {
    type: USER_LOGIN,
    requestPayload
  }
}
function userLoggedOut (requestPayload) {
  return {
    type: USER_LOGOUT,
    requestPayload
  }
}
