import { connect } from 'react-redux'
import { fetchFeedCreations, clearCreationsOnCategoryChangeFeed } from '../../actions/Creations/Feed'
import { openAudioPlayerMiniView } from '../../actions/AudioPlayer'
import feedCreations from '../../Reducers/Creations/feedCreations'
// import categories from '../../Reducers/Categories'
export const getIData = state => state.data
export const getIsLoading = state => state.isLoading
export const getError = state => state.error
export const getTotalCount = state => state.totalCount

const mapStateToProps = ({ feedCreations, audioPlayer, pusher, auth, categories }) => {
  // const { data, isLoading, error, totalCount } = creations
  const { categoryItems } = categories
  const { showAudioPlayer, Audios } = audioPlayer
  const { isUserLoggedIn, userInfo } = auth

  const { PusherData, action, updatedNID, activityType } = pusher
  return {
    data: getIData(feedCreations), isLoading: getIsLoading(feedCreations), error: getError(feedCreations), totalCount: getTotalCount(feedCreations), PusherData, action, updatedNID, activityType, showAudioPlayer, Audios, isUserLoggedIn, userInfo, categoryItems
  }
}

const mapdispatchTOProps = dispatch => ({
  fetchFeedCreations: (payload, apiType, headers, refreshList) => dispatch(fetchFeedCreations(payload, apiType, headers, refreshList)),
  openAudioPlayerMiniView: (payload) => dispatch(openAudioPlayerMiniView(payload)),
  clearCreationsOnCategoryChangeFeed: (payload) => dispatch(clearCreationsOnCategoryChangeFeed(payload))
})

export const withFeedCreations = Component =>
  connect(mapStateToProps, mapdispatchTOProps)(Component)
