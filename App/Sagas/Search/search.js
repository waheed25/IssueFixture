/* eslint no-underscore-dangle: 0 */
import { call, put, takeEvery } from 'redux-saga/effects'
import { fetchCreationService } from '../../Services/data/creations'
import {
  SEARCHING,
  SEARCH_SUCCESS_CREATIONS,
  SEARCH_SUCCESS_CREATORS,
  SEARCH_FAIL
} from '../../Redux/constants/Constants'

function fetchCreationsSuccess (payload) {
  return { type: SEARCH_SUCCESS_CREATIONS, payload }
}
function fetchCreatorsSuccess (payload) {
  return { type: SEARCH_SUCCESS_CREATORS, payload }
}
function fetchCreationsFail (payload) {
  return { type: SEARCH_FAIL, payload }
}

function * fetchCreationsRequest ({requestPayload, apiType, headers}) {
  try {
    const resBody = yield call(fetchCreationService, requestPayload, apiType, headers)
    if (requestPayload._search_api === 'creation') {
      yield put(fetchCreationsSuccess({resDataArray: resBody.resDataArray, count: resBody.count}))
    }
    if (requestPayload._search_api === 'profile') {
      yield put(fetchCreatorsSuccess({resDataArray: resBody.resDataArray, count: resBody.count}))
    } else {
      yield put(fetchCreationsSuccess({ resDataArray: resBody.resDataArray, count: 0 }))
    }
  } catch (error) {
    yield put(fetchCreationsFail({ error }))
  }
}

export default function * fetchCreationsSaga (payload) {
  yield takeEvery(SEARCHING, fetchCreationsRequest)
}
