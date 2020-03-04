import { connect } from 'react-redux'
import { clearCreationsOnCategoryChangePopular } from '../../actions/Creations/creations'
import { fetchLatestCreations, clearCreationsOnCategoryChangeLatest } from '../../actions/Creations/Latest'
import { openAudioPlayerMiniView } from '../../actions/AudioPlayer'
// import categories from '../../Reducers/Categories'
export const getIData = state => state.data
export const getIsLoading = state => state.isLoading
export const getError = state => state.error
export const getTotalCount = state => state.totalCount

const mapStateToProps = ({ latestCreations, audioPlayer, pusher, auth, categories }) => {
  // const { data, isLoading, error, totalCount } = creations
  const { categoryItems } = categories
  const { showAudioPlayer, Audios } = audioPlayer
  const { isUserLoggedIn, userInfo } = auth

  const { PusherData, action, updatedNID, activityType } = pusher
  return {
    data: getIData(latestCreations), isLoading: getIsLoading(latestCreations), error: getError(latestCreations), totalCount: getTotalCount(latestCreations), PusherData, action, updatedNID, activityType, showAudioPlayer, Audios, isUserLoggedIn, userInfo, categoryItems
  }
}

const mapdispatchTOProps = dispatch => ({
  // fetchCreationsData: (payload, apiType, headers) => dispatch(fetchCreations(payload, apiType, headers)),
  fetchLatestCreations: (payload, apiType, headers, refreshList) => dispatch(fetchLatestCreations(payload, apiType, headers, refreshList)),
  openAudioPlayerMiniView: (payload) => dispatch(openAudioPlayerMiniView(payload)),
  clearCreationsOnCategoryChangeLatest: (payload) => dispatch(clearCreationsOnCategoryChangeLatest(payload))
})

export const withLatestCreations = Component =>
  connect(mapStateToProps, mapdispatchTOProps)(Component)
