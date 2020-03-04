import { UPDATE_PUSHER_DATA, UPDATE_CREATIONS_DETAILS_DATA, UPDATE_FEED_DATA, UPDATE_LATEST_DATA, UPDATE_POPLUAR_DATA, UPDATE_CREATIONS_OF_COLLECTIONS_DATA, UPDATE_REFIQS_DATA, UPDATE_USER_CREATIONS_DATA } from '../../constants/Constants'

function updatePusherDataRequest (requestPayload) {
  return {
    type: UPDATE_PUSHER_DATA,
    requestPayload
  }
}
export function updatePusherData (requestPayload = {}) {
  return (dispatch) => {
    dispatch(updatePusherDataRequest(requestPayload))
  }
}

function updatePopularListRequest (requestPayload) {
  return {
    type: UPDATE_POPLUAR_DATA,
    requestPayload
  }
}
export function updatePopularList (requestPayload = {}) {
  return (dispatch) => {
    dispatch(updatePopularListRequest(requestPayload))
  }
}

function updateLatestListRequest (requestPayload) {
  return {
    type: UPDATE_LATEST_DATA,
    requestPayload
  }
}
export function updateLatestList (requestPayload = {}) {
  return (dispatch) => {
    dispatch(updateLatestListRequest(requestPayload))
  }
}
function updateFeedListRequest (requestPayload) {
  return {
    type: UPDATE_FEED_DATA,
    requestPayload
  }
}
export function updateFeedList (requestPayload = {}) {
  return (dispatch) => {
    dispatch(updateFeedListRequest(requestPayload))
  }
}
function updateUserCreationListRequest (requestPayload) {
  return {
    type: UPDATE_USER_CREATIONS_DATA,
    requestPayload
  }
}
export function updateUserCreationList (requestPayload = {}) {
  return (dispatch) => {
    dispatch(updateUserCreationListRequest(requestPayload))
  }
}
function updateRefiqListRequest (requestPayload) {
  return {
    type: UPDATE_REFIQS_DATA,
    requestPayload
  }
}
export function updateRefiqListList (requestPayload = {}) {
  return (dispatch) => {
    dispatch(updateRefiqListRequest(requestPayload))
  }
}
function updateCreationsOfCollectionsListRequest (requestPayload) {
  return {
    type: UPDATE_CREATIONS_OF_COLLECTIONS_DATA,
    requestPayload
  }
}
export function updateCreationsOfCOllectionsList (requestPayload = {}) {
  return (dispatch) => {
    dispatch(updateCreationsOfCollectionsListRequest(requestPayload))
  }
}
function updateCreationDetailsListRequest (requestPayload) {
  return {
    type: UPDATE_CREATIONS_DETAILS_DATA,
    requestPayload
  }
}
export function updateCreationDetailsList (requestPayload = {}) {
  return (dispatch) => {
    dispatch(updateCreationDetailsListRequest(requestPayload))
  }
}
