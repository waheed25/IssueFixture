import {
  FETCH_CREATIONS_FEED_LOADING,
  CLEAR_CREATIONS_FEED
} from '../../constants/Constants'

function fetchFeedCreationsRequest (requestPayload, apiType, headers) {
  return {
    type: FETCH_CREATIONS_FEED_LOADING,
    requestPayload,
    apiType,
    headers
  }
}
function clearCreationsState () {
  return {
    type: CLEAR_CREATIONS_FEED
  }
}
export function fetchFeedCreations (requestPayload = {}, apiType, headers) {
  return (dispatch) => {
    dispatch(fetchFeedCreationsRequest(requestPayload, apiType, headers))
  }
}
export function clearCreationsOnCategoryChangeFeed () {
  return (dispatch) => {
    dispatch(clearCreationsState())
  }
}
