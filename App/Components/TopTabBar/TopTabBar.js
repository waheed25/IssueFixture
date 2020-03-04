import {
  createAppContainer
} from 'react-navigation'
import {
  createMaterialTopTabNavigator
} from 'react-navigation-tabs'
import PopularCreations from '../../Containers/Creations/Creations'
import LatestCreations from '../../Containers/Creations/Latest'
import FeedCreations from '../../Containers/Creations/Feed'
import Colors from '../../Styles/Colors'
import DeviceSizes from '../../Styles/DeviceSizes'

const Home = createMaterialTopTabNavigator({
  Popular: {
    screen: PopularCreations,
    navigationOptions: ({navigation, focused}) => ({
      title: 'Popular'
    })
  },
  Latest: {
    screen: LatestCreations,
    navigationOptions: ({navigation}) => ({
      title: 'Latest'
    })
  },
  Feed: {
    screen: FeedCreations,
    navigationOptions: ({navigation}) => ({
      title: 'Feed'
    })
  }
}, {
  initialRouteName: 'Popular',
  tabBarPosition: 'top',
  // swipeEnabled: true, // change to test this bug
  animationEnabled: true,
  lazy: true,
  unmountInactiveRoutes: true,
  tabBarOptions: {
    activeTintColor: Colors.appColor,
    inactiveTintColor: 'gray',
    // scrollEnabled: true,
    tabStyle: {
      width: DeviceSizes.DEVICE_WIDTH * 0.3333333,
      marginBottom: 5,
      paddingBottom: 0,
      paddingLeft: 0,
      paddingRight: 0
    },
    upperCaseLabel: false,
    swipeEnabled: true,
    activeLabelStyle: {
      fontSize: 30
    },
    labelStyle: {
      fontSize: 16,
      fontFamily: 'SourceSansPro-Regular',
      marginLeft: 0,
      marginRight: 0
    },
    style: {
      backgroundColor: 'transparent',
      alignItem: 'center'
      // borderBottomWidth: 1,
      // borderBottomColor: '#DCDCDC'
      // shadowOpacity: 1,
      // shadowRadius: 5,
      // elevation: 0,
      // shadowOffset: {
      //   height: 5
      // }
    },
    indicatorStyle: {
      backgroundColor: Colors.appColor,
      width: '12%',
      marginLeft: DeviceSizes.DEVICE_WIDTH * 0.11
    }
  }
})

export default createAppContainer(Home)
