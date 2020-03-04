import React from 'react'
import { View, FlatList, Text } from 'react-native'
import { withAudioPlayer } from '../../Redux/hoc/AudioPlayer/withAudioPlayer'
import BlockedTile from '../../Components/CreationTiles/BlockedTile'
import CreationTiles from '../../Components/CreationTiles/CreationTiles'
import Modal from 'react-native-modal'
import MediaView from '../../Components/MediaView/MediaView'
import _ from 'underscore'
import { DefaultLoader } from '../../Components/Loader/Loader'
import { playAudio } from '../../Utils/audioPlayerUtilities'
import WefiqList from '../../Components/WefiqList'
import SearchSegment from '../../Components/SegementButton'
import Images from '../../Images/rootImages'
import ErrorEmptyState from '../../Components/EmptyAndError'
class CreationsSearchList extends React.Component {
  state ={ modalVisible: false }
  handleOnPress=(item, index) => {
    this.setState({ modalVisible: true, selectedMediaData: JSON.parse(item.attributes.media_metadata), selectedData: this.props.data.slice(index, index + 5) })
  }
  handleCloseModal=() => { this.setState({ modalVisible: false }) }
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
          listName='search'
          openAudioPlayer={this.openAudioPlayer}
          isLoading={this.props.isLoading}
          data={this.props.data}
          refiqes_count={item.attributes.refiqes_count}
          likes_count={item.attributes.likes_count}
          nid={item.attributes.drupal_internal_nid}
          views_count={item.attributes.views_count}
          commentsCount={item.attributes.comment_data !== null ? item.attributes.comment_data.comment_count : 0}
          index={index}
          handleCloseModal={this.handleCloseModal}
          handleOnPress={this.handleOnPress}
          isFetchingMore={this.props.isLoading}
          item={item}
          metadata={metadata} />
      )
    }
  }
  onEndReached=() => {
    // if ((parseInt(this.props.totalCount) > this.props.data.length && !this.pageOffset < this.props.totalCount)) {
    this.props.onEndReached()
    // }
  }
  renderFooter=() => {
    if (this.props.isLoading) {
      return <DefaultLoader />
    } else {
      return null
    }
  }

  openAudioPlayer=async (currentItem) => {
    const { data, openAudioPlayerMiniView } = this.props
    await playAudio(openAudioPlayerMiniView, data, currentItem)
  }
  render () {
    return (
      <React.Fragment>
        { this.props.data.length === 0 && !this.props.isLoading && !this.props.landingOnSearchCreation &&
        <ErrorEmptyState image={Images.emptyCreations} text='Did not find any creation' />
        }
        <Modal
          hideModalContentWhileAnimating
          style={{ flex: 1, margin: 0 }}
          isVisible={this.state.modalVisible}
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
          <MediaView totalCreations={this.props.totalCount} openAudioPlayer={this.openAudioPlayer} showSecondModal={this.showSecondModal} closeModal={this.handleCloseModal} selectedMediaData={this.state.selectedMediaData} mediaData={this.state.selectedData} />
        </Modal>
        <WefiqList
          data={this.props.data}
          renderItem={this.renderItem}
          removeClippedSubviews
          onEndReached={_.debounce(this.onEndReached, 500)}
          onEndReachedThreshold={0.1}
          contentContainerStyle={{paddingLeft: 12, width: '100%'}}
          ListFooterComponent={this.renderFooter}
          keyExtractor={(item) => `${item.id}${Math.random()}`}
          windowSize={20}
          initialNumToRender={10}
          legacyImplementation
          numColumns={1}
          horizontal={false}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={10}
        />
      </React.Fragment>
    )
  }
}
export default withAudioPlayer(CreationsSearchList)
