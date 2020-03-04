import {
  FETCH_NOTIFICATIONS_LOADING,
  HIDE_NOTIFICATION_BADGE
} from '../../constants/Constants'

function fetchNotificationsRequest (requestPayload, apiType, headers) {
  return {
    type: FETCH_NOTIFICATIONS_LOADING,
    requestPayload,
    apiType,
    headers
  }
}
function hideNotifications () {
  return {
    type: HIDE_NOTIFICATION_BADGE
  }
}
// function clearCreationsState () {
//   return {
//     type: CLEAR_CREATIONS
//   }
// }
export function fetchNotifications (requestPayload = {}, apiType, headers) {
  return (dispatch) => {
    dispatch(fetchNotificationsRequest(requestPayload, apiType, headers))
  }
}
export function hideNotificationsBadge () {
  return (dispatch) => {
    dispatch(hideNotifications())
  }
}
// export function clearCreationsOnCategoryChangePopular () {
//   return (dispatch) => {
//     dispatch(clearCreationsState())
//   }
// }
