import React, { Fragment} from 'react'
import { View, ActivityIndicator, StyleSheet, RefreshControl } from 'react-native'
import Modal from 'react-native-modal'
// import { appStyles } from '../../Styles/CommonStyles'
import _ from 'lodash'
import MediaView from '../../Components/MediaView/MediaView'
import Loading from '../../Components/Loader/Loader'
import CreationTiles from '../../Components/CreationTiles/CreationTiles'
import BlockedTile from '../../Components/CreationTiles/BlockedTile'
import WefiqList from '../../Components/WefiqList'
import { withCollections } from '../../Redux/hoc/withCollections/withCollections'
import { playAudio } from '../../Utils/audioPlayerUtilities'
import Colors from '../../Styles/Colors'
const apiType = '/wefiq/collection?'
function createParam ({id, offset, userID, limit}) {
  return {
    include: 'uid',
    page: {
      limit: limit,
      offset: offset
    },
    filter: {
      author: {
        condition: {
          path: 'uid.uid',
          value: userID
        }
      }
    }
  }
}
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
      updated: false,
      PusherIncremented: 0,
      renderList: false,
      refreshing: false,
      mediaData: '',
      showAudioPlayer: false,
      creationsOfCollection: []
    }
    this.collectionID = this.props.navigation.state.params.collectionInfo.id
    this.creationsCount = this.props.navigation.state.params.collectionInfo.creationsCount
    this.userID = this.props.navigation.state.params.userID
    this.props.navigation.setParams({CollectionName: this.collectionTitle})
  }
  componentDidMount () {
    const apiType = `/wefiq/collection/${this.collectionID}/creations?`
    const params = createParam({ id: this.collectionID, offset: this.pageOffset, userID: this.userID, limit: this.pageLimit })
    this.props.fetchCreations(params, apiType)
  }

  handleOnPress=(item, index) => {
    this.setState({ modalVisible: true, selectedMediaData: JSON.parse(item.attributes.mediaMetadata), selectedData: this.props.creationsOfCollection.slice(index, index + 5) })
  }

  shouldComponentUpdate (nextProps, nextState, nextContext) {
    if (nextProps.creationsOfCollection !== this.props.creationsOfCollection || nextState !== this.state || nextProps.isLoadingCreations !== this.props.isLoadingCreations) {
      return true
    } else {
      return false
    }
  }
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.collectionInfo.attributes.title
  });

  endScroll =() => {
    const apiType = `/wefiq/collection/${this.collectionID}/creations?`
    this.pageOffset += this.pageLimit
    const params = createParam({id: this.collectionID, offset: this.pageOffset, userID: this.userID, limit: this.pageLimit})
    console.log('parseInt(this.props.totalCount)', this.props.data.length)
    if ((parseInt(this.creationsCount) > this.props.creationsOfCollection.length)) {
      console.log('About to fetch creations............. >>> 02')
      this.props.fetchCreations(params, apiType)
    }
  }
  static getDerivedStateFromProps (nextProps, prevState) {
    if (nextProps.creationsOfCollection.length !== prevState.creationsOfCollection.length) {
      return { creationsOfCollection: nextProps.creationsOfCollection }
    } else return null
  }
  componentDidUpdate (prevProps, prevState) {
    if (prevProps.creationsOfCollection.length !== this.props.creationsOfCollection.length) {
      this.setState({ creationsOfCollection: this.props.creationsOfCollection })
    }
  }
  handleCloseModal=() => { this.setState({ modalVisible: false }) }
  renderFooter=() => {
    if (this.props.isLoadingCreations) {
      return (
        <ActivityIndicator style={styles.loader} size='large' color='#2AAAD2' />
      )
    } else {
      return null
    }
  }
  onRemoveEmptyCreation =(index) => {
    this.setState({ creationsOfCollection: this.state.creationsOfCollection.splice(index, 1) })
  }
  onRefresh =() => {
    this.pageOffset = 0
    const apiType = `/wefiq/collection/${this.collectionID}/creations?`
    this.setState({ refreshing: true })
    const params = createParam({ id: this.collectionID, offset: this.pageOffset, userID: this.userID, limit: this.pageLimit })
    this.props.fetchCreations(params, apiType)
    this.refreshList = setTimeout(() => this.setState({ refreshing: false }), 3000)
  }
  showSecondModal=() => {
    this.setState({ modalVisible2: this.state.modalVisible2 })
  }
  renderItem=({item, index}) => {
    const metadata = item.attributes.mediaMetadata && JSON.parse(item.attributes.mediaMetadata)
    if (item.attributes.modState === 'blocked' || item.attributes.modState === 'deleted' || item.attributes.modState === null) {
      return <BlockedTile
        index={index}
        onRemoveEmptyCreation={this.onRemoveEmptyCreation}
        title={item.attributes.modState || item.attributes.title}
        reason={item.attributes.modStateDesc}
        drupalInternalNid={item.attributes.drupalInternalNid}
        uid={item.attributes.userData}
        listName='CreationsOfCollections'
        collectionID={this.collectionID}
      />
    } else {
      return (
        <CreationTiles
          openAudioPlayer={this.openAudioPlayer}
          isLoading={this.props.isLoading}
          data={this.props.creationsOfCollection}
          refiqesCount={item.attributes.refiqesCount}
          likesCount={item.attributes.likesCount}
          nid={item.attributes.drupalInternalNid}
          viewsCount={item.attributes.viewsCount}
          commentsCount={item.attributes.commentData !== null ? item.attributes.commentData.commentCount : 0}
          index={index} handleCloseModal={this.handleCloseModal}
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
    const { modalVisible, modalVisible2, refreshing } = this.state
     console.log(this.state.creationsOfCollection)
     console.log(this.collectionID)
    if ((this.props.isLoadingCreations && this.state.creationsOfCollection.length < 1)) {
      return (
        <Loading />

      )
    }
    return (
      <Fragment>
        <Modal
          hideModalContentWhileAnimating
          style={styles.modal}
          isVisible={modalVisible}
          animationOut='bounceOutDown'
          onBackButtonPress={() => this.handleCloseModal()}
          animationInTiming={100}
          backdropOpacity={0}
          coverScreen
        >
          <Modal
            hideModalContentWhileAnimating
            style={styles.modal2}
            isVisible={modalVisible2}
            animationOut='bounceOutDown'
          >
            <View style={{height: 400, backgroundColor: 'white', zIndex: 10}} />
          </Modal>
          <MediaView openAudioPlayer={this.openAudioPlayer} showSecondModal={this.showSecondModal} closeModal={this.handleCloseModal} selectedMediaData={this.state.selectedMediaData} mediaData={this.state.selectedData} />
        </Modal>
        {this.state.creationsOfCollection.length > 0 &&
        <WefiqList
          data={this.state.creationsOfCollection}
          initialNumToRender={2}
          maxToRenderPerBatch={3}
          removeClippedSubviews
          contentContainerStyle={styles.list}
          onEndReached={_.debounce(this.endScroll, 500)}
          onEndReachedThreshold={0.5}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={this.renderFooter}
          renderItem={this.renderItem}
          refreshControl={
            <RefreshControl
              refreshing={refreshing && this.props.isLoading}
              onRefresh={this.onRefresh}
              tintColor={Colors.appColor}
              Colors={[Colors.appColor]}
            />
          }
        />
        }
      </Fragment>)
  }
}
export default withCollections(Creations)
const styles = StyleSheet.create({
  root: {
    // flex: 1
  },
  list: {
    paddingLeft: 13,
    paddingTop: 10
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
