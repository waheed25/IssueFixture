import React from 'react'
import { Text, TouchableOpacity, View, AsyncStorage, StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'
import NavigationService from '../../Navigation/navigationService'
import { withAuth } from '../../Redux/hoc/withAuth/withAuth'
import Images from '../../Images/rootImages'
import CookieManager from 'react-native-cookies'
import Colors from '../../Styles/Colors'
import WefiqIcons from '../CustomIcons/CustomIcons'
import { hitSlop, DrawerHitSlop } from '../../Utils/hitslop'

class SideMenu extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      userInfo: null,
      isUserLoggedIn: false,
      userData: {}
    }
  }
  async componentWillMount () {
    await this.checkLoggedInUser().then((res) => this.setState({ userData: res }))
  }
  shouldComponentUpdate (nextProps, nextState, nextContext) {
    if (nextProps.userInfo !== this.props.userInfo || nextProps.isUserLoggedIn !== this.props.isUserLoggedIn || nextState !== this.state) {
      return true
    } else {
      return false
    }
  }
  // static navigationOptions = ({ navigation }) => ({
  //   drawerLockMode: 'locked-closed'});
  checkLoggedInUser = async () => {
    try {
      const self = this
      const data = await AsyncStorage.getItem('loginCredentials')
      if (data !== null) {
        self.setState({ isUserLoggedIn: true })
        return JSON.parse(data)
      }
    } catch (e) {
      console.log('error found::', e)
    }
  }
  userLogout=async () => {
    this.props.props.navigation.closeDrawer()
    await CookieManager.clearAll()
    await AsyncStorage.removeItem('loginCredentials')
    this.props.changeAuthStatus({ logout: true })
  }
  goToProfile=() => {
    this.props.props.navigation.closeDrawer()
    NavigationService.navigate('Profile', { ProfileInfo: this.props.userInfo })
  }
  goToSettings=() => {
    this.props.props.navigation.closeDrawer()
    NavigationService.navigate('Settings')
  }

  render () {
    const { isUserLoggedIn, userInfo } = this.props
    console.log('Drawer this.props', this.props)
    if (!isUserLoggedIn) {
      return (<View />)
    }
    if (isUserLoggedIn && userInfo !== null) {
      return (
        <View style={styles.root}>
          <View style={styles.list}>
            <FastImage style={styles.avatar}
              source={userInfo.picture_url ? { uri: userInfo.picture_url } : Images.defaultAvatar} />
            <Text style={styles.profileName}>{userInfo.full_name}</Text>
            <Text numberOfLines={2} style={styles.bio}>{userInfo.about}</Text>
            <View style={styles.countView}>
              <Text style={styles.countText}><Text
                style={{ color: 'rgba(64,64,64,1)' }}>{userInfo.followers_count}</Text> Followers</Text>

              <Text style={styles.countText}><Text style={{ color: 'rgba(64,64,64,1)' }}>{userInfo.followings_count}</Text> Following</Text>
            </View>
          </View>
          <DrawerItem icon={<WefiqIcons name='icons8-user' size={14} color={'#383838'} />} label='Profile'
            onPress={() => this.goToProfile()} />
          <DrawerItem onPress={() => this.goToSettings()} icon={<WefiqIcons name='shape' size={14} color={Colors.drawerIcon} />} label='Settings' />
          <DrawerItem icon={<WefiqIcons name='icons8-refresh' size={14} color={Colors.drawerIcon} />} label='Switch Account' />
          <DrawerItem icon={<WefiqIcons name='error-icon' size={14} color={Colors.drawerIcon} />} label='Terms of service' />
          <DrawerItem icon={<WefiqIcons name='icons8-information' size={14} color={Colors.drawerIcon} />} label='Help & Feedback' />
          <DrawerItem icon={<WefiqIcons name='icons8-information-copy' size={14} color={Colors.drawerIcon} />} label='About' />
          <DrawerItem icon={<WefiqIcons name='icons8-logout_rounded_up' size={14} color={Colors.drawerIcon} />} label='Logout'
            onPress={() => this.userLogout()} />
        </View>
      )
    }
    return (
      <View />)
  }
}

export default withAuth(SideMenu)

const DrawerItem = ({icon, label, onPress}) => (
  <TouchableOpacity hitSlop={DrawerHitSlop} onPress={onPress}>
    <View style={styles.drawerItem}>
      <View style={styles.drawerItemIconView}>{icon}</View>
      <Text style={styles.drawerItemText}>{label}</Text>
    </View>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  root: {
    marginTop: 30
  },
  list: {
    marginLeft: 25
  },
  avatar: {
    height: 70,
    width: 70,
    marginBottom: 10,
    borderRadius: 35
  },
  profileName: {
    fontSize: 16,
    fontFamily: 'SourceSansPro-Regular',
    color: '#383838'
  },
  countView: {
    fontFamily: 'SourceSansPro-Regular',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
    marginBottom: 40,
    marginTop: 15
  },
  countText: {
    fontFamily: 'SourceSansPro-Regular',
    color: '#9B9B9B',
    fontSize: 16
  },
  drawerItem: {
    paddingLeft: 20,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#f3f3f3',
    height: 50,
    alignItems: 'center'
  },
  drawerItemText: {
    color: '#404040',
    marginLeft: 20,
    fontSize: 16,
    fontFamily: 'SourceSansPro-Regular'
  },
  drawerItemIconView: {
    width: 20,
    alignItems: 'center'
  },
  bio: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 14,
    color: 'gray',
    width: '90%'
  }
})
