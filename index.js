import App from './App/Containers/App'
import React from 'react'
import {
  View,
  PanResponder,
  NativeModules,
  AppRegistry
} from 'react-native'
import 'react-native-gesture-handler'
import Splash from 'react-native-splash-screen'
import TrackPlayer from 'react-native-track-player'
import { useScreens } from 'react-native-screens'
Splash.hide()
const DevMenuTrigger = ({children}) => {
  const {DevMenu} = NativeModules
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => {
      if (gestureState.numberActiveTouches === 3) {
        DevMenu.show()
      }
    }
  })
  return <View style={{flex: 1}} {...panResponder.panHandlers}><App /></View>
}
useScreens()
AppRegistry.registerComponent('Wefiq', () => DevMenuTrigger)
TrackPlayer.registerPlaybackService(() => require('./App/Utils/trackPlayer'))
