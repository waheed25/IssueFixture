import {
  CLEAR_CREATIONS,
  FETCH_CREATIONS_LOADING,
} from '../../constants/Constants'

function fetchCreationsRequest (requestPayload, apiType, headers, refreshList) {
  return {
    type: FETCH_CREATIONS_LOADING,
    requestPayload,
    apiType,
    headers,
    refreshList
  }
}
function clearCreationsState () {
  return {
    type: CLEAR_CREATIONS
  }
}
export function fetchCreations (requestPayload = {}, apiType, headers, refreshList) {
  return (dispatch) => {
    dispatch(fetchCreationsRequest(requestPayload, apiType, headers, refreshList))
  }
}
export function clearCreationsOnCategoryChangePopular () {
  return (dispatch) => {
    dispatch(clearCreationsState())
  }
}
