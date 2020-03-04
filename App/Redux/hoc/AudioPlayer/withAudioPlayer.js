import { connect } from 'react-redux'
import { openAudioPlayerMiniView } from '../../actions/AudioPlayer'

const mapStateToProps = ({ creations, audioPlayer, pusher, auth }) => {
  const { showAudioPlayer, Audios } = audioPlayer
  const { isUserLoggedIn, userInfo } = auth

  return {
    showAudioPlayer, Audios, isUserLoggedIn, userInfo
  }
}

const mapdispatchTOProps = dispatch => ({
  openAudioPlayerMiniView: (payload) => dispatch(openAudioPlayerMiniView(payload))
})

export const withAudioPlayer = Component =>
  connect(mapStateToProps, mapdispatchTOProps)(Component)
