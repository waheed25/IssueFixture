import TrackPlayer from 'react-native-track-player'

module.exports = async function () {
  TrackPlayer.addEventListener('remote-play', async () => {
    await TrackPlayer.play()
  })

  TrackPlayer.addEventListener('remote-pause', async() => {
    await TrackPlayer.pause()
  })

  TrackPlayer.addEventListener('remote-next', async() => {
    await TrackPlayer.skipToNext()
  })

  TrackPlayer.addEventListener('remote-previous', async() => {
    await TrackPlayer.skipToPrevious()
  })

  TrackPlayer.addEventListener('remote-stop', async () => {
    await TrackPlayer.stop()
  })

  TrackPlayer.addEventListener('playback-queue-ended', () => {
    // TrackPlayer.destroy()
  })
  // TrackPlayer.addEventListener('playback-state', () => {
  //   // TrackPlayer.destroy()
  // })
  // TrackPlayer.addEventListener('playback-error', () => {
  //   alert('Error while playing')
  // })
  // TrackPlayer.addEventListener('playback-track-changed', async () => {
  //   await TrackPlayer.reset()
  // })
}
