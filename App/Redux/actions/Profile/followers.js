import {
  FETCH_USER_FOLLOWERS_REQUEST
} from '../../constants/Constants'

function fetchFollowersRequest (requestPayload, userId, refreshing) {
  return {
    type: FETCH_USER_FOLLOWERS_REQUEST,
    requestPayload,
    userId,
    refreshing
  }
}
export function fetchFollowers (requestPayload = {}, userId, refreshing) {
  return (dispatch) => {
    dispatch(fetchFollowersRequest(requestPayload, userId, refreshing))
  }
}
