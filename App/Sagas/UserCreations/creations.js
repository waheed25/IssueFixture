/* eslint no-underscore-dangle: 0 */
import { call, put, takeEvery } from 'redux-saga/effects'
import { fetchCreationService } from '../../Services/data/creations'
import {
  FETCH_USER_CREATIONS_LOADING,
  FETCH_USER_CREATIONS_SUCCESS,
  FETCH_USER_CREATIONS_FAIL
} from '../../Redux/constants/Constants'

function fetchCreationsSuccess (payload) {
  return { type: FETCH_USER_CREATIONS_SUCCESS, payload }
}

function fetchCreationsFail (payload) {
  return { type: FETCH_USER_CREATIONS_FAIL, payload }
}

function * fetchCreationsRequest ({requestPayload, apiType}) {
  try {
    const resBody = yield call(fetchCreationService, requestPayload, apiType)
    const resData = resBody.models.creation
    const resDataArray = resBody.models.creation ? Object.keys(resData).map(i => resData[i]) : []
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
  yield takeEvery(FETCH_USER_CREATIONS_LOADING, fetchCreationsRequest)
}
