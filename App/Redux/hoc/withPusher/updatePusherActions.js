import { connect } from 'react-redux'
import { updatePusherData, updateCreationDetailsList, updateCreationsOfCOllectionsList, updateFeedList, updateLatestList, updatePopularList, updateRefiqListList, updateUserCreationList } from '../../actions/Pusher/updateDataWithPusher'

const mapStateToProps = ({ pusher, connectPusher, auth }) => {
  const { PusherData, action, updatedNID, activityType } = pusher
  const { pusherConnected } = connectPusher
  const { isUserLoggedIn } = auth
  return {
    PusherData, pusherConnected, activityType, updatedNID, action, isUserLoggedIn
  }
}

const mapdispatchTOProps = dispatch => ({
  updatePusherData: (payload) => dispatch(updatePusherData(payload)),
  updateCreationDetailsList: (payload) => dispatch(updateCreationDetailsList(payload)),
  updateCreationsOfCollectionsList: (payload) => dispatch(updateCreationsOfCOllectionsList(payload)),
  updateFeedList: (payload) => dispatch(updateFeedList(payload)),
  updateLatestList: (payload) => dispatch(updateLatestList(payload)),
  updatePopularList: (payload) => dispatch(updatePopularList(payload)),
  updateRefiqListList: (payload) => dispatch(updateRefiqListList(payload)),
  updateUserCreationList: (payload) => dispatch(updateUserCreationList(payload))
})

export const withUpdatePusherData = Component =>
  connect(mapStateToProps, mapdispatchTOProps)(Component)
