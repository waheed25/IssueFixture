import {
  OPEN_AUDIO_PLAYER,
  CLOSE_AUDIO_PLAYER
} from '../../constants/Constants'

const initialState = {
  showAudioPlayer: false,
  Audios: [],
  audioCount: 0
}

export default function (state = initialState, action) {
  switch (action.type) {
    case OPEN_AUDIO_PLAYER:
      {
        return {
          ...state,
          Audios: action.requestPayload.audioData,
          showAudioPlayer: true,
          error: false,
          totalCount: action.requestPayload.audioData.length
        }
      } case CLOSE_AUDIO_PLAYER:
      {
        return {
          ...state,
          showAudioPlayer: false,
          error: false
        }
      }
    default:
      return state
  }
}
