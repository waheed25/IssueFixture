/* eslint no-underscore-dangle: 0 */
import { call, put, takeEvery } from 'redux-saga/effects'
import { fetchCreationService } from '../../Services/data/creations'
import {
  FETCH_CREATION_DETAILS_LOADING,
  FETCH_CREATION_DETAILS_SUCCESS,
  FETCH_CREATION_DETAILS_FAIL
} from '../../Redux/constants/Constants'

function fetchCreationsSuccess (payload) {
  return { type: FETCH_CREATION_DETAILS_SUCCESS, payload }
}
function fetchCreationsFail (payload) {
  return { type: FETCH_CREATION_DETAILS_FAIL, payload }
}

function * fetchCreationsRequest ({requestPayload, apiType, headers}) {
  try {
    const resBody = yield call(fetchCreationService, requestPayload, apiType, headers)
    const resData = resBody.models.creation
    const resDataArray = resBody.models.creation ? Object.keys(resData).map(i => resData[i]) : []
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
  yield takeEvery(FETCH_CREATION_DETAILS_LOADING, fetchCreationsRequest)
}
