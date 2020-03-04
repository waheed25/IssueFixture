import React from 'react'
import { ActivityIndicator, View, StyleSheet, RefreshControl } from 'react-native'
import Modal from 'react-native-modal'
// import { appStyles } from '../../Styles/CommonStyles'
import _ from 'lodash'
import { withCreations } from '../../Redux/hoc/withUserCreations/withCreations'
import MediaView from '../../Components/MediaView/MediaView'
import Loading from '../../Components/Loader/Loader'
import CreationTiles from '../../Components/CreationTiles/CreationTiles'
import Images from '../../Images/rootImages'
import ErrorEmptyState from '../../Components/EmptyAndError'
import WefiqList from '../../Components/WefiqList'
import { userCreationsParams } from '../../Utils/params'
import BlockedTile from '../../Components/CreationTiles/BlockedTile'
import { playAudio } from '../../Utils/audioPlayerUtilities'
import { fetchCreationService } from '../../Services/data/creations'
class Creations extends React.Component {
  pageLimit = 20;
  pageOffset = 0;

  constructor (props) {
    super(props)
    this.state = {
      modalVisible: false,
      flatListReady: false,
      selectedData: {},
      selectedMediaData: {},
      renderList: false,
      refreshing: false,
      userCreationsData: []
    }
  }
  static navigationOptions = {
    header: null
  };
  async componentDidMount () {
    this.setState({ isLoading: true })
    await this.fetchCreations({limit: this.pageLimit, offset: this.pageOffset, id: this.props.id})
    this.list = setTimeout(() => { this.setState({ renderList: true }) }, 0)
  }
  // shouldComponentUpdate (nextProps, nextState, nextContext) {
  //   if (nextProps.userCreationsData !== this.props.userCreationsData || nextProps.isLoading !== this.props.isLoading || nextState !== this.state || this.props.id !== nextProps.id) {
  //     return true
  //   } else {
  //     return false
  //   }
  // }

  fetchCreations = async(limit, offset, id) => {
    const apiType = '/wefiq/creation?'
    let params = userCreationsParams(limit, offset, id)
    const data = await fetchCreationService(params, apiType)
    this.setState({ userCreationsData: [...this.state.userCreationsData, ...data.resDataArray], isLoading: false })
    // this.props.fetchUserCreationsData(params, apiType)
  }
  handleOnPress=(item, index) => {
    this.setState({modalVisible: true, selectedMediaData: JSON.parse(item.attributes.media_metadata), selectedData: this.state.userCreationsData.slice(index, index + 5)})
  }

  // componentWillUnmount () {
  //   clearTimeout(this.list)
  //   this.props.clearList()
  // }
  endScroll =async() => {
    this.pageOffset = +this.pageLimit
    if ((parseInt(this.props.totalCount) > this.state.userCreationsData.length)) {
      await this.fetchCreations({limit: this.pageLimit, offset: this.pageOffset, id: this.props.id})
    }
  }
  // static getDerivedStateFromProps (nextProps, prevState) {
  //   if (nextProps.userCreationsData.length !== prevState.userCreationsData.length) {
  //     return { userCreationsData: nextProps.userCreationsData }
  //   } else return null
  // }
  // componentDidUpdate (prevProps, prevState) {
  //   if (prevProps.userCreationsData.length !== this.props.userCreationsData.length) {
  //     this.setState({ userCreationsData: this.props.userCreationsData })
  //   }
  // }
  handleCloseModal=() => { this.setState({modalVisible: false}) }
  renderFooter=() => {
    if (this.props.isLoading) {
      return (<ActivityIndicator size='large' color='#2AAAD2' />)
    } else return null
  }
  onRemoveEmptyCreation =(index) => {
    const UpdatedData = [...this.state.userCreationsData]
    UpdatedData.splice(index, 1)
    this.setState({ userCreationsData: UpdatedData })
  }
  renderItem=({item, index}) => {
    const metadata = JSON.parse(item.attributes.media_metadata)
    if (item.attributes.modState === 'blocked' || item.attributes.modState === 'deleted' || item.attributes.modState === 'unavailable') {
      return <BlockedTile
        index={index}
        onRemoveEmptyCreation={this.onRemoveEmptyCreation}
        title={item.attributes.modState || item.attributes.title}
        reason={item.attributes.modStateDesc}
        drupalInternalNid={item.attributes.drupal_internal__nid}
        uid={item.attributes.userData}
        listName='userCreations'
        creationId={item.id}
      />
    } else {
      return (
        <CreationTiles
          refiqes_count={item.attributes.refiqes_count}
          likes_count={item.attributes.likes_count}
          nid={item.attributes.drupal_internal__nid}
          views_count={item.attributes.views_count}
          commentsCount={item.attributes.comment_data !== null ? item.attributes.comment_data.comment_count : 0}
          uid={this.props.id}
          listName='userCreations'
          openAudioPlayer={this.openAudioPlayer}
          isLoading={this.props.isLoading}
          data={this.state.userCreationsData}
          index={index}
          handleCloseModal={this.handleCloseModal}
          handleOnPress={this.handleOnPress}
          isFetchingMore={this.props.isLoading}
          item={item} metadata={metadata} />)
    }
  }
  onRefresh =() => {
    this.pageOffset = 0
    this.setState({ refreshing: true })
    this.fetchCreations(this.pageLimit, this.pageOffset)
  }
  openAudioPlayer= async(currentItem) => {
    const { openAudioPlayerMiniView } = this.props
    const { userCreationsData } = this.state
    await playAudio(openAudioPlayerMiniView, userCreationsData, currentItem)
  }
  render () {
    const { renderList, refreshing, isLoading } = this.state
    console.log('User creations:::>>>>>>>>', this.state)
    if (isLoading) {
      return (
        <Loading />
      )
    }
    return (
      <React.Fragment>
        <Modal
          style={styles.modal}
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
         this.state.userCreationsData.length === 0 && !isLoading && <View style={{flex: 1, height: 300}}>
           <ErrorEmptyState image={Images.emptyCreations} text='You don’t have any creations yet' />
         </View>
         }
        <WefiqList
          scrollEnabled={false}
          data={this.state.userCreationsData}
          contentContainerStyle={styles.list}
            // refreshControl={
            //   <RefreshControl
            //     refreshing={refreshing && this.props.isLoading}
            //     onRefresh={this.onRefresh}
            //     tintColor={Colors.appColor}
            //     Colors={[Colors.appColor]}
            //   />
            // }
            // onEndReached={_.debounce(this.endScroll, 500)}

          initialNumToRender={2}
          maxToRenderPerBatch={3}
          removeClippedSubviews
          onEndReachedThreshold={0.5}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={this.renderFooter}
          renderItem={this.renderItem}
          />
      </React.Fragment>
    )
  }
}

export default withCreations(Creations)
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
    marginTop: '50%'
  }
})
