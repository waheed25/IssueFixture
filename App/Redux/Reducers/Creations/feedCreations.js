import {
  FETCH_CREATIONS_FEED_LOADING,
  FETCH_CREATIONS_FEED_SUCCESS,
  FETCH_CREATIONS_FEED_FAIL,
  UPDATE_POPLUAR_DATA,
  CLEAR_CREATIONS_FEED
} from '../../constants/Constants'

const initialState = {
  data: [],
  isLoading: false,
  error: null,
  isFetchingMore: false,
  totalCount: 0
}

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_CREATIONS_FEED_SUCCESS:
      {
        return {
          ...state,
          data: [...state.data, ...action.payload.resDataArray],
          isLoading: false,
          error: false,
          totalCount: action.payload.count
        }
      }
    case FETCH_CREATIONS_FEED_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      }
    case FETCH_CREATIONS_FEED_LOADING:
      return {
        ...state,
        isLoading: true,
        error: null
      }
    case UPDATE_POPLUAR_DATA:
      return {
        ...state,
        data: action.requestPayload,
        isLoading: false,
        error: false
      }
    case CLEAR_CREATIONS_FEED:
      return {
        ...state,
        data: [],
        isLoading: false,
        error: false
      }
    default:
      return state
  }
}
