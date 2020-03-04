import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity, TouchableHighlight, TouchableNativeFeedback, TouchableWithoutFeedback, Alert,
  Platform, TextInput, FlatList,
  Keyboard, Image,
  ImageBackground
} from 'react-native'
import FastImage from 'react-native-fast-image'
import { Card } from 'native-base'
import Wefiq from '../CustomIcons/CustomIcons'
import Sizes from '../../Styles/DeviceSizes'
import Colors from '../../Styles/Colors'
import _ from 'underscore'
import Images from '../../Images/rootImages/index'
import { withsubscribeChannel } from '../../Redux/hoc/withPusher/Pusher'
import { hitSlop, hitSlopMinor, hitSlopAudioPlayer } from '../../Utils/hitslop'
import NavigationService from '../../Navigation/navigationService'
import WefiqBaseAPIs from '../../Services/data/base-api'
import Modal from 'react-native-modal'
import { calculateTime } from '../../Utils/formateTime'
import PusherSubscription from './pusherSubscription'
import WefiqTouchableOpacity, { WefiqTouchableHighlight } from '../WefiqTouchables'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import { appStyles } from '../../Styles/CommonStyles'
import { fetchComment, likeParams, refiqParams, postAComment } from '../../Utils/params'
import { DefaultLoader } from '../Loader/Loader'
import { headers } from '../../Utils/createHeaders'
import moment from 'moment'
import WefiqAlert from '../Alert'
import { fetchCommentSerivce } from '../../Services/data/comment'
const Api = new WefiqBaseAPIs()
const customWidth = ''
const cardHeight = Sizes.DEVICE_HEIGHT * 0.42
const cardWidth = Sizes.DEVICE_WIDTH * 0.93
class CreationTiles extends React.Component {
  // static whyDidYouRender = true
  updated= false
  userInfo: []
  totalCommentsCount = 0
  constructor (props) {
    super(props)
    this.animatedValue = new Animated.Value(0)
    this.state = {
      updated: false,
      subscribedChannels: false,
      visibleModal: false,
      liked: false,
      unLiked: false,
      refiqed: false,
      unRefiqed: false,
      comments: [],
      loadingComments: true,
      changedLikesCount: parseInt(props.likes_count),
      changedRefiqsCount: parseInt(props.refiqes_count),
      scrollOffset: null,
      heightOfCommentBox: '90%'
    }
    this.listRef = React.createRef()
  }
  shouldComponentUpdate (nextProps, nextState, nextContext) {
    if (nextProps.item !== this.props.item || nextProps.likes_count !== this.props.likes_count || nextProps.refiqes_count !== this.props.refiqes_count || nextProps.views_count !== this.props.views_count || nextProps.uid !== this.props.uid || this.state !== nextState) {
      return true
    } else {
      return false
    }
  }
  componentDidMount () {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow
    )
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide
    )
  }
  _keyboardDidShow=() => {
    this.setState({heightOfCommentBox: '50%'})
  }

  _keyboardDidHide=() => {
    this.setState({heightOfCommentBox: '90%'})
  }
  componentWillUnmount () {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  onRefiq=async(drupalInternalNid) => {
    if (!this.props.isUserLoggedIn) {
      return WefiqAlert({ title: 'Oh no!!!', message: 'You must be LoggedIn to Refiq a creation', onOK: () => NavigationService.navigate('Login', { onChangeLoginState: () => null }) })
    }
    debugger
    if (this.isOwner(this.props.item.attributes.user_data.uid)) {
      return Alert.alert(
        'Oh no!!!',
        'You Cannot Refiq your own creation', // <- this part is optional, you can pass an empty string
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')}
        ],
        {cancelable: false}
      )
    }
    this.setState({ refiqed: true, unRefiqed: false, changedRefiqsCount: parseInt(this.props.refiqes_count) + 1 })
    Api.createAPI({ url: '/wefiq/activity', requestPayload: refiqParams(drupalInternalNid), headers: headers(this.props.token) }).then((res) => {
      if (!res.ok) {
        WefiqAlert({ title: 'Oh no!!!', message: res.errors[0].detail })
      }
    }).catch(error => { })
  }
  navigationToProfile (userInfo) {
    NavigationService.navigate('Profile', { ProfileInfo: userInfo })
  }

  onLikeCreation= async (drupalInternalNid) => {
    if (!this.props.isUserLoggedIn) {
      return WefiqAlert({ title: 'Oh no!!!', message: 'You must be LoggedIn to Like a creation', onOK: () => NavigationService.navigate('Login', { onChangeLoginState: () => null }) })
    }
    this.setState({ liked: true, unLiked: false, changedLikesCount: parseInt(this.props.likes_count) + 1 })
    Api.createAPI({ url: '/wefiq/activity', requestPayload: likeParams(drupalInternalNid), headers: headers(this.props.token) }).then((res) => {
      if (!res.ok) {
        WefiqAlert({ title: 'Oh no!!!', message: 'Unable to perform this action' })
      }
    })
  }

  onUnRefiq= async (drupalInternalNid) => {
    if (!this.props.isUserLoggedIn) {
      return WefiqAlert({ title: 'Oh no!!!', message: 'You must be LoggedIn to UnRefiq a creation', onOK: () => NavigationService.navigate('Login', { onChangeLoginState: () => null }) })
    }
    this.setState({ refiqed: false, unRefiqed: true, changedRefiqsCount: parseInt(this.props.refiqes_count) - 1 })
    Api.deleteAPI({ url: `/wefiq/activity/${drupalInternalNid}?activity_type=refiq`, headers: headers(this.props.token) }).then((res) => {
      if (!res.ok) {
        WefiqAlert({ title: 'Oh no!!!', message: 'Unable to perform this action' })
      }
    })
  }

  onUnlike=async (drupalInternalNid) => {
    if (!this.props.isUserLoggedIn) {
      return WefiqAlert({ title: 'Oh no!!!', message: 'You must be LoggedIn to UnLike a creation', onOK: () => NavigationService.navigate('Login', { onChangeLoginState: () => null }) })
    }
    this.setState({ unLiked: true, liked: false, changedLikesCount: parseInt(this.props.likes_count) - 1 })
    Api.deleteAPI({ url: `/wefiq/activity/${drupalInternalNid}?activity_type=like`, headers: headers(this.props.token) }).then((res) => {
      if (!res.ok) {
        WefiqAlert({ title: 'Oh no!!!', message: 'Unable to perform this action' })
      }
    })
  }
  onCommentTextChange=(comment) => {
    this.setState({ comment: comment })
  }
  onPostComment=(creationId, nid) => {
    const { userId } = this.props
    const { comment } = this.state
    this.setState({ comment: '' })
    Keyboard.dismiss()
    Api.createAPI({ url: '/wefiq/comment', headers: headers(this.props.token), requestPayload: postAComment(nid, userId, comment, creationId) }).then((res) => {
      debugger
      if (!res.ok) {
        WefiqAlert({ title: 'Oh no!!!', message: 'Unable to post a comment' })
      }
    }
    )
  }
  fetchComments=async() => {
    if (!this.props.isUserLoggedIn) {
      return WefiqAlert({ title: 'Oh no!!!', message: 'You must be LoggedIn to make a comment', onOK: () => NavigationService.navigate('Login', { onChangeLoginState: () => null }) })
    }
    this.setState({isShowingCommentModal: true})
    const commentsParams = fetchComment({ limit: 10, offset: 0, id: this.props.nid })
    const comments = await fetchCommentSerivce(commentsParams, '/wefiq/comment?')
    console.log('comments', comments)
    this.setState({ comments: comments.arrayOfComments, loadingComments: false })
    this.totalCommentsCount = comments.totalComments
  }
  updateCommentList=(comment) => {
    const makeASingleArray = this.state.comments.concat(comment.arrayOfComments)
    this.setState({ comments: makeASingleArray, comment: '' })
  }
  loadMoreComments=async() => {
    // if(this.state.comment.length < comments.totalComments) {
    const commentsParams = fetchComment({ limit: 10, offset: this.state.comments.length, id: this.props.nid })
    const comments = await fetchCommentSerivce(commentsParams, '/wefiq/comment?')
    this.setState({ comments: [...this.state.comments, ...comments.arrayOfComments], loadingComments: false })
    // }
  }

  onPublishUnPublish=(creationId) => {
    const dataToPost = [{ 'status': true, 'id': creationId }]
    this.setState({ showContextualMenu: false })
    Api.createAPI({ url: '/wefiq/upload/creations', headers: headers(this.props.token), requestPayload: dataToPost }).then((res) => {
      WefiqAlert({ title: 'Success', message: 'Creations is Published' })
      if (!res.ok) {
        WefiqAlert({ title: 'Oh no!!!', message: 'Unable to Publish', cancelable: false })
      }
    }
    )
  }
  onUnPublish=(creationId) => {
    const dataToPost = [{ 'status': false, 'id': creationId }]
    this.setState({ showContextualMenu: false })
    Api.createAPI({ url: '/wefiq/upload/creations', headers: headers(this.props.token), requestPayload: dataToPost }).then((res) => {
      WefiqAlert({ title: 'Success', message: 'Creations is UnPublished' })
      if (!res.ok) {
        WefiqAlert({ title: 'Oh no!!!', message: 'Unable to UnPublish', cancelable: false })
      }
    }
    )
  }
  deleteCreation=(creationId) => {
    this.setState({ showContextualMenu: false })
    Api.deleteAPI({ url: `/wefiq/delete/node/${creationId}`, headers: headers(this.props.token) }).then((res) => {
      if (!res.ok) {
        WefiqAlert({ title: 'Oh no!!!', message: 'Unable to Delete' })
      }
    }
    )
  }
  isOwner=(uid) => uid === this.props.uid

  handleOnScroll = event => {
    console.log('event', event.nativeEvent.contentOffset.y)
    this.scrollOffset = event.nativeEvent.contentOffset.y
    this.setState({
      scrollOffset: event.nativeEvent.contentOffset.y
    })
  };
  handleScrollTo = p => {
    console.log('p', p)
    // if (this.listRef.current) {
    //   this.listRef.current.scrollTo(p)
    // }
  };
  renderMediaIcon=(mediaType) => (<View style={styles.mediaIcon}>
    {mediaType === '1' && <Wefiq name='video' color='#fff' size={7} />}
    {mediaType === '2' && <Wefiq name='photo' color='#fff' size={7} />}
    {mediaType === '5' && <Wefiq name='music' color='#fff' size={7} />}
  </View>)
  handleContextualMenu=() => {
    this.setState({showContextualMenu: !this.state.showContextualMenu})
  }

  render () {
    console.log('tile props', this.props)
    const { item, metadata, handleOnPress, commentsCount, viewsCount, refiqesCount, isLoading, index, nid, listName, data } = this.props
    const { picture_url, name, uid } = item.attributes.user_data
    const { liked, unLiked, refiqed, unRefiqed, changedLikesCount, changedRefiqsCount } = this.state
    const improveImageQuality = metadata ? `${metadata.thumbnailUrl}${customWidth}` : ''
    return (
      <PusherSubscription nid={nid} listName={listName} data={data} index={index} uid={this.props.uid} updateCommentList={this.updateCommentList}>
        <WefiqTouchableOpacity
          onLongPress={() => this.handleContextualMenu()} underlayColor='transparent'
          onPress={() => item.attributes.media_type === '5' ? this.props.openAudioPlayer(item) : handleOnPress(item, index)}
        >
          <React.Fragment
        >{ this.state.showContextualMenu &&
        <Modal isVisible={this.state.showContextualMenu}
          style={{alignItems: 'center'}}
          onBackButtonPress={() => this.handleContextualMenu()}
          onBackdropPress={() => this.handleContextualMenu()}>
          <View style={styles.content}>
            { this.isOwner(uid) &&
              <ContextualMenuItem title='Edit' icon={<MaterialCommunityIcons name='pencil' size={20} />} />
            }
            { this.isOwner(uid) &&
            <ContextualMenuItem title='Delete'
              icon={<MaterialCommunityIcons name='delete' color={Colors.wefiqRed} size={20} />}
              onPress={() => this.deleteCreation(item.id)} />
            }
            <ContextualMenuItem title='Share' icon={<MaterialCommunityIcons name='share-variant' size={20} />} onPress={() => this.deleteCreation(item.id)} />
            <ContextualMenuItem title='Save' icon={<MaterialCommunityIcons name='bookmark' size={20} />} onPress={() => this.deleteCreation(item.id)} />
            { this.isOwner(uid) &&
            <ContextualMenuItem title={item.attributes.status === true ? 'UnPublish' : 'Publish'} icon={item.attributes.status === true ? <MaterialIcons name='lock' size={20} /> : <Ionicons name='md-globe' size={20} />}
              onPress={() => item.attributes.status === true ? this.onUnPublish(item.id) : this.onPublishUnPublish(item.id)}
            />
            }
          </View>
        </Modal>
          }
            { this.state.isShowingCommentModal &&
              <Modal
                hideModalContentWhileAnimating
                testID={'modalComment'}
                isVisible={this.state.isShowingCommentModal}
                swipeDirection={['down']}
                style={styles.commentModal}
                // animationIn='slideOutUp'
                // animationOut='slideInDown'
                // propagateSwipe
                avoidKeyboard
                useNativeDriver
                propagateSwipe
                animationOutTiming={500}
                // nestedScrollEnabled
                // scrollTo={this.handleScrollTo}
                // scrollOffset={this.scrollOffset}
                // scrollOffsetMax={150}
                // swipeThreshold={50}
                // animationOut='bounceOutDown'
                onSwipeComplete={() => this.setState({ isShowingCommentModal: false })}
                onBackdropPress={() => this.setState({ isShowingCommentModal: false })}
                onBackButtonPress={() => this.setState({ isShowingCommentModal: false })}
              >
                <View style={[styles.commentModalContainer]}>
                  <View style={styles.swipeToClose} />
                  { this.state.loadingComments && this.state.comments.length < 1 &&
                    <DefaultLoader />

                  }
                  {this.state.comments.length === 0 && !this.state.loadingComments &&
                    <View style={{ top: '10%', alignSelf: 'center' }}>
                      <Text style={styles.comment}>Be first to add comment on this creation</Text>
                    </View>
                    }
                  <FlatList style={styles.scroller}
                    data={this.state.comments}
                    ref={this.listRef}
                    onScroll={this.handleOnScroll}
                    // scrollEnabled={false}
                    // nestedScrollEnabled
                    // contentContainerStyle={{ paddingBottom: 50 }}
                    // onEndReached={_.debounce(this.loadMoreComments, 2000)}
                    keyExtractor={(item, index) => index.toString()}
                    initialNumToRender={10}
                    renderItem={({ item, index }) => {
                      return (
                        <TouchableWithoutFeedback>
                          <CommentView
                            comment={item.attributes.body.value}
                            authorName={item.attributes.userData.name}
                            time={moment(item.attributes.created).date()}
                            imgURL={item.attributes.user_data.picture_url}
                            key={index}
                            />
                        </TouchableWithoutFeedback>
                      )
                    }}
                    // ListFooterComponent={() => {
                    //   if (this.state.comments.length < this.totalCommentsCount) {
                    //     return (
                    //       <DefaultLoader />
                    //     )
                    //   } else { return null }
                    // }
                    // }
                      />
                  <View style={{
                    flexDirection: 'row',
                    width: '100%',
                    alignItems: 'center',
                    marginLeft: 10,
                    marginRight: 10
                  }}>
                    {/* <TouchableOpacity hitSlop={hitSlop}> */}
                    {/* <MaterialIcons name='add-circle' color={Colors.Black} size={30} /> */}
                    {/* </TouchableOpacity> */}
                    <TextInput
                      style={styles.commentBox}
                      placeholder='write a comment'
                      onChangeText={comment => this.onCommentTextChange(comment)}
                      value={this.state.comment}
                      />
                    <TouchableOpacity hitSlop={hitSlop} onPress={() => this.onPostComment(item.id, item.attributes.drupal_internal__nid)}>
                      <Ionicons name='ios-send' color={Colors.appColor} size={30} />
                    </TouchableOpacity>
                  </View>
                  <KeyboardSpacer topSpacing={-10} />
                </View>
              </Modal>
            }
            <View style={styles.CardStyle}>
              { item.attributes.mature_content === '1' && !this.props.isUserLoggedIn
              ? <WefiqTouchableOpacity onPress={() => WefiqAlert({title: 'Oh no!!!', message: 'This is mature content,Please login to view it.'})} style={{zIndex: 10}}>
                <Image
                  style={[styles.Thumbnail]}
                  placeholder={Images.placeHolder}
                  blurRadius={25}
                  source={metadata ? { uri: metadata.thumbnailUrl.search('kaltura') > 0 ? improveImageQuality : metadata.thumbnailUrl } : Images.placeHolder}
                />
              </WefiqTouchableOpacity>
              : <FastImage
                style={[styles.Thumbnail]}
                placeholder={Images.placeHolder}
                source={metadata ? { uri: metadata.thumbnailUrl.search('kaltura') > 0 ? improveImageQuality : metadata.thumbnailUrl } : Images.placeHolder}
                />
              }
              <WefiqTouchableOpacity style={[styles.horizontalAlign, styles.pictureView]} hitSlop={hitSlopMinor} onPress={() => this.navigationToProfile(item.attributes.user_data)}>
                <FastImage source={picture_url ? { uri: picture_url } : Images.placeHolder} style={styles.profileThumbnail} />
                <Text style={styles.title}>{item.attributes.title}</Text>
                <Text style={[styles.profileName, styles.align]}>{name}</Text>
                <Text style={[styles.profileName, styles.time]}>{calculateTime(item.attributes.created)} ago</Text>
              </WefiqTouchableOpacity>
              <View style={styles.horizontalView}>
                <View style={styles.divider} />
                <View style={[styles.description]}>
                  <WefiqTouchableOpacity style={[styles.horizontalAlignButton, styles.smallBtn]} hitSlop={hitSlopAudioPlayer} onPress={() => { item.attributes.liked_uuid !== null ? this.onUnlike(item.attributes.drupal_internal__nid) : this.onLikeCreation(item.attributes.drupal_internal__nid) }}>
                    <Wefiq name='like' style={styles.icon} size={13} color={!unLiked && (item.attributes.liked_uuid !== null || liked) ? 'red' : '#C2C2C2'} />
                    <Text ellipsizeMode='tail' numberOfLines={1} style={[styles.descriptionText]}>{isNaN(changedLikesCount) ? 0 : changedLikesCount } Likes</Text>
                  </WefiqTouchableOpacity>
                  <WefiqTouchableOpacity style={[styles.horizontalAlignButton, styles.mediumBtn]}>
                    <Wefiq name='comment' style={styles.icon} size={13} color='#C2C2C2' />
                    <Text style={styles.descriptionText}>{commentsCount} Comments</Text>
                  </WefiqTouchableOpacity>
                  <WefiqTouchableOpacity style={[styles.horizontalAlignButton, styles.smallBtn]} hitSlop={hitSlopAudioPlayer} onPress={() => item.attributes.refiqed_uuid !== null ? this.onUnRefiq(item.attributes.drupal_internal__nid) : this.onRefiq(item.attributes.drupal_internal__nid)}>
                    <Wefiq name='refiq' color={!unRefiqed && (item.attributes.refiqed_uuid !== null || refiqed) ? Colors.appColor : Colors.Grey} style={styles.shareIcon} size={15} />
                    <Text style={styles.descriptionText}>{isNaN(changedRefiqsCount) ? 0 : changedRefiqsCount} Refiq</Text>
                  </WefiqTouchableOpacity>{
                      !item.attributes.status &&
                      <MaterialCommunityIcons style={styles.lockIcon} name='lock' size={30} />
                }
                  {this.renderMediaIcon(item.attributes.media_type)}
                </View>
              </View>
            </View>
          </React.Fragment>
        </WefiqTouchableOpacity>
      </PusherSubscription>

    )
  }
}
export default withsubscribeChannel(CreationTiles)

const CommentView = ({ imgURL, authorName, comment, time }) => (
  <View style={styles.commentItem}>
    <View style={styles.horizontalViewComment}>
      <FastImage style={styles.commentAvatar} source={{ uri: imgURL || 'https://www.freeiconspng.com/uploads/blue-user-icon-32.jpg' }} />
      <View style={styles.commentContainer}>
        <Text style={styles.commentAuthor}>{authorName} <Text style={styles.commentTime}>{time}</Text></Text>
        <Text numberOfLines={3} ellipsizeMode='tail' style={styles.comment}>{comment}</Text>
      </View>
    </View>
  </View>
)

const ContextualMenuItem = ({ title, icon, onPress }) => (
  <TouchableOpacity style={styles.contextualMenuItem} onPress={onPress}>
    <Text style={title === 'Delete' ? styles.contentDelete : styles.contentTitle}>{title}</Text>
    <View style={{justifyContent: 'center'}}>{icon}</View>
  </TouchableOpacity>)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.LightGrey
  },
  profileName: {
    fontSize: 14,
    ...appStyles.defaultFontFamily,
    color: '#969696',
    lineHeight: 17
  },
  align: {
    top: 20,
    left: 40,
    position: 'absolute'
  },
  Thumbnail: {
    height: Platform.OS === 'ios' ? '75%' : '70%',
    width: '100%',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6
  },
  info: {
    marginLeft: 15
  },
  CardStyle: {
    backgroundColor: 'white',
    flex: 1,
    height: cardHeight,
    width: cardWidth,
    borderRadius: 6,
    marginBottom: 10,
    paddingBottom: 20,
    shadowOpacity: 2,
    elevation: 5,
    shadowColor: 'rgba(0,0,0,0.25)',
    shadowOffset: {
      width: 5,
      height: 5
    },
    shadowRadius: 10
  },
  title: {
    fontSize: 14,
    color: Colors.WefiqText,
    fontFamily: 'SourceSansPro-SemiBold',
    lineHeight: 16,
    marginLeft: 10,
    marginTop: 2
  },
  description: {
    paddingLeft: 5,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  descriptionText: {
    color: Colors.WefiqText,
    fontFamily: 'SourceSansPro-SemiBold',
    fontSize: 12
  },
  icon: {
    top: 2,
    marginRight: 5
  },
  shareIcon: {
    marginRight: 5
  },
  horizontalView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 35,
    justifyContent: 'center'
  },
  horizontalAlign: {
    flexDirection: 'row',
    zIndex: 12

  },
  pictureView: {
    top: 10,
    marginLeft: 10
  },
  horizontalAlignButton: {
    flexDirection: 'row',
    zIndex: 30,
    height: 35, // height of the horizontal bottom buttons view
    ...appStyles.alignCenterWithoutFlex
  },
  mediaIcon: {
    height: 25,
    width: 26,
    backgroundColor: Colors.appColor,
    borderWidth: 1,
    borderColor: Colors.White,
    borderRadius: 13,
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? Sizes.DEVICE_HEIGHT * 0.103 : Sizes.DEVICE_HEIGHT * 0.13,
    right: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  time: {
    position: 'absolute',
    right: 15,
    top: 15
  },
  content: {
    backgroundColor: Colors.White,
    borderRadius: 7,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    width: '60%',
    overflow: 'hidden'
  },
  contentTitle: {
    fontSize: 16,
    ...appStyles.defaultFontFamily,
    top: 14
  },
  contentDelete: {
    fontSize: 16,
    ...appStyles.defaultFontFamily,
    top: 14,
    color: Colors.wefiqRed
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
    fontSize: 14,
    lineHeight: 15
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
  horizontalViewComment: {
    ...appStyles.horizontalView
  },
  commentModalContainer: {
    backgroundColor: 'white',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingBottom: 10,
    height: '90%'
  },
  commentModal: {
    justifyContent: 'flex-end',
    margin: 0,
    flex: 1
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
    paddingRight: 40
    // flexGrow: 1,
  },
  commentBox: {
    height: 40,
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 20,
    width: '85%',
    borderColor: Colors.WefiqText,
    marginLeft: 5,
    marginRight: 5,
    ...appStyles.defaultFontFamily
  },
  smallBtn: {
    width: 70,
    zIndex: 10
  },
  mediumBtn: {
    width: 100
  },
  loadMoreButton: {
    ...appStyles.alignCenterWithoutFlex,
    height: 40,
    width: 120,
    borderRadius: 5,
    backgroundColor: Colors.appColor,
    alignSelf: 'center'
  },
  contextualMenuItem: {
    height: 50,
    borderBottomWidth: 1,
    borderColor: Colors.WefiqBorder,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 12,
    paddingRight: 12
  },
  profileThumbnail: {
    height: 30,
    width: 30,
    borderRadius: 15
  },
  lockIcon:
  {
    position: 'absolute',
    right: 5,
    bottom: 110
  }
})
