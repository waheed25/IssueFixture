import {
  FETCH_USER_CREATIONS_LOADING,
  CLEAR_USER_CREAIONS
} from '../../constants/Constants'

function fetchCreationsRequest (requestPayload, apiType) {
  return {
    type: FETCH_USER_CREATIONS_LOADING,
    requestPayload,
    apiType
  }
}
function ClearCreations () {
  return {
    type: CLEAR_USER_CREAIONS
  }
}
export function fetchUserCreations (requestPayload = {}, apiType) {
  return (dispatch) => {
    dispatch(fetchCreationsRequest(requestPayload, apiType))
  }
}
export function clearUserCreations () {
  return (dispatch) => {
    dispatch(ClearCreations())
  }
}
