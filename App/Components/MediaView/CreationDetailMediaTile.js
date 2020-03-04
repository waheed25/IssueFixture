import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text, AsyncStorage, ScrollView, TouchableWithoutFeedback, Platform, StatusBar, TextInput, Animated } from 'react-native'
import DeviceSizes from '../../Styles/DeviceSizes'
import VideoPlayer from '../VideoPlayer/VideoPlayer'
import CreationDetails from '../CreationDetails/CreationDetails'
import WeficIcons from '../CustomIcons/CustomIcons'
import Colors from '../../Styles/Colors'
import Feather from 'react-native-vector-icons/Feather'
import PusherSubscription from '../CreationTiles/pusherSubscription'
import { hitSlop } from '../../Utils'
import { appStyles } from '../../Styles/CommonStyles'
import WefiqBaseAPIs from '../../Services/data/base-api'
import { withAuth } from '../../Redux/hoc/withAuth/withAuth'
import LinearGradient from 'react-native-linear-gradient'
import FastImage from 'react-native-fast-image'
import Images from '../../Images/rootImages'
import Modal from 'react-native-modal'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import AudioPlayerForCreationDetail from './AudioPlayerInDetailScreen'
const IconsView = ({count, icon, onPress}) => (
  <TouchableOpacity onPress={onPress} hitSlop={hitSlop}>
    <View style={styles.horizontalView} accessible>
      {icon}
      <Text style={styles.stats}>{count}</Text>
    </View>
  </TouchableOpacity>
)

const commets = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
const Api = new WefiqBaseAPIs()
class CreationDetailMediaTile extends React.Component {
  state={
    isShowingDetails: true,
    isShowingDescriptionInDetailsMode: false,
    isShowingCommentModal: false
  }
  componentDidMount () {
    this.hideDetailsTimer = setTimeout(() => this.setState({ isShowingDetails: false }), 2000)
  }

  onLikeCreation= async (id) => {
    console.log('item is :::', id)
    if (!this.props.isUserLoggedIn) {
      return alert('User must be logged in to perform this action')
    }
    this.setState({ liked: true, unLiked: false })
    const dataToPost = { data: {
      attributes: { activity_type: 'like' },
      relationships: {
        content_entity: {
          data: {
            type: 'creation',
            id: id
          }
        }
      },
      type: 'activity'
    }
    }
    const userInfo = JSON.parse(await AsyncStorage.getItem('loginCredentials'))
    const headers = {
      Authorization: `Bearer ${userInfo.data.attributes.token}`,
      'content-type': 'application/vnd.api+json'
    }
    Api.createAPI({ url: '/activity', requestPayload: dataToPost, headers }).then((res) => {
      if (!res.ok) {
        alert('Something went wrong')
      }
    })
  }
  onUnlike=async (likedUuid) => {
    // if (!this.props.isUserLoggedIn) {
    //   return alert('User must be logged in to perform this action')
    // }
    // this.setState({ unLiked: true })
    const userInfo = JSON.parse(await AsyncStorage.getItem('loginCredentials'))
    const headers = {
      Authorization: `Bearer ${userInfo.data.attributes.token}`,
      'content-type': 'application/vnd.api+json'
    }
    Api.deleteAPI({ url: `/activity/${likedUuid}`, headers }).then((res) => {
      if (!res.ok) {
        alert('Something went wrong')
      }
    })
  }
  onRefiq=async(item) => {
    const dataToPost = {
      data: { attributes: { activity_type: 'refiq' },
        relationships: {
          content_entity: {
            data: {
              id: item.id,
              type: 'creation'
            }
          }
        },
        type: 'activity'
      }
    }
    const userInfo = JSON.parse(await AsyncStorage.getItem('loginCredentials'))
    const headers = {
      Authorization: `Bearer ${userInfo.data.attributes.token}`,
      'content-type': 'application/vnd.api+json'
    }
    Api.createAPI({ url: '/activity', requestPayload: dataToPost, headers }).then((res) => {
      if (!res.ok) {
        debugger
        alert(res.errors[0].detail)
      }
    }).catch(error => { debugger })
  }
  onUnRefiq= async (refiqedUuid) => {
    const { isUserLoggedIn } = this.props
    if (!isUserLoggedIn) {
      return alert('User must be logged in to perform this action')
    }
    const userInfo = JSON.parse(await AsyncStorage.getItem('loginCredentials'))
    const headers = {
      Authorization: `Bearer ${userInfo.data.attributes.token}`,
      'content-type': 'application/vnd.api+json'
    }
    Api.deleteAPI({ url: `/activity/${refiqedUuid}`, headers }).then((res) => {
      if (!res.ok) {
        alert('Something went wrong')
      }
    })
  }

  showDetails=() => {
    this.setState({ isShowingDetails: true })
    this.hideDetailsTimer = setTimeout(() => this.setState({ isShowingDetails: false }), 10000)
    // Animated.timing(                  // Animate over time
    //   this.state.fadeAnim,            // The animated value to drive
    //   {
    //     toValue: 1,                   // Animate to opacity: 1 (opaque)
    //     duration: 100,               // Make it take a while
    //     useNativeDriver: true
    //   }
    // ).start()
  }
  hideDetails=() => {
    this.setState({ isShowingDetails: false })
    // Animated.timing(                  // Animate over time
    //   this.state.fadeAnim,            // The animated value to drive
    //   {
    //     toValue: 0,                   // Animate to opacity: 1 (opaque)
    //     duration: 400,               // Make it take a while
    //     useNativeDriver: true
    //   }
    // ).start()
  }
  componentWillUnmount () {
    clearTimeout(this.hideDetailsTimer)
  }

  render () {
    const { item, mediaUrls, creationsList, index } = this.props
    console.log('media data', this.props)
    const { profile_name, picture_url } = item.attributes.user_data
    return (
      <PusherSubscription nid={item.attributes.drupalInternalNid} listName='creationDetail' data={creationsList} index={index}>
        <TouchableWithoutFeedback onPress={() => this.state.isShowingDetails ? this.hideDetails() : this.showDetails()}>
          <View style={{ height: DeviceSizes.DEVICE_HEIGHT }}>
            <StatusBar hidden />
            <Modal
              testID={'modalDescription'}
              isVisible={this.state.isShowingDescriptionInDetailsMode}
              swipeDirection={['up']}
              style={styles.descriptionDetailsModal}
              animationIn='slideInDown'
              animationOut='slideOutUp'
              propagateSwipe
              animationOutTiming={500}
              onSwipeComplete={() => this.setState({ isShowingDescriptionInDetailsMode: false })}
              onBackdropPress={() => this.setState({ isShowingDescriptionInDetailsMode: false })}
              onBackButtonPress={() => this.setState({ isShowingDescriptionInDetailsMode: false })}
            >
              <View style={styles.descriptionDetailsModalContainer}>
                <ScrollView style={styles.scroller}>
                  <TouchableOpacity>
                    <View style={{flex: 1, flexGrow: 1, paddingBottom: 50}}>
                      <Text style={styles.modalTitle}>{item.attributes.title}</Text>
                      <Text style={styles.descriptionText}>{item.attributes.body !== null && item.attributes.body.value}</Text>
                    </View>
                  </TouchableOpacity>
                </ScrollView>
                <View style={styles.swipeToClose} />
              </View>
            </Modal>
            <Modal
              testID={'modalComment'}
              isVisible={this.state.isShowingCommentModal}
              swipeDirection={['down']}
              style={styles.commentModal}
            // animationIn='slideOutUp'
            // animationOut='slideInDown'
              propagateSwipe
              animationOutTiming={500}
              onSwipeComplete={() => this.setState({ isShowingCommentModal: false })}
              onBackdropPress={() => this.setState({ isShowingCommentModal: false })}
              onBackButtonPress={() => this.setState({ isShowingCommentModal: false })}
          >
              <View>
                <View style={styles.commentModalContainer}>
                  <View style={styles.swipeToClose} />
                  <ScrollView style={styles.scroller}>
                    <TouchableOpacity>
                      <View style={{flex: 1, flexGrow: 1, paddingBottom: 50}}>
                        {commets.map((item, i) =>
                          <CommentView key={i} />
                      )
                      }
                      </View>
                    </TouchableOpacity>
                  </ScrollView>
                  <View style={{flexDirection: 'row', width: '100%', alignItems: 'center', marginLeft: 10, marginRight: 10}}>
                    <TouchableOpacity hitSlop={hitSlop}>
                      <MaterialIcons name='add-circle' color={Colors.Black} size={30} />
                    </TouchableOpacity>
                    <TextInput
                      style={styles.commentBox}
                      placeholder='write a comment'
              // onChangeText={text => onChangeText(text)}
              // value={value}
              />
                    <TouchableOpacity hitSlop={hitSlop}>
                      <Ionicons name='ios-send' color={Colors.appColor} size={30} />
                    </TouchableOpacity>
                  </View>
                  <KeyboardSpacer />
                </View>
              </View>
            </Modal>
            { this.state.isShowingDetails &&
            <LinearGradient colors={['rgba(0,0,0,0.00) 63%', 'rgba(0,0,0,0.86) 100%']} style={styles.gradient}>
              <View style={[styles.avatarDetails]}>
                <View style={styles.avatarDetails}>
                  <View>
                    <View style={{flexDirection: 'row', marginBottom: 10, marginTop: 5}}>
                      <FastImage style={styles.avatar} source={picture_url ? {uri: picture_url} : Images.defaultAvatar} />
                      <Text style={[styles.title]}>{profile_name}</Text>
                    </View>
                    <Text style={styles.name}>{item.attributes.title}</Text>
                    <TouchableOpacity onPress={() => this.setState({ isShowingDescriptionInDetailsMode: true })}>
                      <Text style={[ styles.title, { height: item.attributes.body !== null && item.attributes.body.value ? 40 : 0 } ]} numberOfLines={2}>{item.attributes.body !== null && item.attributes.body.value}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <TouchableWithoutFeedback hitSlop={hitSlop} style={styles.showOnTop} onPress={() => this.props.closeModal()}>
                <View style={styles.closeBtn}>
                  <AntDesign name='closecircle' color={Colors.Grey} size={30} />
                </View>
              </TouchableWithoutFeedback>
            </LinearGradient>
          }
            {
            item.attributes.media_type === '1' &&
              <VideoPlayer
                url={mediaUrls.dataUrl}
                hideDetails={this.hideDetails}
                showDetails={this.showDetails}
                isShowingDetails={this.state.isShowingDetails} />
          }
            {(item.attributes.media_type === '2') &&
            <CreationDetails
              imgUrl={mediaUrls.dataUrl}
              showSecondModal={this.props.showSecondModal}
              rel={item.relationships} data={item.attributes}
              closeModal={this.props.closeModal}
              Uuid={item.id}
              hideDetails={this.hideDetails}
              showDetails={this.showDetails}
              isShowingDetails={this.state.isShowingDetails}
          />
          }
            {(item.attributes.media_type === '5') &&
            <View>
              <AudioPlayerForCreationDetail
                item={[item]}
                hideDetails={this.hideDetails}
                showDetails={this.showDetails}
                isShowingDetails={this.state.isShowingDetails}
            />
            </View>

          }
            {this.state.isShowingDetails &&
            <View style={[styles.iconView, { bottom: Platform.OS === 'android' && 20 }]}>
              <IconsView
                count={item.attributes.comment_data !== null ? item.attributes.comment_data.comment_count : 0}
                icon={<WeficIcons name='comment' color='gray' size={18} />}
                onPress={() => this.setState({ isShowingCommentModal: true })}
            />
              <IconsView
                count={item.attributes.likes_count}
                icon={<WeficIcons name='like' color={item.attributes.liked_uuid !== null ? 'red' : Colors.Grey}
                  size={18} />}
                onPress={() => item.attributes.liked_uuid !== null ? this.onUnlike(item.attributes.liked_uuid) : this.onLikeCreation(item.id)}
            />
              <IconsView
                count={item.attributes.refiqes_count}
                icon={<WeficIcons name='refiq'
                  color={item.attributes.refiqed_uuid !== null ? Colors.appColor : Colors.Grey}
                  size={18} />}
                onPress={() => item.attributes.refiqed_uuid !== null ? this.onUnRefiq(item.attributes.refiqed_uuid) : this.onRefiq(item)}
            />
              <IconsView
                count={item.attributes.viewsCount}
                icon={<Feather name='share' size={25} color={'gray'} />}
                onPress={() => alert('hi')}
            />
            </View>
          }
          </View>
        </TouchableWithoutFeedback>
      </PusherSubscription>

    )
  }
}
export default withAuth(CreationDetailMediaTile)

const CommentView = ({ imggURL, authorName, comment, time }) => (
  <View style={styles.commentItem}>
    <View style={styles.horizontalView}>
      <FastImage style={styles.commentAvatar} source={{ uri: 'https://facebook.github.io/react-native/img/tiny_logo.png' }} />
      <View style={styles.commentContainer}>
        <Text style={styles.commentAuthor}>Sahil Iqbal <Text style={styles.commentTime}> 11h</Text></Text>
        <Text style={styles.comment}>This is a test Comment for development purpose</Text>
      </View>
    </View>
  </View>
)

const styles = StyleSheet.create({
  closeBtn: {
    top: 5,
    right: 20,
    position: 'absolute',
    zIndex: 12
  },
  showOnTop: {
    zIndex: 100
  },
  commentTime: {
    ...appStyles.defaultFontFamily,
    color: Colors.WefiqText
  },
  commentItem: {
    height: 35,
    marginBottom: 15,
    marginTop: 15
  },
  commentContainer: {
    marginLeft: 10
  },
  comment: {
    ...appStyles.defaultFontFamily,
    fontSize: 14
  },
  commentAuthor: {
    ...appStyles.commonFontSemiBold,
    fontSize: 14
  },
  commentAvatar: {
    height: 35,
    width: 35,
    borderRadius: 17.5
  },
  iconView: {
    flexDirection: 'row',
    marginTop: 10,
    width: '100%',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 10,
    zIndex: 10
  },
  horizontalView: {
    ...appStyles.horizontalView
  },
  stats: {
    ...appStyles.commonFont,
    marginLeft: 5,
    marginRight: 15
  },
  gradient: {
    position: 'absolute',
    top: 10,
    zIndex: 2,
    width: '100%'
    // height: '100%'
  },
  avatar: {
    borderWidth: 1,
    borderColor: Colors.appColor,
    borderRadius: 10,
    height: 20,
    width: 20
  },
  avatarDetails: {
    flexDirection: 'row',
    zIndex: 12,
    paddingLeft: 15,
    paddingTop: 0
  },
  name: {
    ...appStyles.defaultFontFamilyBold,
    ...appStyles.whiteFontColor,
    margin: 0,
    fontSize: 16,
    left: 8
  },
  modalTitle: {
    ...appStyles.defaultFontFamilyBold,
    ...appStyles.defaultFontColor,
    margin: 10,
    fontSize: 16
  },
  title: {
    ...appStyles.commonFont,
    width: DeviceSizes.DEVICE_WIDTH * 0.7,
    marginLeft: 10
  },
  descriptionDetailsModal: {
    justifyContent: 'flex-start',
    margin: 0
  },
  commentModal: {
    justifyContent: 'flex-end',
    margin: 0
  },
  descriptionText: {
    ...appStyles.defaultFontFamily,
    ...appStyles.WefiqSecondary,
    // width: DeviceSizes.DEVICE_WIDTH * 0.8,
    marginLeft: 10
  },
  descriptionDetailsModalContainer: {
    height: DeviceSizes.DEVICE_HEIGHT * 0.75,
    backgroundColor: 'white',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    alignItems: 'center'
  },
  commentModalContainer: {
    height: DeviceSizes.DEVICE_HEIGHT * 0.90,
    backgroundColor: 'white',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingBottom: 10
  },
  swipeToClose: {
    paddingTop: 2.5,
    paddingBottom: 2.5,
    marginTop: 5,
    width: '18%',
    borderRadius: 10,
    backgroundColor: '#D1D1D1',
    marginBottom: 5,
    alignSelf: 'center'
  },
  scroller: {
    flex: 1,
    paddingTop: 40,
    paddingLeft: 15,
    paddingRight: 40,
    flexGrow: 1
  },
  commentBox: {
    height: 30,
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 20,
    width: '75%',
    borderColor: Colors.WefiqText,
    marginLeft: 10,
    marginRight: 10,
    ...appStyles.defaultFontFamily

  }

})
