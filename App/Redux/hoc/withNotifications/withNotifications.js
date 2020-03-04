import { connect } from 'react-redux'
import { fetchNotifications, hideNotificationsBadge } from '../../actions/Notifications/'

export const getIData = state => state.data
export const getIsLoading = state => state.isLoading
export const getError = state => state.error
export const getTotalCount = state => state.totalCount

const mapStateToProps = ({ creations, audioPlayer, pusher, auth, categories, notifications }) => {
  // const { data, isLoading, error, totalCount } = creations
  const { categoryItems } = categories
  const { showAudioPlayer, Audios } = audioPlayer
  const { isUserLoggedIn, userInfo } = auth
  const { hideNotificationBadge } = notifications

  const { PusherData, action, updatedNID, activityType } = pusher
  return {
    data: getIData(notifications), isLoading: getIsLoading(notifications), error: getError(notifications), totalCount: getTotalCount(notifications), PusherData, action, updatedNID, activityType, showAudioPlayer, Audios, isUserLoggedIn, userInfo, categoryItems, hideNotificationBadge }
}

const mapdispatchTOProps = dispatch => ({
  fetchNotifications: (payload, apiType, headers) => dispatch(fetchNotifications(payload, apiType, headers)),
  hideNotificationBadgeFromTab: () => dispatch(hideNotificationsBadge())

})

export const withNotifications = Component =>
  connect(mapStateToProps, mapdispatchTOProps)(Component)
