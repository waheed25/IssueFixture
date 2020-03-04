import TrackPlayer from 'react-native-track-player'
const MAX_DATA_TO_SEARCH_FROM = 30

// TrackPlayer.addEventListener('playback-state', (playback) => {
//   // debugger
// })

export const playAudio = async (action, randomData, currentItem) => {
  const currentTrack = await TrackPlayer.getCurrentTrack()
  if (currentTrack !== null) {
    await TrackPlayer.reset()
    const trackData = filterAudioData(randomData, currentItem)
    await TrackPlayer.add(trackData)
    await TrackPlayer.play()
    action({ open: true, audioData: [currentItem] })
  } else {
    action({ open: true, audioData: [currentItem] })
  }
}

export const filterAudioData = (randomData, currentItem) => {
  let searchLength = randomData.length > MAX_DATA_TO_SEARCH_FROM ? MAX_DATA_TO_SEARCH_FROM : randomData.length
  let AudioArray = []
  AudioArray.push(currentItem)
  for (let i = 0; i < searchLength; i++) {
    if (randomData[i].attributes.media_type === '5' && randomData[i].id !== currentItem.id) {
      AudioArray.push(randomData[i])
    }
  }
  return formatDataForPlayer(AudioArray)
}

const formatDataForPlayer = (tracks) => {
  let audio = []
  for (let i = 0; i < tracks.length; i++) {
    const mediaData = JSON.parse(tracks[i].attributes.media_metadata)
    var singleObject = {
      id: tracks[i].id,
      url: mediaData.dataUrl,
      title: tracks[i].attributes.title,
      artist: tracks[i].attributes.user_data.name,
      artwork: mediaData.thumbnailUrl
    }
    audio.push(singleObject)
  }
  return audio
}
