/* eslint no-underscore-dangle: 0 */
import { call, put, takeEvery } from 'redux-saga/effects'
import { fetchCreationService } from '../../Services/data/creations'

import {
  FETCH_CREATIONS_LOADING,
  FETCH_CREATIONS_SUCCESS,
  FETCH_CREATIONS_FAIL,
  CLEAR_CREATIONS
} from '../../Redux/constants/Constants'
import _ from 'underscore'
// import { handleDataChange, InitializePusher } from '../../Utils'

// function pusherSubscription (nid) {
//   return (
//     {
//       channel: `creation_${nid}`,
//       events: ['meta_update']
//     }
//   )
// }
function fetchCreationsSuccess (payload) {
  return { type: FETCH_CREATIONS_SUCCESS, payload }
}
function fetchCreationsFail (payload) {
  return { type: FETCH_CREATIONS_FAIL, payload }
}
function clearCreations () {
  return { type: CLEAR_CREATIONS }
}

function * fetchCreationsRequest ({requestPayload, apiType, headers, refreshList}) {
  try {
    // console.log('createStore', createStore().store.getState())
    const resBody = yield call(fetchCreationService, requestPayload, apiType, headers)
    debugger
    if (refreshList) {
      yield put(clearCreations())
    }
    // const resData = resBody.models.creation
    // const resDataArray = resBody.models.creation ? Object.keys(resData).map(i => resData[i]) : []
    // let responseData
    // const channelsToSubscribe = resDataArray.map((item) => {
    //   return pusherSubscription(item.attributes.drupalInternalNid)
    // })
    // // debugger
    // //
    // debugger
    //   _.each(channelsToSubscribe, (channel) => {
    //     debugger
    //     let singleChannel = InitializePusher().subscribe(channel.channel)
    //     channel.events.map((event) => {
    //       singleChannel.bind(event, (data) => {
    //         console.log('Data from component', data)
    //       })
    //     })
    //   })
    if (resBody) {
      yield put(fetchCreationsSuccess({resDataArray: resBody.resDataArray, count: resBody.count}))
    } else {
      // yield put(fetchCreationsFail({ resBody }))
    }
  } catch (error) {
    yield put(fetchCreationsFail({ error }))
  }
}

export default function * fetchCreationsSaga (payload) {
  yield takeEvery(FETCH_CREATIONS_LOADING, fetchCreationsRequest)
}
