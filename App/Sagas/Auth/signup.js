/* eslint no-underscore-dangle: 0 */
import { call, put, takeEvery } from 'redux-saga/effects'
import { AuthApi } from '../../Services/data/login'
import {
  REGISTERING_USER,
  REGISTERATION_SUCCESS, REGISTERATION_FAIL
} from '../../Redux/constants/Constants'

function authSuccess (payload) {
  return { type: REGISTERATION_SUCCESS, payload }
}

function authFail (payload) {
  return { type: REGISTERATION_FAIL, payload }
}

function * authRequest ({requestPayload}) {
  const url = '/wefiq/account/setup'
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
  yield takeEvery(REGISTERING_USER, authRequest)
}
