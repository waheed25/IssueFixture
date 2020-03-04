import {
  CLEAR_CREATIONS_LATEST,
  FETCH_CREATIONS_LATEST_LOADING
} from '../../constants/Constants'

function fetchCreationsRequest (requestPayload, apiType, headers) {
  return {
    type: FETCH_CREATIONS_LATEST_LOADING,
    requestPayload,
    apiType,
    headers
  }
}
function clearCreationsState () {
  return {
    type: CLEAR_CREATIONS_LATEST
  }
}
export function fetchLatestCreations (requestPayload = {}, apiType, headers) {
  return (dispatch) => {
    dispatch(fetchCreationsRequest(requestPayload, apiType, headers))
  }
}
export function clearCreationsOnCategoryChangeLatest () {
  return (dispatch) => {
    dispatch(clearCreationsState())
  }
}
