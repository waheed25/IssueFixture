/* eslint no-underscore-dangle: 0 */
import { call, put, takeEvery } from 'redux-saga/effects'
import { IncreaseCreationView } from '../../Services/data/creationView'
import {
  INCREASE_CREATION_VIEW_REQUEST,
  INCREASE_CREATION_VIEW_SUCCESS,
  INCREASE_CREATION_VIEW_FAIL
} from '../../Redux/constants/Constants'

function CreationsViewSuccess (payload) {
  return { type: INCREASE_CREATION_VIEW_SUCCESS, payload }
}
function CreationViewFail (payload) {
  return { type: INCREASE_CREATION_VIEW_FAIL, payload }
}

function * CreationViewRequest ({requestPayload, apiType, headers}) {
  try {
    const resBody = yield call(IncreaseCreationView, requestPayload, apiType, headers)
    if (resBody.data.length === 0) {
      yield put(CreationsViewSuccess({resBody}))
    } else {
      yield put(CreationViewFail({ resBody }))
    }
  } catch (error) {
    yield put(CreationViewFail({ error }))
  }
}

export default function * CreationViewSaga (payload) {
  yield takeEvery(INCREASE_CREATION_VIEW_REQUEST, CreationViewRequest)
}
