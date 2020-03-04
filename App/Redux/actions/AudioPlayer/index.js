import {
  OPEN_AUDIO_PLAYER,
  CLOSE_AUDIO_PLAYER
} from '../../constants/Constants'
function closeAudioPlayer (requestPayload, apiType) {
  return {
    type: CLOSE_AUDIO_PLAYER,
    requestPayload
  }
}
function openAudioPlayer (requestPayload) {
  return {
    type: OPEN_AUDIO_PLAYER,
    requestPayload
  }
}
export function openAudioPlayerMiniView (requestPayload = {}) {
  if (requestPayload.open) {
    return (dispatch) => {
      dispatch(openAudioPlayer(requestPayload))
    }
  } else {
    return (dispatch) => {
      dispatch(closeAudioPlayer(requestPayload))
    }
  }
}
