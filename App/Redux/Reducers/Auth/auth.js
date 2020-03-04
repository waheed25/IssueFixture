import {
  FETCH_AUTH_LOADING,
  FETCH_AUTH_SUCCESS,
  FETCH_AUTH_FAIL,
  GOOGLE_AUTH_LOADING,
  GOOGLE_AUTH_SUCCESS,
  GOOGLE_AUTH_FAIL,
  FACEBOOK_AUTH_LOADING,
  FACEBOOK_AUTH_FAIL,
  FACEBOOK_AUTH_SUCCESS,
  REGISTERING_USER,
  REGISTERATION_SUCCESS,
  REGISTERATION_FAIL,
  USER_LOGOUT,
  USER_LOGIN
} from '../../constants/Constants'

const initialState = {
  data: {},
  isLoading: false,
  error: false,
  isUserLoggedIn: false,
  userInfo: {}
}

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_AUTH_SUCCESS:
      {
        return {
          ...state,
          data: action.payload.loginData,
          isLoading: false,
          error: false
        }
      }
    case GOOGLE_AUTH_SUCCESS:
      {
        return {
          ...state,
          data: action.payload.loginData,
          isLoading: false,
          error: false
        }
      }
    case REGISTERATION_SUCCESS:
      {
        return {
          ...state,
          data: action.payload.loginData,
          isLoading: false,
          error: false
        }
      }
    case FACEBOOK_AUTH_SUCCESS:
      {
        return {
          ...state,
          data: action.payload.loginData,
          isLoading: false,
          error: false
        }
      }
    case FETCH_AUTH_FAIL:
      return {
        ...state,
        data: {},
        isLoading: false,
        error: action.payload.error.data.message
      }
    case GOOGLE_AUTH_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      }
    case FACEBOOK_AUTH_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      }
    case REGISTERATION_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error.data.message
      }
    case FETCH_AUTH_LOADING:
      return {
        ...state,
        isLoading: true,
        error: null
      }
    case GOOGLE_AUTH_LOADING:
      return {
        ...state,
        isLoading: true,
        error: null
      }
    case FACEBOOK_AUTH_LOADING:
      return {
        ...state,
        isLoading: true,
        error: null
      }
    case REGISTERING_USER:
      return {
        ...state,
        isLoading: true,
        error: null
      }
    case USER_LOGOUT:
      return {
        ...state,
        isUserLoggedIn: false
      }
    case USER_LOGIN:
      return {
        ...state,
        isUserLoggedIn: true,
        userInfo: action.requestPayload.loginData.data.attributes,
        userId: action.requestPayload.loginData.data.id
      }

    default:
      return state
  }
}
