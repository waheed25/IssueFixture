import {
  FETCH_CREATION_OF_COLLECTION_LOADING
} from '../../constants/Constants'

function fetchCreationsOfCollectionsRequest (requestPayload, apiType) {
  return {
    type: FETCH_CREATION_OF_COLLECTION_LOADING,
    requestPayload,
    apiType
  }
}
export function fetchCreationsOfCollections (requestPayload = {}, apiType) {
  return (dispatch) => {
    dispatch(fetchCreationsOfCollectionsRequest(requestPayload, apiType))
  }
}
