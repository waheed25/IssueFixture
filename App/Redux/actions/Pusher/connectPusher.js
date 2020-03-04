import { CONNECTING_TO_PUSHER } from '../../constants/Constants'

function connectingToPusherRequest (requestPayload) {
  return {
    type: CONNECTING_TO_PUSHER,
    requestPayload
  }
}
export function connectingToPusher (requestPayload = {}) {
  return (dispatch) => {
    dispatch(connectingToPusherRequest(requestPayload))
  }
}
