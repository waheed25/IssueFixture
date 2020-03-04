/* eslint no-underscore-dangle: 0 */
import { call, put, takeEvery, take } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import { InitializePusher } from '../../Utils/misc'
import {
  SUBSCRIBING_PUSHER_CHANNEL,
  FAIL_TO_SUBSCRIBING_PUSHER_CHANNEL,
  GET_PUSHER_DATA
} from '../../Redux/constants/Constants'

function fetchDataSuccess (payload) {
  return { type: GET_PUSHER_DATA, payload }
}
function fetchdataFail (payload) {
  return { type: FAIL_TO_SUBSCRIBING_PUSHER_CHANNEL, payload }
}

function * subscribeChannelRequest ({requestPayload}) {
  try {
    var pusher
    if (!pusher) {
      pusher = InitializePusher()
    }
    var channel = pusher.subscribe(requestPayload.channel)
    const channelEvent = eventChannel(emit => {
      requestPayload.events.map((event) => {
        channel.bind(event, (data) => {
          emit({ data })
        })
      })
      return () => {
        // Perform any cleanup you need here
        channel.end()
      }
    })
    while (true) {
      const { data } = yield take(channelEvent)
      if (!data) {
        break
      }
      yield put(fetchDataSuccess(data))
     // Handle the data...
    }
  } catch (error) {
    // yield put(fetchCreationsFail({ error }))
  }
}

export default function * fetchCreationsSaga (payload) {
  yield takeEvery(SUBSCRIBING_PUSHER_CHANNEL, subscribeChannelRequest)
}
