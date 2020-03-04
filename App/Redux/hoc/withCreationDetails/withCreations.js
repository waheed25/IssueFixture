import { connect } from 'react-redux'
import { fetchCreations, increaseCreationView } from '../../actions/Creations/creationDetails'
import { openAudioPlayerMiniView } from '../../actions/AudioPlayer'

export const getIData = state => state.data
export const getIsLoading = state => state.isLoading
export const getError = state => state.error
export const getTotalCount = state => state.totalCount

const mapStateToProps = ({ creationsDetails, creations, audioPlayer, pusher, auth }) => {
  // const { data, isLoading, error, totalCount } = creationsDetails
  const { showAudioPlayer, Audios } = audioPlayer
  const { isUserLoggedIn, userInfo } = auth

  const { PusherData, action, updatedNID, activityType } = pusher
  return {
    data: getIData(creationsDetails), isLoading: getIsLoading(creationsDetails), error: getError(creationsDetails), totalCount: getTotalCount(creationsDetails), PusherData, action, updatedNID, activityType, showAudioPlayer, Audios, isUserLoggedIn, userInfo
  }
}

const mapdispatchTOProps = dispatch => ({
  fetchCreationsDetailsData: (payload, apiType, headers) => dispatch(fetchCreations(payload, apiType, headers)),
  openAudioPlayerMiniView: (payload) => dispatch(openAudioPlayerMiniView(payload)),
  onCreationView: (payload) => dispatch(increaseCreationView(payload))

})

export const withCreationsDetails = Component =>
  connect(mapStateToProps, mapdispatchTOProps)(Component)
