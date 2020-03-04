import { connect } from 'react-redux'
import { subscribePusherChannel } from '../../actions/Pusher'
import { updatePusherData } from '../../actions/Pusher/updateDataWithPusher'

const mapStateToProps = (state) => {
  const { pusher, connectPusher, auth } = state
  const { PusherData, action, updatedNID, activityType } = pusher
  const { pusherConnected } = connectPusher
  const { isUserLoggedIn, userInfo, userId } = auth
  return {
    PusherData,
    pusherConnected,
    activityType,
    updatedNID,
    action,
    isUserLoggedIn,
    uid: userInfo.drupal_internal__uid,
    token: userInfo.token,
    userId: userId
  }
}

const mapdispatchTOProps = dispatch => ({
  subscribeChannel: (payload) => dispatch(subscribePusherChannel(payload)),
  updatePusherData: (payload) => dispatch(updatePusherData(payload))
})

export const withsubscribeChannel = Component =>
  connect(mapStateToProps, mapdispatchTOProps)(Component)
