import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import ReduxPersist from '../Config/ReduxPersist'
import { connectingToPusher } from '../Redux/actions/Pusher/connectPusher'
import { changeAuthStatus } from '../Redux/actions/Auth/Auth'
import AudioPlayer from '../Components/AudioPlayer/AudioPlayer'
// Styles
import styles from './Styles/RootContainerStyles'
class RootContainer extends Component {
  constructor (props) {
    super(props)
    props.connectToPusher()
  }
  async componentDidMount () {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }
    // const data = await AsyncStorage.getItem('loginCredentials')
    // if (data !== null) {
    //   this.props.changeAuthStatus({ login: true, loginData: data })
    // }

    // this.netinfoUnsubscribe = NetInfo.addEventListener(state => this.handleConnectionStatusChanged(state))
  }
  // componentWillUnmount () {
  //   if (this.netinfoUnsubscribe) {
  //     this.netinfoUnsubscribe()
  //     this.netinfoUnsubscribe = null
  //   }
  // }
  // handleConnectionStatusChanged=(state) => {
  //   if (!state.isConnected) {
  //     setTimeout(() => Alert.alert('Please check your internet connection'), 100)
  //   }
  // }
  // shouldComponentUpdate (nextProps, nextState, nextContext) {
  //   if (this.props.startup === nextProps) return false
  // }
  shouldComponentUpdate (nextProps, nextState) {
    if (nextProps.showAudioPlayer !== this.props.showAudioPlayer) {
      return true
    } else { return false }
  }
  render () {
    return (
      <View style={{flex: 1}}>
        <StatusBar hidden />
        <ReduxNavigation />
        { this.props.showAudioPlayer &&
        <AudioPlayer AudioList={this.props.Audios} />
        }
      </View>
    )
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup()),
  connectToPusher: () => dispatch(connectingToPusher()),
  changeAuthStatus: () => dispatch(changeAuthStatus())
})
const mapStateToProps = (state) => {
  const { showAudioPlayer, Audios } = state.audioPlayer
  return { showAudioPlayer, Audios }
}

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)
