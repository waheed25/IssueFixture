import {
  FETCH_CREATION_DETAILS_LOADING,
  FETCH_CREATION_DETAILS_SUCCESS,
  FETCH_CREATION_DETAILS_FAIL,
  UPDATE_CREATIONS_DETAILS_DATA
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
    case FETCH_CREATION_DETAILS_SUCCESS:
      {
        return {
          ...state,
          // data: [{ items: [...action.payload.resDataArray] }],
          data: [...state.data, ...action.payload.resDataArray],
          isLoading: false,
          error: false,
          totalCount: action.payload.count
        }
      }
    case FETCH_CREATION_DETAILS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      }
    case FETCH_CREATION_DETAILS_LOADING:
      return {
        ...state,
        isLoading: true,
        error: null
      }
    case UPDATE_CREATIONS_DETAILS_DATA:
      return {
        ...state,
        data: action.requestPayload,
        isLoading: false,
        error: false
      }
    default:
      return state
  }
}
