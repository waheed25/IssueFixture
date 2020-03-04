import {
  FETCH_USER_CREATIONS_LOADING,
  FETCH_USER_CREATIONS_SUCCESS,
  FETCH_USER_CREATIONS_FAIL,
  CLEAR_USER_CREAIONS,
  UPDATE_USER_CREATIONS_DATA
} from '../../constants/Constants'

const initialState = {
  userCreationsData: [],
  isLoading: false,
  error: null,
  isFetchingMore: false,
  totalCount: 0
}

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_CREATIONS_SUCCESS: {
      return {
        ...state,
        userCreationsData: action.payload.resDataArray,
        isLoading: false,
        error: false,
        totalCount: action.payload.count
      }
    }
    case FETCH_USER_CREATIONS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      }
    case FETCH_USER_CREATIONS_LOADING:
      return {
        ...state,
        isLoading: true,
        error: null
      }
    case CLEAR_USER_CREAIONS:
      return {
        ...state,
        userCreationsData: [],
        isLoading: false,
        error: false
      }
    case UPDATE_USER_CREATIONS_DATA:
      return {
        ...state,
        userCreationsData: action.requestPayload,
        isLoading: false,
        error: false
      }
    default:
      return state
  }
}
