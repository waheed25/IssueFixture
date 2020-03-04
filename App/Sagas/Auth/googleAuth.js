/* eslint no-underscore-dangle: 0 */
import { call, put, takeEvery } from 'redux-saga/effects'
import { AuthApi } from '../../Services/data/login'
import {
  GOOGLE_AUTH_LOADING,
  GOOGLE_AUTH_SUCCESS,
  GOOGLE_AUTH_FAIL
} from '../../Redux/constants/Constants'

function authSuccess (payload) {
  return { type: GOOGLE_AUTH_SUCCESS, payload }
}

function authFail (payload) {
  return { type: GOOGLE_AUTH_FAIL, payload }
}

function * authRequest ({requestPayload}) {
  const url = '/wefiq/account/setup/google',
    headers = { 'Content-Type': 'application/json' }
  try {
    const resBody = yield call(AuthApi, {url, requestPayload, headers})
    console.log('google AUTH api response :::', resBody)
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
  yield takeEvery(GOOGLE_AUTH_LOADING, authRequest)
}
