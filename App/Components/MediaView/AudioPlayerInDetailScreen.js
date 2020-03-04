import React from 'react'
import { View, ImageBackground, TouchableWithoutFeedback, TouchableOpacity, StyleSheet } from 'react-native'
import AudioPlayer from '../AudioPlayer/AudioPlayer'
import { withAudioPlayer } from '../../Redux/hoc/AudioPlayer/withAudioPlayer'
import AntDesign from 'react-native-vector-icons/AntDesign'
import TrackPlayer from 'react-native-track-player'
import Colors from '../../Styles/Colors'
class AudioPlayerInDetailScreen extends React.Component {
  state={
    paused: true
  }

  async componentDidMount () {
    this.props.openAudioPlayerMiniView({ open: true, audioData: this.props.item })
  }

  audioPlayerStatus=({ paused }) => {
    if (paused) {
      this.setState({ paused: true })
    } else {
      this.setState({ paused: false })
    }
  }
  async onPlay () {
    await TrackPlayer.play()
    this.setState({ paused: false })
  }
  async onPause () {
    await TrackPlayer.pause()
    this.setState({ paused: true })
  }

  render () {
    const { isShowingDetails, hideDetails, showDetails } = this.props
    console.log('playing state:::', this.state.paused)
    return (
      <TouchableWithoutFeedback onPress={() => isShowingDetails ? hideDetails() : showDetails()}>
        <ImageBackground style={{ height: '100%' }} source={{uri: 'https://kaltura-1470.wefiq.com/p/103/sp/10300/thumbnail/entry_id/0_5htwjigl/version/0'}}>
          {this.state.paused && isShowingDetails &&
            <TouchableOpacity onPress={() => this.onPlay()} style={styles.btnStyles}>
              <AntDesign name='playcircleo' color={Colors.appColor} size={150} />
            </TouchableOpacity>
            }
          { !this.state.paused && isShowingDetails &&
            <TouchableOpacity style={styles.btnStyles} onPress={() => this.onPause()}>
              <AntDesign name='pausecircleo' color={Colors.appColor} size={150} />
            </TouchableOpacity>
            }
          <View style={{position: 'absolute', bottom: 80, zIndex: 12}}>
            <AudioPlayer paused AudioList={this.props.item} miniPlayerColor='black' audioPlayerStatus={this.audioPlayerStatus} />
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>)
  }
}

const styles = StyleSheet.create({
  btnStyles: {
    alignSelf: 'center',
    top: '35%',
    zIndex: 20,
    position: 'absolute'
  }
})

export default withAudioPlayer(AudioPlayerInDetailScreen)
