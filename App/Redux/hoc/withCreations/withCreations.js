import { connect } from 'react-redux'
import { fetchCreations, clearCreationsOnCategoryChangePopular } from '../../actions/Creations/creations'
import { fetchLatestCreations } from '../../actions/Creations/Latest'
import { openAudioPlayerMiniView } from '../../actions/AudioPlayer'
// import categories from '../../Reducers/Categories'
export const getIData = state => state.data
export const getIsLoading = state => state.isLoading
export const getError = state => state.error
export const getTotalCount = state => state.totalCount

const mapStateToProps = ({ creations, audioPlayer, pusher, auth, categories }) => {
  // const { data, isLoading, error, totalCount } = creations
  const { categoryItems } = categories
  const { showAudioPlayer, Audios } = audioPlayer
  const { isUserLoggedIn, userInfo } = auth

  const { PusherData, action, updatedNID, activityType } = pusher
  return {
    data: getIData(creations), isLoading: getIsLoading(creations), error: getError(creations), totalCount: getTotalCount(creations), PusherData, action, updatedNID, activityType, showAudioPlayer, Audios, isUserLoggedIn, userInfo, categoryItems
  }
}

const mapdispatchTOProps = dispatch => ({
  fetchCreationsData: (payload, apiType, headers, refreshList) => dispatch(fetchCreations(payload, apiType, headers, refreshList)),
  // fetchLatestCreations: (payload, apiType, headers) => dispatch(fetchLatestCreations(payload, apiType, headers)),
  openAudioPlayerMiniView: (payload) => dispatch(openAudioPlayerMiniView(payload)),
  clearCreationsOnCategoryChangePopular: (payload) => dispatch(clearCreationsOnCategoryChangePopular(payload))
})

export const withCreations = Component =>
  connect(mapStateToProps, mapdispatchTOProps)(Component)
