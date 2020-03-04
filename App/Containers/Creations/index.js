'use strict'
import React from 'react'
import { View, Image, AsyncStorage, StyleSheet } from 'react-native'
import Header from '../../Components/Header/Header'
import WefiqIcons from '../../Components/CustomIcons/CustomIcons'
import TopTabs from '../../Components/TopTabBar/TopTabBar'
import NavigationService from '../../Navigation/navigationService'
import SplashScreen from 'react-native-splash-screen'
import Images from '../../Images/rootImages'
import { UnselectCategory } from '../../Utils/helperFunctions'
import { withAuth } from '../../Redux/hoc/withAuth/withAuth'
import { withCategoriesSelection } from '../../Redux/hoc/withCategoriesSelection/withCategoriesSelection'
import whyDidYouRender from '@welldone-software/why-did-you-render'
import slowlog from 'react-native-slowlog'
import SelectedCategoryItem from '../../Components/CateforiesItem/SelectedCategories'
import { appStyles } from '../../Styles/CommonStyles'
import Video from 'react-native-video'
whyDidYouRender(React, {
  onlyLogs: true,
  titleColor: 'green',
  diffNameColor: 'aqua'
})
class HomeScreen extends React.Component {
  // static whyDidYouRender = true
  constructor (props) {
    super(props)
    this.state = {
      isUserLoggedIn: false,
      userData: null
    }
    slowlog(this, /.*/)
  }
  static navigationOptions = {
    header: null
  };
  checkLoggedInUser = async () => {
    try {
      const self = this
      const data = await AsyncStorage.getItem('loginCredentials')
      if (data !== null) {
        // TODO :: this causing extra rendering find a proper place to dispatch this action
        this.props.changeAuthStatus({ login: true, loginData: JSON.parse(data) })
        self.setState({ isUserLoggedIn: true })
        return JSON.parse(data)
      }
    } catch (e) {
      console.log('error found::', e)
    }
  }
  async componentDidMount () {
    SplashScreen.hide()
    await this.checkLoggedInUser().then((res) => this.setState({ userData: res }))
    this.props.navigation.setParams({ chooseRoute: this.chooseRoute, url: this.props.userInfo.picture_url, isUserLoggedIn: this.props.isUserLoggedIn })
  }
  // shouldComponentUpdate (nextProps, nextState, nextContext) {
  //   if (nextProps.isUserLoggedIn !== this.props.isUserLoggedIn || nextProps !== this.props.userInfo || nextState.isUserLoggedIn !== this.state.isUserLoggedIn || nextState.userData !== this.state.userData) {
  //     return true
  //   } else {
  //     return false
  //   }
  // }
  onChangeLoginState=(state, data) => {
    this.setState({ isUserLoggedIn: state, userData: data })
  }
  // componentWillReceiveProps (nextProps, nextContext) {
  //   if (nextProps.userInfo !== this.props.userInfo) { this.props.navigation.setParams({ chooseRoute: this.chooseRoute, url: nextProps.userInfo.picture_url, isUserLoggedIn: nextProps.isUserLoggedIn }) }
  // }

  chooseRoute= async () => {
    const { isUserLoggedIn } = this.props
    if (!isUserLoggedIn) {
      NavigationService.navigate('Login', { transition: 'fromLeft', onChangeLoginState: this.onChangeLoginState })
    } else {
      this.props.navigation.openDrawer()
    }
  }
  logMeasurement = async (id, phase, actualDuration, baseDuration) => {
    // see output during DEV
    // if (__DEV__) console.log({id, phase, actualDuration, baseDuration})
  }
  componentWillReceiveProps (nextProps, nextContext) {
    if (nextProps.isUserLoggedIn !== this.props.isUserLoggedIn) {
      this.props.navigation.setParams({ isUserLoggedIn: nextProps.isUserLoggedIn, notificationCount: 20 })
    }
  }
  onRemovingAFilter=(id, index) => {
    let removeFilterIndex = this.props.categoryItems.filter((item) => item.id !== id)
    let updateList = UnselectCategory(id, this.props.initialCategoriesData)
    console.log('removeFilterIndex', removeFilterIndex)
    this.props.onCategoriesSelection({ categoryItems: removeFilterIndex, initialCategoriesData: updateList })
    this.props.clearCreationsOnCategoryChangeLatest()
    this.props.clearCreationsOnCategoryChangePopular()
  }

  render () {
    const { userData } = this.state
    const { isUserLoggedIn, userInfo } = this.props
    return (
      <View style={styles.rootView}>
        <Header leftIcon={
          <Image
            style={{ borderRadius: isUserLoggedIn ? 15 : 0, height: isUserLoggedIn ? 30 : 20, width: isUserLoggedIn ? 30 : 20 }}
            source={(isUserLoggedIn && userData) ? { uri: userInfo.picture_url } : Images.profile} />}
          leftIconPress={() => this.chooseRoute()}
          centerText={'Home'}
          rightSecondIcon={<WefiqIcons name='categories_icon' color='#000000' size={20} />}
          rightSecondIconPress={() => NavigationService.navigate('SelectCategories')}
          {...this.props} />
        { this.props.categoryItems.length > 0 && this.props.categoryItems[0].id !== 0 &&
          <View style={styles.selectedCategories}>
            <SelectedCategoryItem categoryItems={this.props.categoryItems} onRemovingAFilter={this.onRemovingAFilter} />
          </View>
        }
        <TopTabs />
      </View>
    )
  }
}
export default withCategoriesSelection(withAuth(HomeScreen))

const styles = StyleSheet.create({
  rootView: {
    flex: 1
  },
  leftIcon: {
    height: 40,
    width: 40,
    borderRadius: 20,
    top: 7
  },
  bottomSpace: {
    bottom: 5
  },
  headerCenterText: {
    ...appStyles.headerCenterText
  },
  selectedCategories: {
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15

  }
})
