import React from 'react'
import { ActivityIndicator, StyleSheet, RefreshControl, InteractionManager } from 'react-native'
import Modal from 'react-native-modal'
import { withCreations } from '../../Redux/hoc/withCreations/withCreations'
import MediaView from '../../Components/MediaView/MediaView'
import Loading from '../../Components/Loader/Loader'
import CreationTiles from '../../Components/CreationTiles/CreationTiles'
import BlockedTile from '../../Components/CreationTiles/BlockedTile'
import { popularCreationsParams } from '../../Utils/params'
import { getCategoriesId } from '../../Utils/helperFunctions'
import TrackPlayer from 'react-native-track-player'
import whyDidYouRender from '@welldone-software/why-did-you-render'
import WefiqList from '../../Components/WefiqList'
import { playAudio } from '../../Utils/audioPlayerUtilities'
import MessageQueue from 'react-native/Libraries/BatchedBridge/MessageQueue.js'

import slowlog from 'react-native-slowlog'
import Colors from '../../Styles/Colors'
import _ from 'underscore'
import { InitializePusher } from '../../Utils'
whyDidYouRender(React, {
  onlyLogs: true,
  titleColor: 'green',
  diffNameColor: 'aqua',
  logOnDifferentValues: true
})
const apiType = '/wefiq/search?'
const pusher = InitializePusher()
class Creations extends React.Component {
  // static whyDidYouRender = true
  pageLimit = 10;
  pageOffset = 0;
  audioData: []
  constructor (props) {
    super(props)
    slowlog(this, /.*/)
    this.state = {
      modalVisible: false,
      selectedData: {},
      selectedMediaData: {},
      preloadData: [],
      updated: false,
      PusherIncremented: 0,
      renderList: false,
      refreshing: false,
      mediaData: '',
      playing: false,
      showAudioPlayer: false
    }
  }
  async componentDidMount () {
    this.fetchCreations({limit: this.pageLimit, offset: this.pageOffset})
    TrackPlayer.addEventListener('playback-state', (playBack) => {
      if (playBack.state === 'playing' || playBack.state === 3) {
        this.setState({ playing: true })
      }
    })
    TrackPlayer.addEventListener('playback-error', (error) => {
      alert('error occured', error)
    })
  }
  fetchCreations ({ limit, offset, refreshList }) {
    InteractionManager.runAfterInteractions(() => {
      const params = popularCreationsParams(limit, offset)
      if (this.props.categoryItems.length > 0) {
        params.filter.cat_filter.condition.path = 'category.tid'
        params.filter.cat_filter.condition.value = getCategoriesId(this.props.categoryItems)
        params.filter.cat_filter.condition.operator = 'IN'
      }
      const headers = {
      // Accept: 'application/vnd.github.v3+json',
        Authorization: this.props.userInfo.token
      }
      this.props.fetchCreationsData(params, apiType, headers, refreshList)
    })
  }
  handleOnPress=(item, index) => {
    this.setState({ modalVisible: true, selectedMediaData: JSON.parse(item.attributes.media_metadata), selectedData: this.props.data.slice(index, index + 5) })
  }

  shouldComponentUpdate (nextProps, nextState, nextContext) {
    if (nextProps.data.length !== this.props.data.length || nextState !== this.state || nextProps.isLoading !== this.props.isLoading || nextProps.isUserLoggedIn !== this.props.isUserLoggedIn) {
      return true
    } else {
      return false
    }
  }

  async componentWillUnmount () {
    clearTimeout(this.refreshList)
  }

  endScroll =() => {
    this.pageOffset += this.pageLimit
    if ((parseInt(this.props.totalCount) > this.props.data.length && !this.pageOffset < this.props.totalCount)) {
      this.fetchCreations({limit: this.pageLimit, offset: this.pageOffset, refreshList: false})
    }
  }

  handleCloseModal=() => { this.setState({ modalVisible: false }) }
  renderFooter=() => {
    // if (this.props.isLoading && this.props.data.length > 0) {
    return (
      <ActivityIndicator style={styles.loader} size='large' color='#2AAAD2' />
    )
    // } else {
    //   return null
    // }
  }
  static getDerivedStateFromProps (nextProps, prevState) {
    if (nextProps.categoryItems !== prevState.categoryItems) {
      return { categoryItems: nextProps.categoryItems }
    }
    if (nextProps.isUserLoggedIn !== prevState.isUserLoggedIn) {
      return { isUserLoggedIn: nextProps.isUserLoggedIn }
    }
    debugger
    if (prevState.data && nextProps.data.length !== prevState.data.length) {
      return { data: nextProps.data }
    } else return null
  }
  // pusherSubscription (nid) {
  //   this.channels = [
  //     {
  //       channel: `creation_${nid}`,
  //       events: ['meta_update', 'update', 'insert', 'delete']
  //     },
  //     {
  //       channel: `creation_comment_${nid}`,
  //       events: ['insert', 'delete']
  //     }
  //   ]
  //   _.each(this.channels, (channel) => {
  //     let singleChannel = pusher.subscribe(channel.channel)
  //     return channel.events.map((event) => {
  //       singleChannel.bind(event, async (data) => data)
  //     })
  //   })
  // }
  componentDidUpdate (prevProps, prevState) {
    InteractionManager.runAfterInteractions(() => {
      if (prevProps.categoryItems !== this.props.categoryItems) {
        this.pageOffset = 0
        let params = popularCreationsParams(this.pageLimit, this.pageOffset)
        if (this.props.categoryItems.length > 0 && this.props.categoryItems[0].id !== 0) {
          params.filter.cat_filter.condition.path = 'category.tid'
          params.filter.cat_filter.condition.value = getCategoriesId(this.props.categoryItems)
          params.filter.cat_filter.condition.operator = 'IN'
        }
        const headers = {
          Authorization: this.props.userInfo.token
        }
        this.props.fetchCreationsData(params, apiType, headers, false)
      }

      console.log('this.props.isUserLoggedIn', this.props.isUserLoggedIn)
      console.log('this.props.isUserLoggedIn', prevProps.isUserLoggedIn)
      if (prevProps.isUserLoggedIn !== this.props.isUserLoggedIn && this.props.data.length > 0) {
        this.pageOffset = 0
        this.fetchCreations({limit: this.pageLimit, offset: this.pageOffset, refreshList: true})
      }
      debugger
      // for (let i = prevProps.data.length; i < this.props.data.length; i++) {
      //   debugger
      //   this.pusherSubscription(this.props.data[i].attributes.drupal_internal_nid)
      // }
    })
  }

  _scrolled=() => {
    this.setState({ flatListReady: true })
  }

  onRefresh =() => {
    this.pageOffset = 0
    this.setState({ refreshing: true })
    this.fetchCreations({limit: this.pageLimit, offset: this.pageOffset, refreshList: true})
    this.refreshList = setTimeout(() => this.setState({ refreshing: false }), 2000)
  }
  showSecondModal=() => {
    this.setState({ modalVisible2: this.state.modalVisible2 })
  }
  renderItem=({item, index}) => {
    const metadata = JSON.parse(item.attributes.media_metadata)
    if (item.attributes.modState === 'blocked' || item.attributes.modState === 'deleted') {
      return <BlockedTile
        title={item.attributes.modState}
        reason={item.attributes.modStateDesc}
      />
    } else {
      return (
        <CreationTiles
          listName='popular'
          openAudioPlayer={this.openAudioPlayer}
          isLoading={this.props.isLoading}
          data={this.props.data}
          refiqes_count={item.attributes.refiqes_count}
          likes_count={item.attributes.likes_count}
          nid={item.attributes.drupal_internal__nid}
          views_count={item.attributes.views_count}
          commentsCount={item.attributes.comment_data !== null ? item.attributes.comment_data.comment_count : 0}
          index={index}
          handleCloseModal={this.handleCloseModal}
          handleOnPress={this.handleOnPress}
          isFetchingMore={this.props.isLoading}
          item={item} metadata={metadata}
        />)
    }
  }

  openAudioPlayer=async (currentItem) => {
    const { data, openAudioPlayerMiniView } = this.props
    await playAudio(openAudioPlayerMiniView, data, currentItem)
  }

  render () {
    // MessageQueue.spy((info) => console.log('event!', info))
    console.log('Creation popular props::', this.props)
    const { modalVisible, refreshing } = this.state
    const { data, isLoading } = this.props
    if (isLoading && data.length === 0) {
      return <Loading />
    }
    return (
      <React.Fragment>
        <Modal
          hideModalContentWhileAnimating
          style={styles.modal}
          isVisible={modalVisible}
            // onSwipeComplete={() => this.setState({ modalVisible: false })}
            // swipeDirection={['left', 'right']}
          animationOut='bounceOutDown'
          animationInTiming={100}
          animationOutTiming={100}
          backdropOpacity={0}
          onBackButtonPress={() => this.handleCloseModal()}
          coverScreen
            // swipeThreshold={50}
            // propagateSwipe
          useNativeDriver
          >
          <MediaView totalCreations={this.props.totalCount} openAudioPlayer={this.openAudioPlayer}
            showSecondModal={this.showSecondModal} closeModal={this.handleCloseModal}
            selectedMediaData={this.state.selectedMediaData} mediaData={this.state.selectedData} />
        </Modal>

        <WefiqList
          alwaysBounceVertical
          disableVirtualization
          bouncesZoom
          data={data}
          initialNumToRender={3}
          maxToRenderPerBatch={3}
          removeClippedSubviews
          keyboardShouldPersistTaps={'always'}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl
              refreshing={refreshing && this.props.isLoading}
              onRefresh={this.onRefresh}
              tintColor={Colors.appColor}
              Colors={[Colors.appColor]}
           />
         }
          onEndReached={_.debounce(this.endScroll, 500)}
          onEndReachedThreshold={0.01}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={this.renderFooter}
          renderItem={this.renderItem}
          extraData={this.props.data}
         />
      </React.Fragment>)
  }
}
export default withCreations(Creations)
const styles = StyleSheet.create({
  list: {
    paddingLeft: 13,
    paddingTop: 10,
    flexGrow: 1
  },
  modal: {
    flex: 1,
    margin: 0
  },
  loader: {
    bottom: 20,
    marginTop: 30
  },
  modal2: {
    flex: 1,
    zIndex: 10,
    margin: 0,
    justifyContent: 'flex-end'
  },
  testView: {
    height: 200,
    width: 400,
    backgroundColor: 'green',
    borderColor: 'red',
    borderWidth: 1
  }
})
