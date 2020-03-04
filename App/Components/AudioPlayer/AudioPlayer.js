import React from 'react'
import { StyleSheet, View, TouchableOpacity, ActivityIndicator, TouchableWithoutFeedback, Text } from 'react-native'
import * as _ from 'underscore'
import Slider from '@react-native-community/slider'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import ProgressBar from '../../Components/MediaView/ProgressBar'
import TrackPlayer, { ProgressComponent, TrackPlayerEvents } from 'react-native-track-player'
import { useTrackPlayerEvents } from 'react-native-track-player/lib/hooks'
import Colors from '../../Styles/Colors'
import DeviceSizes from '../../Styles/DeviceSizes'
import { hitSlop, hitSlopAudioPlayer } from '../../Utils/hitslop'
import Modal from 'react-native-modal'
import FastImage from 'react-native-fast-image'
import Images from '../../Images/rootImages'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { formatTime, convertMinutesIntoSeconds } from '../../Utils/formateTime'
import { withCreations } from '../../Redux/hoc/withCreations/withCreations'
import { filterAudioData } from '../../Utils/audioPlayerUtilities'
import { appStyles } from '../../Styles/CommonStyles'
import NavigationService from '../../Navigation/navigationService'
class ProgressSlider extends ProgressComponent {
  constructor (props) {
    super(props)
    this.state = {
      sliderPosition: 0
    }
  }
  async onValueChange (value) {
    this.setState({ sliderPosition: value })
    await TrackPlayer.seekTo(value)
  }
  onSlidingStart=() => {
    this.setState({ sliding: true })
  }
  onSlidingComplete=() => {
    this.setState({ sliding: false })
  }
  render () {
    const position = formatTime(Math.floor(this.state.position))
    const duration = formatTime(Math.floor(this.state.duration))
    return (
      <View>
        <Slider
          style={{width: DeviceSizes.DEVICE_WIDTH * 0.9, height: 40}}
          minimumValue={0}
          maximumValue={isNaN(convertMinutesIntoSeconds(duration)) ? 0 : convertMinutesIntoSeconds(duration)}
          thumbTintColor={Colors.appColor}
        // trackImage={Images.uploadButton}
          minimumTrackTintColor={Colors.appColor}
          maximumTrackTintColor={Colors.LightGrey}
          step={1}
          value={isNaN(convertMinutesIntoSeconds(position)) ? 0 : convertMinutesIntoSeconds(position)}
          onValueChange={value => this.onValueChange(value)}
          onSlidingStart={this.onSlidingStart}
          onSlidingComplete={this.onSlidingComplete}
      />
        <View style={styles.audioTime}>
          <Text>{this.state.sliding ? formatTime(this.state.sliderPosition) : position }</Text>
          <Text>{duration}</Text>
        </View>
      </View>
    )
  }
}

class AudioPlayer extends React.Component {
  AudioList=[]
  formattedData= []
  constructor (props) {
    super(props)
    this.state = {
      paused: false,
      viewDetailsMode: false,
      currentTrackTitle: '',
      currentArtist: '',
      pictureUrl: ''
    }
    this.AudioList = props.AudioList
  }

  formatDataForPlayer=(tracks) => {
    for (let i = 0; i < tracks.length; i++) {
      const mediaData = JSON.parse(tracks[i].attributes.media_metadata)
      var singleObject = {
        id: tracks[i].id,
        url: mediaData.dataUrl,
        title: tracks[i].attributes.title,
        artist: tracks[i].attributes.user_data.name,
        artwork: mediaData.thumbnailUrl
      }
      this.formattedData.push(singleObject)
    }
    return this.formattedData
  }
  // shouldComponentUpdate (nextProps, nextState, nextContext) {
  //   if (this.props.AudioList !== nextProps.AudioList || this.state !== nextState) {
  //     debugger
  //     return true
  //   } else {
  //     return false
  //   }
  // }
  // async componentDidUpdate (prevProps, prevState, snapshot) {
  //   if (prevProps.AudioList !== this.props.AudioList) {
  //     debugger
  //     await TrackPlayer.reset()
  //     await TrackPlayer.add(this.formatDataForPlayer(this.props.AudioList))
  //     await TrackPlayer.play()
  //   }
  // }
  async componentDidMount () {
    TrackPlayer.addEventListener('playback-state', (playBack) => {
      if (playBack.state === 'playing' || playBack.state === 3) {
        this.setState({ paused: false })
      } else {
        this.setState({ paused: true })
      }
    })
    TrackPlayer.addEventListener('playback-track-changed', async (playBack) => {
      const id = await TrackPlayer.getCurrentTrack()
      // alert('id', id)
      if (id) {
        const currentTrack = await TrackPlayer.getTrack(id)
        this.setState({ currentTrackTitle: currentTrack.title, currentArtist: currentTrack.artist, pictureUrl: currentTrack.artwork })
      }
    })
    const tracks = this.formatDataForPlayer(this.AudioList)
    await TrackPlayer.add(tracks)
    if (this.props.paused) {
      await TrackPlayer.pause()
    }
    this.setState({ paused: false })
    const id = await TrackPlayer.getCurrentTrack()
      // alert('id', id)
    if (id) {
      const currentTrack = await TrackPlayer.getTrack(id)
      this.setState({ currentTrackTitle: currentTrack.title, currentArtist: currentTrack.artist, pictureUrl: currentTrack.artwork })
    }
  }
  onPause=async () => {
    this.setState({ paused: true })
    await TrackPlayer.pause()
    if (this.props.audioPlayerStatus) {
      this.props.audioPlayerStatus({ paused: true })
    }
  }
  onPlay=async () => {
    this.setState({ paused: false })
    await TrackPlayer.play()
    if (this.props.audioPlayerStatus) {
      this.props.audioPlayerStatus({ paused: false })
    }
  }
  closePlayer= async () => {
    await TrackPlayer.reset()
    this.props.openAudioPlayerMiniView({ open: false })
    this.setState({ viewDetailsMode: false })
  }
  onSkipNext = async () => {
    await TrackPlayer.skipToNext()
  }
  onSkipToPrevious=async () => {
    await TrackPlayer.skipToPrevious()
    const id = await TrackPlayer.getCurrentTrack()
    if (id) {
      const currentTrack = await TrackPlayer.getTrack(id)
      this.setState({ currentTrackTitle: currentTrack.title, currentArtist: currentTrack.artist, pictureUrl: currentTrack.artwork })
    }
  }
  onNavigateToProfile =(name) => {
    this.setState({ viewDetailsMode: false })
    NavigationService.navigate('Profile', { ProfileInfo: { name } })
  }
  loadStart=() => (<ActivityIndicator size='large' color='#2AAAD2' />)
  closeDetailsMode=() => {
    this.setState({ viewDetailsMode: false })
  }
  openDetailMode=() => {
    this.setState({viewDetailsMode: true})
  }
  render () {
    console.log('this.state.currentArtist', this.state.currentArtist)
    const { miniPlayerColor } = this.props
    return (
      <TouchableWithoutFeedback onPress={() => this.openDetailMode()}>
        <View style={[styles.AudioPlayerView, { backgroundColor: miniPlayerColor }]}>
          <TouchableOpacity hitSlop={hitSlopAudioPlayer} onPress={() => this.closePlayer()} style={styles.showOnTop}>
            <View style={styles.closeBtn}>
              <EvilIcons name='close' size={25} colro={Colors.WefiqIcon} />
            </View>
          </TouchableOpacity>
          <ProgressBar audioName={this.state.currentTrackTitle} profileName={this.state.currentArtist} miniView />
          <Modal
            hideModalContentWhileAnimating
            style={styles.AudioPlayer}
            isVisible={this.state.viewDetailsMode}
            animationOut='bounceOutDown'
            onSwipeComplete={() => this.closeDetailsMode()}
            swipeDirection='down'
            onBackdropPress={() => this.closeDetailsMode()}
            onBackButtonPress={() => this.closePlayer()}
            swipeThreshold={50}
        >
            <AudioPlayerDetailView onNavigateToProfile={this.onNavigateToProfile} onSkipNext={this.onSkipNext} onSkipToPrevious={this.onSkipToPrevious} onPlay={this.onPlay} pictureUrl={this.state.pictureUrl} onPause={this.onPause} paused={this.state.paused} profileName={this.state.currentArtist} audioName={this.state.currentTrackTitle} />
          </Modal>
          { !this.props.notShowButton &&
            <TouchableOpacity hitSlop={hitSlopAudioPlayer} style={styles.playPauseIcon}
              onPress={() => !this.state.paused ? this.onPause() : this.onPlay()}>
                {this.state.paused &&
                <MaterialIcons name='play-circle-outline' color={Colors.appColor}
                  size={35} />
                }
                {!this.state.paused &&
                <MaterialIcons name='pause-circle-outline' color={Colors.appColor}
                  size={35} />
                }
            </TouchableOpacity>
          }
        </View>
      </TouchableWithoutFeedback>

    )
  }
}
export default withCreations(AudioPlayer)

const AudioPlayerDetailView = ({ paused, profileName, audioName, onPause, onPlay, pictureUrl, onSkipNext, onSkipToPrevious, onNavigateToProfile }) => {
  return (
    <View style={styles.audioPlayerRootView}>
      <FastImage source={Images.swipeToDismiss} style={styles.chevronDown} />
      <FastImage style={styles.thumbnail} source={pictureUrl ? {uri: pictureUrl} : Images.defaultAvatar} />
      <View style={[styles.horizontalView, styles.progressSpacing]}>
        <FontAwesome name='heart-o' size={25} />
        <TouchableOpacity onPress={() => onNavigateToProfile(profileName)}>
          <Text numberOfLines={1} style={styles.title}>{audioName}</Text>
          <Text numberOfLines={1} style={styles.name}>{profileName}</Text>
        </TouchableOpacity>
        <Feather name='share' size={25} />
      </View>
      <ProgressSlider />
      <View style={[styles.controlContainer, styles.horizontalView]}>
        <EvilIcons name='refresh' size={40} />
        <TouchableOpacity hitSlop={hitSlop} onPress={onSkipToPrevious}>
          <Feather name='skip-back' size={35} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => !paused ? onPause() : onPlay()} >
          <View>
            {paused &&
            <MaterialIcons name='play-circle-outline' color={Colors.appColor} size={70} />
          }
            { !paused &&
            <MaterialIcons name='pause-circle-outline' color={Colors.appColor} size={70} />
          }
          </View>
        </TouchableOpacity>
        <TouchableOpacity hitSlop={hitSlop} onPress={onSkipNext}>
          <Feather name='skip-forward' size={35} />
        </TouchableOpacity>
        <Feather name='shuffle' size={30} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  AudioPlayerView: {
    height: 45,
    width: DeviceSizes.DEVICE_WIDTH,
    backgroundColor: Colors.Black,
    // position: 'absolute',
    bottom: 0,
    zIndex: 10,
    flexDirection: 'row',
    elevation: 10
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
    // backgroundColor: 'black'
  },
  chevronDown: {
    height: 20,
    width: 40,
    marginBottom: 5
  },
  audioPlayerRootView: {
    height: 400,
    backgroundColor: 'white',
    zIndex: 10,
    alignItems: 'center',
    paddingTop: '1%',
    borderRadius: 10,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0

  },
  controlContainer: {
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
    paddingLeft: '5%',
    paddingRight: '5%'
  },
  songName: {
    color: Colors.White,
    position: 'absolute',
    bottom: 0,
    fontFamily: 'SourceSansPro-Regular',
    marginLeft: 20
  },
  AudioPlayer: {
    flex: 1,
    zIndex: 10,
    margin: 0,
    justifyContent: 'flex-end'
  },
  thumbnail: {
    height: 135,
    width: 135,
    borderRadius: 10
  },
  horizontalView: {
    flexDirection: 'row'
  },
  progressSpacing: {
    margin: 20,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'space-between',
    width: '100%'
  },
  title: {
    fontFamily: 'SourceSansPro-SemiBold',
    color: Colors.WefiqText,
    marginBottom: 5,
    textAlign: 'center',
    fontSize: 20,
    width: 250
  },
  name: {
    fontFamily: 'SourceSansPro-Regular',
    color: Colors.appColor,
    fontSize: 16,
    textAlign: 'center'
  },
  audioTime: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  showOnTop: {
    zIndex: 1
  },
  closeBtn: {
    ...appStyles.absolutePosition,
    left: 10,
    marginTop: 15,
    marginLeft: 10
  },
  playPauseIcon: {
    position: 'absolute',
    top: 6,
    right: 10
  }

})
