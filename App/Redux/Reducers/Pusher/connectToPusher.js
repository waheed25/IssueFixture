import {
  CONNECTING_TO_PUSHER,
  CONNECT_PUSHER_SUCCESSFULLY
} from '../../constants/Constants'

const initialState = {
  isSubscribed: false,
  pusherConnected: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case CONNECTING_TO_PUSHER :
      {
        return {
          ...state
        }
      }
    case CONNECT_PUSHER_SUCCESSFULLY :
      console.log('Connected to pusher successfully')
      return {
        ...state,
        pusherConnected: true
      }
    default:
      return state
  }
}
