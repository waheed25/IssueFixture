import {
  FETCH_REFIQ_LOADING,
  FETCH_REFIQ_SUCCESS,
  FETCH_REFIQ_FAIL,
  CLEAR_REFIQS
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
    case FETCH_REFIQ_SUCCESS:
      {
        return {
          ...state,
          data: [...state.data, ...action.payload.resDataArray],
          isLoading: false,
          error: false,
          totalCount: parseInt(action.payload.count)
        }
      }
    case FETCH_REFIQ_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      }
    case FETCH_REFIQ_LOADING:
      return {
        ...state,
        isLoading: true,
        error: null
      }
    case CLEAR_REFIQS:
      return {
        data: [],
        isLoading: false,
        error: null
      }
    default:
      return state
  }
}
