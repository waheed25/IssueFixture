/* eslint no-underscore-dangle: 0 */
import { call, put, takeEvery } from 'redux-saga/effects'
import { fetchFollowed } from '../../Services/data/followed'

import {
  FETCH_USER_FOLLOWED_SUCCESS,
  FETCH_USER_FOLLOWED_FAIL,
  FETCH_USER_FOLLOWED_REQUEST
} from '../../Redux/constants/Constants'

function fetchCreationsSuccess (payload) {
  return { type: FETCH_USER_FOLLOWED_SUCCESS, payload }
}
function fetchCreationsFail (payload) {
  return { type: FETCH_USER_FOLLOWED_FAIL, payload }
}

function * fetchCreationsRequest ({requestPayload, apiType, headers}) {
  try {
    const resBody = yield call(fetchFollowed, requestPayload, apiType, headers)
    const resData = resBody.resp.normData.user
    const resDataArray = resBody.resp.normData.user ? Object.keys(resData).map(i => resData[i]) : []
    if (resBody) {
      yield put(fetchCreationsSuccess({resDataArray, count: resBody.count}))
    } else {
      // yield put(fetchCreationsFail({ resBody }))
    }
  } catch (error) {
    yield put(fetchCreationsFail({ error }))
  }
}

export default function * fetchCreationsSaga (payload) {
  yield takeEvery(FETCH_USER_FOLLOWED_REQUEST, fetchCreationsRequest)
}
