/* eslint no-underscore-dangle: 0 */
import { call, put, takeEvery } from 'redux-saga/effects'
import { AuthApi } from '../../Services/data/login'
import {
  FETCH_AUTH_LOADING,
  FETCH_AUTH_SUCCESS,
  FETCH_AUTH_FAIL
} from '../../Redux/constants/Constants'

function authSuccess (payload) {
  return { type: FETCH_AUTH_SUCCESS, payload }
}

function authFail (payload) {
  return { type: FETCH_AUTH_FAIL, payload }
}

function * authRequest ({requestPayload}) {
  const url = '/wefiq/login'
  try {
    const resBody = yield call(AuthApi, {url, requestPayload})
    console.log('login api response :::', resBody)
    // let responseData
    if (resBody.ok) {
      yield put(authSuccess({loginData: resBody.data}))
    } else {
      yield put(authFail({ resBody }))
    }
  } catch (error) {
    yield put(authFail({ error }))
  }
}

export default function * authSaga (payload) {
  yield takeEvery(FETCH_AUTH_LOADING, authRequest)
}
