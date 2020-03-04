/* eslint no-underscore-dangle: 0 */
import { call, put, takeEvery } from 'redux-saga/effects'
import { CollectionsService } from '../../Services/data/collections'
import {
  FETCH_COLLECTION_LOADING,
  FETCH_COLLECTION_SUCCESS,
  FETCH_COLLECTION_FAIL
} from '../../Redux/constants/Constants'

function fetchCollectionsSuccess (payload) {
  return { type: FETCH_COLLECTION_SUCCESS, payload }
}

function fetchCollectionsFail (payload) {
  return { type: FETCH_COLLECTION_FAIL, payload }
}

function * fetchCollectionsRequest ({requestPayload, apiType}) {
  try {
    const resBody = yield call(CollectionsService, {requestPayload, apiType})
    console.log('resBody of collection saga', resBody)
    const resData = resBody.normData.collection
    const resDataArray = Object.keys(resData).map(i => resData[i])
    // let responseData
    if (resBody) {
      yield put(fetchCollectionsSuccess({resDataArray, count: resBody.count}))
    } else {
      // yield put(fetchCreationsFail({ resBody }))
    }
  } catch (error) {
    yield put(fetchCollectionsFail({ error }))
  }
}

export default function * fetchCollectionsSaga (payload) {
  yield takeEvery(FETCH_COLLECTION_LOADING, fetchCollectionsRequest)
}
