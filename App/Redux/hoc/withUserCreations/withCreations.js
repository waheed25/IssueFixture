import { connect } from 'react-redux'
import { fetchUserCreations, clearUserCreations } from '../../actions/UserCreations/creations'
import { openAudioPlayerMiniView } from '../../actions/AudioPlayer'

const mapStateToProps = ({ userCreations }) => {
  const { userCreationsData, isLoading, error, totalCount } = userCreations
  return {
    userCreationsData, isLoading, error, totalCount
  }
}

const mapdispatchTOProps = dispatch => ({
  fetchUserCreationsData: (payload, apiType) => dispatch(fetchUserCreations(payload, apiType)),
  clearList: (payload, apiType) => dispatch(clearUserCreations(payload, apiType)),
  openAudioPlayerMiniView: (payload) => dispatch(openAudioPlayerMiniView(payload))

})

export const withCreations = Component =>
  connect(mapStateToProps, mapdispatchTOProps)(Component)
