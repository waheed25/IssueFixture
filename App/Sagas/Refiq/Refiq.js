/* eslint no-underscore-dangle: 0 */
import { call, put, takeEvery } from 'redux-saga/effects'
import _ from 'underscore'
import { fetchCreationService } from '../../Services/data/creations'
import {
  FETCH_REFIQ_LOADING,
  FETCH_REFIQ_SUCCESS,
  FETCH_REFIQ_FAIL
} from '../../Redux/constants/Constants'

function fetchCreationsSuccess (payload) {
  return { type: FETCH_REFIQ_SUCCESS, payload }
}

function fetchCreationsFail (payload) {
  return { type: FETCH_REFIQ_FAIL, payload }
}

function * fetchCreationsRequest ({requestPayload, apiType}) {
  try {
    const resBody = yield call(fetchCreationService, requestPayload, apiType)
    const resData = resBody.models.creation
    debugger
    const resDataArray = (!_.isEmpty(resBody.models)) ? Object.keys(resData).map(i => resData[i]) : []
    // let responseData
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
  yield takeEvery(FETCH_REFIQ_LOADING, fetchCreationsRequest)
}
