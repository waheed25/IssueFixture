import React from 'react'
import Video from 'react-native-video-player'
import { StyleSheet, View, ActivityIndicator, TouchableWithoutFeedback } from 'react-native'

export default class VideoPlayer extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      paused: true
    }
  }

  loadStart=() => (<ActivityIndicator size='large' color='#2AAAD2' />)
  render () {
    const { isShowingDetails, hideDetails, showDetails } = this.props
    return (
      <TouchableWithoutFeedback onPress={() => isShowingDetails ? hideDetails() : showDetails()}>
        <View style={styles.container}>
          <Video
            controls
            video={{ uri: this.props.url }}   // Can be a URL or a local file.
            ref={(ref) => {
              this.player = ref
            }}
            pictureInPicture
        // paused={this.state.paused}
            onLoadStart={this.loadStart}// Store reference
            onBuffer={this.onBuffer}                // Callback when remote video is buffering
        // onError={this.videoError}               // Callback when video cannot be loaded
            style={styles.backgroundVideo}
          // resizeMode='cover'
            useTextureView={false}
           />
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  backgroundVideo: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
    height: 300,
    width: 380
  },
  container: {
    justifyContent: 'center',
    // alignItems: 'center',
    flex: 1
  }
})
