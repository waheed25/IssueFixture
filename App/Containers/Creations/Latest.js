import React from 'react'
import { ActivityIndicator, StyleSheet, RefreshControl, InteractionManager } from 'react-native'
import Modal from 'react-native-modal'
// import { appStyles } from '../../Styles/CommonStyles'
import _ from 'lodash'
import { withLatestCreations } from '../../Redux/hoc/withCreations/withLatestCreations'
import MediaView from '../../Components/MediaView/MediaView'
import Loading from '../../Components/Loader/Loader'
import CreationTiles from '../../Components/CreationTiles/CreationTiles'
import { latestCreationsParams } from '../../Utils/params'
import WefiqList from '../../Components/WefiqList'
import BlockedTile from '../../Components/CreationTiles/BlockedTile'
import { playAudio } from '../../Utils/audioPlayerUtilities'
import { getCategoriesId } from '../../Utils/helperFunctions'
import Colors from '../../Styles/Colors'
const apiType = '/wefiq/search?'
class Creations extends React.Component {
  pageLimit = 10;
  pageOffset = 0;

  constructor (props) {
    super(props)
    this.state = {
      modalVisible: false,
      selectedData: {},
      selectedMediaData: {},
      data: [],
      renderList: false,
      showAudioPlayer: false,
      refreshing: false
    }
  }

  componentDidMount () {
    this.fetchCreations(this.pageLimit, this.pageOffset)
    this.list = setTimeout(() => { this.setState({ renderList: true }) }, 0)
  }

  fetchCreations ({ limit, offset, refreshList }) {
    InteractionManager.runAfterInteractions(() => {
      let params = latestCreationsParams(limit, offset)
      if (this.props.categoryItems.length > 0) {
        params = latestCreationsParams(limit, offset, this.props.categoryItems)
        params.filter.cat_filter.condition.path = 'category.tid'
        params.filter.cat_filter.condition.value = getCategoriesId(this.props.categoryItems)
        params.filter.cat_filter.condition.operator = 'IN'
      }
      const headers = {
        // Accept: 'application/vnd.github.v3+json',
        Authorization: this.props.userInfo.token
      }
      this.props.fetchLatestCreations(params, apiType, headers, refreshList)
    })
  }
  handleOnPress=(item, index) => {
    this.setState({ modalVisible: true, selectedMediaData: JSON.parse(item.attributes.media_metadata), selectedData: this.props.data.slice(index, index + 5) })
  }

  shouldComponentUpdate (nextProps, nextState, nextContext) {
    if (nextProps.data !== this.props.data || nextState.modalVisible !== this.state.modalVisible || nextState.showAudioPlayer !== this.state.showAudioPlayer || nextState.renderList !== this.state.renderList || nextProps.isLoading !== this.props.isLoading || nextProps.isUserLoggedIn !== this.props.isUserLoggedIn) {
      return true
    } else {
      return false
    }
  }

  endScroll =() => {
    this.pageOffset += this.pageLimit
    let params
    if (this.props.categoryItems.length > 0) {
      params = latestCreationsParams(this.pageLimit, this.pageOffset, this.props.categoryItems[0].id)
      params.filter.cat_filter.condition.path = 'category.tid'
      params.filter.cat_filter.condition.value = getCategoriesId(this.props.categoryItems)
      params.filter.cat_filter.condition.operator = 'IN'
    } else {
      params = latestCreationsParams(this.pageLimit, this.pageOffset)
    }
    if ((parseInt(this.props.totalCount) > this.props.data.length)) {
      this.props.fetchLatestCreations(params, apiType)
    }
  }

  handleCloseModal=() => { this.setState({ modalVisible: false }) }

  renderFooter=() => {
    return (
      <ActivityIndicator style={styles.loader} size='large' color='#2AAAD2' />
    )
  }

  onRefresh =() => {
    this.pageOffset = 0
    // this.props.clearCreationsOnCategoryChangeLatest()
    this.setState({ refreshing: true })
    this.fetchCreations({limit: this.pageLimit, offset: this.pageOffset, refreshList: true})
    this.refreshList = setTimeout(() => this.setState({ refreshing: false }), 3000)
  }
  componentWillUnmount () {
    clearTimeout(this.list)
    clearTimeout(this.refreshList)
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
        let params = latestCreationsParams(this.pageLimit, this.pageOffset)
        if (this.props.categoryItems.length > 0 && this.props.categoryItems[0].id !== 0) {
          params.filter.cat_filter.condition.path = 'category.tid'
          params.filter.cat_filter.condition.value = getCategoriesId(this.props.categoryItems)
          params.filter.cat_filter.condition.operator = 'IN'
        }
        const headers = {
          Authorization: this.props.userInfo.token
        }
        this.props.fetchLatestCreations(params, apiType, headers)
      }
      if (prevProps.isUserLoggedIn !== this.props.isUserLoggedIn) {
        this.pageOffset = 0
        this.props.clearCreationsOnCategoryChangeLatest()
        this.fetchCreations(this.pageLimit, this.pageOffset)
      }
    })
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
          listName='latest'
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
          item={item} metadata={metadata} />)
    }
  }

  openAudioPlayer=async (currentItem) => {
    const { data, openAudioPlayerMiniView } = this.props
    await playAudio(openAudioPlayerMiniView, data, currentItem)
  }
  render () {
    const { modalVisible, renderList, refreshing } = this.state
    if ((this.props.isLoading && this.props.data.length < 1) || !renderList) {
      return (
        <Loading />
      )
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
          onBackButtonPress={() => this.handleCloseModal()}
          animationInTiming={100}
          backdropOpacity={0}
          coverScreen
          swipeThreshold={50}
          // propagateSwipe
          useNativeDriver
        >
          <MediaView openAudioPlayer={this.openAudioPlayer} showSecondModal={this.showSecondModal} closeModal={this.handleCloseModal} selectedData={this.state.selectedData} selectedMediaData={this.state.selectedMediaData} mediaData={this.state.selectedData} />
        </Modal>
        { this.state.renderList &&
          <WefiqList
            alwaysBounceVertical
            disableVirtualization
            data={this.props.data}
            initialNumToRender={3}
            maxToRenderPerBatch={3}
            removeClippedSubviews
            contentContainerStyle={styles.list}
            refreshControl={
              <RefreshControl
                refreshing={refreshing && this.props.isLoading}
                onRefresh={this.onRefresh}
                tintColor={Colors.appColor}
                Colors={[Colors.appColor]}
              />
            }
            // pagingEnabled
            onEndReached={_.debounce(this.endScroll, 500)}
            onEndReachedThreshold={0.01}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={this.renderFooter}
            renderItem={this.renderItem}
          />
        }
      </React.Fragment>)
  }
}
export default withLatestCreations(Creations)
const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  list: {
    paddingLeft: 12,
    paddingTop: 10
  },
  modal: {
    flex: 1,
    margin: 0
  },
  loader: {
    bottom: 20,
    marginTop: 30
  }
})
