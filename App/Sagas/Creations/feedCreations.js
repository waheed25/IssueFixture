/* eslint no-underscore-dangle: 0 */
import { call, put, takeEvery } from 'redux-saga/effects'
import { fetchCreationService } from '../../Services/data/creations'
import {
  FETCH_CREATIONS_FEED_LOADING,
  FETCH_CREATIONS_FEED_SUCCESS,
  FETCH_CREATIONS_FEED_FAIL, CLEAR_CREATIONS_FEED
} from '../../Redux/constants/Constants'

function fetchCreationsSuccess (payload) {
  return { type: FETCH_CREATIONS_FEED_SUCCESS, payload }
}
function fetchCreationsFail (payload) {
  return { type: FETCH_CREATIONS_FEED_FAIL, payload }
}
function clearCreations () {
  return { type: CLEAR_CREATIONS_FEED }
}
function * fetchCreationsRequest ({requestPayload, apiType, headers, refreshList}) {
  try {
    debugger
    const resBody = yield call(fetchCreationService, requestPayload, apiType, headers)
    debugger
    if (refreshList) {
      yield put(clearCreations())
    }
    // const resData = resBody.models.creation
    // const resDataArray = resBody.models.creation ? Object.keys(resData).map(i => resData[i]) : []
    // let responseData
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
  yield takeEvery(FETCH_CREATIONS_FEED_LOADING, fetchCreationsRequest)
}
