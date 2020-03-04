// import '../Config'
// import DebugConfig from '../Config/DebugConfig'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components/native'
import RootContainer from './RootContainer'
import createStore from '../Redux'
import { ActivityIndicator } from 'react-native'
import { PersistGate } from 'redux-persist/integration/react'

import theme from '../Styles/Colors'
import { errorHandler } from '../Utils'
import { setJSExceptionHandler, setNativeExceptionHandler } from 'react-native-exception-handler'
import TrackPlayer from 'react-native-track-player'
// setJSExceptionHandler(errorHandler, false)
// setNativeExceptionHandler((error) => console.log('Native Error', error), false, false)
// create our store
const ReduxStore = createStore()

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */

class App extends Component {
  shouldComponentUpdate (nextProps, nextState, nextContext) {
    return false
  }
  componentDidMount () {
    TrackPlayer.setupPlayer({ waitForBuffer: true }).then(() => {
      TrackPlayer.updateOptions({
        // Whether the player should stop running when the app is closed on Android
        stopWithApp: true,
        capabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_STOP,
          TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
          TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
          TrackPlayer.CAPABILITY_PAUSE
        ],

        // An array of capabilities that will show up when the notification is in the compact form on Android
        compactCapabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_STOP,
          TrackPlayer.CAPABILITY_PAUSE
        ]

      })
    })
  }

  render () {
    console.disableYellowBox = true
    // YellowBox.ignoreWarnings(['Remote debugger'])
    console.ignoredYellowBox = ['Setting a timer']
    return (
      <Provider store={ReduxStore.store}>
        <ThemeProvider theme={theme}>
          <PersistGate loading={<ActivityIndicator style={{top: '45%'}} animating color={theme.appColor} size='large' />} persistor={ReduxStore.persistor}>
            <RootContainer />
          </PersistGate>
        </ThemeProvider>
      </Provider>
    )
  }
}

// allow reactotron overlay for fast design in dev mode
export default App
