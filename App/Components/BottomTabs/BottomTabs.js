import React from 'react'
import { Text, View } from 'react-native'
import {
  createAppContainer
} from 'react-navigation'
import {
  createBottomTabNavigator
} from 'react-navigation-tabs'
import NotificationBadge from '../../Containers/Notifications/notificationViewForTabBar'
import WefiqIcon from '../../Components/CustomIcons/CustomIcons'
import HomeScreen from '../../Containers/Creations'
import Search from '../../Containers/Search'
import Notifications from '../../Containers/Notifications'
import Upload from '../../Containers/UploadCreation'
import Colors from '../../Styles/Colors'
import AntDesign from 'react-native-vector-icons/AntDesign'
class SearCategoriesch extends React.Component {
  shouldComponentUpdate (nextProps, nextState, nextContext): boolean {
    return false
  }
  render () {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {/* other code from before here */}
        <Text> here is Messages! </Text>
      </View>
    )
  }
}
export default createAppContainer(createBottomTabNavigator(
  {
    Home: HomeScreen,
    Search: Search,
    Upload: Upload,
    Notifications: Notifications,
    Categories: SearCategoriesch

  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state
        let iconName
        if (routeName === 'Home') {
          // iconName = `ios-information-circle${focused ? '' : '-outline'}`
          return <WefiqIcon name='wefiq-icon' style={IconSpace} size={22} color={focused ? Colors.appColor : Colors.BottomTabsIconColor} />
        } else if (routeName === 'Search') {
          // iconName = `ios-options${focused ? '' : '-outline'}`
          return <WefiqIcon name='search-icon' style={IconSpace} size={20} color={focused ? Colors.appColor : Colors.BottomTabsIconColor} />
        } else if (routeName === 'Upload') {
          iconName = `ios-options${focused ? '' : '-outline'}`
          return <WefiqIcon name='upload-icon' style={[IconSpace, {}]} size={25} color={focused ? Colors.appColor : Colors.BottomTabsIconColor} />
          // return <WefiqIcon name='add' size={22} color={focused ? '#2AAAD2' : 'gray'} />
        } else if (routeName === 'Notifications') {
          iconName = `ios-options${focused ? '' : '-outline'}`
          return <NotificationBadge focused={focused} />
        } else if (routeName === 'Categories') {
          iconName = `ios-options${focused ? '' : '-outline'}`
          return <WefiqIcon name='comments' style={IconSpace} size={22} color={focused ? Colors.appColor : Colors.BottomTabsIconColor} />
        }
        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <AntDesign name='like2' size={horizontal ? 20 : 25} color={tintColor} />
      }
    }
    ),
    tabBarOptions: {
      showLabel: false,
      activeTintColor: '#2AAAD2',
      inactiveTintColor: 'gray'
    },
    lazy: false
  },
  {labelStyle: {
    fontSize: 10,
    fontFamily: 'SourceSansPro-Regular',
    margin: 20
  }
  }, {

    lazy: false,
    unmountInactiveRoutes: true
  }
))
const IconSpace = {top: 1}
