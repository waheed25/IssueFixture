
import Pusher from 'pusher-js/react-native'
import WefiqConfig from './'
import Config from 'react-native-config'
import {
  SUBSCRIBING_PUSHER_CHANNEL
} from '../../constants/Constants'

export default class WefiqPusher {
  pusher = null
  constructor () {
    var pusher = new Pusher('9a4fa9984a7559c1ddf2', {
      cluster: 'us2',
      forceTLS: true
    })
    var channel = pusher.subscribe('my-channel')
    channel.bind('my-event', function (data) {
      alert(JSON.stringify(data))
    })
  }
}

function subscribePusherChannelRequest (requestPayload) {
  return {
    type: SUBSCRIBING_PUSHER_CHANNEL,
    requestPayload
  }
}
export function subscribePusherChannel (requestPayload = {}) {
  return (dispatch) => {
    dispatch(subscribePusherChannelRequest(requestPayload))
  }
}
