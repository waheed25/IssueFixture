import React from 'react'
import { View, FlatList, ActivityIndicator } from 'react-native'
import Modal from 'react-native-modal'
// import { appStyles } from '../../Styles/CommonStyles'
import _ from 'lodash'
import { withRefiq } from '../../Redux/hoc/withRefiq/withRefiq'
import MediaView from '../../Components/MediaView/MediaView'
import Loading from '../../Components/Loader/Loader'
import CreationTiles from '../../Components/CreationTiles/CreationTiles'
import ErrorEmptyState from '../../Components/EmptyAndError'
import Images from '../../Images/rootImages'
import { refiqsCreationsParams, userCreationsParams } from '../../Utils/params'
import BlockedTile from '../../Components/CreationTiles/BlockedTile'
import { playAudio } from '../../Utils/audioPlayerUtilities'
import WefiqList from '../../Components/WefiqList'
import { fetchCreationService } from '../../Services/data/creations'

const apiType = '/wefiq/activity?'
class Creations extends React.Component {
  pageLimit = 10;
  pageOffset = 0;

  constructor (props) {
    super(props)
    this.state = {
      modalVisible: false,
      flatListReady: false,
      selectedData: {},
      selectedMediaData: {},
      renderList: false,
      data: [],
      isLoading: false
    }
  }
  static navigationOptions = {
    header: null
  };
  async componentDidMount () {
    await this.fetchCreations()
    this.list = setTimeout(() => { this.setState({renderList: true}) }, 0)
  }

  shouldComponentUpdate (nextProps, nextState, nextContext) {
    if (nextProps.data !== this.props.data || nextProps.isLoading !== this.props.isLoading || nextState !== this.state) {
      return true
    } else {
      return false
    }
  }
  async fetchCreations () {
    let params = refiqsCreationsParams(this.pageLimit, this.pageOffset, this.props.id)
    const data = await fetchCreationService(params, apiType)
    this.setState({ data: [...this.state.data, ...data.resDataArray], isLoading: false })
    // this.props.fetchRefiqData(params, apiType)
  }
  handleOnPress=(item, index) => {
    this.setState({modalVisible: true, selectedMediaData: JSON.parse(item.attributes.media_metadata), selectedData: this.state.data.slice(index, index + 5)})
    // return (this.setState({modalVisible: true, selectedMediaData: JSON.parse(item.attributes.mediaMetadata), selectedData: item}))
  }
  componentWillUnmount () {
    clearTimeout(this.list)
    this.props.clearList()
  }
  endScroll =() => {
    this.pageOffset += this.pageLimit
    let params = refiqsCreationsParams(this.pageLimit, this.pageOffset, this.props.id)
    if ((parseInt(this.props.totalCount) > this.props.data.length)) {
      this.props.fetchRefiqData(params, apiType)
    }
  }

  handleCloseModal=() => { this.setState({ modalVisible: false }) }

  renderFooter=() => {
    if (this.props.isLoading) {
      return (
        <ActivityIndicator size='large' color='#2AAAD2' />
      )
    } else { return null }
  }

  onRemoveEmptyCreation =(index) => {
    const UpdatedData = [...this.state.data]
    UpdatedData.splice(index, 1)
    this.setState({ data: UpdatedData })
  }

  // static getDerivedStateFromProps (nextProps, prevState) {
  //   if (nextProps.data.length !== prevState.data.length) {
  //     return { data: nextProps.data }
  //   } else return null
  // }
  // componentDidUpdate (prevProps, prevState) {
  //   if (prevProps.data.length !== this.props.data.length) {
  //     this.setState({ data: this.props.data })
  //   }
  // }

  renderItem=({item, index}) => {
    const metadata = JSON.parse(item.attributes.media_metadata)
    if (item.attributes.modState === 'blocked' || item.attributes.modState === 'deleted') {
      return <BlockedTile
        index={index}
        onRemoveEmptyCreation={this.onRemoveEmptyCreation}
        title={item.attributes.modState}
        reason={item.attributes.modStateDesc}
        drupalInternalNid={item.attributes.drupalInternalNid}
        uid={item.attributes.userData}
        listName='refiqs'
      />
    } else {
      return (<CreationTiles
        refiqes_count={item.attributes.refiqes_count}
        likes_count={item.attributes.likes_count}
        nid={item.attributes.drupal_internal__nid}
        views_count={item.attributes.views_count}
        commentsCount={item.attributes.comment_data !== null ? item.attributes.comment_data.comment_count : 0}
        openAudioPlayer={this.openAudioPlayer}
        isLoading={this.props.isLoading}
        data={this.state.data}
        index={index}
        handleCloseModal={this.handleCloseModal}
        handleOnPress={this.handleOnPress}
        isFetchingMore={this.props.isLoading}
        item={item} metadata={metadata} />)
    }
  }
  openAudioPlayer=async (currentItem) => {
    const { openAudioPlayerMiniView } = this.props
    const { data } = this.state
    await playAudio(openAudioPlayerMiniView, data, currentItem)
  }
  render () {
    const { renderList, isLoading } = this.state
    console.log('data of refqis', this.state.data)
    if (this.props.isLoading && this.props.data.length < 1) {
      return (
        <Loading />
      )
    }
    return (
      <React.Fragment>
        {renderList &&
        <View>
          <Modal
            style={{ flex: 1, margin: 0 }}
            isVisible={this.state.modalVisible}
            animationOut='bounceOutDown'
            hideModalContentWhileAnimating
            onBackButtonPress={() => this.handleCloseModal()}
            animationInTiming={100}
            backdropOpacity={0}
            coverScreen
          >
            <MediaView closeModal={this.handleCloseModal} mediaData={this.state.selectedData} />
          </Modal>
          {
            this.state.data.length === 0 && !isLoading && <View style={{ flex: 1, height: 300 }}>
              <ErrorEmptyState image={Images.emptyCreations} text='You don’t have any Refiqs yet' />
            </View>
          }
          <FlatList
            scrollEnabled={false}
            style={{ paddingLeft: 12, marginTop: 30 }}
            data={this.state.data}
            onEndReached={_.debounce(this.endScroll, 500)}
            onEndReachedThreshold={0.5}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={this.renderFooter}
            renderItem={this.renderItem}
            initialNumToRender={2}
            maxToRenderPerBatch={3}
            removeClippedSubviews
          />
        </View>
        }
      </React.Fragment>)
  }
}

export default withRefiq(Creations)
