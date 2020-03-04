/* eslint no-underscore-dangle: 0 */
import { call, put, takeEvery } from 'redux-saga/effects'
import { fetchCreationService } from '../../Services/data/creations'
import {
  FETCH_CREATION_OF_COLLECTION_LOADING,
  FETCH_CREATION_OF_COLLECTION_SUCCESS,
  FETCH_CREATION_OF_COLLECTION_FAIL
} from '../../Redux/constants/Constants'

function fetchCreationsOfCollectionSuccess (payload) {
  return { type: FETCH_CREATION_OF_COLLECTION_SUCCESS, payload }
}

function fetchCreationsOfCollectionFail (payload) {
  return { type: FETCH_CREATION_OF_COLLECTION_FAIL, payload }
}

function * fetchCreationsOfCollectionRequest ({requestPayload, apiType}) {
  try {
    const resBody = yield call(fetchCreationService, requestPayload, apiType)
    // let responseData
    if (resBody) {
      yield put(fetchCreationsOfCollectionSuccess({resDataArray: resBody.resDataArray, count: resBody.count}))
    } else {
      // yield put(fetchCreationsFail({ resBody }))
    }
  } catch (error) {
    yield put(fetchCreationsOfCollectionFail({ error }))
  }
}

export default function * fetchCreationsOfCollectionSaga (payload) {
  yield takeEvery(FETCH_CREATION_OF_COLLECTION_LOADING, fetchCreationsOfCollectionRequest)
}
