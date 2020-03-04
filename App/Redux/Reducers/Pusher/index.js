import {
  SUBSCRIBING_PUSHER_CHANNEL,
  SUBSCRIBE_PUSHER_CHANNEL,
  FAIL_TO_SUBSCRIBING_PUSHER_CHANNEL,
  GET_PUSHER_DATA
} from '../../constants/Constants'

const initialState = {
  isSubscribed: false,
  isConnected: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SUBSCRIBE_PUSHER_CHANNEL :
      {
        return {
          ...state
        }
      }
    case FAIL_TO_SUBSCRIBING_PUSHER_CHANNEL :
      return {
        ...state
      }
    case SUBSCRIBING_PUSHER_CHANNEL:
      return {
        ...state
      }
    case GET_PUSHER_DATA :
      console.log('action.payload of GET_PUSHER_DATA', action.payload)
      return {
        PusherData: action.payload,
        action: action.payload.action,
        // TODOD: relationship object has no pre-defined interface, therefore data in could be vary
        // therefore, just take properties from relationship based on action/channel_name (context)
        updatedNID: action.payload.data.relationship.nid,
        activityType: action.payload.data.relationship.type
      }
    default:
      return state
  }
}
