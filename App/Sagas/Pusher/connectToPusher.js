/* eslint no-underscore-dangle: 0 */
import { put, takeEvery, take } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import { InitializePusher } from '../../Utils/misc'
import {
  CONNECTING_TO_PUSHER,
  CONNECT_PUSHER_SUCCESSFULLY
} from '../../Redux/constants/Constants'

function connectedPusherSuccesfullys (payload) {
  return { type: CONNECT_PUSHER_SUCCESSFULLY, payload }
}

function * connectToPusherRequest ({requestPayload}) {
  try {
    var pusher
    if (!pusher) {
      pusher = InitializePusher()
    }
    const channelConnectivity = eventChannel(emit => {
      pusher.connection.bind('connected', () => {
        emit({connected: { isConnected: true }})
      })
      return () => {
        // Perform any cleanup you need here
        pusher.end()
      }
    })
    while (true) {
      const { connected } = yield take(channelConnectivity)
      if (!connected) {
        break
      }
      yield put(connectedPusherSuccesfullys(connected))
      // Handle the data...
    }
  } catch (error) {
    // yield put(fetchCreationsFail({ error }))
  }
}

export default function * connectToPusher (payload) {
  yield takeEvery(CONNECTING_TO_PUSHER, connectToPusherRequest)
}
