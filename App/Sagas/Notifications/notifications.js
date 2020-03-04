/* eslint no-underscore-dangle: 0 */
import { call, put, takeEvery } from 'redux-saga/effects'
import { fetchNotifications } from '../../Services/data/notifications'
import {
    FETCH_NOTIFICATIONS_LOADING,
    FETCH_NOTIFICATIONS_SUCCESS,
    FETCH_NOTIFICATIONS_FAIL
} from '../../Redux/constants/Constants'

function fetchCreationsSuccess (payload) {
  return { type: FETCH_NOTIFICATIONS_SUCCESS, payload }
}

function fetchCreationsFail (payload) {
  return { type: FETCH_NOTIFICATIONS_FAIL, payload }
}

function * fetchCreationsRequest ({requestPayload, apiType, headers}) {
  try {
    const resBody = yield call(fetchNotifications, requestPayload, apiType, headers)
    debugger
    const resData = resBody.notification
    const resDataArray = resBody.notification ? Object.keys(resData).map(i => resData[i]) : []
    debugger
    // let responseData
    if (resBody) {
      yield put(fetchCreationsSuccess({resDataArray, count: parseInt(resBody.count)}))
    } else {
      yield put(fetchCreationsFail({ resBody }))
    }
  } catch (error) {
    yield put(fetchCreationsFail({ error }))
  }
}

export default function * fetchCreationsSaga (payload) {
  yield takeEvery(FETCH_NOTIFICATIONS_LOADING, fetchCreationsRequest)
}
