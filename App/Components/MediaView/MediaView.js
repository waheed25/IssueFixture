import React from 'react'
import {
  View,
  StyleSheet,
  Animated,
  FlatList,
  StatusBar
} from 'react-native'
import DeviceSizes from '../../Styles/DeviceSizes'
import { DefaultLoader } from '../../Components/Loader/Loader'
import { popularCreationsParams } from '../../Utils/params'
import { appStyles } from '../../Styles/CommonStyles'
import { withCreationsDetails } from '../../Redux/hoc/withCreationDetails/withCreations'
import _ from 'lodash'
import CreationDetailMediaTile from './CreationDetailMediaTile'
import { InitializePusher } from '../../Utils'
import WefiqList from '../WefiqList'
import TrackPlayer from 'react-native-track-player'

class MediaView extends React.Component {
  positionY = new Animated.Value(0);
  pageOffset = 10
  pageLimit = 10
  fingerPositionY = null;
  fingerStartPositionY = null;
  offset = null;
  swipeDirection = null;

  constructor (props) {
    super(props)
    this.state = {
      currentIndex: 0,
      isMoving: false,
      isListVisible: false,
      isScrolledToTop: true,
      showDetails: false,
      gestureName: 'none',
      subscribedChannels: false,
      backgroundColor: '#fff',
      fade: 'fadeIn',
      data: props.mediaData,
      renderList: false,
      keyBoardOpen: false,
      relData: {uid: {data: [{attributes: {}}]}}
      // data: props.navigation.state.params.mediaData
    }
  }
  move = toValue => Animated.spring(this.positionY, { toValue, bounciness: 0 }).start();
  componentDidMount () {
    setTimeout(() => { this.setState({ renderList: true }) }, 300)
  }
  componentWillReceiveProps (nextProps, nextContext) {
    if (this.props.data !== nextProps.data) {
      this.setState({ data: [...this.props.mediaData, ...nextProps.data] })
    }
  }
  shouldComponentUpdate (nextProps, nextState, nextContext) {
    if (nextProps.data !== this.props.data || nextProps.mediaData !== this.props.mediaData || nextState !== this.state) {
      return true
    } else {
      return false
    }
  }

  pusherSubscription=(nid) => {
    this.channels = [
      {
        channel: `creation_like_${nid}`,
        events: ['insert', 'delete']
      },
      {
        channel: `creation_refiq_${nid}`,
        events: ['insert', 'delete']
      },
      {
        channel: `creation_views_${nid}`,
        events: ['insert']
      },
      {
        channel: `creation_${nid}`,
        events: ['update']
      },
      {
        channel: `creation_comment_${nid}`,
        events: ['insert', 'delete']
      }
    ]
    var pusher
    if (!pusher) {
      pusher = InitializePusher()
    }
    // pusher is connected
    _.each(this.channels, (channel) => {
      pusher.unsubscribe(channel.channel)
      // channel.events.map((event) => {
      //   singleChannel.bind(event, (data) => {
      //     debugger
      //     const updatedData = handleDataChange(this.props.data, data, this.props.index)
      //     debugger
      //     this.identifyList(this.props.listName, updatedData)
      //     // this.props.updatePusherData(updatedData)
      //     // console.log('pusher data', updatedData)
      //   })
      // })

      // this.props.subscribeChannel(channel)
      // run a loop and subscribe to pusher through owner pusher library
    })
  }

  renderItem=({item, index}) => {
    const mediaUrls = JSON.parse(item.attributes.media_metadata)
    if (mediaUrls !== null) {
      return (
        <CreationDetailMediaTile item={item} mediaUrls={mediaUrls} index={index} creationsList={this.state.data} closeModal={this.closeModal} />
      )
    }
  }
  endScroll =() => {
    const apiType = 'wefiq/search?'
    this.pageOffset += this.pageLimit
    const params = popularCreationsParams(this.pageLimit, this.pageOffset)
    if ((parseInt(this.props.totalCreations) > (this.state.data.length) && (parseInt(this.props.totalCreations) > this.pageOffset))) {
      this.props.fetchCreationsDetailsData(params, apiType)
    }
  }
  closeModal=() => {
    // await TrackPlayer.pause()
    // this.props.openAudioPlayerMiniView({open: false})
    this.props.closeModal()
  }
  viewItems=(viewAbleItems) => {
    console.log('viewAbleItems', viewAbleItems)
    if (viewAbleItems.viewableItems.length > 0) {
      const dataToPost = {
        data: {
          relationships: {
            target_id: {
              data: {
                type: 'creation',
                id: viewAbleItems.viewableItems[0].item.id
              }
            }
          },
          type: 'wefiq_views_count',
          attributes: {}
        }
      }
      this.props.onCreationView(dataToPost)
    }
  }
  render () {
    const { mediaData } = this.props
    // TODO :: this component renders multiple times so look into the issue why this happens
    return (
      <View style={styles.rootContainer}>
        <StatusBar hidden backgroundColor='rgba(0,0,0,0.0)' barStyle='light-content' />
        { !this.state.renderList && <DefaultLoader style={styles.loaderStyle} />}
        {this.state.renderList &&
          <FlatList
            keyboardShouldPersistTaps='always'
            ref={(ref) => { this.flatListRef = ref }}
            snapToInterval={DeviceSizes.DEVICE_HEIGHT}
            decelerationRate='fast'
            keyExtractor={(item, index) => index.toString()}
            data={this.state.data}
            renderItem={this.renderItem}
            onEndReached={_.debounce(this.endScroll, 500)}
            onEndReachedThreshold={0.1}
            automaticallyAdjustContentInsets={false}
            viewabilityConfig={{ minimumViewTime: 3000, viewAreaCoveragePercentThreshold: 50 }}
            onViewableItemsChanged={this.viewItems}
          />
           }
      </View>

    )
  }
}
export default withCreationsDetails(MediaView)
const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: 'black'
  },
  scrollViewContainer: {
    height: '100%'
  },
  containerStyles: {
    position: 'absolute',
    zIndex: 10,
    flex: 1
  },
  closeBtn: {
    top: 40,
    right: 30,
    position: 'absolute'
  },
  loaderStyle: {
    elevation: 10
  },
  showOnTop: {
    zIndex: 5
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
  blockedTile: {
    left: 15,
    top: 15
  }
})
