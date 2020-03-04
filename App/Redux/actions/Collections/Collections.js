import {
  FETCH_COLLECTION_LOADING,
  CLEAR_COLLECTION_DATA
} from '../../constants/Constants'

function fetchCollectionsRequest (requestPayload, apiType) {
  return {
    type: FETCH_COLLECTION_LOADING,
    requestPayload,
    apiType
  }
}
function clearCollections () {
  return {
    type: CLEAR_COLLECTION_DATA
  }
}
export function fetchCollections (requestPayload = {}, apiType) {
  return (dispatch) => {
    dispatch(fetchCollectionsRequest(requestPayload, apiType))
  }
}
export function clearCollectionsData () {
  return (dispatch) => {
    dispatch(clearCollections())
  }
}
