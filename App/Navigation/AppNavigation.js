import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { Easing, Animated } from 'react-native'
import Colors from '../Styles/Colors'
import LoginScreen from '../Containers/Login/Login'
import styles from './Styles/NavigationStyles'

// Manifest of possible screens

const PrimaryNav = createStackNavigator({
  Login: { screen: LoginScreen }

}, {
  // Default config for all screens
  headerMode: 'float',
  mode: 'card',
  transitionConfig: () => ({
    transitionSpec: {
      duration: 600,
      easing: Easing.out(Easing.poly(8)),
      timing: Animated.timing,
      useNativeDriver: true
    },
    screenInterpolator: (sceneProps) => {
      const {layout, position, scene} = sceneProps

      const thisSceneIndex = scene.index
      const width = layout.initWidth

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex],
        outputRange: [width, 0]
      })

      return {transform: [{translateX}]}
    }
  }),
  initialRouteName: 'Login',
  unmountInactiveRoutes: true,
  navigationOptions: {
    cardStack: {
      gesturesEnabled: true
    },
    headerStyle: styles.header,
    tabBarVisible: true,
    gesturesEnabled: true
  }
})

export default createAppContainer(PrimaryNav)
