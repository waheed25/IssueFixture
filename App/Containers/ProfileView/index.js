import React from 'react'
import { Animated, Dimensions, Platform, Text, TouchableOpacity, View, PixelRatio, StyleSheet, ActivityIndicator } from 'react-native'
import { List, ListItem as Item, ScrollableTab, Tab, TabHeading, Tabs, Container, Content } from 'native-base'
import Profile from '../Profile/Profile'
import UserCreations from '../Profile/FetchUserCreations'
import Collections from '../../Containers/Collections'
import Refiqs from '../../Containers/Refiqs'
import Modal from 'react-native-modal'
import WefiqIcons from '../../Components/CustomIcons/CustomIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import DeviceSizes from '../../Styles/DeviceSizes'
import Colors from '../../Styles/Colors'
import AppStyles from '../../Themes/ApplicationStyles'
import { hitSlop, hitSlopCategoryCloseButton } from '../../Utils/hitslop'
import WefiqBaseAPIs from '../../Services/data/base-api'
import { withAuth } from '../../Redux/hoc/withAuth/withAuth'
import { headers } from '../../Utils/createHeaders'

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window')
const ratio = PixelRatio.get()
var IMAGE_HEIGHT = 200
if (ratio === 2) {
  IMAGE_HEIGHT = 240
}
if (ratio === 3) {
  IMAGE_HEIGHT = 200
}
if (ratio === 3.5) {
  IMAGE_HEIGHT = 250
}
const HEADER_HEIGHT = Platform.OS === 'ios' ? 54 : 55
const SCROLL_HEIGHT = IMAGE_HEIGHT - HEADER_HEIGHT
const THEME_COLOR = 'rgba(85,186,255, 1)'
const FADED_THEME_COLOR = 'rgba(85,186,255, 0.8)'
const Api = new WefiqBaseAPIs()
class ParallaxDemo extends React.Component {
  nScroll = new Animated.Value(0);
  scroll = new Animated.Value(0);
  textColor = this.scroll.interpolate({
    inputRange: [0, SCROLL_HEIGHT / 5, SCROLL_HEIGHT],
    outputRange: [THEME_COLOR, FADED_THEME_COLOR, '#2AAAD2'],
    extrapolate: 'clamp'
  });
  tabBg = this.scroll.interpolate({
    inputRange: [0, SCROLL_HEIGHT],
    outputRange: ['white', THEME_COLOR],
    extrapolate: 'clamp'
  });
  tabY = this.nScroll.interpolate({
    inputRange: [0, SCROLL_HEIGHT, SCROLL_HEIGHT + 1],
    outputRange: [0, 0, 1]
  });
  headerBg = this.scroll.interpolate({
    inputRange: [0, SCROLL_HEIGHT, SCROLL_HEIGHT + 1],
    outputRange: ['transparent', 'transparent', THEME_COLOR],
    extrapolate: 'clamp'
  });
  imgScale = this.nScroll.interpolate({
    inputRange: [-25, 0],
    outputRange: [1.1, 1],
    extrapolateRight: 'clamp'
  });
  imgOpacity = this.nScroll.interpolate({
    inputRange: [0, SCROLL_HEIGHT],
    outputRange: [1, 0]
  });
  tabContent = (x, i) => <View style={{height: this.state.height}}>
    <List onLayout={({nativeEvent: {layout: {height}}}) => {
      this.heights[i] = height
      if (this.state.activeTab === i) this.setState({height})
    }}>
      {new Array(x).fill(null).map((_, i) => <Item key={i}><Text>Item {i}</Text></Item>)}
    </List></View>;
  heights = [500, 500];
  state = {
    activeTab: 0,
    height: 500
  };

  constructor (props) {
    super(props)
    this.state = {
      visibleModal: false,
      renderList: false,
      userInfo: { },
      id: null
    }
    this.nScroll.addListener(Animated.event([{value: this.scroll}], {useNativeDriver: false}))
    // this.attributes = props.navigation.state.params.ProfileInfo
    this.name = props.navigation.state.params.ProfileInfo.name
    this.id = null
  }
  shouldComponentUpdate (nextProps, nextState, nextContext) {
    if (nextState !== this.state) {
      return true
    } else {
      return false
    }
  }
  InformationModal =() => {
    this.setState({
      visibleModal: !this.state.visibleModal
    })
  }
  static navigationOptions =({isUserLoggedIn, navigation}) => ({
    title: navigation.state.params.ProfileInfo.full_name || navigation.state.params.ProfileInfo.profile_name || navigation.state.params.ProfileInfo.fullName,
    headerRight: <TouchableOpacity hitSlop={hitSlopCategoryCloseButton} onPress={() => navigation.state.params.handleInformationModal()}><WefiqIcons name='info-icon' style={{marginRight: 20}} size={20} /></TouchableOpacity>,
    headerLeft: <TouchableOpacity hitSlop={hitSlopCategoryCloseButton} onPress={() => navigation.goBack()}><View style={styles.iconStyles}><WefiqIcons name='icons8-arrow_pointing_left' style={{marginLeft: 20}} size={15} /></View></TouchableOpacity>
  })
  componentDidMount () {
    this.props.navigation.setParams({
      handleInformationModal: this.InformationModal
    })
    this.getProfileInfo()
    // this.profileData = setTimeout(() => { this.setState({renderList: true}) }, 200)
  }
  // static navigationOptions = ({ navigation }) => ({
  //   header: null,
  //   headerMode: 'none'
  // });
  getProfileInfo=() => {
    debugger
    const url = `/wefiq/user/?user=${this.name}`
    Api.getAPI({url, headers: this.props.isUserLoggedIn && headers(this.props.userInfo.token)}).then((res) => {
      debugger
      console.log('res.data', res.normData)
      debugger
      this.setState({ userInfo: res.normData.attributes, renderList: true, id: res.normData.id })
    })
  }
  followUser=() => {
    debugger
    this.setState({ loading: true })
    const url = `/wefiq/follow/${this.state.id}`
    Api.createAPI({url, headers: headers(this.props.userInfo.token)}).then((res) => {
      console.log('follow user', res.data)
      this.getProfileInfo()
      this.setState({ loading: false })
    })
  }
  unFollowUser=() => {
    this.setState({ loading: true })
    const url = `/wefiq/follow/${this.state.userInfo.fellowship_uuid}`
    Api.deleteAPI({url, headers: headers(this.props.userInfo.token)}).then((res) => {
      console.log('Un follow user', res.data)
      this.getProfileInfo()
      this.setState({ loading: false })
    })
  }
  InfoHeader = ({text}) => (
    <Text style={styles.header}>{text}</Text>
  )
  InfoDetails = ({text, icon}) => (
    <View style={styles.alignHorizontal}>
      {icon}
      <Text style={styles.infoDetails}>{text}</Text>
    </View>
  )
  componentWillUnmount () {
    clearTimeout(this.profileData)
  }

  render () {
    const { timezone, drupal_internal__uid, refiqes_count, collections_count, creations_count, followers_count } = this.state.userInfo
    console.log('Profile Screen Root props', this.props)
    return (
      <Container>
        <Modal
          isVisible={this.state.visibleModal}
          onSwipeComplete={() => this.InformationModal()}
          swipeDirection={'up'}
          // animationIn='slideInDown'
          style={{ justifyContent: 'flex-end', margin: 0 }}
          onBackdropPress={() => this.InformationModal()}
          onBackButtonPress={() => this.InformationModal()}
        >
          <View style={styles.modalRootStyles}>
            {this.InfoHeader({ text: 'More Info' })}
            <View style={styles.divider} />
            <View style={AppStyles.darkLabelContainer}>
              {this.InfoHeader({ text: 'Location' })}
              {this.InfoDetails({ text: timezone, icon: <Entypo color={Colors.WefiqIcon} name='location-pin' size={20} /> })}
            </View>
            <View style={AppStyles.darkLabelContainer}>
              {this.InfoHeader({ text: 'Website' })}
              {this.InfoDetails({ text: 'Website Not Available Yet', icon: <SimpleLineIcons color={Colors.WefiqIcon} name='link' size={20} /> })}
            </View>
            <View style={AppStyles.darkLabelContainer}>
              {this.InfoHeader({ text: 'Stats' })}
              {this.InfoDetails({ text: 'Creation Views', icon: <Ionicons name='md-eye' size={20} color={Colors.WefiqIcon} /> })}
              {this.InfoDetails({ text: 'Likes', icon: <Ionicons color={Colors.WefiqIcon} name='md-heart' size={20} /> })}
            </View>
            <View style={AppStyles.darkLabelContainer}>
              {this.InfoHeader({ text: 'On The Web' })}
              <View style={styles.alignHorizontal}>
                <FontAwesome5 name='facebook' style={styles.iconSpacing} color={Colors.WefiqIcon} size={20} />
                <FontAwesome5 name='linkedin' style={styles.iconSpacing} color={Colors.WefiqIcon} size={20} />
                <FontAwesome5 name='twitter-square' style={styles.iconSpacing} color={Colors.WefiqIcon} size={20} />
              </View>
            </View>
          </View>
        </Modal>
        {/* <Animated.View style={{ position: 'absolute', width: '100%', backgroundColor: this.headerBg, zIndex: 1 }}> */}
        {/* <HeaderBar */}
        {/* leftIcon={<MaterialIcons name='arrow-back' color='#fff' style={{left: 10}} size={24} />} */}
        {/* leftIconPress={() => this.props.navigation.goBack()} */}
        {/* rightSecondIcon={<MaterialIcons name='mail' color='#fff' size={24} />} */}
        {/* rightFirstIcon={<MaterialIcons name='notifications' color='#fff' size={24} />} */}
        {/* rightFirstIconPress={() => this.props.navigation.navigate('Notifications')} */}
        {/* /> */}
        {/* </Animated.View> */}
        {!this.state.renderList && <ActivityIndicator style={{alignSelf: 'center', top: '50%'}} size='large' color={Colors.appColor} /> }
        {this.state.renderList &&
        <Animated.ScrollView
          nestedScrollEnabled
          // contentContainerStyle={{ flex: 0 }}
          scrollEventThrottle={5}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.nScroll } } }], { useNativeDriver: true })}
          >
          <Animated.View style={{
            marginTop: 10,
            transform: [{ translateY: Animated.multiply(this.nScroll, 0.65) }, { scale: this.imgScale }]
            // backgroundColor: THEME_COLOR
          }}>
            <Profile user={this.state.userInfo} userName={this.name} followUser={this.followUser} unFollowUser={this.unFollowUser} loading={this.state.loading} userId={this.state.id} />
            {/* <Animated.Image */}
            {/* source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Moraine_Lake_17092005.jpg'}} */}
            {/* style={{height: IMAGE_HEIGHT, width: '100%', opacity: this.imgOpacity}}> */}
            {/* /!* gradient *!/ */}
            {/* /!*<LinearGradient*!/ */}
            {/* /!*colors={['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.35)', 'rgba(255,255,255,0)']}*!/ */}
            {/* /!*locations={[0, 0.25, 1]}*!/ */}
            {/* /!*style={{position: 'absolute', height: '100%', width: '100%'}} />*!/ */}
            {/* </Animated.Image> */}
          </Animated.View>
          <Tabs
            prerenderingSiblingsNumber={1}
            onChangeTab={({ i }) => {
              this.setState({ height: this.heights[i], activeTab: i })
            }}
            renderTabBar={(props) => <Animated.View
              style={{ marginTop: 20, transform: [{ translateY: this.tabY }], zIndex: 1, width: '100%' }}>
              <ScrollableTab {...props}
                renderTab={(name, page, active, onPress, onLayout) => (
                  <TouchableOpacity key={page}
                    onPress={() => onPress(page)}
                    onLayout={onLayout}
                    activeOpacity={0.4}>
                    <Animated.View
                      style={{
                        flex: 1,
                        height: 100,
                        backgroundColor: 'white'
                      }}>
                      <TabHeading scrollable
                        style={{
                          backgroundColor: 'transparent',
                          width: SCREEN_WIDTH / 2
                        }}
                        active={active}>
                        <Animated.Text style={{
                          fontWeight: active ? 'bold' : 'normal',
                          color: this.textColor,
                          fontSize: 14,
                          top: Platform.OS === 'ios' ? 0 : 15
                        }}>
                          {name}
                        </Animated.Text>
                      </TabHeading>
                    </Animated.View>
                  </TouchableOpacity>
                             )}
                underlineStyle={{backgroundColor: Colors.appColor}}
              />
            </Animated.View>
            }>
            <Tab heading={`Creations (${creations_count})`}>
              <UserCreations id={drupal_internal__uid} />
            </Tab>
            <Tab heading={`Collections (${collections_count})`}>
              <Collections id={drupal_internal__uid} />
            </Tab>
            <Tab heading={`Refiq (${refiqes_count})`}>
              <Refiqs id={drupal_internal__uid} />
            </Tab>
          </Tabs>
        </Animated.ScrollView>
        }
      </Container>
    )
  }
}
// const Information =()=>()
export default withAuth(ParallaxDemo)
const styles = StyleSheet.create({
  modalRootStyles: {
    height: DeviceSizes.DEVICE_HEIGHT * 0.65,
    backgroundColor: '#fff',
    padding: 15
    // flex: 0.7
  },
  header: {
    fontWeight: 'bold',
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 16,
    color: Colors.WefiqText
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: Colors.GraySaldo,
    marginBottom: 10,
    marginTop: 10
  },
  alignHorizontal: {
    flexDirection: 'row',
    marginTop: 10
  },
  infoDetails: {
    fontSize: 14,
    color: Colors.WefiqText,
    fontWeight: '100',
    fontFamily: 'SourceSansPro-Regular',
    left: 5
  },
  iconSpacing: {
    marginLeft: 5
  },
  iconStyles: {
    height: 30,
    justifyContent: 'center'
  }
})
