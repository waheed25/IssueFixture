import {
  FETCH_CREATION_DETAILS_LOADING,
  INCREASE_CREATION_VIEW_REQUEST
} from '../../constants/Constants'

function fetchCreationsRequest (requestPayload, apiType, headers) {
  return {
    type: FETCH_CREATION_DETAILS_LOADING,
    requestPayload,
    apiType,
    headers
  }
}
export function fetchCreations (requestPayload = {}, apiType, headers) {
  return (dispatch) => {
    dispatch(fetchCreationsRequest(requestPayload, apiType, headers))
  }
}
function increaseCreationViewRequest (requestPayload, apiType, headers) {
  return {
    type: INCREASE_CREATION_VIEW_REQUEST,
    requestPayload,
    apiType,
    headers
  }
}
export function increaseCreationView (requestPayload = {}, apiType, headers) {
  return (dispatch) => {
    dispatch(increaseCreationViewRequest(requestPayload, apiType, headers))
  }
}
