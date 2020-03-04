import {
  SEARCHING,
  CLEAR_SEARCH_SUCCESS
} from '../../constants/Constants'
function searching (requestPayload, apiType) {
  return {
    type: SEARCHING,
    requestPayload,
    apiType
  }
}
export function handleSearch (requestPayload = {}, apiType) {
  return (dispatch) => {
    dispatch(searching(requestPayload, apiType))
  }
}

function clearPreviousCreations (requestPayload, apiType) {
  return {
    type: CLEAR_SEARCH_SUCCESS,
    requestPayload,
    apiType
  }
}
export function clearPreviouslySearchedCreations (requestPayload = {}, apiType) {
  return (dispatch) => {
    dispatch(clearPreviousCreations(requestPayload, apiType))
  }
}
