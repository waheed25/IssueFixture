import {
  FETCH_USER_FOLLOWED_REQUEST
} from '../../constants/Constants'

function fetchRefiqRequest (requestPayload, apiType) {
  return {
    type: FETCH_USER_FOLLOWED_REQUEST,
    requestPayload,
    apiType
  }
}
export function fetchFollowedUser (requestPayload = {}, apiType) {
  return (dispatch) => {
    dispatch(fetchRefiqRequest(requestPayload, apiType))
  }
}
