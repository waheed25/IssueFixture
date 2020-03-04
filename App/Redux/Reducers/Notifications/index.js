import {
  FETCH_NOTIFICATIONS_LOADING,
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_NOTIFICATIONS_FAIL,
  CLEAR_NOTIFICATIONS,
  HIDE_NOTIFICATION_BADGE
} from '../../constants/Constants'

const initialState = {
  data: [],
  isLoading: false,
  error: null,
  isFetchingMore: false,
  totalCount: 0,
  hideNotificationBadge: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_NOTIFICATIONS_SUCCESS:
      {
        return {
          ...state,
          data: [...state.data, ...action.payload.resDataArray],
          isLoading: false,
          error: false,
          totalCount: parseInt(action.payload.count)
        }
      }
    case FETCH_NOTIFICATIONS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      }
    case FETCH_NOTIFICATIONS_LOADING:
      return {
        ...state,
        isLoading: true,
        error: null
      }
    case CLEAR_NOTIFICATIONS:
      return {
        ...state,
        isLoading: true,
        error: null
      }
    case HIDE_NOTIFICATION_BADGE:
      return {
        ...state,
        hideNotificationBadge: true
      }
    default:
      return state
  }
}
