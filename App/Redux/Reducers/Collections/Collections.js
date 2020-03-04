import {
  FETCH_COLLECTION_LOADING,
  FETCH_COLLECTION_SUCCESS,
  FETCH_COLLECTION_FAIL,
  CLEAR_COLLECTION_DATA
} from '../../constants/Constants'

const initialState = {
  data: [],
  isLoading: false,
  error: null,
  totalCount: 0
}

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_COLLECTION_SUCCESS:
      {
        return {
          ...state,
          data: [...state.data, ...action.payload.resDataArray],
          isLoading: false,
          error: false,
          totalCount: action.payload.count
        }
      }
    case FETCH_COLLECTION_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      }
    case CLEAR_COLLECTION_DATA:
      return {
        data: [],
        isLoading: false,
        error: null
      }
    case FETCH_COLLECTION_LOADING:
      return {
        ...state,
        isLoading: true,
        error: null
      }
    default:
      return state
  }
}
