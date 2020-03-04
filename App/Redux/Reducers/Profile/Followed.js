import {
  FETCH_USER_FOLLOWED_FAIL,
  FETCH_USER_FOLLOWED_REQUEST,
  FETCH_USER_FOLLOWED_SUCCESS
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
    case FETCH_USER_FOLLOWED_SUCCESS:
      {
        return {
          ...state,
          data: [...state.data, ...action.payload.resDataArray],
          isLoading: false,
          error: false,
          totalCount: action.payload.count
        }
      }
    case FETCH_USER_FOLLOWED_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      }
    case FETCH_USER_FOLLOWED_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      }
    default:
      return state
  }
}
