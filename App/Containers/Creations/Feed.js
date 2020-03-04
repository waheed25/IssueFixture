import React from 'react'
import { ActivityIndicator, StyleSheet, RefreshControl, InteractionManager, Text, View } from 'react-native'
import Modal from 'react-native-modal'
import _ from 'lodash'
import { withFeedCreations } from '../../Redux/hoc/withCreations/withFeedCreations'
import MediaView from '../../Components/MediaView/MediaView'
import Loading from '../../Components/Loader/Loader'
import CreationTiles from '../../Components/CreationTiles/CreationTiles'
import BlockedTile from '../../Components/CreationTiles/BlockedTile'
import { feedCreationsParams, popularCreationsParams } from '../../Utils/params'
import { getCategoriesId } from '../../Utils/helperFunctions'
import TrackPlayer from 'react-native-track-player'
import whyDidYouRender from '@welldone-software/why-did-you-render'
import WefiqList from '../../Components/WefiqList'
import { playAudio } from '../../Utils/audioPlayerUtilities'
import slowlog from 'react-native-slowlog'
import Colors from '../../Styles/Colors'
import { appStyles } from '../../Styles/CommonStyles'
whyDidYouRender(React, {
  onlyLogs: true,
  titleColor: 'green',
  diffNameColor: 'aqua',
  logOnDifferentValues: true
})
const apiType = '/wefiq/user/feed?'

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
      data: [],
      updated: false,
      PusherIncremented: 0,
      renderList: false,
      refreshing: false,
      mediaData: '',
      showSkeleton: false,
      playing: false,
      showAudioPlayer: false
    }
  }
  async componentDidMount () {
    this.fetchCreations(this.pageLimit, this.pageOffset)
    // this.list = setTimeout(() => { this.setState({ renderList: true }) }, 0)
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
    if (this.props.isUserLoggedIn) {
      InteractionManager.runAfterInteractions(() => {
        const params = feedCreationsParams(limit, offset)
        if (this.props.categoryItems.length > 0) {
          params.filter.cat_filter.condition.path = 'category.tid'
          params.filter.cat_filter.condition.value = getCategoriesId(this.props.categoryItems)
          params.filter.cat_filter.condition.operator = 'IN'
        }
        const headers = {
          // Accept: 'application/vnd.github.v3+json',
          Authorization: this.props.userInfo.token
        }
        this.props.fetchFeedCreations(params, apiType, headers, refreshList)
      })
    }
  }
  handleOnPress = (item, index) => {
    this.setState({ modalVisible: true, selectedMediaData: JSON.parse(item.attributes.mediaMetadata), selectedData: this.props.data.slice(index, index + 5) })
  }

  shouldComponentUpdate (nextProps, nextState, nextContext) {
    if (nextProps.data !== this.props.data || nextState !== this.state || nextProps.isLoading !== this.props.isLoading || nextProps.isUserLoggedIn !== this.props.isUserLoggedIn) {
      return true
    } else {
      return false
    }
  }

  componentWillUnmount () {
    clearTimeout(this.list)
    clearTimeout(this.refreshList)
  }

  endScroll = () => {
    this.pageOffset += this.pageLimit
    let params = feedCreationsParams(this.pageLimit, this.pageOffset)
    if (this.props.categoryItems.length > 0) {
      params.filter.cat_filter.condition.path = 'category.tid'
      params.filter.cat_filter.condition.value = getCategoriesId(this.props.categoryItems)
      params.filter.cat_filter.condition.operator = 'IN'
    }
    if ((parseInt(this.props.totalCount) > this.props.data.length && !this.pageOffset < this.props.totalCount)) {
      this.fetchCreations(this.pageLimit, this.pageOffset, params)
    }
  }

  handleCloseModal =() => { this.setState({ modalVisible: false }) }
  renderFooter =() => {
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
    } else return null
  }
  componentDidUpdate (prevProps, prevState) {
    InteractionManager.runAfterInteractions(() => {
      if (prevProps.categoryItems !== this.props.categoryItems) {
        this.pageOffset = 0
        let params = feedCreationsParams(this.pageLimit, this.pageOffset)
        if (this.props.categoryItems.length > 0 && this.props.categoryItems[0].id !== 0) {
          params.filter.cat_filter.condition.path = 'category.tid'
          params.filter.cat_filter.condition.value = getCategoriesId(this.props.categoryItems)
          params.filter.cat_filter.condition.operator = 'IN'
        }
        const headers = {
          Authorization: this.props.userInfo.token
        }
        this.props.fetchFeedCreations(params, apiType, headers)
      }
      if (prevProps.isUserLoggedIn !== this.props.isUserLoggedIn) {
        this.pageOffset = 0
        this.fetchCreations({limit: this.pageLimit, offset: this.pageOffset, refreshList: false})
      }
    })
  }
  onRefresh = () => {
    this.pageOffset = 0
    // this.props.clearCreationsOnCategoryChangeFeed()
    this.setState({ refreshing: true })
    this.fetchCreations({limit: this.pageLimit, offset: this.pageOffset, refreshList: true})
    this.refreshList = setTimeout(() => this.setState({ refreshing: false }), 3000)
  }
  showSecondModal = () => {
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
          listName='feed'
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
          item={item}
          metadata={metadata}
      />)
    }
  }

  openAudioPlayer = async (currentItem) => {
    const { data, openAudioPlayerMiniView } = this.props
    await playAudio(openAudioPlayerMiniView, data, currentItem)
  }

  render () {
    console.log('Creation Feed props::', this.props)
    const { modalVisible, renderList, refreshing } = this.state
    const { isUserLoggedIn, data, isLoading } = this.props

    if ((isLoading && data.length < 1)) {
      return (
        <Loading />
      )
    }
    return (
      <React.Fragment>
        {
          (!isUserLoggedIn || data.length < 1) &&
            <View style={appStyles.alignCenter}>
              <Text style={styles.emptyText}>You're not logged in or Currently not following anyone</Text>
            </View>
        }
        { isUserLoggedIn && data.length > 0 &&
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
            {this.props.data.length > 0 &&
            <WefiqList
              alwaysBounceVertical
              disableVirtualization
              bouncesZoom
              data={this.props.data}
              keyboardShouldPersistTaps={'always'}
              contentContainerStyle={styles.list}
              initialNumToRender={3}
              maxToRenderPerBatch={3}
              removeClippedSubviews
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
          // shouldItemUpdate={this._shouldItemUpdate}
          />
        }
          </React.Fragment>
        }
      </React.Fragment>)
  }
}
export default withFeedCreations(Creations)
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
  },
  emptyText: {
    ...appStyles.defaultFontFamily,
    textAlign: 'center'
  }
})
