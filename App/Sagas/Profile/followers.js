/* eslint no-underscore-dangle: 0 */
import { call, put, takeEvery } from 'redux-saga/effects'
import { fetchFollowers } from '../../Services/data/followers'

import {
  FETCH_USER_FOLLOWERS_SUCCESS,
  FETCH_USER_FOLLOWERS_FAIL,
  FETCH_USER_FOLLOWERS_REQUEST,
  CLEAR_FOLLOWERS_LIST
} from '../../Redux/constants/Constants'

function fetchCreationsSuccess (payload) {
  return { type: FETCH_USER_FOLLOWERS_SUCCESS, payload }
}
function fetchCreationsFail (payload) {
  return { type: FETCH_USER_FOLLOWERS_FAIL, payload }
}
function clearFollowersList () {
  return { type: CLEAR_FOLLOWERS_LIST }
}

function * fetchCreationsRequest ({requestPayload, userId, refreshing}) {
  try {
    const resBody = yield call(fetchFollowers, requestPayload, userId)
    if (refreshing) {
      yield put(clearFollowersList())
    }
    const resData = resBody.resp.normData.user
    const resDataArray = resBody.resp.normData.user ? Object.keys(resData).map(i => resData[i]) : []
    if (resBody) {
      yield put(fetchCreationsSuccess({resDataArray, count: resBody.count, userId}))
    } else {
      // yield put(fetchCreationsFail({ resBody }))
    }
  } catch (error) {
    yield put(fetchCreationsFail({ error }))
  }
}

export default function * fetchCreationsSaga (payload) {
  yield takeEvery(FETCH_USER_FOLLOWERS_REQUEST, fetchCreationsRequest)
}
