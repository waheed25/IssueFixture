import {
  FETCH_REFIQ_LOADING,
  CLEAR_REFIQS
} from '../../constants/Constants'

function fetchRefiqRequest (requestPayload, apiType) {
  return {
    type: FETCH_REFIQ_LOADING,
    requestPayload,
    apiType
  }
}
function clearRefiqs () {
  return {
    type: CLEAR_REFIQS
  }
}
export function fetchRefiq (requestPayload = {}, apiType) {
  return (dispatch) => {
    dispatch(fetchRefiqRequest(requestPayload, apiType))
  }
}
export function clearRefiqsData () {
  return (dispatch) => {
    dispatch(clearRefiqs())
  }
}
